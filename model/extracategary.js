const mongoose =require('mongoose');
const ExtracategarySchema = mongoose.Schema({
    extracategary_name:{
        type:String,
        required:true
    },
    extra_categary_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categary',
        required:true
    },
    extra_subcategary:{
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


const  Extracategary = mongoose.model('Extracategary',ExtracategarySchema);
module.exports = Extracategary;