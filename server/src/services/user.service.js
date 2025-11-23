import { myMarketDB } from "../settings/db.js";

// Funcionalidad para todos - ver datos del usuario
export const userProfileData = async (id) => {
  try {
    const myPostQuery = `
      SELECT w.id, w.title, w.description, w.price, w.status, c.name as category, c.id as category_id, wi.url, w.created_at FROM work_images wi
      INNER JOIN works w ON wi.work_id = w.id
      INNER JOIN users u ON w.user_id = u.id
      INNER JOIN categories c on w.category_id = c.id
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

    const [[profileResponse]] = await myMarketDB.execute(myProfileQuery, [id]);

    console.log(profileResponse);

    const [roleResponse] = await myMarketDB.execute(myRoleQuery, [id]);

    console.log(roleResponse);

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
export const addCategories = async (newCategorie) => {
  try {
    const addCategoryQuery = `
      INSERT INTO categories 
      (name)
      VALUES (?)
    `;

    const response = await myMarketDB.execute(addCategoryQuery, [newCategorie]);

    return {
      message: "Inserción de categoría correcta",
      response: response,
    };
  } catch (error) {
    throw error;
  }
};

// Funcionalidad para administradores y vendedores
export const getCategories = async () => {
  try {
    const getCategoriesQuery = `SELECT * FROM categories`;

    const [response] = await myMarketDB.execute(getCategoriesQuery);

    return response;
  } catch (error) {
    throw new Error("Sucedió un error trayendo las categorías: ", error);
  }
};

// Funcionalidad para todos - Añadir Comentarios
export const addCommentByPost = async ({
  work_id,
  user_id,
  rating,
  comment,
}) => {
  try {
    const addCommentQuery = `
      INSERT INTO reviews
      (work_id, user_id, rating, comment)
      VALUES(?, ?, ?, ?)
    `;

    const [result] = await myMarketDB.execute(addCommentQuery, [
      work_id,
      user_id,
      rating,
      comment,
    ]);

    return result;
  } catch (error) {
    throw error;
  }
};

// Funcionalidad solo para vendedores
export const addPost = async ({
  user_id,
  category_id,
  title,
  description,
  price,
  status,
  url,
}) => {
  try {
    const addPostQuery = `
      INSERT INTO works
      (user_id, category_id, title, description, price, status)
      VALUES(?, ?, ?, ?, ?, ?)
      `;

    console.log("Aquí se comenzará con el work");

    const [work] = await myMarketDB.execute(addPostQuery, [
      user_id,
      category_id,
      title,
      description,
      price,
      status,
    ]);

    console.log("Aquí se termina con el work");

    console.log(work);

    const addPostImageQuery = `
    INSERT INTO work_images
    (work_id, url)
    VALUES(?, ?)
    `;

    console.log("Aquí comienza la inserción a work_image", work.insertId);

    const [work_image] = await myMarketDB.execute(addPostImageQuery, [
      work.insertId,
      url,
    ]);

    console.log("Aquí ya se finalizó la inserción de ambos");

    return {
      work,
      work_image,
    };
  } catch (error) {
    throw error;
  }
};

// Funcionalidad solo para administradores
export const changeStatus = async (id, status) => {
  try {
    const updateQuery = `
      UPDATE works w
      SET w.status = ?
      WHERE id = ?
    `;

    const response = await myMarketDB.execute(updateQuery, [status, id]);

    return response;
  } catch (error) {
    throw error;
  }
};

export const filterByCategory = async (id) => {
  try {
    const filterCategoryQuery = `
      SELECT * FROM works w
      INNER JOIN categories c ON c.id = w.category_id
      WHERE category_id = ?;
    `

    const [response] = await myMarketDB.execute(filterCategoryQuery, [id]);

    return response;

  } catch (error) {
    throw error;
  }
}

export const updatePost = async (id, category_id, title, description, price) => {
  try {

    const myUpdatePostQuery = `
      UPDATE works w
      SET w.category_id=?, w.title=?, w.description=?, w.price=?
      WHERE id = ?
    `

    const [response] = await myMarketDB.execute(myUpdatePostQuery, [
      category_id,
      title,
      description,
      price,
      id
    ])

    return response

  } catch (error) {
    throw error
  }
}

export const updateRole = async ({id, role_id}) => {
  try {
    const myUpdateRoleQuery = `
      UPDATE users
      SET users.role_id = ?
      WHERE users.id = ?
    `
    
    const [response] = await myMarketDB.execute(myUpdateRoleQuery, [
      role_id,
      id
    ])

    return response

  } catch (error) {
    throw error
  }
}