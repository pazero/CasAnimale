import Api from "./Api.js";

const Authentication = {
  register(data) {
    return Api().post('user/register', data);
  },
  login(credential) {
    return Api().post('user/login', credential);
  },
  getAllUsers() {
    return Api().get('user/getAllUsers');
  },
  getUser(id) {
    return Api().get(`user/${id}`);
  },
  deleteUser(id) {
    return Api().delete(`user/${id}`);
  },
  updateUser(id, data) {
    return Api().patch(`user/${id}`, data);
  },
};

export default Authentication;