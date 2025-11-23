import { auth, createUser, googleAuth } from "../services/auth.service.js";

export const authController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await auth({ email, password });

    console.log(response);

    if (!response.found) {
      return res.status(404).json({ message: "Usuario no registrado." });
    }

    if (!response.isMatch) {
      return res.status(403).json({ message: "Credenciales inválidas." });
    }

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createUserController = async (req, res) => {
  try {
    const { role_id, name, email, password } = req.body;

    const response = await createUser({
      role_id,
      name,
      email,
      password,
    });

    return res.status(200).json({ response: response });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const googleAuthController = async (req, res) => {
  try {
    const { google_auth } = req.body;

    const response = await googleAuth(google_auth);

    if (!response.ok) {
      return res.status(response.status).json({
        error: response.message,
      });
    }

    if(response.create_user){
      return res.status(response.status).json({
        message: response.message
      })
    }

    // Si el usuario existe mediante google, se envía los datos del usuario.
    return res.status(200).json(response.user);

  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
