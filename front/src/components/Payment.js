import React from "react";
import ReactDOM from "react-dom"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function Payment({total}) {
  const createOrder = (data, actions) =>{
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default Payment;

<script src="https://www.paypal.com/sdk/js?client-id=Af8u2gtj2BGFHl2-bkWojlzzsLS6MLq0eAUkpGpZQVXrrHmMtbYb33Jx5CoW0TUBToYQsw3vm46K7JMH"></script>