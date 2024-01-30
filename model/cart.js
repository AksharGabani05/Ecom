const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    quantity :{
        type : Number,
        required : true
    },
    status :{
        type : String,
        required : true
    },
    create_date : {
        type : String,
        required : true
    },
    updated_date : {
        type : String,
        required : true
    },
})



const cart = mongoose.model("Cart",CartSchema);
module.exports = cart;