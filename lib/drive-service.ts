import { google } from "googleapis"
import { JWT } from "google-auth-library"

// Define types for our data models
export interface Project {
  id: number
  title: string
  category: string
  location: string
  year: string
  featured: boolean
  image: string
}

export interface Service {
  id: number
  title: string
  description: string
  features: string[]
  image: string
}

export interface BitumenProduct {
  id: number
  title: string
  description: string
  specifications: string[]
  applications: string[]
  image: string
}

export interface TeamMember {
  id: number
  name: string
  position: string
  bio: string
  image: string
}

export interface Activity {
  action: string
  item: string
  time: string
}

// File IDs for each data type (you'll need to create these files in Google Drive and get their IDs)
const FILE_IDS = {
  PROJECTS: process.env.GOOGLE_DRIVE_PROJECTS_FILE_ID || "",
  SERVICES: process.env.GOOGLE_DRIVE_SERVICES_FILE_ID || "",
  BITUMEN_PRODUCTS: process.env.GOOGLE_DRIVE_BITUMEN_FILE_ID || "",
  TEAM_MEMBERS: process.env.GOOGLE_DRIVE_TEAM_FILE_ID || "",
  ACTIVITIES: process.env.GOOGLE_DRIVE_ACTIVITIES_FILE_ID || "",
}

// Cache to reduce API calls
const cache: Record<string, { data: any; timestamp: number }> = {}
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Initialize Google Drive client
const initDriveClient = async () => {
  // Format the private key correctly
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || ""
  const formattedKey = privateKey.replace(/\\n/g, "\n")

  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: formattedKey,
    scopes: ["https://www.googleapis.com/auth/drive"],
  })

  return google.drive({ version: "v3", auth })
}

// Create file if it doesn't exist
async function createFileIfNotExists(fileId: string, cacheKey: string) {
  try {
    const drive = await initDriveClient()

    // Try to get the file
    try {
      await drive.files.get({
        fileId: fileId,
      })
      // File exists, no need to create
      return
    } catch (error) {
      // File doesn't exist, create it
      console.log(`File ${fileId} not found, creating empty file...`)

      // Create a new file with empty array
      const response = await drive.files.create({
        requestBody: {
          name: `${cacheKey}.json`,
          mimeType: "application/json",
        },
        media: {
          mimeType: "application/json",
          body: JSON.stringify([]),
        },
        fields: "id",
      })

      console.log(`Created new file with ID: ${response.data.id}`)

      // Update the cache
      cache[cacheKey] = { data: [], timestamp: Date.now() }
    }
  } catch (error) {
    console.error(`Error creating file for ${cacheKey}:`, error)
  }
}

// Read data from a file\
export const readFile = async <T>(fileId: string, cacheKey: string)
: Promise<T[]> =>
{
  // Check cache first
  const now = Date.now()
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data as T[];
  }

  try {
    const drive = await initDriveClient()

    try {
      const response = await drive.files.get({
        fileId: fileId,
        alt: "media",
      })

      const data = response.data as T[]

      // Update cache
      cache[cacheKey] = { data, timestamp: now }

      return data;
    } catch (error) {
      // If file not found, create it
      if ((error as any).code === 404) {
        await createFileIfNotExists(fileId, cacheKey)
        return [];
      }
      throw error
    }
  } catch (error) {
    console.error(`Error reading file ${fileId}:`, error)
    return [];
  }
}

// Write data to a file
export const writeFile = async <T>(fileId: string, data: T[], cacheKey: string)
: Promise<boolean> =>
{
  try {
    const drive = await initDriveClient()
    await drive.files.update({
      fileId,
      media: {
        mimeType: "application/json",
        body: JSON.stringify(data, null, 2),
      },
    })

    // Update cache
    cache[cacheKey] = { data, timestamp: Date.now() }

    return true;
  } catch (error) {
    console.error(`Error writing to file ${fileId}:`, error)
    return false;
  }
}

// Projects CRUD operations
export const getProjects = async (): Promise<Project[]> => {
  return readFile<Project>(FILE_IDS.PROJECTS, "projects")
}

export const saveProjects = async (projects: Project[]): Promise<boolean> => {
  return writeFile<Project>(FILE_IDS.PROJECTS, projects, "projects")
}

// Services CRUD operations
export const getServices = async (): Promise<Service[]> => {
  return readFile<Service>(FILE_IDS.SERVICES, "services")
}

export const saveServices = async (services: Service[]): Promise<boolean> => {
  return writeFile<Service>(FILE_IDS.SERVICES, services, "services")
}

// Bitumen Products CRUD operations
export const getBitumenProducts = async (): Promise<BitumenProduct[]> => {
  return readFile<BitumenProduct>(FILE_IDS.BITUMEN_PRODUCTS, "bitumen")
}

export const saveBitumenProducts = async (products: BitumenProduct[]): Promise<boolean> => {
  return writeFile<BitumenProduct>(FILE_IDS.BITUMEN_PRODUCTS, products, "bitumen")
}

// Team Members CRUD operations
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  return readFile<TeamMember>(FILE_IDS.TEAM_MEMBERS, "team")
}

export const saveTeamMembers = async (members: TeamMember[]): Promise<boolean> => {
  return writeFile<TeamMember>(FILE_IDS.TEAM_MEMBERS, members, "team")
}

// Activities CRUD operations
export const getActivities = async (): Promise<Activity[]> => {
  return readFile<Activity>(FILE_IDS.ACTIVITIES, "activities")
}

export const saveActivity = async (activity: Activity): Promise<boolean> => {
  const activities = await getActivities()
  const updatedActivities = [activity, ...activities.slice(0, 9)] // Keep only the 10 most recent activities
  return writeFile<Activity>(FILE_IDS.ACTIVITIES, updatedActivities, "activities")
}

