import React, { useContext, useEffect, useState } from "react";
import ItemContext from "../context/items/itemContext";
import usericon from "./usericon.png";
import { useNavigate } from "react-router-dom";
const View = (props) => {
  const { showalert } = props;
  const navigate = useNavigate();
  const context = useContext(ItemContext);
  const { getuser, details, updateuser, deleteuser } = context;
  useEffect(() => {
    getuser();
  });
  const [credentials, setCredentials] = useState({
    id: "",
    ename: "",
    eemail: "",
    epassword: "",
    ecpassword:"",
  });

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const edituser = (currentuser) => {
    setCredentials({
      id: currentuser._id,
      ename: currentuser.name,
      eemail: currentuser.email,
      epassword: "",
      ecpassword:"",
    });
  };

  const update = (e) => {
    e.preventDefault();
    updateuser(
      credentials.id,
      credentials.ename,
      credentials.eemail,
      credentials.epassword
    );
    showalert("Your details are updated succesfully", "success");
  };
  return (
    <>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update your profile
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="ename" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ename"
                      name="ename"
                      onChange={onchange}
                      required
                      minLength={5}
                      value={credentials.ename}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eemail" className="form-label">
                      Email :
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="eemail"
                      name="eemail"
                      onChange={onchange}
                      required
                      value={credentials.eemail}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="epassword" className="form-label">
                      Enter new password : 
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="epassword"
                      name="epassword"
                      onChange={onchange}
                      required
                      value={credentials.epassword}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ecpassword" className="form-label">
                      Confirm new password : 
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="ecpassword"
                      name="ecpassword"
                      onChange={onchange}
                      required
                      value={credentials.ecpassword}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary">
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={update}
                  disabled={credentials.epassword!==credentials.ecpassword}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card  mx-auto my-5" style={{ width: "19rem" }}>
          <img
            src={usericon}
            className="card-img-top my-2"
            alt="..."
            style={{ height: "13em" }}
          />
          <div className="card-body">
            <h5 className="card-title text-center">{details.name}</h5>
            <p className="card-text text-center">
              <strong>id:</strong> {details._id}
            </p>
            <p className="card-text text-center">
              <strong>email id:</strong> {details.email}
            </p>
            <p className="card-text text-center">
              <strong>joining date:</strong>{" "}
              {new Date(details.date).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-danger mx-2"
            onClick={() => {
              deleteuser(details._id);
              navigate("/login");
              localStorage.removeItem("logintoken");
              showalert("Account seleted succesfully", "success");
            }}
          >
            Delete account
          </button>
          <button
            type="button"
            className="btn btn-warning mx-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ width: "10em" }}
            onClick={() => {
              edituser(details);
            }}
          >
            Update details
          </button>
        </div>
      </div>
    </>
  );
};

export default View;
