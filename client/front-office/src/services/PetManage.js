import Api from "./Api.js";

const BASE = "pet/";

const PetManage = {
  // if data is empty, return all users
  getPets(data) {
    return Api().get(BASE, { params: data });
  },
  getPet(id) {
    return Api().get(BASE + id);
  },
  newPet(data) {
    return Api().put(BASE + "new", data);
  },
  deletePet(id) {
    return Api().delete(BASE + id);
  },
  updatePet(id, data) {
    return Api().post(BASE + id, data);
  },
};

export default PetManage;
