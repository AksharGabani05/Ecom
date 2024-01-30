const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    googleId:{
        type:String,
    },
    username : {
        type : String,
       
    },
    email : {
        type : String,
       
    },
    password : {
        type : String,
       
    },
    phone : {
        type : Number,
       
    },
    role : {
        type : String,
       
    },
    create_date : {
        type : String,
       
    },
    updated_date : {
        type : String,
       
    },
})



const user = mongoose.model("User",UserSchema);
module.exports = user;