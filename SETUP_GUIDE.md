# 🚀 Complete Portfolio Stack — Setup & Deployment Guide

**Full MERN + AI portfolio with backend contact system, animations, and modern UI.**

---

## 📦 What You're Getting

```
portfolio-stack/
├── frontend/
│   └── portfolio.jsx          ← React app (single file, ready to use)
│
├── backend/
│   ├── server.js              ← Express + MongoDB API
│   ├── package.json           ← Dependencies
│   ├── .env.example           ← Config template
│   ├── config/
│   │   └── db.js              ← MongoDB connection
│   ├── models/
│   │   └── Message.js         ← Mongoose schema
│   ├── routes/
│   │   └── contact.js         ← Contact form API
│   ├── utils/
│   │   └── emailService.js    ← Email notifications
│   └── README.md              ← Backend setup
```

---

## ✨ Features Included

### Frontend (React)
✅ **Photo avatar** — Animated SVG avatar (replace with real photo)  
✅ **Smooth navigation** — All sections clickable via navbar  
✅ **Hero section** — Typewriter effect + animated stats  
✅ **About** — Bio + skills progress bars + experience timeline  
✅ **Projects** — Filterable grid with hover effects  
✅ **Services** — Pricing + process steps  
✅ **Contact form** — Full validation + real backend integration  
✅ **AI chat** — Floating assistant with FAQ fallback  
✅ **Dark/Light mode** — Toggle with smooth transitions  
✅ **Animations** — Scroll-triggered, hover effects, floating elements  
✅ **Mobile responsive** — Works perfectly on all devices  

### Backend (Node.js + Express)
✅ **MongoDB integration** — Message storage  
✅ **Email service** — Owner notification + sender confirmation  
✅ **AI auto-reply** — Claude-powered responses  
✅ **Form validation** — Server-side validation  
✅ **Rate limiting** — Protects against spam (5 msgs/hour)  
✅ **Security** — CORS, helmet, payload limits  
✅ **Health check** — `/api/health` endpoint  
✅ **Admin endpoints** — View/manage messages (protected)  

---

## 🎯 Quick Start (5 Minutes)

### Step 1: Frontend Setup
```bash
# The portfolio.jsx is a standalone React component
# No build step needed — use it directly in any React project:

# Option A: Create React App
npx create-react-app portfolio
cd portfolio/src
# Replace App.js content with portfolio.jsx code
npm start
# Opens http://localhost:3000

# Option B: Vite (faster)
npm create vite@latest portfolio -- --template react
cd portfolio/src
# Replace main.jsx with portfolio.jsx code
npm run dev
# Opens http://localhost:5173

# Option C: Next.js
npx create-next-app@latest portfolio
# Create pages/portfolio.jsx with the code
npm run dev
```

### Step 2: Backend Setup
```bash
# Install dependencies
cd backend
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your values:
# - MONGO_URI (MongoDB Atlas or local)
# - EMAIL_USER / EMAIL_PASS (Gmail App Password)
# - EMAIL_TO (your email)
# - ANTHROPIC_API_KEY (optional, for AI replies)

# Start MongoDB (if local)
mongod --dbpath /data/db

# Run backend
npm run dev
# Server starts on http://localhost:5000
```

### Step 3: Connect Frontend to Backend
In `portfolio.jsx`, line ~701, the contact form already points to:
```javascript
const API_URL = "http://localhost:5000/api/contact";
```

That's it! Forms will now save to MongoDB, send emails, and get AI replies.

---

## 🔧 Configuration Details

### MongoDB
**Option 1: Local**
```bash
brew install mongodb-community  # macOS
# or apt-get install mongodb    # Linux
mongod --dbpath /usr/local/var/mongodb
# Then in .env: MONGO_URI=mongodb://localhost:27017/portfolio_db
```

**Option 2: MongoDB Atlas (Recommended)**
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Click "Connect" → "Drivers" → copy connection string
4. Paste into `.env` as `MONGO_URI`

### Email (Gmail)
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. App Passwords → create one for "Mail"
4. Copy the 16-char password
5. Set `EMAIL_PASS` in `.env`

### Anthropic API (AI Replies)
1. Go to https://console.anthropic.com/
2. Create API key
3. Add to `.env` as `ANTHROPIC_API_KEY`
4. (Optional — form will work without it, using FAQ fallback)

---

## 🎨 Customization

### Replace Avatar Photo
In `portfolio.jsx`, find the `PhotoAvatar` component (line ~104):
```javascript
const PHOTO_URL = null; // Change to your photo URL
// Example: const PHOTO_URL = "https://your-site.com/photo.jpg";
```

### Edit Your Info
Update these data objects at the top:
- `PROJECTS` — your projects
- `SKILLS` — your tech stack
- `EXPERIENCE` — your work history
- `SERVICES` — what you offer
- `FAQ` — common questions

### Colors
Change the color palette in the `C` object:
```javascript
const C = {
  accent: "#00FFD1",      // Primary cyan
  purple: "#7C5CFC",      // Secondary
  pink: "#FF4D8D",        // Accent
  amber: "#FFB830",       // Warning/highlight
  // ... etc
};
```

---

## 📤 Deployment

### Frontend (Vercel — Recommended)
```bash
npm install -g vercel
vercel login
vercel deploy
# Automatic deployments on git push
```

### Frontend (Netlify)
```bash
# Build first
npm run build
# Then drag-drop 'dist' to Netlify
# Or connect GitHub repo
```

### Backend (Railway)
```bash
npm install -g @railway/cli
railway login
railway init
railway up

# Set .env variables in Railway dashboard
# Your backend URL will be: https://api-xyz.railway.app
```

### Update Frontend After Backend Deploy
Change in `portfolio.jsx`:
```javascript
const API_URL = "https://api-xyz.railway.app/api/contact";
```

---

## ✅ Testing

### Test Contact Form
1. Fill out the form with valid data
2. Submit
3. Check:
   - MongoDB has the message: `db.messages.find()`
   - Your email (EMAIL_TO) got a notification
   - Sender got a confirmation
   - AI reply appears in the form

### Test API Directly
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "This is a test message with more than 20 characters"
  }'
```

### Fetch Messages (Admin)
```bash
curl http://localhost:5000/api/contact \
  -H "x-admin-key: YOUR_ADMIN_SECRET"
```

---

## 🐛 Troubleshooting

### "Cannot reach backend"
- [ ] Express server running? `npm run dev` on port 5000
- [ ] CORS enabled? Check `server.js` has correct `CLIENT_URL`
- [ ] Frontend API_URL correct? Should be `http://localhost:5000/api/contact`

### "MongoDB connection failed"
- [ ] MongoDB running? `mongod` or Atlas cluster active
- [ ] MONGO_URI correct in `.env`?
- [ ] Network access allowed? (if Atlas, check IP whitelist)

### "Emails not sending"
- [ ] Gmail App Password set correctly? (not your real password)
- [ ] EMAIL_USER & EMAIL_PASS correct?
- [ ] 2-Step Verification enabled on Gmail account?

### "AI replies not working"
- [ ] ANTHROPIC_API_KEY set in `.env`?
- [ ] API key valid? Test at console.anthropic.com
- [ ] This is optional — form works without it

### Form shows errors but no server error
- [ ] Check browser console for network errors
- [ ] Check backend logs for stack traces
- [ ] Make sure API_URL points to your backend

---

## 📊 Project Structure Best Practices

```
your-portfolio/
├── public/
│   ├── photo.jpg              ← Your real photo
│   └── favicon.ico
├── src/
│   ├── portfolio.jsx          ← Main component
│   ├── App.js                 ← Wrapper
│   └── index.css              ← Global styles (optional)
└── package.json
```

---

## 🚀 Going Live — Checklist

- [ ] Replace portfolio.jsx avatar with real photo
- [ ] Update name, email, links, social handles
- [ ] Update PROJECTS, SKILLS, EXPERIENCE, SERVICES with your info
- [ ] Set up MongoDB (Atlas recommended)
- [ ] Configure Gmail + SMTP
- [ ] Get Anthropic API key (optional)
- [ ] Deploy backend to Railway/Heroku
- [ ] Update API_URL in portfolio.jsx to production backend
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Test contact form end-to-end
- [ ] Check emails arrive correctly
- [ ] Verify dark/light mode works
- [ ] Test on mobile
- [ ] Set up custom domain (optional)

---

## 💡 Pro Tips

**1. Real Photo**
Replace the SVG avatar with a real photo:
```javascript
const PHOTO_URL = "https://your-cdn.com/your-photo.jpg";
```

**2. Analytics**
Add Google Analytics:
```javascript
// In portfolio.jsx App component
useEffect(() => {
  window.gtag?.config('GA_ID', { 'page_path': window.location.pathname });
}, []);
```

**3. SEO**
Add meta tags in HTML:
```html
<meta name="description" content="Full-stack developer specializing in MERN & AI">
<meta property="og:image" content="your-photo.jpg">
```

**4. Custom Domain**
Use Namecheap/GoDaddy → point DNS to Vercel/Netlify

**5. Email Forwarding**
Set up catch-all email so multiple emails go to one inbox

---

## 📞 Support Resources

- **React Docs**: https://react.dev
- **Express Guide**: https://expressjs.com
- **MongoDB**: https://docs.mongodb.com
- **Anthropic API**: https://docs.anthropic.com
- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs

---

## 📝 License

This portfolio is yours to use, customize, and deploy. No restrictions!

---

## 🎉 You're Ready!

Your complete portfolio stack is ready to go. Download all files, follow the setup steps, and you'll have a production-ready portfolio running in minutes.

**Questions?** Check the backend README.md for more detailed backend info.

Good luck! 🚀
