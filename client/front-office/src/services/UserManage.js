import Api from "./Api.js";

const BASE = "users/";

const Authentication = {
  // if data is empty, return all users
  getUsers(data) {
    return Api().get(
      `${BASE}?${data.map((value, key) => {
        return `${key}=${value}&`;
      })}`
    );
  },
  getUser(id) {
    return id === undefined
      ? Api().get(BASE + "getUserInfo")
      : Api().get(BASE + id);
  },
  newUser(data) {
    return Api().put(BASE + "newUser", data);
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
};

export default Authentication;
