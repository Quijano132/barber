import { request, response, Router } from "express";
import {methods as clienteController } from "../controllers/cliente.controller.js";

const router=Router();

router.get("/", clienteController.getClients);
router.get("/:id", clienteController.getClient);
router.post("/", clienteController.addClient);
router.put("/:id", clienteController.updateClient);
router.delete("/:id", clienteController.deleteClient);

export default router;