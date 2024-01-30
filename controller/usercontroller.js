const categary = require('../model/categary')
const subcategary = require('../model/subcategary')
const extracategary = require('../model/extracategary')
const brand = require('../model/brand')
const type = require('../model/type')
const product = require('../model/Product');
const User = require("../model/user");
const cart = require("../model/cart");
const order =require("../model/order");
var stripe = require('stripe')("sk_test_wFSjCKx4AW07JCc87b2fUwhH00zzjnRSJv"); 
const bcrypt =  require('bcrypt')

module.exports.home = async(req,res)=>{
    try{
        let catdata = await categary.find({IsActive:true})
        let subcatdata = await subcategary.find({IsActive:true})
        let extracatdata = await extracategary.find({IsActive:true})
        let countCart;
        if(req.user){
        countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
        }
        return res.render('userpenal/home',{
            catdata : catdata,
            subcat: subcatdata,
            extracat : extracatdata,
            'countCart' : countCart?countCart:0,
        })
    }
    catch(err){
        console.log("somthing wrong",err)
        // return res.render('error')
    }
}
module.exports.productlist = async(req,res)=>{
    try{
        // console.log(req.params.cid + " "+ req.params.sid+ " "+ req.params.id)
        let catdata = await categary.find({IsActive:true})
        let subcatdata = await subcategary.find({IsActive:true})
        let extracatdata = await extracategary.find({IsActive:true})
        let productdata = await product.find({'Productcategary':req.params.cid,'Productsubcategary': req.params.sid, 'Productextracategary':req.params.eid,IsActive:true});
    
        let countCart;
        if(req.user){
        countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
        }


        let proprice = [];
        let brandname = [];
    
        productdata.forEach((v,i)=>{
            proprice.push(parseInt(v.proprice));
        let pos = brandname.findIndex((v1,i1)=>{v1.id==v.Productbrand.id});
        if(pos == -1){
            brandname.push({id : v.Productbrand.id, name : v.Productbrand.Brand});
        }
    })
        
        var brandNew = [];
        console.log(brandNew);
        brandname.map((v,i)=>{
            let pos = brandNew.findIndex((v1,i1)=>v1.name == v.name);
            if(pos == -1){
                brandNew.push(v);
            }
        })

        var max = Math.max(...proprice);
        var min = Math.min(...proprice);
        // console.log(productdata);
        return res.render('userpenal/productlist',{
            catdata : catdata,
            'subcat': subcatdata,
            'extracat' : extracatdata,
            productdata : productdata,
            'brandList' : brandname,
            'max' : max,
            'min' : min,
            'countCart' : countCart?countCart:0,
 
        })
    }
    catch(err){
        console.log("somthing wrong",err)
        // return res.render('error')
    }
}
module.exports.ajexPriceFilter = async(req,res)=>{
    let productdata = await product.find({'Productcategary':req.params.cid,'Productsubcategary': req.params.sid, 'Productextracategary':req.params.eid,IsActive:true});
    return res.render('userpenal/ajexPriceFilter',{
        proData : productdata
    })
}
module.exports.ajexBrandFilter = async(req,res)=>{
    let productdata =  await product.find({'Productcategary':req.params.cid,'Productsubcategary': req.params.sid, 'Productextracategary':req.params.eid,IsActive:true});
    return res.render('userpenal/ajexPriceFilter',{
        proData : productdata
    })
}
module.exports.product_detils = async(req,res)=>{
    try{
        // console.log(req.body);
        // console.log(req.params.id)
        let ctdata = await categary.find({IsActive:true})
        let subcatdata = await subcategary.find({IsActive:true})
        let extracatdata = await extracategary.find({IsActive:true})
        let singleproductdata = await product.findById(req.params.id);
        let countCart;
        if(req.user){
        countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
        }
        
        return res.render('userpenal/product_detils',{
            'catdata' : ctdata,
            subcat: subcatdata,
            extracat : extracatdata,
            'spData':singleproductdata,
            'countCart' : countCart?countCart:0,
        })
    }
    catch(err){
        console.log("somthin went wrong");
        return res.redirect('back')
    }
}
module.exports.userLogin = async(req,res)=>{
    try{
        let ctdata = await categary.find({IsActive:true})
        let subcatdata = await subcategary.find({IsActive:true})
        let extracatdata = await extracategary.find({IsActive:true})

        let countCart;
        if(req.user){
        countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
        }
    
    return res.render('userpenal/userLogin',{
        'catdata' : ctdata,
        'subcat' : subcatdata,
        'extracat' : extracatdata,
        'countCart' : countCart?countCart:0,
    })
    }
    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}
module.exports.userRegister = async(req,res)=>{
    req.body.role = 'user';
    req.body.create_date = new Date().toLocaleString();
    req.body.updated_date = new Date().toLocaleString();

    let checkemail = await User.findOne({email:req.body.email});
    if(checkemail){
        console.log("Email already register");
        return res.redirect('back');
    }
    else{
        if(req.body.password == req.body.cpassword){
            req.body.password = await bcrypt.hash(req.body.password,10);
            await User.create(req.body);
            return res.redirect('/');
        }
        else{
            console.log("Password not match");
            return res.redirect('back');
        }
    }

}
module.exports.checkuserLogin = async(req,res)=>{
    try{
        return res.redirect('/');
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}
module.exports.insertCart = async(req,res)=>{
    try{
        let cartProduct = await cart.findOne({productId : req.body.productId,userId:req.user.id});
        if(cartProduct){
            console.log("Product is already into cart");
            return res.redirect("back");
        }
        else{
            req.body.userId = req.user.id;
            req.body.status = "pending";
            req.body.create_date = new Date().toLocaleString();
            req.body.updated_date = new Date().toLocaleString();
            let AddCart = await cart.create(req.body);
            if(AddCart){
                console.log("Product add into cart");
                return res.redirect("back");
            } 
            else{
                console.log("something is wrong");
                return res.redirect("back");
            }
        }
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}
module.exports.viewcart = async(req,res)=>{
    try{
        let countCart;
        if(req.user){
            countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
            cartPendingData = await cart.find({userId:req.user.id,status:'pending'}).populate('productId').exec();
        }
        let ctdata = await categary.find({IsActive:true})
        let subcatdata = await subcategary.find({IsActive:true})
        let extracatdata = await extracategary.find({IsActive:true})

        return res.render('userpenal/viewcart',{
            'cartData' : cartPendingData,
            'catdata' : ctdata,
            'subcat' : subcatdata,
            'extracat' : extracatdata,
            'countCart' : countCart
        })
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}
module.exports.changeQuantity = async(req,res)=>{
    try{
        await cart.findByIdAndUpdate(req.body.cartId,{quantity : req.body.quantity});
        return res.status(200).json({msg: "Successfully change "});
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}
module.exports.deleteCart = async(req,res)=>{
    try{
       let de = await cart.findByIdAndDelete(req.params.id)
       if(de){
            console.log("Cart delete successfully");
            return res.redirect('back');
        }
        else{
            console.log("Record not found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}
module.exports.checkout = async(req,res)=>{
    try{
        let countCart;
        if(req.user){
            countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
            cartPendingData = await cart.find({userId:req.user.id,status:'pending'}).populate('productId').exec();
        }
        let ctdata = await categary.find({IsActive:true})
        let subcatdata = await subcategary.find({IsActive:true})
        let extracatdata = await extracategary.find({IsActive:true})

        return res.render('userpenal/checkout',{
            'cartData' : cartPendingData,
            'catdata' : ctdata,
            'subcat' : subcatdata,
            'extracat' : extracatdata,
            'countCart' : countCart
        })
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}


module.exports.payment = async(req,res)=>{
    try{
       
        var countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
        cartPendingData = await cart.find({userId:req.user.id,status:'pending'}).populate('productId').exec();
    var sum =0; var i=1;
    for(var cd of cartPendingData){
        var total = cd.quantity * cd.productId.product_price;
        sum += sum + total;
        ++i;
    }
    sum = sum *100;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gourav Hammad',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    })
    .then((customer) => {

        return stripe.charges.create({
            amount: sum,  
            description: 'Web Development',
            currency: 'INR',
            customer: customer.id
        });
    })
    .then(async(charge) => {
          // If no error occurs
        let proID = [];
        let cartID = [];

        cartPendingData.forEach((v,i)=>{
            proID.push(v.productId);
            cartID.push(v.id);
        })

       
        req.body.userId = req.user.id;
        req.body.productId = proID;
        req.body.cartID = cartID;
        req.body.status = 'confirm';

        var upcart =  await order.create(req.body);
        if(upcart){
            cartPendingData.map(async(v,i)=>{
                await cart.findByIdAndUpdate(v.id,{status:"confirm"})
            })
           return res.redirect('/')
        }

        cartID.forEach(async(v,i)=>{
            await cart.findByIdAndUpdate(v,{status : 'confirm'})
        })

        res.send("Success")
    })
    .catch((err) => {
        res.send(err)       // If some error occurs
    });
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}