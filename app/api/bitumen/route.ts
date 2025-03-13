import { type NextRequest, NextResponse } from "next/server"
import { getBitumenProducts, saveBitumenProducts, type BitumenProduct, saveActivity } from "@/lib/drive-service"

export async function GET() {
  try {
    const products = await getBitumenProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching bitumen products:", error)
    // Return empty array instead of error to prevent UI breaking
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const products = (await request.json()) as BitumenProduct[]
    const success = await saveBitumenProducts(products)

    if (success) {
      // Log activity
      await saveActivity({
        action: "Updated bitumen products",
        item: "Multiple products",
        time: new Date().toISOString(),
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to save bitumen products" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error saving bitumen products:", error)
    return NextResponse.json({ error: "Failed to save bitumen products" }, { status: 500 })
  }
}

