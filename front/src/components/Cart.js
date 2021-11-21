import React from "react";
import { Link } from "react-router-dom";

export default function Carts() {
  return (
    <div>
      <EmptyCart />
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto text-center">
          <h1>Your cart is empty</h1>
          <Link to="/products">
            <button type="button" className="btn btn-primary btn-color btn-lg">Explore Products</button>
          </Link>
        </div>
      </div>
    </div>
  )
}