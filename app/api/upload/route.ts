import { type NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { JWT } from "google-auth-library"
import { Readable } from "stream"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "website_uploads"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Initialize Google Drive client
    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive"],
    })

    const drive = google.drive({ version: "v3", auth })

    // Get folder ID (create if it doesn't exist)
    const folderId = await getFolderId(drive, folder)

    // Upload file to Google Drive
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const readable = new Readable()
    readable._read = () => {} // _read is required but you can noop it
    readable.push(buffer)
    readable.push(null)

    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: [folderId],
      },
      media: {
        mimeType: file.type,
        body: readable,
      },
      fields: "id,webViewLink",
    })

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId: response.data.id as string,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    })

    // Get direct download URL
    const fileResponse = await drive.files.get({
      fileId: response.data.id as string,
      fields: "webContentLink",
    })

    return NextResponse.json({
      success: true,
      url: fileResponse.data.webContentLink,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

// Helper function to get or create a folder
async function getFolderId(drive: any, folderName: string) {
  // Check if folder exists
  const response = await drive.files.list({
    q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id)",
  })

  if (response.data.files && response.data.files.length > 0) {
    return response.data.files[0].id
  }

  // Create folder if it doesn't exist
  const folderResponse = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    },
    fields: "id",
  })

  return folderResponse.data.id
}

