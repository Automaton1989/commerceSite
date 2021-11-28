import React, {useEffect, useState} from "react";


export default function CartContents({ carts, setCarts }) {
  const [sum, setSum] = useState({subtotal:0, tax:0, total:0});

  useEffect(() => {
    const calculatePrice = () => {
    let subtotal = 0;
    console.log("carts,", carts);
    carts.map(item => (subtotal += item.number*item.price));
    const tax = parseFloat((subtotal * 0.09).toFixed(2));
    const total = tax + subtotal;
    setSum({...sum, subtotal: subtotal, tax:tax, total: total.toFixed(2)});
    }
    calculatePrice()
  }, []);

  async function deleteProduct({item}) {
    const rawData = await (await fetch(`/api/user/cart/deleteProduct/${item._id}`)).json();
    if (rawData.delete === "success") {
      const fetchUserData = await fetch("/api/user/cart");
      const userData = await fetchUserData.json();
      setCarts(userData.userCart);
    } else {
      alert("Something's wrong, please try again!");
    }
  }

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
                <i className="fas fa-trash" onClick={()=>deleteProduct({item})}></i>
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
          <strong>Total: {sum.total}</strong>
        </div>
      </div>
    </>
  );
}