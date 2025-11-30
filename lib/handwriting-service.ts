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
  private static apiKey = process.env.GEMINI_API_KEY || process.env.NANO_BANANA_API_KEY

  /**
   * Generate handwritten-style notes image using Gemini API
   */
  static async generateHandwriting(options: GenerateHandwritingOptions): Promise<HandwritingResult> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY or NANO_BANANA_API_KEY not configured')
    }

    const { text, style = 'notes' } = options

    // Create prompt based on style
    const prompt = this.createPrompt(text, style)

    try {
      // Use Gemini 3 Pro Image for better text rendering
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': this.apiKey,
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              responseModalities: ['IMAGE']
            }
          })
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`)
      }

      const data = await response.json()

      // Extract image data from response
      const imageData = this.extractImageData(data)

      return {
        imageUrl: '', // Will be set after uploading to storage
        imageData
      }
    } catch (error) {
      console.error('Handwriting generation error:', error)
      throw error
    }
  }

  /**
   * Create a prompt for generating handwritten-style notes
   */
  private static createPrompt(text: string, style: string): string {
    const styleDescriptions = {
      notes: 'casual, neat handwritten notes on lined notebook paper with natural spacing and occasional underlining of key points',
      outline: 'structured handwritten outline with clear hierarchy, bullet points, and indentation on clean white paper',
      summary: 'organized handwritten summary with headers, key points highlighted, and clear section breaks on white paper'
    }

    const styleDesc = styleDescriptions[style as keyof typeof styleDescriptions] || styleDescriptions.notes

    return `Generate an image of ${styleDesc}. The handwriting should be legible, natural-looking with slight variations in letter size and spacing (as real handwriting would have). Use blue or black ink. The text content to write is:

${text}

Make it look like authentic student notes, with natural handwriting style, proper spacing between lines, and realistic paper texture.`
  }

  /**
   * Extract base64 image data from Gemini API response
   */
  private static extractImageData(responseData: any): string {
    try {
      // Gemini returns images in the response candidates
      const candidate = responseData.candidates?.[0]
      const content = candidate?.content
      const parts = content?.parts || []

      // Find the part containing inline_data (image)
      for (const part of parts) {
        if (part.inline_data?.mime_type?.startsWith('image/')) {
          return part.inline_data.data // base64 encoded image
        }
      }

      throw new Error('No image data found in response')
    } catch (error) {
      console.error('Failed to extract image data:', error)
      throw new Error('Failed to extract generated image from response')
    }
  }
}
