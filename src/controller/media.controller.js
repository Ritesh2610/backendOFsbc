import { asyncHandler } from "../utils/asyncHandler.js";
import * as mediaService from "../services/media.service.js"

const createMedia = asyncHandler(async (req, res) => {
    try {
        const mediaResponse = await mediaService.createEvent(req.body, req.file, req.user);
        console.log('filrresponse', mediaResponse);
        return res.status(mediaResponse.statusCode).json(mediaResponse)
    } catch (error) {
        return res.status(error.statusCode).json(error)
    }
});



export {createMedia}