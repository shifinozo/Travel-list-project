import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteplace, moveToVisited } from './placeslice'

function ListOfPlaces() {
  const places = useSelector((state) => state.places.pending)
  const dispatch = useDispatch()

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-14">
      {places.length === 0 && (
        <div className="text-center py-16 border border-dashed border-gold/40 rounded-2xl">
          <p className="font-serif text-xl text-ink/70">
            Your wishlist is empty
          </p>
          <p className="text-sm text-ink/40 mt-2 tracking-wide">
            Add your first destination to begin the journey.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {places.map((place) => (
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
              <span className="absolute top-3 right-3 bg-ink/80 text-gold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                Pending
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

              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gold/10">
                <button
                  onClick={() => dispatch(moveToVisited(place.id))}
                  className="flex-1 bg-ink text-gold text-sm font-medium py-2 rounded-full hover:bg-gold hover:text-ink transition-colors duration-300"
                >
                  Mark Visited
                </button>

                <button
                  onClick={() => dispatch(deleteplace(place.id))}
                  className="text-ink/40 hover:text-red-500 text-sm transition-colors duration-300"
                  aria-label="Delete"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListOfPlaces
