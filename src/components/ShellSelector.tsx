import type { ShellSelectorProps } from '../types/ocean';
import Icon from './ui/Icon';

export default function ShellSelector({ activeShell, onSelectShell, onBubblePop }: ShellSelectorProps) {
  const handleSelect = (shell: string) => {
    onBubblePop();
    onSelectShell(shell);
  };

  return (
    <div style={{ width: "100%", marginTop: "1rem" }}>
      <h3 style={{ color: "#005F6B", fontSize: "clamp(1rem, 3vw, 1.25rem)", fontWeight: 700, textAlign: "center", marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.5))" }}>
        <Icon name="grid_view" style={{ color: "white" }} />
        Pick a Shell
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(0.5rem, 2vw, 1rem)", paddingBottom: "1rem" }}>
        {/* Big Letters */}
        <button className="btn-bubbly" onClick={() => handleSelect("ABC")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
          <div className="shell-fan shell-icon" style={{ width: "var(--shell-size)", height: "var(--shell-size)", background: activeShell === "ABC" ? "#e05a30" : "#FF8C42", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "4px solid rgba(0,0,0,0.1)" }}>
            <span style={{ fontSize: "var(--shell-font)", fontWeight: 900, color: "white", marginTop: "1rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>ABC</span>
          </div>
          <span style={{ fontSize: "var(--shell-label)", fontWeight: 700, color: "rgba(255,255,255,0.9)", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))", textTransform: "uppercase", letterSpacing: "0.05em" }}>Big Letters</span>
        </button>

        {/* Small Letters */}
        <button className="btn-bubbly" onClick={() => handleSelect("abc")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
          <div className="shell-spiral shell-icon" style={{ width: "var(--shell-size)", height: "var(--shell-size)", background: activeShell === "abc" ? "#d4a820" : "#F3C969", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", borderBottom: "4px solid rgba(0,0,0,0.1)" }}>
            <div style={{ position: "absolute", inset: 0, border: "4px solid rgba(255,255,255,0.2)", borderRadius: "inherit" }} />
            <span style={{ fontSize: "var(--shell-font)", fontWeight: 900, color: "white", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>abc</span>
          </div>
          <span style={{ fontSize: "var(--shell-label)", fontWeight: 700, color: "rgba(255,255,255,0.9)", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))", textTransform: "uppercase", letterSpacing: "0.05em" }}>Small Letters</span>
        </button>

        {/* Numbers */}
        <button className="btn-bubbly" onClick={() => handleSelect("123")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
          <div className="shell-scallop shell-icon" style={{ width: "var(--shell-size)", height: "var(--shell-size)", background: activeShell === "123" ? "#7db8ba" : "#A8DADC", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, transparent 45%, rgba(255,255,255,0.3) 50%, transparent 55%)", backgroundSize: "20px 100%" }} />
            <span style={{ fontSize: "var(--shell-font)", fontWeight: 900, color: "white", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))", position: "relative", zIndex: 10, marginTop: 8 }}>123</span>
          </div>
          <span style={{ fontSize: "var(--shell-label)", fontWeight: 700, color: "rgba(255,255,255,0.9)", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))", textTransform: "uppercase", letterSpacing: "0.05em" }}>Numbers</span>
        </button>
      </div>
    </div>
  );
}
