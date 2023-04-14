import React, { useContext } from "react";
import ItemContext from "../context/items/itemContext";

const Itemitem = (props) => {
  const context = useContext(ItemContext);
  const { deleteitem } = context;
  const { index, item, showalert,editItem } = props;
  return (
    <div className="container">
      <div className="container-sm">
        <span className="w-3">{index + 1}</span>
        <span className="w-3">{item.itemname}</span>
        <span className="w-3">{item.quantity}</span>
        <span className="w-3">{item.price}</span>
        <i
          className="fa-solid fa-trash-can fa-xl"
          style={{color:'red'}}
          onClick={() => {
            deleteitem(item._id);
            showalert("Deleted succesfully", "success");
          }}
        ></i>
        <i
          className="fa-solid fa-pen-to-square fa-xl mx-4"
          style={{color:'blue'}}
          onClick={() => {
            editItem(item);
          }}
        ></i>
      </div>
      <hr />
    </div>
  );
};

export default Itemitem;
