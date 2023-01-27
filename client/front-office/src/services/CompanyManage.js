import Api from "./Api.js";

const BASE = "company/";

const PostManage = {
  // if data is empty, return all users
  getCompanies(data) {
    return Api().get(BASE, { params: data });
  },
  getCompany(id) {
    return Api().get(BASE + id);
  },
  newCompany(data) {
    return Api().put(BASE + "new", data);
  },
  deleteCompany(id) {
    return Api().delete(BASE + id);
  },
  updateCompany(id, data) {
    return Api().post(BASE + "update/" + id, data);
  },
};

export default PostManage;
