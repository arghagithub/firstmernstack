import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const { showalert } = props;
  const host = "http://localhost/";
  const url = `${host}api/auth/signup`;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-admintoken": localStorage.getItem("adminlogintoken"),
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    if (json.success) {
      showalert("successfully signed up", "success");
      setTimeout(() => {
        setCredentials({ name: "", email: "", password: "", cpassword: "" });
      }, 2000);
      navigate("/login");
    } else {
      showalert("sorry, account is not created", "danger");
    }
  };
  return (
    <div className="container my-3">
      <h2>Create an account in Billing System</h2>
      <form className="my-3" onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name :
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onchange}
            value={credentials.name}
            minLength={5}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your name with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address :
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onchange}
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password :
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onchange}
            value={credentials.password}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password :
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onchange}
            value={credentials.cpassword}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={credentials.password !== credentials.cpassword}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
