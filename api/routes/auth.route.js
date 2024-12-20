import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const postRoute = express.Router();

postRoute.post("/register", register);
postRoute.post("/login", login);
postRoute.post("/logout", logout);

export default postRoute;
