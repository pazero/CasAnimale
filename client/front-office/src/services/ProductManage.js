import Api from "./Api.js";

const BASE = "products/";

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
    return Api().put(BASE + "newProduct", data);
  },
  deleteProduct(id) {
    return Api().delete(BASE + id);
  },
  updateProduct(data) {
    return Api().post(BASE + "update", data);
  },
  addToCart(id, quantity) {
    return Api().post(BASE + "addToCart/" + id + "/" + quantity);
  },
};

export default prodManage;
