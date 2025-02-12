import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.util.js";
import { asyncHandler } from "../utils/AsyncHandler.util.js";

export const verify = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.authUserToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized request: No token provided");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        throw new ApiError(403, "Invalid or expired token");
    }

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    req.user = user;

    next();
});