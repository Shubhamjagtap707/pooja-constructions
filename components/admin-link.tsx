"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"

export default function AdminLink() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
      <Link
        href="/admin/login"
        className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors"
      >
        <Lock className="h-4 w-4 mr-1" />
        <span>Admin</span>
      </Link>
    </motion.div>
  )
}

