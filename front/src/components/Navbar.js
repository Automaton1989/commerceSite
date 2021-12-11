/* 

PAGE BUILT BY: JENNIFER

*/

import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/pet-food.png";

function Navbar({ user, setUser, carts }) {
  let navigate = useNavigate();
  let [number, setNumber] = useState(0);

  useEffect(() => {
    const calculateNum = () => {
      let num = 0;
      carts.map((item) => num+=item.number);
      setNumber(num);
    };
    calculateNum();
  }, [carts]);
  
  const handleLogout = async () => {
    const resRaw = await fetch("api/userLogout");
    const res = await resRaw.json();
    if (res.logout === "success") {
      setUser("");
      navigate("/");
    }
  };  

  return (
    <nav className="navbar navbar-expand-sm navbar-dark px-sm-3 font-setting">
      <div className="container-fluid">
        <Link to="/">
          <img
            src={logo}
            alt="A can of dog food"
            width="25"
            height="25"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="true" style={{color: "#F2F2F2"}}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link" style={{color: "#F2F2F2"}}>
                All Products
              </Link>
            </li>
            {!user && (
              <li className="nav-item">
                <Link to="/login" className="nav-link" style={{color: "#F2F2F2"}}>
                  Sign in
                </Link>
              </li>
            )}
          </ul>
          {user && (
            <>
              <span className="text-white">
                Hello, <strong>{user}</strong>
              </span>
              <i
                className="fa fa-sign-out logout"
                aria-hidden="true"
                onClick={handleLogout}
              >Sign out</i>
            </>
          )}
          <Link to="/cart" className="ml-auto">
            <button title="Shopping cart button" type="button" className="btn cart-btn" tabIndex="-1">
              <i className="fas fa-cart-plus" > cart {number}</i>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;