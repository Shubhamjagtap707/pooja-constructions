"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Define admin types
type AdminRole = "admin" | "super_admin"

interface Admin {
  userId: string
  name: string
  role: AdminRole
}

type AuthContextType = {
  isAuthenticated: boolean
  currentAdmin: Admin | null
  login: (userId: string, password: string) => Promise<boolean>
  logout: () => void
}

// Define our admin users
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

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated on mount
    const auth = localStorage.getItem("admin_auth")
    const adminData = localStorage.getItem("admin_data")

    if (auth === "true" && adminData) {
      setIsAuthenticated(true)
      setCurrentAdmin(JSON.parse(adminData))
    }
  }, [])

  const login = async (userId: string, password: string): Promise<boolean> => {
    // Check if user exists and password matches
    const admin = ADMIN_USERS[userId.toLowerCase()]

    if (admin && admin.password === password) {
      const { password: _, ...adminData } = admin
      setIsAuthenticated(true)
      setCurrentAdmin(adminData)

      // Store auth state in localStorage for persistence
      localStorage.setItem("admin_auth", "true")
      localStorage.setItem("admin_data", JSON.stringify(adminData))

      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setCurrentAdmin(null)
    localStorage.removeItem("admin_auth")
    localStorage.removeItem("admin_data")
    router.push("/admin/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentAdmin, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

