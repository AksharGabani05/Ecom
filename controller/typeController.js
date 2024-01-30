const Brand = require("../model/brand");
const categarty = require("../model/categary");
const subcategary = require("../model/subcategary");
const extracategary = require("../model/extracategary");
const type = require("../model/type");


module.exports.add_type = async(req,res)=>{
    try{
        let typecategary = await categarty.find({IsActive:true})
        let typesubcategary = await subcategary.find({IsActive:true})
        let typeextracategary = await extracategary.find({IsActive:true});
        let Branddata = await Brand.find({});
        return res.render("add_type",{
            tcat : typecategary,
            tsubcat : typesubcategary,
            textcat : typeextracategary,
            tbd : Branddata
        })
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
//isert tyoe data;
module.exports.inserttype = async(req,res)=>{
    try{
        req.body.IsActive = true;
        req.body.Create_Date = new Date().toLocaleString();
        req.body.Upadate_Date = new Date().toLocaleString();
        let typedata = await type.create(req.body);
        if(typedata){
            return res.redirect('back');
        }
        console.log("data not insert");
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
// join data 
module.exports.getbrandrecod = async(req,res)=>{
    try{
        let bdata = await Brand.find({categary:req.body.excatid,subcategary:req.body.subcatid,extracategary:req.body.extacatid});
        let brandoptiondata = `<option value="">-selecte-subcategary-</option>` ;
        bdata.map((v,i)=>{
            brandoptiondata += `<option value="${v.id}">${v.Brand}</option>` 
        })
        return res.json(brandoptiondata)
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
module.exports.view_type = async(req,res)=>{
    try{
        let search = '';
        if(req.query.search){
            search= req.query.search
        }
        // console.log(req.query.search);
        if(req.query.page){
            page = req.query.page;
        }
        else{
            page = 0
        }
        var perpage = 4;

        let viewtype = await type.find({IsActive:true,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"Brand":{$regex:".*"+search+".*", $options:"i"}},
                {"Type":{$regex:".*"+search+".*", $options:"i"}}
            ]
        })
        .limit(perpage)
        .skip(perpage*page)
        .populate("Typecategary").populate("Typesubcategary").populate("Typeextracategary").populate("Typebrand").exec();
        let viewtypage = await type.find({IsActive:true,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"Brand":{$regex:".*"+search+".*", $options:"i"}},
                {"Type":{$regex:".*"+search+".*", $options:"i"}}
            ]
        })
        .countDocuments()
        .populate("Typecategary").populate("Typesubcategary").populate("Typeextracategary").populate("Typebrand").exec();
        return res.render("view_type",{
            viet:viewtype,
            search: search,
            totalDocument : Math.ceil(viewtypage/perpage),
            curentpage :page
       })
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
module.exports.view_deactive_type = async(req,res)=>{
    try{
        let search = '';
        if(req.query.search){
            search= req.query.search
        }
        // console.log(req.query.search);
        if(req.query.page){
            page = req.query.page;
        }
        else{
            page = 0
        }
        var perpage = 4;

        let viewtype = await type.find({IsActive:false,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"Brand":{$regex:".*"+search+".*", $options:"i"}},
                {"Type":{$regex:".*"+search+".*", $options:"i"}}
            ]
        })
        .limit(perpage)
        .skip(perpage*page)
        .populate("Typecategary").populate("Typesubcategary").populate("Typeextracategary").populate("Typebrand").exec();
        let viewtypage = await type.find({IsActive:false,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"Brand":{$regex:".*"+search+".*", $options:"i"}},
                {"Type":{$regex:".*"+search+".*", $options:"i"}}
            ]
        })
        .countDocuments()
        .populate("Typecategary").populate("Typesubcategary").populate("Typeextracategary").populate("Typebrand").exec();
        return res.render("view_deactive_type",{
            viet:viewtype,
            search: search,
            totalDocument : Math.ceil(viewtypage/perpage),
            curentpage :page
       })
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
module.exports.isactive = async(req,res)=>{
    try{
        if(req.params.id){
            let active = await type.findByIdAndUpdate(req.params.id,{IsActive:false})
            if(active){
                console.log("data is deactive Successfully");
                return res.redirect('back');
            }
            else{
                console.log("record is not deactivate");
                return res.redirect('back');
            }
        }
        else{
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.isdeactive = async(req,res)=>{
    try{
        if(req.params.id){
            let active = await type.findByIdAndUpdate(req.params.id,{IsActive:true})
            if(active){
                console.log("data is active Successfully");
                return res.redirect('back');
            }
            else{
                console.log("record is not activate");
                return res.redirect('back');
            }
        }
        else{
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.updatetype = async(req,res)=>{
    try{
        let typedata = await type.findById(req.params.id);
        if(typedata){
            let catdata = await categarty.find({IsActive:true})
            let subcatdata = await subcategary.find({IsActive:true})
            let extracatdata = await extracategary.find({IsActive:true})
            let brandtdata = await Brand.find({IsActive:true})
            let typerecrod = req.user
            return res.render("update_type",{
                'catdata' : catdata,
                'subcatdat':subcatdata,
                'extracatdata':extracatdata,
                'brandtdata':brandtdata,
                'record':typerecrod,
                'typedata':typedata
            })
        }
        else{
            console.log("page is not defind..");
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.edittype = async(req,res)=>{
    try{
        let updatetype = await type.findByIdAndUpdate(req.body.EditId,req.body);
        if(updatetype){
            console.log("type data is updated..!");
            return res.redirect("/admin/type/view_type")
        }
        else{
            console.log("type data is not updated..!");
            return res.redirect('type')
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
