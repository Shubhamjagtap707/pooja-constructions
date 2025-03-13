"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, CheckCircle, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="About Pooja Constructions"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl mb-8">
              Learn about our journey, mission, and commitment to excellence in infrastructure development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2000, Pooja Constructions has grown from a small local contractor to one of the leading
                infrastructure development companies in India. With a focus on quality, innovation, and customer
                satisfaction, we have successfully completed numerous projects across the country.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began with small road construction projects, but our commitment to excellence quickly earned
                us a reputation for delivering high-quality work. This led to larger projects, including major highways,
                bridges, and other infrastructure developments.
              </p>
              <p className="text-gray-600 mb-4">
                Today, we operate a state-of-the-art bitumen plant and have a team of experienced professionals
                dedicated to providing the best construction solutions. Our success is built on our core values of
                integrity, quality, and customer focus.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-80 md:h-96 rounded-lg overflow-hidden"
            >
              <Image src="/placeholder.svg?height=800&width=1200" alt="Company history" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission, Vision & Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and define our approach to infrastructure development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Our Mission",
                description:
                  "To deliver high-quality infrastructure solutions that contribute to the development of communities and improve the quality of life for people across India.",
                points: [
                  "Provide exceptional construction services",
                  "Maintain the highest standards of quality and safety",
                  "Contribute to the development of communities",
                  "Deliver projects on time and within budget",
                ],
              },
              {
                title: "Our Vision",
                description:
                  "To be the most trusted and respected infrastructure development company in India, known for our quality, innovation, and commitment to excellence.",
                points: [
                  "Lead the industry in quality and innovation",
                  "Expand our presence across India",
                  "Continuously improve our processes and technologies",
                  "Build long-term relationships with clients and partners",
                ],
              },
              {
                title: "Our Values",
                description: "Our core values define who we are and guide our actions in everything we do.",
                points: [
                  "Integrity: We conduct our business with honesty and transparency",
                  "Quality: We are committed to delivering the highest quality in all our projects",
                  "Safety: We prioritize the safety of our employees and the public",
                  "Innovation: We continuously seek better ways to serve our clients",
                ],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <ul className="space-y-3">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals who lead our company and drive our success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                position: "Founder & CEO",
                image: "/placeholder.svg?height=400&width=400",
                bio: "With over 25 years of experience in the construction industry, Rajesh has led the company from its inception to become a leading infrastructure developer.",
              },
              {
                name: "Priya Sharma",
                position: "Chief Operations Officer",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Priya oversees all operational aspects of the company, ensuring that projects are delivered on time and to the highest standards of quality.",
              },
              {
                name: "Amit Patel",
                position: "Chief Technical Officer",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Amit leads our technical team, bringing innovative solutions to complex engineering challenges in our infrastructure projects.",
              },
              {
                name: "Sunita Verma",
                position: "Head of Bitumen Division",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Sunita manages our bitumen plant operations and ensures the quality and timely delivery of our bitumen products to clients.",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-80">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Over the years, we have achieved significant milestones and received recognition for our work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-6">
                <Award className="h-12 w-12 text-primary mr-4" />
                <h3 className="text-2xl font-bold">Awards & Recognition</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Excellence in Infrastructure Development Award, 2022",
                  "Best Road Construction Company, Construction Industry Awards, 2021",
                  "Quality Leadership Award, National Infrastructure Summit, 2020",
                  "Safety Excellence Award, Construction Safety Council, 2019",
                  "Green Construction Practices Award, 2018",
                ].map((award, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600">{award}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-6">
                <Users className="h-12 w-12 text-primary mr-4" />
                <h3 className="text-2xl font-bold">Key Milestones</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Completed 100+ infrastructure projects across India",
                  "Expanded operations to 10 states across India",
                  "Established state-of-the-art bitumen plant in 2015",
                  "Achieved ISO 9001:2015 certification for quality management",
                  "Completed our first international project in 2019",
                ].map((milestone, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-600">{milestone}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from some of our satisfied clients about their experience working with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Pooja Constructions delivered our highway project ahead of schedule and with exceptional quality. Their team was professional, responsive, and a pleasure to work with.",
                name: "Suresh Mehta",
                position: "Director, National Highways Authority of India",
              },
              {
                quote:
                  "We have been using bitumen products from Pooja Constructions for several years now. The quality is consistently excellent, and their customer service is outstanding.",
                name: "Anita Desai",
                position: "Procurement Manager, Metro Construction Ltd.",
              },
              {
                quote:
                  "The bridge constructed by Pooja Constructions has become a landmark in our city. Their attention to detail and commitment to quality is evident in every aspect of the project.",
                name: "Vikram Singh",
                position: "Municipal Commissioner, Jaipur",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-6">
                  <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-6 italic">{testimonial.quote}</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.position}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
              <p className="text-primary-foreground text-lg">
                Contact us today to discuss your infrastructure development needs and how we can help.
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

