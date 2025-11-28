#!/usr/bin/env ts-node

import fs from 'fs'
import path from 'path'
import { SATTopic, PDFLibraryItem } from '../types'

const TOPICS_FILE = path.join(process.cwd(), 'data', 'sat-topics.json')
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'generated', 'sat-deck')

interface BuildStats {
  total: number
  success: number
  failed: number
  startTime: Date
  endTime?: Date
  errors: { topic: string; error: string }[]
}

async function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    console.log(`✓ Created output directory: ${OUTPUT_DIR}`)
  }
}

async function loadTopics(): Promise<SATTopic[]> {
  if (!fs.existsSync(TOPICS_FILE)) {
    throw new Error(`Topics file not found: ${TOPICS_FILE}`)
  }

  const data = fs.readFileSync(TOPICS_FILE, 'utf-8')
  const topics = JSON.parse(data) as SATTopic[]
  console.log(`✓ Loaded ${topics.length} topics from ${TOPICS_FILE}`)
  return topics
}

async function generatePDF(topic: SATTopic): Promise<PDFLibraryItem> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (Math.random() < 0.9) {
    const item: PDFLibraryItem = {
      id: `sat-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      title: topic.topic,
      url: `/generated/sat-deck/${topic.topic.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      createdAt: new Date(),
      topic: topic.topic,
      category: topic.category,
      summarySnippet: topic.description,
      status: 'ready',
      fileSize: Math.floor(Math.random() * 500000) + 100000,
      metadata: {
        extractionConfidence: 0.95,
        summaryQuality: 0.9,
        pageCount: Math.floor(Math.random() * 5) + 1,
      },
    }
    return item
  } else {
    throw new Error('Generation failed')
  }
}

async function savePDF(item: PDFLibraryItem): Promise<void> {
  const dummyPDF = Buffer.from('Mock PDF content for: ' + item.title)
  const filename = path.basename(item.url)
  const filepath = path.join(OUTPUT_DIR, filename)
  
  fs.writeFileSync(filepath, dummyPDF)
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

function logProgress(current: number, total: number, topic: string) {
  const percentage = ((current / total) * 100).toFixed(1)
  console.log(`[${current}/${total}] (${percentage}%) Processing: ${topic}`)
}

async function main() {
  console.log('========================================')
  console.log('SAT Master Deck Builder')
  console.log('========================================\n')

  const stats: BuildStats = {
    total: 0,
    success: 0,
    failed: 0,
    startTime: new Date(),
    errors: [],
  }

  try {
    await ensureOutputDir()
    const topics = await loadTopics()
    stats.total = topics.length

    console.log(`\nStarting generation of ${topics.length} PDFs...`)
    console.log(`Estimated time: ${Math.ceil(topics.length * 0.5 / 60)} minutes\n`)

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i]
      logProgress(i + 1, topics.length, topic.topic)

      try {
        const item = await generatePDF(topic)
        await savePDF(item)
        stats.success++
      } catch (error) {
        stats.failed++
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        stats.errors.push({ topic: topic.topic, error: errorMessage })
        console.error(`  ✗ Failed: ${errorMessage}`)
      }
    }

    stats.endTime = new Date()
    const duration = stats.endTime.getTime() - stats.startTime.getTime()

    console.log('\n========================================')
    console.log('Build Complete!')
    console.log('========================================')
    console.log(`Total topics: ${stats.total}`)
    console.log(`✓ Success: ${stats.success}`)
    console.log(`✗ Failed: ${stats.failed}`)
    console.log(`Duration: ${formatDuration(duration)}`)
    console.log(`Output directory: ${OUTPUT_DIR}`)

    if (stats.errors.length > 0) {
      console.log('\nErrors:')
      stats.errors.forEach(({ topic, error }) => {
        console.log(`  - ${topic}: ${error}`)
      })
    }

    const successRate = ((stats.success / stats.total) * 100).toFixed(1)
    console.log(`\nSuccess rate: ${successRate}%`)
    console.log('========================================\n')

    process.exit(stats.failed === 0 ? 0 : 1)
  } catch (error) {
    console.error('\n✗ Fatal error:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { main }
