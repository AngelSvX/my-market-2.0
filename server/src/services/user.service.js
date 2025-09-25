import { myMarketDB } from "../settings/db.js";
import { getCurrentDateTime } from "../utils/date.js"

// Funcionalidad para todos - ver datos del usuario
export const userProfileData = async (id) => {
  try {
    const myPostQuery = `
    SELECT w.title, w.description, w.price, w.status, c.name as category, w.created_at FROM works w
    INNER JOIN users u ON w.user_id = u.id
    INNER JOIN categories c ON w.category_id = c.id
    WHERE u.id = ?;
  `;

    const myProfileQuery = `
    SELECT u.name, u.email FROM users u
    WHERE u.id = ?
    `;

    const myRoleQuery = `
      SELECT r.name as roleName FROM users u
      INNER JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
    `;

    const [profileResponse] = await myMarketDB.execute(myProfileQuery, [id]);

    const [roleResponse] = await myMarketDB.execute(myRoleQuery, [id]);

    const role = roleResponse[0];
    if (role.roleName !== "Vendedor") {
      return {
        profileResponse,
        role,
      };
    }

    const [postResponse] = await myMarketDB.execute(myPostQuery, [id]);

    return {
      postResponse,
      profileResponse,
      role,
    };
  } catch (error) {
    throw error;
  }
};

// Funcionalidad para todos - ver comentarios y valoraciones de una publicación
export const getCommentsByPost = async (id) => {
  try {
    const myQuery = `
    SELECT r.id, u.name, u.email, r.rating, r.comment, r.created_at FROM reviews r
    INNER JOIN users u ON r.user_id = u.id
    INNER JOIN works w ON r.work_id = w.id
    WHERE w.id = ?;
    `;

    const [response] = await myMarketDB.execute(myQuery, [id]);

    console.log(response);

    return response;
  } catch (error) {
    throw error;
  }
};

// Funcionalidad para todos - ver publicaciones
export const getAllPosts = async () => {
  try {
    const myQuery = `
    SELECT w.id, w.title, w.description, w.status, w.price, w.created_at, c.name as category, wi.url, u.name, u.email FROM works w
    INNER JOIN categories c ON w.category_id = c.id
    INNER JOIN users u ON w.user_id = u.id
    INNER JOIN work_images wi ON wi.work_id = w.id
    `;

    const [response] = await myMarketDB.execute(myQuery);

    return response;
  } catch (error) {
    throw error;
  }
};

// Funcionalidad para administrador
export const addCategories = async (roleName) => {
  try {
    const addCategoryQuery = `
      INSERT INTO categories 
      (name)
      VALUES (?)
    `;

    const response = await myMarketDB.execute(addCategoryQuery, [roleName]);

    return {
      message: "Inserción de categoría correcta",
      response: response,
    };
  } catch (error) {
    throw error;
  }
};


// Funcionalidad para todos - Añadir Comentarios
export const addCommentByPost = async ({work_id, user_id, rating, comment}) => {
  try {
    const addCommentQuery = `
      INSERT INTO reviews
      (work_id, user_id, rating, comment)
      VALUES(?, ?, ?, ?)
    `

    const [result] = await myMarketDB.execute(addCommentQuery, [
      work_id,
      user_id,
      rating,
      comment,
    ])

    return result

  } catch (error) {
    throw error
  }
}