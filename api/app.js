import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

// add 0.0.0.0 make it RUN IN LOCALHOST:8800 not in 127.0.0.1
app.listen(8800, "0.0.0.0", () => {
  console.log("Server Is Running ");
});
