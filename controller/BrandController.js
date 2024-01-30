const Brand = require("../model/brand");
const categarty = require("../model/categary");
const subcategary = require("../model/subcategary");
const extracategary = require("../model/extracategary");


module.exports.add_Brand = async(req,res)=>{
    try{
        let typecategary = await categarty.find({IsActive:true})
        let typesubcategary = await subcategary.find({IsActive:true})
        let typeextracategary = await extracategary.find({IsActive:true});
        return res.render("add_Brand",{
            tcat : typecategary,
            tsubcat : typesubcategary,
            textcat : typeextracategary
        })
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
module.exports.insertBrand = async(req,res)=>{
    try{
        req.body.IsActive = true;
        req.body.Create_Date = new Date().toLocaleString();
        req.body.Upadate_Date = new Date().toLocaleString();
        let typedata = await Brand.create(req.body);
        if(typedata){
            return res.redirect('back');
        }
        console.log("data not insert");
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
};
//get extracategary by subcategary
module.exports.getextracategaryrecod = async(req,res)=>{
    try{
        // console.log(req.body)
        let extaatdata = await extracategary.find({extra_categary_name:req.body.excatid,extra_subcategary:req.body.subcatid});
        let extraptiondata = `<option value="">-selecte-subcategary-</option>` ;
        extaatdata.map((v,i)=>{
            extraptiondata += `<option value="${v.id}">${v.extracategary_name}</option>` 
        })
        return res.json(extraptiondata)
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
module.exports.view_Brand = async(req,res)=>{
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
        let viewBrand = await Brand.find({IsActive:true,
            $or :[
               
                {"Brand":{$regex:".*"+search+".*", $options:"i"}}
            ]
        })
        .limit(perpage)
        .skip(perpage*page)
        .populate("categary").populate("subcategary").populate("extracategary").exec();

        // console.log(viewBrand);
        let viewBrandpage = await Brand.find({IsActive:true,
            $or :[
                {"Brand":{$regex:".*"+search+".*", $options:"i"}}
            ]
        })
        .countDocuments()
        .populate("categary").populate("subcategary").populate("extracategary").exec();
        return res.render("view_Brand",{
            vieb:viewBrand,
            search: search,
            totalDocument : Math.ceil(viewBrandpage/perpage),
            curentpage :page
       })
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
module.exports.view_deactive_Brand = async(req,res)=>{
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
        let viewBrand = await Brand.find({IsActive:false,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"Brand":{$regex:".*"+search+".*", $options:"i"}}
            ]
        })
        .limit(perpage)
        .skip(perpage*page)
        .populate("categary").populate("subcategary").populate("extracategary").exec();
        let viewBrandpage = await Brand.find({IsActive:false,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"Brand":{$regex:".*"+search+".*", $options:"i"}}
            ]
        })
        .countDocuments()
        .populate("categary").populate("subcategary").populate("extracategary").exec();
        return res.render("view_deactive_Brand",{
            vieb:viewBrand,
            search: search,
            totalDocument : Math.ceil(viewBrandpage/perpage),
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
            let active = await Brand.findByIdAndUpdate(req.params.id,{IsActive:false})
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
            let active = await Brand.findByIdAndUpdate(req.params.id,{IsActive:true})
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
module.exports.updatebrand = async(req,res)=>{
    try{
        let branddata = await Brand.findById(req.params.id)
        if(branddata){
            let catdata = await categarty.find({IsActive:true})
            let subcatdata = await subcategary.find({IsActive:true})
            let extrabcatdata = await extracategary.find({IsActive:true});
            let brandrecord = req.user;
            return res.render("update_brand",{
                'catdata':catdata,
                'subcatdata':subcatdata,
                'extrabcatdata':extrabcatdata,
                'brddata':branddata,
                'recrd':brandrecord
            })
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.editBrand = async(req,res)=>{
    try{
        let updatebrand = await Brand.findByIdAndUpdate(req.body.EditId,req.body);
        if(updatebrand){
            console.log("brand data updated!!");
            return res.redirect('/admin/Brand/view_Brand')
        }
        else{
            console.log("brand data is not updated..!");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}