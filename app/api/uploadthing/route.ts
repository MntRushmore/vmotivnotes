import { createRouteHandler } from "uploadthing/next"
import { NextRequest, NextResponse } from "next/server"
import { ourFileRouter } from "./core"

// Log when the route handler is initialized
console.log('[UploadThing Route] Initializing route handler')

// Create route handlers with error logging
const handlers = createRouteHandler({
  router: ourFileRouter,
})

// Wrap GET handler with error logging
export async function GET(req: NextRequest) {
  try {
    console.log('[UploadThing Route] GET request received:', req.url)
    return await handlers.GET(req)
  } catch (error) {
    console.error('[UploadThing Route] GET error:', error)
    return NextResponse.json(
      { 
        error: 'UploadThing GET request failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: 'Check server logs for more information'
      },
      { status: 500 }
    )
  }
}

// Wrap POST handler with error logging
export async function POST(req: NextRequest) {
  try {
    console.log('[UploadThing Route] POST request received:', req.url)
    console.log('[UploadThing Route] Environment check:', {
      hasSecret: !!process.env.UPLOADTHING_SECRET,
      hasAppId: !!process.env.UPLOADTHING_APP_ID,
    })
    
    return await handlers.POST(req)
  } catch (error) {
    console.error('[UploadThing Route] POST error:', error)
    console.error('[UploadThing Route] Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    return NextResponse.json(
      { 
        error: 'UploadThing POST request failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: 'Check server logs for more information. Make sure UPLOADTHING_SECRET and UPLOADTHING_APP_ID are set in .env.local'
      },
      { status: 500 }
    )
  }
}
