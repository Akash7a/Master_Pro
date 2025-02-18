import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/AsyncHandler.util.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.util.js";


const options = {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
}

const signupUser = asyncHandler(async (req, res) => {
    console.log("body",req.body);
    const { fullname, username, email, password, role } = req.body;

    if ([fullname, username, email, password,role].some(dets => !dets)) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
        throw new ApiError(400, "User already exists with given credentials");
    }

    let profilePicUrl = null;
    if (req.file) {
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (cloudinaryResponse && cloudinaryResponse.url) {
            profilePicUrl = cloudinaryResponse.url;
        }
    }

    const user = await User.create(
        {
            fullname,
            username,
            email,
            password,
            profilePic: profilePicUrl,
            role,
        }
    );

    if (!user) {
        throw new ApiError(500, "Failed to create User");
    }

    const token = await user.generateToken();

    if (!token) {
        throw new ApiError(500, "Failed to generate access token");
    }

    res.cookie("authUserToken", token, options);
    return res.status(201).json(new ApiResponse(201, {
        message: "User registered successfully!",
        user,
        authToken: token,
    }));

});

const loginUser = asyncHandler(async (req, res) => {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
        throw new ApiError(400, "Email or username and password is required");
    };

    const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const isMatch = user.validatePassword(password);

    if (!isMatch) {
        throw new ApiError(404, "User not found.");
    }

    const token = await user.generateToken();

    res.cookie("authUserToken", token, options);
    return res.status(200).json(new ApiResponse(200, {
        message: "User logged in successfully!",
        user,
        authToken: token,
    }));
})

const logoutUser = asyncHandler(async (req, res) => {

    const user = req?.user;

    if (!user) {
        throw new ApiError(403, "Unauthorized request!")
    }

    res.clearCookie("authUserToken", options);
    return res.status(200).json(new ApiResponse(200, {
        message: "User logged out successfully!",
        user: user.username,
    }));
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "User ID is required");
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        throw new ApiError(500, "Failed to delete the user");
    }

    if (req.user._id.toString === id) {
        res.clearCookie("token", options);
    }

    return res.status(200).json(new ApiResponse(200, {
        message: "User deleted successfully",
        user: deletedUser._id,
    }));
});

const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req?.user._id;

    if (!userId) {
        throw new ApiError(403, "ID is required.");
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, {
        message: "User profile fetched successfully.",
        user,
    }));
});

const updateUser = asyncHandler(async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded file", req.file);

    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
        throw new ApiError("400", "Id is required!");
    }

    if (!updateData) {
        throw new ApiError(400, "Updated data is required.");
    }

    if (req.file) {
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (cloudinaryResponse && cloudinaryResponse.url) {
            updateData.profilePic = cloudinaryResponse.url;
        }
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");

    if (!updatedUser) {
        throw new ApiError(500, "failed to update the user.");
    }

    return res.status(200).json(new ApiResponse(
        200,
        {
            message: "User updated successfully!",
            user: updatedUser,
        }
    ))
});

const getAllUser = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const users = await User.find({ _id: { $ne: req.user.id } }).select("-password");
    return res.status(200).json(new ApiResponse(200,{
        message:"all users fetched successfully",
        users:users,
    }));
});

export {
    signupUser,
    loginUser,
    logoutUser,
    deleteUser,
    getUserProfile,
    updateUser,
    getAllUser,
}