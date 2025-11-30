/**
 * Handwriting generation service using Google Gemini (Nano Banana)
 * Generates handwritten-style notes images using Gemini's image generation capabilities
 */

interface GenerateHandwritingOptions {
  text: string
  style?: 'notes' | 'outline' | 'summary'
}

interface HandwritingResult {
  imageUrl: string
  imageData?: string // base64 encoded image
}

export class HandwritingService {
  /**
   * Generate handwritten-style notes image using canvas (Production-ready)
   */
  static async generateHandwriting(options: GenerateHandwritingOptions): Promise<HandwritingResult> {
    const { text, style = 'notes' } = options

    try {
      console.log('[handwriting-service] Generating handwritten notes with canvas renderer...')

      const canvas = require('canvas')
      const { createCanvas } = canvas

      // Canvas configuration - larger for more realistic handwriting
      const canvasWidth = 1200
      const lineHeight = 55
      const padding = 80
      const maxWidth = canvasWidth - (padding * 2) - 60
      const fontSize = 24

      // Split text into lines for proper wrapping
      const words = text.split(/\s+/)
      const lines: string[] = []
      let currentLine = ''

      // Create temp canvas for measuring text
      const tempCanvas = createCanvas(100, 100)
      const tempCtx = tempCanvas.getContext('2d')
      tempCtx.font = `${fontSize}px "Bradley Hand", "Brush Script MT", "Lucida Handwriting", cursive`

      // Word wrap algorithm
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word
        const metrics = tempCtx.measureText(testLine)

        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      }
      if (currentLine) {
        lines.push(currentLine)
      }

      // Calculate canvas height based on content
      const canvasHeight = Math.max(800, (lines.length * lineHeight) + (padding * 2) + 150)

      // Create final canvas
      const finalCanvas = createCanvas(canvasWidth, canvasHeight)
      const ctx = finalCanvas.getContext('2d')

      // Background - aged paper color with slight gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
      gradient.addColorStop(0, '#fffef9')
      gradient.addColorStop(1, '#fffef5')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      // Add realistic paper texture with more variation
      ctx.fillStyle = 'rgba(240, 235, 220, 0.15)'
      for (let i = 0; i < 100; i++) {
        const size = Math.random() * 4 + 1
        ctx.fillRect(
          Math.random() * canvasWidth,
          Math.random() * canvasHeight,
          size,
          size
        )
      }

      // Add subtle paper grain
      ctx.fillStyle = 'rgba(230, 225, 210, 0.08)'
      for (let i = 0; i < 200; i++) {
        ctx.fillRect(
          Math.random() * canvasWidth,
          Math.random() * canvasHeight,
          1,
          1
        )
      }

      // Draw slightly imperfect lines (notebook paper)
      ctx.strokeStyle = '#d8d4cd'
      ctx.lineWidth = 1
      for (let y = padding; y < canvasHeight - padding; y += lineHeight) {
        ctx.beginPath()
        // Add slight waviness to lines
        for (let x = padding; x < canvasWidth - padding; x += 10) {
          const wave = Math.sin(x * 0.01) * 0.5
          if (x === padding) {
            ctx.moveTo(x, y + wave)
          } else {
            ctx.lineTo(x, y + wave)
          }
        }
        ctx.stroke()
      }

      // Draw margin line (red/pink line on left) with slight imperfection
      ctx.strokeStyle = '#ff9db5'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      for (let y = padding - 30; y < canvasHeight - padding + 30; y += 5) {
        const wobble = Math.random() * 2 - 1
        if (y === padding - 30) {
          ctx.moveTo(padding + 55 + wobble, y)
        } else {
          ctx.lineTo(padding + 55 + wobble, y)
        }
      }
      ctx.stroke()

      // Add header with handwritten style
      ctx.fillStyle = '#1a1a2e'
      ctx.font = `bold ${fontSize + 8}px "Bradley Hand", "Brush Script MT", cursive`
      const headers = {
        notes: 'Study Notes',
        outline: 'Outline',
        summary: 'Summary'
      }
      const header = headers[style as keyof typeof headers] || 'Notes'

      // Header with slight randomness
      const headerX = padding + 65 + (Math.random() * 4 - 2)
      const headerY = padding - 35
      ctx.fillText(header, headerX, headerY)

      // Underline header with hand-drawn effect
      const headerWidth = ctx.measureText(header).width
      ctx.strokeStyle = '#1a1a2e'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(headerX, headerY + 8)
      // Slightly wavy underline
      for (let x = headerX; x < headerX + headerWidth; x += 10) {
        const wave = Math.sin(x * 0.1) * 0.5
        ctx.lineTo(x, headerY + 8 + wave)
      }
      ctx.lineTo(headerX + headerWidth, headerY + 8)
      ctx.stroke()

      // Draw main text content with realistic handwriting variations
      ctx.font = `${fontSize}px "Bradley Hand", "Brush Script MT", "Lucida Handwriting", cursive`
      ctx.textBaseline = 'top'

      let y = padding + 15

      lines.forEach((line) => {
        // Vary ink color slightly (pen pressure simulation)
        const inkShade = 40 + Math.random() * 20
        ctx.fillStyle = `rgb(${inkShade}, ${inkShade + 10}, ${inkShade + 30})`

        // More natural position variation per line
        const xOffset = Math.random() * 6 - 3
        const yOffset = Math.random() * 4 - 2

        // Slight rotation for natural writing
        const rotation = (Math.random() * 0.4 - 0.2) * Math.PI / 180

        ctx.save()
        ctx.translate(padding + 65 + xOffset, y + yOffset)
        ctx.rotate(rotation)

        // Draw each word with slight variations
        const lineWords = line.split(' ')
        let wordX = 0

        lineWords.forEach((word, wordIndex) => {
          // Slight word spacing variation
          const wordSpacing = wordIndex > 0 ? 8 + Math.random() * 4 : 0
          wordX += wordSpacing

          // Character-level variation for more realistic look
          const charVariation = Math.random() * 2 - 1
          ctx.fillText(word, wordX, charVariation)

          // Measure for next word
          const metrics = ctx.measureText(word + ' ')
          wordX += metrics.width
        })

        ctx.restore()
        y += lineHeight
      })

      // Convert to base64
      const imageBuffer = finalCanvas.toBuffer('image/png')
      const base64Image = imageBuffer.toString('base64')

      console.log('[handwriting-service] Successfully generated handwritten notes')

      return {
        imageUrl: '',
        imageData: base64Image
      }
    } catch (error) {
      console.error('[handwriting-service] Handwriting generation error:', error)
      throw error
    }
  }
}
