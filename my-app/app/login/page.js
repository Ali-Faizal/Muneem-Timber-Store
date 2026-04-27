'use client'

import { motion } from 'framer-motion'
import AuthForm from '../components/AuthForm'

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-[#0D1B2A]"
    >
      {/* LEFT SLIDE */}
      <motion.div
        initial={{ x: '-100vw', y: 0 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute"
      />

      {/* RIGHT SLIDE */}
      <motion.div
        initial={{ x: '100vw', y: 0 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute"
      />

      {/* TOP SLIDE */}
      <motion.div
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute"
      />

      {/* BOTTOM SLIDE */}
      <motion.div
        initial={{ y: '100vh' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute"
      />

      {/* MAIN LOGIN CARD */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md z-10"
      >
        <AuthForm />
      </motion.div>
    </motion.div>
  )
}

