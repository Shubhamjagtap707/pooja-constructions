"use server"

import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { redirect } from "next/navigation"

// Define admin types
export type AdminRole = "admin" | "super_admin"

export interface Admin {
  userId: string
  name: string
  role: AdminRole
}

// Create a Supabase client for server-side operations
const createClient = () => {
  const cookieStore = cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}

// Hardcoded admin users for now (in a real app, these would be in the database)
const ADMIN_USERS: Record<string, Admin & { password: string }> = {
  shubham: {
    userId: "shubham",
    password: "admin123",
    name: "Shubham",
    role: "super_admin",
  },
  pooja: {
    userId: "pooja",
    password: "admin123",
    name: "Pooja",
    role: "admin",
  },
  arati: {
    userId: "arati",
    password: "admin123",
    name: "Arati",
    role: "admin",
  },
  chandrakant: {
    userId: "chandrakant",
    password: "admin123",
    name: "Chandrakant",
    role: "admin",
  },
}

export async function login(userId: string, password: string) {
  // Check if user exists and password matches
  const admin = ADMIN_USERS[userId.toLowerCase()]

  if (admin && admin.password === password) {
    const { password: _, ...adminData } = admin

    // In a real app, we would use Supabase Auth or store a session
    // For now, we'll just set a cookie
    const cookieStore = cookies()
    cookieStore.set("admin_auth", "true", { path: "/" })
    cookieStore.set("admin_data", JSON.stringify(adminData), { path: "/" })

    return { success: true, admin: adminData }
  }

  return { success: false, error: "Invalid credentials" }
}

export async function logout() {
  const cookieStore = cookies()
  cookieStore.set("admin_auth", "", { path: "/", maxAge: 0 })
  cookieStore.set("admin_data", "", { path: "/", maxAge: 0 })

  redirect("/admin/login")
}

export async function getSession() {
  const cookieStore = cookies()
  const auth = cookieStore.get("admin_auth")?.value
  const adminData = cookieStore.get("admin_data")?.value

  if (auth === "true" && adminData) {
    return { isAuthenticated: true, admin: JSON.parse(adminData) as Admin }
  }

  return { isAuthenticated: false, admin: null }
}

