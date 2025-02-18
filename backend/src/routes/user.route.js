import { Router } from "express";
import { deleteUser, getAllUser, getUserProfile, loginUser, logoutUser, signupUser, updateUser } from "../controllers/user.controller.js";
import { verify } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/signUp").post(upload.single("profilePic"), signupUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/profile").get(verify, getUserProfile);
userRouter.route("/logout").get(verify, logoutUser);
userRouter.route("/delete/:id").delete(verify, deleteUser);
userRouter.route("/update/:id").put(verify, upload.single("profilePic"), updateUser);
userRouter.route("/getAllUsers").get(verify,getAllUser);

export {
    userRouter
}