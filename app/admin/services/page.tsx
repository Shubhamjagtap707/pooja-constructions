"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Image from "next/image"
import { Link2, Edit, Trash } from "lucide-react"

export default function AdminServices() {
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
  const [showEditForm, setShowEditForm] = useState(false)
  const [newService, setNewService] = useState({
    id: 0,
    title: "",
    description: "",
    features: [""],
    image: "",
    imageFile: null as File | null,
    imageUrl: "", // Added for image URL input
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [imageInputType, setImageInputType] = useState<"file" | "url">("file")
  const [isEditing, setIsEditing] = useState(false)

  // Load services from localStorage on mount
  useEffect(() => {
    const savedServices = localStorage.getItem("admin_services")
    if (savedServices) {
      setServices(JSON.parse(savedServices))
    }
  }, [])

  // Save services to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("admin_services", JSON.stringify(services))
    // Also save to website_services for the frontend to use
    localStorage.setItem("website_services", JSON.stringify(services))
  }, [services])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewService({ ...newService, imageFile: file, imageUrl: "" })

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
    setNewService({ ...newService, imageUrl: url, imageFile: null })
    if (url) {
      setImagePreview(url)
    } else {
      setImagePreview(null)
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

  const handleAddService = async () => {
    try {
      setIsUploading(true)
      let imagePath = "/placeholder.svg?height=600&width=800"

      // Use image URL if provided
      if (newService.imageUrl) {
        imagePath = newService.imageUrl
      }
      // Use file upload if available (in a real app, this would upload to a server)
      else if (newService.imageFile) {
        // Simulate file upload
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // In a real app, this would be the URL returned from the server
        imagePath = URL.createObjectURL(newService.imageFile)
      }

      if (isEditing) {
        // Update existing service
        setServices(
          services.map((service) =>
            service.id === newService.id
              ? {
                  ...newService,
                  image: imagePath,
                }
              : service,
          ),
        )
        toast.success("Service updated successfully")
      } else {
        // Add new service
        const id = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1
        const newServiceWithImage = {
          ...newService,
          id,
          image: imagePath,
        }

        setServices([...services, newServiceWithImage])
        toast.success("Service added successfully")
      }

      setNewService({
        id: 0,
        title: "",
        description: "",
        features: [""],
        image: "",
        imageFile: null,
        imageUrl: "",
      })
      setImagePreview(null)
      setShowAddForm(false)
      setShowEditForm(false)
      setIsEditing(false)
    } catch (error) {
      console.error("Error adding service:", error)
      toast.error("Failed to add service")
    } finally {
      setIsUploading(false)
    }
  }

  const handleEditService = (service: any) => {
    setNewService({
      ...service,
      imageFile: null,
      imageUrl: service.image,
    })
    setImagePreview(service.image)
    setImageInputType("url")
    setIsEditing(true)
    setShowEditForm(true)
    setShowAddForm(false)
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
          onClick={() => {
            setShowAddForm(!showAddForm)
            setShowEditForm(false)
            setIsEditing(false)
            setNewService({
              id: 0,
              title: "",
              description: "",
              features: [""],
              image: "",
              imageFile: null,
              imageUrl: "",
            })
            setImagePreview(null)
          }}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
        >
          {showAddForm ? "Cancel" : "Add New Service"}
        </motion.button>
      </div>

      {(showAddForm || showEditForm) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-lg font-medium mb-4">{isEditing ? "Edit Service" : "Add New Service"}</h3>
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
                    value={newService.imageUrl}
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
              disabled={isUploading}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md disabled:opacity-70"
            >
              {isUploading ? "Uploading..." : isEditing ? "Update Service" : "Add Service"}
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
                <div className="flex space-x-2">
                  <button onClick={() => handleEditService(service)} className="text-blue-500 hover:text-blue-700">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDeleteService(service.id)} className="text-red-500 hover:text-red-700">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
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

