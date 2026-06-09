// config/db.js
const mongoose = require("mongoose");

let dbConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn(
      "⚠️ MONGO_URI is not defined. Running without MongoDB; contact data will be stored in memory only."
    );
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      // These options avoid deprecation warnings
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if no server found
    });

    dbConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    return;
  } catch (error) {
    if (uri.includes("localhost") && error.message.includes("::1")) {
      const fallbackUri = uri.replace("localhost", "127.0.0.1");
      try {
        const conn = await mongoose.connect(fallbackUri, {
          serverSelectionTimeoutMS: 5000,
        });

        dbConnected = true;
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`   Database: ${conn.connection.name}`);
        return;
      } catch (fallbackError) {
        console.warn(
          `⚠️ MongoDB local fallback failed: ${fallbackError.message}`
        );
      }
    }

    console.warn(
      `⚠️ MongoDB unavailable; running in memory-only mode. ${error.message}`
    );
  }
};

const isDbEnabled = () => dbConnected;

// Handle connection events
mongoose.connection.on("disconnected", () => {
  if (dbConnected) {
    console.warn("⚠️  MongoDB disconnected");
    dbConnected = false;
  }
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconnected");
  dbConnected = true;
});

module.exports = { connectDB, isDbEnabled };