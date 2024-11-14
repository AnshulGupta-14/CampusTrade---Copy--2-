import jwt from "jsonwebtoken";
import { Product } from "../Models/product.model.js";
import { User } from "../Models/user.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import { ObjectId } from "mongodb";

const addProducts = asyncHandler(async (req, res) => {
  // console.log(req.files);

  const { title, price, category, description } = req.body;
  if (
    [title, price, category, description].some((field) => field?.trim === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const productImages = req.files?.map((file) => file.path);

  if (productImages.length === 0) {
    throw new ApiError(400, "At least one product image is required");
  }

  const images = productImages.map(async (image) => {
    try {
      const imageCloudPath = await uploadOnCloudinary(image);
      // console.log();
      return imageCloudPath.url;
    } catch (error) {
      console.log("Error uploading image");
    }
  });

  // console.log(typeof images);

  const result = await Promise.all(images);
  // console.log(result[0]);

  if (result.length === 0) {
    throw new ApiError(500, "Error uploading images");
  }

  const product = await Product.create({
    title,
    price,
    category,
    description,
    image: result,
    owner: req.user._id,
  });

  req.user.products.push(product._id);
  await req.user.save();
  // console.log(req.user.products);

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product added successfully"));
});

const uploadAd = asyncHandler(async (req, res) => {
  const productId = req.params;
  const products = req.user.products;
  const _id = new ObjectId(productId);

  const index = products.indexOf(_id);
  if (index > -1) {
    req.user.products.splice(index, 1);
  } else {
    throw new ApiError(404, "Product not found in user's products array");
  }
  let deleteProduct = await Product.findOne({ _id });
  req.user.ads.unshift(deleteProduct);
  await req.user.save();

  console.log(deleteProduct);
  res
    .status(200)
    .json(new ApiResponse(200, deleteProduct, "Product removed successfully"));
});

const getAds = asyncHandler(async (req, res) => {
  const myAds = req.user.ads;
  const ads = await Promise.all(
    myAds.map(async (_id) => {
      return await Product.findOne({ _id });
    })
  );
  res.status(200).json(new ApiResponse(200, ads, "Fetch Ads successfully"));
});

const removeAd = asyncHandler(async (req, res) => {
  const productId = req.params;
  const products = req.user.ads;
  const _id = new ObjectId(productId);
  const index = products.indexOf(_id);

  if (index > -1) {
    req.user.ads.splice(index, 1);
  } else {
    throw new ApiError(404, "Product not found in user's products array");
  }
  await req.user.save();
  const deleteProduct = await Product.findByIdAndDelete({ _id });

  if (!deleteProduct) {
    throw new ApiError(404, "Product not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, deleteProduct, "Product removed successfully"));
});

const getProducts = asyncHandler(async (req, res) => {
  const userId = req.params?.id;

  if (userId) {
    const _id = new ObjectId(userId);
    const user = await User.findOne({ _id });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const productIds = user.products;
    if (productIds.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "No products found"));
    }

    let products = productIds.map(
      async (_id) => await Product.findOne({ _id })
    );
    products = await Promise.all(products);
    products.reverse();
    res
      .status(200)
      .json(new ApiResponse(200, products, "Fetch products successfully"));
    return;
  }

  const token = req.cookies?.accessToken;
  let currentUserId = null;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      currentUserId = decodedToken._id; // Store the current user's ID
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  const users = await User.find({ _id: { $ne: currentUserId } }).populate(
    "products"
  );

  const products = users
    .flatMap((user) => user.products)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res
    .status(200)
    .json(new ApiResponse(200, products, "Fetch products successfully"));
});

const getProductDetails = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const _id = new ObjectId(productId);
  const product = await Product.findOne({ _id });
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const user = await User.findOne({ _id: product.owner });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { product, user },
        "Fetch product details successfully"
      )
    );
});

export {
  addProducts,
  uploadAd,
  getProducts,
  getProductDetails,
  getAds,
  removeAd,
};
