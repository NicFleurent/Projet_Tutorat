import axios from "axios";
const baseUrl = "https://98b3-209-226-143-203.ngrok-free.app/api";

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
