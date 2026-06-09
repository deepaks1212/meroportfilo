// models/Message.js
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
      default: "Portfolio Contact",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [20, "Message must be at least 20 characters"],
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    // AI-generated auto-reply stored alongside the message
    aiReply: {
      type: String,
      default: null,
    },
    // Track whether the owner has read/replied
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
    // Store sender's IP for rate-limiting audit (hashed, not raw)
    ipHash: {
      type: String,
      select: false, // hidden from normal queries
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);

// Index for fast queries
MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ status: 1 });
MessageSchema.index({ email: 1 });

module.exports = mongoose.model("Message", MessageSchema);
