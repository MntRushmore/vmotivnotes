# 🚀 Start Multiplayer Whiteboard

## ⚠️ IMPORTANT: You Must Be In The Correct Directory!

The error you're seeing happens because you need to run PartyKit from the **vmotivnotes** directory, not the parent directory.

---

## ✅ **THE FIX (Do This!)**

### Terminal 1:
```bash
cd /Users/rushilchopra/vmotiv8notes/vmotivnotes
npx partykit dev
```

### Terminal 2:
```bash
cd /Users/rushilchopra/vmotiv8notes/vmotivnotes
npm run dev
```

**That's it!** The key is the `cd` command first.

---

## 🎯 Or Use The Helper Script

I created a script that checks you're in the right directory:

```bash
cd /Users/rushilchopra/vmotiv8notes/vmotivnotes
./START_MULTIPLAYER.sh
```

---

## 🐛 Why The Error Happened

You were running:
```bash
rushilchopra@Rushils-MacBook-Air vmotiv8notes %
```

But you need to be here:
```bash
rushilchopra@Rushils-MacBook-Air vmotivnotes %
```

Notice the difference?
- ❌ `/vmotiv8notes` (parent directory)
- ✅ `/vmotiv8notes/vmotivnotes` (your app directory)

---

## 📁 Directory Structure

```
/Users/rushilchopra/vmotiv8notes/        ← You are here (WRONG!)
├── vmotivnotes/                         ← You need to be here!
│   ├── party/
│   │   └── whiteboard.ts
│   ├── partykit.json
│   ├── package.json
│   ├── START_MULTIPLAYER.sh             ← Use this!
│   └── ...
└── (other files from tldraw template)
```

---

## ✅ Quick Test

Run these commands **one by one**:

```bash
# Step 1: Go to the right directory
cd /Users/rushilchopra/vmotiv8notes/vmotivnotes

# Step 2: Verify you're in the right place
ls partykit.json
# Should show: partykit.json

# Step 3: Start PartyKit
npx partykit dev
```

If Step 2 shows `partykit.json`, you're good! If it says "No such file", you're in the wrong directory.

---

## 🎉 Once It's Running

**Terminal 1:** Will show
```
✨ PartyKit v0.0.111
🎈 Running PartyKit server on http://127.0.0.1:1999
```

**Terminal 2:** Open new terminal and run:
```bash
cd /Users/rushilchopra/vmotiv8notes/vmotivnotes
npm run dev
```

**Browser:** Open `http://localhost:3000`

---

## 🧪 Test Multiplayer

1. Click "Shared Whiteboard"
2. Create a room
3. Open incognito/another browser
4. Join the same room
5. **Draw → See it sync!** ✨

---

## 💡 Pro Tip

Add an alias to your shell:

```bash
echo 'alias vmotiv8="cd /Users/rushilchopra/vmotiv8notes/vmotivnotes"' >> ~/.zshrc
source ~/.zshrc
```

Then just type:
```bash
vmotiv8
npx partykit dev
```

---

**Need help?** Make sure you're in `/vmotiv8notes/vmotivnotes` (with TWO "vmotiv" directories)!
