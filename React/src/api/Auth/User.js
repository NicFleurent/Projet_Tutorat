import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

// Recuperer tous les utilisateurs de la base de donnees
const getUsers = async () => {
  const configurationObject = {
    method: "get",
    url: `${baseUrl}/utilisateurs`,
  };
  const response = await axios(configurationObject);
  return response.data;
};
