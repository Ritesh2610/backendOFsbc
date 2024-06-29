import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import *as newsController from "../controller/news.controller.js";

const newsRoute = Router();

newsRoute.post('/create',newsController.createNews)
newsRoute.get('/get-all',newsController.getAllNews)
newsRoute.get('/get-single',newsController.getSingleNews)
newsRoute.delete('/delete-single/:id',newsController.deleteSingleNews)





export default newsRoute;