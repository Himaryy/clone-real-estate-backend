import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  savePost,
  profilePosts,
} from "../controllers/user.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const postRoute = express.Router();

postRoute.get("/", getUsers);
// postRoute.get("/:id", verifyToken, getUser);
postRoute.get("/profilePosts", verifyToken, profilePosts);

postRoute.put("/:id", verifyToken, updateUser);
postRoute.delete("/:id", verifyToken, deleteUser);

postRoute.post("/:save", verifyToken, savePost);

export default postRoute;
