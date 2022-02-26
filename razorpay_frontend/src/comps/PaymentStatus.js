import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { grabStatus } from "../apiCalls";

const PaymentStatus = () => {
  const {paymentId} = useParams(); 
  const [values,setValues] = useState({
    amount:'',
    error:''
  })

  const {amount,error}= values

  useEffect(() => {
    getPaymentStatus(paymentId)
  },[])

  const getPaymentStatus = (paymentId) => {
    grabStatus(paymentId).then(response=>{
      if(response.error){
        setValues({...values,error:response.error,amount:''})
      }
      else{
        setValues({...values,error:'',amount:response.amount})
      }
    })
  }
  return (
    <div>
       {error && <h1 style={{ color: "red" }}>{error}</h1>}
      {amount > 0 && (
        <h1 style={{ color: "green" }}>
          Your order of rs {amount} is successful
        </h1>
      )}
      {!error && !amount && <h1>Loading...</h1>}
    </div>
  );
};

export default PaymentStatus;