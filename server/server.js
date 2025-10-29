import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// ✅ CORS setup should be first
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://quickblog-fubvb32ex-nitin-semwals-projects.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
connectDB();

// ✅ Routes
app.get("/", (req, res) => res.send("✅ API is running!"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
