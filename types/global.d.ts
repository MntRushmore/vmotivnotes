declare global {
  var jobFiles: Map<string, {
    fileBuffer: Buffer
    options: {
      summaryLength?: 'short' | 'medium' | 'long'
      style?: 'notes' | 'outline' | 'summary'
    }
  }> | undefined
}

export {}