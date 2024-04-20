import axios from "axios";
const baseUrl =
  "https://d123-2605-8d80-5a2-3a80-1524-ba59-439-3e9a.ngrok-free.app/api";

export const login = async (email, password) => {
  try {
    const configurationObject = {
      method: "post",
      url: `${baseUrl}/login`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
      },
    };
    const response = await axios(configurationObject);
    return response;
  } catch (error) {
    throw new Error("Erreur lors de la connexion : " + error.message);
  }
};
