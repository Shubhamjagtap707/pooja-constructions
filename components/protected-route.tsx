"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Don't redirect if we're already on the login page
  const isLoginPage = pathname.includes("/admin/login")

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router, isLoginPage])

  if (!isAuthenticated && !isLoginPage) {
    return null
  }

  return <>{children}</>
}

