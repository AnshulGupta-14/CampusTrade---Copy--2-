import express, { Router } from "express";
import {
  getChats,
  getChat,
  addChat,
  readChat,
} from "../Controllers/chat.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = Router();

router.route("/getChats").get(verifyJWT, getChats);
router.get("/c/:id", verifyJWT, getChat);
router.post("/addChat", verifyJWT, addChat);
router.put("/read/:id", verifyJWT, readChat);

export default router;