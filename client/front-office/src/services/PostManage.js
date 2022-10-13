import Api from "./Api.js";

const base = "posts/";

const PostManage = {
  // if data is empty, return all users
  getPosts(data) {
    return data === undefined
      ? Api().get(base)
      : Api().get(
          `${base}?${data.map((value, key) => {
            return `${key}=${value}&`;
          })}`
        );
  },
  getPost(id) {
    return Api().get(`${base}${id}`);
  },
  addPost(data) {
    return Api().put(`${base}addPost`, data);
  },
  deletePost(id) {
    return Api().delete(`${base}${id}`);
  },
  updatePost(id, data) {
    return Api().post(`${base}${id}`, data);
  },
};

export default PostManage;
