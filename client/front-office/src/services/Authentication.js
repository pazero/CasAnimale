import Api from "./Api.js";

// eslint-disable-next-line
export default {
  register(data) {
    return Api().post("register", data);
  },
  login(credential) {
    return Api().post("login", credential);
  },
};
