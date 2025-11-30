import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

// Log environment variable status at startup
console.log('[UploadThing] Initializing with env vars:', {
  hasSecret: !!process.env.UPLOADTHING_SECRET,
  hasAppId: !!process.env.UPLOADTHING_APP_ID,
  secretPrefix: process.env.UPLOADTHING_SECRET?.substring(0, 10) + '...',
  appIdPrefix: process.env.UPLOADTHING_APP_ID?.substring(0, 10) + '...',
})

// Warn if using mock/dev credentials
if (process.env.UPLOADTHING_SECRET?.includes('mock') || 
    process.env.UPLOADTHING_SECRET?.includes('test')) {
  console.warn('[UploadThing] ⚠️  Using mock/development credentials. Uploads may not work properly.')
  console.warn('[UploadThing] ⚠️  For production, set real UPLOADTHING_SECRET and UPLOADTHING_APP_ID')
}

const f = createUploadthing({
  errorFormatter: (err) => {
    console.error('[UploadThing] Error formatter:', err)
    return {
      message: err.message,
      code: err.code,
      data: err.data,
    }
  },
})

export const ourFileRouter = {
  pdfUploader: f({
    pdf: { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      console.log('[UploadThing] PDF upload middleware - request received')
      
      // Check if we have valid credentials
      if (!process.env.UPLOADTHING_SECRET || !process.env.UPLOADTHING_APP_ID) {
        console.error('[UploadThing] Missing UPLOADTHING_SECRET or UPLOADTHING_APP_ID')
        throw new UploadThingError({
          code: "BAD_REQUEST",
          message: "UploadThing is not configured. Please set UPLOADTHING_SECRET and UPLOADTHING_APP_ID in .env.local",
        })
      }

      // Check if using mock credentials
      if (process.env.UPLOADTHING_SECRET.includes('mock') || 
          process.env.UPLOADTHING_SECRET.includes('test')) {
        console.warn('[UploadThing] Using mock credentials - upload will likely fail')
      }

      return { uploadedBy: 'user' }
    })
    .onUploadError(({ error }) => {
      console.error("[UploadThing] PDF upload error:", error)
      console.error("[UploadThing] Error details:", {
        message: error.message,
        code: error.code,
        cause: error.cause,
      })
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("[UploadThing] PDF upload complete:", {
        url: file.url,
        name: file.name,
        size: file.size,
        uploadedBy: metadata.uploadedBy,
      })
      return { url: file.url, key: file.key, name: file.name, size: file.size }
    }),
  
  imageUploader: f({
    image: { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      console.log('[UploadThing] Image upload middleware - request received')
      
      // Check if we have valid credentials
      if (!process.env.UPLOADTHING_SECRET || !process.env.UPLOADTHING_APP_ID) {
        console.error('[UploadThing] Missing UPLOADTHING_SECRET or UPLOADTHING_APP_ID')
        throw new UploadThingError({
          code: "BAD_REQUEST",
          message: "UploadThing is not configured. Please set UPLOADTHING_SECRET and UPLOADTHING_APP_ID in .env.local",
        })
      }

      // Check if using mock credentials
      if (process.env.UPLOADTHING_SECRET.includes('mock') || 
          process.env.UPLOADTHING_SECRET.includes('test')) {
        console.warn('[UploadThing] Using mock credentials - upload will likely fail')
      }

      return { uploadedBy: 'user' }
    })
    .onUploadError(({ error }) => {
      console.error("[UploadThing] Image upload error:", error)
      console.error("[UploadThing] Error details:", {
        message: error.message,
        code: error.code,
        cause: error.cause,
      })
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("[UploadThing] Image upload complete:", {
        url: file.url,
        name: file.name,
        size: file.size,
        uploadedBy: metadata.uploadedBy,
      })
      return { url: file.url, key: file.key, name: file.name, size: file.size }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
