import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./Utils/ApiError.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// try {
//   app.use(
//     session({
//       store: MongoStore.create({
//         mongoUrl: `${process.env.MONGO_URI}/${process.env.DB_NAME}`, // MongoDB URI, e.g., "mongodb://localhost:27017/yourdbname"
//         collectionName: 'sessions',
//         ttl: 14 * 24 * 60 * 60, // Session expiration time (in seconds), here set to 14 days
//         autoRemove: "native", // Automatically remove expired sessions
//       }),
//       secret: process.env.SESSION_SECRET, // Your session secret
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
//         httpOnly: true,
//         maxAge: 1000 * 60 * 15, // Session expiration time in milliseconds (15 minutes here)
//       },
//     })
//   );
// } catch (error) {
//   console.error("Failed to initialize session store:", error);
// }

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message, // Just send the error message
    });
  }

  res.status(500).json({
    message: "Internal Server Error!!",
  });
});

import userRouter from "./Routes/user.routes.js";
import productRouter from "./Routes/product.routes.js";
import chatRouter from "./Routes/chat.route.js";
import messageRouter from "./Routes/message.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);


export { app };
