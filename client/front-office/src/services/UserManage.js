import Api from "./Api.js";

const Authentication = {
  register(data) {
    return Api().post("users/register", data);
  },
  login(credential) {
    return Api().post("users/login", credential);
  },
  getAllUsers() {
    return Api().get("users/getAllUsers");
  },
};

export default Authentication;