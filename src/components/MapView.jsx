import { MapContainer, Marker, Popup, Polyline, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { routeStops, categoryMap } from '../data/tripData'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const stopCoords = {
  Denver: [39.7392, -104.9903],
  Moab: [38.5733, -109.5498],
  Torrey: [38.2994, -111.4199],
  Bryce: [37.6722, -112.1569],
  Zion: [37.1889, -112.9986],
  'Near Zion': [37.0965, -113.5684],
  'Las Vegas': [36.1699, -115.1398],
}

export default function MapView({ selectedCategory, selectedLocation, onCategoryChange }) {
  const route = routeStops.map((stop) => stop.coords)
  const categoryItems = categoryMap[selectedCategory] || []

  const visibleItems = categoryItems.filter((item) => {
    if (selectedLocation === 'All stops') return true
    return item.location === selectedLocation || (selectedLocation === 'Zion' && item.location === 'Near Zion')
  })

  return (
    <div className="map-shell">
      <div className="map-top">
        <div className="map-copy">
          <p className="eyebrow">Route map</p>
          <h3>Trip route + selected stops</h3>
          <p>
            The map keeps the full route visible from Denver to Las Vegas, while pins update to match the category and stop filter.
          </p>
        </div>

        <div className="control-card map-filter">
          <label htmlFor="map-category">Map category</label>
          <select id="map-category" value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
            {Object.keys(categoryMap).map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <MapContainer center={[37.7, -111.6]} zoom={6} scrollWheelZoom={false} className="map-frame">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline positions={route} />

        {routeStops.map((stop) => (
          <Marker position={stop.coords} key={stop.id}>
            <Popup>
              <strong>{stop.name}</strong>
              <br />
              {stop.blurb}
            </Popup>
          </Marker>
        ))}

        {visibleItems.map((item) => (
          <Marker position={stopCoords[item.location] || stopCoords['Las Vegas']} key={`${item.name}-${item.location}`}>
            <Popup>
              <strong>{item.name}</strong>
              <br />
              {item.location}
              <br />
              {item.note}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
