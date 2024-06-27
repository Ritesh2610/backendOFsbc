import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Media } from "../model/media.model.js";
import { User } from "../model/user.model.js";


const createEvent = async (body, file, logdInUser) => {

    const { title, thumbnal, Image, text } = body;
    // const { path, originalname } = file;

    if (!title || !thumbnal || !Image.length, !text) {
        throw new ApiError(400, "All fields are required.");
    }

    if (!file) {
        throw new ApiError(400, "Please upload a Image");
    }

    const user = await User.findById({ _id: logdInUser._id });

    console.log("user", user);

    if (!user) {
        throw new ApiError(401, "Unauthorized user");
    }

    // let filePath = path.substring(path.indexOf('public//') + 8);

}

export {
    createEvent
}

