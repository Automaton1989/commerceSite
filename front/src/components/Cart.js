import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Carts() {
  const [carts, setCarts] = useState([]);
  const [sum, setSum] = useState({subtotal:0, tax:0, total:0});

  useEffect(() => {
    const fetchCartData = async () => {
      const rawData = await fetch("/api/user/cart");
      const res = await rawData.json();
      console.log(res.userCart);
      setCarts(res.userCart);
      console.log("carts in Carts:", carts);
    };
    fetchCartData();
  }, []);

  useEffect(() => {
    let subtotal = 0;
    carts.map(item => (subtotal += item.number*item.price));
    const tax = parseFloat((subtotal * 0.09).toFixed(2));
    const total = tax + subtotal;
    setSum({...sum, subtotal: subtotal, tax:tax, total: total.toFixed(2)});
  }, []);

  return (
    <div>
      {carts.length === 0 && <EmptyCart />}
      {carts.length !== 0 && <CartContents carts={carts} sum={sum} />}
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto text-center">
          <h1>Your cart is currently empty</h1>
          <Link to="/products">
            <button type="button" className="btn btn-primary btn-color btn-lg">
              Explore Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function CartContents({ carts, sum }) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto text-center">
            <h1>Your Cart</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="text-center d-none d-lg-block">
          <div className="row">
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
            <div key={item._id} className="row text-center">
              <div className="col-10 mx-auto col-lg-2">
                {item.name}
              </div>
              <div className="col-10 mx-auto col-lg-2">
                {item.price}
              </div>
              <div className="col-10 mx-auto col-lg-2">
                {item.number}
              </div>
              <div className="col-10 mx-auto col-lg-2">
                <i className="fas fa-trash"></i>
              </div>
              <div className="col-10 mx-auto col-lg-2">
                {(item.price * item.number).toFixed(2)}
              </div>
            </div>
          )
        }
        )}
        <div className="col-10 mx-auto col-lg-2">
          <strong>Subtotal: {sum.subtotal}</strong>
        </div><div className="col-10 mx-auto col-lg-2">
          <strong>Tax: {sum.tax}</strong>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <strong>Total Price: {sum.total}</strong>
        </div>
      </div>
    </>
  );
}