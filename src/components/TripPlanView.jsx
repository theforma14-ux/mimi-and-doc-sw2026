import { planningNotes, tripDays, tripOverview, vegasGuides, vegasPairs } from '../data/tripData'

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
      <section className="hero-panel premium-hero">
        <div>
          <p className="eyebrow">Southwest 2026</p>
          <h2>Your calm, senior-friendly road trip plan</h2>
          <p className="hero-copy">
            Designed to feel easy, special, and reassuring — with comfortable driving days,
            intentional food stops, premium hotel choices, and fewer decisions in the moment.
          </p>
        </div>

        <div className="hero-stats hero-stats-grid">
          {Object.entries(tripOverview).map(([label, value]) => (
            <div className="stat-card" key={label}>
              <span className="stat-label">{label.replace(/([A-Z])/g, ' $1')}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="overview-strip">
        {planningNotes.map((note) => (
          <article className="overview-card" key={note.title}>
            <div className="overview-icon" aria-hidden="true">{note.icon}</div>
            <div>
              <h4>{note.title}</h4>
              <p>{note.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section>
        <div className="section-header">
          <div>
            <p className="eyebrow">Day-by-day</p>
            <h3>Trip Plan</h3>
          </div>
          <p className="section-note">Each day is designed to reduce friction, keep the pace gentle, and still feel memorable.</p>
        </div>

        <div className="day-grid">
          {tripDays.map((day) => (
            <article key={day.day} className={`day-card ${toneClassMap[day.tone]}`}>
              <div className="day-topline">
                <div className="day-badge">Day {day.day}</div>
                <div className="day-icon" aria-hidden="true">{day.icon}</div>
              </div>

              <div className="day-title-block">
                <h4>{day.title}</h4>
                <p className="day-theme">{day.theme}</p>
              </div>

              <div className="meta-grid meta-grid-three">
                <div className="meta-item">
                  <span>Drive</span>
                  <strong>{day.driveTime}</strong>
                </div>
                <div className="meta-item">
                  <span>Best time</span>
                  <strong>{day.bestTime}</strong>
                </div>
                <div className="meta-item">
                  <span>Comfort level</span>
                  <strong>{day.comfortLevel}</strong>
                </div>
                <div className="meta-item meta-item-wide">
                  <span>Stay</span>
                  <strong>{day.stay}</strong>
                </div>
              </div>

              <div className="day-sections day-sections-three">
                <div className="mini-panel">
                  <p className="mini-label">Senior-friendly note</p>
                  <p>{day.seniorNote}</p>
                </div>
                <div className="mini-panel">
                  <p className="mini-label">Food moment</p>
                  <p>{day.foodMoment}</p>
                </div>
                <div className="mini-panel">
                  <p className="mini-label">Easy win</p>
                  <p>{day.easyWin}</p>
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
            <h3>Choose the kind of finale you want</h3>
          </div>
          <p className="section-note">These pairings are built to feel premium, clear, and low-friction instead of overwhelming.</p>
        </div>

        <div className="guide-grid">
          {vegasGuides.map((guide) => (
            <article className="guide-card" key={guide.title}>
              <p className="mini-label">{guide.title}</p>
              <h4>{guide.pick}</h4>
              <p>{guide.detail}</p>
            </article>
          ))}
        </div>

        <div className="pair-grid">
          {vegasPairs.map((pair) => (
            <article className="pair-card premium-pair" key={pair.id}>
              <div className="pair-header-row">
                <p className="pair-vibe">{pair.vibe}</p>
                <span className="feature-pill">{pair.tag}</span>
              </div>
              <h4>{pair.hotel}</h4>
              <p className="pair-audience">{pair.audience}</p>
              <div className="pair-line"><span>Show</span><strong>{pair.show}</strong></div>
              <div className="pair-line"><span>Dinner</span><strong>{pair.dinner}</strong></div>
              <div className="pair-line"><span>Pace</span><strong>{pair.pace}</strong></div>
              <p className="pair-note">{pair.note}</p>
              <div className="reservation-note">
                <p className="mini-label">Reservation tip</p>
                <p>{pair.reservationTip}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
