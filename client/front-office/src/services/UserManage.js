import Api from "./Api.js";

const BASE = "users/";

const Authentication = {
  // if data is empty, return all users
  getUsers(data) {
    return data === undefined
      ? Api().get(BASE)
      : Api().get(
          `${BASE}?${data.map((value, key) => {
            return `${key}=${value}&`;
          })}`
        );
  },
  getUser(id) {
    return Api().get(BASE + id);
  },
  addUser(data) {
    return Api().put(BASE + "addUser", data);
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
