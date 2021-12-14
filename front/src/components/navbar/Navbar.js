/* 

PAGE BUILT BY: JENNIFER

*/
import "./navbar.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/pet-food.png";
import { Toast } from "react-bootstrap";
import ToastContainer from "react-bootstrap/ToastContainer";
import PropTypes from "prop-types";

function Navbar({ user, setUser, carts }) {
  let navigate = useNavigate();
  let [number, setNumber] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const calculateNum = () => {
      let num = 0;
      carts.map((item) => (num += parseInt(item.number)));
      setNumber(num);
    };
    calculateNum();
  }, [carts]);

  const handleLogout = async () => {
    const resRaw = await fetch("api/userLogout");
    const res = await resRaw.json();
    if (res.logout === "success") {
      setUser("");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/");
    }
  };

  function handleKeyLogout({e}) {
    if (e.keyCode === 13) {
        handleLogout();
      }
  }

  return (
    <div>
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
                <Link
                  to="/"
                  className="nav-link"
                  aria-current="true"
                  style={{ color: "#F2F2F2" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link"
                  style={{ color: "#F2F2F2" }}
                >
                  All Products
                </Link>
              </li>
              {!user && (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link"
                    style={{ color: "#F2F2F2" }}
                  >
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
                <span className="btn" tabIndex="0" onKeyDown={(e) => handleKeyLogout({ e })}>
                  <i
                    className="fa fa-sign-out logout"
                    aria-hidden="true"
                    onClick={() => {
                      handleLogout();
                      setShow(true);
                    }}
                  >
                    Sign out
                  </i>
                </span>
              </>
            )}
            <Link to="/cart" className="ml-auto">
              <button
                title="Shopping cart button"
                type="button"
                className="btn cart-btn"
                tabIndex="-1"
              >
                <i className="fas fa-cart-plus"> cart {number}</i>
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="container">
        <ToastContainer position="top-center">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={2000}
            autohide
          >
            <Toast.Body>
              You've successfully signed out! Directing you to the home page.
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  carts: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  user: PropTypes.string.isRequired,

};

export default Navbar;