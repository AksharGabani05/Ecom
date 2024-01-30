const express = require("express");
const routes = express.Router();
const TypeController = require("../controller/typeController");
routes.get("/add_type",TypeController.add_type)
routes.post("/getbrandrecod",TypeController.getbrandrecod)
routes.post("/inserttype",TypeController.inserttype);
routes.get("/view_type",TypeController.view_type);;
routes.get("/view_deactive_type",TypeController.view_deactive_type);
routes.get("/updatetype/:id",TypeController.updatetype);
routes.post("/edittype",TypeController.edittype)
routes.get("/isactive/:id",TypeController.isactive);
routes.get("/isdeactive/:id",TypeController.isdeactive);
module.exports = routes