const express = require("express");
const routes = express.Router();
const adminController = require("../controller/AdminController");
const Admin = require("../model/admin");
const passport = require('passport');
const passportLocal = require("../config/passport-local")

routes.get("/",adminController.login);
routes.get("/failRedirect",async(req,res)=>{
    req.flash("error","invalid email or password");
    res.redirect("/admin/")
})
routes.get("/dashbored",passport.chackAutho,adminController.dashbored);
routes.get("/add_admin",passport.chackAutho,adminController.add_admin);
routes.post("/insertadminrecord",passport.chackAutho,Admin.uploadadmineimage,adminController.insertadminrecord)
routes.get("/view_admin",passport.chackAutho,adminController.view_admin);
routes.get("/view_deactive_admin",passport.chackAutho,adminController.view_deactive_admin);
routes.get("/isactive/:id",adminController.isactive);
routes.get("/isdeactive/:id",passport.chackAutho,adminController.isdeactive);
routes.get("/updaterecord/:id",passport.chackAutho,adminController.updaterecord);
routes.post("/editeadmindata",passport.chackAutho,Admin.uploadadmineimage,adminController.editeadmindata);
routes.get("/delterecrod/:id",passport.chackAutho,adminController.delterecrod);
routes.get("/profile",passport.chackAutho,adminController.profile);
routes.get("/editprofile/:id",passport.chackAutho,adminController.editprofile);
routes.post("/updateprofile",passport.chackAutho,Admin.uploadadmineimage,adminController.updateprofile)
routes.post("/chacklogin",passport.authenticate('local',{failureRedirect:'/admin/failRedirect'}),adminController.chacklogin);
routes.get("/logout",async(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log("somthing went wrong");
            return res.redirect('dashbored');
        }
        else{
            return res.redirect("/admin")
        }
       })
})
//forget password
routes.get("/emailpage",async(req,res)=>{
    return res.render('forgetpass/emailpage')
})
routes.post("/chackemail",adminController.chackemail);
routes.get("/otppage",async(req,res)=>{
    return res.render("forgetpass/otppage")
})
routes.post("/chakotp",adminController.chakotp);
routes.get("/creatpass",async(req,res)=>{
    return res.render("forgetpass/creatpass")
})
routes.post("/verfypass",adminController.verfypass)
routes.get("/updatepassword",adminController.updatepassword)
routes.post("/changepassword",adminController.changepassword)
routes.use("/categary",passport.chackAutho,require("./categary"));
routes.use("/subcategary",passport.chackAutho,require("./subcategary"));
routes.use("/extracategary",passport.chackAutho,require("../routes/extracategary"))
routes.use("/Brand",passport.chackAutho,require("./Brand"));
routes.use("/type",passport.chackAutho,require("./type"));
routes.use("/Product",passport.chackAutho,require("./Product"));
//login with google
routes.get('/google',passport.authenticate('google', { scope: ['profile','email'] }));
routes.get('/google/callback',passport.authenticate('google', { failureRedirect: '/admin/login' }),adminController.chacklogin);
module.exports = routes