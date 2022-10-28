import Api from "./Api.js";

const BASE = "company/";

const PostManage = {
  // if data is empty, return all users
  getCompanies(data) {
    return data === undefined
      ? Api().get(BASE)
      : Api().get(
          `${BASE}?${data.map((value, key) => {
            return `${key}=${value}&`;
          })}`
        );
  },
  getCompany(id) {
    return Api().get(BASE + id);
  },
  addCompany(data) {
    return Api().put(BASE + "new", data);
  },
  deleteCompany(id) {
    return Api().delete(BASE + id);
  },
  updateCompany(id, data) {
    return Api().post(BASE + id, data);
  },
};

export default PostManage;
