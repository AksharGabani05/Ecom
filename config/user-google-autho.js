const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const user =require("../model/user");
const bcrypt =require('bcrypt')

passport.use(new GoogleStrategy({
    clientID: "953354388385-hejhac96jjjq3bhs9qj4t0cfm6i56bek.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8090/google/callback"
  },
  
  async function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    let checkemail = await user.findOne({email:profile.emails[0].value});
    // console.log(checkemail)
        if(checkemail){
            return cb(null,checkemail)
        }
        else{
            let userdetils ={
                username:profile.displayName,
                email:profile.emails[0].value,
                password: await bcrypt.hash('120345',10),
                create_date: new Date().toLocaleString(),
                updated_date: new Date().toLocaleString(),
                role:'user',
        }
        let userrecord = await user.create(userdetils)
        if(userrecord){
            return cb(null,userrecord)
        }
        else{
            return cb(null,false)
        }
    }
  }
));


module.exports=passport