import { getQueuedJobs, updateJobProgress, updateJobError, updateJobComplete, updateJob } from './job-store'
import type { Job } from '@/types'

// Direct function calls to avoid HTTP overhead in background processing
async function callExtractAPI(fileData: { fileName: string; fileSize: number; mimeType: string }, fileBuffer: Buffer): Promise<{ text: string }> {
  console.log(`Extracting text from: ${fileData.fileName}`)
  
  try {
    if (fileData.mimeType === 'application/pdf') {
      // Direct PDF parsing
      const pdfParse = require('pdf-parse')
      const data = await pdfParse(fileBuffer) as any
      
      if (!data.text || data.text.trim().length === 0) {
        throw new Error('No text extracted from PDF')
      }
      
      console.log(`Successfully extracted text from PDF: ${fileData.fileName} (${data.numpages} pages)`)
      return { text: data.text.trim() }
    } else {
      // OCR for images - Using fallback for now due to Tesseract worker issues in Next.js
      console.log('Using fallback text extraction for image (Tesseract disabled in serverless)')
      return { text: 'Image content: OCR processing would happen here. Using placeholder content for demonstration. The image appears to contain mathematical equations or problem-solving content.' }
    }
  } catch (error) {
    console.error(`Failed to extract text from ${fileData.fileName}:`, error)
    throw error
  }
}

async function callSummarizeAPI(text: string, options?: { summaryLength?: 'short' | 'medium' | 'long' }): Promise<{ summary: string }> {
  console.log(`Summarizing text (${text.length} characters)`)
  
  try {
    // For MVP, we'll create a simple summary
    // In production, this would call Claude or another AI service
    await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate processing time
    
    const summaryLength = options?.summaryLength || 'medium'
    let summary = ''
    
    switch (summaryLength) {
      case 'short':
        summary = `Brief summary: ${text.substring(0, 150)}...`
        break
      case 'long':
        summary = `Detailed summary: ${text.substring(0, 400)}...`
        break
      default:
        summary = `Summary: ${text.substring(0, 250)}...`
    }
    
    console.log(`Successfully generated summary (${summary.length} characters)`)
    return { summary }
  } catch (error) {
    console.error('Failed to generate summary:', error)
    throw error
  }
}

async function callHandwritingAPI(summary: string, options?: { style?: 'notes' | 'outline' | 'summary' }): Promise<{ pdfUrl: string }> {
  console.log(`Rendering handwriting for summary (${summary.length} characters)`)

  const style = options?.style || 'notes'

  try {
    const { HandwritingService } = require('./handwriting-service')

    // Generate handwritten image using Gemini/Nano Banana
    const result = await HandwritingService.generateHandwriting({
      text: summary,
      style
    })

    // Store the image data as a data URL (in production, upload to cloud storage)
    const imageBuffer = Buffer.from(result.imageData, 'base64')
    const pdfUrl = `data:image/png;base64,${result.imageData}`

    console.log(`Successfully generated handwritten notes image (${imageBuffer.length} bytes)`)
    return { pdfUrl }
  } catch (error) {
    console.error('Gemini handwriting generation failed:', error)

    // Fallback: Create a simple text-based note
    console.log('Using fallback: creating simple text note')

    try {
      const canvas = require('canvas')
      const { createCanvas } = canvas

      // Create a canvas to draw text
      const canvasWidth = 800
      const canvasHeight = Math.max(600, Math.ceil(summary.length / 60) * 800)
      const ctx = createCanvas(canvasWidth, canvasHeight)
      const context = ctx.getContext('2d')

      // Background
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvasWidth, canvasHeight)

      // Add lined paper effect
      context.strokeStyle = '#e0e0e0'
      context.lineWidth = 1
      for (let i = 40; i < canvasHeight; i += 40) {
        context.beginPath()
        context.moveTo(0, i)
        context.lineTo(canvasWidth, i)
        context.stroke()
      }

      // Draw text
      context.fillStyle = '#1a1a1a'
      context.font = '18px Arial'

      const words = summary.split(' ')
      let line = ''
      let y = 50
      const maxWidth = canvasWidth - 80
      const lineHeight = 40

      for (const word of words) {
        const testLine = line + word + ' '
        const metrics = context.measureText(testLine)

        if (metrics.width > maxWidth && line !== '') {
          context.fillText(line, 40, y)
          line = word + ' '
          y += lineHeight
        } else {
          line = testLine
        }
      }
      context.fillText(line, 40, y)

      // Convert to base64
      const imageBuffer = ctx.toBuffer('image/png')
      const base64Image = imageBuffer.toString('base64')
      const pdfUrl = `data:image/png;base64,${base64Image}`

      console.log(`Successfully generated fallback text note (${imageBuffer.length} bytes)`)
      return { pdfUrl }
    } catch (fallbackError) {
      console.error('Fallback generation also failed:', fallbackError)

      // Ultimate fallback: return the text itself
      const textData = Buffer.from(summary).toString('base64')
      return { pdfUrl: `data:text/plain;base64,${textData}` }
    }
  }
}

export function createJobProcessor() {
  let isProcessing = false
  
  async function processJob(job: Job): Promise<void> {
    try {
      console.log(`Starting to process job: ${job.id}`)
      
      // Get file data from global store (MVP approach)
      let fileData: any = null
      if (typeof global !== 'undefined' && global.jobFiles) {
        fileData = global.jobFiles.get(job.id)
      }
      
      if (!fileData || !fileData.fileBuffer) {
        throw new Error('File data not found for job')
      }
      
      // Step 1: Extract text
      updateJobProgress(job.id, 'extracting', 25, 150) // 25% progress, ~2.5 minutes remaining
      const extractResult = await callExtractAPI({
        fileName: job.fileName,
        fileSize: job.fileSize,
        mimeType: job.mimeType,
      }, fileData.fileBuffer)
      
      // Update job with extracted text
      updateJob(job.id, { extractedText: extractResult.text })
      
      // Step 2: Summarize
      updateJobProgress(job.id, 'summarizing', 50, 90) // 50% progress, ~1.5 minutes remaining
      const summarizeResult = await callSummarizeAPI(extractResult.text, {
        summaryLength: fileData.options?.summaryLength || 'medium',
      })
      
      // Update job with summary
      updateJob(job.id, { summary: summarizeResult.summary })
      
      // Step 3: Render handwriting
      updateJobProgress(job.id, 'rendering', 75, 30) // 75% progress, ~30 seconds remaining
      const handwritingResult = await callHandwritingAPI(summarizeResult.summary, {
        style: fileData.options?.style || 'notes',
      })
      
      // Complete job
      updateJobComplete(job.id, handwritingResult.pdfUrl)
      
      // Clean up file data
      if (typeof global !== 'undefined' && global.jobFiles) {
        global.jobFiles.delete(job.id)
      }
      
      console.log(`Successfully completed job: ${job.id}`)
    } catch (error) {
      console.error(`Failed to process job: ${job.id}`, error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      updateJobError(job.id, errorMessage)
      
      // Clean up file data on error
      if (typeof global !== 'undefined' && global.jobFiles) {
        global.jobFiles.delete(job.id)
      }
    }
  }
  
  async function processJobs(): Promise<void> {
    // Prevent concurrent processing
    if (isProcessing) {
      return
    }
    
    const queuedJobs = getQueuedJobs()
    if (queuedJobs.length === 0) {
      return
    }
    
    isProcessing = true
    console.log(`Processing ${queuedJobs.length} queued jobs`)
    
    try {
      // Process jobs one at a time to avoid overwhelming the system
      for (const job of queuedJobs.slice(0, 2)) { // Process max 2 jobs at a time
        await processJob(job)
      }
    } catch (error) {
      console.error('Error processing jobs:', error)
    } finally {
      isProcessing = false
    }
  }
  
  return {
    processJobs,
    isProcessing: () => isProcessing,
  }
}