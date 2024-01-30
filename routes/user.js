const express = require('express');
const routes = express.Router();
const Usercontroller = require("../controller/usercontroller");
const passport = require('passport')
routes.get('/',Usercontroller.home);
routes.get("/productlist/:cid/:sid/:eid", Usercontroller.productlist);
routes.get('/product_detils/:id',Usercontroller.product_detils);
routes.post('/ajexPriceFilter',Usercontroller.ajexPriceFilter);
routes.post('/ajexBrandFilter', Usercontroller.ajexBrandFilter);
routes.get('/userLogin',Usercontroller.userLogin);
routes.post('/userRegister',Usercontroller.userRegister);
routes.post('/checkuserLogin',passport.authenticate('user',{failureRedirect:'/userLogin'}),Usercontroller.checkuserLogin);
routes.post('/insertCart',passport.checkUserAuthentication,Usercontroller.insertCart);
routes.get('/viewcart',passport.checkUserAuthentication,Usercontroller.viewcart);
routes.post('/changeQuantity', passport.checkUserAuthentication , Usercontroller.changeQuantity);
routes.get('/deleteCart/:id', passport.checkUserAuthentication, Usercontroller.deleteCart);
routes.get('/checkout', passport.checkUserAuthentication , Usercontroller.checkout);
routes.post('/payment',passport.checkUserAuthentication,Usercontroller.payment);

//login with google
routes.get('/google',passport.authenticate('google', { scope: ['profile','email'] }));
routes.get('/google/callback',passport.authenticate('google', { failureRedirect: '/userLogin' }),Usercontroller.checkuserLogin);
module.exports = routes