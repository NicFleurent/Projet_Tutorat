import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';



// Passing configuration object to axios
const getUsers = async () => {
    const configurationObject = {
      method: 'get',
      url: `${baseUrl}/utilisateurs`,
    };
    const response = await axios(configurationObject);
    return response.data;
  };