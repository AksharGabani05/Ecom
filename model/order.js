const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    productId : {
        type : Array,
        ref : 'Product',
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    cartId :{
        type : Array,
        ref : 'Cart',
        required : true
    },
    status :{
        type : String,
        required : true
    },

})



const order = mongoose.model("Order",orderSchema);
module.exports = order;
