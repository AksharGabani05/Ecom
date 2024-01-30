const express = require('express');
const subcategary = require('../model/subcategary');
const routes = express.Router();

const extracategaryController = require("../controller/extracategaryController");

routes.get('/add_extracategary',extracategaryController.addextracategary);
routes.post("/insertextracategary",extracategaryController.insertextracategary);
routes.post("/getsubcategaryrecod",extracategaryController.getsubcategaryrecod);
routes.get("/view_extracategary",extracategaryController.view_extracategary);
routes.get("/view_deactive_extracategary",extracategaryController.view_deactive_extracategary);
routes.get("/updateextracategary/:id",extracategaryController.updateextracategary);
routes.post("/editextracategorydata",extracategaryController.editextracategorydata)
routes.get("/isactive/:id",extracategaryController.isactive);
routes.get("/isdeactive/:id",extracategaryController.isdeactive);
module.exports= routes;