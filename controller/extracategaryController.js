const extracategary = require("../model/extracategary");
const subcategary = require("../model/subcategary");
const categary = require("../model/categary");

//add categary form formet
module.exports.addextracategary = async(req,res)=>{
    let categarydata = await categary.find({IsActive:true});
    let subcatdata = await subcategary.find({IsActive:true});
    return res.render("add_extracategary",{
        catdata:categarydata,
        subcat:subcatdata
    })
}
//insert cateary record
module.exports.insertextracategary = async(req,res)=>{
    // console.log(req.body);
    req.body.IsActive = true;
    req.body.Create_Date = new Date().toLocaleString();
    req.body.Upadate_Date = new Date().toLocaleString();
    let extracategarydata = await extracategary.create(req.body);
    if(extracategarydata){
        return res.redirect('back');
    }
    console.log("data not insert");
}

module.exports.getsubcategaryrecod = async(req,res)=>{
    // console.log(req.body)
    let subcatdata = await subcategary.find({sub_categary_name:req.body.catid});
    
    let optiondata = `<option value="">-selecte-subcategary-</option>` ;
    subcatdata.map((v,i)=>{
        optiondata += `<option value="${v.id}">${v.subcategary_name}</option>` 
    })
    
    return res.json(optiondata)
}
module.exports.view_extracategary = async(req,res)=>{
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

        let viewextracategaary = await extracategary.find({IsActive:true,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
            ]
        })
        .limit(perpage)
        .skip(perpage*page)
        .populate("extra_categary_name").populate("extra_subcategary").exec();

        let viewextracatpage = await extracategary.find({IsActive:true,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
            ]
        })
        .countDocuments()
        .populate("extra_categary_name").populate("extra_subcategary").exec();
         return res.render("view_extracategary",{
            viexcat:viewextracategaary,
            search: search,
            totalDocument : Math.ceil(viewextracatpage/perpage),
            curentpage :page
        })
    }
    catch(err){
        console.log("somthing went wrong..");
        return res.render('error')
    }

}
module.exports.isactive = async(req,res)=>{
    try{
        if(req.params.id){
            let active = await extracategary.findByIdAndUpdate(req.params.id,{IsActive:false})
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
            let active = await extracategary.findByIdAndUpdate(req.params.id,{IsActive:true})
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
module.exports.view_deactive_extracategary = async(req,res)=>{
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

        let viewextracategaary = await extracategary.find({IsActive:false,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
            ]
        })
        .limit(perpage)
        .skip(perpage*page)
        .populate("extra_categary_name").populate("extra_subcategary").exec();

        let viewextracatpage = await extracategary.find({IsActive:false,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
            ]
        })
        .countDocuments()
        .populate("extra_categary_name").populate("extra_subcategary").exec();
         return res.render("view_deactive_extracategary",{
            viexcat:viewextracategaary,
            search: search,
            totalDocument : Math.ceil(viewextracatpage/perpage),
            curentpage :page
        })
    }
    catch(err){
        console.log("somthing went wrong..");
        return res.render('error')
    }

}
module.exports.updateextracategary = async(req,res)=>{
    try{
        let extracategaryrecord = await extracategary.findById(req.params.id)
      
        if(extracategaryrecord){
            let categarydata = await categary.find({IsActive:true})
            let subcategaryecord = await subcategary.find({IsActive:true});
            var extragaryrecord = req.user;
           return res.render('update_extracategary',{
               record: extragaryrecord,
               extradata:extracategaryrecord,
               categarydata:categarydata,
               subcatdata: subcategaryecord,
           })
        }
    }   
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.editextracategorydata = async(req,res)=>{
    try{
        let extraupdaterecord = await extracategary.findByIdAndUpdate(req.body.EditId,req.body)
        if(extraupdaterecord){
            console.log("extracategory record updated..!");
            return res.redirect("/admin/extracategary/view_extracategary")
        }   
        else{
            console.log("extracategory record is not updeted..!");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}