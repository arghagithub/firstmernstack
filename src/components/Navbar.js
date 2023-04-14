import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showalert } = props;
  const logout = () => {
    localStorage.removeItem("logintoken");
    showalert("successfully logged out", "success");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Billing System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                } `}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li
              className="nav-item"
              style={{
                display: localStorage.getItem("logintoken") ? "" : "none",
              }}
            >
              <Link
                className={`nav-link ${
                  location.pathname === "/view" ? "active" : ""
                } `}
                aria-current="page"
                to="/view"
              >
                View yourself
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <Link
              className="btn btn-warning mx-2"
              to="/admin"
              role="button"
              style={{
                display: localStorage.getItem("adminlogintoken") ? "" : "none",
              }}
            >
              Admin
            </Link>
            <Link
              className="btn btn-success mx-2"
              to="/signup"
              role="button"
              style={{
                display: localStorage.getItem("logintoken") ? "none" : "",
              }}
            >
              Signup
            </Link>
            <Link
              className="btn btn-primary mx-2"
              to="/login"
              role="button"
              style={{
                display: localStorage.getItem("logintoken") ? "none" : "",
              }}
            >
              Login
            </Link>
            <button
              className="btn btn-danger mx-2"
              type="submit"
              onClick={logout}
              style={{
                display: localStorage.getItem("logintoken") ? "" : "none",
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
