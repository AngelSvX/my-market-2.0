import { showAdminData } from "../services/data.service.js";

export const getAdminData = async (req, res) => {
  try {
    const response = showAdminData();
    res.status(200).json({ response: response });
  } catch (error) {
    console.log("Ocurrió un error recogiendo data del administrador");
    console.log("-----------------------------------");
    console.log(error);
    res.status(500).json(error);
  }
};
