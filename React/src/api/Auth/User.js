import axios from "axios";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

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

export const edit = async (email, nom, prenom, token) => {
  try {
    const configurationObject = {
      method: "put",
      url: `${baseUrl}utilisateurs/edit`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: email,
        nom: nom,
        prenom: prenom,
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

export const deleteAccount = async (token) => {
  try {
    const configurationObject = {
      method: "patch",
      url: `${baseUrl}utilisateurs/desactiver`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios(configurationObject);
    return response;
  } catch (error) {
    throw new Error("Erreur lors de la suppresion : " + error.message);
  }
};

export const updatePassword = async (oldPassword, newPassword, token) => {
  try {
    const configurationObject = {
      method: "put",
      url: `${baseUrl}utilisateurs/updatePassword`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        old_password: oldPassword,
        new_password: newPassword,
      },
    };
    const response = await axios(configurationObject);
    return response;
  } catch (error) {
    throw new Error("" + error.message);
  }
};
