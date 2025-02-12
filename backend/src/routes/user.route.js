import { Router } from "express";
import { deleteUser, getUserProfile, loginUser, logoutUser, signupUser, updateUser } from "../controllers/user.controller.js";
import { verify } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/signUp").post(upload.single("profilePic"), signupUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/profile").get(verify, getUserProfile);
userRouter.route("/logout").get(verify, logoutUser);
userRouter.route("/delete/:id").delete(verify, deleteUser);
userRouter.route("/update/:id").put(verify, upload.single("profilePic"), updateUser);

export {
    userRouter
}