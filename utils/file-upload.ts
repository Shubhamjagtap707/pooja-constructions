import { supabase } from "@/lib/supabase"

export async function uploadFile(file: File, bucketName: string): Promise<string | null> {
  try {
    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Error uploading file:", error)
      return null
    }

    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(data.path)

    return publicUrlData.publicUrl
  } catch (error) {
    console.error("Error uploading file:", error)
    return null
  }
}

// Function to create a placeholder image URL with specific dimensions
export function getPlaceholderImage(width: number, height: number): string {
  return `/placeholder.svg?height=${height}&width=${width}`
}

