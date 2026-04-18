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

// export default function LoginPage() {
//   return (
//     <motion.div
//       initial={{ y: '-100%', opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       className="min-h-screen flex items-center justify-center bg-[#0D1B2A]/80 backdrop-blur-md"
//     >
//       {/* Glass Card */}
//       <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
//         <AuthForm />
//       </div>
//     </motion.div>
//   )
// }
// import { motion } from 'framer-motion'
// import AuthForm from '../components/AuthForm'

// export default function LoginPage() {
//   return (
//     <motion.div
//       initial={{ y: '-100%' }}
//       animate={{ y: 0}}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen flex items-center justify-center bg-[#0D1B2A]"
//     >
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         <AuthForm />
//       </div>
//     </motion.div>
//   )
// }
