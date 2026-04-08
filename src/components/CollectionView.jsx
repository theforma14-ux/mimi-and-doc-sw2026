export default function CollectionView({ title, subtitle, items }) {
  return (
    <div className="stack-lg">
      <section className="section-header standalone-header">
        <div>
          <p className="eyebrow">Curated picks</p>
          <h3>{title}</h3>
        </div>
        <p className="section-note">{subtitle}</p>
      </section>

      <div className="collection-grid">
        {items.map((item) => (
          <article className="collection-card" key={`${item.name}-${item.location}`}>
            <div className="collection-top">
              <div>
                <h4>{item.name}</h4>
                <p className="location-pill">{item.location}</p>
              </div>
              {item.tier ? <span className="tier-pill">{item.tier}</span> : null}
            </div>
            <p className="collection-note">{item.note}</p>
            <div className="link-row">
              <a href={item.link} target="_blank" rel="noreferrer">Official site</a>
              <a href={item.mapLink} target="_blank" rel="noreferrer">Map</a>
              <a href={item.photoSearch} target="_blank" rel="noreferrer">Photos</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
