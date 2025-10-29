import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// ✅ 1️⃣ Proper CORS setup before any routes
const allowedOrigins = [
  "https://quickblog-vert-nine.vercel.app", // your frontend (production)
  "http://localhost:5173",                  // your frontend (dev)
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Optional (handle preflight quickly)
app.options("*", cors());

// ✅ 2️⃣ Core middlewares
app.use(express.json());
connectDB();

// ✅ 3️⃣ Routes
app.get("/", (req, res) => res.send("✅ Blog API running!"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// ✅ 4️⃣ 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// ✅ 5️⃣ Run server locally only (Vercel handles it automatically in deployment)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
