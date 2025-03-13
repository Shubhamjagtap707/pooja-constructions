"use client"

import type React from "react"
import { useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"
import {
  LayoutDashboard,
  LogOut,
  Settings,
  FileText,
  Briefcase,
  Truck,
  Users,
  ChevronRight,
  UserCog,
} from "lucide-react"
import Image from "next/image"
import { AuthProvider } from "@/context/auth-context"
import { useAuth } from "@/context/auth-context"
import { Toaster } from "sonner"
import ProtectedRoute from "@/components/protected-route"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  )
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { logout, currentAdmin } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const currentRoute = pathname.split("/").pop() || ""
  const activeSection = currentRoute === "" ? "dashboard" : currentRoute

  // Check if we're on the login page
  const isLoginPage = pathname.includes("/admin/login")

  // Hide the main navigation bar when in admin panel, but not on login page
  useEffect(() => {
    const navbar = document.querySelector("header")
    if (navbar && !isLoginPage) {
      navbar.style.display = "none"
    }

    // Restore navbar when leaving admin panel
    return () => {
      if (navbar) {
        navbar.style.display = "block"
      }
    }
  }, [isLoginPage])

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    router.push("/admin/login")
  }

  // If we're on the login page, just render the children without the admin layout
  if (isLoginPage) {
    return (
      <>
        <Toaster position="top-right" />
        {children}
      </>
    )
  }

  // Base menu items for all admins
  const baseMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, path: "/admin" },
    { id: "projects", label: "Projects", icon: <Briefcase className="h-5 w-5" />, path: "/admin/projects" },
    { id: "services", label: "Services", icon: <FileText className="h-5 w-5" />, path: "/admin/services" },
    { id: "bitumen", label: "Bitumen Products", icon: <Truck className="h-5 w-5" />, path: "/admin/bitumen" },
    { id: "team", label: "Team Members", icon: <Users className="h-5 w-5" />, path: "/admin/team" },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" />, path: "/admin/settings" },
  ]

  // Add admin management for super admin (Shubham)
  const menuItems =
    currentAdmin?.role === "super_admin"
      ? [
          ...baseMenuItems,
          {
            id: "admin-management",
            label: "Admin Management",
            icon: <UserCog className="h-5 w-5" />,
            path: "/admin/admin-management",
          },
        ]
      : baseMenuItems

  const pageTitle = menuItems.find((item) => item.id === activeSection)?.label || "Dashboard"

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
              <div className="flex flex-col h-0 flex-1 bg-white shadow-lg">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <div className="flex items-center flex-shrink-0 px-4 mb-5">
                    <div className="h-8 w-8 relative mr-2">
                      <Image src="/logo.png" alt="Pooja Constructions" fill className="object-contain" />
                    </div>
                    <span className="text-xl font-bold text-primary">Admin Panel</span>
                  </div>
                  <div className="px-4 py-2 bg-gray-100 mb-2">
                    <p className="text-sm text-gray-600">Logged in as:</p>
                    <p className="font-medium">
                      {currentAdmin?.name} ({currentAdmin?.role === "super_admin" ? "Super Admin" : "Admin"})
                    </p>
                  </div>
                  <nav className="mt-2 flex-1 px-2 space-y-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.path}
                        className={`${
                          activeSection === item.id
                            ? "bg-primary/10 text-primary"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        } group flex items-center px-2 py-3 text-sm font-medium rounded-md w-full transition-colors`}
                      >
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                        {activeSection === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <button
                    onClick={handleLogout}
                    className="flex-shrink-0 group block w-full flex items-center text-red-500 hover:text-red-700"
                  >
                    <div className="flex items-center">
                      <div>
                        <LogOut className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Logout</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col w-0 flex-1 overflow-hidden">
            <main className="flex-1 relative overflow-y-auto focus:outline-none">
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
                    <div className="md:hidden">
                      <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700">
                        <LogOut className="h-5 w-5 mr-1" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

