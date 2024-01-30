const mongoose =require('mongoose');
const multer = require('multer');
const path = require('path');
const productSingleImagepath = '/uploads/product/product_single_image';
const productMulimagepath = '/uploads/product/product_mul_image';

const ProductSchema = mongoose.Schema({
    Productcategary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categary',
        required:true
    },
    Productsubcategary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subcategary',
        required:true
    },
    Productextracategary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Extracategary',
        required:true
    },
    Productbrand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand',
        required:true
    },
    ProductType:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Type',
        required:true
    },
    product_title:{
        type:String,
        required:true
    },
    product_price:{
        type:String,
        required:true
    },
    product_old_price:{
        type:String,
        required:true
    },
    Product_color:{
        type:String
    },
    Product_size:{
        type:String
    },
    product_Discription:{
        type:String,
        required:true
    },
    ProductImage:{
        type:String,
        required:true
    },
    multipleproductimage:{
        type:Array,
        required:true
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
});

const productstorage = multer.diskStorage({
    destination : function(req,file,cb){
        if(file.fieldname=='ProductImage'){
            cb(null,path.join(__dirname,"..",productSingleImagepath));
        }
        else{
            cb(null,path.join(__dirname,"..",productMulimagepath));
        }
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Math.random()*10000000); 
    }
})

ProductSchema.statics.uploadimage = multer({storage : productstorage}).fields([{name:"ProductImage",maxCount:1},{name:"multipleproductimage",maxCount:5}]);

ProductSchema.statics.prsingleimg  = productSingleImagepath;
ProductSchema.statics.prmulimg  = productMulimagepath;
const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;