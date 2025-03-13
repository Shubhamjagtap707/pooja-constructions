import { type NextRequest, NextResponse } from "next/server"
import { getProjects, saveProjects, type Project, saveActivity } from "@/lib/drive-service"

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    // Return empty array instead of error to prevent UI breaking
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const projects = (await request.json()) as Project[]
    const success = await saveProjects(projects)

    if (success) {
      // Log activity
      await saveActivity({
        action: "Updated projects",
        item: "Multiple projects",
        time: new Date().toISOString(),
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to save projects" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error saving projects:", error)
    return NextResponse.json({ error: "Failed to save projects" }, { status: 500 })
  }
}

