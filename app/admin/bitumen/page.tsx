"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Image from "next/image"
import { Link2, Edit, Trash } from "lucide-react"

export default function AdminBitumen() {
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
  const [showEditForm, setShowEditForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    id: 0,
    title: "",
    description: "",
    specifications: [""],
    applications: [""],
    image: "",
    imageFile: null as File | null,
    imageUrl: "", // Added for image URL input
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [imageInputType, setImageInputType] = useState<"file" | "url">("file")
  const [isEditing, setIsEditing] = useState(false)

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("admin_bitumen_products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("admin_bitumen_products", JSON.stringify(products))
    // Also save to website_bitumen_products for the frontend to use
    localStorage.setItem("website_bitumen_products", JSON.stringify(products))
  }, [products])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewProduct({ ...newProduct, imageFile: file, imageUrl: "" })

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
    setNewProduct({ ...newProduct, imageUrl: url, imageFile: null })
    if (url) {
      setImagePreview(url)
    } else {
      setImagePreview(null)
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

  const handleAddProduct = async () => {
    try {
      setIsUploading(true)
      let imagePath = "/placeholder.svg?height=600&width=800"

      // Use image URL if provided
      if (newProduct.imageUrl) {
        imagePath = newProduct.imageUrl
      }
      // Use file upload if available (in a real app, this would upload to a server)
      else if (newProduct.imageFile) {
        // Simulate file upload
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // In a real app, this would be the URL returned from the server
        imagePath = URL.createObjectURL(newProduct.imageFile)
      }

      if (isEditing) {
        // Update existing product
        setProducts(
          products.map((product) =>
            product.id === newProduct.id
              ? {
                  ...newProduct,
                  image: imagePath,
                }
              : product,
          ),
        )
        toast.success("Bitumen product updated successfully")
      } else {
        // Add new product
        const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
        const newProductWithImage = {
          ...newProduct,
          id,
          image: imagePath,
        }

        setProducts([...products, newProductWithImage])
        toast.success("Bitumen product added successfully")
      }

      setNewProduct({
        id: 0,
        title: "",
        description: "",
        specifications: [""],
        applications: [""],
        image: "",
        imageFile: null,
        imageUrl: "",
      })
      setImagePreview(null)
      setShowAddForm(false)
      setShowEditForm(false)
      setIsEditing(false)
    } catch (error) {
      console.error("Error adding product:", error)
      toast.error("Failed to add product")
    } finally {
      setIsUploading(false)
    }
  }

  const handleEditProduct = (product: any) => {
    setNewProduct({
      ...product,
      imageFile: null,
      imageUrl: product.image,
    })
    setImagePreview(product.image)
    setImageInputType("url")
    setIsEditing(true)
    setShowEditForm(true)
    setShowAddForm(false)
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
          onClick={() => {
            setShowAddForm(!showAddForm)
            setShowEditForm(false)
            setIsEditing(false)
            setNewProduct({
              id: 0,
              title: "",
              description: "",
              specifications: [""],
              applications: [""],
              image: "",
              imageFile: null,
              imageUrl: "",
            })
            setImagePreview(null)
          }}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
        >
          {showAddForm ? "Cancel" : "Add New Product"}
        </motion.button>
      </div>

      {(showAddForm || showEditForm) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-lg font-medium mb-4">{isEditing ? "Edit Bitumen Product" : "Add New Bitumen Product"}</h3>
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
                    value={newProduct.imageUrl}
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
              disabled={isUploading}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md disabled:opacity-70"
            >
              {isUploading ? "Uploading..." : isEditing ? "Update Product" : "Add Product"}
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
                <div className="flex space-x-2">
                  <button onClick={() => handleEditProduct(product)} className="text-blue-500 hover:text-blue-700">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
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

