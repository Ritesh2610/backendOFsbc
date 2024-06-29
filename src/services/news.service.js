import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { News } from "../model/news.model.js";

const createNews = async (body) => {
    try {
        const { title, url } = body;

        if (!title || !url) {
            throw new ApiError(400, "All fields are required.");
        }

        const news = await News.create({
            title,
            url,
        });

        if (!news) {
            throw new ApiError(400, "Something went wrong.");
        }

        return new ApiResponse(200, news,"News created successfully");
    } catch (error) {
        // Log error or handle it appropriately
        throw error; // Re-throw the error for centralized error handling
    }
};


const getAllNews = async () => {
    try {

        const news = await News.find().sort({created_at:-1})
        if (!news) {
            throw new ApiError(400, "Something went wrong.");
        }

        return new ApiResponse(200, news,"Featch data successfully");
    } catch (error) {
        // Log error or handle it appropriately
        throw error; // Re-throw the error for centralized error handling
    }
};

const getSingleNews = async () => {
    try {

        const news = await News.findOne().sort({ created_at: -1 });

        if (!news) {
            throw new ApiError(400, "Something went wrong.");
        }

        return new ApiResponse(200, news,"Featch data successfully");
    } catch (error) {
        // Log error or handle it appropriately
        throw error; // Re-throw the error for centralized error handling
    }
};

const deleteSingleNews = async (id) => {
    try {

        const news = await News.findByIdAndDelete({_id:id});

        if (!news) {
            throw new ApiError(400, "Something went wrong.");
        }

        return new ApiResponse(200, news,"Delete data successfully");

    } catch (error) {
        // Log error or handle it appropriately
        throw error; // Re-throw the error for centralized error handling
    }
};

export { 
    createNews,
    getAllNews,
    getSingleNews,
    deleteSingleNews
 };
