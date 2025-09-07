import { addCategories, userProfileData } from "../services/user.service.js";

// Controlador para todos los usuarios
export const userProfileDataController = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await userProfileData(id);

    return res.status(200).json({ response: response });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controlador para administradores
export const addCategoriesController = async (req, res) => {
  try {

    const { name } = req.body

    const response = await addCategories(name)

    return res.status(200).json({response: response})

  } catch (error) {
    return res.status(500).json({error})
  }
}