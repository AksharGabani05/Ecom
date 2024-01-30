const categarty = require("../model/categary");
const subcategary = require("../model/subcategary");
const extracategary = require("../model/extracategary");
const Brand = require("../model/brand");
const type = require("../model/type");
const product = require("../model/Product")
const path = require("path");
const fs = require('fs')
module.exports.add_Product = async(req,res)=>{
    try{
        let typecategary = await categarty.find({IsActive:true})
        let typesubcategary = await subcategary.find({IsActive:true})
        let typeextracategary = await extracategary.find({IsActive:true});
        let Branddata = await Brand.find({});
        let typedata = await type.find({});
        return res.render("add_Product",{
            tcat : typecategary,
            tsubcat : typesubcategary,
            textcat : typeextracategary,
            tbd : Branddata,
            ptd: typedata,
        })
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
//get type data with brand
module.exports.getbrandtyperecod = async(req,res)=>{
    try{
        let tdata = await type.find({Typecategary:req.body.excatid,Typesubcategary:req.body.subcatid,Typeextracategary:req.body.extacatid,Typebrand:req.body.branddata});
        console.log(type)
        console.log(tdata)
        let typeoptiondata = `<option value="">-selecte-type-</option>` ;
        tdata.map((v,i)=>{
            typeoptiondata += `<option value="${v.id}">${v.Type}</option>` 
        })
        // console.log(typeoptiondata)
        return res.json(typeoptiondata)
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
//insert product data
module.exports.insertproduct = async(req,res)=>{
    try{
        let singleimag = '';
        let multipleimg = [];
        if(req.files){
            singleimag = await product.prsingleimg+'/'+req.files.ProductImage[0].filename;   
        }
        for(var i=0;i<req.files.multipleproductimage.length;i++){
            multipleimg.push(product.prmulimg+"/"+req.files.multipleproductimage[i].filename); 
        }
        req.body.ProductImage = singleimag;
        req.body.multipleproductimage = multipleimg;
        req.body.IsActive = true;
        req.body.Create_Date = new Date().toLocaleString();
        req.body.Upadate_Date = new Date().toLocaleString();
        let productdata = await product.create(req.body);
        if(productdata){
            console.log("product add..");
            return res.redirect('back');    
        }
        else{
            console.log("product can't add..");
            return res.redirect('back');
        }

    }
    catch(err){
        console.log("product is not defind..!");
        return res.render('error')
    }
}
//view  active product
module.exports.view_Product = async(req,res)=>{
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
        let viewproduct = await product.find({IsActive:true,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"Brand":{$regex:".*"+search+".*", $options:"i"}},
                {"Type":{$regex:".*"+search+".*", $options:"i"}},
                {"product_title":{$regex:".*"+search+".*", $options:"i"}}
            ]
        })
        .limit(perpage)
        .skip(perpage*page)
        ;
        let viewproductpage = await product.find({IsActive:true,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"Brand":{$regex:".*"+search+".*", $options:"i"}},
                {"Type":{$regex:".*"+search+".*", $options:"i"}},
                {"product_title":{$regex:".*"+search+".*", $options:"i"}}
            ]
        }).countDocuments();
        return res.render("view_Product",{
           vieb:viewproduct,
           search: search,
           totalDocument : Math.ceil(viewproductpage/perpage),
           curentpage :page
       })
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
//view deactive product
module.exports.view_deactive_Product = async(req,res)=>{
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
        let viewproduct = await product.find({IsActive:false,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"Brand":{$regex:".*"+search+".*", $options:"i"}},
                {"Type":{$regex:".*"+search+".*", $options:"i"}},
                {"product_title":{$regex:".*"+search+".*", $options:"i"}}
            ]
        })
        .limit(perpage)
        .skip(perpage*page)
        ;
        let viewproductpage = await product.find({IsActive:false,
            $or :[
                {"categary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"subcategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"extracategary_name":{$regex:".*"+search+".*", $options:"i"}},
                {"Brand":{$regex:".*"+search+".*", $options:"i"}},
                {"Type":{$regex:".*"+search+".*", $options:"i"}},
                {"product_title":{$regex:".*"+search+".*", $options:"i"}}
            ]
        }).countDocuments();
        return res.render("view_deactive_Product",{
           vieb:viewproduct,
           search: search,
           totalDocument : Math.ceil(viewproductpage/perpage),
           curentpage :page
       })
    }
    catch(err){
        console.log("somthing wrong")
        return res.render('error')
    }
}
//viewmore
module.exports.viewmore = async(req,res)=>{
    try{
        let viewmoreproduct = await product.findById(req.params.id).populate("Productcategary").populate("Productsubcategary").populate("Productextracategary").populate("Productbrand").populate("ProductType").exec();
        return res.render("view_more_product",{
           'viebp':viewmoreproduct
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
            let active = await product.findByIdAndUpdate(req.params.id,{IsActive:false})
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
            let active = await product.findByIdAndUpdate(req.params.id,{IsActive:true})
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
module.exports.updateproduct = async(req,res)=>{
    try{
        let productdata = await product.findById(req.params.id);
        if(productdata){
            let categartydata = await categarty.find({IsActive:true});
        
            let subcategartydata = await subcategary.find({IsActive:true})
            let extracategartydata = await extracategary.find({IsActive:true})
            let branddata = await Brand.find({IsActive:true})
            let typeddata = await type.find({IsActive:true});

            return res.render("update_product",{
                prddata : productdata,
                catdata : categartydata,
                subcatdata : subcategartydata,
                extracatdata : extracategartydata,
                brnddata : branddata,
                typeddata:typeddata
            })
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.editproduct = async(req,res)=>{
    try {
        if (req.files.ProductImage) {
            let oldData = await product.findById(req.body.EditId);
            if (oldData) {
                if (oldData.ProductImage) {
                    let fullPath = path.join(__dirname,'..',oldData.ProductImage);
                //    await fs.unlinkSync(fullPath);
                }
                if(req.files.multipleproductimage){
                    let multipleimg = [];
                    let oldpro = await product.findById(req.body.EditId);
                    
                   // console.log(oldpro.multipleproductimage[0]);
                     for(var j=0;j<oldpro.multipleproductimage.length;j++){
                         multipleimg.push(oldpro.multipleproductimage[j]); 
                     }
                    for(var i=0;i<req.files.multipleproductimage.length;i++){
                        multipleimg.push(product.prmulimg+"/"+req.files.multipleproductimage[i].filename); 
                    }
                    req.body.multipleproductimage = multipleimg;
                }
                var productImagePath = product.prsingleimg+'/'+req.files.ProductImage[0].filename;
                req.body.ProductImage = productImagePath;
               
                req.body.Upadate_Date = new Date().toLocaleString();
                let ad = await product.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/Product/view_Product');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/Product/view_Product');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/Product/view_Product');
            }
        }
        else {
            let oldData = await product.findById(req.body.EditId);
            if (oldData) {
                if(req.files.multipleproductimage){
                    let multipleimg = [];
                    let oldpro = await product.findById(req.body.EditId);
                    
                   // console.log(oldpro.multipleproductimage[0]);
                     for(var j=0;j<oldpro.multipleproductimage.length;j++){
                         multipleimg.push(oldpro.multipleproductimage[j]); 
                     }
                    for(var i=0;i<req.files.multipleproductimage.length;i++){
                        multipleimg.push(product.prmulimg+"/"+req.files.multipleproductimage[i].filename); 
                    }
                    req.body.multipleproductimage = multipleimg;
                }
                req.body.ProductImage = oldData.ProductImage;
                
                req.body.Upadate_Date = new Date().toLocaleString();
                let ad = await product.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/Product/view_Product');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/Product/view_Product');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/Product/view_Product');
            }
        }
       

        
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}