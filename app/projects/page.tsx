"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin } from "lucide-react"

// Sample project data
const projects = [
  {
    id: 1,
    title: "Mumbai-Pune Expressway Expansion",
    category: "Road Construction",
    description:
      "Expansion of the Mumbai-Pune Expressway from 6 lanes to 8 lanes, including the addition of new bridges and tunnels to improve traffic flow.",
    image: "/placeholder.svg?height=800&width=1200",
    location: "Maharashtra, India",
    year: "2023",
    client: "Maharashtra State Road Development Corporation",
    featured: true,
  },
  {
    id: 2,
    title: "Ganga River Suspension Bridge",
    category: "Bridge Construction",
    description:
      "Construction of a 1.5 km suspension bridge across the Ganga River, connecting two major cities and reducing travel time by 2 hours.",
    image: "/placeholder.svg?height=800&width=1200",
    location: "Uttar Pradesh, India",
    year: "2022",
    client: "National Highways Authority of India",
    featured: true,
  },
  {
    id: 3,
    title: "Bangalore Urban Road Network",
    category: "Infrastructure Development",
    description:
      "Development of a comprehensive urban road network in Bangalore, including flyovers, underpasses, and pedestrian walkways.",
    image: "/placeholder.svg?height=800&width=1200",
    location: "Karnataka, India",
    year: "2021",
    client: "Bangalore Development Authority",
    featured: true,
  },
  {
    id: 4,
    title: "Chennai Coastal Highway",
    category: "Road Construction",
    description:
      "Construction of a 120 km coastal highway connecting Chennai to neighboring coastal towns, designed to withstand extreme weather conditions.",
    image: "/placeholder.svg?height=800&width=1200",
    location: "Tamil Nadu, India",
    year: "2020",
    client: "Tamil Nadu Road Development Company",
    featured: false,
  },
  {
    id: 5,
    title: "Delhi Metro Bridge Extensions",
    category: "Bridge Construction",
    description:
      "Construction of multiple bridge extensions for the Delhi Metro, enabling the expansion of the metro network to suburban areas.",
    image: "/placeholder.svg?height=800&width=1200",
    location: "Delhi, India",
    year: "2019",
    client: "Delhi Metro Rail Corporation",
    featured: false,
  },
  {
    id: 6,
    title: "Hyderabad Smart City Infrastructure",
    category: "Infrastructure Development",
    description:
      "Development of smart city infrastructure in Hyderabad, including intelligent traffic management systems and public spaces.",
    image: "/placeholder.svg?height=800&width=1200",
    location: "Telangana, India",
    year: "2018",
    client: "Hyderabad Municipal Corporation",
    featured: false,
  },
]

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Construction projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl mb-8">Explore our portfolio of successful infrastructure projects across India.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our most significant and impactful infrastructure projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-16">
            {projects
              .filter((project) => project.featured)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  <div
                    className={`relative h-80 md:h-96 rounded-lg overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-primary mr-2" />
                        <span className="text-gray-600">{project.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        <span className="text-gray-600">{project.year}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                      <span className="font-medium">Client:</span> {project.client}
                    </p>
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      View Project Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">More Projects</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover our other successful projects that showcase our expertise in various areas of construction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((project) => !project.featured)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-60">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <span className="text-gray-600 text-sm">{project.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span className="text-gray-600 text-sm">{project.year}</span>
                      </div>
                    </div>
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 md:mb-0 md:w-2/3"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a Project in Mind?</h2>
              <p className="text-primary-foreground text-lg">
                Let's discuss how we can bring your vision to life with our expertise in infrastructure development.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-md font-medium inline-flex items-center"
              >
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

