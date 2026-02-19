import Icon from './ui/Icon';

export default function SandyBottom() {
  return (
    <div style={{ position: "relative", height: 112, width: "100%", marginTop: "auto", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, width: "100%", height: 96, background: "#E6B83A", borderRadius: "40% 40% 0 0", transform: "scaleX(1.25) translateY(1rem)" }} />
      <div style={{ position: "absolute", bottom: 0, width: "100%", height: 64, background: "#F9D56E", borderRadius: "60% 60% 0 0", transform: "scaleX(1.5)", borderTop: "4px solid rgba(255,255,255,0.3)" }} />
      <Icon name="grass" filled style={{ position: "absolute", bottom: 16, left: 16, fontSize: 60, color: "#005F6B", opacity: 0.6, transform: "rotate(-12deg)" }} />
      <Icon name="grass" filled style={{ position: "absolute", bottom: 8, left: 56, fontSize: 50, color: "#008C9E", opacity: 0.8, transform: "rotate(6deg)" }} />
      <Icon name="star" filled style={{ position: "absolute", bottom: 24, right: 96, fontSize: 40, color: "#FF6B6B" }} />
      <div className="animate-bounce-bear" style={{ position: "absolute", bottom: 8, right: 16, width: 80, height: 80 }}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmsQHHtrHKQScTalDMtEBtPfHar8WqQBajXIQ7-0kBJhseF3ltsMXyBUBbxTK2MBeswuGQK4WrYC_DnIgHoIKYVxiivWcFr_znuVRy6gMTStzKIrTlXs6uWimxllutNCKghP93oLZPHMlsbmYMid8WjpdYlph5HwvFARPRirnBSsNlcdGWLDqV59NkNixXGjFXtFkwIIEVDrBubuC2JC8jS187B4rzWN6HJX1azNuIpmXvC5qY04e_qG9DZSA2YFu1nxZ7EnRo44Q"
          alt="Cute toy bear character"
          style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))", transform: "rotate(-6deg)", maskImage: "linear-gradient(black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(black 80%, transparent 100%)" }}
        />
      </div>
    </div>
  );
}
