import React, { useState } from "react";
import ProductManage from "../services/ProductManage";
import {
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

const NewProduct = () => {
  const toast = useToast();

  const uploader = Uploader({
    apiKey: "free",
  });

  const options = { multi: false };

  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [tagInput, setTagInput] = useState(0);
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("0.01");
  const [quantity, setQuantity] = useState(1);

  const sendData = async (data) => {
    data.preventDefault();

    var tags = [];
    const taglist = [...document.querySelectorAll(".input-tag")];
    taglist.forEach((el) => {
      tags.push(el.value);
    });

    const msg = await ProductManage.newProduct({
      name,
      photo,
      description,
      tags,
      price,
      quantity,
    });
    if (msg.status.toString() === "200") {
      toast({
        title: "Item added successfully!",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
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

  const addTag = () => {
    if (tagInput < 5) setTagInput(tagInput + 1);
  };

  const delTag = () => {
    if (tagInput > 0) setTagInput(tagInput - 1);
  };

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
                <div className="card-title justify-center uppercase">
                  Sell a new product!
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Set the name{" "}
                      <span className="text-sm text-gray-400">*</span>
                    </span>
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
                <div className="form-control">
                  <div className="flex flex-1">
                    <label className="label">
                      <span className="label-text">Set some tags</span>
                    </label>
                    <Button size="sm" className="mr-2" onClick={addTag}>
                      +
                    </Button>
                    <Button size="sm" onClick={delTag}>
                      -
                    </Button>
                  </div>
                  {tagInput > 0 ? (
                    <div className="input mt-1">
                      <div className="flex flex-row">
                        {Array.from(Array(tagInput), (e, i) => {
                          return (
                            <Input
                              className="input-tag mr-1"
                              variant="filled"
                              placeholder="tag"
                            />
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Type the description of the product{" "}
                      <span className="text-sm text-gray-400">*</span>
                    </span>
                  </label>
                  <textarea
                    required
                    maxLength={300}
                    className="input input-bordered w-full"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Set the quantity{" "}
                      <span className="text-sm text-gray-400">*</span>
                    </span>
                  </label>
                  <NumberInput
                    required
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
                    <span className="label-text">
                      Set the price{" "}
                      <span className="text-sm text-gray-400">*</span>
                    </span>
                  </label>
                  <NumberInput
                    required
                    maxW={100}
                    min={0.01}
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
                  <button type="submit" className="btn btn-secondary mt-1">
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
