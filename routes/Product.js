const express = require("express");
const routes = express.Router();
const product = require("../model/Product")
const productCOntroller = require("../controller/ProductController")
routes.get("/add_Product",productCOntroller.add_Product);
routes.post("/getbrandtyperecod",productCOntroller.getbrandtyperecod);
routes.post("/insertproduct",product.uploadimage,productCOntroller.insertproduct);
routes.get("/view_Product",productCOntroller.view_Product);
routes.get("/view_deactive_Product",productCOntroller.view_deactive_Product);
routes.get("/viewmore/:id",productCOntroller.viewmore);
routes.get("/updateproduct/:id",productCOntroller.updateproduct);
routes.post("/editproduct",product.uploadimage,productCOntroller.editproduct)
routes.get("/isactive/:id",productCOntroller.isactive);
routes.get("/isdeactive/:id",productCOntroller.isdeactive);
module.exports = routes;