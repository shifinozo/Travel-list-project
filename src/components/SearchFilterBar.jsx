import React from 'react'
import { getCategory } from '../constants/categories'

function SearchFilterBar({ filters }) {
  const {
    search,
    setSearch,
    category,
    setCategory,
    country,
    setCountry,
    favoritesOnly,
    setFavoritesOnly,
    sort,
    setSort,
    view,
    setView,
    countries,
    categories,
    withRecentlyVisited,
  } = filters

  const selectClass =
    'bg-white border border-ink/10 rounded-full px-4 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition cursor-pointer'

  return (
    <div className="space-y-4 mb-10">
      <div className="relative max-w-xl mx-auto">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40">🔍</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, country or notes..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-ink/10 rounded-full text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
          <option value="all">All Categories</option>
          {categories.map((c) => {
            const meta = getCategory(c)
            return (
              <option key={c} value={c}>
                {meta.icon} {meta.label}
              </option>
            )
          })}
        </select>

        <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectClass}>
          <option value="all">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A-Z</option>
          {withRecentlyVisited && <option value="recent-visited">Recently Visited</option>}
        </select>

        <button
          onClick={() => setFavoritesOnly(!favoritesOnly)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            favoritesOnly
              ? 'bg-gold text-ink border-gold'
              : 'bg-white text-ink/60 border-ink/10 hover:text-ink'
          }`}
        >
          ❤ Favorites
        </button>

        <div className="flex rounded-full border border-ink/10 overflow-hidden">
          <button
            onClick={() => setView('grid')}
            className={`px-3 py-2 text-sm transition-colors ${
              view === 'grid' ? 'bg-ink text-gold' : 'bg-white text-ink/50 hover:text-ink'
            }`}
            aria-label="Grid view"
          >
            ▦
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-3 py-2 text-sm transition-colors ${
              view === 'list' ? 'bg-ink text-gold' : 'bg-white text-ink/50 hover:text-ink'
            }`}
            aria-label="List view"
          >
            ☰
          </button>
          <button
            onClick={() => setView('map')}
            className={`px-3 py-2 text-sm transition-colors ${
              view === 'map' ? 'bg-ink text-gold' : 'bg-white text-ink/50 hover:text-ink'
            }`}
            aria-label="Map view"
          >
            🗺
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchFilterBar
