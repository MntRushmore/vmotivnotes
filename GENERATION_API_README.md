# Summarization & Handwriting API Integration

## Overview

This implementation integrates Claude Opus for AI-powered summarization and Nano Banana for handwriting PDF rendering, creating a seamless pipeline for converting uploaded PDFs into summarized, handwritten notes.

## Architecture

### API Endpoints

#### 1. `/api/summarize` (POST)
Accepts extracted text and generates intelligent summaries using Claude Opus.

**Request:**
```json
{
  "text": "Extracted PDF text content",
  "mode": "9th-grade" | "SAT"
}
```

**Response:**
```json
{
  "summary": "Main summary text",
  "keyPoints": ["Point 1", "Point 2", "Point 3"],
  "interactiveNotes": ["Note 1", "Note 2"],
  "metadata": {
    "mode": "9th-grade",
    "wordCount": 250,
    "processingTime": 1500
  }
}
```

#### 2. `/api/handwriting` (POST)
Converts summarized text into handwritten PDF format.

**Request:**
```json
{
  "text": "Summary text to render",
  "style": "cursive" | "print" | "mixed"
}
```

**Response:**
```json
{
  "pdfUrl": "https://url-to-generated-pdf",
  "metadata": {
    "pageCount": 3,
    "renderingTime": 2000,
    "model": "handwriting-v2"
  }
}
```

#### 3. `/api/generate` (POST)
Orchestrates the complete generation pipeline.

**Request:**
```json
{
  "fileId": "uploaded-file-id",
  "fileName": "document.pdf",
  "summaryMode": "9th-grade" | "SAT"
}
```

**Response:**
```json
{
  "generationId": "uuid",
  "status": "extracting" | "summarizing" | "rendering" | "complete" | "error"
}
```

### Components

#### GenerationService (`/lib/generation-service.ts`)
Manages the state and orchestration of the generation pipeline:
- Tracks generation progress
- Implements retry logic with exponential backoff
- Handles error recovery
- Provides status updates

#### Claude Prompts (`/lib/claude-prompts.ts`)
Contains optimized system prompts for different summarization modes:
- 9th Grade Mode: Friendly, accessible explanations
- SAT Mode: Technical, detailed explanations
- Interactive Notes: Engaging, educational content

### Type Definitions

#### GenerationRequest
```typescript
interface GenerationRequest {
  fileId: string
  fileName: string
  summaryMode: '9th-grade' | 'SAT'
  extractedText?: string
}
```

#### GenerationStatus
```typescript
interface GenerationStatus {
  id: string
  status: 'extracting' | 'summarizing' | 'rendering' | 'complete' | 'error'
  progress: number
  currentStep: string
  error?: GenerationError
  createdAt: Date
  updatedAt: Date
}
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Anthropic Claude API
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Nano Banana Handwriting API
NANO_BANANA_API_KEY=your_nano_banana_api_key_here
NANO_BANANA_API_URL=https://api.nanobanana.com/v1

# UploadThing (already configured)
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Optional: Google Gemini (fallback OCR)
GEMINI_API_KEY=your_gemini_api_key_here
```

## Error Handling

The implementation includes comprehensive error handling:

1. **Retry Logic**: Automatic retries with exponential backoff for transient failures
2. **Error Classification**: Errors are classified by type and retryability
3. **Graceful Degradation**: Fallback options when primary services are unavailable
4. **User Feedback**: Clear error messages and recovery options

## Features

### Real-time Progress Tracking
- WebSocket-like polling for generation status
- Progress indicators for each step
- Estimated time remaining

### Multiple Summary Modes
- **9th Grade**: Simplified explanations with analogies
- **SAT**: Technical explanations with test-taking strategies

### Handwriting Styles
- Cursive: Natural handwritten flow
- Print: Clear, printed text
- Mixed: Combination for visual variety

### PDF Management
- Automatic thumbnail generation
- Metadata extraction
- Library organization with search and filtering

## Usage Example

```typescript
// Start generation
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fileId: 'uploaded-file-id',
    fileName: 'math-notes.pdf',
    summaryMode: '9th-grade'
  })
})

const { generationId } = await response.json()

// Monitor progress
const status = await fetch(`/api/generate/status?id=${generationId}`)
const { status: currentStatus, progress } = await status.json()

// Get result when complete
if (currentStatus === 'complete') {
  const result = await fetch(`/api/generate/result?id=${generationId}`)
  const { summary, handwriting } = await result.json()
}
```

## Performance Optimizations

1. **Streaming Responses**: Large texts are processed in streams
2. **Caching**: Generated content is cached for quick retrieval
3. **Background Processing**: Heavy operations run asynchronously
4. **Resource Limits**: Timeouts and size limits prevent resource exhaustion

## Security Considerations

1. **API Key Security**: Keys are server-side only
2. **Input Validation**: All inputs are sanitized and validated
3. **Rate Limiting**: Built-in protection against API abuse
4. **File Security**: Uploaded files are scanned and isolated

## Monitoring & Logging

- Structured logging for debugging
- Performance metrics tracking
- Error rate monitoring
- API usage analytics

## Future Enhancements

1. **Batch Processing**: Generate multiple PDFs simultaneously
2. **Custom Templates**: User-defined handwriting styles
3. **Collaboration**: Share and edit generated notes
4. **Export Options**: Multiple format support (PDF, DOCX, HTML)
5. **AI Tutor Integration**: Interactive Q&A based on generated content