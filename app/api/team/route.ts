import { type NextRequest, NextResponse } from "next/server"
import { getTeamMembers, saveTeamMembers, type TeamMember, saveActivity } from "@/lib/drive-service"

export async function GET() {
  try {
    const members = await getTeamMembers()
    return NextResponse.json(members)
  } catch (error) {
    console.error("Error fetching team members:", error)
    // Return empty array instead of error to prevent UI breaking
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const members = (await request.json()) as TeamMember[]
    const success = await saveTeamMembers(members)

    if (success) {
      // Log activity
      await saveActivity({
        action: "Updated team members",
        item: "Multiple members",
        time: new Date().toISOString(),
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to save team members" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error saving team members:", error)
    return NextResponse.json({ error: "Failed to save team members" }, { status: 500 })
  }
}

