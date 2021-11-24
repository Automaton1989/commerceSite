import "./App.css";
import React, {useState} from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Home from "./components/Home";
import Register from "./components/Register";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

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
/*
function GoHome() {
  let navigate = useNavigate();
  function handleLink() {
    navigate("/");
  }
  return <button onClick={handleLink}> Go Home </button>;
}
*/

function App() {
  const [user, setUser] = useState("");

  return (
    <Router>
      <React.Fragment>
        <Navbar user={user} setUser={setUser} />
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login setUser={setUser}/>} />
            <Route path="/products" element={<Products />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/product/:id" exact element={<SingleProduct />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
          <Footer />
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;