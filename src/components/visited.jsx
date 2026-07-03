import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteplace } from '../redux/placeslice'
import Navbar from './navbar'
import { useNavigate } from 'react-router-dom'

function Visited() {
  const visitedPlaces = useSelector((state) => state.places.visited)
  const navigater = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <div className="bg-ink">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 text-center relative">
          <button
            onClick={() => navigater('/')}
            className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 border border-gold/40 text-ivory text-sm px-4 py-2 rounded-full hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300"
          >
            ← Back
          </button>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
            Memories Made
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-ivory">
            Places You've Visited
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14">
        {visitedPlaces.length === 0 && (
          <div className="text-center py-16 border border-dashed border-gold/40 rounded-2xl">
            <p className="font-serif text-xl text-ink/70">
              No visited places yet
            </p>
            <p className="text-sm text-ink/40 mt-2 tracking-wide">
              Once you mark a destination visited, it will appear here.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {visitedPlaces.map((place) => (
            <div
              key={place.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-premium border border-gold/10 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-gold text-ink text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-semibold">
                  Visited
                </span>
              </div>

              <div className="p-6">
                <h2 className="font-serif text-xl font-semibold text-ink">
                  {place.name}
                </h2>
                <p className="text-gold text-xs tracking-[0.2em] uppercase mt-1">
                  {place.country}
                </p>
                <p className="text-ink/60 text-sm mt-3 leading-relaxed">
                  {place.notes}
                </p>

                <div className="mt-5 pt-4 border-t border-gold/10">
                  <button
                    onClick={() => dispatch(deleteplace(place.id))}
                    className="text-ink/40 hover:text-red-500 text-sm transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Visited
