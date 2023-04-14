import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate=useNavigate();
  const { showalert } = props;
  const host = "http://localhost/";
  const url = `${host}api/auth/login`;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
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
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    if (json.success) {
      showalert("successfully logged in", "info");
      localStorage.setItem('logintoken',json.token);
      setTimeout(() => {
        setCredentials({ email: "", password: ""});
      }, 3000);
      navigate('/');
    } else {
      showalert("sorry,please signup before login", "danger");
      navigate('/signup');
    }
  };
  return (
    <div className="container my-3">
      <h4>Please login your account with correct credentials</h4>
      <form className="my-3" onSubmit={handlesubmit}>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
