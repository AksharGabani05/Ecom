const subcategary = require("../model/subcategary");
const categary = require("../model/categary")
//add categary form formet
module.exports.addsubcategary = async(req,res)=>{
    let categary_name = await categary.find({IsActive:true});
    return res.render("add_subcategary",{
        categary_name:categary_name
    })
}
//insert cateary record
module.exports.insertsubcategary = async(req,res)=>{
    // console.log(req.body);
    req.body.IsActive = true;
    req.body.Create_Date = new Date().toLocaleString();
    req.body.Upadate_Date = new Date().toLocaleString();
    let categarydata = await subcategary.create(req.body);
    if(categarydata){
        return res.redirect('back');
    }
    console.log("data not insert");
}
module.exports.view_subcategary = async(req,res)=>{
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
    let viewsubcategaary = await subcategary.find({IsActive:true,
        $or :[
            {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
            {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}}
        ]
    })
    .limit(perpage)
    .skip(perpage*page)
    .populate("sub_categary_name").exec();
    let viewsubpage = await subcategary.find({IsActive:true,
        $or :[
            {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
            {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}}
        ]
    })
    .countDocuments()
    .populate("sub_categary_name").exec();

    return res.render("view_subcategary",{
        viscat:viewsubcategaary,
        search: search,
        totalDocument : Math.ceil(viewsubpage/perpage),
        curentpage :page
    })
}
module.exports.isactive = async(req,res)=>{
    try{
        if(req.params.id){
            let active = await subcategary.findByIdAndUpdate(req.params.id,{IsActive:false})
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
        return res.redirect('back')
    }
}
module.exports.isdeactive = async(req,res)=>{
    try{
        if(req.params.id){
            let active = await subcategary.findByIdAndUpdate(req.params.id,{IsActive:true})
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
module.exports.view_deactive_subcategary = async(req,res)=>{
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
    let viewsubcategaary = await subcategary.find({IsActive:false,
        $or :[
            {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
            {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}}
        ]
    })
    .limit(perpage)
    .skip(perpage*page)
    .populate("sub_categary_name").exec();
    let viewsubpage = await subcategary.find({IsActive:false,
        $or :[
            {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
            {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}}
        ]
    })
    .countDocuments()
    .populate("sub_categary_name").exec();

    if(viewsubcategaary){
        return res.render("view_deactive_subcategary",{
            viscat : viewsubcategaary,
            search: search,
            totalDocument : Math.ceil(viewsubpage/perpage),
            curentpage :page
        })
    }
    else{
        console.log('somthing went worng');
        return res.render("view_admin")
    }
}
module.exports.updatesubcategary = async(req,res)=>{
    try{
        let subcategaryecord = await subcategary.findById(req.params.id);
        let categarydata = await categary.find({IsActive:true})
        if(subcategaryecord){
            var subcategaryrecord = req.user;
           return res.render('update_subcategary',{
               subcatdata: subcategaryecord,
               record: subcategaryrecord,
               cr:categarydata
           })
        }
    }   
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.editesubcategorydata = async(req,res)=>{
    try{
        // console.log(req.user)
        let updaterecor = await subcategary.findByIdAndUpdate(req.body.EditId,req.body);
        if(updaterecor){
            console.log("categary record is updated..");
            return res.redirect('/admin/subcategary/view_subcategary')
        }
        else{
            console.log("record is not updated..!");
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err)
        return res.render('error')
    }
}