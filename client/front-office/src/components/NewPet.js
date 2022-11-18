import React, { useState } from "react";
import PetManage from "../services/PetManage";

const NewPet = () => {
  const sendData = async (data) => {
    data.preventDefault();
    const msg = await PetManage.newPet({
      name,
      species,
      breed,
      birth
    });
    alert(msg.data.message);
    window.location.reload();
  };

  const [name, setName] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breed, setBreed] = useState([]);
  const [birth, setBirth] = useState([]);

  let date = new Date();
  const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  return (
    <div data-theme="lemonade" className="flex flex-1 justify-center">
      <div className=" hidden sm:flex flex-1 justify-center">
        <div
          className="flex justify-center"
          style={{ width: "90%", flex: "0 1 auto", alignItems: "center" }}
        >
          <form onSubmit={sendData} className="flex justify-center w-full">
            <div className="m-auto card justify-center w-full ">
              <div className="card-body text-center">
                <div className="card-title justify-center">
                  Add a new pet!
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Lulu"
                    className="input input-bordered"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="spc">
                    <span className="label-text">Species</span>
                  </label>
                  <select id="spc" className="input input-bordered" name="spc" onChange={(e) => setSpecies(e.target.value)}>
                    <option disabled={true} defaultValue="">
                      --Choose and option--
                    </option>
                    <option value="dog">dog</option>
                    <option value="cat">cat</option>
                    <option value="rodent">rodent</option>
                    <option value="turtle">turtle</option>
                    <option value="fish">fish</option>
                    <option value="snake">snake</option>
                    <option value="insect">insect</option>
                    <option value="bat">bat</option>
                    <option value="spider">spider</option>
                    <option value="amphibian">amphibian</option>
                    <option value="monkey">monkey</option>
                    <option value="turtle">turtle</option>
                    <option value="crustacean">crustacean</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Breed</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Dobermann"
                    className="input input-bordered"
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Birth</span>
                  </label>
                  <input
                    type="date"
                    max={today}
                    className="input input-bordered"
                    onChange={(e) => setBirth(e.target.value)}
                  />
                </div>
                <div>
                  <button className="btn btn-secondary m-1">save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPet;
