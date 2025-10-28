import {
  addCategories,
  addCommentByPost,
  addPost,
  changeStatus,
  getAllPosts,
  getCategories,
  getCommentsByPost,
  userProfileData,
} from "../services/user.service.js";

// Controlador para todos los usuarios
export const userProfileDataController = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await userProfileData(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controlador para administradores
export const addCategoriesController = async (req, res) => {
  try {
    const { newCategorie } = req.body;

    const response = await addCategories(newCategorie);

    return res.status(200).json({ response: response });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// Controlador para Administradores y Vendedores
export const getCategoriesController = async (req, res) => {
  try {
    const response = await getCategories();

    return res.status(200).json(response);
  } catch (error) {}
};

// Controlador para todos
export const getCommentsByPostController = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await getCommentsByPost(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// Controlador para todos
export const getAllPostsController = async (req, res) => {
  try {
    const response = await getAllPosts();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// Controlador para todos
export const addCommentByPostController = async (req, res) => {
  try {
    const { work_id, user_id, rating, comment } = req.body;

    const response = await addCommentByPost({
      work_id,
      user_id,
      rating,
      comment,
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controlador para vendedores
export const addPostController = async (req, res) => {
  try {
    const { user_id, category_id, title, description, price, status, url } =
      req.body;

    const response = await addPost({
      user_id,
      category_id,
      title,
      description,
      price,
      status,
      url,
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Controlador solo para administradores
export const changeStatusController = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const response = await changeStatus(id, status);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};