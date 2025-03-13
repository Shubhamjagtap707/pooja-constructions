import { type NextRequest, NextResponse } from "next/server"
import { getActivities, saveActivity, type Activity } from "@/lib/drive-service"

export async function GET() {
  try {
    const activities = await getActivities()
    return NextResponse.json(activities)
  } catch (error) {
    console.error("Error fetching activities:", error)
    // Return empty array instead of error to prevent UI breaking
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const activity = (await request.json()) as Activity
    const success = await saveActivity(activity)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to save activity" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error saving activity:", error)
    return NextResponse.json({ error: "Failed to save activity" }, { status: 500 })
  }
}

