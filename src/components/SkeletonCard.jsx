import React from 'react'

function Shimmer({ className }) {
  return (
    <div className={`relative overflow-hidden bg-ink/10 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-premium border border-gold/10">
      <Shimmer className="w-full h-48" />
      <div className="p-6 space-y-3">
        <Shimmer className="h-5 w-2/3 rounded" />
        <Shimmer className="h-3 w-1/3 rounded" />
        <Shimmer className="h-3 w-full rounded" />
      </div>
    </div>
  )
}

export function SkeletonScreen() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl w-full px-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  )
}

export default SkeletonCard
