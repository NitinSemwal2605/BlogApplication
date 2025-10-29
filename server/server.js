import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://quickblog-fubvb32ex-nitin-semwals-projects.vercel.app" // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.use(express.json());
connectDB();

// ✅ Routes
app.get("/", (req, res) => res.send("✅ API is running!"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// 404 fallback
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
