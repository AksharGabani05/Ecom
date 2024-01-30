const passport = require('passport');
const passportLocal = require("passport-local").Strategy;
const admin = require("../model/admin");
const user = require("../model/user");
const bcrypt = require('bcrypt')
passport.use(new passportLocal({
    usernameField:'email'
},async function(email,password,done){
    let admindata = await admin.findOne({email:email});
    console.log(email,password)
    if(admindata){
        if(password == admindata.password){
            return done(null,admindata)
        }
        else{
            return done(null,false)
        }
    }
    else{
        return done(null,false)
    }
}))
passport.use('user',new passportLocal({
    usernameField : "email"
},async function(email,password,done){
    let userData = await user.findOne({email:email});
    if(userData){
        if(await bcrypt.compare(password ,userData.password)){
            return done(null,userData);
        }
        else{
            return done(null,false);
        }
    } 
    else{
        return done(null,false);
    }
}))

passport.serializeUser(async(user,done)=>{
    return done(null,user.id);
})
passport.deserializeUser(async(id,done)=>{
    let adminrecord = await admin.findById(id);
    let userRecord = await user.findById(id);
    if(adminrecord){
        return done(null,adminrecord)
    }
    else if(userRecord){
        return done(null,userRecord);
    }
    else{
        return done(null,false);
    }
})
passport.setAutho = (req,res,next)=>{
    if(req.isAuthenticated()){
        if(req.user.role == 'admin'){
            res.locals.adminDetails = req.user;
        }
        else{
            res.locals.userDetails = req.user;
        }
    }
    next();
}
passport.chackAutho = (req,res,next)=>{
    if(req.isAuthenticated()){
        if(req.user.role == 'user'){
            console.log("you have no authorization");
            return res.redirect('/')
        }
        next();
    }

    else{
        return res.redirect('/admin/')
    }
}
passport.checkUserAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect("/");
    }
}
module.exports = passport;