import Api from "./Api.js";

const BASE = "pets/";

const Authentication = {
  // if data is empty, return all pets
  getPets(data) {
    return data === undefined
      ? Api().get(BASE)
      : Api().get(
        `${BASE}?${data.map((value, key) => {
          return `${key}=${value}&`;
        })}`
      );
  },
  getPet(id) {
    return id === undefined
      ? Api().get(BASE + "getPetInfo")
      : Api().get(BASE + id);
  },
  newPet(data) {
    return Api().put(BASE + "newPet", data);
  },
  deletePet(id) {
    return Api().delete(BASE + id);
  },
  updatePet(data) {
    return Api().post(BASE + "update", data);
  },
};

export default Authentication;
