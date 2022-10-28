import Api from "./Api.js";

const BASE = "pet/";

const PostManage = {
  // if data is empty, return all users
  getPets(data) {
    return Api().get(BASE, { params: data });
  },
  getPets(id) {
    return Api().get(BASE + id);
  },
  addPet(data) {
    return Api().put(BASE + "new", data);
  },
  deletePet(id) {
    return Api().delete(BASE + id);
  },
  updatePet(id, data) {
    return Api().post(BASE + id, data);
  },
};

export default PostManage;
