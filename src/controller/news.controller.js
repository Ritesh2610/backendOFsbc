import { asyncHandler } from "../utils/asyncHandler.js";
import * as newsService from "../services/news.service.js";

const createNews = asyncHandler(async (req, res) => {
   
    try {
        const newsResponse = await newsService.createNews(req.body);
        console.log('news', newsResponse);
        return res.status(newsResponse.statusCode).json(newsResponse);
    } catch (error) {
        console.error("Error creating news:", error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const getAllNews = asyncHandler(async (req, res) => {   
    try {
        const newsResponse = await newsService.getAllNews();
        console.log('news', newsResponse);
        return res.status(newsResponse.statusCode).json(newsResponse);
    } catch (error) {
        console.error("Error creating news:", error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const getSingleNews = asyncHandler(async (req, res) => {   
    try {
        const newsResponse = await newsService.getSingleNews();
        console.log('news', newsResponse);
        return res.status(newsResponse.statusCode).json(newsResponse);
    } catch (error) {
        console.error("Error creating news:", error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const deleteSingleNews = asyncHandler(async (req, res) => {   
    try {
        const newsResponse = await newsService.deleteSingleNews(req.params.id);
        console.log('news', newsResponse);
        return res.status(newsResponse.statusCode).json(newsResponse);
    } catch (error) {
        console.error("Error creating news:", error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
});

export { 
    createNews,
    getAllNews,
    getSingleNews,
    deleteSingleNews
 };
