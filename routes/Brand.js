const express = require("express");
const routes = express.Router();
const Brandcontroller = require("../controller/BrandController");
routes.get("/add_Brand",Brandcontroller.add_Brand);
routes.post("/insertBrand",Brandcontroller.insertBrand);
routes.post("/getextracategaryrecod",Brandcontroller.getextracategaryrecod);
routes.get("/view_Brand",Brandcontroller.view_Brand);
routes.get("/view_deactive_Brand",Brandcontroller.view_deactive_Brand);
routes.get("/updatebrand/:id",Brandcontroller.updatebrand);
routes.post("/editBrand",Brandcontroller.editBrand);
routes.get("/isactive/:id",Brandcontroller.isactive);
routes.get("/isdeactive/:id",Brandcontroller.isdeactive);
module.exports= routes