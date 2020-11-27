import express from "express";
import bandController from "../controller/BandController";
//linha responsável por criar um módulo de rotas no express
export const bandRouter = express.Router();

bandRouter.post("/create", bandController.createBand);
