#!/bin/bash

echo "🎈 Starting PartyKit Server for VMotiv8 Whiteboard..."
echo ""
echo "Make sure you're in the vmotivnotes directory!"
echo "Current directory: $(pwd)"
echo ""

# Check if we're in the right directory
if [ ! -f "partykit.json" ]; then
    echo "❌ Error: partykit.json not found!"
    echo "Please run this from: /Users/rushilchopra/vmotiv8notes/vmotivnotes"
    exit 1
fi

# Check if party directory exists
if [ ! -d "party" ]; then
    echo "❌ Error: party/ directory not found!"
    exit 1
fi

echo "✅ Found partykit.json and party/ directory"
echo ""
echo "Starting PartyKit on port 1999..."
echo ""

npx partykit dev
