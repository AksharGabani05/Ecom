const express = require('express');
const subcategary = require('../model/subcategary');
const routes = express.Router();

const subcategaryControler = require("../controller/subcategarycontroller");

routes.get('/add_subcategary',subcategaryControler.addsubcategary);
routes.post("/insertsubcategary",subcategaryControler.insertsubcategary);
routes.get("/view_subcategary",subcategaryControler.view_subcategary);
routes.get("/view_deactive_subcategary",subcategaryControler.view_deactive_subcategary);
routes.get("/updatesubcategary/:id",subcategaryControler.updatesubcategary);
routes.post("/editesubcategorydata",subcategaryControler.editesubcategorydata)
routes.get("/isactive/:id",subcategaryControler.isactive);
routes.get("/isdeactive/:id",subcategaryControler.isdeactive);
module.exports= routes;