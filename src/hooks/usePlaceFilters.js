import { useMemo, useState } from 'react'

export function usePlaceFilters(places, { withRecentlyVisited = false } = {}) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [country, setCountry] = useState('all')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [sort, setSort] = useState('newest')
  const [view, setView] = useState('grid')

  const countries = useMemo(
    () => Array.from(new Set(places.map((p) => p.country).filter(Boolean))).sort(),
    [places]
  )

  const categories = useMemo(
    () => Array.from(new Set(places.map((p) => p.category || 'other'))),
    [places]
  )

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()

    let result = places.filter((p) => {
      const matchesSearch =
        !term ||
        p.name?.toLowerCase().includes(term) ||
        p.country?.toLowerCase().includes(term) ||
        p.notes?.toLowerCase().includes(term)

      const matchesCategory = category === 'all' || (p.category || 'other') === category
      const matchesCountry = country === 'all' || p.country === country
      const matchesFavorite = !favoritesOnly || p.favorite

      return matchesSearch && matchesCategory && matchesCountry && matchesFavorite
    })

    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return a.id - b.id
        case 'az':
          return (a.name || '').localeCompare(b.name || '')
        case 'recent-visited':
          return (b.visitedAt || 0) - (a.visitedAt || 0)
        case 'newest':
        default:
          return b.id - a.id
      }
    })

    return result
  }, [places, search, category, country, favoritesOnly, sort])

  return {
    filtered,
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
  }
}
