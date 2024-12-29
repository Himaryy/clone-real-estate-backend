import express from "express";
import {
  getChats,
  getChat,
  addChat,
  readChat,
} from "../controllers/chat.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const postRoute = express.Router();

postRoute.get("/", verifyToken, getChats);
postRoute.get("/:id", verifyToken, getChat);
postRoute.post("/", verifyToken, addChat);
postRoute.put("/read/:id", verifyToken, readChat);

export default postRoute;
