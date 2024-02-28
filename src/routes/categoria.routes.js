import { request, response, Router } from "express";
import {methods as categoriaController } from "../controllers/categoria.controller.js";


const router=Router();


router.get("/", categoriaController.getClients);
router.get("/:id", categoriaController.getClient);
router.post("/", categoriaController.addClient);
router.put("/:id", categoriaController.updateClient);
router.delete("/:id", categoriaController.deleteClient);


export default router;