import { Router } from "express";
import {
    changePassword,
    forgotPassword,
    getProfile,
    login,
    logout,
    register,
    resetPassword,
    updateUser,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.post("/register", upload.single("avatar"), register);
router.post("/login", upload.none(), login);
router.post("/logout", logout);
router.get("/user-profile", isLoggedIn, getProfile);
router.post("/reset", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);
router.put("/update-profile/:id", isLoggedIn, upload.single("avatar"), updateUser);
export default router;
