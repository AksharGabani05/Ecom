const categary = require("../model/categary");

//add categary form formet
module.exports.addcategary = async(req,res)=>{
    return res.render("add_categary")
}
//insert cateary record
module.exports.insertcategary = async(req,res)=>{
    // console.log(req.body);
    req.body.IsActive = true;
    req.body.Create_Date = new Date().toLocaleString();
    req.body.Upadate_Date = new Date().toLocaleString();
    let categarydata = await categary.create(req.body);
    if(categarydata){
        return res.redirect('back');
    }
    console.log("data not insert");
}
//view 
module.exports.view_categary = async(req,res)=>{
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
    var perpage = 2;
    let viewcategaary = await categary.find({IsActive:true,
        $or :[
            {"categary_name":{$regex:".*"+search+".*", $options:"i"}}
        ]
    }).limit(perpage)
    .skip(perpage*page);
    let categaarypage = await categary.find({IsActive:true,
        $or :[
            {"categary_name":{$regex:".*"+search+".*", $options:"i"}}
        ]
    }).countDocuments();
    return res.render("view_categary",{
        vicat:viewcategaary,
        search: search,
        totalDocument : Math.ceil(categaarypage/perpage),
        curentpage :page
    })
}
module.exports.isactive = async(req,res)=>{
    try{
        if(req.params.id){
            let active = await categary.findByIdAndUpdate(req.params.id,{IsActive:false})
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
            let active = await categary.findByIdAndUpdate(req.params.id,{IsActive:true})
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
module.exports.view_deactive_categary = async(req,res)=>{
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
        var perpage = 2;
        let viewcategaary = await categary.find({IsActive:false,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}}
            ]
        }).limit(perpage)
        .skip(perpage*page);
        let categaarypage = await categary.find({IsActive:false,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}}
            ]
        }).countDocuments();
        return res.render("view_deactive_categary",{
            vicat:viewcategaary,
            search: search,
            totalDocument : Math.ceil(categaarypage/perpage),
            curentpage :page
        })
    }
    catch(err){
        console.log(err)
        return res.render('error')
    }
}
module.exports.updatecategaryrecord = async(req,res)=>{
    try{
        let categaryecord = await categary.findById(req.params.id);
        var categaryrecord = req.user;
        if(categaryecord){
           return res.render('update_categpory',{
               catdata: categaryecord,
               record: categaryrecord
           })
       }
       else{
           console.log('Record Not Found');
           return res.redirect('back');
       }
    }
    catch(err){
        console.log(err)
        return res.render('error')
    }
}
module.exports.editcategorydata = async(req,res)=>{
    try{
        // console.log(req.user)
        let updaterecor = await categary.findByIdAndUpdate(req.body.EditId,req.body);
        if(updaterecor){
            console.log("categary record is updated..");
            return res.redirect('/admin/categary/view_categary')
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