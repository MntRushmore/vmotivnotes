import { jsPDF } from 'jspdf'
import type { TutorNote } from '@/types'

/**
 * Generate a beautifully formatted PDF from tutor note
 */
export async function generateNotePDF(note: TutorNote): Promise<Blob> {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  let yPosition = margin

  // VMotiv8 Brand Colors
  const primaryColor = [26, 32, 44] // primary-800
  const accentColor = [217, 119, 6] // gold-600
  const lightGray = [245, 245, 245]

  // Helper function to add new page if needed
  const checkAndAddPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage()
      yPosition = margin
      return true
    }
    return false
  }

  // Helper function to wrap text
  const wrapText = (text: string, maxWidth: number): string[] => {
    return pdf.splitTextToSize(text, maxWidth)
  }

  // ==================== HEADER ====================
  // VMotiv8 Logo Area (decorative rectangle)
  pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  pdf.rect(0, 0, pageWidth, 15, 'F')

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('VMotiv8 Notes', margin, 10)

  // Gold accent line
  pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2])
  pdf.setLineWidth(1)
  pdf.line(0, 15, pageWidth, 15)

  yPosition = 30

  // ==================== TITLE ====================
  pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  pdf.setFontSize(24)
  pdf.setFont('helvetica', 'bold')

  const titleLines = wrapText(note.title, contentWidth)
  titleLines.forEach(line => {
    pdf.text(line, margin, yPosition)
    yPosition += 10
  })

  yPosition += 5

  // Decorative underline
  pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2])
  pdf.setLineWidth(0.5)
  pdf.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 10

  // ==================== INTRODUCTION ====================
  checkAndAddPage(20)

  pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2])
  const introHeight = 15
  pdf.roundedRect(margin, yPosition, contentWidth, introHeight, 3, 3, 'F')

  pdf.setTextColor(60, 60, 60)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'normal')

  const introLines = wrapText(note.intro, contentWidth - 10)
  let introY = yPosition + 5
  introLines.forEach(line => {
    pdf.text(line, margin + 5, introY)
    introY += 5
  })

  yPosition += Math.max(introHeight, introLines.length * 5 + 5) + 10

  // ==================== KEY POINTS ====================
  checkAndAddPage(15)

  pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Key Points', margin, yPosition)
  yPosition += 8

  pdf.setTextColor(60, 60, 60)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'normal')

  note.bullets.forEach((point) => {
    checkAndAddPage(15)

    // Bullet point with gold circle
    pdf.setFillColor(accentColor[0], accentColor[1], accentColor[2])
    pdf.circle(margin + 2, yPosition - 1.5, 1.5, 'F')

    // Point text
    const pointLines = wrapText(`${point}`, contentWidth - 10)
    pointLines.forEach((line, lineIndex) => {
      pdf.text(line, margin + 8, yPosition + (lineIndex * 5))
    })

    yPosition += pointLines.length * 5 + 3
  })

  yPosition += 5

  // ==================== QUICK CHECK ====================
  if (note.quickCheck && note.quickCheck.length > 0) {
    checkAndAddPage(15)

    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Quick Check', margin, yPosition)
    yPosition += 8

    note.quickCheck.forEach((item, index) => {
      checkAndAddPage(25)

      // Question
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')

      const qLines = wrapText(`Q${index + 1}: ${item.question}`, contentWidth - 5)
      qLines.forEach((line, lineIndex) => {
        pdf.text(line, margin, yPosition + (lineIndex * 5))
      })
      yPosition += qLines.length * 5 + 3

      // Answer (if available)
      if (item.answer) {
        pdf.setTextColor(100, 100, 100)
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'italic')

        const aLines = wrapText(`Answer: ${item.answer}`, contentWidth - 5)
        aLines.forEach((line, lineIndex) => {
          pdf.text(line, margin + 5, yPosition + (lineIndex * 5))
        })
        yPosition += aLines.length * 5 + 7
      } else {
        yPosition += 7
      }
    })
  }

  // ==================== FOOTER ====================
  const pageCount = pdf.getNumberOfPages()

  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i)

    // Footer line
    pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2])
    pdf.setLineWidth(0.3)
    pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15)

    // Page number
    pdf.setTextColor(120, 120, 120)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' })

    // VMotiv8 branding
    pdf.setFontSize(8)
    pdf.text('Generated with VMotiv8 Notes', margin, pageHeight - 10)
    pdf.text('vmotiv8.com', pageWidth - margin, pageHeight - 10, { align: 'right' })
  }

  // Return as blob
  return pdf.output('blob')
}
