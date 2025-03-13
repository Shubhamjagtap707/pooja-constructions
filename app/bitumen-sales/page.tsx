"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Download, Truck } from "lucide-react"

export default function BitumenSalesPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Bitumen plant"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Bitumen Products</h1>
            <p className="text-xl mb-8">
              High-quality bitumen products for all your construction and road development needs.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#products"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium inline-flex items-center"
              >
                Explore Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Our Bitumen Plant */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Bitumen Plant</h2>
              <p className="text-gray-600 mb-6">
                Pooja Constructions operates a state-of-the-art bitumen plant that produces high-quality bitumen
                products for various construction applications. Our plant is equipped with the latest technology to
                ensure consistent quality and optimal performance of our products.
              </p>
              <p className="text-gray-600 mb-6">
                We maintain strict quality control measures throughout the production process, from sourcing raw
                materials to the final product. This ensures that our bitumen products meet the highest industry
                standards and specifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#products"
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium inline-flex items-center"
                  >
                    View Products <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-md font-medium inline-flex items-center"
                  >
                    Request Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-80 md:h-96 rounded-lg overflow-hidden"
            >
              <Image src="/placeholder.svg?height=800&width=1200" alt="Bitumen plant" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Bitumen Products</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of bitumen products to meet various construction requirements. Our products
              are known for their quality, consistency, and performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "VG-10 Bitumen",
                description:
                  "A low viscosity grade bitumen ideal for spray applications and surface dressing in cold regions.",
                image: "/placeholder.svg?height=600&width=800",
                specifications: [
                  "Penetration at 25°C: 80-100",
                  "Softening Point: 40-45°C",
                  "Flash Point: 220°C min",
                  "Solubility in trichloroethylene: 99.0% min",
                ],
                applications: [
                  "Surface dressing",
                  "Paving in cold regions",
                  "Spray applications",
                  "Dust control on unpaved roads",
                ],
              },
              {
                title: "VG-30 Bitumen",
                description:
                  "A medium viscosity grade bitumen perfect for road construction in moderate to warm climates.",
                image: "/placeholder.svg?height=600&width=800",
                specifications: [
                  "Penetration at 25°C: 50-70",
                  "Softening Point: 47-55°C",
                  "Flash Point: 220°C min",
                  "Solubility in trichloroethylene: 99.0% min",
                ],
                applications: ["Highway construction", "Heavy traffic roads", "Urban roads", "Industrial pavements"],
              },
              {
                title: "Modified Bitumen",
                description:
                  "Bitumen enhanced with polymers for improved durability, elasticity, and resistance to deformation.",
                image: "/placeholder.svg?height=600&width=800",
                specifications: [
                  "Penetration at 25°C: 40-60",
                  "Softening Point: 55-65°C",
                  "Elastic Recovery: 70% min",
                  "Storage Stability: 2°C max",
                ],
                applications: [
                  "High-stress areas",
                  "Bridges and flyovers",
                  "Heavy traffic highways",
                  "Areas with extreme temperature variations",
                ],
              },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>

                  <h4 className="font-semibold mb-2">Specifications:</h4>
                  <ul className="space-y-2 mb-4">
                    {product.specifications.map((spec, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{spec}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold mb-2">Applications:</h4>
                  <ul className="space-y-2 mb-4">
                    {product.applications.map((app, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{app}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Link href="/contact" className="inline-flex items-center text-primary hover:underline">
                      Request a quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Bitumen Products</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our bitumen products offer numerous advantages that make them the preferred choice for construction
              professionals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <CheckCircle className="h-10 w-10 text-primary" />,
                title: "Superior Quality",
                description:
                  "Our bitumen products are manufactured under strict quality control to ensure consistent performance.",
              },
              {
                icon: <Truck className="h-10 w-10 text-primary" />,
                title: "Timely Delivery",
                description:
                  "We ensure prompt delivery of our products to your construction site, helping you maintain your project schedule.",
              },
              {
                icon: <Download className="h-10 w-10 text-primary" />,
                title: "Technical Support",
                description:
                  "Our team of experts provides technical support and guidance on the selection and application of our products.",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-primary" />,
                title: "Customized Solutions",
                description:
                  "We can customize our bitumen products to meet specific project requirements and performance criteria.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Order</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Ordering our bitumen products is a simple and straightforward process. Follow these steps to place your
              order.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Contact Us",
                description:
                  "Get in touch with our sales team through our contact form, email, or phone to discuss your requirements.",
              },
              {
                step: "02",
                title: "Receive Quote",
                description:
                  "Based on your requirements, we will provide you with a detailed quote including pricing and delivery timeline.",
              },
              {
                step: "03",
                title: "Confirm Order",
                description:
                  "Once you approve the quote, confirm your order and make the necessary payment arrangements.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow relative overflow-hidden"
              >
                <div className="absolute -top-4 -left-4 bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center">
                  <span className="text-primary text-3xl font-bold">{step.step}</span>
                </div>
                <div className="ml-12">
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium inline-flex items-center"
              >
                Contact Us to Order <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our bitumen products and services.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "What grades of bitumen do you offer?",
                answer:
                  "We offer various grades of bitumen including VG-10, VG-30, and polymer-modified bitumen. Each grade is designed for specific applications and conditions.",
              },
              {
                question: "What is the minimum order quantity?",
                answer:
                  "Our minimum order quantity varies depending on the product. Please contact our sales team for specific information about the product you're interested in.",
              },
              {
                question: "Do you provide delivery services?",
                answer:
                  "Yes, we provide delivery services to construction sites across India. Delivery timelines and costs depend on your location and order quantity.",
              },
              {
                question: "Can you provide technical specifications for your products?",
                answer:
                  "Yes, we can provide detailed technical specifications and safety data sheets for all our bitumen products. Please contact our technical team for more information.",
              },
              {
                question: "Do you offer customized bitumen solutions?",
                answer:
                  "Yes, we can customize our bitumen products to meet specific project requirements. Our technical team can work with you to develop the right solution for your needs.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-6 border-b border-gray-200 pb-6 last:border-0"
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Don't see your question here? Contact us for more information.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium inline-flex items-center"
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

