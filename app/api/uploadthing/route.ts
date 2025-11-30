import { createRouteHandler } from "uploadthing/next"
import { ourFileRouter } from "./core"
import { NextRequest } from "next/server"

// Wrap the generated handlers to add simple request logging
const handler = createRouteHandler({
  router: ourFileRouter,
})

export const GET = async (req: NextRequest) => {
  console.log('[uploadthing][route] GET', req.url)
  try {
    return await handler.GET(req)
  } catch (err) {
    console.error('[uploadthing][route] GET error', err instanceof Error ? err.stack : err)
    return new Response(JSON.stringify({ error: 'UploadThing GET handler error', detail: err instanceof Error ? err.message : String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const POST = async (req: NextRequest) => {
  console.log('[uploadthing][route] POST', req.url)
  try {
    return await handler.POST(req)
  } catch (err) {
    console.error('[uploadthing][route] POST error', err instanceof Error ? err.stack : err)
    return new Response(JSON.stringify({ error: 'UploadThing POST handler error', detail: err instanceof Error ? err.message : String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
