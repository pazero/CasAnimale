import React from "react";

const BookVetVisit = () => {
    /*const sendData = async (data) => {
    data.preventDefault();
    const msg = await PostManage.addPost({
      title,
      description,
    });
    alert(msg.data.message);
    window.location.reload();
  };

  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
    */
  return (
    <div data-theme="lemonade" className="flex flex-1 justify-center">
      <div className=" hidden sm:flex flex-1 justify-center">
        <div
          className="flex justify-center"
          style={{ width: "90%", flex: "0 1 auto", alignItems: "center" }}
        >
          <form /*onSubmit={}*/ className="flex justify-center w-full">
            <div className="m-auto card justify-center w-full ">
              <div className="card-body text-center">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Choose the location:</span>
                    </label>
                    <select className="locationList bg-white input input-bordered">
                        <option value="corticella">Corticella</option>
                        <option value="bologna">Bologna</option>
                    </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Choose the date:</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    //onChange={}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Choose the time:</span>
                  </label>
                  <select className="locationList bg-white input input-bordered">
                        <option value="09-00">9:00</option>
                        <option value="11-00">11:00</option>
                    </select>
                </div>
                <div>
                  <button className="btn btn-secondary m-1">Book</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookVetVisit;
