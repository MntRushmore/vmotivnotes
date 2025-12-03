# 🚀 How to Run Multiplayer Whiteboard

## Quick Start (Two Terminals)

### Terminal 1: Start PartyKit Server

```bash
cd /Users/rushilchopra/vmotiv8notes/vmotivnotes
npx partykit dev
```

**Expected output:**
```
✨ PartyKit v0.0.111
🎈 Running PartyKit server...
Server: http://127.0.0.1:1999
```

**Keep this terminal running!**

---

### Terminal 2: Start Next.js App

```bash
cd /Users/rushilchopra/vmotiv8notes/vmotivnotes
npm run dev
```

**Expected output:**
```
> vmotiv-notes@0.1.0 dev
> next dev

  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Network:      http://YOUR_IP:3000

✓ Ready in 2.1s
```

**Keep this terminal running too!**

---

## Test Multiplayer

### Step 1: Open Browser 1
1. Go to `http://localhost:3000`
2. Click **"Shared Whiteboard"** (blue card)
3. Click **"Create Collaborative Room"**
4. **Note the room code** (e.g., "ABC123")

### Step 2: Open Browser 2
1. Open a **new incognito window** or **different browser**
2. Go to `http://localhost:3000/whiteboard`
3. Enter the room code from Step 1 (e.g., "ABC123")
4. Click **"Join"**

### Step 3: Test Real-Time Sync
1. **Draw in Browser 1** → Should appear **instantly in Browser 2** ✨
2. **Draw in Browser 2** → Should appear **instantly in Browser 1** ✨
3. Both users can draw **simultaneously** without conflicts!

**If you see drawings sync instantly, IT WORKS!** 🎉

---

## Troubleshooting

### ❌ Error: "Missing entry point"
**Already fixed!** The partykit.json has been updated.
Try running: `npx partykit dev` again

### ❌ Error: "Cannot find module 'y-partykit'"
**Solution:**
```bash
npm install
```

### ❌ Error: "Port 1999 already in use"
**Solution:**
```bash
# Kill process on port 1999
lsof -ti:1999 | xargs kill

# Then restart PartyKit
npx partykit dev
```

### ❌ Error: "WebSocket connection failed"
**Check:**
1. Is PartyKit server running in Terminal 1?
2. Check Terminal 1 for errors
3. Try refreshing the browser

### ❌ Drawings not syncing between browsers
**Check:**
1. Are both browsers in the **same room code**?
2. Open browser console (F12) and check for errors
3. Make sure PartyKit is running
4. Try clearing browser cache and rejoining

### ❌ Error: "Connection refused localhost:1999"
**Solution:**
1. Make sure you started PartyKit server first
2. Wait 5 seconds for server to fully start
3. Check firewall isn't blocking port 1999

---

## What Each Terminal Does

### Terminal 1 (PartyKit Server)
- **Purpose:** Real-time WebSocket server for syncing
- **Port:** 1999
- **Technology:** PartyKit + Yjs
- **What it does:**
  - Manages room connections
  - Syncs drawings between users
  - Stores whiteboard data
  - Handles conflicts using CRDT

### Terminal 2 (Next.js App)
- **Purpose:** Web application frontend
- **Port:** 3000
- **Technology:** Next.js + React + tldraw
- **What it does:**
  - Serves the website
  - Renders the whiteboard UI
  - Connects to PartyKit for sync

---

## Visual Guide

```
┌─────────────────────────────────────────────────┐
│          TERMINAL 1 (PartyKit)                  │
│  $ npx partykit dev                             │
│  ✨ Server running on http://127.0.0.1:1999    │
│  [Keep running...]                              │
└─────────────────────────────────────────────────┘
                      ↓
                  Port 1999
                  (WebSocket)
                      ↓
┌─────────────────────────────────────────────────┐
│          TERMINAL 2 (Next.js)                   │
│  $ npm run dev                                  │
│  ▲ Next.js ready on http://localhost:3000      │
│  [Keep running...]                              │
└─────────────────────────────────────────────────┘
                      ↓
                  Port 3000
                  (Web App)
                      ↓
              Your Browser
```

---

## One-Command Alternative (tmux)

If you have `tmux` installed, you can run both in one terminal:

```bash
# Start both servers in split panes
tmux new-session -s whiteboard \; \
  send-keys 'cd /Users/rushilchopra/vmotiv8notes/vmotivnotes && npx partykit dev' C-m \; \
  split-window -v \; \
  send-keys 'cd /Users/rushilchopra/vmotiv8notes/vmotivnotes && npm run dev' C-m
```

To exit: Press `Ctrl+B` then type `:kill-session`

---

## Success Indicators

### ✅ PartyKit is working when you see:
- Terminal shows "Running PartyKit server"
- No error messages
- Port 1999 is listening

### ✅ Next.js is working when you see:
- Terminal shows "Ready in X.Xs"
- No compilation errors
- Can open http://localhost:3000

### ✅ Multiplayer is working when:
- Green "Live" badge shows in whiteboard
- Drawings appear in other browser instantly
- Both users can draw simultaneously
- No WebSocket errors in browser console

---

## Stop the Servers

### To stop PartyKit (Terminal 1):
Press `Ctrl+C`

### To stop Next.js (Terminal 2):
Press `Ctrl+C`

---

## Need Help?

1. Check browser console (F12) for JavaScript errors
2. Check Terminal 1 for PartyKit errors
3. Check Terminal 2 for Next.js errors
4. Read MULTIPLAYER_ENABLED.md for detailed setup
5. Read MULTIPLAYER_COMPLETE.md for full documentation

---

**Ready to test?** Open two terminals and follow the steps above! 🚀
