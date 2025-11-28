# PDF Upload & Text Extraction Feature

This document describes the implementation of the PDF upload and text extraction pipeline with OCR capabilities.

## Overview

The feature allows users to upload PDF documents and images, extract text from them using multiple extraction methods (pdf-parse, Tesseract.js, and Gemini Vision API as fallback), and process the extracted content.

## Architecture

### File Structure

```
app/
├── api/
│   ├── extract/
│   │   └── route.ts          # PDF text extraction endpoint
│   ├── ocr/
│   │   └── route.ts          # Image OCR endpoint
│   └── uploadthing/
│       ├── core.ts           # UploadThing router configuration
│       └── route.ts          # UploadThing API route
├── upload/
│   └── page.tsx              # Upload UI page
└── generation/
    └── page.tsx              # Post-upload generation page

lib/
├── uploadthing.ts            # UploadThing React hooks
├── extraction-utils.ts       # File validation & utility functions
└── utils.ts                  # General utilities (cn function)

types/
└── index.ts                  # TypeScript interfaces

components/
├── ClientToaster.tsx         # Client-side toast notifications
└── ui/
    ├── toaster.tsx          # Toast component
    ├── progress.tsx         # Progress bar component
    └── ...                  # Other shadcn/ui components
```

## Features

### 1. UploadThing Integration

- **Location**: `app/api/uploadthing/`
- **Configuration**:
  - PDF uploads: Max 32MB
  - Image uploads: Max 32MB (PNG, JPG, JPEG, WebP)
  - File type restrictions enforced
- **Environment Variables Required**:
  - `UPLOADTHING_SECRET`
  - `UPLOADTHING_APP_ID`

### 2. PDF Text Extraction (`/api/extract`)

- **Primary Method**: pdf-parse
  - Fast, reliable text extraction from PDFs
  - Returns page count and full text content
  
- **Fallback Method**: Tesseract.js OCR
  - Activates when pdf-parse fails or returns empty text
  - Handles scanned PDFs and image-based documents
  - Returns confidence score

- **Features**:
  - Automatic retry logic (up to 3 attempts with exponential backoff)
  - Comprehensive error handling for corrupted/encrypted PDFs
  - File size validation (50MB limit)
  - MIME type validation

### 3. Image OCR (`/api/ocr`)

- **Primary Method**: Tesseract.js
  - Open-source OCR engine
  - Supports multiple image formats
  - Returns confidence scores

- **Fallback Method**: Google Gemini Flash Vision API
  - Cloud-based vision AI
  - High accuracy for complex images
  - Requires `GEMINI_API_KEY` environment variable

- **Features**:
  - Image orientation detection
  - Automatic retry logic
  - Confidence score reporting
  - Error handling for unsupported formats

### 4. Upload UI (`/app/upload/page.tsx`)

- **Drag & Drop Zone**:
  - Visual feedback on drag events
  - File type and size validation
  - Preview of selected files

- **Upload States**:
  - `idle`: Ready to accept files
  - `uploading`: File being uploaded to UploadThing
  - `processing`: Text being extracted
  - `success`: Extraction complete
  - `error`: Failed with error message

- **Progress Tracking**:
  - Upload progress bar
  - Processing status indicators
  - Success/error notifications via toast

- **Error Handling**:
  - User-friendly error messages
  - File size limit warnings
  - Invalid file type alerts
  - Extraction failure notifications

### 5. Utility Functions (`lib/extraction-utils.ts`)

- `validateFileSize(fileSize: number)`: Checks if file is under 50MB limit
- `validateMimeType(mimeType: string, allowedTypes: string[])`: Validates file MIME type
- `validatePdfFile(fileSize: number, mimeType: string)`: Combined PDF validation
- `validateImageFile(fileSize: number, mimeType: string)`: Combined image validation
- `retryWithBackoff<T>(fn: () => Promise<T>, maxRetries?: number, initialDelay?: number)`: Retry logic with exponential backoff
- `createFileMetadata(...)`: Creates structured file metadata objects
- `sanitizeFilename(filename: string)`: Sanitizes filenames for safe storage
- `getFileExtension(filename: string)`: Extracts file extension

## TypeScript Interfaces

### ExtractionResult
```typescript
{
  text: string
  metadata: FileMetadata
  confidence?: number
  error?: ExtractionError
}
```

### FileMetadata
```typescript
{
  fileName: string
  fileSize: number
  mimeType: string
  pageCount?: number
  uploadedAt: Date
  extractionMethod?: 'pdf-parse' | 'tesseract' | 'gemini-vision'
}
```

### ExtractionError
```typescript
{
  code: string
  message: string
  details?: string
}
```

## Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Required for upload functionality
UPLOADTHING_SECRET=your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here

# Optional - for Gemini Vision API fallback
GEMINI_API_KEY=your_gemini_api_key_here

# Application settings
NEXT_PUBLIC_APP_NAME=VMotiv Notes
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Next.js Configuration

The `next.config.js` has been configured with:
- Server Actions with 50MB body size limit
- React Strict Mode enabled
- SWC minification enabled

## API Endpoints

### POST /api/extract

Extracts text from PDF files.

**Request**:
- Content-Type: `multipart/form-data`
- Body: Form data with `file` field containing PDF

**Response**:
```json
{
  "text": "extracted text content...",
  "metadata": {
    "fileName": "document.pdf",
    "fileSize": 1024000,
    "mimeType": "application/pdf",
    "pageCount": 10,
    "uploadedAt": "2024-01-01T00:00:00.000Z",
    "extractionMethod": "pdf-parse"
  },
  "confidence": 1.0
}
```

**Error Response**:
```json
{
  "error": {
    "code": "EXTRACTION_FAILED",
    "message": "Could not extract text from PDF",
    "details": "..."
  }
}
```

### POST /api/ocr

Performs OCR on image files.

**Request**:
- Content-Type: `multipart/form-data`
- Body: Form data with `file` field containing image (PNG, JPG, JPEG, WebP)

**Response**:
```json
{
  "text": "extracted text content...",
  "metadata": {
    "fileName": "image.png",
    "fileSize": 512000,
    "mimeType": "image/png",
    "uploadedAt": "2024-01-01T00:00:00.000Z",
    "extractionMethod": "tesseract"
  },
  "confidence": 0.95
}
```

## Error Codes

- `NO_FILE`: No file provided in request
- `FILE_TOO_LARGE`: File exceeds 50MB limit
- `INVALID_FILE_TYPE`: Unsupported file type
- `EXTRACTION_FAILED`: Text extraction failed
- `NO_TEXT_FOUND`: No text detected in file
- `INTERNAL_ERROR`: Unexpected server error

## Usage Flow

1. **User navigates to `/upload`**
2. **User selects or drags file** into upload zone
3. **Client validates file** (size, type)
4. **File uploads to UploadThing** with progress tracking
5. **Server receives file and initiates extraction**:
   - For PDFs: Tries pdf-parse → Falls back to Tesseract
   - For images: Tries Tesseract → Falls back to Gemini Vision
6. **Extracted text returned to client**
7. **User redirected to `/generation`** for further processing

## Dependencies

- `uploadthing` & `@uploadthing/react`: File upload service
- `pdf-parse`: PDF text extraction
- `tesseract.js`: OCR engine
- `@google/generative-ai`: Gemini Vision API client
- `lucide-react`: Icons
- `@radix-ui/*`: UI primitives
- `clsx` & `class-variance-authority`: Styling utilities

## Production Considerations

1. **File Size Limits**: Currently set to 50MB (server) and 32MB (UploadThing). Adjust based on infrastructure capacity.

2. **Rate Limiting**: Consider implementing rate limiting on extraction endpoints to prevent abuse.

3. **Caching**: Consider caching extraction results for frequently accessed documents.

4. **Error Monitoring**: Implement proper logging and monitoring for extraction failures.

5. **Security**: 
   - Validate file contents, not just extensions
   - Scan uploaded files for malware
   - Implement proper authentication/authorization

6. **Performance**:
   - Large PDFs may take significant time to process
   - Consider implementing job queues for heavy processing
   - Add timeout configurations for extraction operations

7. **Costs**:
   - Monitor UploadThing usage and storage costs
   - Track Gemini API calls and associated costs

## Testing

To test the feature:

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Click "Upload PDF" button or navigate to `/upload`
4. Try uploading:
   - A text-based PDF (tests pdf-parse)
   - A scanned PDF (tests Tesseract fallback)
   - An image with text (tests OCR endpoints)
   - Invalid file types (tests validation)
   - Large files (tests size limits)

## Troubleshooting

### Build Issues
- If you encounter "useState is not a function" errors during build, ensure client components use the `'use client'` directive
- Clear `.next` directory and rebuild: `rm -rf .next && npm run build`

### Upload Issues
- Verify UploadThing credentials in `.env.local`
- Check browser console for upload errors
- Ensure file types are allowed in UploadThing dashboard

### Extraction Issues
- For Gemini API fallback, ensure `GEMINI_API_KEY` is set
- Check server logs for detailed error messages
- Verify pdf-parse and Tesseract.js are properly installed

## Future Enhancements

- [ ] Support for batch uploads
- [ ] Progress indication for multi-page document processing
- [ ] Text preview before confirmation
- [ ] Support for more document formats (DOCX, TXT, etc.)
- [ ] Advanced OCR options (language selection, preprocessing)
- [ ] Extraction result caching
- [ ] Document preview rendering
- [ ] Text post-processing (formatting, cleanup)
