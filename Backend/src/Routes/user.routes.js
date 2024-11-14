import { Router } from "express";
import { upload } from "../Middlewares/multer.middleware.js";
import {
  favourite,
  getCurrentUser,
  likedProducts,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateAvatar,
  updateMobileNumber,
  updatePassword,
  verifyOTP,
} from "../Controllers/user.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/update-password").post(verifyJWT, updatePassword);
router.route("/get-current-user/:id").get(getCurrentUser);
router.route("/update-account-details").put(verifyJWT, updateAccountDetails);
router
  .route("/update-avatar")
  .post(upload.single("avatar"), verifyJWT, updateAvatar);
router.route("/verify-otp").post(verifyOTP);
router.route("/update-mobile").put(updateMobileNumber);
router.route("/liked-product").post(verifyJWT, likedProducts);
router.route("/favourite-products").get(favourite);

export default router;
