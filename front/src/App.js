import "./App.css";
import React from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Home from "./components/Home";
import Register from "./components/Register";
import SingleProduct from "./components/SingleProduct";

/* 
USE THIS FOR NAVIGATION BASICS 
CAN BE USED FOR ASYNC FUNCTIONS BTW

EX: 
  async function handleSubmit(event) {
    event.preventDefault();
    await submitForm(event.target);
    navigate("../success", { replace: true });
  }

  return <button onSubmit={handleSubmit}>...</button>
*/
function GoHome() {
  let navigate = useNavigate();
  function handleLink() {
    navigate("/");
  }
  return <button onClick={handleLink}> Go Home </button>;
}

function App() {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/product/single" element={<SingleProduct />}></Route>
          </Routes>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;