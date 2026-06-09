# ⚡ Quick Start Reference

## 📥 Download Instructions
All files are ready in the outputs folder. Download:
- `portfolio.jsx` — Frontend (React)
- `backend/` folder — Complete Node.js backend
- `SETUP_GUIDE.md` — Full setup walkthrough
- `FILE_INDEX.md` — Complete file descriptions

---

## 🚀 Start in 5 Minutes

### 1️⃣ Backend Setup
```bash
cd backend
npm install
cp .env.example .env

# Edit .env with:
# MONGO_URI=mongodb://localhost:27017/portfolio_db
# EMAIL_USER=your_gmail@gmail.com
# EMAIL_PASS=your_16_char_gmail_app_password
# EMAIL_TO=your_email@example.com
# ANTHROPIC_API_KEY=your_claude_key (optional)

npm run dev
# ✅ Server running on http://localhost:5000
```

### 2️⃣ Frontend Setup
```bash
# Option A: Create React App
npx create-react-app portfolio
cd portfolio/src
# Replace App.js with portfolio.jsx code
npm start
# ✅ Opens http://localhost:3000

# Option B: Vite
npm create vite@latest portfolio -- --template react
cd portfolio/src
# Replace main.jsx with portfolio.jsx code
npm run dev
# ✅ Opens http://localhost:5173
```

### 3️⃣ Test It
- Open http://localhost:3000 (or 5173)
- Fill contact form → Submit
- Check your email for notification + AI reply
- Check MongoDB for saved message

**That's it!** 🎉

---

## 📝 What to Customize

**In `portfolio.jsx`, update:**
- Line ~24: `PROJECTS` array — Your projects
- Line ~64: `SKILLS` array — Your tech stack
- Line ~77: `EXPERIENCE` array — Your work history
- Line ~92: `SERVICES` array — What you offer
- Line ~104: `PhotoAvatar` — Add real photo URL
- Line ~107: `COLORS` — Change color scheme
- Contact info — Links, email, social handles
- Navigation links — If you change section names

---

## 🌐 Deploy Live

### Frontend (Vercel)
```bash
npm install -g vercel
vercel deploy
# Automatic on git push
```

### Backend (Railway)
```bash
npm install -g @railway/cli
railway login
railway up
# Get your API URL: https://api-xyz.railway.app
```

### Connect Them
Change in `portfolio.jsx`:
```javascript
const API_URL = "https://api-xyz.railway.app/api/contact";
```

---

## 🎯 Key Features

✅ Animated photo avatar (replace SVG with real photo)  
✅ Smooth scroll navigation — all pages linked  
✅ Typewriter effect in hero  
✅ Animated skill bars  
✅ Experience timeline  
✅ Filterable project grid  
✅ Service pricing cards  
✅ Contact form → MongoDB storage  
✅ AI-powered auto-replies  
✅ Floating AI chat assistant  
✅ Dark/light mode toggle  
✅ Mobile fully responsive  
✅ 50+ smooth animations  

---

## 📊 File Count
- **Frontend**: 1 file (portfolio.jsx)
- **Backend**: 6 files + .env
- **Docs**: 3 guides
- **Total**: 10 files

---

## 🔧 Environment Variables
```env
# Backend .env must have:
PORT=5000
MONGO_URI=your_mongodb_url
EMAIL_USER=your_gmail
EMAIL_PASS=gmail_app_password
EMAIL_TO=your_email
CLIENT_URL=http://localhost:3000
ANTHROPIC_API_KEY=optional_claude_key
ADMIN_SECRET=some_secret
```

---

## 🐛 If Something Breaks

1. **Backend not connecting?**
   - Is MongoDB running? (`mongod` command)
   - Is MONGO_URI correct in .env?
   - Check terminal for error messages

2. **Form not saving?**
   - Is backend running on port 5000?
   - Check `API_URL` in portfolio.jsx
   - Check browser console for errors

3. **Emails not sending?**
   - Gmail App Password correct? (not regular password)
   - 2-Step Verification enabled?
   - EMAIL_USER and EMAIL_PASS match?

4. **AI replies not working?**
   - ANTHROPIC_API_KEY set? (optional, falls back to FAQ)
   - API key valid at console.anthropic.com?

---

## 💡 Pro Tips

1. **Real Photo**: Update `PhotoAvatar` component's `PHOTO_URL`
2. **Custom Domain**: Use Vercel + GoDaddy DNS
3. **More Projects**: Edit `PROJECTS` array
4. **Different Colors**: Change `C` object colors
5. **Faster Emails**: Get Gmail App Password in 60 seconds
6. **Monitor Messages**: Check backend logs with `npm run dev`

---

## 📚 Full Docs

- **SETUP_GUIDE.md** — Complete setup, config, deploy guide
- **FILE_INDEX.md** — What each file does
- **backend/README.md** — Backend-specific info

---

## ✨ What You're Getting

| Part | Tech | Purpose |
|------|------|---------|
| Frontend | React | Interactive portfolio site |
| Backend | Express | Contact form API |
| Database | MongoDB | Store messages |
| Email | Nodemailer | Send notifications |
| AI | Claude API | Auto-reply messages |
| Auth | Secret key | Admin endpoints |
| Deploy | Vercel/Railway | Go live |

---

## 🎬 Next Steps

1. ✅ Download all files
2. ✅ Follow this quick start
3. ✅ Customize with your info
4. ✅ Test locally
5. ✅ Deploy to production
6. ✅ Share your portfolio!

---

## 🆘 Need Help?

1. Read SETUP_GUIDE.md — Most answers there
2. Check FILE_INDEX.md — Understand each file
3. Check backend/README.md — Backend details
4. Search error message in browser console
5. Verify all .env variables set correctly

---

**You have everything. You're ready to build! 🚀**
