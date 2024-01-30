const mongoose =require('mongoose');
const BrandSchema = mongoose.Schema({
    Brand:{
        type:String,
        required:true
    },
    extracategary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Extracategary',
        required:true
    },
    categary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categary',
        required:true
    },
    subcategary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subcategary',
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


const  Brand = mongoose.model('Brand',BrandSchema);
module.exports = Brand;