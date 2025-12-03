# How to Run Your VMotiv8 Notes App

## IMPORTANT: You're in the wrong directory!

You have two separate projects in `/Users/rushilchopra/vmotiv8notes/`:
1. **Parent directory** - A tldraw multiplayer template (Vite-based)
2. **vmotivnotes/** - Your actual VMotiv8 Notes app (Next.js)

## Steps to Run Correctly:

### 1. Navigate to the correct directory
```bash
cd /Users/rushilchopra/vmotiv8notes/vmotivnotes
```

### 2. Install tldraw (first time only)
```bash
npm install tldraw
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Open your browser
Navigate to: **http://localhost:3000** (NOT localhost:5173)

## What You'll See:

✅ **Homepage** at `http://localhost:3000` with three main options:
   - Upload File
   - Enter Topic
   - **Shared Whiteboard** (the blue card)

✅ **Browse by Category** section with all subjects

✅ **Whiteboard** accessible by clicking the blue "Shared Whiteboard" card

## If You See Errors:

### Error: "command not found: npm"
- Make sure npm is installed: `brew install node`

### Error: "Cannot find module 'tldraw'"
- Run: `npm install tldraw` from the `vmotivnotes` directory

### Error: Vite running on port 5173
- You're in the wrong directory! Go back to step 1

## Current Features:

✨ **80+ Pre-Generated Notes** across all subjects
✨ **Instant Loading** - no AI generation needed for popular topics
✨ **AI-Powered Practice Problems** - generate custom problems for any note
✨ **Collaborative Whiteboard** - real-time drawing with room codes
✨ **Beautiful UI** - enhanced styling and formatting

## Project Structure:

```
/Users/rushilchopra/vmotiv8notes/
├── vmotivnotes/          ← YOUR APP IS HERE!
│   ├── app/              ← Next.js pages
│   ├── data/             ← Pre-generated notes
│   ├── package.json      ← Dependencies
│   └── ...
└── (parent files)        ← tldraw template (ignore this)
```

---

**Need help?** Make sure you're always running commands from `/Users/rushilchopra/vmotiv8notes/vmotivnotes/`
