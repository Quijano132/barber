import { request, response, Router } from "express";
import {methods as serviciosController } from "../controllers/servicios.controller.js";


const router=Router();


router.get("/", serviciosController.getClients);
router.get("/:id", serviciosController.getClient);
router.post("/", serviciosController.addClient);
router.put("/:id", serviciosController.updateClient);
router.delete("/:id", serviciosController.deleteClient);


export default router;