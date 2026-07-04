import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getCategory } from '../constants/categories'

function createPinIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="width:18px;height:18px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.45)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 18],
    popupAnchor: [0, -18],
  })
}

const goldIcon = createPinIcon('#c9a44c')
const greenIcon = createPinIcon('#2e7d47')

function MapPlacesView({ places, status = 'pending' }) {
  const withCoords = places.filter((p) => p.lat != null && p.lng != null)
  const withoutCoords = places.length - withCoords.length
  const icon = status === 'visited' ? greenIcon : goldIcon

  let mapProps
  if (withCoords.length > 1) {
    const lats = withCoords.map((p) => p.lat)
    const lngs = withCoords.map((p) => p.lng)
    mapProps = {
      bounds: [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
      ],
      boundsOptions: { padding: [48, 48] },
    }
  } else if (withCoords.length === 1) {
    mapProps = { center: [withCoords[0].lat, withCoords[0].lng], zoom: 8 }
  } else {
    mapProps = { center: [20, 0], zoom: 2 }
  }

  return (
    <div>
      {withoutCoords > 0 && (
        <p className="text-xs text-ink/40 mb-3 text-center">
          {withoutCoords} place{withoutCoords > 1 ? 's' : ''} without location data
          {withoutCoords > 1 ? " aren't" : " isn't"} shown on the map.
        </p>
      )}
      <div
        className="rounded-2xl overflow-hidden border border-gold/20 shadow-premium"
        style={{ height: 480 }}
      >
        <MapContainer
          {...mapProps}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {withCoords.map((place) => {
            const cat = getCategory(place.category)
            return (
              <Marker key={place.id} position={[place.lat, place.lng]} icon={icon}>
                <Popup>
                  <div style={{ minWidth: 160 }}>
                    <img
                      src={place.image}
                      alt={place.name}
                      style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 6, marginBottom: 6 }}
                    />
                    <strong>{place.name}</strong>
                    <div style={{ fontSize: 12, color: '#9c7c2f', letterSpacing: '0.05em' }}>
                      {place.country?.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 12, marginTop: 2 }}>
                      {cat.icon} {cat.label}
                    </div>
                    {place.notes && (
                      <p style={{ fontSize: 12, marginTop: 4, color: '#555' }}>{place.notes}</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>
    </div>
  )
}

export default MapPlacesView
