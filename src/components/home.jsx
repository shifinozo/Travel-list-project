import React from 'react'
import Navbar from './navbar'
import Listofplaces from '../redux/Listofplaces'

function Home() {
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
        </div>
      </div>

      <Listofplaces />
    </div>
  )
}

export default Home
