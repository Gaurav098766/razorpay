require('dotenv').config()
const uniqId = require('uniqid');
const path = require('path');
const Formidable = require('formidable');
const orderSchema=require('./orderSchema');
const request = require('request');
const crypto = require('crypto');
const Razorpay = require('razorpay');
let orderId;

var instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret
});

exports.createOrder = (req, res) => {
    var options = {
        amount: 50000, // amount in the smallest currency unit
        currency: "INR",
        receipt: uniqId()
    };
    instance.orders.create(options, function(err, order) {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        orderId = order.id;
        res.json(order)
    });
}

exports.paymentCallback = (req, res) => {
    const form = Formidable()
    form.parse(req,(err,fields,files) => {
        if(fields){
            console.log("FIELDS",fields)
            const hash = crypto.createHmac('sha256',process.env.key_secret)
               .update(orderId+"|"+fields.razorpay_payment_id)
               .digest('hex');

        if(fields.razorpay_signature===hash){
            //store details in db
            const info={
                "_id":fields.razorpay_payment_id,
                "razorpay_order_id": fields.razorpay_order_id
            }
            const order = new orderSchema({
                    _id: info._id,
                    orders: fields.razorpay_order_id,
                    });

            order.save((err,data) => {
                if(err){
                    res.status(400).json({
                        error:"NOT  ablwe to save in db"
                    })
                }
                else{
                    res.redirect(`${process.env.FRONTEND}/payment/status/${fields.razorpay_payment_id}`)
                }
            })
        }

        else{
            res.send("ERROR")
        }
        
    
    }
    })
}

exports.getLogo=(req,res) => {
    res.sendFile(path.join(__dirname,'download.png'))
}


exports.getPayment = (req,res) => {
    orderSchema.findById(req.params.paymentId).exec((err,data) => {
        if(err || data==null){
            return res.json({
                error:"NO ORDER FOUND"
            })
        }
        request(
            `https://${process.env.key_id}:${process.env.key_secret}@api.razorpay.com/v1/payments/${req.params.paymentId}`,
            function(error,response,body){
                if(body){
                    const result = JSON.parse(body);
                    res.status(200).json(result)
                }
               
            }
          );
    })
}