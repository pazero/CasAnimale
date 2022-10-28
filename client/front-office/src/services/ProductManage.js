import Api from "./Api.js";

const BASE = "product/";

const prodManage = {
  // if data is empty, return all users
  getProducts(data) {
    return data === undefined
      ? Api().get(BASE)
      : Api().get(
          `${BASE}?${data.map((value, key) => {
            return `${key}=${value}&`;
          })}`
        );
  },
  getProduct(id) {
    return Api().get(BASE + id);
  },
  newProduct(data) {
    return Api().put(BASE + "new", data);
  },
  deleteProduct(id) {
    return Api().delete(BASE + id);
  },
  updateProduct(data) {
    return Api().post(BASE + "update", data);
  },
  updateCart(id, quantity) {
    return Api().post(BASE + "updateCart/" + id + "/" + quantity);
  },
};

export default prodManage;
