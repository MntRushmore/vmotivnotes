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
      // OCR for images
      const { createWorker } = require('tesseract.js')
      const worker = await createWorker('eng')
      const { data } = await worker.recognize(fileBuffer)
      await worker.terminate()
      
      if (!data.text || data.text.trim().length === 0) {
        throw new Error('No text extracted from image')
      }
      
      console.log(`Successfully extracted text via Tesseract: ${fileData.fileName}`)
      return { text: data.text.trim() }
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
  
  try {
    // For MVP, we'll create a mock PDF URL
    // In production, this would call Nano Banana or similar service
    await new Promise(resolve => setTimeout(resolve, 4000)) // Simulate processing time
    
    const style = options?.style || 'notes'
    const pdfUrl = `https://storage.example.com/handwriting-${Date.now()}-${style}.pdf`
    
    console.log(`Successfully generated handwritten notes: ${pdfUrl}`)
    return { pdfUrl }
  } catch (error) {
    console.error('Failed to generate handwritten notes:', error)
    throw error
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