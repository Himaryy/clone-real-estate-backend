import express from "express";
import { addMessage } from "../controllers/message.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const postRoute = express.Router();

postRoute.post("/:chatId", verifyToken, addMessage);

export default postRoute;
