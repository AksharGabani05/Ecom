const express = require('express');
const categary = require('../model/categary')
const categaryroutes = express.Router();

const categaryControler = require("../controller/categaryController");

categaryroutes.get('/add_categary',categaryControler.addcategary);
categaryroutes.post("/insertcategary",categaryControler.insertcategary);
categaryroutes.get("/view_categary",categaryControler.view_categary);
categaryroutes.get("/view_deactive_categary",categaryControler.view_deactive_categary);
categaryroutes.get("/updatecategaryrecord/:id",categaryControler.updatecategaryrecord);
categaryroutes.post("/editcategorydata",categaryControler.editcategorydata);
categaryroutes.get("/isactive/:id",categaryControler.isactive);
categaryroutes.get("/isdeactive/:id",categaryControler.isdeactive);
module.exports= categaryroutes;