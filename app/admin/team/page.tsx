"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Image from "next/image"
import { Link2 } from "lucide-react"

export default function AdminTeam() {
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
    imageUrl: "", // Added for image URL input
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [imageInputType, setImageInputType] = useState<"file" | "url">("file")

  // Load team members from localStorage on mount
  useEffect(() => {
    const savedTeam = localStorage.getItem("admin_team_members")
    if (savedTeam) {
      setTeam(JSON.parse(savedTeam))
    }
  }, [])

  // Save team members to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("admin_team_members", JSON.stringify(team))
  }, [team])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewMember({ ...newMember, imageFile: file, imageUrl: "" })

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
    setNewMember({ ...newMember, imageUrl: url, imageFile: null })
    if (url) {
      setImagePreview(url)
    } else {
      setImagePreview(null)
    }
  }

  const handleAddMember = async () => {
    try {
      setIsUploading(true)
      let imagePath = "/placeholder.svg?height=400&width=400"

      // Use image URL if provided
      if (newMember.imageUrl) {
        imagePath = newMember.imageUrl
      }
      // Use file upload if available (in a real app, this would upload to a server)
      else if (newMember.imageFile) {
        // Simulate file upload
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // In a real app, this would be the URL returned from the server
        imagePath = URL.createObjectURL(newMember.imageFile)
      }

      const id = team.length > 0 ? Math.max(...team.map((m) => m.id)) + 1 : 1
      const newMemberWithImage = {
        ...newMember,
        id,
        image: imagePath,
      }

      setTeam([...team, newMemberWithImage])
      setNewMember({
        name: "",
        position: "",
        bio: "",
        image: "",
        imageFile: null,
        imageUrl: "",
      })
      setImagePreview(null)
      setShowAddForm(false)
      toast.success("Team member added successfully")
    } catch (error) {
      console.error("Error adding team member:", error)
      toast.error("Failed to add team member")
    } finally {
      setIsUploading(false)
    }
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
                    <div className="relative h-20 w-20 rounded-full overflow-hidden">
                      <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={newMember.imageUrl}
                    onChange={handleImageUrlChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter image URL"
                  />
                  {imagePreview && (
                    <div className="relative h-20 w-20 rounded-full overflow-hidden">
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
              <p className="text-xs text-gray-500 mt-1">Recommended size: 400x400 pixels (square)</p>
            </div>
          </div>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddMember}
              disabled={isUploading}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md disabled:opacity-70"
            >
              {isUploading ? "Uploading..." : "Add Member"}
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

