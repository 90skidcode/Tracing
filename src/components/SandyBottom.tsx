import Icon from './ui/Icon';

export default function SandyBottom() {
  return (
    <div style={{ position: "relative", height: "var(--sandy-height)", width: "100%", marginTop: "auto", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, width: "100%", height: "80%", background: "#E6B83A", borderRadius: "40% 40% 0 0", transform: "scaleX(1.25) translateY(1rem)" }} />
      <div style={{ position: "absolute", bottom: 0, width: "100%", height: "55%", background: "#F9D56E", borderRadius: "60% 60% 0 0", transform: "scaleX(1.5)", borderTop: "4px solid rgba(255,255,255,0.3)" }} />
      <Icon name="grass" filled style={{ position: "absolute", bottom: "15%", left: "3%", fontSize: "clamp(36px, 8vw, 60px)", color: "#005F6B", opacity: 0.6, transform: "rotate(-12deg)" }} />
      <Icon name="grass" filled style={{ position: "absolute", bottom: "8%", left: "12%", fontSize: "clamp(30px, 7vw, 50px)", color: "#008C9E", opacity: 0.8, transform: "rotate(6deg)" }} />
      <Icon name="star" filled style={{ position: "absolute", bottom: "22%", right: "20%", fontSize: "clamp(24px, 6vw, 40px)", color: "#FF6B6B" }} />
      <div className="animate-bounce-bear" style={{ position: "absolute", bottom: "8%", right: "3%", width: "var(--bear-size)", height: "var(--bear-size)" }}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmsQHHtrHKQScTalDMtEBtPfHar8WqQBajXIQ7-0kBJhseF3ltsMXyBUBbxTK2MBeswuGQK4WrYC_DnIgHoIKYVxiivWcFr_znuVRy6gMTStzKIrTlXs6uWimxllutNCKghP93oLZPHMlsbmYMid8WjpdYlph5HwvFARPRirnBSsNlcdGWLDqV59NkNixXGjFXtFkwIIEVDrBubuC2JC8jS187B4rzWN6HJX1azNuIpmXvC5qY04e_qG9DZSA2YFu1nxZ7EnRo44Q"
          alt="Cute toy bear character"
          style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))", transform: "rotate(-6deg)", maskImage: "linear-gradient(black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(black 80%, transparent 100%)" }}
        />
      </div>
    </div>
  );
}
