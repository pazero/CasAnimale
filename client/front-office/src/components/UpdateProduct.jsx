import React, { useState } from "react";
import ProductManage from "../services/ProductManage";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";

const UpdateProduct = (props) => {
  const toast = useToast();

  const [quantity, setNewQuantity] = useState(0);
  const prod_id = props.data._id;

  const updateItem = async (data) => {
    data.preventDefault();
    const msg = await ProductManage.updateProduct({
      prod_id,
      quantity,
    });
    if (msg.status.toString() === "200") {
      toast({
        title: "Item's quantity updated successfully!",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
      window.location = window.location;
    } else
      toast({
        title: "Ops something went wrong!",
        description: "If you can't proceed updating try to re-access.",
        status: "error",
        duration: 3000,
        variant: "subtle",
      });
  };

  return (
    <>
      <div data-theme="lemonade" className="flex flex-1 justify-center">
        <div className="flex flex-1 justify-center">
          <div
            className="flex justify-center"
            style={{ width: "90%", flex: "0 1 auto", alignItems: "center" }}
          >
            <form onSubmit={updateItem} className="flex justify-center w-full">
              <div className="mx-3 mt-0 card justify-center w-full ">
                <div className="card-body text-center py-0">
                  <div className="card-title justify-center uppercase">
                    Update product quantity!
                  </div>
                  <div className="form-control justify-center inline-block space-x-4">
                    <label className="label">
                      <span className="label-text">
                        New quantity available{" "}
                        <span className="text-sm text-gray-400">*</span>
                      </span>
                    </label>
                    <NumberInput
                      required
                      size="md"
                      maxW={20}
                      defaultValue={props.data.quantity}
                      min={0}
                      onChange={(e) => setNewQuantity(e)}
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
    </>
  );
};

export default UpdateProduct;
