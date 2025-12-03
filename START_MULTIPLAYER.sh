#!/bin/bash

# VMotiv8 Multiplayer Whiteboard Startup Script
# This script helps you start both servers correctly

echo "🎨 VMotiv8 Multiplayer Whiteboard"
echo "=================================="
echo ""

# Check current directory
CURRENT_DIR=$(pwd)
EXPECTED_DIR="/Users/rushilchopra/vmotiv8notes/vmotivnotes"

if [ "$CURRENT_DIR" != "$EXPECTED_DIR" ]; then
    echo "⚠️  You're in the wrong directory!"
    echo ""
    echo "Current:  $CURRENT_DIR"
    echo "Expected: $EXPECTED_DIR"
    echo ""
    echo "Changing to correct directory..."
    cd "$EXPECTED_DIR" || exit 1
    echo "✅ Changed to: $(pwd)"
    echo ""
fi

# Check if files exist
if [ ! -f "partykit.json" ]; then
    echo "❌ Error: partykit.json not found!"
    echo "Make sure you're in the vmotivnotes directory."
    exit 1
fi

if [ ! -d "party" ]; then
    echo "❌ Error: party/ directory not found!"
    exit 1
fi

echo "✅ All files found!"
echo ""
echo "📋 To start multiplayer whiteboard, open TWO terminals:"
echo ""
echo "TERMINAL 1 (PartyKit Server):"
echo "  cd /Users/rushilchopra/vmotiv8notes/vmotivnotes"
echo "  npx partykit dev"
echo ""
echo "TERMINAL 2 (Next.js App):"
echo "  cd /Users/rushilchopra/vmotiv8notes/vmotivnotes"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Do you want to start PartyKit now? (y/n)"
read -r response

if [ "$response" = "y" ] || [ "$response" = "Y" ]; then
    echo ""
    echo "🎈 Starting PartyKit Server..."
    echo ""
    npx partykit dev
else
    echo ""
    echo "Okay! Run the commands above manually."
    echo ""
fi
