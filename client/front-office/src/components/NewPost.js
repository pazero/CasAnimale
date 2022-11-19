import React, { useState } from "react";
import PostManage from "../services/PostManage";
import {Image} from "@chakra-ui/react"
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

const NewPost = () => {
  const sendData = async (data) => {
    data.preventDefault();
    const msg = await PostManage.newPost({
      title,
      photo,
      description,
    });
    alert(msg.data.message);
    window.location.reload();
  };

  const [title, setTitle] = useState([]);
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");

  const uploader = Uploader({
    // Get production API keys from Upload.io
    apiKey: "free",
  });

  const options = { multi: false };

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
                  Create a new post!
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Type the title</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Title"
                    className="input input-bordered"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Type the description of the post
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
                <div>
                  <button className="btn btn-secondary m-1">Post</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
