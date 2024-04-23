import axios from "axios";
const baseUrl = "https://9dd1-209-226-143-203.ngrok-free.app/api/";

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

export const edit = async (email, nom, prenom, id) => {
  try {
    const configurationObject = {
      method: "put",
      url: `${baseUrl}utilisateurs/edit/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        nom: nom,
        prenom: prenom,
        role: "RAS",
      },
    };
    const response = await axios(configurationObject);
    return response;
  } catch (error) {
    throw new Error("Erreur lors de la modification : " + error.message);
  }
};

export const logout = async (token) => {
  try {
    const configurationObject = {
      method: "post",
      url: `${baseUrl}logout`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios(configurationObject);
    return response;
  } catch (error) {
    throw new Error("Erreur lors de la déconnexion : " + error.message);
  }
};

export const deleteAccount = async (id) => {
  try {
    const configurationObject = {
      method: "delete",
      url: `${baseUrl}utilisateurs/delete/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await axios(configurationObject);
    return response;
  } catch (error) {
    throw new Error("Erreur lors de la suppresion : " + error.message);
  }
};
