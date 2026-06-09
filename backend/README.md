# Portfolio Backend — Node.js + Express + MongoDB

Complete backend for the portfolio contact form: saves messages to MongoDB,
sends email notifications, and generates AI auto-replies.

---

## 📁 File Structure

```
backend/
├── server.js              ← Express app entry point
├── package.json
├── .env.example           ← Copy to .env and fill in values
├── config/
│   └── db.js              ← MongoDB connection
├── models/
│   └── Message.js         ← Mongoose schema
├── routes/
│   └── contact.js         ← All /api/contact endpoints
└── utils/
    └── emailService.js    ← Nodemailer (owner + sender emails)
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and fill in:
- `MONGO_URI` — your MongoDB connection string
- `EMAIL_USER` / `EMAIL_PASS` — Gmail credentials (see below)
- `EMAIL_TO` — where contact messages are forwarded
- `CLIENT_URL` — your React app URL (for CORS)
- `ANTHROPIC_API_KEY` — for AI auto-replies (optional)
- `ADMIN_SECRET` — any secret string to protect the admin endpoints

### 3. Start MongoDB

**Local (MongoDB Community):**
```bash
mongod --dbpath /usr/local/var/mongodb
```

**Or use MongoDB Atlas (free cloud tier):**
1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Click Connect → Drivers → copy the connection string
4. Paste into `MONGO_URI` in your `.env`

### 4. Gmail App Password setup
1. Go to your Google Account → Security
2. Enable 2-Step Verification
3. Go to App Passwords → create one for "Mail"
4. Use that 16-char password as `EMAIL_PASS` (NOT your real password)

### 5. Run the server
```bash
# Development (auto-restarts on changes)
npm run dev

# Production
npm start
```

Server starts at: **http://localhost:5000**

---

## 🔌 API Endpoints

### `POST /api/contact`
Submit a new contact message.

**Request body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Freelance project",   // optional
  "message": "Hi Alex, I'd love to..."
}
```

**Success response (201):**
```json
{
  "success": true,
  "message": "Message received! Check your inbox for a confirmation.",
  "data": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "aiReply": "Hi Jane, thanks so much for reaching out!..."
  }
}
```

**Validation error (422):**
```json
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Please provide a valid email" }
  ]
}
```

---

### `GET /api/contact`
Fetch all messages (admin only).

**Headers:** `x-admin-key: YOUR_ADMIN_SECRET`

**Query params:** `?page=1&limit=20&status=unread`

---

### `PATCH /api/contact/:id/status`
Mark a message as read or replied.

**Headers:** `x-admin-key: YOUR_ADMIN_SECRET`

**Body:** `{ "status": "read" }` — values: `unread | read | replied`

---

### `DELETE /api/contact/:id`
Delete a message.

**Headers:** `x-admin-key: YOUR_ADMIN_SECRET`

---

### `GET /api/health`
Check if the server is running.

---

## 🔒 Security Features

| Feature | Implementation |
|---------|---------------|
| Rate limiting | 5 form submissions / hour / IP |
| Input validation | express-validator on all fields |
| Payload limit | 10KB max body size |
| Secure headers | helmet.js |
| CORS | Locked to `CLIENT_URL` |
| IP hashing | SHA-256, never stored raw |
| Admin auth | Secret header (swap for JWT in production) |

---

## 🌐 Connect Frontend

In `portfolio.jsx`, the contact form already points to:
```js
const API_URL = "http://localhost:5000/api/contact";
```

For production, change this to your deployed backend URL:
```js
const API_URL = "https://api.yourdomain.com/api/contact";
```

---

## 📦 Deploy to Railway (recommended free option)

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

Set your `.env` variables in the Railway dashboard under Variables.

---

## MongoDB Message Schema

```
_id          ObjectId   (auto)
name         String     required
email        String     required
subject      String     default "Portfolio Contact"
message      String     required (20–2000 chars)
aiReply      String     AI-generated acknowledgment
status       String     unread | read | replied
ipHash       String     SHA-256 of sender IP (hidden)
createdAt    Date       (auto)
updatedAt    Date       (auto)
```
