import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Alert from "./components/Alert";
import ItemState from "./context/items/ItemState";
import Admin from "./components/Admin";
import Showuser from "./components/Showuser";
import View from "./components/View";

function App() {
  const [alert, setAlert] = useState(null);
  const showalert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <ItemState>
        <Router>
          <Navbar showalert={showalert} />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showalert={showalert} />} />
            <Route
              exact
              path="/signup"
              element={<Signup showalert={showalert} />}
            />
            <Route
              exact
              path="/login"
              element={<Login showalert={showalert} />}
            />
            <Route exact path="/admin" element={<Admin showalert={showalert} />} />
            <Route exact path="/showuser" element={<Showuser/>} />
            <Route exact path="/view" element={<View showalert={showalert} />} />
          </Routes>
        </Router>
      </ItemState>
    </>
  );
}

export default App;
