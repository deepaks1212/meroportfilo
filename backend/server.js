// server.js  ─── Portfolio Backend Entry Point
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { connectDB } = require("./config/db");
const contactRoutes = require("./routes/contact");

// ── Connect to MongoDB ─────────────────────────────────────
connectDB();

const app = express();

// ── Security middleware ────────────────────────────────────
app.use(helmet()); // Sets secure HTTP headers

// ── CORS ──────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "x-admin-key"],
  })
);

// ── Body parsers ──────────────────────────────────────────
app.use(express.json({ limit: "10kb" })); // Prevent large payload attacks
app.use(express.urlencoded({ extended: true }));

// ── Request logging ────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ── Rate limiting ─────────────────────────────────────────
// Global limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { success: false, message: "Too many requests, please try again later." },
  })
);

// Strict limiter for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // max 5 form submissions per hour per IP
  message: {
    success: false,
    message: "Too many messages sent. Please wait an hour before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Routes ────────────────────────────────────────────────
app.use("/api/contact", contactLimiter, contactRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ── 404 handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// ── Start server ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log("\n══════════════════════════════════════");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`   Mode:    ${process.env.NODE_ENV || "development"}`);
  console.log(`   Health:  http://localhost:${PORT}/api/health`);
  console.log(`   Contact: http://localhost:${PORT}/api/contact`);
  console.log("══════════════════════════════════════\n");
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Stop the other process or change PORT in .env.`);
  } else {
    console.error("❌ Server error:", error);
  }
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});
