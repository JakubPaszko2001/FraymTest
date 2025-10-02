'use client'
import React from 'react'

export default function GridOverlay() {
  const columns = 12
  const cols = Array.from({ length: columns })

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <div className="h-full grid grid-cols-12 gap-[20px]">
        {cols.map((_, i) => (
          <div key={i} className="bg-[rgba(255,0,0,0.1)]" />
        ))}
      </div>
    </div>
  )
}
