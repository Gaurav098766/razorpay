const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    _id:{
        type:String,
        reuiqred:true
    },
    orders:{
        type:Array,
        default:[]
    }
})

module.exports  =mongoose.model("Order",orderSchema)