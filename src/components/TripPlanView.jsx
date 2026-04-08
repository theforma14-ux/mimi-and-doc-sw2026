import { tripDays, vegasPairs } from '../data/tripData'

const toneClassMap = {
  teal: 'tone-teal',
  sand: 'tone-sand',
  sage: 'tone-sage',
  gold: 'tone-gold',
  rose: 'tone-rose',
  canyon: 'tone-canyon',
  mint: 'tone-mint',
  plum: 'tone-plum',
  navy: 'tone-navy',
}

export default function TripPlanView() {
  return (
    <div className="stack-lg">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Southwest 2026</p>
          <h2>Your calm, senior-friendly road trip plan</h2>
          <p className="hero-copy">
            This version is designed to feel easy, special, and reassuring — with comfortable driving days,
            intentional food stops, and fewer decisions in the moment.
          </p>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-label">Trip style</span>
            <strong>Comfort first</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Energy level</span>
            <strong>Scenic, not strenuous</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Best fit</span>
            <strong>Parents + easy pacing</strong>
          </div>
        </div>
      </section>

      <section>
        <div className="section-header">
          <div>
            <p className="eyebrow">Day-by-day</p>
            <h3>Trip Plan</h3>
          </div>
          <p className="section-note">Each day is built to reduce friction and make the experience feel cared for.</p>
        </div>

        <div className="day-grid">
          {tripDays.map((day) => (
            <article key={day.day} className={`day-card ${toneClassMap[day.tone]}`}>
              <div className="day-topline">
                <div className="day-badge">Day {day.day}</div>
                <div className="day-icon" aria-hidden="true">
                  {day.icon}
                </div>
              </div>

              <div className="day-title-block">
                <h4>{day.title}</h4>
                <p className="day-theme">{day.theme}</p>
              </div>

              <div className="meta-grid">
                <div className="meta-item">
                  <span>Drive</span>
                  <strong>{day.driveTime}</strong>
                </div>
                <div className="meta-item">
                  <span>Best time</span>
                  <strong>{day.bestTime}</strong>
                </div>
                <div className="meta-item meta-item-wide">
                  <span>Stay</span>
                  <strong>{day.stay}</strong>
                </div>
              </div>

              <div className="day-sections">
                <div className="mini-panel">
                  <p className="mini-label">Senior-friendly note</p>
                  <p>{day.seniorNote}</p>
                </div>
                <div className="mini-panel">
                  <p className="mini-label">Food plan</p>
                  <p>{day.foodPlan}</p>
                </div>
              </div>

              <div className="timeline-row">
                <div>
                  <span className="timeline-label">Morning</span>
                  <p>{day.morning}</p>
                </div>
                <div>
                  <span className="timeline-label">Afternoon</span>
                  <p>{day.afternoon}</p>
                </div>
                <div>
                  <span className="timeline-label">Evening</span>
                  <p>{day.evening}</p>
                </div>
              </div>

              <div className="highlights-block">
                <p className="mini-label">Best moments</p>
                <ul>
                  {day.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="vegas-panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Vegas ending</p>
            <h3>Hotel + dinner + show pairings</h3>
          </div>
          <p className="section-note">Three curated ways to finish the trip without overplanning.</p>
        </div>

        <div className="pair-grid">
          {vegasPairs.map((pair) => (
            <article className="pair-card" key={`${pair.hotel}-${pair.show}`}>
              <p className="pair-vibe">{pair.vibe}</p>
              <h4>{pair.hotel}</h4>
              <div className="pair-line"><span>Show</span><strong>{pair.show}</strong></div>
              <div className="pair-line"><span>Dinner</span><strong>{pair.dinner}</strong></div>
              <p className="pair-note">{pair.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
