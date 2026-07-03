import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <div className="bg-ink sticky top-0 z-50 border-b border-gold/20 shadow-premium">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 md:px-10 py-5">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <svg
            className="w-7 h-7 text-gold transition-transform duration-300 group-hover:-translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4.5-1 4.5 1v-1.5L13 19v-5.5l8 2.5z"
            />
          </svg>
          <div className="leading-tight">
            <h1 className="font-serif text-2xl font-semibold text-ivory tracking-wide">
              OZO
            </h1>
            <p className="text-[10px] tracking-[0.35em] text-gold/80 uppercase -mt-1">
              Curated Journeys
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/visited')}
            className="border border-gold/40 text-ivory px-5 py-2 rounded-full text-sm font-medium tracking-wide hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300"
          >
            Visited
          </button>

          <button
            onClick={() => navigate('/add')}
            className="bg-gold text-ink px-5 py-2 rounded-full text-sm font-semibold tracking-wide shadow-md hover:bg-gold-light transition-all duration-300"
          >
            Add Place
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
