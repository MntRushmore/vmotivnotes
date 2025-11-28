import { createJobProcessor } from './job-processor'

// Start the job processor when this module is imported
// This ensures the background worker is running
const processor = createJobProcessor()

// Process jobs immediately
processor.processJobs()

// Set up interval to process jobs every 5 seconds
setInterval(() => {
  processor.processJobs()
}, 5000)

console.log('Job processor service started')

export { processor }