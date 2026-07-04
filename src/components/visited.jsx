import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { deleteplace, toggleFavorite, setRating } from '../redux/placeslice'
import Navbar from './navbar'
import { useNavigate } from 'react-router-dom'
import { usePlaceFilters } from '../hooks/usePlaceFilters'
import SearchFilterBar from './SearchFilterBar'
import StarRating from './StarRating'
import ConfirmDialog from './ConfirmDialog'
import MapPlacesView from './MapPlacesView'
import { getCategory } from '../constants/categories'

function Visited() {
  const visitedPlaces = useSelector((state) => state.places.visited)
  const navigater = useNavigate()
  const dispatch = useDispatch()
  const filters = usePlaceFilters(visitedPlaces, { withRecentlyVisited: true })
  const { filtered, view } = filters
  const [confirmId, setConfirmId] = useState(null)

  const isGrid = view === 'grid'
  const isMap = view === 'map'

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
        <SearchFilterBar filters={filters} />

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

        {visitedPlaces.length > 0 && filtered.length === 0 && (
          <div className="text-center py-16 border border-dashed border-gold/40 rounded-2xl">
            <p className="font-serif text-xl text-ink/70">No matches found</p>
            <p className="text-sm text-ink/40 mt-2 tracking-wide">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        {isMap && filtered.length > 0 && <MapPlacesView places={filtered} status="visited" />}

        {!isMap && (
        <div
          className={
            isGrid
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'
              : 'flex flex-col gap-4'
          }
        >
          {filtered.map((place, index) => {
            const cat = getCategory(place.category)
            return (
              <motion.div
                key={place.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className={
                  isGrid
                    ? 'group bg-white rounded-2xl overflow-hidden shadow-premium border border-gold/10'
                    : 'group bg-white rounded-2xl overflow-hidden shadow-premium border border-gold/10 flex flex-col sm:flex-row'
                }
              >
                <div className={`relative overflow-hidden ${isGrid ? '' : 'sm:w-56 shrink-0'}`}>
                  <img
                    src={place.image}
                    alt={place.name}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                      isGrid ? 'h-48' : 'h-48 sm:h-full'
                    }`}
                  />
                  <span className="absolute top-3 right-3 bg-gold text-ink text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-semibold">
                    Visited
                  </span>
                  <button
                    onClick={() => dispatch(toggleFavorite(place.id))}
                    className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                      place.favorite ? 'bg-gold text-ink' : 'bg-ink/60 text-white/80 hover:bg-gold hover:text-ink'
                    }`}
                    aria-label="Toggle favorite"
                  >
                    {place.favorite ? '♥' : '♡'}
                  </button>
                </div>

                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-serif text-xl font-semibold text-ink">
                      {place.name}
                    </h2>
                    <span className="text-xs text-ink/50 shrink-0" title={cat.label}>
                      {cat.icon} {cat.label}
                    </span>
                  </div>
                  <p className="text-gold text-xs tracking-[0.2em] uppercase mt-1">
                    {place.country}
                  </p>

                  <div className="mt-2">
                    <StarRating
                      value={place.rating || 0}
                      onChange={(rating) => dispatch(setRating({ id: place.id, rating }))}
                    />
                  </div>

                  <p className="text-ink/60 text-sm mt-3 leading-relaxed">
                    {place.notes}
                  </p>

                  {place.visitedAt && (
                    <p className="text-ink/40 text-xs mt-2">
                      Visited {new Date(place.visitedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  )}

                  <div className="mt-5 pt-4 border-t border-gold/10">
                    <button
                      onClick={() => setConfirmId(place.id)}
                      className="text-ink/40 hover:text-red-500 text-sm transition-colors duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmId !== null}
        title="Remove destination?"
        message="This will permanently remove it from your visited places."
        onCancel={() => setConfirmId(null)}
        onConfirm={() => {
          dispatch(deleteplace(confirmId))
          setConfirmId(null)
        }}
      />
    </div>
  )
}

export default Visited
