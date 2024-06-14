import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.header('Authorization')?.replace("Bearer ", "");
    
    if (!token) {
        return res.status(400).json(new ApiError(401, "Unauthorized request"));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(401, "Invalid Access Token");
        }
        throw new ApiError(401, error.message || "Invalid Access Token");
    }
});