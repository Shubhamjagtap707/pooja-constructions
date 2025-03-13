"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Construction services"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl mb-8">
              Comprehensive construction solutions for all your infrastructure development needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-20">
            {/* Road Construction */}
            <div id="road-construction" className="scroll-mt-24">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold mb-4">Road Construction</h2>
                  <p className="text-gray-600 mb-6">
                    We specialize in constructing high-quality roads that are built to last. From highways and
                    expressways to urban roads and rural connections, our team has the expertise to handle projects of
                    any scale.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Highway and expressway construction",
                      "Urban road networks",
                      "Rural road development",
                      "Road maintenance and rehabilitation",
                      "Asphalt paving and concrete roads",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center text-primary hover:underline">
                    Request a quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative h-80 md:h-96 rounded-lg overflow-hidden"
                >
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt="Road construction"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Bridge Construction */}
            <div id="bridge-construction" className="scroll-mt-24">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="order-2 md:order-1 relative h-80 md:h-96 rounded-lg overflow-hidden"
                >
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt="Bridge construction"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="order-1 md:order-2"
                >
                  <h2 className="text-3xl font-bold mb-4">Bridge Construction</h2>
                  <p className="text-gray-600 mb-6">
                    Our bridge construction services combine innovative engineering with meticulous execution to create
                    structures that are both functional and visually impressive. We handle all aspects of bridge
                    construction from design to completion.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Concrete and steel bridges",
                      "Suspension and cable-stayed bridges",
                      "Arch and truss bridges",
                      "Pedestrian bridges",
                      "Bridge repair and rehabilitation",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center text-primary hover:underline">
                    Request a quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Infrastructure Development */}
            <div id="infrastructure" className="scroll-mt-24">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold mb-4">Infrastructure Development</h2>
                  <p className="text-gray-600 mb-6">
                    We provide comprehensive infrastructure development services that help communities grow and thrive.
                    Our team works on projects that enhance connectivity, improve public facilities, and support
                    economic growth.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Urban planning and development",
                      "Public transportation infrastructure",
                      "Water supply and drainage systems",
                      "Commercial and industrial infrastructure",
                      "Smart city infrastructure solutions",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center text-primary hover:underline">
                    Request a quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative h-80 md:h-96 rounded-lg overflow-hidden"
                >
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt="Infrastructure development"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bitumen Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bitumen Products</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our bitumen plant produces high-quality bitumen products for various construction applications. We offer a
              range of bitumen grades to meet different project requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "VG-10 Bitumen",
                description: "Ideal for spray applications and surface dressing in cold regions.",
                applications: ["Surface dressing", "Paving in cold regions", "Spray applications"],
              },
              {
                title: "VG-30 Bitumen",
                description: "Perfect for road construction in moderate to warm climates.",
                applications: ["Highway construction", "Heavy traffic roads", "Urban roads"],
              },
              {
                title: "Modified Bitumen",
                description: "Enhanced with polymers for improved durability and performance.",
                applications: ["High-stress areas", "Bridges", "Heavy traffic highways"],
              },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-3">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <h4 className="font-semibold mb-2">Applications:</h4>
                <ul className="space-y-2">
                  {product.applications.map((app, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{app}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/bitumen-sales"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium inline-flex items-center"
              >
                Learn More About Our Bitumen Products <ArrowRight className="ml-2 h-5 w-5" />
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-primary-foreground text-lg">
                Our team of experts is ready to help you with your specific construction requirements.
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

