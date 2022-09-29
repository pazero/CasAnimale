import Api from "./Api.js";

const base = "users/";

const Authentication = {
  // if data is empty, return all users
  getUsers(data) {
    return data === undefined
      ? Api().get(base)
      : Api().get(
          `${base}?${data.map((value, key) => {
            return `${key}=${value}&`;
          })}`
        );
  },
  getUser(id) {
    return Api().get(`${base}${id}`);
  },
  addUser(data) {
    return Api().put(`${base}addUser`, data);
  },
  deleteUser(id) {
    return Api().delete(`${base}${id}`);
  },
  updateUser(id, data) {
    return Api().post(`${base}${id}`, data);
  },
  login(credential) {
    return Api().post(`${base}login`, credential);
  },
  restore(credential) {
    return Api().post(`${base}restore`, credential);
  },
};

export default Authentication;
