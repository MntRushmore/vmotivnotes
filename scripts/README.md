# SAT Master Deck Build Script

## Overview
This script automates the generation of SAT preparation PDFs from a JSON file of topics.

## Usage

### Prerequisites
- Node.js and npm installed
- ts-node installed (`npm install -g ts-node` or use via npx)

### Running the Script

```bash
# From the project root
npx ts-node scripts/build-sat.ts

# Or if ts-node is installed globally
ts-node scripts/build-sat.ts
```

### Configuration

The script reads topics from `/data/sat-topics.json`. The format should be:

```json
[
  {
    "topic": "Quadratic Equations",
    "category": "Algebra",
    "description": "Solving quadratic equations..."
  }
]
```

### Output

Generated PDFs are saved to `/public/generated/sat-deck/`

### Estimated Runtime

- 30-60 minutes for 500 topics (approximately 0.5-1 second per topic)
- Progress is logged in real-time
- Errors are captured and reported at the end

### Exit Codes

- `0`: Success (all topics processed successfully)
- `1`: Partial failure (some topics failed)

## Example Output

```
========================================
SAT Master Deck Builder
========================================

✓ Created output directory: /public/generated/sat-deck
✓ Loaded 30 topics from /data/sat-topics.json

Starting generation of 30 PDFs...
Estimated time: 1 minutes

[1/30] (3.3%) Processing: Quadratic Equations
[2/30] (6.7%) Processing: Linear Functions
...

========================================
Build Complete!
========================================
Total topics: 30
✓ Success: 28
✗ Failed: 2
Duration: 0m 47s
Output directory: /public/generated/sat-deck

Success rate: 93.3%
========================================
```
