import Api from "./Api.js";

const BASE = "prenotation/";

const PostManage = {
  // if data is empty, return all users
  getPrenotations(data) {
    return data === undefined
      ? Api().get(BASE)
      : Api().get(
          `${BASE}?${data.map((value, key) => {
            return `${key}=${value}&`;
          })}`
        );
  },
  getPrenotation(id) {
    return Api().get(BASE + id);
  },
  addPrenotation(data) {
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
