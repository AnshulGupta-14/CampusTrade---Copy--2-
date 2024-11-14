import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import {
  addProducts,
  getAds,
  getProductDetails,
  getProducts,
  removeAd,
  uploadAd,
} from "../Controllers/product.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = Router();

router
  .route("/add-products")
  .post(verifyJWT, upload.array("image", 12), addProducts);
router.route("/upload-ad/:id").post(verifyJWT, uploadAd);
router.route("/get-products/:id?").get(getProducts);
router.route("/product-details/:id").get(getProductDetails);
router.route("/ads").get(verifyJWT, getAds);
router.route("/remove-ad/:id").delete(verifyJWT, removeAd);

export default router;
