import Api from "./Api.js";

const BASE = "user/";

const Authentication = {
  // if data is empty, return all users
  getUsers(data) {
    return Api().get(BASE, { params: data });
  },
  getUser(id) {
    return id === undefined
      ? Api().get(BASE + "getInfo")
      : Api().get(BASE + id);
  },
  newUser(data) {
    return Api().put(BASE + "new", data);
  },
  deleteUser(id) {
    return Api().delete(BASE + id);
  },
  updateUser(data) {
    return Api().post(BASE + "update", data);
  },
  login(credential) {
    return Api().post(BASE + "login", credential);
  },
  restore(credential) {
    return Api().post(BASE + "restore", credential);
  },
  buyUserCart() {
    return Api().post(BASE + "cart/buy");
  },
  isLogged() {
    return Api().post(BASE + "isLoggedIn");
  },
  restore(mail) {
    return Api().put("restore/new", mail);
  }
};

export default Authentication;
