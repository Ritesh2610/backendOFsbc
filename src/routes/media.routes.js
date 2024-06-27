import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import *as mediaController from "../controller/media.controller.js"

const mediaRoute = Router();

mediaRoute.post('/create',mediaController.createMedia)


export default mediaRoute;