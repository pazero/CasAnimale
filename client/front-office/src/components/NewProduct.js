import React, { useState } from "react";
import ProductManage from "../services/ProductManage";
import {
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

const NewProduct = () => {
  const sendData = async (data) => {
    data.preventDefault();
    const msg = await ProductManage.newProduct({
      name,
      photo,
      description,
      price,
      quantity,
    });
    alert(msg.data.message);
    window.location.reload();
  };

  const uploader = Uploader({
    // Get production API keys from Upload.io
    apiKey: "free",
  });

  const options = { multi: false };

  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("1.50");
  const [quantity, setQuantity] = useState(1);

  return (
    <div data-theme="lemonade" className="flex flex-1 justify-center">
      <div className="hidden sm:flex flex-1 justify-center">
        <div
          className="flex justify-center"
          style={{ width: "90%", flex: "0 1 auto", alignItems: "center" }}
        >
          <form onSubmit={sendData} className="flex justify-center w-full">
            <div className="m-auto card justify-center w-full ">
              <div className="card-body text-center">
                <div className="card-title justify-center">
                  Sell a new product!
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Set the name</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Set a photo</span>
                  </label>
                  <UploadButton
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
                    {({ onClick }) => (
                      <div className="m-auto">
                        <button className="" onClick={onClick}>
                          <Image
                            id="changephoto"
                            src={photo}
                            className=""
                            boxSize="fill"
                            alt="Click here to upload a photo"
                          />
                        </button>
                      </div>
                    )}
                  </UploadButton>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Type the description of the product
                    </span>
                  </label>
                  <textarea
                    className="input input-bordered w-full"
                    placeholder="Type the text"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Set the quantity</span>
                  </label>
                  <NumberInput
                    size="md"
                    maxW={20}
                    defaultValue={1}
                    min={1}
                    onChange={(e) => setQuantity(e)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Set the price</span>
                  </label>
                  <NumberInput
                    maxW={100}
                    defaultValue={1}
                    min={1}
                    onChange={(valueString) => setPrice(valueString)}
                    value={price}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
                <div>
                  <button type="submit" className="btn btn-secondary m-1">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
