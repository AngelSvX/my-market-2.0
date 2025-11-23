import { OAuth2Client } from "google-auth-library";

export const verifyGoogleToken = async (token) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    console.error("Un error ocurrió visualizando el token")
    return null
  }
};
