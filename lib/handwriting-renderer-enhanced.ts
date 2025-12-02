import { createCanvas } from 'canvas'

// Use multiple fallback fonts for better compatibility
const HANDWRITING_FONTS = [
  'Comic Sans MS',     // Available on most systems, handwriting-like
  'Marker Felt',       // macOS handwriting font
  'Segoe Print',       // Windows handwriting font
  'Bradley Hand',      // macOS
  'Chalkboard',        // macOS
  'Brush Script MT',   // Windows/macOS
  'Lucida Handwriting', // Windows
  'cursive',           // Generic fallback
  'Arial'              // Final fallback
].join(', ')

const TITLE_FONT = 'Georgia, serif'
const BODY_FONT = HANDWRITING_FONTS

export interface HandwritingOptions {
  markdown: string
  style?: 'notes' | 'outline' | 'summary'
}

export interface HandwritingResult {
  imageData: string // base64
}

interface ParsedSections {
  title: string
  gradeLevel?: string
  subject?: string
  intro?: string
  bullets: string[]
  questions: Array<{ question: string; answer?: string }>
}

export class HandwritingRenderer {
  /**
   * Render markdown as handwritten notes
   */
  static async render(options: HandwritingOptions): Promise<HandwritingResult> {
    const { markdown } = options

    // Parse markdown into sections
    const sections = this.parseMarkdown(markdown)

    // Dynamic height calculation
    const padding = 60
    const titleFontSize = 32
    const headingFontSize = 26
    const bodyFontSize = 22
    const metaFontSize = 20
    const baseLineHeight = 55
    const canvasWidth = 1200

    // Calculate height needed
    let estimatedLines = 4 // title + metadata
    estimatedLines += sections.bullets.length * 2.5 // bullets with wrapping
    estimatedLines += sections.questions.length * 3 // questions with answers
    const canvasHeight = Math.max(1000, padding * 2 + estimatedLines * baseLineHeight)

    // Create canvas
    const canvas = createCanvas(canvasWidth, canvasHeight)
    const ctx = canvas.getContext('2d')

    // Set text rendering quality
    ctx.quality = 'best'
    ctx.patternQuality = 'best'
    ctx.textDrawingMode = 'glyph'
    ctx.antialias = 'default'

    // Background - aged paper with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, '#fffef9')
    gradient.addColorStop(0.5, '#fffef3')
    gradient.addColorStop(1, '#fffee8')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Paper texture
    ctx.fillStyle = 'rgba(240, 235, 220, 0.15)'
    for (let i = 0; i < 150; i++) {
      const size = Math.random() * 4 + 1
      ctx.fillRect(
        Math.random() * canvasWidth,
        Math.random() * canvasHeight,
        size,
        size
      )
    }

    // Paper grain
    ctx.fillStyle = 'rgba(230, 225, 210, 0.08)'
    for (let i = 0; i < 300; i++) {
      ctx.fillRect(
        Math.random() * canvasWidth,
        Math.random() * canvasHeight,
        1,
        1
      )
    }

    // Draw notebook lines
    ctx.strokeStyle = '#ddd6ce'
    ctx.lineWidth = 1
    for (let lineY = padding + 80; lineY < canvasHeight - padding; lineY += baseLineHeight) {
      ctx.beginPath()
      for (let x = padding; x < canvasWidth - padding; x += 10) {
        const wave = Math.sin(x * 0.008) * 0.5
        if (x === padding) {
          ctx.moveTo(x, lineY + wave)
        } else {
          ctx.lineTo(x, lineY + wave)
        }
      }
      ctx.stroke()
    }

    // Margin line (red/pink)
    ctx.strokeStyle = '#ffb0c1'
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let lineY = padding - 30; lineY < canvasHeight - padding + 30; lineY += 5) {
      const wobble = Math.random() * 3 - 1.5
      if (lineY === padding - 30) {
        ctx.moveTo(padding + 60 + wobble, lineY)
      } else {
        ctx.lineTo(padding + 60 + wobble, lineY)
      }
    }
    ctx.stroke()

    let y = padding + 20

    // Color palette for variety
    const textColors = [
      '#1a1a2e', // dark blue-black
      '#2a2a3e', // slightly lighter
      '#0a0a1e', // darker
    ]

    const highlightColors = [
      'rgba(255, 240, 150, 0.35)', // yellow
      'rgba(150, 240, 255, 0.25)', // cyan
      'rgba(255, 200, 200, 0.25)', // pink
      'rgba(200, 255, 200, 0.25)', // green
    ]

    // Helper function to add highlight
    const addHighlight = (x: number, textY: number, width: number, height: number) => {
      const color = highlightColors[Math.floor(Math.random() * highlightColors.length)]
      ctx.fillStyle = color
      ctx.fillRect(x - 5, textY - height + 8, width + 10, height + 2)
    }

    // Helper function to get varied ink color
    const getInkColor = () => {
      const baseColor = textColors[Math.floor(Math.random() * textColors.length)]
      const alpha = 0.85 + Math.random() * 0.15 // 0.85-1.0
      return baseColor.replace(')', `, ${alpha})`)
    }

    // Draw title with color variation
    ctx.font = `bold ${titleFontSize}px ${TITLE_FONT}`
    const titleColor = '#1a1a2e'
    ctx.fillStyle = titleColor
    const titleX = padding + 70 + (Math.random() * 6 - 3)
    const titleY = y + (Math.random() * 4 - 2)

    // Add highlight behind title
    const titleWidth = ctx.measureText(sections.title).width
    addHighlight(titleX, titleY, titleWidth, titleFontSize)

    ctx.fillText(sections.title, titleX, titleY)

    // Underline title with wavy line
    ctx.strokeStyle = '#2a2a3e'
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.moveTo(titleX, titleY + 12)
    for (let x = titleX; x < titleX + titleWidth; x += 12) {
      const wave = Math.sin(x * 0.1) * 0.8
      ctx.lineTo(x, titleY + 12 + wave)
    }
    ctx.lineTo(titleX + titleWidth, titleY + 12)
    ctx.stroke()

    y += titleFontSize + 50

    // Draw metadata with slight color variation
    ctx.font = `italic ${metaFontSize}px ${BODY_FONT}`
    ctx.fillStyle = '#4a4a6a'
    if (sections.gradeLevel) {
      const metaX = padding + 70 + (Math.random() * 3 - 1.5)
      ctx.fillText(`Grade Level: ${sections.gradeLevel}`, metaX, y)
      y += metaFontSize + 8
    }
    if (sections.subject) {
      const metaX = padding + 70 + (Math.random() * 3 - 1.5)
      ctx.fillText(`Subject: ${sections.subject}`, metaX, y)
      y += metaFontSize + 8
    }
    y += 40

    // Draw intro
    if (sections.intro) {
      ctx.font = `${bodyFontSize}px ${BODY_FONT}`
      ctx.fillStyle = '#2a2a3e'
      const introLines = this.wrapText(sections.intro, canvasWidth - padding * 2 - 150, bodyFontSize)
      introLines.forEach(line => {
        const xOffset = padding + 70 + (Math.random() * 4 - 2)
        ctx.fillText(line, xOffset, y)
        y += baseLineHeight
      })
      y += 30
    }

    // Draw "Key Points" heading
    ctx.font = `bold ${headingFontSize}px ${BODY_FONT}`
    ctx.fillStyle = '#1a1a2e'
    const keyPointsX = padding + 70 + (Math.random() * 4 - 2)
    ctx.fillText('Key Points', keyPointsX, y)

    // Underline heading
    const headingWidth = ctx.measureText('Key Points').width
    ctx.strokeStyle = '#9333ea'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(keyPointsX, y + 8)
    ctx.lineTo(keyPointsX + headingWidth, y + 8)
    ctx.stroke()

    y += headingFontSize + 40

    // Draw bullets with variety
    ctx.font = `${bodyFontSize}px ${BODY_FONT}`
    sections.bullets.forEach((bullet, index) => {
      const bulletX = padding + 90
      const bulletY = y

      // Random highlight for some bullets (30% chance)
      if (Math.random() > 0.7) {
        const bulletLines = this.wrapText(bullet, canvasWidth - padding * 2 - 170, bodyFontSize)
        const firstLine = bulletLines[0]
        const lineWidth = ctx.measureText(firstLine).width
        addHighlight(bulletX + 20, bulletY, lineWidth, bodyFontSize)
      }

      // Bullet point with color variation
      const bulletColor = textColors[index % textColors.length]
      ctx.fillStyle = bulletColor
      ctx.fillText('•', bulletX, bulletY)

      // Bullet text with ink variation
      const textX = bulletX + 20
      const bulletLines = this.wrapText(bullet, canvasWidth - padding * 2 - 170, bodyFontSize)

      bulletLines.forEach((line, lineIndex) => {
        const xOffset = textX + (Math.random() * 3 - 1.5)
        const yOffset = bulletY + (lineIndex * baseLineHeight) + (Math.random() * 2 - 1)

        // Vary ink color slightly per line
        ctx.fillStyle = lineIndex === 0 ? bulletColor : getInkColor()
        ctx.fillText(line, xOffset, yOffset)
      })

      y += bulletLines.length * baseLineHeight + 15
    })

    y += 40

    // Draw "Quick Check" heading
    ctx.font = `bold ${headingFontSize}px ${BODY_FONT}`
    ctx.fillStyle = '#1a1a2e'
    const quickCheckX = padding + 70 + (Math.random() * 4 - 2)
    ctx.fillText('Quick Check', quickCheckX, y)

    // Underline with different color
    const checkHeadingWidth = ctx.measureText('Quick Check').width
    ctx.strokeStyle = '#16a34a'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(quickCheckX, y + 8)
    ctx.lineTo(quickCheckX + checkHeadingWidth, y + 8)
    ctx.stroke()

    y += headingFontSize + 40

    // Draw questions
    ctx.font = `${bodyFontSize}px ${BODY_FONT}`
    sections.questions.forEach((q, index) => {
      const questionX = padding + 90
      const questionY = y

      // Question number
      ctx.fillStyle = '#9333ea'
      ctx.fillText(`${index + 1}.`, questionX, questionY)

      // Question text
      ctx.fillStyle = '#2a2a3e'
      const textX = questionX + 30
      const questionLines = this.wrapText(q.question, canvasWidth - padding * 2 - 190, bodyFontSize)

      questionLines.forEach((line, lineIndex) => {
        const xOffset = textX + (Math.random() * 3 - 1.5)
        const yOffset = questionY + (lineIndex * baseLineHeight) + (Math.random() * 2 - 1)
        ctx.fillText(line, xOffset, yOffset)
      })

      y += questionLines.length * baseLineHeight + 10

      // Answer (if exists)
      if (q.answer) {
        ctx.font = `italic ${bodyFontSize - 2}px ${BODY_FONT}`
        ctx.fillStyle = '#16a34a' // green for answers
        const answerText = `Answer: ${q.answer}`
        const answerLines = this.wrapText(answerText, canvasWidth - padding * 2 - 210, bodyFontSize - 2)

        answerLines.forEach((line, lineIndex) => {
          const xOffset = textX + 20 + (Math.random() * 2 - 1)
          const yOffset = y + (lineIndex * (baseLineHeight - 5)) + (Math.random() * 2 - 1)
          ctx.fillText(line, xOffset, yOffset)
        })

        y += answerLines.length * (baseLineHeight - 5) + 20
      }

      y += 15
    })

    // Convert to base64
    const buffer = canvas.toBuffer('image/png')
    const imageData = buffer.toString('base64')

    return { imageData }
  }

  /**
   * Parse markdown into structured sections
   */
  private static parseMarkdown(markdown: string): ParsedSections {
    const lines = markdown.split('\n')
    const sections: ParsedSections = {
      title: '',
      bullets: [],
      questions: []
    }

    let currentSection: 'none' | 'intro' | 'bullets' | 'questions' = 'none'
    let introLines: string[] = []

    for (const line of lines) {
      const trimmed = line.trim()

      if (trimmed.startsWith('# ')) {
        sections.title = trimmed.slice(2)
      } else if (trimmed.startsWith('**Grade Level:**')) {
        sections.gradeLevel = trimmed.replace('**Grade Level:**', '').trim()
      } else if (trimmed.startsWith('**Subject:**')) {
        sections.subject = trimmed.replace('**Subject:**', '').trim()
      } else if (trimmed === '## Key Points') {
        currentSection = 'bullets'
      } else if (trimmed === '## Quick Check') {
        currentSection = 'questions'
      } else if (trimmed.startsWith('• ')) {
        if (currentSection === 'bullets') {
          sections.bullets.push(trimmed.slice(2))
        }
      } else if (/^\d+\.\s/.test(trimmed)) {
        if (currentSection === 'questions') {
          sections.questions.push({ question: trimmed.replace(/^\d+\.\s/, '') })
        }
      } else if (trimmed.startsWith('*Answer:')) {
        const answer = trimmed.replace('*Answer:', '').replace('*', '').trim()
        if (sections.questions.length > 0) {
          sections.questions[sections.questions.length - 1].answer = answer
        }
      } else if (trimmed && currentSection === 'none' && sections.title) {
        introLines.push(trimmed)
      }
    }

    if (introLines.length > 0) {
      sections.intro = introLines.join(' ')
    }

    return sections
  }

  /**
   * Wrap text to fit within width - improved to use actual canvas measurements
   */
  private static wrapText(text: string, maxWidth: number, fontSize: number): string[] {
    // Create a temporary canvas for accurate text measurement
    const tempCanvas = createCanvas(100, 100)
    const tempCtx = tempCanvas.getContext('2d')
    tempCtx.font = `${fontSize}px ${BODY_FONT}`

    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const metrics = tempCtx.measureText(testLine)
      const testWidth = metrics.width

      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines.length > 0 ? lines : [text]
  }
}
