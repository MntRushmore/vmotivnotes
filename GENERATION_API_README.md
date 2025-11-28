# Generation API Integration

This document describes the implementation of the Claude Opus summarization and Nano Banana handwriting PDF rendering APIs.

## Overview

The generation pipeline consists of three main steps:
1. **Text Extraction** - Extract text from uploaded files (PDF or images)
2. **Summarization** - Generate summaries using Claude Opus with different educational modes
3. **Handwriting Rendering** - Convert summarized text to handwritten PDF format

## API Endpoints

### 1. `/api/summarize` (POST)

**Runtime:** Edge  
**Max Duration:** 300 seconds

Generates summaries using Claude Opus model.

**Request Body:**
```json
{
  "text": "string - The text to summarize",
  "mode": "9th-grade" | "SAT" - Summary mode",
  "generationId": "string - Optional ID for tracking"
}
```

**Response:**
```json
{
  "summary": "string - Main summary",
  "keyPoints": ["array", "of", "key", "points"],
  "interactiveNotes": ["array", "of", "interactive", "notes"],
  "metadata": {
    "mode": "9th-grade" | "SAT",
    "wordCount": "number",
    "processingTime": "number (ms)"
  }
}
```

### 2. `/api/handwriting` (POST)

**Runtime:** Node.js  
**Max Duration:** 300 seconds

Generates handwritten PDF using Nano Banana API.

**Request Body:**
```json
{
  "text": "string - The text to render",
  "config": {
    "model": "string - Model name (default: handwriting-neat-v2)",
    "parameters": {
      "fontSize": "number (default: 14)",
      "lineHeight": "number (default: 1.5)",
      "pageMargin": "number (default: 40)",
      "handwritingStyle": "cursive" | "print" | "mixed (default: mixed)"
    }
  },
  "generationId": "string - Optional ID for tracking"
}
```

**Response:**
```json
{
  "pdfUrl": "string - URL to the generated PDF",
  "metadata": {
    "pageCount": "number",
    "renderingTime": "number (ms)",
    "model": "string"
  }
}
```

### 3. `/api/generate` (POST)

**Runtime:** Node.js  
**Max Duration:** 600 seconds

Orchestrates the complete generation pipeline.

**Request Body:**
```json
{
  "fileId": "string - ID of uploaded file",
  "fileName": "string - Name of the file",
  "summaryMode": "9th-grade" | "SAT",
  "extractedText": "string - Optional pre-extracted text"
}
```

**Response:**
```json
{
  "id": "string - Generation ID",
  "status": {
    "id": "string",
    "status": "extracting" | "summarizing" | "rendering" | "complete" | "error",
    "progress": "number (0-100)",
    "currentStep": "string",
    "createdAt": "ISO string",
    "updatedAt": "ISO string"
  },
  "extractedText": "string",
  "summary": { ... },
  "handwriting": { ... }
}
```

### 4. `/api/generate` (GET)

Check generation status.

**Query Parameters:**
- `id` - Generation ID to check

**Response:**
```json
{
  "status": { ... }
}
```

## Error Handling

All endpoints return structured error responses:

```json
{
  "error": "string - Error message",
  "code": "string - Error code",
  "step": "extraction" | "summarization" | "handwriting" | "orchestration",
  "retryable": "boolean - Whether the operation can be retried"
}
```

### Common Error Codes

- `MISSING_API_KEY` - Required API key not configured
- `RATE_LIMIT` - API rate limit exceeded
- `TIMEOUT` - Operation timed out
- `TOKEN_LIMIT` - Text too long for processing
- `INVALID_PDF` - Invalid PDF format received
- `UNSUPPORTED_FILE_TYPE` - File type not supported
- `INSUFFICIENT_TEXT` - Extracted text too short

## Environment Variables

Required environment variables:

```bash
# Anthropic API for Claude Opus
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Nano Banana API for handwriting
NANO_BANANA_API_KEY=your_nano_banana_api_key_here

# Next.js configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Generation Service

The `GenerationService` class provides:

- **State Management** - Tracks generation progress
- **Retry Logic** - Exponential backoff with configurable attempts
- **Timeout Handling** - Prevents hanging operations
- **PDF Validation** - Ensures valid PDF format
- **Cleanup** - Removes old generation records

## Claude Prompts

Two distinct prompt configurations:

### 9th-Grade Mode
- Friendly, approachable language
- Real-world analogies
- Encouraging tone
- Memory tips and tricks
- "Why This Matters" sections

### SAT Mode
- Precise mathematical terminology
- Test-taking strategies
- Common question patterns
- Time-saving techniques
- Practice problems

## Testing

Use the provided test script `test-generation.js` to verify the API integration:

```bash
# Ensure environment variables are set in .env.local
# Start the development server
npm run dev

# In another terminal, run the test
node test-generation.js
```

## Implementation Notes

1. **Edge vs Node Runtime**
   - Claude API uses edge runtime for better performance
   - Handwriting generation uses Node.js for PDF handling

2. **Streaming Support**
   - Summarization endpoint supports streaming for long texts
   - Configure by adding `stream: true` to Claude API call

3. **File Size Limits**
   - UploadThing: 32MB max
   - Claude: Context window limits apply
   - Nano Banana: Varies by model

4. **Security**
   - All API keys stored in environment variables
   - Input validation on all endpoints
   - Error messages sanitized for production

## Future Enhancements

1. Add more summary modes (elementary, college, professional)
2. Support for additional handwriting styles
3. Batch processing for multiple files
4. WebSocket support for real-time progress updates
5. Caching for repeated requests
6. Custom prompt templates