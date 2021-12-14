import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./page/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products_component/Products";
import Home from "./page/Home";
import Register from "./page/Register";
import SingleProduct from "./components/SingleProduct";
import Cart from "./page/Cart";
import Footer from "./page/Footer";

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
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    async function checkUser() {
      const fetchData = await fetch("/api/user/data");
      const res = await fetchData.json();
      setUser(res.username);
    }
    checkUser();
  }, [])

  /* GET THIS USER'S CART INFO */
  useEffect(() => {
    const fetchCartData = async () => {
      const rawData = await fetch("/api/user/cart");
      const res = await rawData.json();
      res.userCart ? setCarts(res.userCart) : setCarts([]);
    };
    fetchCartData();
  }, [user]);

  return (
    <Router>
      <React.Fragment>
        <Navbar user={user} setUser={setUser} carts={carts} />
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/products" element={<Products />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/product/:id"
              exact
              element={<SingleProduct setCarts={setCarts} user={user} />}
            ></Route>
            <Route path="/cart" element={<Cart carts={carts} setCarts={setCarts}/>}></Route>
          </Routes>
          <Footer />
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;