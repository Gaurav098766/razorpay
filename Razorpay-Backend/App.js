const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const paymentRoute = require('./paymentRoute');
const app = express();
const mongoose = require('mongoose');
const path = require("path");


mongoose .connect(process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTED"))
  .catch(() => console.log("FAILED TO CONNECT WITH DB"));



app.use(bodyParser.json())
app.use(cors())

app.use('/api',paymentRoute);

// app.post("/create/orderId", (req, res) => {
//   console.log("create order request", req.body);

//   var options = {
//       amount: req.body.amount,
//       currency: "INR",
//       receipt: "rcp1"
//   };
//   instance.orders.create(options, function(err, order){
//       console.log(order);
//       res.send({orderId: order.id});
//   })
// })

// app.post("/api/payment/verify",(req,res)=>{

//   let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
 
//    var crypto = require("crypto");
//    var expectedSignature = crypto.createHmac('sha256', '1GRGhFfm789r5jKLv8ZKRPB2')
//                                    .update(body.toString())
//                                    .digest('hex');
//                                    console.log("sig received " ,req.body.response.razorpay_signature);
//                                    console.log("sig generated " ,expectedSignature);
//    var response = {"signatureIsValid":"false"}
//    if(expectedSignature === req.body.response.razorpay_signature)
//     response={"signatureIsValid":"true"}
//        res.send(response);
//    });

app.listen(5000, () =>{
    console.log("App is running at 5000 port");
})