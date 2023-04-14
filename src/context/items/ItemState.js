import React, { useState } from "react";
import ItemContext from "./itemContext";

const ItemState = (props) => {
  const host = "http://localhost/";
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState({});

  // eslint-disable-next-line
  const getitem = async () => {
    let url = `${host}api/items/getitem`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("logintoken"),
      },
    });
    let json = await response.json();
    setItems(json);
  };

  const getuser = async () => {
    let url = `${host}api/auth/getuserdetail`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("logintoken"),
      },
    });
    const json = await response.json();
    setDetails(json);
  };

  const fetchuser = async () => {
    const url = `${host}api/auth/fetchuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-admintoken": localStorage.getItem("adminlogintoken"),
      },
    });
    let json = await response.json();
    setUsers(json.user);
  };

  // eslint-disable-next-line
  const additem = async (itemname, quantity, price) => {
    let url = `${host}api/items/additem`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("logintoken"),
      },
      body: JSON.stringify({ itemname, quantity, price }), // body data type must match "Content-Type" header
    });
    const item = {
      itemname: itemname,
      quantity: quantity,
      price: price,
    };
    setItems(items.concat(item));
  };

  const deleteitem = async (id) => {
    let url = `${host}api/items/deleteitem/${id}`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("logintoken"),
      },
    });
    let newitem = items.filter((item) => {
      return item._id !== id;
    });
    setItems(newitem);
  };

  const deleteuser = async (id) => {
    const url = `${host}api/auth/deleteuser/${id}`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("logintoken"),
      },
    });
    let newuser = users.filter((user) => {
      return user._id !== id;
    });
    setUsers(newuser);
  };

  const updateitem = async (id, itemname, quantity, price) => {
    let url = `${host}api/items/updateitem/${id}`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("logintoken"),
      },
      body: JSON.stringify({ itemname, quantity, price }),
    });

    for (let index = 0; index < items.length; index++) {
      let element = items[index];
      if (element._id === id) {
        element.itemname = itemname;
        element.quantity = quantity;
        element.price = price;
        break;
      }
    }
    setItems(items);
  };

  const updateuser = async (id, name, email, password) => {
    const url = `${host}api/auth/updateuser/${id}`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("logintoken"),
      },
      body: JSON.stringify({ name, email, password }),
    });

    for (let index = 0; index < users.length; index++) {
      let element = users[index];
      if (element._id === id) {
        element.name = name;
        element.email = email;
        break;
      }
    }
    setUsers(users);
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        getitem,
        additem,
        deleteitem,
        updateitem,
        users,
        getuser,
        fetchuser,
        details,
        deleteuser,
        updateuser,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
