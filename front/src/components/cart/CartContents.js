/* 

PAGE BUILT BY: JENNIFER

*/

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";
import ToastContainer from "react-bootstrap/ToastContainer";
import "./cart.css";

export default function CartContents({ carts, setCarts }) {
  const navigate = useNavigate();
  const [sum, setSum] = useState({ subtotal: 0, tax: 0, total: 0 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const calculatePrice = () => {
      let subtotal = 0;
      carts.map((item) => (subtotal += item.number * item.price));
      const tax = parseFloat((subtotal * 0.09).toFixed(2));
      const total = tax + subtotal;
      setSum({
        ...sum,
        subtotal: subtotal.toFixed(2),
        tax: tax,
        total: total.toFixed(2),
      });
    };
    calculatePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts]);

  async function deleteProduct({ item }) {
    const rawData = await (
      await fetch(`/api/user/cart/deleteProduct/${item._id}`)
    ).json();
    if (rawData.delete === "success") {
      const fetchUserData = await fetch("/api/user/cart");
      const userData = await fetchUserData.json();
      setCarts(userData.userCart);
    } else {
      alert("Something's wrong, please try again!");
    }
  }

  async function changeAmount({ item }, val) {
    const rawData = await fetch(`/api/user/cart/${item._id}/${val}`);
    const res = await rawData.json();
    if (res.change === "success") {
      const fetchUserData = await fetch("/api/user/cart");
      const userData = await fetchUserData.json();
      setCarts(userData.userCart);
    } else {
      alert("Something's wrong, please try again!");
    }
  }

  async function deleteCart() {
    try {
      await (await fetch("/api/user/cart/deleteCart")).json();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCarts([]);
      navigate("/products");
    } catch (e) {
      console.log(e);
    }
  }

  function handleKeypress({ e, item }) {
    if (e.keyCode === 13) {
      deleteProduct({ item });
    }
  }

  function handleChangeAmount({ e, item }, value) {
    if (e.keyCode === 13) {
      changeAmount({ item }, value);
    }
  }

  return (
    <>
      <div className="container" role="banner">
        <div className="row">
          <div className="col-10 mx-auto text-center carts">
            <h1>Your Cart</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid carts-bottom" role="main">
        <div className="text-center d-none d-lg-block carts">
          <div className="row">
            <div className="col-10 mx-auto col-lg-2">
              <p>Product</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
              <p>Product Name</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
              <p>Price</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
              <p>Quantity</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
              <p>Remove</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
              <p>Total</p>
            </div>
          </div>
        </div>
        {carts.map(function (item) {
          return (
            <div key={item._id} className="row text-center cart-item">
              <div className="col-10 mx-auto col-lg-2 cart-item">
                <img
                  src={item.image}
                  style={{ width: "5rem", height: "5rem" }}
                  className="img-fluid"
                  alt={item.name}
                />
              </div>
              <div className="col-10 mx-auto col-lg-2 cart-item">
                {item.name}
              </div>
              <div className="col-10 mx-auto col-lg-2 cart-item">
                {item.price}
              </div>
              <div className="col-10 mx-auto col-lg-2 cart-item">
                <span
                  className="btn"
                  tabIndex="0"
                  onKeyDown={(e) => handleChangeAmount({ e, item }, -1)}
                >
                  <i
                    className="fas fa-minus"
                    onClick={() => changeAmount({ item }, -1)}
                  ></i>
                </span>
                {item.number}
                <span
                  className="btn"
                  tabIndex="0"
                  onKeyDown={(e) => handleChangeAmount({ e, item }, 1)}
                >
                  <i
                    className="fas fa-plus"
                    onClick={() => changeAmount({ item }, 1)}
                  ></i>
                </span>
              </div>
              <div
                className="col-10 mx-auto col-lg-2 cart-item"
                onKeyDown={(e) => handleKeypress({ e, item })}
              >
                <span className="btn" tabIndex="0">
                  <i
                    className="fas fa-trash remove"
                    onClick={() => deleteProduct({ item })}
                  ></i>
                </span>
              </div>
              <div className="col-10 mx-auto col-lg-2 cart-item">
                {(item.price * item.number).toFixed(2)}
              </div>
            </div>
          );
        })}
        <div className="col-10 mt-2 ml-sm-5 ml-sm-5 ml-md-auto pb-3 total">
          <Link to="/products">
            <button className="btn btn-lg btn-cart">Continue Shopping</button>
          </Link>
        </div>
        <div className="col-10 mt-2 ml-sm-5 ml-sm-5 ml-md-auto total">
          <strong>Subtotal: ${sum.subtotal}</strong>
        </div>
        <div className="col-10 mt-2 ml-sm-5 ml-sm-5 ml-md-auto total">
          <strong>Tax: ${sum.tax}</strong>
        </div>
        <div className="col-10 mt-2 ml-sm-5 ml-sm-5 ml-md-auto total">
          <strong>Total: ${sum.total}</strong>
        </div>
        <div className="col-10 mt-2 ml-sm-5 ml-sm-5 ml-md-auto total">
          <button
            className="btn btn-lg checkout"
            onClick={() => {
              deleteCart();
              setShow(true);
            }}
          >
            Check out
          </button>
        </div>
      </div>
      <div className="container">
        <ToastContainer position="middle-center">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={2000}
            autohide
          >
            <Toast.Body>
              Congratulation! You've successfully checked out!
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}