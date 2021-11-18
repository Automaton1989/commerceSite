import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/pet-food.png";
import "../stylesheets/navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark nav-dark px-sm-3">
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
          className="navbar-toggler"
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
              <Link to="api/" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                All Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Sign in
              </Link>
            </li>
          </ul>
          <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          </form>
          <Link to="/cart" className="ml-auto">
            <button type="button" className="btn btn-light">
              <i className="fas fa-cart-plus" />
              cart
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;