import React, { useContext, useState } from "react";
import ItemContext from "../context/items/itemContext";
const Additem = (props) => {
  const { showalert } = props;
  const context = useContext(ItemContext);
  const { additem } = context;
  const [item, setItem] = useState({
    itemname: "",
    quantity: "",
    price: "",
  });
  const onchange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const addclick = (e) => {
    e.preventDefault();
    additem(item.itemname, item.quantity, item.price);
    showalert("Item is added successfully", "success");
    setTimeout(() => {
      setItem({ itemname: "", quantity: "", price: "" });
    }, 1000);
  };
  return (
    <>
      <h3 className="text-center my-3">Lets Buy some groceries</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title red">Add items</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="item" className="form-label">
                Item name
              </label>
              <input
                type="text"
                className="form-control"
                id="itemname"
                name="itemname"
                onChange={onchange}
                required
                value={item.itemname}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="qua" className="form-label">
                Quantity
              </label>
              <input
                type="text"
                className="form-control"
                id="quantity"
                name="quantity"
                onChange={onchange}
                required
                value={item.quantity}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                onChange={onchange}
                required
                value={item.price}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              id="submit"
              onClick={addclick}
              disabled={
                item.itemname === "" ||
                item.quantity === "" ||
                item.price === "" || item.price<=0
              }
            >
              Add to cart
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Additem;
