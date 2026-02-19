import type { HeaderProps } from '../types/ocean';
import SoundToggle from './SoundToggle';
import Icon from './ui/Icon';

export default function Header({ playing, onToggleSound }: HeaderProps) {
  return (
    <header style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem" }}>
      {/* Avatar pill */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.3)", backdropFilter: "blur(8px)", padding: "0.5rem 1.25rem 0.5rem 0.5rem", borderRadius: "9999px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", border: "2px solid rgba(255,255,255,0.5)" }}>
        <div style={{ background: "#FF6B6B", color: "white", borderRadius: "9999px", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
          <Icon name="scuba_diving" style={{ fontSize: 20 }} />
        </div>
        <span style={{ fontWeight: 800, color: "#005F6B", fontSize: "1.125rem" }}>Captain Alex</span>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <SoundToggle playing={playing} onToggle={onToggleSound} />
        <button style={{ background: "rgba(255,255,255,0.3)", backdropFilter: "blur(8px)", color: "#005F6B", padding: "0.75rem", borderRadius: "9999px", border: "2px solid rgba(255,255,255,0.5)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", cursor: "pointer" }} aria-label="Settings">
          <Icon name="settings" />
        </button>
      </div>
    </header>
  );
}
