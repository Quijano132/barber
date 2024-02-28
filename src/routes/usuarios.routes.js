import { request, response, Router } from "express";
import {methods as usuarioController } from "../controllers/usuario.controller.js";


const router=Router();


router.get("/", usuarioController.getClients);
router.get("/:id", usuarioController.getClient);
router.post("/", usuarioController.addClient);
router.put("/:id", usuarioController.updateClient);
router.delete("/:id", usuarioController.deleteClient);


export default router;