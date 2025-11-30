/**
 * Enhanced handwriting renderer for structured tutor notes
 * Renders markdown notes in realistic handwriting style with proper formatting
 */

export interface HandwritingOptions {
  markdown: string
  style?: 'notes' | 'outline' | 'summary'
}

export interface HandwritingResult {
  imageUrl: string
  imageData: string // base64 encoded PNG
}

export class HandwritingRenderer {
  /**
   * Render markdown notes in handwriting style
   */
  static async render(options: HandwritingOptions): Promise<HandwritingResult> {
    const { markdown, style = 'notes' } = options

    try {
      console.log('[handwriting-renderer] Rendering handwritten notes...')

      const canvas = require('canvas')
      const { createCanvas } = canvas

      // Parse markdown into sections
      const sections = this.parseMarkdown(markdown)

      // Canvas configuration
      const canvasWidth = 1200
      const padding = 80
      const maxWidth = canvasWidth - (padding * 2) - 70
      const titleFontSize = 32
      const headingFontSize = 26
      const bodyFontSize = 22
      const metaFontSize = 18
      const baseLineHeight = 50

      // Calculate total height needed
      let estimatedHeight = padding + 100 // Initial padding + title space

      // Title
      estimatedHeight += titleFontSize + 40

      // Metadata
      estimatedHeight += metaFontSize * 2 + 30

      // Intro
      if (sections.intro) {
        const introLines = this.wrapText(sections.intro, maxWidth, bodyFontSize)
        estimatedHeight += introLines.length * baseLineHeight + 40
      }

      // Key Points section
      estimatedHeight += headingFontSize + 60
      sections.bullets.forEach(bullet => {
        const bulletLines = this.wrapText(bullet, maxWidth - 40, bodyFontSize)
        estimatedHeight += bulletLines.length * baseLineHeight + 15
      })

      // Quick Check section
      estimatedHeight += headingFontSize + 80
      sections.quickCheck.forEach(q => {
        const qLines = this.wrapText(q.question, maxWidth - 40, bodyFontSize)
        estimatedHeight += qLines.length * baseLineHeight + 10
        if (q.answer) {
          const aLines = this.wrapText(q.answer, maxWidth - 40, bodyFontSize - 2)
          estimatedHeight += aLines.length * (baseLineHeight - 5) + 20
        } else {
          estimatedHeight += 40
        }
      })

      estimatedHeight += padding + 100 // Bottom padding

      const canvasHeight = Math.max(1000, estimatedHeight)

      // Create canvas
      const finalCanvas = createCanvas(canvasWidth, canvasHeight)
      const ctx = finalCanvas.getContext('2d')

      // Background - aged paper with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
      gradient.addColorStop(0, '#fffef9')
      gradient.addColorStop(1, '#fffef3')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      // Paper texture
      ctx.fillStyle = 'rgba(240, 235, 220, 0.12)'
      for (let i = 0; i < 120; i++) {
        const size = Math.random() * 4 + 1
        ctx.fillRect(
          Math.random() * canvasWidth,
          Math.random() * canvasHeight,
          size,
          size
        )
      }

      // Paper grain
      ctx.fillStyle = 'rgba(230, 225, 210, 0.06)'
      for (let i = 0; i < 250; i++) {
        ctx.fillRect(
          Math.random() * canvasWidth,
          Math.random() * canvasHeight,
          1,
          1
        )
      }

      // Draw notebook lines
      ctx.strokeStyle = '#e0dbd5'
      ctx.lineWidth = 1
      for (let y = padding + 80; y < canvasHeight - padding; y += baseLineHeight) {
        ctx.beginPath()
        for (let x = padding; x < canvasWidth - padding; x += 10) {
          const wave = Math.sin(x * 0.008) * 0.4
          if (x === padding) {
            ctx.moveTo(x, y + wave)
          } else {
            ctx.lineTo(x, y + wave)
          }
        }
        ctx.stroke()
      }

      // Margin line (red/pink)
      ctx.strokeStyle = '#ffb0c1'
      ctx.lineWidth = 1.8
      ctx.beginPath()
      for (let y = padding - 30; y < canvasHeight - padding + 30; y += 5) {
        const wobble = Math.random() * 2.5 - 1.25
        if (y === padding - 30) {
          ctx.moveTo(padding + 60 + wobble, y)
        } else {
          ctx.lineTo(padding + 60 + wobble, y)
        }
      }
      ctx.stroke()

      let y = padding + 20

      // Draw title
      ctx.fillStyle = '#1a1a2e'
      ctx.font = `bold ${titleFontSize}px "Bradley Hand", "Brush Script MT", cursive`
      const titleX = padding + 70 + (Math.random() * 4 - 2)
      ctx.fillText(sections.title, titleX, y)

      // Underline title
      const titleWidth = ctx.measureText(sections.title).width
      ctx.strokeStyle = '#1a1a2e'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(titleX, y + 10)
      for (let x = titleX; x < titleX + titleWidth; x += 12) {
        const wave = Math.sin(x * 0.1) * 0.6
        ctx.lineTo(x, y + 10 + wave)
      }
      ctx.lineTo(titleX + titleWidth, y + 10)
      ctx.stroke()

      y += titleFontSize + 50

      // Draw metadata
      ctx.font = `italic ${metaFontSize}px "Bradley Hand", cursive`
      ctx.fillStyle = '#4a4a5a'
      if (sections.gradeLevel) {
        ctx.fillText(`Grade Level: ${sections.gradeLevel}`, padding + 70, y)
        y += metaFontSize + 8
      }
      if (sections.subject) {
        ctx.fillText(`Subject: ${sections.subject}`, padding + 70, y)
        y += metaFontSize + 8
      }
      y += 40

      // Draw intro
      if (sections.intro) {
        ctx.font = `${bodyFontSize}px "Bradley Hand", cursive`
        ctx.fillStyle = '#2c3e50'
        const introLines = this.wrapText(sections.intro, maxWidth, bodyFontSize)
        introLines.forEach(line => {
          const xOffset = Math.random() * 5 - 2.5
          const yOffset = Math.random() * 3 - 1.5
          ctx.fillText(line, padding + 70 + xOffset, y + yOffset)
          y += baseLineHeight
        })
        y += 30
      }

      // Draw "Key Points" heading
      ctx.font = `bold ${headingFontSize}px "Bradley Hand", cursive`
      ctx.fillStyle = '#1a1a2e'
      ctx.fillText('Key Points', padding + 70, y)
      y += headingFontSize + 40

      // Draw bullets
      ctx.font = `${bodyFontSize}px "Bradley Hand", cursive`
      sections.bullets.forEach((bullet, index) => {
        const inkShade = 35 + Math.random() * 25
        ctx.fillStyle = `rgb(${inkShade}, ${inkShade + 10}, ${inkShade + 30})`

        // Bullet point
        ctx.fillText('•', padding + 70, y)

        // Bullet text
        const bulletLines = this.wrapText(bullet, maxWidth - 40, bodyFontSize)
        bulletLines.forEach((line, lineIndex) => {
          const xOffset = Math.random() * 4 - 2
          const yOffset = Math.random() * 2 - 1
          ctx.fillText(line, padding + 95 + xOffset, y + yOffset)
          y += baseLineHeight
        })
        y += 15
      })

      y += 40

      // Draw "Quick Check" heading
      ctx.font = `bold ${headingFontSize}px "Bradley Hand", cursive`
      ctx.fillStyle = '#1a1a2e'
      ctx.fillText('Quick Check', padding + 70, y)
      y += headingFontSize + 40

      // Draw questions
      ctx.font = `${bodyFontSize}px "Bradley Hand", cursive`
      sections.quickCheck.forEach((q, index) => {
        const inkShade = 35 + Math.random() * 25
        ctx.fillStyle = `rgb(${inkShade}, ${inkShade + 10}, ${inkShade + 30})`

        // Question number
        ctx.fillText(`${index + 1}.`, padding + 70, y)

        // Question text
        const qLines = this.wrapText(q.question, maxWidth - 40, bodyFontSize)
        qLines.forEach((line, lineIndex) => {
          const xOffset = Math.random() * 4 - 2
          const yOffset = Math.random() * 2 - 1
          ctx.fillText(line, padding + 95 + xOffset, y + yOffset)
          y += baseLineHeight
        })

        // Answer (if provided)
        if (q.answer) {
          ctx.font = `italic ${bodyFontSize - 2}px "Bradley Hand", cursive`
          ctx.fillStyle = '#666677'
          const answerText = `Answer: ${q.answer}`
          const aLines = this.wrapText(answerText, maxWidth - 40, bodyFontSize - 2)
          aLines.forEach((line) => {
            const xOffset = Math.random() * 4 - 2
            const yOffset = Math.random() * 2 - 1
            ctx.fillText(line, padding + 105 + xOffset, y + yOffset)
            y += baseLineHeight - 5
          })
          ctx.font = `${bodyFontSize}px "Bradley Hand", cursive`
          y += 20
        } else {
          y += 40
        }
      })

      // Convert to base64
      const imageBuffer = finalCanvas.toBuffer('image/png')
      const base64Image = imageBuffer.toString('base64')

      console.log('[handwriting-renderer] Successfully rendered handwritten notes')

      return {
        imageUrl: '',
        imageData: base64Image
      }
    } catch (error) {
      console.error('[handwriting-renderer] Rendering error:', error)
      throw error
    }
  }

  /**
   * Parse markdown into structured sections
   */
  private static parseMarkdown(markdown: string) {
    const lines = markdown.split('\n').map(l => l.trim()).filter(l => l)

    const sections = {
      title: '',
      gradeLevel: '',
      subject: '',
      intro: '',
      bullets: [] as string[],
      quickCheck: [] as Array<{ question: string; answer?: string }>
    }

    let currentSection: 'title' | 'meta' | 'intro' | 'bullets' | 'questions' = 'title'
    let currentQuestion: { question: string; answer?: string } | null = null

    for (const line of lines) {
      // Title
      if (line.startsWith('# ')) {
        sections.title = line.substring(2).trim()
        currentSection = 'meta'
        continue
      }

      // Metadata
      if (line.startsWith('**Grade Level:**')) {
        sections.gradeLevel = line.replace('**Grade Level:**', '').trim()
        continue
      }
      if (line.startsWith('**Subject:**')) {
        sections.subject = line.replace('**Subject:**', '').trim()
        continue
      }

      // Key Points section
      if (line.startsWith('## Key Points')) {
        currentSection = 'bullets'
        continue
      }

      // Quick Check section
      if (line.startsWith('## Quick Check')) {
        currentSection = 'questions'
        continue
      }

      // Bullet points
      if (currentSection === 'bullets' && line.startsWith('•')) {
        sections.bullets.push(line.substring(1).trim())
        continue
      }

      // Questions
      if (currentSection === 'questions') {
        const questionMatch = line.match(/^(\d+)\.\s+(.+)/)
        if (questionMatch) {
          // Save previous question if exists
          if (currentQuestion) {
            sections.quickCheck.push(currentQuestion)
          }
          currentQuestion = { question: questionMatch[2].trim() }
          continue
        }

        // Answer
        if (currentQuestion && line.startsWith('*Answer:')) {
          currentQuestion.answer = line.replace('*Answer:', '').replace(/\*/g, '').trim()
          continue
        }
      }

      // Intro (everything before Key Points that's not metadata)
      if (currentSection === 'meta' && !line.startsWith('**') && !line.startsWith('##')) {
        sections.intro += (sections.intro ? ' ' : '') + line
        currentSection = 'intro'
        continue
      }
      if (currentSection === 'intro' && !line.startsWith('**') && !line.startsWith('##')) {
        sections.intro += ' ' + line
      }
    }

    // Save last question
    if (currentQuestion) {
      sections.quickCheck.push(currentQuestion)
    }

    return sections
  }

  /**
   * Wrap text to fit within max width
   */
  private static wrapText(text: string, maxWidth: number, fontSize: number): string[] {
    const words = text.split(/\s+/)
    const lines: string[] = []
    let currentLine = ''

    // Note: This is a simple approximation. In real canvas, we'd measure with ctx.measureText()
    const avgCharWidth = fontSize * 0.55

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const estimatedWidth = testLine.length * avgCharWidth

      if (estimatedWidth > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines
  }
}
