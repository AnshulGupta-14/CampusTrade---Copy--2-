import express from "express";
import {
  addMessage
} from "../Controllers/message.controller.js";
import {verifyJWT} from "../Middlewares/auth.middleware.js";

const router = express.Router();


router.post("/:chatId", verifyJWT, addMessage);

export default router;