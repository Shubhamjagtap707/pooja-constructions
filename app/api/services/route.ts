import { type NextRequest, NextResponse } from "next/server"
import { getServices, saveServices, type Service, saveActivity } from "@/lib/drive-service"

export async function GET() {
  try {
    const services = await getServices()
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    // Return empty array instead of error to prevent UI breaking
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const services = (await request.json()) as Service[]
    const success = await saveServices(services)

    if (success) {
      // Log activity
      await saveActivity({
        action: "Updated services",
        item: "Multiple services",
        time: new Date().toISOString(),
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to save services" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error saving services:", error)
    return NextResponse.json({ error: "Failed to save services" }, { status: 500 })
  }
}

