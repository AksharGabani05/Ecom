const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const admin =require("../model/admin");


passport.use(new GoogleStrategy({
    clientID: "430473752426-3n0oathb2bag2k8phn1dnnhcvvnq89ik.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8090/admin/google/callback"
  },
  
  async function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    let checkemail = await admin.findOne({email:profile.emails[0].value});
    // console.log(checkemail)
        if(checkemail){
            return cb(null,checkemail)
        }
        else{
            let admindetils ={
                name:profile.displayName,
                email:profile.emails[0].value,
                password: "12345",
                IsActive:'true',
                Create_Date: new Date().toLocaleString(),
                Upadate_Date: new Date().toLocaleString(),
                role:'admin',   
                Admineimage :profile.photos[0].value
        }
        let adminrecord = await admin.create(admindetils)
        if(adminrecord){
            return cb(null,adminrecord)
        }
        else{
            return cb(null,false)
        }
    }
  }
));


module.exports=passport