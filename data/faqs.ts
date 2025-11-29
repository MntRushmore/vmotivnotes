import { FAQEntry, TroubleshootingGuide } from '@/types'

export const faqs: FAQEntry[] = [
  {
    id: 'faq-1',
    question: 'How do I upload a document for summarization?',
    answer: 'Navigate to the Upload page from the sidebar, then either drag and drop your PDF file or click to browse. Once uploaded, the system will automatically process and generate a summary based on your preferred mode (9th grade or SAT prep).',
    category: 'upload'
  },
  {
    id: 'faq-2',
    question: 'What file formats are supported?',
    answer: 'Currently, VMotiv supports PDF files. The system can extract text from both text-based PDFs and scanned documents using OCR technology.',
    category: 'upload'
  },
  {
    id: 'faq-3',
    question: 'How long does it take to generate a summary?',
    answer: 'Generation time depends on the document size and complexity. Typically, a standard document takes 30-60 seconds to process. You can monitor progress on the generation status page.',
    category: 'generation'
  },
  {
    id: 'faq-4',
    question: 'Can I change my default summary mode?',
    answer: 'Yes! Go to Settings and select your preferred summary mode (9th grade or SAT prep). You can also adjust notification preferences and other settings there.',
    category: 'general'
  },
  {
    id: 'faq-5',
    question: 'Where can I find my generated summaries?',
    answer: 'All your generated summaries are available in the Library. You can search, filter by category, and sort them by date or alphabetically. Click on any item to view or download the PDF.',
    category: 'library'
  },
  {
    id: 'faq-6',
    question: 'How do I delete an item from my library?',
    answer: 'In the Library, hover over any PDF card and click the delete icon (trash bin). Confirm the deletion when prompted. This action cannot be undone.',
    category: 'library'
  },
  {
    id: 'faq-7',
    question: 'What should I do if my upload fails?',
    answer: 'First, ensure your file is a valid PDF and under the size limit. Check your internet connection and try again. If the issue persists, contact support with details about the file size and error message.',
    category: 'troubleshooting'
  },
  {
    id: 'faq-8',
    question: 'Can I export my data?',
    answer: 'Yes, you can export all your data from the Settings page under the Data Management section. Click "Export Data" to generate a JSON file containing your profile, library items, and usage history.',
    category: 'general'
  },
  {
    id: 'faq-9',
    question: 'Is my data secure?',
    answer: 'Absolutely. We take data security seriously. All uploads are processed securely, and your data is stored with encryption. We never share your documents or personal information with third parties.',
    category: 'general'
  },
  {
    id: 'faq-10',
    question: 'What are the different SAT topics available?',
    answer: 'VMotiv supports all major SAT topics across Math, Reading, Writing, and Science categories. When generating a summary, you can select the relevant topic to ensure the content is formatted appropriately for SAT preparation.',
    category: 'generation'
  },
  {
    id: 'faq-11',
    question: 'Can I customize the summary length?',
    answer: 'Currently, summary length is optimized based on your selected mode (9th grade or SAT). Future updates will include more granular control over summary length and style.',
    category: 'generation'
  },
  {
    id: 'faq-12',
    question: 'Why is my PDF taking longer than usual to process?',
    answer: 'Large files, scanned documents, or complex layouts may take longer to process. The system uses OCR for scanned documents which requires additional time. If processing exceeds 5 minutes, please contact support.',
    category: 'troubleshooting'
  }
]

export const troubleshootingGuides: TroubleshootingGuide[] = [
  {
    id: 'guide-1',
    title: 'Upload Issues',
    description: 'Document not uploading or upload stuck',
    icon: 'Upload',
    steps: [
      'Check your file is a valid PDF under the size limit',
      'Verify your internet connection is stable',
      'Clear browser cache and try again',
      'Try uploading a different file to test',
      'Contact support if the issue persists'
    ]
  },
  {
    id: 'guide-2',
    title: 'Generation Problems',
    description: 'Summary generation failing or taking too long',
    icon: 'AlertCircle',
    steps: [
      'Check the generation status page for progress',
      'Wait at least 2 minutes for standard documents',
      'Refresh the page to see updated status',
      'If failed, check the error message for details',
      'Retry the generation from the upload page'
    ]
  },
  {
    id: 'guide-3',
    title: 'Library Not Loading',
    description: 'Unable to access or view library items',
    icon: 'Library',
    steps: [
      'Refresh the library page',
      'Clear your browser cache',
      'Check if filters are applied that hide items',
      'Try a different browser',
      'Contact support with browser details'
    ]
  },
  {
    id: 'guide-4',
    title: 'Account Settings',
    description: 'Issues with profile or preferences',
    icon: 'Settings',
    link: '/settings',
    steps: [
      'Ensure all required fields are filled',
      'Check email format is valid',
      'Save changes before navigating away',
      'Refresh to see updated information',
      'Reset settings if issues persist'
    ]
  },
  {
    id: 'guide-5',
    title: 'PDF Download Issues',
    description: 'Cannot download or view generated PDFs',
    icon: 'Download',
    steps: [
      'Check your browser allows downloads from this site',
      'Disable popup blockers temporarily',
      'Ensure you have sufficient storage space',
      'Try right-click and "Save As" on the PDF link',
      'Contact support if downloads are consistently failing'
    ]
  },
  {
    id: 'guide-6',
    title: 'Getting Started',
    description: 'New to VMotiv? Start here',
    icon: 'HelpCircle',
    link: '/onboarding',
    steps: [
      'Complete the onboarding wizard to set up your profile',
      'Upload your first document from the Upload page',
      'Monitor progress on the generation status page',
      'Access your summaries in the Library',
      'Adjust preferences in Settings as needed'
    ]
  }
]
