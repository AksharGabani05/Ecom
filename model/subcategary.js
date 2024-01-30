const mongoose =require('mongoose');
const subcategarySchema = mongoose.Schema({
    subcategary_name:{
        type:String,
        required:true
    },
    sub_categary_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categary',
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


const  Subcategary = mongoose.model('Subcategary',subcategarySchema);
module.exports = Subcategary;