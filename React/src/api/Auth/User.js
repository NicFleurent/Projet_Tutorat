import axios from "axios";
const baseUrl = "https://e4fb-174-93-239-141.ngrok-free.app/api/";

export const login = async (email, password) => {
  try {
    const configurationObject = {
      method: "post",
      url: `${baseUrl}login`,
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
    throw new Error(error.message);
  }
};

export const register = async (email, nom, prenom, password) => {
  try {
    const configurationObject = {
      method: "post",
      url: `${baseUrl}register`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        nom: nom,
        prenom: prenom,
        role: "RAS",
        password: password,
      },
    };
    const response = await axios(configurationObject);
    return response;
  } catch (error) {
    throw new Error("Erreur lors de l'inscription : " + error.message);
  }
};
