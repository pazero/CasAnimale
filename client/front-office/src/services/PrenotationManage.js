import Api from "./Api.js";

const BASE = "prenotation/";

const PostManage = {
  // if data is empty, return all users
  getPrenotations(data) {
    return Api().get(BASE, { params: data });
  },
  getPrenotation(id) {
    return Api().get(BASE + id);
  },
  newPrenotation(data) {
    return Api().put(BASE + "new", data);
  },
  deletePrenotation(id) {
    return Api().delete(BASE + id);
  },
  updatePrenotation(id, data) {
    return Api().post(BASE + id, data);
  },
};

export default PostManage;
