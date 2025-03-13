"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function AdminSettings() {
  const { currentAdmin } = useAuth()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Website settings
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    showProjectsOnHomepage: true,
    showTestimonialsOnHomepage: true,
    contactEmail: "info@poojaconstructions.com",
    contactPhone: "+91 98765 43210",
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("website_settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    // In a real app, this would make a server request to change the password
    setIsChangingPassword(true)
    setTimeout(() => {
      toast.success("Password changed successfully")
      setPassword("")
      setConfirmPassword("")
      setIsChangingPassword(false)
    }, 1000)
  }

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    const newValue = type === "checkbox" ? checked : value

    setSettings({
      ...settings,
      [name]: newValue,
    })
  }

  const saveSettings = () => {
    localStorage.setItem("website_settings", JSON.stringify(settings))
    toast.success("Settings saved successfully")
  }

  return (
    <div className="py-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-medium mb-6">Account Settings</h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-md font-medium mb-4">Change Password</h4>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleChangePassword}
                  disabled={isChangingPassword}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md disabled:opacity-70"
                >
                  {isChangingPassword ? "Changing..." : "Change Password"}
                </motion.button>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-md font-medium mb-4">Website Settings</h4>
            <p className="text-gray-600 mb-4">These settings affect how your website appears to visitors.</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="maintenance-mode"
                  name="maintenanceMode"
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={handleSettingChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="maintenance-mode" className="ml-2 block text-sm text-gray-900">
                  Enable Maintenance Mode
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="show-projects"
                  name="showProjectsOnHomepage"
                  type="checkbox"
                  checked={settings.showProjectsOnHomepage}
                  onChange={handleSettingChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="show-projects" className="ml-2 block text-sm text-gray-900">
                  Show Projects on Homepage
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="show-testimonials"
                  name="showTestimonialsOnHomepage"
                  type="checkbox"
                  checked={settings.showTestimonialsOnHomepage}
                  onChange={handleSettingChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="show-testimonials" className="ml-2 block text-sm text-gray-900">
                  Show Testimonials on Homepage
                </label>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  id="contact-email"
                  name="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={handleSettingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  id="contact-phone"
                  name="contactPhone"
                  type="text"
                  value={settings.contactPhone}
                  onChange={handleSettingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveSettings}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
              >
                Save Settings
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

