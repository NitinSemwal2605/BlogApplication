import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();
connectDB();

// ✅ STEP 1: Define allowed origins
const allowedOrigins = [
  "https://quickblog-vert-nine.vercel.app", // your frontend (prod)
  "http://localhost:5173",                  // your frontend (dev)
];

// ✅ STEP 2: Enable CORS globally
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ STEP 3: Handle preflight requests quickly
app.options("*", cors());

// ✅ STEP 4: Middlewares and routes
app.use(express.json());
app.get("/", (req, res) => res.send("✅ Blog API is live!"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// ✅ STEP 5: Catch-all 404
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// ✅ STEP 6: Local dev port (Vercel ignores this)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
