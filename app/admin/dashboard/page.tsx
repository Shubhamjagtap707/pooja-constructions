"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
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
  Eye,
  EyeOff,
  Plus,
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/context/auth-context"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import type { Activity } from "@/lib/drive-service"

export default function AdminDashboard() {
  const { logout, currentAdmin } = useAuth()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("dashboard")

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    router.push("/admin/login")
  }

  // Base menu items for all admins
  const baseMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "projects", label: "Projects", icon: <Briefcase className="h-5 w-5" /> },
    { id: "services", label: "Services", icon: <FileText className="h-5 w-5" /> },
    { id: "bitumen", label: "Bitumen Products", icon: <Truck className="h-5 w-5" /> },
    { id: "team", label: "Team Members", icon: <Users className="h-5 w-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ]

  // Add admin management for super admin (Shubham)
  const menuItems =
    currentAdmin?.role === "super_admin"
      ? [...baseMenuItems, { id: "admin-management", label: "Admin Management", icon: <UserCog className="h-5 w-5" /> }]
      : baseMenuItems

  const stats = [
    { label: "Total Projects", value: "24", change: "+3 this month" },
    { label: "Services", value: "12", change: "Last updated 2 days ago" },
    { label: "Bitumen Products", value: "8", change: "Last updated 1 week ago" },
    { label: "Team Members", value: "16", change: "+2 this month" },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
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
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`${
                          activeSection === item.id
                            ? "bg-primary/10 text-primary"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        } group flex items-center px-2 py-3 text-sm font-medium rounded-md w-full transition-colors`}
                      >
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                        {activeSection === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
                      </button>
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
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {menuItems.find((item) => item.id === activeSection)?.label || "Dashboard"}
                    </h1>
                    <div className="md:hidden">
                      <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700">
                        <LogOut className="h-5 w-5 mr-1" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  {activeSection === "dashboard" && <AdminDashboardContent />}

                  {activeSection === "projects" && <AdminProjects />}

                  {activeSection === "services" && <AdminServices />}

                  {activeSection === "bitumen" && <AdminBitumen />}

                  {activeSection === "team" && <AdminTeam />}

                  {activeSection === "settings" && <AdminSettings />}

                  {activeSection === "admin-management" && <AdminManagement />}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

// Admin Projects Component with image upload
function AdminProjects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Mumbai-Pune Expressway Expansion",
      category: "Road Construction",
      location: "Maharashtra, India",
      year: "2023",
      featured: true,
      image: "/images/projects/project1.jpg",
    },
    {
      id: 2,
      title: "Ganga River Suspension Bridge",
      category: "Bridge Construction",
      location: "Uttar Pradesh, India",
      year: "2022",
      featured: true,
      image: "/images/projects/project2.jpg",
    },
    {
      id: 3,
      title: "Bangalore Urban Road Network",
      category: "Infrastructure Development",
      location: "Karnataka, India",
      year: "2021",
      featured: true,
      image: "/images/projects/project3.jpg",
    },
    {
      id: 4,
      title: "Chennai Coastal Highway",
      category: "Road Construction",
      location: "Tamil Nadu, India",
      year: "2020",
      featured: false,
      image: "/images/projects/project4.jpg",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    location: "",
    year: "",
    featured: false,
    image: "",
    imageFile: null as File | null,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewProject({ ...newProject, imageFile: file })

      // Create a preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProject = () => {
    // In a real app, you would upload the image to a server/storage
    // For now, we'll use the preview URL as a placeholder
    const id = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1
    const newProjectWithImage = {
      ...newProject,
      id,
      image: imagePreview || "/placeholder.svg?height=600&width=800",
    }

    setProjects([...projects, newProjectWithImage])
    setNewProject({
      title: "",
      category: "",
      location: "",
      year: "",
      featured: false,
      image: "",
      imageFile: null,
    })
    setImagePreview(null)
    setShowAddForm(false)
    toast.success("Project added successfully")
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id))
    toast.success("Project deleted successfully")
  }

  const handleToggleFeatured = (id: number) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, featured: !project.featured } : project)))
    toast.success("Project updated successfully")
  }

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Manage Projects</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
        >
          {showAddForm ? "Cancel" : "Add New Project"}
        </motion.button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-lg font-medium mb-4">Add New Project</h3>
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
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
            >
              Add Project
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
                <button
                  onClick={() => handleToggleFeatured(project.id)}
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  {project.featured ? "Unfeature" : "Feature"}
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
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

// Admin Services Component with image upload
function AdminServices() {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Road Construction",
      description: "We specialize in constructing high-quality roads that are built to last.",
      features: ["Highway and expressway construction", "Urban road networks", "Rural road development"],
      image: "/images/services/road-construction.jpg",
    },
    {
      id: 2,
      title: "Bridge Construction",
      description: "Our bridge construction services combine innovative engineering with meticulous execution.",
      features: ["Concrete and steel bridges", "Suspension and cable-stayed bridges", "Arch and truss bridges"],
      image: "/images/services/bridge-construction.jpg",
    },
    {
      id: 3,
      title: "Infrastructure Development",
      description:
        "We provide comprehensive infrastructure development services that help communities grow and thrive.",
      features: [
        "Urban planning and development",
        "Public transportation infrastructure",
        "Water supply and drainage systems",
      ],
      image: "/images/services/infrastructure.jpg",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    features: [""],
    image: "",
    imageFile: null as File | null,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewService({ ...newService, imageFile: file })

      // Create a preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddFeature = () => {
    setNewService({
      ...newService,
      features: [...newService.features, ""],
    })
  }

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newService.features]
    updatedFeatures[index] = value
    setNewService({
      ...newService,
      features: updatedFeatures,
    })
  }

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...newService.features]
    updatedFeatures.splice(index, 1)
    setNewService({
      ...newService,
      features: updatedFeatures,
    })
  }

  const handleAddService = () => {
    const id = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1
    const newServiceWithImage = {
      ...newService,
      id,
      image: imagePreview || "/placeholder.svg?height=600&width=800",
    }

    setServices([...services, newServiceWithImage])
    setNewService({
      title: "",
      description: "",
      features: [""],
      image: "",
      imageFile: null,
    })
    setImagePreview(null)
    setShowAddForm(false)
    toast.success("Service added successfully")
  }

  const handleDeleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id))
    toast.success("Service deleted successfully")
  }

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Manage Services</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
        >
          {showAddForm ? "Cancel" : "Add New Service"}
        </motion.button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-lg font-medium mb-4">Add New Service</h3>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
              <input
                type="text"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter service title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter service description"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Image</label>
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
              <p className="text-xs text-gray-500 mt-1">Recommended size: 1200x800 pixels</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
              {newService.features.map((feature, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={`Feature ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddFeature} className="text-primary hover:text-primary/80 text-sm">
                + Add Feature
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddService}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
            >
              Add Service
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <div className="relative h-48">
              <Image
                src={service.image || "/placeholder.svg?height=600&width=800"}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <button onClick={() => handleDeleteService(service.id)} className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </div>
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">{service.description}</p>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="text-gray-600 text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Admin Bitumen Products Component with image upload
function AdminBitumen() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "VG-10 Bitumen",
      description: "A low viscosity grade bitumen ideal for spray applications and surface dressing in cold regions.",
      specifications: ["Penetration at 25°C: 80-100", "Softening Point: 40-45°C"],
      applications: ["Surface dressing", "Paving in cold regions"],
      image: "/images/bitumen/vg10.jpg",
    },
    {
      id: 2,
      title: "VG-30 Bitumen",
      description: "A medium viscosity grade bitumen perfect for road construction in moderate to warm climates.",
      specifications: ["Penetration at 25°C: 50-70", "Softening Point: 47-55°C"],
      applications: ["Highway construction", "Heavy traffic roads"],
      image: "/images/bitumen/vg30.jpg",
    },
    {
      id: 3,
      title: "Modified Bitumen",
      description: "Bitumen enhanced with polymers for improved durability, elasticity, and resistance to deformation.",
      specifications: ["Penetration at 25°C: 40-60", "Softening Point: 55-65°C"],
      applications: ["High-stress areas", "Bridges and flyovers"],
      image: "/images/bitumen/modified.jpg",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    specifications: [""],
    applications: [""],
    image: "",
    imageFile: null as File | null,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewProduct({ ...newProduct, imageFile: file })

      // Create a preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddSpecification = () => {
    setNewProduct({
      ...newProduct,
      specifications: [...newProduct.specifications, ""],
    })
  }

  const handleSpecificationChange = (index: number, value: string) => {
    const updatedSpecs = [...newProduct.specifications]
    updatedSpecs[index] = value
    setNewProduct({
      ...newProduct,
      specifications: updatedSpecs,
    })
  }

  const handleRemoveSpecification = (index: number) => {
    const updatedSpecs = [...newProduct.specifications]
    updatedSpecs.splice(index, 1)
    setNewProduct({
      ...newProduct,
      specifications: updatedSpecs,
    })
  }

  const handleAddApplication = () => {
    setNewProduct({
      ...newProduct,
      applications: [...newProduct.applications, ""],
    })
  }

  const handleApplicationChange = (index: number, value: string) => {
    const updatedApps = [...newProduct.applications]
    updatedApps[index] = value
    setNewProduct({
      ...newProduct,
      applications: updatedApps,
    })
  }

  const handleRemoveApplication = (index: number) => {
    const updatedApps = [...newProduct.applications]
    updatedApps.splice(index, 1)
    setNewProduct({
      ...newProduct,
      applications: updatedApps,
    })
  }

  const handleAddProduct = () => {
    const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
    const newProductWithImage = {
      ...newProduct,
      id,
      image: imagePreview || "/placeholder.svg?height=600&width=800",
    }

    setProducts([...products, newProductWithImage])
    setNewProduct({
      title: "",
      description: "",
      specifications: [""],
      applications: [""],
      image: "",
      imageFile: null,
    })
    setImagePreview(null)
    setShowAddForm(false)
    toast.success("Bitumen product added successfully")
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
    toast.success("Bitumen product deleted successfully")
  }

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Manage Bitumen Products</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
        >
          {showAddForm ? "Cancel" : "Add New Product"}
        </motion.button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-lg font-medium mb-4">Add New Bitumen Product</h3>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
              <input
                type="text"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter product title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter product description"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
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
              <p className="text-xs text-gray-500 mt-1">Recommended size: 800x600 pixels</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
              {newProduct.specifications.map((spec, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => handleSpecificationChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={`Specification ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecification(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSpecification}
                className="text-primary hover:text-primary/80 text-sm"
              >
                + Add Specification
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Applications</label>
              {newProduct.applications.map((app, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={app}
                    onChange={(e) => handleApplicationChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={`Application ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveApplication(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddApplication}
                className="text-primary hover:text-primary/80 text-sm"
              >
                + Add Application
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddProduct}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
            >
              Add Product
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <div className="relative h-48">
              <Image
                src={product.image || "/placeholder.svg?height=600&width=800"}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </div>
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">{product.description}</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Specifications:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="text-gray-600 text-sm">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Applications:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.applications.map((app, index) => (
                      <li key={index} className="text-gray-600 text-sm">
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Admin Team Component with image upload
function AdminTeam() {
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "Founder & CEO",
      bio: "With over 25 years of experience in the construction industry, Rajesh has led the company from its inception to become a leading infrastructure developer.",
      image: "/images/team/rajesh.jpg",
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Chief Operations Officer",
      bio: "Priya oversees all operational aspects of the company, ensuring that projects are delivered on time and to the highest standards of quality.",
      image: "/images/team/priya.jpg",
    },
    {
      id: 3,
      name: "Amit Patel",
      position: "Chief Technical Officer",
      bio: "Amit leads our technical team, bringing innovative solutions to complex engineering challenges in our infrastructure projects.",
      image: "/images/team/amit.jpg",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newMember, setNewMember] = useState({
    name: "",
    position: "",
    bio: "",
    image: "",
    imageFile: null as File | null,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewMember({ ...newMember, imageFile: file })

      // Create a preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddMember = () => {
    const id = team.length > 0 ? Math.max(...team.map((m) => m.id)) + 1 : 1
    const newMemberWithImage = {
      ...newMember,
      id,
      image: imagePreview || "/placeholder.svg?height=400&width=400",
    }

    setTeam([...team, newMemberWithImage])
    setNewMember({
      name: "",
      position: "",
      bio: "",
      image: "",
      imageFile: null,
    })
    setImagePreview(null)
    setShowAddForm(false)
    toast.success("Team member added successfully")
  }

  const handleDeleteMember = (id: number) => {
    setTeam(team.filter((member) => member.id !== id))
    toast.success("Team member deleted successfully")
  }

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Manage Team</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
        >
          {showAddForm ? "Cancel" : "Add Team Member"}
        </motion.button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-lg font-medium mb-4">Add Team Member</h3>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                value={newMember.position}
                onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter position"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={newMember.bio}
                onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter bio"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {imagePreview && (
                  <div className="relative h-20 w-20 rounded-full overflow-hidden">
                    <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Recommended size: 400x400 pixels (square)</p>
            </div>
          </div>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddMember}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
            >
              Add Member
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <div className="p-6 flex flex-col items-center">
              <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                <Image
                  src={member.image || "/placeholder.svg?height=400&width=400"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove Member
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Admin Settings Component
function AdminSettings() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  return (
    <div className="py-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
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
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="maintenance-mode" className="ml-2 block text-sm text-gray-900">
                  Enable Maintenance Mode
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="show-projects"
                  type="checkbox"
                  defaultChecked={true}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="show-projects" className="ml-2 block text-sm text-gray-900">
                  Show Projects on Homepage
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="show-testimonials"
                  type="checkbox"
                  defaultChecked={true}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="show-testimonials" className="ml-2 block text-sm text-gray-900">
                  Show Testimonials on Homepage
                </label>
              </div>
            </div>
            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toast.success("Settings saved successfully")}
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

// Admin Management Component (only for super admin)
function AdminManagement() {
  const [admins, setAdmins] = useState([
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

function AdminDashboardContent() {
  const [stats, setStats] = useState([
    { label: "Total Projects", value: "0", change: "Loading...", path: "/admin/projects" },
    { label: "Services", value: "0", change: "Loading...", path: "/admin/services" },
    { label: "Bitumen Products", value: "0", change: "Loading...", path: "/admin/bitumen" },
    { label: "Team Members", value: "0", change: "Loading...", path: "/admin/team" },
  ])

  const [recentActivities, setRecentActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Default fallback data
        let projects = []
        let services = []
        let bitumen = []
        let team = []
        let activities = []

        try {
          // Fetch projects
          const projectsRes = await fetch("/api/projects")
          if (projectsRes.ok) {
            projects = await projectsRes.json()
          }
        } catch (error) {
          console.error("Error fetching projects:", error)
        }

        try {
          // Fetch services
          const servicesRes = await fetch("/api/services")
          if (servicesRes.ok) {
            services = await servicesRes.json()
          }
        } catch (error) {
          console.error("Error fetching services:", error)
        }

        try {
          // Fetch bitumen products
          const bitumenRes = await fetch("/api/bitumen")
          if (bitumenRes.ok) {
            bitumen = await bitumenRes.json()
          }
        } catch (error) {
          console.error("Error fetching bitumen products:", error)
        }

        try {
          // Fetch team members
          const teamRes = await fetch("/api/team")
          if (teamRes.ok) {
            team = await teamRes.json()
          }
        } catch (error) {
          console.error("Error fetching team members:", error)
        }

        try {
          // Fetch activities
          const activitiesRes = await fetch("/api/activities")
          if (activitiesRes.ok) {
            activities = await activitiesRes.json()
          }
        } catch (error) {
          console.error("Error fetching activities:", error)
        }

        // Update stats
        setStats([
          {
            label: "Total Projects",
            value: projects.length.toString(),
            change: `${projects.length > 0 ? projects.length : "No"} projects available`,
            path: "/admin/projects",
          },
          {
            label: "Services",
            value: services.length.toString(),
            change: `${services.length > 0 ? services.length : "No"} services available`,
            path: "/admin/services",
          },
          {
            label: "Bitumen Products",
            value: bitumen.length.toString(),
            change: `${bitumen.length > 0 ? bitumen.length : "No"} products available`,
            path: "/admin/bitumen",
          },
          {
            label: "Team Members",
            value: team.length.toString(),
            change: `${team.length > 0 ? team.length : "No"} members available`,
            path: "/admin/team",
          },
        ])

        // Update activities
        setRecentActivities(activities)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="py-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
                  {index === 0 && <Briefcase className="h-5 w-5" />}
                  {index === 1 && <FileText className="h-5 w-5" />}
                  {index === 2 && <Truck className="h-5 w-5" />}
                  {index === 3 && <Users className="h-5 w-5" />}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">{stat.change}</div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link href={stat.path} className="font-medium text-primary hover:text-primary/80 flex items-center">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary truncate">{activity.action}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">{activity.item}</p>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
            {recentActivities.length === 0 && (
              <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No recent activities found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardContent

