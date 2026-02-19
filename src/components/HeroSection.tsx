import { useState } from 'react';
import type { HeroSectionProps } from '../types/ocean';
import Icon from './ui/Icon';

export default function HeroSection({ playing, onSplash }: HeroSectionProps) {
  const [pearlGlowing, setPearlGlowing] = useState(false);

  return (
    <>
      {/* Sound hint */}
      {!playing && (
        <div style={{ marginTop: "0.25rem", marginBottom: "-0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", opacity: 0.85 }}>
          <span style={{ fontSize: "1.1rem" }}>🔊</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "white", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}>
            Tap <strong>ON</strong> for ocean sounds!
          </span>
        </div>
      )}

      {/* Title */}
      <div style={{ textAlign: "center", marginTop: "0.5rem", marginBottom: "1rem" }}>
        <div className="animate-float" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "clamp(0.6rem, 2vw, 1rem)", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", borderRadius: "2rem", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", borderBottom: "8px solid rgba(0,140,158,0.2)", transform: "rotate(-1deg)" }}>
          <Icon name="water_drop" filled style={{ fontSize: "var(--title-icon)", color: "#FF6B6B", marginRight: "0.4rem" }} />
          <h1 style={{ fontSize: "var(--title-size)", fontWeight: 900, letterSpacing: "-0.025em", color: "#005F6B", lineHeight: 1.1 }}>
            <span style={{ color: "#008C9E" }}>Ocean</span>{" "}
            <span style={{ color: "#FF6B6B" }}>Trace</span>
          </h1>
        </div>
      </div>

      {/* Pearl / Clam section */}
      <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "var(--hero-min-height)", position: "relative" }}>
        {/* Spinning star bg */}
        <div className="animate-spin-slow" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", opacity: 0.4 }}>
          <svg style={{ width: "var(--star-size)", height: "var(--star-size)" }} viewBox="0 0 200 200" fill="white">
            <path d="M100 0 L110 90 L200 100 L110 110 L100 200 L90 110 L0 100 L90 90 Z" />
          </svg>
        </div>

        <div style={{ position: "relative", width: "var(--clam-container)", height: "var(--clam-container)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1rem" }}>
          {/* Clam top */}
          <div className="animate-float-delayed clam-shell-top" style={{ position: "absolute", top: "-15%", width: "var(--clam-top-w)", height: "var(--clam-top-h)", zIndex: 0, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }} />
          {/* Clam bottom */}
          <div className="clam-shell-bottom" style={{ position: "absolute", bottom: 0, width: "var(--clam-bottom-w)", height: "var(--clam-bottom-h)", zIndex: 0, boxShadow: "0 12px 0px #005F6B", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "90%", height: "90%", background: "rgba(255,255,255,0.2)", borderRadius: "inherit", marginTop: 8 }} />
          </div>
          {/* Pearl button */}
          <button
            className="animate-float pearl-btn"
            onMouseEnter={() => setPearlGlowing(true)}
            onMouseLeave={() => setPearlGlowing(false)}
            onClick={() => { onSplash(); alert("Let's dive in!"); }}
            style={{ position: "relative", zIndex: 10, width: "var(--pearl-size)", height: "var(--pearl-size)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", transition: "transform 0.1s", ...(pearlGlowing ? { boxShadow: "0 0 40px rgba(255,255,255,0.8), inset 0 0 20px rgba(255,255,255,0.5), inset -5px -5px 15px rgba(0,0,0,0.1)" } : {}) }}
            onMouseDown={e => (e.currentTarget.style.transform = "scale(0.95)")}
            onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#005F6B", zIndex: 20 }}>
              <Icon name="play_arrow" className="filled-bold" style={{ fontSize: "var(--pearl-play-icon)", marginBottom: 4, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }} />
              <span style={{ fontSize: "var(--pearl-start-font)", fontWeight: 900, letterSpacing: "0.1em", color: "#008C9E" }}>START</span>
            </div>
          </button>
        </div>

        <p className="animate-pulse" style={{ marginTop: "1.5rem", color: "white", fontWeight: 900, fontSize: "clamp(1rem, 3vw, 1.25rem)", letterSpacing: "0.05em", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
          Tap the Pearl!
        </p>
      </div>
    </>
  );
}
