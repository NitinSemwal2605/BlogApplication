import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// 🟢 Load environment variables
dotenv.config();

// 🟢 Initialize express app
const app = express();

// 🟢 Middleware
app.use(express.json());

// 🟢 CORS Configuration (Fix for your CORS issue)
const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://quickblog-vert-nine.vercel.app", // your frontend deployed
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS policy: This origin is not allowed."));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  })
);

// 🟢 Basic route
app.get("/", (req, res) => {
  res.send("🚀 Blog Application Backend Running Successfully!");
});

// 🟢 Import your routes
import blogRouter from "./routes/blogRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

// 🟢 Use routes
app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);

// 🟢 Global error handler (to prevent server crash)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  if (err.message.includes("CORS")) {
    return res.status(403).json({ success: false, message: err.message });
  }
  res.status(500).json({ success: false, message: "Server Error" });
});

// 🟢 Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// 🟢 Port Configuration
const PORT = process.env.PORT || 5000;

// 🟢 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
