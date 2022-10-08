import axios from "axios";

const baseURL = "http://localhost:5000/";


const Api = () => {
  return axios.create({
    baseURL,
    withCredentials: true
  });
};

export default Api;
