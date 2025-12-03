# VMotiv8 Notes - Quick Start Guide

## 🚀 Running the Application

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Standard Setup (Notes Only)

If you just want to use the notes features:

```bash
cd /Users/rushilchopra/vmotiv8notes/vmotivnotes
npm install
npm run dev
```

Open `http://localhost:3000`

✅ This gives you:
- PDF/Image upload to notes
- Topic-based note generation
- 80+ pre-generated instant notes
- AI-powered practice problems
- Subject browser

---

## 🎨 Running with Multiplayer Whiteboard

To enable real-time collaborative whiteboard:

### Terminal 1: PartyKit Server
```bash
cd /Users/rushilchopra/vmotiv8notes/vmotivnotes
npx partykit dev
```

Keep this running (port 1999)

### Terminal 2: Next.js App
```bash
cd /Users/rushilchopra/vmotiv8notes/vmotivnotes
npm run dev
```

Keep this running (port 3000)

### Test Multiplayer:
1. Open `http://localhost:3000`
2. Click "Shared Whiteboard"
3. Create a room
4. Open another browser/tab to `http://localhost:3000/whiteboard`
5. Join the same room code
6. Draw in one browser - appears instantly in the other! ✨

---

## 📁 Project Structure

```
vmotivnotes/
├── app/                    # Next.js 14 app directory
│   ├── page.tsx           # Homepage
│   ├── generate/          # Note generation
│   ├── whiteboard/        # Collaborative whiteboard
│   ├── categories/        # Subject browser
│   └── api/               # API routes
├── data/                  # Pre-generated notes database
├── party/                 # PartyKit server for multiplayer
├── components/            # Reusable React components
├── lib/                   # Utilities and helpers
└── public/               # Static assets
```

---

## ✨ Features

### 📝 Notes Generation
- Upload PDFs or images → instant structured notes
- Type any topic → AI generates comprehensive notes
- 80+ pre-generated notes load instantly (no AI needed!)
- Beautiful handwritten-style rendering
- Download as PDF or copy text

### 🧠 AI Practice Problems
- Generate custom practice problems for any note
- Multiple difficulty levels
- Detailed step-by-step solutions
- Collapsible answers for self-testing

### 🎨 Multiplayer Whiteboard
- Real-time collaboration (PartyKit)
- Shareable room codes
- Full drawing tools, shapes, text
- Cloud persistence
- VMotiv8 branded interface

### 📚 Subject Browser
- Browse 100+ subjects across 9 categories
- Organized by academic field
- Click any topic for instant notes

---

## 🔑 Environment Variables

Create `.env.local` in the root directory:

```env
# Required for AI features
GEMINI_API_KEY=your_google_gemini_api_key_here

# Optional: File upload (if using UploadThing)
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

Get Gemini API key: https://makersuite.google.com/app/apikey

---

## 📖 Documentation

- **MULTIPLAYER_ENABLED.md** - Full multiplayer setup guide
- **START_HERE.md** - Project overview and directory guide
- **WHITEBOARD_STATUS.md** - Whiteboard feature status

---

## 🐛 Troubleshooting

### "npm not found"
Install Node.js from https://nodejs.org

### "Port 3000 already in use"
Kill the process: `lsof -ti:3000 | xargs kill`

### Whiteboard not syncing
Make sure PartyKit server is running in Terminal 1

### AI features not working
Check that GEMINI_API_KEY is set in `.env.local`

---

## 🎯 Quick Access

- **Homepage:** http://localhost:3000
- **Whiteboard:** http://localhost:3000/whiteboard
- **Subject Browser:** http://localhost:3000/categories/mathematics
- **PartyKit Dashboard:** http://localhost:1999

---

## 🚀 Deployment

### Deploy Next.js (Vercel):
```bash
vercel deploy
```

### Deploy PartyKit:
```bash
npx partykit deploy
```

Then update PARTYKIT_HOST in `app/whiteboard/page.tsx`

---

**Happy coding!** 🎉
