import React, { useContext, useEffect } from "react";
import ItemContext from "../context/items/itemContext";

const Showuser = (props) => {
  const context = useContext(ItemContext);
  const { users, fetchuser } = context;
  useEffect(() => {
    fetchuser();
  });
  return (
    <>
      <h2 className="text-center my-5">User Details</h2>
      <div className="container my-3">
        <div
          className="container d-flex justify-content-around my-3"
          style={{ display: users.length === 0 ? "none" : "" }}
        >
          <span
            style={{ fontWeight: "bold" }}
          >
            no.
          </span>
          <span className="me-5"  style={{ fontWeight: "bold" }}>
          Name
          </span>
          <span className="me-5 text-center"  style={{ fontWeight: "bold" }}>
          Personal emailid
          </span>
          <span className="me-5"  style={{ fontWeight: "bold" }}>
            joining date
          </span>
        </div>
        <hr />
      </div>
      <div
        className="container my-3"
        style={{ display: users.length === 0 ? "none" : "block" }}
      >
        {users.map((user, index) => {
          return (
            <div className="container my-3" key={index}>
              <div className="container d-flex justify-content-around my-3">
                <span className="ms-5">{index + 1}</span>
                <span className="ms-5">{user.name}</span>
                <span className="ms-5">{user.email}</span>
                <span className="ms-5">{new Date(user.date).toGMTString()}</span>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <div
        className="container my-3 alert alert-warning text-center"
        role="alert"
        style={{ display: users.length === 0 ? "block" : "none" }}
      >
        Nothing to show, please use right credentials to see all users
      </div>
    </>
  );
};

export default Showuser;
