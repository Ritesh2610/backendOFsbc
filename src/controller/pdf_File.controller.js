import { asyncHandler } from "../utils/asyncHandler.js";
import * as fileService from "../services/pdf_File.service.js"

const uploadFile = asyncHandler(async (req, res) => {
    try {
        const fileResponse = await fileService.uploadFileService(req.body, req.file, req.user);
        console.log('filrresponse', fileResponse);
        return res.status(fileResponse.statusCode).json(fileResponse)
    } catch (error) {
        return res.status(error.statusCode).json(error)
    }
});

const getAllFiles = asyncHandler(async(req,res)=>{
    try {
        const fileResponse = await fileService.getAllFiles(req.params.pagename);
        return res.status(fileResponse.statusCode).json(fileResponse)
    } catch (error) {
        return res.status(error.statusCode).json(error)
    }
})

const deleteFiles = asyncHandler(async(req,res)=>{
    try {
        const fileResponse = await fileService.deleteFile(req.params.fileId);
        return res.status(fileResponse.statusCode).json(fileResponse)
    } catch (error) {
        return res.status(error.statusCode).json(error)
    }
})

export {
    uploadFile,
    getAllFiles,
    deleteFiles
}