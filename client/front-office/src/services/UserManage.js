import Api from "./Api.js";

const s = "user/";

const Authentication = {
  getAllUsers() {
    return Api().get(`${s}getAllUsers`);
  },
  getUsers(data) {
    return Api().get(
      `${s}/getUsers?${data.map((value, key) => {
        return `${key}=${value}&`.slice(0, -1);
      })}`
    );
  },
  getUser(id) {
    return Api().get(`${s}${id}`);
  },
  addUser(data) {
    return Api().put(`${s}addUser`, data);
  },
  deleteUser(id) {
    return Api().delete(`${s}${id}`);
  },
  updateUser(id, data) {
    return Api().put(`${s}${id}`, data);
  },
  login(credential) {
    return Api().post(`${s}login`, credential);
  },
};

export default Authentication;
