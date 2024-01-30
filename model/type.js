const mongoose =require('mongoose');
const TypeSchema = mongoose.Schema({
    Type:{
        type:String,
        required:true
    },
    Typecategary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categary',
        required:true
    },
    Typesubcategary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subcategary',
        required:true
    },
    Typeextracategary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Extracategary',
        required:true
    },
    Typebrand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand',
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


const Type = mongoose.model('Type',TypeSchema);
module.exports = Type;