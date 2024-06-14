import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import * as userService from "../services/user.service.js"

const userRegister = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
        const userResponse = await userService.userRegister(req.body)
        return res.status(200).json(new ApiResponse(200, userResponse, "User Created successfully"))
    } catch (err) {
        return res.status(err.statusCode).json(err)
    }
});


const userLogin = asyncHandler(async (req, res) => {
    try {
        const userResponse = await userService.userLogin(req.body)
        return res.status(userResponse.statusCode).json(userResponse)
    } catch (err) {

        return res.status(err.statusCode).json(err)
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        const userResponse = await userService.logoutUser(req.logedInUser)
        return res.status(userResponse.statusCode).json(userResponse)
    } catch (err) {

        return res.status(err.statusCode).json(err)
    }
});
export {
    userRegister,
    userLogin,
    logoutUser
}