import Api from "./Api.js";

export default {
  register(data) {
    return Api().post("register", data);
  },
  login(credential) {
    return Api().post("login", credential);
  },
};
