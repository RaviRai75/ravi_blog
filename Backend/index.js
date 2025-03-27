import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";  // Fixed import issue
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";

const app = express();

// Improved CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);
app.use(express.json());

// Add a root route to avoid "Cannot GET /" issue
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Apply CORS headers globally
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API Routes
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Error Handling Middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Internal Server Error",
    status: error.status,
    stack: error.stack,
  });
});

// Define PORT with a fallback value
const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
