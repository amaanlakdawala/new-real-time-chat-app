import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from './router/user.router.js';  
import messageRoute from './router/message.router.js';
import { app, server } from "./socket/socket.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware Setup
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Serve Static Files from Vite's dist folder
app.use(express.static(path.resolve(__dirname, "frontend", "chat", "dist")));

// API Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);

// Catch-all to serve index.html for client-side routes
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "chat", "dist", "index.html"));
});

// Start Server
server.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server running on port", process.env.PORT);
});
