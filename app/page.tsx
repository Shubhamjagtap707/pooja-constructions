"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Building, Clock, Truck } from "lucide-react"

const projectSlides = [
  {
    image: "/images/projects/project1.jpg",
    title: "Mumbai-Pune Expressway",
  },
  {
    image: "/images/projects/project2.jpg",
    title: "Ganga River Bridge",
  },
  {
    image: "/images/projects/project3.jpg",
    title: "Urban Infrastructure",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projectSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={projectSlides[currentSlide].image || "/placeholder.svg"}
              alt={projectSlides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-4 z-10 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Building Infrastructure for a Better Tomorrow
            </h1>
            <p className="text-xl mb-8">
              Pooja Constructions specializes in road and bridge construction with a commitment to quality, durability,
              and innovation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium inline-flex items-center shadow-lg"
                >
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/projects"
                  className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md font-medium inline-flex items-center shadow-lg"
                >
                  Our Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
          {projectSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-primary w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Pooja Constructions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              With years of experience in the construction industry, we deliver high-quality infrastructure projects on
              time and within budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Building className="h-10 w-10 text-primary" />,
                title: "Expert Engineering",
                description:
                  "Our team of experienced engineers ensures that every project meets the highest standards of quality and safety.",
              },
              {
                icon: <Clock className="h-10 w-10 text-primary" />,
                title: "Timely Delivery",
                description:
                  "We understand the importance of deadlines and strive to complete all projects on time without compromising on quality.",
              },
              {
                icon: <Award className="h-10 w-10 text-primary" />,
                title: "Quality Assurance",
                description:
                  "We use only the highest quality materials and follow strict quality control measures throughout the construction process.",
              },
              {
                icon: <Truck className="h-10 w-10 text-primary" />,
                title: "Bitumen Production",
                description: "Our bitumen plant produces high-quality bitumen products for various construction needs.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of construction services to meet all your infrastructure development needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.svg?height=600&width=800",
                title: "Road Construction",
                description:
                  "From highways to local roads, we specialize in building durable and safe roadways that connect communities.",
              },
              {
                image: "/placeholder.svg?height=600&width=800",
                title: "Bridge Construction",
                description:
                  "Our expert team designs and constructs bridges that are both functional and aesthetically pleasing.",
              },
              {
                image: "/placeholder.svg?height=600&width=800",
                title: "Bitumen Products",
                description:
                  "We produce and supply high-quality bitumen products for various construction applications.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={800}
                  height={600}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="mb-4">{service.description}</p>
                  <Link href="/services" className="inline-flex items-center text-primary-foreground hover:underline">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20 bg-gray-50">
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
              Take a look at some of our recent projects that showcase our expertise and commitment to quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.svg?height=600&width=800",
                title: "Highway Expansion Project",
                location: "Mumbai-Pune Expressway",
                year: "2023",
              },
              {
                image: "/placeholder.svg?height=600&width=800",
                title: "Suspension Bridge",
                location: "River Ganges, Rishikesh",
                year: "2022",
              },
              {
                image: "/placeholder.svg?height=600&width=800",
                title: "Urban Road Network",
                location: "Bangalore City",
                year: "2021",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-60">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="flex justify-between text-gray-600 mb-4">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                  <Link href="/projects" className="inline-flex items-center text-primary hover:underline">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/projects"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium inline-flex items-center"
              >
                View All Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Next Project?</h2>
              <p className="text-primary-foreground text-lg">
                Contact us today to discuss your construction needs and get a free quote.
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

