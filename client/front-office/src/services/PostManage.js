import Api from "./Api.js";

const BASE = "post/";

const PostManage = {
  // if data is empty, return all users
  getPosts(data) {
    return Api().get(BASE, { params: data });
  },
  getPost(id) {
    return Api().get(BASE + id);
  },
  addPost(data) {
    return Api().put(BASE + "new", data);
  },
  deletePost(id) {
    return Api().delete(BASE + id);
  },
  updatePost(id, data) {
    return Api().post(BASE + id, data);
  },
};

export default PostManage;
