import axios from "axios";
import Const from "./utils";

const baseURL = Const.BEURL + "/api/";

const Api = () => {
  return axios.create({
    baseURL,
    withCredentials: true,
  });
};

export default Api;
