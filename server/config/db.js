// db.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    // console.log("URI:", MONGODB_URI);

    mongoose.connection.on("connected", () =>
      console.log("✅ Database Connected Successfully")
    );

    // Handle cases where '?' may or may not exist in the URI
    let MODIFIED_URI;
    if (MONGODB_URI.includes("?")) {
      const queryIndex = MONGODB_URI.indexOf("?");
      MODIFIED_URI =
        MONGODB_URI.slice(0, queryIndex) +
        "quickblog" +
        MONGODB_URI.slice(queryIndex);
    } else {
      MODIFIED_URI = MONGODB_URI.endsWith("/")
        ? `${MONGODB_URI}quickblog`
        : `${MONGODB_URI}/quickblog`;
    }

    await mongoose.connect(MODIFIED_URI);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
};

export default connectDB;
