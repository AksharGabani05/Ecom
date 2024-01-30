const mongoose = require('mongoose');

const categarySchema =mongoose.Schema({
    categary_name:{
        type:String,
        required :true
    },
    IsActive:{
        type:Boolean,
        required :true
    },
    Create_Date:{
        type:String,
        required :true
    },
    Upadate_Date:{
        type:String,
        required :true
    }
})
const categary = mongoose.model('Categary',categarySchema);
module.exports = categary;