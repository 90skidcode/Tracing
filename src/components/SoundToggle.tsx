import type { SoundToggleProps } from '../types/ocean';
import Icon from './ui/Icon';

export default function SoundToggle({ playing, onToggle }: SoundToggleProps) {
  return (
    <button
      className="sound-toggle"
      onClick={onToggle}
      aria-label={playing ? "Mute ocean sounds" : "Play ocean sounds"}
      title={playing ? "Mute ocean sounds" : "Play ocean sounds"}
      style={{
        background: playing ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)",
        backdropFilter: "blur(8px)",
        color: "#005F6B",
        padding: "0.6rem 0.9rem",
        borderRadius: "9999px",
        border: "2px solid rgba(255,255,255,0.5)",
        boxShadow: playing ? "0 4px 16px rgba(0,140,158,0.3)" : "0 4px 12px rgba(0,0,0,0.1)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
      }}
    >
      {playing ? (
        <>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: 18 }}>
            <span className="sound-bar" />
            <span className="sound-bar" />
            <span className="sound-bar" />
            <span className="sound-bar" />
          </div>
          <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#008C9E", letterSpacing: "0.05em" }}>ON</span>
        </>
      ) : (
        <>
          <Icon name="volume_off" style={{ fontSize: 20 }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#005F6B", letterSpacing: "0.05em" }}>OFF</span>
        </>
      )}
    </button>
  );
}
