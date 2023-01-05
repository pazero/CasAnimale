import Api from "./Api.js";

const BASE = "pets/";

const PetManage = {
  // if data is empty, return ALL pets, no matter what user is logged
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
