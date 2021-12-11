/* 

PAGE BUILT BY: JENNIFER

*/

import { Link } from "react-router-dom";
import CartContents from "../components/CartContents";

export default function Carts({carts, setCarts}) {

  if (carts.length !== 0) return <CartContents carts={carts} setCarts={setCarts}/>;
  return <EmptyCart />;
}

function EmptyCart() {
  return (
    <div className="container" role="main">
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