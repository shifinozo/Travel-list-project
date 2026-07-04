// Free geocoding via OpenStreetMap's Nominatim — no API key required.
// Usage policy: keep requests light (this app only geocodes on add).
export async function geocodePlace(name, country) {
  const query = encodeURIComponent(`${name}, ${country}`)
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${query}`
    )
    if (!res.ok) return null
    const results = await res.json()
    if (!results.length) return null
    return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) }
  } catch {
    return null
  }
}
