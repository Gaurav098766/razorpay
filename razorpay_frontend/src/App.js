import React, { useState, useEffect } from "react";
import { getOrder } from "./apiCalls";

const App = () => {
  const [values, setValues] = useState({
    amount: 0,
    orderId: "",
    error: "",
    success: false,
  });

  const { amount, orderId, success, error } = values;
  
  useEffect(() => {
    createOrder();
  }, []);

  const createOrder = () => {
    getOrder().then((response) => {
      if (response.error) {
        setValues({ ...values, error: response.error, success: false });
      } else {
        setValues({
          ...values,
          error: "",
          success: true,
          orderId: response.id,
          amount: response.amount,
        });
      }
    });
  };

  useEffect(() => {
    if (amount > 0 && orderId !== "") {
      showRazorPay();
    }
  }, [amount]);

  const showRazorPay = () => {
    const form = document.createElement("form");
    form.setAttribute(
      "action",
      `${process.env.REACT_APP_BACKEND}/payment/callback`
    );
    form.setAttribute('method', "POST");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.setAttribute("data-key", process.env.REACT_APP_DATA_KEY);
    script.setAttribute("data-amount", `${amount}`);
    script.setAttribute("data-name", "Web Developer");
    script.setAttribute("data-prefill.contact", "9725512173");
    script.setAttribute("data-prefill.email", "gaurav1223344@gmail.com");
    script.setAttribute("data-order_id", orderId);
    script.setAttribute("data-prefill.name", "Om Gohil");
    script.setAttribute("data-image", `${process.env.REACT_APP_BACKEND}/logo`);
    script.setAttribute("data-buttontext", "Buy NOW!!!");
    document.body.appendChild(form);
    form.appendChild(script);
    const input = document.createElement("input");
    input.type = "hidden";
    input.custom = "Hidden Element";
    input.name = "hidden";
    form.appendChild(input);
  };
  return <div>{amount === 0 && orderId ==="" && <h1>Loading...</h1>}</div>;
};

export default App;