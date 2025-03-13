"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Image from "next/image"
import { Link2, Edit, Trash } from "lucide-react"
import type { Project } from "@/lib/drive-service"

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [newProject, setNewProject] = useState<
    Project & {
      imageFile: File | null
      imageUrl: string
    }
  >({
    id: 0,
    title: "",
    category: "",
    location: "",
    year: "",
    featured: false,
    image: "",
    imageFile: null,
    imageUrl: "",
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [imageInputType, setImageInputType] = useState<"file" | "url">("file")
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
        toast.error("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Save projects to API
  const saveProjects = async (updatedProjects: Project[]) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProjects),
      })

      if (!response.ok) {
        throw new Error("Failed to save projects")
      }

      return true
    } catch (error) {
      console.error("Error saving projects:", error)
      toast.error("Failed to save projects")
      return false
    }
  }

  // Log activity
  const logActivity = async (activity: { action: string; item: string }) => {
    try {
      await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...activity,
          time: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error("Error logging activity:", error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewProject({ ...newProject, imageFile: file, imageUrl: "" })

      // Create a preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setNewProject({ ...newProject, imageUrl: url, imageFile: null })
    if (url) {
      setImagePreview(url)
    } else {
      setImagePreview(null)
    }
  }

  const handleAddProject = async () => {
    try {
      setIsUploading(true)
      let imagePath = "/placeholder.svg?height=600&width=800"

      // Use image URL if provided
      if (newProject.imageUrl) {
        imagePath = newProject.imageUrl
      }
      // Use file upload if available (in a real app, this would upload to a server)
      else if (newProject.imageFile) {
        // Simulate file upload
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // In a real app, this would be the URL returned from the server
        imagePath = URL.createObjectURL(newProject.imageFile)
      }

      if (isEditing) {
        // Update existing project
        const updatedProjects = projects.map((project) =>
          project.id === newProject.id
            ? {
                ...newProject,
                image: imagePath,
              }
            : project,
        )

        const success = await saveProjects(updatedProjects)
        if (success) {
          setProjects(updatedProjects)
          await logActivity({
            action: "Updated project",
            item: newProject.title,
          })
          toast.success("Project updated successfully")
        }
      } else {
        // Add new project
        const id = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1
        const newProjectWithImage = {
          ...newProject,
          id,
          image: imagePath,
        }

        const updatedProjects = [...projects, newProjectWithImage]
        const success = await saveProjects(updatedProjects)
        if (success) {
          setProjects(updatedProjects)
          await logActivity({
            action: "Added new project",
            item: newProject.title,
          })
          toast.success("Project added successfully")
        }
      }

      setNewProject({
        id: 0,
        title: "",
        category: "",
        location: "",
        year: "",
        featured: false,
        image: "",
        imageFile: null,
        imageUrl: "",
      })
      setImagePreview(null)
      setShowAddForm(false)
      setShowEditForm(false)
      setIsEditing(false)
    } catch (error) {
      console.error("Error adding project:", error)
      toast.error("Failed to add project")
    } finally {
      setIsUploading(false)
    }
  }

  const handleEditProject = (project: Project) => {
    setNewProject({
      ...project,
      imageFile: null,
      imageUrl: project.image,
    })
    setImagePreview(project.image)
    setImageInputType("url")
    setIsEditing(true)
    setShowEditForm(true)
    setShowAddForm(false)
  }

  const handleDeleteProject = async (id: number) => {
    const projectToDelete = projects.find((project) => project.id === id)
    const updatedProjects = projects.filter((project) => project.id !== id)

    const success = await saveProjects(updatedProjects)
    if (success) {
      setProjects(updatedProjects)
      await logActivity({
        action: "Deleted project",
        item: projectToDelete?.title || "Project",
      })
      toast.success("Project deleted successfully")
    }
  }

  const handleToggleFeatured = async (id: number) => {
    const project = projects.find((p) => p.id === id)
    if (!project) return

    const updatedProjects = projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))

    const success = await saveProjects(updatedProjects)
    if (success) {
      setProjects(updatedProjects)
      await logActivity({
        action: project.featured ? "Unfeatured project" : "Featured project",
        item: project.title,
      })
      toast.success("Project updated successfully")
    }
  }

  if (loading) {
    return (
      <div className="py-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Manage Projects</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowAddForm(!showAddForm)
            setShowEditForm(false)
            setIsEditing(false)
            setNewProject({
              id: 0,
              title: "",
              category: "",
              location: "",
              year: "",
              featured: false,
              image: "",
              imageFile: null,
              imageUrl: "",
            })
            setImagePreview(null)
          }}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
        >
          {showAddForm ? "Cancel" : "Add New Project"}
        </motion.button>
      </div>

      {(showAddForm || showEditForm) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-lg font-medium mb-4">{isEditing ? "Edit Project" : "Add New Project"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter project title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select category</option>
                <option value="Road Construction">Road Construction</option>
                <option value="Bridge Construction">Bridge Construction</option>
                <option value="Infrastructure Development">Infrastructure Development</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={newProject.location}
                onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="text"
                value={newProject.year}
                onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter year"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>

              <div className="flex space-x-4 mb-2">
                <button
                  type="button"
                  onClick={() => setImageInputType("file")}
                  className={`px-3 py-1 rounded-md ${
                    imageInputType === "file" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputType("url")}
                  className={`px-3 py-1 rounded-md flex items-center ${
                    imageInputType === "url" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <Link2 className="h-4 w-4 mr-1" />
                  Image URL
                </button>
              </div>

              {imageInputType === "file" ? (
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {imagePreview && (
                    <div className="relative h-20 w-20 rounded overflow-hidden">
                      <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={newProject.imageUrl}
                    onChange={handleImageUrlChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter image URL"
                  />
                  {imagePreview && (
                    <div className="relative h-20 w-20 rounded overflow-hidden">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-cover"
                        onError={() => {
                          setImagePreview("/placeholder.svg?height=400&width=400")
                          toast.error("Invalid image URL")
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Recommended size: 1200x800 pixels</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="featured"
              checked={newProject.featured}
              onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
              Featured Project
            </label>
          </div>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddProject}
              disabled={isUploading}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md disabled:opacity-70"
            >
              {isUploading ? "Uploading..." : isEditing ? "Update Project" : "Add Project"}
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <div className="relative h-48">
              <Image
                src={project.image || "/placeholder.svg?height=600&width=800"}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                  project.featured ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {project.featured ? "Featured" : "Not Featured"}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <div className="text-sm text-gray-600 mb-2">{project.category}</div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>{project.location}</span>
                <span>{project.year}</span>
              </div>
              <div className="flex justify-between">
                <div className="space-x-2">
                  <button
                    onClick={() => handleToggleFeatured(project.id)}
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    {project.featured ? "Unfeature" : "Feature"}
                  </button>
                  <button
                    onClick={() => handleEditProject(project)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    <Edit className="h-4 w-4 inline mr-1" />
                    Edit
                  </button>
                </div>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  <Trash className="h-4 w-4 inline mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

