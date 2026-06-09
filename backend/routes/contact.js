// routes/contact.js
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const Message = require("../models/Message");
const { isDbEnabled } = require("../config/db");
const { sendOwnerNotification, sendSenderConfirmation } = require("../utils/emailService");

const memoryStore = [];

const selectMessageFields = (message) => {
  const { ipHash, ...rest } = message;
  return rest;
};

const saveMessage = async (data) => {
  if (isDbEnabled()) {
    return Message.create(data);
  }

  const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const now = new Date();
  const record = {
    _id: id,
    ...data,
    status: data.status || "unread",
    createdAt: now,
    updatedAt: now,
  };

  memoryStore.unshift(record);
  return record;
};

const filterMessages = (filter = {}) =>
  memoryStore.filter((message) => !filter.status || message.status === filter.status);

const findMessages = async (filter, page = 1, limit = 20) => {
  if (isDbEnabled()) {
    return Message.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-ipHash");
  }

  const messages = filterMessages(filter);
  return messages
    .slice((page - 1) * limit, (page - 1) * limit + Number(limit))
    .map(selectMessageFields);
};

const countMessages = async (filter = {}) => {
  if (isDbEnabled()) {
    return Message.countDocuments(filter);
  }
  return filterMessages(filter).length;
};

const updateMessageStatus = async (id, status) => {
  if (isDbEnabled()) {
    return Message.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  }

  const message = memoryStore.find((msg) => msg._id === id || msg.id === id);
  if (!message) return null;

  message.status = status;
  message.updatedAt = new Date();
  return selectMessageFields(message);
};

const deleteMessageById = async (id) => {
  if (isDbEnabled()) {
    return Message.findByIdAndDelete(id);
  }

  const index = memoryStore.findIndex((msg) => msg._id === id || msg.id === id);
  if (index === -1) return null;

  const [deleted] = memoryStore.splice(index, 1);
  return selectMessageFields(deleted);
};

// ── Validation rules ──────────────────────────────────────────
const contactValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be 2–100 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("subject")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Subject cannot exceed 200 characters"),
  body("message")
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage("Message must be 20–2000 characters"),
];

// ── Helper: generate AI auto-reply ───────────────────────────
const generateAIReply = async (name, message) => {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        system:
          "You are Alex, a senior full-stack developer. Write a warm, concise (3–4 sentences) acknowledgment reply to someone who just filled out your portfolio contact form. Sound genuine and professional. Don't make specific timeline promises. Sign it as 'Alex'.",
        messages: [
          {
            role: "user",
            content: `Sender name: ${name}\nMessage: ${message}`,
          },
        ],
      }),
    });
    const data = await response.json();
    return data.content?.[0]?.text || null;
  } catch {
    return null; // fallback to default reply in email service
  }
};

// ─────────────────────────────────────────────────────────────
// POST /api/contact   — Submit a new contact message
// ─────────────────────────────────────────────────────────────
router.post("/", contactValidation, async (req, res) => {
  // 1. Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, subject, message } = req.body;

  // 2. Hash sender IP for audit (never store raw IP)
  const rawIP = req.ip || req.connection.remoteAddress || "";
  const ipHash = crypto.createHash("sha256").update(rawIP).digest("hex");

  try {
    // 3. Generate AI reply (non-blocking — runs in parallel with DB save)
    const [aiReply] = await Promise.allSettled([
      generateAIReply(name, message),
    ]);
    const replyText = aiReply.status === "fulfilled" ? aiReply.value : null;

    // 4. Save to MongoDB or memory if Mongo is unavailable
    const savedMessage = await saveMessage({
      name,
      email,
      subject: subject || "Portfolio Contact",
      message,
      aiReply: replyText,
      ipHash,
    });

    // 5. Send emails (fire-and-forget — don't block the API response)
    Promise.allSettled([
      sendOwnerNotification({ name, email, subject, message }),
      sendSenderConfirmation({ name, email, aiReply: replyText }),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Email ${i === 0 ? "owner" : "sender"} failed:`, r.reason?.message);
        }
      });
    });

    // 6. Respond to client
    return res.status(201).json({
      success: true,
      message: "Message received! Check your inbox for a confirmation.",
      data: {
        id: savedMessage._id,
        aiReply:
          replyText ||
          `Hi ${name}, thanks for reaching out! I'll review your message and get back to you soon. — Alex`,
      },
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again or email me directly.",
    });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/contact   — Fetch all messages (owner/admin only)
// Protected by secret header — swap for real auth in production
// ─────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { status } : {};

    const messages = await findMessages(filter, page, limit);
    const total = await countMessages(filter);

    return res.json({
      success: true,
      data: messages,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Fetch messages error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────────────────────
// PATCH /api/contact/:id/status  — Mark as read/replied
// ─────────────────────────────────────────────────────────────
router.patch("/:id/status", async (req, res) => {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { status } = req.body;
  if (!["unread", "read", "replied"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }

  try {
    const updated = await updateMessageStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ success: false, message: "Message not found" });

    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────────────────────
// DELETE /api/contact/:id  — Delete a message
// ─────────────────────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const deleted = await deleteMessageById(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Message not found" });

    return res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
