import React, { useContext, useEffect, useRef, useState } from "react";
import ItemContext from "../context/items/itemContext";
import Additem from "./Additem";
import grocery from "./grocery.jpeg";
import Itemitem from "./Itemitem";
import { useNavigate } from "react-router-dom";
const Items = (props) => {
  const navigate = useNavigate();
  const context = useContext(ItemContext);
  const ref = useRef(null);
  const closeref = useRef(null);
  const { showalert } = props;
  const { items, getitem, updateitem } = context;
  useEffect(() => {
    if (localStorage.getItem("logintoken")) {
      getitem();
    } else {
      showalert("Please login in our website", "info");
      navigate("/login");
    }
  });
  const [item, setItem] = useState({
    id: "",
    eitemname: "",
    equantity: "",
    eprice: "",
  });

  const onchange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const editItem = (currentItem) => {
    ref.current.click();
    setItem({
      id: currentItem._id,
      eitemname: currentItem.itemname,
      equantity: currentItem.quantity,
      eprice: currentItem.price,
    });
  };

  const handleupdate = (e) => {
    e.preventDefault();
    updateitem(item.id, item.eitemname, item.equantity, item.eprice);
    showalert("Item is updated successfully");
    closeref.current.click();
  };

  let totalcost = 0;

  return (
    <div>
      <Additem showalert={showalert} />
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
          style={{ display: "none" }}
        >
          Launch demo modal
        </button>
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
                  Update Your Item
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
                    <label htmlFor="eitemname" className="form-label">
                      Item name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eitemname"
                      name="eitemname"
                      onChange={onchange}
                      required
                      value={item.eitemname}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="equantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="equantity"
                      name="equantity"
                      onChange={onchange}
                      required
                      value={item.equantity}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eprice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="eprice"
                      name="eprice"
                      onChange={onchange}
                      required
                      value={item.eprice}
                    />
                  </div>
                  {/* <button
                    type="submit"
                    className="btn btn-primary"
                    id="submit"
                    // onClick={addclick}
                    // disabled={item.itemname === "" || item.quantity === ""}
                  >
                    Add to cart
                  </button> */}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={closeref}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleupdate}
                  disabled={
                    item.eitemname === "" ||
                    item.equantity === "" ||
                    item.eprice === ""
                  }
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="image my-3">
        <img src={grocery} alt="..." />
      </div>
      <div className="container my-3">
        <div className="container-sm" style={{display:(items.length===0)?'none':''}}>
          <span
            className="w-3"
            style={{ marginLeft: "10px", fontWeight: "bold" }}
          >
            no.
          </span>
          <span className="w-3" style={{ fontWeight: "bold" }}>
            name
          </span>
          <span className="w-3" style={{ fontWeight: "bold" }}>
            quantity
          </span>
          <span className="w-3" style={{ fontWeight: "bold" }}>
            price
          </span>
          <span className="w-3" style={{ fontWeight: "bold" }}></span>
        </div>
        <hr />
      </div>
      <div className="container my-3" style={{display:(items.length===0)?'none':'block'}}>
        {items.map((item, index) => {
          totalcost += item.price;
          return (
            <Itemitem
              key={index}
              index={index}
              item={item}
              showalert={showalert}
              editItem={editItem}
            />
          );
        })}
      </div>
      <div className="alert alert-warning text-center" role="alert" style={{display:(items.length===0)?'block':'none'}}>
        Nothing to show, please add some items
      </div>
      <div
        className="container text-center alert alert alert-secondary"
        role="alert"
      >
        Total Cost: {totalcost}
      </div>
    </div>
  );
};

export default Items;
