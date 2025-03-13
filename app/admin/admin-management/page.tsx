"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Eye, EyeOff, Plus } from "lucide-react"
import { useAuth } from "@/context/auth-context"

interface Admin {
  id: string
  userId: string
  name: string
  role: string
}

export default function AdminManagement() {
  const { currentAdmin } = useAuth()
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "1",
      userId: "shubham",
      name: "Shubham",
      role: "super_admin",
    },
    {
      id: "2",
      userId: "pooja",
      name: "Pooja",
      role: "admin",
    },
    {
      id: "3",
      userId: "arati",
      name: "Arati",
      role: "admin",
    },
    {
      id: "4",
      userId: "chandrakant",
      name: "Chandrakant",
      role: "admin",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<any>(null)
  const [newAdmin, setNewAdmin] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "admin",
  })
  const [showPassword, setShowPassword] = useState(false)

  // Load admins from localStorage on mount
  useEffect(() => {
    const savedAdmins = localStorage.getItem("admin_users")
    if (savedAdmins) {
      setAdmins(JSON.parse(savedAdmins))
    }
  }, [])

  // Save admins to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("admin_users", JSON.stringify(admins))
  }, [admins])

  const handleAddAdmin = () => {
    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (newAdmin.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    // In a real app, this would make an API call
    const id = Math.random().toString(36).substr(2, 9)
    setAdmins([
      ...admins,
      {
        id,
        userId: newAdmin.userId,
        name: newAdmin.name,
        role: newAdmin.role,
      },
    ])

    setNewAdmin({
      userId: "",
      password: "",
      confirmPassword: "",
      name: "",
      role: "admin",
    })
    setShowAddForm(false)
    toast.success("Admin added successfully")
  }

  const handleEditAdmin = (admin: any) => {
    setEditingAdmin({
      ...admin,
      password: "",
      confirmPassword: "",
    })
    setShowEditForm(true)
  }

  const handleUpdateAdmin = () => {
    if (editingAdmin.password && editingAdmin.password !== editingAdmin.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (editingAdmin.password && editingAdmin.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    // Update admin in the list
    setAdmins(
      admins.map((admin) =>
        admin.id === editingAdmin.id
          ? {
              id: admin.id,
              userId: editingAdmin.userId,
              name: editingAdmin.name,
              role: editingAdmin.role,
            }
          : admin,
      ),
    )

    setShowEditForm(false)
    setEditingAdmin(null)
    toast.success("Admin updated successfully")
  }

  const handleDeleteAdmin = (id: string) => {
    // Prevent deleting the super admin (Shubham)
    const adminToDelete = admins.find((admin) => admin.id === id)
    if (adminToDelete?.userId === "shubham") {
      toast.error("Cannot delete super admin")
      return
    }

    setAdmins(admins.filter((admin) => admin.id !== id))
    toast.success("Admin deleted successfully")
  }

  // Only super admins can access this page
  if (currentAdmin?.role !== "super_admin") {
    return (
      <div className="py-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Access Denied</h3>
          <p className="text-gray-600">You do not have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Admins</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md inline-flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Admin
        </motion.button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-lg font-medium mb-4">Add New Admin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <input
                type="text"
                value={newAdmin.userId}
                onChange={(e) => setNewAdmin({ ...newAdmin, userId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter user ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter name"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={newAdmin.confirmPassword}
                onChange={(e) => setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Confirm password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={newAdmin.role}
                onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddAdmin}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
            >
              Add Admin
            </motion.button>
          </div>
        </motion.div>
      )}

      {showEditForm && editingAdmin && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-lg font-medium mb-4">Edit Admin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <input
                type="text"
                value={editingAdmin.userId}
                onChange={(e) => setEditingAdmin({ ...editingAdmin, userId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter user ID"
                disabled={editingAdmin.userId === "shubham"} // Can't change Shubham's user ID
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={editingAdmin.name}
                onChange={(e) => setEditingAdmin({ ...editingAdmin, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter name"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
              <input
                type={showPassword ? "text" : "password"}
                value={editingAdmin.password || ""}
                onChange={(e) => setEditingAdmin({ ...editingAdmin, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter new password (leave blank to keep current)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={editingAdmin.confirmPassword || ""}
                onChange={(e) => setEditingAdmin({ ...editingAdmin, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Confirm new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={editingAdmin.role}
                onChange={(e) => setEditingAdmin({ ...editingAdmin, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={editingAdmin.userId === "shubham"} // Can't change Shubham's role
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => {
                setShowEditForm(false)
                setEditingAdmin(null)
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpdateAdmin}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
            >
              Update Admin
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{admin.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.role === "super_admin" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => handleEditAdmin(admin)} className="text-primary hover:text-primary/80">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className={`text-red-600 hover:text-red-900 ${admin.userId === "shubham" ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={admin.userId === "shubham"}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

