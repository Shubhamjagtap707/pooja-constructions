"use client"

import { useState } from "react"

interface UploadOptions {
  folder?: string
  onSuccess?: (url: string) => void
  onError?: (error: Error) => void
}

export function useDriveUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)

  const uploadFile = async (file: File, options: UploadOptions = {}) => {
    setIsUploading(true)
    setProgress(0)
    setError(null)

    try {
      // Create form data
      const formData = new FormData()
      formData.append("file", file)
      if (options.folder) {
        formData.append("folder", options.folder)
      }

      // Upload file
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload file")
      }

      const data = await response.json()

      if (options.onSuccess) {
        options.onSuccess(data.url)
      }

      return data.url
    } catch (error) {
      console.error("Error uploading file:", error)
      setError(error instanceof Error ? error : new Error("Unknown error"))

      if (options.onError) {
        options.onError(error instanceof Error ? error : new Error("Unknown error"))
      }

      return null
    } finally {
      setIsUploading(false)
    }
  }

  return {
    uploadFile,
    isUploading,
    progress,
    error,
  }
}

