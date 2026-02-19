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
      <div style={{ textAlign: "center", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
        <div className="animate-float" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "1rem", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", borderRadius: "2rem", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", borderBottom: "8px solid rgba(0,140,158,0.2)", transform: "rotate(-1deg)" }}>
          <Icon name="water_drop" filled style={{ fontSize: 36, color: "#FF6B6B", marginRight: "0.5rem" }} />
          <h1 style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.025em", color: "#005F6B" }}>
            <span style={{ color: "#008C9E" }}>Ocean</span>{" "}
            <span style={{ color: "#FF6B6B" }}>Trace</span>
          </h1>
        </div>
      </div>

      {/* Pearl / Clam section */}
      <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320, position: "relative" }}>
        {/* Spinning star bg */}
        <div className="animate-spin-slow" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", opacity: 0.4 }}>
          <svg width="400" height="400" viewBox="0 0 200 200" style={{ fill: "white" }}>
            <path d="M100 0 L110 90 L200 100 L110 110 L100 200 L90 110 L0 100 L90 90 Z" />
          </svg>
        </div>

        <div style={{ position: "relative", width: 256, height: 256, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
          {/* Clam top */}
          <div className="animate-float-delayed clam-shell-top" style={{ position: "absolute", top: -40, width: 224, height: 160, zIndex: 0, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }} />
          {/* Clam bottom */}
          <div className="clam-shell-bottom" style={{ position: "absolute", bottom: 0, width: 240, height: 160, zIndex: 0, boxShadow: "0 12px 0px #005F6B", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "90%", height: "90%", background: "rgba(255,255,255,0.2)", borderRadius: "inherit", marginTop: 8 }} />
          </div>
          {/* Pearl button */}
          <button
            className="animate-float pearl-btn"
            onMouseEnter={() => setPearlGlowing(true)}
            onMouseLeave={() => setPearlGlowing(false)}
            onClick={() => { onSplash(); alert("Let's dive in!"); }}
            style={{ position: "relative", zIndex: 10, width: 144, height: 144, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", transition: "transform 0.1s", ...(pearlGlowing ? { boxShadow: "0 0 40px rgba(255,255,255,0.8), inset 0 0 20px rgba(255,255,255,0.5), inset -5px -5px 15px rgba(0,0,0,0.1)" } : {}) }}
            onMouseDown={e => (e.currentTarget.style.transform = "scale(0.95)")}
            onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#005F6B", zIndex: 20 }}>
              <Icon name="play_arrow" className="filled-bold" style={{ fontSize: 48, marginBottom: 4, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }} />
              <span style={{ fontSize: "1.25rem", fontWeight: 900, letterSpacing: "0.1em", color: "#008C9E" }}>START</span>
            </div>
          </button>
        </div>

        <p className="animate-pulse" style={{ marginTop: "2rem", color: "white", fontWeight: 900, fontSize: "1.25rem", letterSpacing: "0.05em", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
          Tap the Pearl!
        </p>
      </div>
    </>
  );
}
