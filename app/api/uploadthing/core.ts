import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  pdfUploader: f({
    pdf: { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .onUploadError(({ error }) => {
      console.error("PDF upload error:", error)
    })
    .onUploadComplete(async ({ file }) => {
      console.log("PDF upload complete:", file.url)
      return { url: file.url, key: file.key, name: file.name, size: file.size }
    }),
  
  imageUploader: f({
    image: { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .onUploadError(({ error }) => {
      console.error("Image upload error:", error)
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Image upload complete:", file.url)
      return { url: file.url, key: file.key, name: file.name, size: file.size }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
