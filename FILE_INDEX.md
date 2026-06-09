# 📋 Portfolio Stack — Complete File Index

## 🎯 Project Overview

A **production-ready developer portfolio website** built with:
- **Frontend**: React.js with smooth animations, dark/light mode, floating AI chat
- **Backend**: Node.js + Express.js + MongoDB for contact form management
- **AI**: Claude-powered auto-replies to contact messages
- **Deployment**: Ready for Vercel (frontend) + Railway (backend)

---

## 📁 File Structure & Descriptions

### 🎨 FRONTEND

#### `portfolio.jsx` (Main Component)
**The entire React frontend in one file (2000+ lines)**
- Hero section with typewriter effect
- Photo avatar (SVG illustrated or replace with real photo)
- Navigation bar with smooth scroll-to-section
- About page with skills, experience tabs
- Projects grid with filtering
- Services section with pricing
- Contact form with validation
- Floating AI chat assistant
- Dark/light mode toggle
- Fully responsive (mobile, tablet, desktop)
- 50+ custom animations and transitions

**Key features:**
- Photo avatar component with animated ring
- Intersection Observer for scroll animations
- Form validation + server integration
- AI chat with Claude API fallback to FAQ
- Smooth page transitions on nav clicks

---

### 🔧 BACKEND

#### `backend/server.js`
**Main Express application entry point (180 lines)**
- Sets up Express server on port 5000
- Configures CORS for frontend access
- Rate limiting (5 msgs/hour per IP)
- Security headers with Helmet
- Request logging with Morgan
- Error handling middleware
- MongoDB connection initialization
- Health check endpoint at `/api/health`

**Environment:** Development & Production ready

#### `backend/package.json`
**Dependencies & scripts**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "cors": "^2.8.5",
    "nodemailer": "^6.9.7",
    "express-validator": "^7.0.1",
    "express-rate-limit": "^7.1.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0"
  }
}
```
- Run: `npm install` then `npm run dev` (or `npm start`)

#### `backend/.env.example`
**Template for environment variables — copy to .env**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio_db
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_TO=your_email@example.com
CLIENT_URL=http://localhost:3000
ANTHROPIC_API_KEY=sk-ant-v3-xxxx (optional)
ADMIN_SECRET=some_random_secret_key
```

#### `backend/config/db.js`
**MongoDB connection utility (30 lines)**
- Connects to MongoDB via Mongoose
- Handles connection errors
- Logs connection events
- Auto-reconnect logic

**Usage:** Called in server.js at startup

#### `backend/models/Message.js`
**Mongoose schema for contact messages (65 lines)**
- Fields: name, email, subject, message, aiReply, status, ipHash
- Validation rules (min/max length, email format)
- Indexes for fast queries
- Timestamps (createdAt, updatedAt)

**Status values:** unread | read | replied

#### `backend/routes/contact.js`
**Contact form API endpoints (200 lines)**

**Endpoints:**
- `POST /api/contact` — Submit new message
  - Validates input (422 errors on invalid)
  - Saves to MongoDB
  - Generates AI reply (async)
  - Sends 2 emails
  - Returns aiReply to client
  - Rate limited: 5/hour

- `GET /api/contact` — List all messages (admin only)
  - Requires `x-admin-key` header
  - Query params: `page`, `limit`, `status`
  - Returns paginated results

- `PATCH /api/contact/:id/status` — Mark message as read/replied (admin)
  - Requires `x-admin-key` header
  - Body: `{ "status": "read" }`

- `DELETE /api/contact/:id` — Delete message (admin)
  - Requires `x-admin-key` header

#### `backend/utils/emailService.js`
**Nodemailer email templates (150 lines)**

**Functions:**
- `sendOwnerNotification()` — Email to you when someone submits
  - Shows sender info in table format
  - Includes message body
  - Direct reply link
  - Beautiful HTML template

- `sendSenderConfirmation()` — Confirmation to visitor
  - AI-generated personal message
  - Links to your social profiles
  - Auto-response badge
  - Professional branding

#### `backend/README.md`
**Backend setup & deployment guide**
- 5-minute setup instructions
- MongoDB setup (local vs. Atlas)
- Gmail App Password setup
- API endpoint documentation
- Environment variables explanation
- Security features overview
- Deployment to Railway

---

## 📚 DOCUMENTATION

#### `SETUP_GUIDE.md` (This Guide)
**Complete setup, configuration, and deployment walkthrough**
- Features checklist
- Quick start (5 minutes)
- Configuration details
- Customization guide
- Deployment options
- Testing instructions
- Troubleshooting
- Going live checklist
- Pro tips

#### `backend/README.md`
**Backend-specific documentation**
- File structure
- Installation steps
- Environment variables
- API endpoints with examples
- Security features
- MongoDB schema
- Rate limiting info

---

## 🚀 Quick Reference

### To Start Everything:
```bash
# Terminal 1: Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
# Runs on http://localhost:5000

# Terminal 2: Frontend (in Create React App)
npx create-react-app portfolio
# Copy portfolio.jsx to src/
npm start
# Runs on http://localhost:3000
```

### Key Endpoints:
```
POST   /api/contact              ← Submit form
GET    /api/contact              ← List messages (admin)
PATCH  /api/contact/:id/status   ← Mark read (admin)
DELETE /api/contact/:id          ← Delete (admin)
GET    /api/health               ← Health check
```

### Key Components (Frontend):
```
<App />
├── <Nav />                     ← Navigation + theme toggle
├── <Hero />                    ← Typewriter + photo + CTAs
├── <About />                   ← Bio + skills + experience
├── <Projects />                ← Filterable project grid
├── <Services />                ← Service cards + pricing
├── <Contact />                 ← Form + contact info
├── <Footer />                  ← Links + social
└── <AIChat />                  ← Floating chatbot
```

---

## 🎨 Customization Checklist

- [ ] Update your name (replace "Alex Chen")
- [ ] Add real photo URL to `PhotoAvatar` component
- [ ] Update `PROJECTS` array with your projects
- [ ] Update `SKILLS` array with your tech stack
- [ ] Update `EXPERIENCE` array with your work history
- [ ] Update `SERVICES` array with what you offer
- [ ] Update `FAQ` with your common questions
- [ ] Change email/social links in Contact & Footer
- [ ] Update navbar links if needed
- [ ] Adjust colors in `C` object if desired
- [ ] Customize animations (timing, direction, etc.)

---

## 🔐 Security Features

✅ **CORS** — Locked to your frontend URL  
✅ **Rate limiting** — 5 submissions per hour per IP  
✅ **Input validation** — Server-side checks (min/max length, email format)  
✅ **Payload limit** — Max 10KB to prevent attacks  
✅ **Helmet** — Secure HTTP headers  
✅ **IP hashing** — Never stores raw IP addresses  
✅ **Admin auth** — Secret header for protected endpoints  
✅ **Error messages** — Don't leak server details  

---

## 📊 Database Schema

### messages collection
```javascript
{
  _id: ObjectId,
  name: String (2-100 chars),
  email: String (valid email),
  subject: String (optional, 0-200 chars),
  message: String (20-2000 chars),
  aiReply: String (optional, AI-generated),
  status: "unread" | "read" | "replied",
  ipHash: String (SHA-256, hidden from API),
  createdAt: Date (auto),
  updatedAt: Date (auto),
}
```

**Indexes:**
- `{ createdAt: -1 }` — Sort by newest first
- `{ status: 1 }` — Filter by status
- `{ email: 1 }` — Find by email

---

## 🌐 Deployment URLs

After deployment, update these:

### Frontend `.env`
```
REACT_APP_API_URL=https://your-api.railway.app/api/contact
```

### Backend `.env`
```
CLIENT_URL=https://your-portfolio.vercel.app
```

### In portfolio.jsx
```javascript
const API_URL = "https://your-api.railway.app/api/contact";
```

---

## 📈 Performance Tips

1. **Image optimization** — Use next/image or compress PNGs
2. **Code splitting** — Already done (single JSX file)
3. **Lazy loading** — Implemented via Intersection Observer
4. **Animation performance** — Using transform/opacity (GPU-accelerated)
5. **Database indexing** — Already configured
6. **Rate limiting** — Prevents DDoS
7. **Caching** — Set cache headers in Express (optional)

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot POST /api/contact" | Backend not running. Run `npm run dev` in backend/ |
| "CORS error" | Check `CLIENT_URL` in backend .env matches your frontend |
| "MongoDB connection failed" | MongoDB not running or MONGO_URI incorrect |
| "Emails not sending" | Gmail App Password incorrect or 2FA not enabled |
| "AI replies not working" | ANTHROPIC_API_KEY missing (optional, FAQ fallback works) |
| "Form validation errors" | Check browser console. Server validates again. |
| "404 on contact form" | API_URL in portfolio.jsx pointing to wrong backend |

---

## 📱 Responsive Design

All sections optimized for:
- **Mobile** (320px - 640px)
- **Tablet** (640px - 900px)
- **Desktop** (900px+)

CSS Grid/Flexbox + clamp() for fluid typography. No frameworks needed.

---

## ⚡ Performance Metrics Target

- **Lighthouse Score**: 95+
- **Page Load**: < 2s
- **Time to Interactive**: < 3s
- **Layout Shift**: 0 (no CLS)
- **All animations**: 60 FPS

---

## 🎓 Learning Resources

- **React Hooks**: https://react.dev/reference/react
- **Express Best Practices**: https://expressjs.com/guide/routing.html
- **MongoDB Queries**: https://docs.mongodb.com/manual/
- **Nodemailer**: https://nodemailer.com/
- **Anthropic Claude API**: https://docs.anthropic.com/
- **Vercel Deployment**: https://vercel.com/docs
- **Railway**: https://docs.railway.app/

---

## 📞 Support

If you get stuck:
1. Check the specific README (backend/README.md)
2. Look at the troubleshooting section
3. Check browser console for errors
4. Check backend logs (`npm run dev` output)
5. Verify all .env variables are set
6. Test endpoints with curl/Postman

---

## 🎉 You Have Everything You Need!

All source code is yours to download, customize, deploy, and use. No license restrictions.

**Next steps:**
1. Download all files
2. Follow SETUP_GUIDE.md
3. Customize with your info
4. Deploy to production
5. Share your portfolio!

Good luck! 🚀
