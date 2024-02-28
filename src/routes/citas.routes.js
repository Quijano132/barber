import { request, response, Router } from "express";
import {methods as citasController } from "../controllers/citas.controller.js";


const router=Router();


router.get("/", citasController.getClients);
router.get("/:id", citasController.getClient);
router.post("/", citasController.addClient);
router.put("/:id", citasController.updateClient);
router.delete("/:id", citasController.deleteClient);


export default router;