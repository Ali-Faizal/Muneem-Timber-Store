'use client'

import Link from 'next/link'
import { Box, Home, FileText, Phone } from 'lucide-react'
import features from '../data/features'

const iconMap = {
  box: Box,
  home: Home,
  file: FileText,
  phone: Phone,
}

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-10 py-10 mt-[50px]">
      {features.map((item, index) => {
        const Icon = iconMap[item.icon]

        return (
          <Link key={index} href={item.link}>
            <div className={`rounded-2xl p-6 cursor-pointer transition hover:scale-105 ${item.color}`}>
              
              <div className="mb-3">
                <Icon size={28} />
              </div>

              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>

              <p className="text-sm opacity-70 mt-1">
                {item.desc}
              </p>

            </div>
          </Link>
        )
      })}
    </div>
  )
}