import { Router } from "express";
import * as fileControler from "../controller/pdf_File.controller.js"
import upload from "../middleware/fileUploader.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const fileRoute = Router();

fileRoute.get('/get-file/:pagename?', fileControler.getAllFiles);

fileRoute.post('/upload',verifyJWT,upload.single('file'), fileControler.uploadFile);

fileRoute.delete('/delete-file/:fileId',verifyJWT, fileControler.deleteFiles);



export default fileRoute;