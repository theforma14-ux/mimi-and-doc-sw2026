
import React, { useMemo, useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, Polyline, TileLayer } from "react-leaflet";
import { Church, ExternalLink, Hotel, MapPin, Mountain, Search, Sparkles, Trees, UtensilsCrossed, Route, Star, Sun, Camera } from "lucide-react";

const tabs = [
  { id: "tripplan", label: "Trip Plan", icon: Route },
  { id: "attractions", label: "Attractions", icon: MapPin },
  { id: "hotels", label: "Hotels & Resorts", icon: Hotel },
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
  { name: "Bryce", lat: 37.6725, lng: -112.1563 },
  { name: "Zion", lat: 37.1889, lng: -112.9986 },
  { name: "Las Vegas", lat: 36.1699, lng: -115.1398 },
];

const data = {
  attractions: [
    { name: "Arches National Park", place: "Moab", category: "National Park", lat: 38.7331, lng: -109.5925, summary: "Famous arches, big views, and lots of beauty with manageable effort.", bestTime: "Sunrise or sunset", foodNote: "Lunch back in Moab before the hottest part of the day.", official: "https://www.nps.gov/arch/index.htm", reserve: "https://www.nps.gov/arch/planyourvisit/fees.htm", weather: "https://www.nps.gov/arch/planyourvisit/weather.htm", maps: "https://www.google.com/maps/search/Arches+National+Park", photos: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Capitol Reef National Park", place: "Torrey", category: "National Park", lat: 38.2917, lng: -111.2615, summary: "A gentler park day with scenic drives and less crowd stress.", bestTime: "Morning or late afternoon", foodNote: "Excellent park for a slower-paced day.", official: "https://www.nps.gov/care/index.htm", reserve: "https://www.nps.gov/care/planyourvisit/fees.htm", weather: "https://www.nps.gov/care/planyourvisit/weather.htm", maps: "https://www.google.com/maps/search/Capitol+Reef+National+Park", photos: ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Bryce Canyon National Park", place: "Bryce", category: "National Park", lat: 37.593, lng: -112.1871, summary: "One of the best beauty-per-effort stops on the route.", bestTime: "Sunrise or late afternoon", foodNote: "Great warm breakfast / scenic lunch kind of day.", official: "https://www.nps.gov/brca/index.htm", reserve: "https://www.nps.gov/brca/planyourvisit/fees.htm", weather: "https://www.nps.gov/brca/planyourvisit/weather.htm", maps: "https://www.google.com/maps/search/Bryce+Canyon+National+Park", photos: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Zion National Park", place: "Zion", category: "National Park", lat: 37.2982, lng: -113.0263, summary: "Classic canyon scenery with a senior-friendlier approach if you start early.", bestTime: "Very early morning", foodNote: "Keep the afternoon lighter and save energy.", official: "https://www.nps.gov/zion/index.htm", reserve: "https://www.nps.gov/zion/planyourvisit/fees.htm", weather: "https://www.nps.gov/zion/planyourvisit/weather.htm", maps: "https://www.google.com/maps/search/Zion+National+Park", photos: ["https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80"] },
  ],
  hotels: [
    { name: "SpringHill Suites Moab", place: "Moab", category: "Marriott Hotel", lat: 38.5907, lng: -109.5618, summary: "Top Moab base. Easy access to Arches and Canyonlands.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/SpringHill+Suites+Moab", photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Element Moab", place: "Moab", category: "Marriott Hotel", lat: 38.589, lng: -109.562, summary: "Modern, spacious rooms for a comfortable base.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/Element+Moab", photos: ["https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Fairfield Inn Moab", place: "Moab", category: "Marriott Hotel", lat: 38.592, lng: -109.563, summary: "Reliable and comfortable, breakfast included.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/Fairfield+Inn+Moab", photos: ["https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Red Cliffs Lodge", place: "Moab", category: "Resort", lat: 38.666, lng: -109.44, summary: "Scenic riverfront stay with more destination feel.", official: "https://www.redcliffslodge.com/", maps: "https://www.google.com/maps/search/Red+Cliffs+Lodge+Moab", photos: ["https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80"] },
    { name: "SpringHill Suites Zion", place: "Zion", category: "Marriott Hotel", lat: 37.1774, lng: -113.0025, summary: "Best Zion Marriott option with simple access.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/SpringHill+Suites+Zion", photos: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Cliffrose Springdale", place: "Zion", category: "Resort", lat: 37.188, lng: -112.998, summary: "Premium riverside resort near the park entrance.", official: "https://www.cliffroselodge.com/", maps: "https://www.google.com/maps/search/Cliffrose+Springdale", photos: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"] },
    { name: "SpringHill Suites Bryce Canyon", place: "Bryce", category: "Marriott Hotel", lat: 37.673, lng: -112.156, summary: "Only real Marriott near Bryce. Book early.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/SpringHill+Suites+Bryce+Canyon", photos: ["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80"] },
    { name: "The Lodge at Bryce Canyon", place: "Bryce", category: "Historic Lodge", lat: 37.622, lng: -112.167, summary: "Inside the park. Incredible access and classic feel.", official: "https://www.nps.gov/brca/planyourvisit/lodging.htm", maps: "https://www.google.com/maps/search/Bryce+Canyon+Lodge", photos: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Capitol Reef Resort", place: "Torrey", category: "Resort", lat: 38.292, lng: -111.414, summary: "Best Capitol Reef stay option. Scenic and relaxed.", official: "https://www.capitolreefresort.com/", maps: "https://www.google.com/maps/search/Capitol+Reef+Resort", photos: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"] },
    { name: "JW Marriott Las Vegas", place: "Las Vegas", category: "Marriott Hotel", lat: 36.1774, lng: -115.3272, summary: "Quiet resort feel away from Strip chaos.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/JW+Marriott+Las+Vegas", photos: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Westin Las Vegas", place: "Las Vegas", category: "Marriott Hotel", lat: 36.1147, lng: -115.166, summary: "Non-casino vibe. Strong comfort pick.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/Westin+Las+Vegas", photos: ["https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Renaissance Las Vegas", place: "Las Vegas", category: "Marriott Hotel", lat: 36.134, lng: -115.151, summary: "Elegant and calmer than Strip hotels.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/Renaissance+Las+Vegas", photos: ["https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Marriott Grand Chateau", place: "Las Vegas", category: "Marriott Hotel", lat: 36.108, lng: -115.169, summary: "No casino. Great comfort-focused choice.", official: "https://www.marriott.com/", maps: "https://www.google.com/maps/search/Marriott+Grand+Chateau", photos: ["https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=1200&q=80"] },
    { name: "The Venetian Resort", place: "Las Vegas", category: "Luxury Resort", lat: 36.121, lng: -115.169, summary: "Upscale, spacious, strong food and show access.", official: "https://www.venetianlasvegas.com/", maps: "https://www.google.com/maps/search/Venetian+Las+Vegas", photos: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80"] },
  ],
  national: [],
  state: [
    { name: "Dead Horse Point State Park", place: "Moab", category: "State Park", lat: 38.481, lng: -109.741, summary: "Huge scenic payoff for very little walking.", bestTime: "Sunrise or sunset", foodNote: "Excellent paired with a slow Moab lunch.", official: "https://stateparks.utah.gov/parks/dead-horse/", reserve: "https://stateparks.utah.gov/parks/dead-horse/", weather: "https://weather.gov/", maps: "https://www.google.com/maps/search/Dead+Horse+Point+State+Park", photos: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Kodachrome Basin State Park", place: "Bryce", category: "State Park", lat: 37.5268, lng: -111.9957, summary: "Colorful, quieter, and a nice alternative to the biggest crowds.", bestTime: "Morning", foodNote: "Great bonus stop if the group wants a slower scenic day.", official: "https://stateparks.utah.gov/parks/kodachrome-basin/", reserve: "https://stateparks.utah.gov/parks/kodachrome-basin/", weather: "https://weather.gov/", maps: "https://www.google.com/maps/search/Kodachrome+Basin+State+Park", photos: ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"] },
  ],
  catholic: [
    { name: "Guardian Angel Cathedral", place: "Las Vegas", category: "Catholic Site", lat: 36.1367, lng: -115.1633, summary: "Quiet, meaningful, and architecturally memorable.", official: "https://www.guardianangelcathedral.org/", maps: "https://www.google.com/maps/search/Guardian+Angel+Cathedral+Las+Vegas", photos: ["https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80"] },
  ],
  restaurants: [
    { name: "Desert Bistro", place: "Moab", category: "Restaurant", lat: 38.5727, lng: -109.5503, summary: "Fine-dining Moab favorite. Great for a comfortable, memorable dinner.", official: "https://www.google.com/maps/search/Desert+Bistro+Moab", maps: "https://www.google.com/maps/search/Desert+Bistro+Moab", photos: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Hell's Backbone Grill", place: "Torrey", category: "Restaurant", lat: 37.9222, lng: -111.423, summary: "Special-occasion quality food with a scenic-road-trip soul.", official: "https://www.google.com/maps/search/Hells+Backbone+Grill", maps: "https://www.google.com/maps/search/Hells+Backbone+Grill", photos: ["https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Zion Canyon Brew Pub", place: "Zion", category: "Restaurant", lat: 37.188, lng: -113.0038, summary: "Easy, reliable, and pleasant after a Zion day.", official: "https://www.google.com/maps/search/Zion+Canyon+Brew+Pub", maps: "https://www.google.com/maps/search/Zion+Canyon+Brew+Pub", photos: ["https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80"] },
    { name: "Bouchon", place: "Las Vegas", category: "Restaurant", lat: 36.1215, lng: -115.1687, summary: "Elegant Las Vegas meal in a calmer register.", official: "https://www.google.com/maps/search/Bouchon+Las+Vegas", maps: "https://www.google.com/maps/search/Bouchon+Las+Vegas", photos: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"] },
  ],
};

data.national = data.attractions.filter((item) => item.category === "National Park");

const tripPlanDays = [
  { day: 1, title: "Denver → Moab", drive: "6.0 hr", bestTime: "Start early", senior: "Use two real breaks and keep the arrival evening easy.", food: "Comfort dinner in Moab after hotel check-in." },
  { day: 2, title: "Arches Day", drive: "0.5 hr local", bestTime: "Sunrise to late morning", senior: "Viewpoints over long walks. Head back before midday heat.", food: "Lunch back in Moab and a slow afternoon." },
  { day: 3, title: "Moab Bonus Day", drive: "1.0 hr local", bestTime: "Morning", senior: "Dead Horse Point makes an excellent lower-effort wow day.", food: "Good shaded lunch and restful evening." },
  { day: 4, title: "Moab → Torrey", drive: "2.5 hr", bestTime: "Late morning departure", senior: "Make the transfer day scenic, not rushed.", food: "Relaxed lunch stop en route or dinner in Torrey." },
  { day: 5, title: "Capitol Reef Day", drive: "1.0 hr local", bestTime: "Morning", senior: "A great day for scenic drives, orchards, and gentler sightseeing.", food: "Keep this a comfort-food day with minimal rushing." },
  { day: 6, title: "Torrey → Bryce", drive: "2.5 hr", bestTime: "Morning departure", senior: "Beautiful road day. Stop for views without overdoing it.", food: "Nice lunch on Highway 12 if energy is good." },
  { day: 7, title: "Bryce Day", drive: "0.5 hr local", bestTime: "Sunrise or late afternoon", senior: "Overlooks are the star. Short, easy walking only.", food: "Warm breakfast and scenic lunch." },
  { day: 8, title: "Bryce → Zion", drive: "2.5 hr", bestTime: "Late morning", senior: "Keep this a transition day and save energy for Zion.", food: "Good dinner in Springdale." },
  { day: 9, title: "Zion → Las Vegas", drive: "3.0 hr", bestTime: "Very early Zion, then transfer", senior: "Do the easy Zion beauty first, then finish in comfort.", food: "Nice Vegas dinner and optional show night." },
];

const vegasShows = [
  { name: "The Smith Center", summary: "Broadway, concerts, and polished performances in a more elegant setting.", link: "https://thesmithcenter.com/" },
  { name: "Sphere", summary: "Big visual spectacle with music-forward energy and no need to gamble your way through the evening.", link: "https://www.thesphere.com/" },
];

function photoSearchLink(name) { return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name)}`; }
function ActionLink({ href, label }) { return <a className="action-link" href={href} target="_blank" rel="noreferrer"><ExternalLink size={14} /><span>{label}</span></a>; }
function Card({ item, selected, onClick }) {
  return <button className={`card ${selected ? "selected" : ""}`} onClick={onClick}>{item.photos?.[0] ? <img className="card-image" src={item.photos[0]} alt={item.name} /> : <div className="card-badge-art">{item.category}</div>}<div className="eyebrow">{item.category}</div><div className="card-title">{item.name}</div><div className="card-place">{item.place}</div><div className="card-summary">{item.summary}</div></button>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("tripplan");
  const [locationFilter, setLocationFilter] = useState("All Stops");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(tripPlanDays[0]);

  const availableStops = useMemo(() => {
    const items = activeTab === "tripplan" ? [] : (data[activeTab] || []);
    const stops = Array.from(new Set(items.map((item) => item.place)));
    return ["All Stops", ...stops];
  }, [activeTab]);

  const currentItems = useMemo(() => {
    let items = activeTab === "tripplan" ? tripPlanDays : (data[activeTab] || []);
    if (activeTab !== "tripplan" && locationFilter !== "All Stops") items = items.filter((item) => item.place === locationFilter);
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((item) => `${item.name || item.title} ${item.place || ""} ${item.summary || ""} ${item.category || ""}`.toLowerCase().includes(q));
  }, [activeTab, query, locationFilter]);

  useEffect(() => {
    if (currentItems.length) setSelected(currentItems[0]);
    else setSelected(null);
  }, [activeTab, query, locationFilter]);

  const allMapItems = useMemo(() => {
    const current = activeTab === "tripplan" ? [] : (data[activeTab] || []);
    return current.filter((item) => typeof item.lat === "number" && typeof item.lng === "number");
  }, [activeTab]);

  return (
    <div className="shell">
      <header className="hero">
        <div className="hero-title-row">
          <div className="brand-badge"><Route size={22} /></div>
          <div>
            <h1>Mimi and Doc SW2026</h1>
            <p><strong>Your daily trip guide</strong> — start here each day.</p>
            <p>A colorful, senior-friendly Southwest trip planner with better food, calmer hotels, easier browsing, and simple navigation.</p>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card"><div className="stat-label">Route</div><div className="stat-value">Denver → Moab → Torrey → Bryce → Zion → Las Vegas</div></div>
          <div className="stat-card"><div className="stat-label">Style</div><div className="stat-value">Comfortable, scenic, food-forward, and senior-aware</div></div>
          <div className="stat-card"><div className="stat-label">Trip length</div><div className="stat-value">7 to 10 days</div></div>
        </div>

        <div className="tab-row">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return <button key={tab.id} className={`tab-button ${activeTab === tab.id ? "active" : ""}`} onClick={() => { setActiveTab(tab.id); setLocationFilter("All Stops"); }}><Icon size={16} /><span>{tab.label}</span></button>;
          })}
        </div>
      </header>

      <main className="content-grid">
        <section className="panel map-panel">
          <div className="panel-title"><MapPin size={18} /> Map</div>
          <div className="panel-subtitle">{activeTab === "tripplan" ? "Use Trip Plan for the day-by-day guide. The map becomes interactive when you switch to categories." : "The map follows the category you choose above."}</div>
          <MapContainer center={[38.25, -111.2]} zoom={6} className="map-box" scrollWheelZoom={true}>
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Polyline positions={routeStops.map((s) => [s.lat, s.lng])} pathOptions={{ color: "#d97706", weight: 4 }} />
            {routeStops.map((stop) => <Marker key={stop.name} position={[stop.lat, stop.lng]} icon={markerIcon}><Popup>{stop.name}</Popup></Marker>)}
            {allMapItems.map((item) => <Marker key={item.name} position={[item.lat, item.lng]} icon={markerIcon}><Popup><strong>{item.name}</strong><div>{item.place}</div></Popup></Marker>)}
          </MapContainer>
        </section>

        <section className="panel list-panel">
          <div className="panel-title"><Search size={18} /> Browse</div>
          <div className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={activeTab === "tripplan" ? "Search trip plan" : `Search ${tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}`} /></div>
          {activeTab !== "tripplan" && (
            <div className="filter-row">
              {availableStops.map((stop) => <button key={stop} className={`filter-chip ${locationFilter === stop ? "active" : ""}`} onClick={() => setLocationFilter(stop)}>{stop}</button>)}
            </div>
          )}
          <div className="card-list">
            {activeTab === "tripplan"
              ? currentItems.map((item) => <button key={item.day} className={`trip-card ${selected?.day === item.day ? "selected" : ""}`} onClick={() => setSelected(item)}><div className="eyebrow">Day {item.day}</div><div className="card-title">{item.title}</div><div className="card-summary">Drive: {item.drive}</div><div className="card-summary">Best time: {item.bestTime}</div></button>)
              : currentItems.map((item) => <Card key={item.name} item={item} selected={selected?.name === item.name} onClick={() => setSelected(item)} />)}
          </div>
        </section>

        <section className="panel detail-panel">
          {selected ? (
            activeTab === "tripplan" ? (
              <>
                <div className="detail-header">
                  <div><div className="detail-eyebrow">Day {selected.day}</div><h2>{selected.title}</h2><div className="detail-place">Suggested pacing for seniors</div></div>
                </div>
                <div className="trip-plan-detail">
                  <div className="trip-plan-box"><strong>Drive time:</strong> {selected.drive}</div>
                  <div className="trip-plan-box"><strong>Best time:</strong> {selected.bestTime}</div>
                  <div className="trip-plan-box"><strong>Senior note:</strong> {selected.senior}</div>
                  <div className="trip-plan-box"><strong>Food plan:</strong> {selected.food}</div>
                </div>
              </>
            ) : (
              <>
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
                    <div className="photo-search-copy">Opens a photo search for this exact location.</div>
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
              </>
            )
          ) : <div className="empty-state">No results in this section yet.</div>}
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
