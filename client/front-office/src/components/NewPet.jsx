import React, { useState } from "react";
import PetManage from "../services/PetManage";
import { Image, useToast } from "@chakra-ui/react";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

const NewPet = () => {
  const toast = useToast();

  const sendData = async (data) => {
    data.preventDefault();
    const msg = await PetManage.newPet({
      name,
      photo,
      species,
      breed,
      birth,
    });
    if (msg.status.toString() === "200") {
      toast({
        title: "Pet added successfully!",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
      window.location = window.location;
    } else {
      toast({
        title: "Ops something went wrong!",
        description: "If you can't proceed with the entering try to re-access.",
        status: "error",
        duration: 3000,
        variant: "subtle",
      });
    }
  };

  const [name, setName] = useState("");
  const [species, setSpecies] =
    useState(
      "dog"
    ); /** se non si seleziona attivamente dal menù, ma si lascia il dog di default non viene assegnato nel modo corretto */
  const [breed, setBreed] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [photo, setPhoto] = useState("");

  const uploader = Uploader({
    apiKey: "free",
  });

  const options = { multi: false };

  function today() {
    let date = new Date();
    return toString(
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  }

  function checkPhoto() {
    if (photo === "") return true;
    else return false;
  }

  return (
    <div data-theme="lemonade" className="flex flex-1 justify-center">
      <div className="flex flex-1 justify-center">
        <div
          className="flex justify-center"
          style={{ width: "90%", flex: "0 1 auto", alignItems: "center" }}
        >
          <form onSubmit={sendData} className="flex justify-center w-full">
            <div className="mx-3 mt-0 card justify-center w-full ">
              <div className="card-body text-center py-0">
                <h1 className="card-title text-md font-semibold justify-center uppercase">
                  Add a new pet!
                </h1>
                <div className="form-control">
                  <label className="label" for="petName">
                    <span className="label-text">
                      Name <span className="text-sm text-gray-400">*</span>
                    </span>
                  </label>
                  <input
                    id="petName"
                    type="text"
                    placeholder="Lulu"
                    className="input input-bordered"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="species">
                    <span className="label-text">
                      Species <span className="text-sm text-gray-400">*</span>
                    </span>
                  </label>
                  <select
                    id="species"
                    className="input input-bordered"
                    name="species"
                    required
                    onChange={(e) => setSpecies(e.target.value)}
                  >
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
                    <option value="crustacean">crustacean</option>
                    <option value="bird">bird</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label" for="petBreed">
                    <span className="label-text">
                      Breed <span className="text-sm text-gray-400">*</span>
                    </span>
                  </label>
                  <input
                    id="petBreed"
                    type="text"
                    placeholder="Dobermann"
                    className="input input-bordered"
                    required
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="petBirthDate">
                    <span className="label-text">
                      Birth <span className="text-sm text-gray-400">*</span>
                    </span>
                  </label>
                  <input
                    id="petBirthDate"
                    type="date"
                    placeholder="Birth date"
                    className="input input-bordered"
                    max={today()}
                    required
                    onChange={(e) => setBirth(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="petPhoto">
                    <span className="label-text">Photo</span>
                  </label>
                  <UploadButton
                    id="petPhoto"
                    uploader={uploader} // Required.
                    options={options} // Optional.
                    onComplete={(files) => {
                      // Optional.
                      if (files.length === 0) {
                        console.log("No files selected.");
                      } else {
                        console.log("Files uploaded");
                        console.log(files.map((f) => setPhoto(f.fileUrl)));
                      }
                    }}
                  >
                    {({ onClick }) =>
                      checkPhoto() ? (
                        <>
                          <div className="rounded-lg pt-1 flex items-center justify-center border-dashed border-2 border-gray-300">
                            <button
                              className="text-gray-400 text-center"
                              onClick={onClick}
                            >
                              <Image
                                id="changephoto"
                                src={photo}
                                className="input input-bordered"
                                boxSize="fill"
                                alt="UPLOAD A PHOTO"
                              />
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="rounded-lg py-1 flex items-center justify-center">
                            <button className="" onClick={onClick}>
                              <Image
                                id="changephoto"
                                src={photo}
                                className="input input-bordered"
                                boxSize="fill"
                                alt="Upload a photo"
                              />
                            </button>
                          </div>
                        </>
                      )
                    }
                  </UploadButton>
                </div>
                <div>
                  <button className="btn btn-secondary mt-3">save</button>
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
