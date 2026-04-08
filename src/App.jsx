
import React, { useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, Polyline, TileLayer } from "react-leaflet";
import { Church, ExternalLink, Hotel, MapPin, Mountain, Search, Sparkles, Trees, UtensilsCrossed, Route, Star, Sun, Camera } from "lucide-react";

const tabs = [
  { id: "attractions", label: "Attractions", icon: MapPin },
  { id: "marriotts", label: "Hotels & Resorts", icon: Hotel },
  { id: "national", label: "National Parks", icon: Trees },
  { id: "state", label: "State Parks", icon: Mountain },
  { id: "catholic", label: "Catholic Sites", icon: Church },
  { id: "restaurants", label: "Restaurants", icon: UtensilsCrossed },
];

const markerIcon = new L.DivIcon({ className: "custom-marker", html: '<div class="marker-pin"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });

const routeStops = [
  { name: "Denver", lat: 39.7392, lng: -104.9903 },
  { name: "Moab", lat: 38.5733, lng: -109.5498 },
  { name: "Torrey", lat: 38.2997, lng: -111.4199 },
  { name: "Bryce Canyon City", lat: 37.6725, lng: -112.1563 },
  { name: "Springdale", lat: 37.1889, lng: -112.9986 },
  { name: "Las Vegas", lat: 36.1699, lng: -115.1398 },
];

const data = {
  attractions: [
    { name: "Arches National Park", place: "Moab", category: "National Park", lat: 38.7331, lng: -109.5925, summary: "Famous red-rock arches, easy viewpoints, and a strong wow-per-step ratio.", bestTime: "Sunrise or sunset", foodNote: "Plan lunch back in Moab before the hottest part of the day.", official: "https://www.nps.gov/arch/index.htm", reserve: "https://www.nps.gov/arch/planyourvisit/fees.htm", weather: "https://www.nps.gov/arch/planyourvisit/weather.htm", maps: "https://www.google.com/maps/search/Arches+National+Park", photos: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Capitol Reef National Park", place: "Torrey", category: "National Park", lat: 38.2917, lng: -111.2615, summary: "A calmer, gentler park with scenic drives, orchards, and less crowd stress.", bestTime: "Morning or late afternoon", foodNote: "Excellent for a slower day.", official: "https://www.nps.gov/care/index.htm", reserve: "https://www.nps.gov/care/planyourvisit/fees.htm", weather: "https://www.nps.gov/care/planyourvisit/weather.htm", maps: "https://www.google.com/maps/search/Capitol+Reef+National+Park", photos: ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Bryce Canyon National Park", place: "Bryce Canyon City", category: "National Park", lat: 37.593, lng: -112.1871, summary: "Big views from easy overlooks. One of the best beauty-per-effort stops on the route.", bestTime: "Sunrise or late afternoon", foodNote: "Start early, then slow lunch.", official: "https://www.nps.gov/brca/index.htm", reserve: "https://www.nps.gov/brca/planyourvisit/fees.htm", weather: "https://www.nps.gov/brca/planyourvisit/weather.htm", maps: "https://www.google.com/maps/search/Bryce+Canyon+National+Park", photos: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Zion National Park", place: "Springdale", category: "National Park", lat: 37.2982, lng: -113.0263, summary: "Classic canyon walls, shuttle access, and lots of beauty without needing risky adventures.", bestTime: "Very early morning", foodNote: "Use Springdale as your comfort base.", official: "https://www.nps.gov/zion/index.htm", reserve: "https://www.nps.gov/zion/planyourvisit/fees.htm", weather: "https://www.nps.gov/zion/planyourvisit/weather.htm", maps: "https://www.google.com/maps/search/Zion+National+Park", photos: ["https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Bellagio Conservatory & Fountains", place: "Las Vegas", category: "Scenic City Stop", lat: 36.1126, lng: -115.1767, summary: "Beautiful, low-effort Vegas stop with flowers, water, and zero need for chaos.", bestTime: "Evening", foodNote: "Pair with a nice dinner and show night.", official: "https://bellagio.mgmresorts.com/en/entertainment/bellagio-fountains.html", reserve: "https://bellagio.mgmresorts.com/en/entertainment/bellagio-fountains.html", weather: "https://weather.gov/", maps: "https://www.google.com/maps/search/Bellagio+Fountains", photos: ["https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"] }
  ],
  
  
  marriotts: [
    { name: "SpringHill Suites Moab", place: "Moab", category: "Marriott Hotel", lat: 38.5907, lng: -109.5618, summary: "Top Moab base. Easy access to Arches and Canyonlands.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/SpringHill+Suites+Moab" },
    { name: "Element Moab", place: "Moab", category: "Marriott Hotel", lat: 38.589, lng: -109.562, summary: "Modern, spacious rooms.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/Element+Moab" },
    { name: "Fairfield Inn Moab", place: "Moab", category: "Marriott Hotel", lat: 38.592, lng: -109.563, summary: "Reliable and comfortable.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/Fairfield+Inn+Moab" },

    { name: "Red Cliffs Lodge", place: "Moab", category: "Resort", lat: 38.666, lng: -109.44, summary: "Scenic riverfront stay. More experience-driven.", official: "https://www.redcliffslodge.com/", maps: "https://www.google.com/maps/search/Red+Cliffs+Lodge+Moab" },

    { name: "SpringHill Suites Zion", place: "Zion", category: "Marriott Hotel", lat: 37.1774, lng: -113.0025, summary: "Best Zion Marriott option.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/SpringHill+Suites+Zion" },
    { name: "Cliffrose Springdale", place: "Zion", category: "Resort", lat: 37.188, lng: -112.998, summary: "Premium riverside resort near park entrance.", official: "https://www.cliffroselodge.com/", maps: "https://www.google.com/maps/search/Cliffrose+Springdale" },

    { name: "SpringHill Suites Bryce Canyon", place: "Bryce", category: "Marriott Hotel", lat: 37.673, lng: -112.156, summary: "Only Marriott near Bryce.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/SpringHill+Suites+Bryce+Canyon" },
    { name: "The Lodge at Bryce Canyon", place: "Bryce", category: "Historic Lodge", lat: 37.622, lng: -112.167, summary: "Inside the park. Incredible access.", official: "https://www.nps.gov/", maps: "https://www.google.com/maps/search/Bryce+Canyon+Lodge" },

    { name: "Capitol Reef Resort", place: "Torrey", category: "Resort", lat: 38.292, lng: -111.414, summary: "Best Capitol Reef stay option.", official: "https://www.capitolreefresort.com/", maps: "https://www.google.com/maps/search/Capitol+Reef+Resort" },

    { name: "JW Marriott Las Vegas", place: "Las Vegas", category: "Marriott Hotel", lat: 36.1774, lng: -115.3272, summary: "Quiet resort feel.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/JW+Marriott+Las+Vegas" },
    { name: "Westin Las Vegas", place: "Las Vegas", category: "Marriott Hotel", lat: 36.1147, lng: -115.166, summary: "Non-casino vibe.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/Westin+Las+Vegas" },
    { name: "Renaissance Las Vegas", place: "Las Vegas", category: "Marriott Hotel", lat: 36.134, lng: -115.151, summary: "Elegant and calm.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/Renaissance+Las+Vegas" },
    { name: "Marriott Grand Chateau", place: "Las Vegas", category: "Marriott Hotel", lat: 36.108, lng: -115.169, summary: "No casino. Great comfort.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/Marriott+Grand+Chateau" },
    { name: "The Venetian Resort", place: "Las Vegas", category: "Luxury Resort", lat: 36.121, lng: -115.169, summary: "Upscale, spacious, great dining.", official: "https://www.venetianlasvegas.com/", maps: "https://www.google.com/maps/search/Venetian+Las+Vegas" }
  ],


  national: [],
  state: [
    { name: "Dead Horse Point State Park", place: "Moab", category: "State Park", lat: 38.481, lng: -109.741, summary: "Huge scenic payoff for very little walking.", bestTime: "Sunrise or sunset", foodNote: "Excellent paired with a slow Moab lunch.", official: "https://stateparks.utah.gov/parks/dead-horse/", reserve: "https://stateparks.utah.gov/parks/dead-horse/", weather: "https://weather.gov/", maps: "https://www.google.com/maps/search/Dead+Horse+Point+State+Park", photos: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Kodachrome Basin State Park", place: "Bryce area", category: "State Park", lat: 37.5268, lng: -111.9957, summary: "Colorful, quieter, and a nice alternative to the biggest crowds.", bestTime: "Morning", foodNote: "Great bonus stop for a slower scenic day.", official: "https://stateparks.utah.gov/parks/kodachrome-basin/", reserve: "https://stateparks.utah.gov/parks/kodachrome-basin/", weather: "https://weather.gov/", maps: "https://www.google.com/maps/search/Kodachrome+Basin+State+Park", photos: ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80"] }
  ],
  catholic: [
    { name: "Guardian Angel Cathedral", place: "Las Vegas", category: "Catholic Site", lat: 36.1367, lng: -115.1633, summary: "Quiet, meaningful, and architecturally memorable.", official: "https://www.guardianangelcathedral.org/", maps: "https://www.google.com/maps/search/Guardian+Angel+Cathedral+Las+Vegas", photos: ["https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80"] }
  ],
  restaurants: [
    { name: "Desert Bistro", place: "Moab", category: "Restaurant", lat: 38.5727, lng: -109.5503, summary: "Fine-dining Moab favorite. Great for a comfortable, memorable dinner.", official: "https://www.google.com/maps/search/Desert+Bistro+Moab", maps: "https://www.google.com/maps/search/Desert+Bistro+Moab", photos: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Hell's Backbone Grill", place: "Boulder, Utah", category: "Restaurant", lat: 37.9222, lng: -111.423, summary: "Special-occasion quality food with a scenic-road-trip soul.", official: "https://www.google.com/maps/search/Hells+Backbone+Grill", maps: "https://www.google.com/maps/search/Hells+Backbone+Grill", photos: ["https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Zion Canyon Brew Pub", place: "Springdale", category: "Restaurant", lat: 37.188, lng: -113.0038, summary: "Easy, reliable, and pleasant after a Zion day.", official: "https://www.google.com/maps/search/Zion+Canyon+Brew+Pub", maps: "https://www.google.com/maps/search/Zion+Canyon+Brew+Pub", photos: ["https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Bouchon", place: "Las Vegas", category: "Restaurant", lat: 36.1215, lng: -115.1687, summary: "Elegant Las Vegas meal in a calmer register.", official: "https://www.google.com/maps/search/Bouchon+Las+Vegas", maps: "https://www.google.com/maps/search/Bouchon+Las+Vegas", photos: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"] }
  ],
};

data.national = data.attractions.filter((item) => item.category === "National Park");

const vegasShows = [
  { name: "The Smith Center", summary: "Broadway, concerts, and polished performances in a more elegant setting.", link: "https://thesmithcenter.com/" },
  { name: "Sphere", summary: "Big visual spectacle with music-forward energy and no need to gamble your way through the evening.", link: "https://www.thesphere.com/" },
];


function photoSearchLink(name) {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name)}`;
}

function ActionLink({ href, label }) {
  return <a className="action-link" href={href} target="_blank" rel="noreferrer"><ExternalLink size={14} /><span>{label}</span></a>;
}
function Card({ item, selected, onClick }) {
  return <button className={`card ${selected ? "selected" : ""}`} onClick={onClick}>{item.photos?.[0] ? <img className="card-image" src={item.photos[0]} alt={item.name} /> : <div className="card-badge-art">{item.category}</div>}<div className="eyebrow">{item.category}</div><div className="card-title">{item.name}</div><div className="card-place">{item.place}</div><div className="card-summary">{item.summary}</div></button>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("attractions");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(data.attractions[0]);

  const currentItems = useMemo(() => {
    const items = data[activeTab] || [];
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((item) => `${item.name} ${item.place} ${item.summary} ${item.category}`.toLowerCase().includes(q));
  }, [activeTab, query]);

  React.useEffect(() => {
    if (currentItems.length) setSelected(currentItems[0]);
    else setSelected(null);
  }, [activeTab, query]);

  const allMapItems = useMemo(() => {
    const current = data[activeTab] || [];
    return current.filter((item) => typeof item.lat === "number" && typeof item.lng === "number");
  }, [activeTab]);

  return (
    <div className="shell">
      <header className="hero">
        <div className="hero-title-row">
          <div className="brand-badge"><Route size={22} /></div>
          <div>
            <h1>Mimi and Doc SW2026</h1>
            <p>A colorful, senior-friendly Southwest trip planner with better food, calmer hotels, easier browsing, and simple navigation.</p>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card"><div className="stat-label">Route</div><div className="stat-value">Denver → Moab → Torrey → Bryce → Springdale → Las Vegas</div></div>
          <div className="stat-card"><div className="stat-label">Style</div><div className="stat-value">Comfortable, scenic, food-forward, and senior-aware</div></div>
          <div className="stat-card"><div className="stat-label">Trip length</div><div className="stat-value">7 to 10 days</div></div>
        </div>

        <div className="tab-row">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return <button key={tab.id} className={`tab-button ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}><Icon size={16} /><span>{tab.label}</span></button>;
          })}
        </div>
      </header>

      <main className="content-grid">
        <section className="panel map-panel">
          <div className="panel-title"><MapPin size={18} /> Map</div>
          <div className="panel-subtitle">The map follows the category you choose above.</div>
          <MapContainer center={[38.25, -111.2]} zoom={6} className="map-box" scrollWheelZoom={true}>
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Polyline positions={routeStops.map((s) => [s.lat, s.lng])} pathOptions={{ color: "#d97706", weight: 4 }} />
            {routeStops.map((stop) => <Marker key={stop.name} position={[stop.lat, stop.lng]} icon={markerIcon}><Popup>{stop.name}</Popup></Marker>)}
            {allMapItems.map((item) => <Marker key={item.name} position={[item.lat, item.lng]} icon={markerIcon}><Popup><strong>{item.name}</strong><div>{item.place}</div></Popup></Marker>)}
          </MapContainer>
        </section>

        <section className="panel list-panel">
          <div className="panel-title"><Search size={18} /> Browse</div>
          <div className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}`} /></div>
          <div className="card-list">{currentItems.map((item) => <Card key={item.name} item={item} selected={selected?.name === item.name} onClick={() => setSelected(item)} />)}</div>
        </section>

        <section className="panel detail-panel">
          {selected ? <>
            <div className="detail-header">
              <div><div className="detail-eyebrow">{selected.category}</div><h2>{selected.name}</h2><div className="detail-place">{selected.place}</div></div>
              <div className="detail-links">
                <ActionLink href={selected.official} label="Official" />
                <ActionLink href={selected.maps} label="Map" />
                {selected.reserve && <ActionLink href={selected.reserve} label="Reserve / Fees" />}
                {selected.weather && <ActionLink href={selected.weather} label="Weather" />}
              </div>
            </div>
            <div className="detail-photo-grid">
              <a className="photo-search-card hero-photo-search" href={photoSearchLink(selected.name)} target="_blank" rel="noreferrer">
                <div className="photo-search-icon"><Camera size={28} /></div>
                <div className="photo-search-title">View matched photos for {selected.name}</div>
                <div className="photo-search-copy">Opens a photo search for this exact location instead of showing generic placeholder scenery.</div>
              </a>
              <a className="photo-search-card" href={selected.official} target="_blank" rel="noreferrer">
                <div className="photo-search-title">Official site photos</div>
                <div className="photo-search-copy">Use the official page for more trustworthy imagery and trip details.</div>
              </a>
              <a className="photo-search-card" href={selected.maps} target="_blank" rel="noreferrer">
                <div className="photo-search-title">Open map location</div>
                <div className="photo-search-copy">Jump straight to the exact place in Maps.</div>
              </a>
            </div>
            <div className="detail-copy">
              <p>{selected.summary}</p>
              {selected.bestTime && <div className="mini-row"><Sun size={16} /> Best time: {selected.bestTime}</div>}
              {selected.foodNote && <div className="mini-row"><Star size={16} /> Food note: {selected.foodNote}</div>}
            </div>
          </> : <div className="empty-state">No results in this section yet.</div>}
        </section>

        <section className="panel vegas-panel">
          <div className="panel-title"><Sparkles size={18} /> Las Vegas shows</div>
          <div className="panel-subtitle">Easy, polished options for an evening out.</div>
          <div className="mini-list">{vegasShows.map((show) => <a key={show.name} className="mini-card" href={show.link} target="_blank" rel="noreferrer"><div className="mini-card-title">{show.name}</div><div className="mini-card-copy">{show.summary}</div></a>)}</div>
        </section>
      </main>
    </div>
  );
}
