"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Building } from "lucide-react"

interface ProjectDetails {
  title: string
  category: string
  description: string
  location: string
  year: string
  client: string
  images: string[]
  details: {
    scope: string[]
    challenges: string[]
    solutions: string[]
    impact: string[]
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<ProjectDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch project data from the API
    // For now, using mock data
    setProject({
      title: "Mumbai-Pune Expressway Expansion",
      category: "Road Construction",
      description:
        "Expansion of the Mumbai-Pune Expressway from 6 lanes to 8 lanes, including the addition of new bridges and tunnels to improve traffic flow.",
      location: "Maharashtra, India",
      year: "2023",
      client: "Maharashtra State Road Development Corporation",
      images: [
        "/images/projects/mumbai-pune-1.jpg",
        "/images/projects/mumbai-pune-2.jpg",
        "/images/projects/mumbai-pune-3.jpg",
      ],
      details: {
        scope: [
          "Lane expansion from 6 to 8 lanes",
          "Construction of new bridges",
          "Tunnel excavation and construction",
          "Installation of smart traffic management systems",
        ],
        challenges: [
          "Working on live traffic conditions",
          "Complex terrain and geological conditions",
          "Strict environmental regulations",
          "Tight project timeline",
        ],
        solutions: [
          "Implemented phase-wise construction plan",
          "Used advanced tunneling technology",
          "Deployed environmental protection measures",
          "Optimized resource allocation",
        ],
        impact: [
          "30% reduction in travel time",
          "Improved safety measures",
          "Enhanced traffic flow",
          "Reduced maintenance requirements",
        ],
      },
    })
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Project not found</p>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link href="/projects" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>

        {/* Project header */}
        <div className="mb-12">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-4">
            {project.title}
          </motion.h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-primary" />
              {project.category}
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              {project.location}
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              {project.year}
            </div>
          </div>
        </div>

        {/* Project images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {project.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative h-80 rounded-lg overflow-hidden"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${project.title} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Project description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-gray-600">{project.description}</p>
        </div>

        {/* Project details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Project Scope", items: project.details.scope },
            { title: "Challenges", items: project.details.challenges },
            { title: "Solutions", items: project.details.solutions },
            { title: "Impact", items: project.details.impact },
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Client information */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Client</h2>
          <p className="text-gray-600">{project.client}</p>
        </div>
      </div>
    </div>
  )
}

