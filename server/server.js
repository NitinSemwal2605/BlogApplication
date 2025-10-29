import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// ✅ STEP 1: Setup CORS properly
const allowedOrigins = [
  "https://quickblog-vert-nine.vercel.app", // your frontend
  "http://localhost:5173"                   // for local testing (optional)
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

// ✅ STEP 2: Continue with app setup
app.use(express.json());
connectDB();

app.get("/", (req, res) => res.send("✅ API running successfully!"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
