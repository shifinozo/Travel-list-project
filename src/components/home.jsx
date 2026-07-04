import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from './navbar'
import Listofplaces from '../redux/Listofplaces'

function Home() {
  const pendingCount = useSelector((state) => state.places.pending.length)
  const visitedCount = useSelector((state) => state.places.visited.length)
  const total = pendingCount + visitedCount
  const percent = total === 0 ? 0 : Math.round((visitedCount / total) * 100)

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <div className="bg-ink">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 text-center">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
            Your Private Collection
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-ivory">
            Destinations Worth Chasing
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />

          {total > 0 && (
            <div className="max-w-sm mx-auto mt-8">
              <div className="flex justify-between text-xs text-ivory/60 mb-2">
                <span>Bucket List Progress</span>
                <span>
                  {visitedCount} / {total} · {percent}%
                </span>
              </div>
              <div className="h-1.5 bg-ivory/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Listofplaces />
    </div>
  )
}

export default Home
