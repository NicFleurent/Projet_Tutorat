import axios from "axios";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getConversations = async (token) => {
  try {
    const configurationObject = {
      method: "get",
      url: `${baseUrl}conversations`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios(configurationObject);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des conversations:", error);
    throw new Error("Erreur lors de la récupération des conversations");
  }
};

export const showConversation = async (token, id) => {
  try {
    const configurationObject = {
      method: "post",
      url: `${baseUrl}conversations/show/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios(configurationObject);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération de la conversation:", error);
    throw new Error("Erreur lors de la récupération de la conversation");
  }
};
