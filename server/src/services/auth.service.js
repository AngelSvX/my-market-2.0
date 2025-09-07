import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { myMarketDB } from "../settings/db.js";

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

    // Todo correcto, se envía la respuesta del usuario al front

    const token = jwt.sign(
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

export const createUser = async ({
  role_id,
  name,
  email,
  google_id,
  password,
  created_at,
}) => {
  try {
    const insertUserQuery = `
      INSERT INTO users 
      (role_id, name, email, google_id, password, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const passwordHashed = await bcrypt.hash(password, 10);

    const response = await myMarketDB.execute(insertUserQuery, [
      role_id,
      name,
      email,
      google_id,
      passwordHashed,
      created_at,
    ]);

    return response;

  } catch (error) {
    console.error(error);
    return error;
  }
};
