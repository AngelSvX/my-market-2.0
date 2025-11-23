import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { myMarketDB } from "../settings/db.js";
import { verifyGoogleToken } from "../utils/verifyGoogleToken.js";

export const auth = async ({ email, password }) => {
  try {
    const myQuery = `
    SELECT u.id, u.name, u.email, u.password, r.name as roleName FROM users u
    INNER JOIN roles r ON u.role_id = r.id
    WHERE u.email = ?
    `;

    const [response] = await myMarketDB.execute(myQuery, [email]);

    // ¿Existe?
    const user = response[0];

    if (!user) {
      return {
        found: false,
      };
    }

    // ¿La contraseña es la correcta?
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        found: true,
        isMatch: false,
      };
    }
    const token =
      // Todo correcto, se envía la respuesta del usuario al front
      jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.roleName,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

    return {
      found: true,
      isMatch: true,
      token,
    };
  } catch (error) {
    throw error;
  }
};

export const createUser = async ({ role_id, name, email, password }) => {
  try {
    const insertUserQuery = `
      INSERT INTO users 
      (role_id, name, email, password)
      VALUES (?, ?, ?, ?)
    `;

    const passwordHashed = await bcrypt.hash(password, 10);

    const response = await myMarketDB.execute(insertUserQuery, [
      role_id,
      name,
      email,
      passwordHashed,
    ]);

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const googleAuth = async (google_auth) => {
  try {
    // ! PARA NO OLVIDAR
    // Aquí validamos si el token es correcto.
    const is_token_valid = await verifyGoogleToken(google_auth);

    if (!is_token_valid) {
      return {
        ok: false,
        status: 401,
        message: "Token inválido o expirado.",
      };
    }

    // Si el token es correcto, aquí validamos si el usuario existe o no.
    const user_exist_query = `
      SELECT u.id, u.name, u.email, r.name as role , u.google_id FROM users u
      INNER JOIN roles r ON r.id = u.role_id
      WHERE u.email = ?;
    `;

    const [[user_exist]] = await myMarketDB.execute(user_exist_query, [
      is_token_valid.email,
    ]);

    // Si el usuario no existe, lo creamos.

    if (!user_exist) {

      const create_query = `
        INSERT INTO users 
        (role_id, name, email, google_id)
        VALUES (?, ?, ?, ?)
      `

      const role_id = 4 // Este id es "Por Definir"

      const [create_user] = await myMarketDB.execute(create_query, [
        role_id,
        is_token_valid.given_name,
        is_token_valid.email,
        is_token_valid.sub
      ])

      return {
        ok: true,
        status: 200,
        message: "Usuario creado satisfactoriamente.",
        create_user
      };
    }

    // Si el usuario existe, validamos que tenga google_id para saber que fue registrado con google

    if(user_exist){
      if(!user_exist.google_id){
        return{
          ok: false,
          status: 403,
          message: "El correo ya existe."
        }
      }
    }

    // Si tiene el google_id, entonces procede, si no tiene el google_id dirá que el correo ya existe.

    const user_to_send = {
      id: user_exist.id,
      name: user_exist.name,
      email: user_exist.email,
      role: user_exist.role,
      iat: is_token_valid.iat,
      exp: is_token_valid.exp,
      google_id: user_exist.google_id
    }

    return {
      ok: true,
      status: 200,
      user: user_to_send,
    };
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};
