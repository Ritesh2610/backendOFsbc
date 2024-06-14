import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessTokenAndAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId).select("-password -refreshToken");
        console.log(user);
        if (!user) {
            throw new ApiError(400, "User does not exist");
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        // Handle any other errors here
        throw new ApiError(500, "Internal Server Error");
    }

}



const userRegister = async (body) => {
    const { name, email, password, role } = body;
    if (!name || !email || !password || !role) throw new ApiError(400, "User name is required");
    // Check if user already exists

    const oldUser = await User.findOne({ email });
    if (oldUser) {
        throw new ApiError(400, "User already exists");
    }

    // Create a new user
    const newUser = new User({
        name,
        email,
        password,
        role
    });

    // Save the new user to the database
    await newUser.save();

    // Return the created user without sensitive information
    const createdUser = await User.findById(newUser._id).select(
        "-password -refressToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Somthing went wrong");
    }

    return createdUser;
}

// login api 

const userLogin = async (body) => {
    const { email, password } = body;

    if (!email || !password) throw new ApiError(400, "Email and password are required");

    // Check if user already exists
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new ApiError(400, "User does not exist");
    }

    // Check if password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Password is incorrect");
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessTokenAndAccessToken(user._id);


    const logdInUser = await User.findById(user._id).select("-password -refreshToken");

    return new ApiResponse(200, { user: logdInUser, refreshToken, accessToken }, "User Login successfully");
}

const logoutUser = async (user) => {
try{    
     await User.findByIdAndUpdate(
        user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    );

    return new ApiResponse(200, {}, "User Logout successfully");
}
catch(error){
    throw new ApiError(500, "Internal Server Error");
}
}

export {
    userRegister,
    userLogin,
    logoutUser
};
