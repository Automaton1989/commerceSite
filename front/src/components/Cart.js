/* 

PAGE BUILT BY: JENNIFER

*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartContents from "./CartContents";

export default function Carts() {
  const [carts, setCarts] = useState([]);

  /* GET THIS USER'S CART INFO */
  useEffect(() => {
    const fetchCartData = async () => {
      const rawData = await fetch("/api/user/cart");
      const res = await rawData.json();
      setCarts(res.userCart);
    };
    fetchCartData();
  }, []);

  return (
    <div>
      {carts.length === 0 && <EmptyCart />}
      {carts.length !== 0 && <CartContents carts={carts} setCarts={setCarts} />}
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto text-center carts">
          <h1>Your cart is currently empty</h1>
          <Link to="/products">
            <button type="button" className="btn btn-color btn-lg">
              Explore Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}