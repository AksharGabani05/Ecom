const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const adminimagepath = '/uploads/Admin';

const AddmineSchema =mongoose.Schema({
    googleId:{
        type:String,
    },
    name:{
        type:String,
      
    },
    email:{
        type:String,
      
    },
    password:{
        type:String,
      
    },
    gender:{
        type:String,
      
    },
    hobby:{
        type:Array,
      
    },
    city:{
        type:String,
      
    },
    Discription:{
        type:String,
      
    },
    Admineimage:{
        type:String,
      
    },
    IsActive:{
        type:Boolean,
      
    },
    Create_Date:{
        type:String,
      
    },
    Upadate_Date:{
        type:String,    
    },
    role:{
        type:String
    }
   
})

const Adminestorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"..",adminimagepath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
    
})

AddmineSchema.statics.uploadadmineimage = multer({storage : Adminestorage}).single('Admineimage');
AddmineSchema.statics.Adminimagepath  = adminimagepath;

const Admin = mongoose.model('Admine',AddmineSchema);
module.exports = Admin;