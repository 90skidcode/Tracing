import { useNavigate, useParams } from 'react-router-dom';
import SoundToggle from './SoundToggle';
import Icon from './ui/Icon';

const ITEMS: Record<string, string[]> = {
  ABC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  abc: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  '123': '0123456789'.split(''),
};

const COLORS = [
  '#FF3B3B', '#FF6F00', '#FFB300', '#00C853', '#2979FF',
  '#E91E63', '#00BFA5', '#FF6D00', '#AA00FF', '#00BCD4',
  '#F50057', '#76FF03', '#651FFF', '#FF9100', '#1DE9B6',
];


export default function LetterGrid({ playing, onToggleSound }: { playing: boolean; onToggleSound: () => void }) {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const items = ITEMS[category || 'ABC'] || ITEMS.ABC;

  return (
    <>
      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "var(--header-padding)",
        position: "relative", zIndex: 10,
      }}>
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: "rgba(255,255,255,0.3)", backdropFilter: "blur(8px)",
            color: "#005F6B", padding: "0.6rem", borderRadius: "9999px",
            border: "2px solid rgba(255,255,255,0.5)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          aria-label="Go back"
        >
          <Icon name="arrow_back" />
        </button>

        {/* Sound + Settings */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <SoundToggle playing={playing} onToggle={onToggleSound} />
          <button style={{
            background: "rgba(255,255,255,0.3)", backdropFilter: "blur(8px)",
            color: "#005F6B", padding: "0.6rem", borderRadius: "9999px",
            border: "2px solid rgba(255,255,255,0.5)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)", cursor: "pointer",
          }} aria-label="Settings">
            <Icon name="settings" />
          </button>
        </div>
      </div>

      {/* Letter grid */}
      <div style={{
        position: "relative", zIndex: 10, flex: 1,
        width: "100%", maxWidth: "var(--content-max-width)",
        margin: "0 auto", padding: "0 var(--content-padding) 2rem",
        overflowY: "auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: category === '123'
            ? "repeat(auto-fill, minmax(clamp(80px, 22vw, 110px), 1fr))"
            : "repeat(auto-fill, minmax(clamp(72px, 18vw, 100px), 1fr))",
          gap: "clamp(0.5rem, 2vw, 1rem)",
          paddingBottom: "1rem",
        }}>
          {items.map((char, i) => {
            const baseColor = COLORS[i % COLORS.length];
            return (
              <button
                key={char}
                onClick={() => navigate(`/trace/${category}/${char}`)}
                style={{
                  aspectRatio: "1",
                  position: "relative",
                  background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45) 0%, transparent 55%), linear-gradient(145deg, ${baseColor} 0%, ${baseColor}CC 100%)`,
                  border: "none",
                  borderRadius: "50%",
                  boxShadow: `0 6px 0 ${baseColor}88, 0 8px 20px rgba(0,0,0,0.2), inset 0 -3px 6px rgba(0,0,0,0.15), inset 0 3px 6px rgba(255,255,255,0.35)`,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.12s ease, box-shadow 0.12s ease",
                  overflow: "hidden",
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = "scale(0.92) translateY(3px)";
                  e.currentTarget.style.boxShadow = `0 2px 0 ${baseColor}88, 0 3px 8px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.35)`;
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                  e.currentTarget.style.boxShadow = `0 6px 0 ${baseColor}88, 0 8px 20px rgba(0,0,0,0.2), inset 0 -3px 6px rgba(0,0,0,0.15), inset 0 3px 6px rgba(255,255,255,0.35)`;
                }}
                onTouchStart={e => {
                  e.currentTarget.style.transform = "scale(0.92) translateY(3px)";
                  e.currentTarget.style.boxShadow = `0 2px 0 ${baseColor}88, 0 3px 8px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.35)`;
                }}
                onTouchEnd={e => {
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                  e.currentTarget.style.boxShadow = `0 6px 0 ${baseColor}88, 0 8px 20px rgba(0,0,0,0.2), inset 0 -3px 6px rgba(0,0,0,0.15), inset 0 3px 6px rgba(255,255,255,0.35)`;
                }}
              >
                {/* Shell ridges / scallop lines */}
                <div style={{
                  position: "absolute", inset: "8%",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.2)",
                  pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", inset: "18%",
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  pointerEvents: "none",
                }} />
                {/* Inner pearl-like center */}
                <div style={{
                  width: "70%", height: "70%",
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 40% 35%, rgba(255,255,255,0.5) 0%, transparent 50%), ${baseColor}`,
                  boxShadow: "inset 0 2px 8px rgba(255,255,255,0.4), inset 0 -2px 6px rgba(0,0,0,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }} >
                  <span style={{
                    fontSize: category === '123' ? "clamp(1.6rem, 5.5vw, 2.5rem)" : "clamp(1.3rem, 4.5vw, 2.2rem)",
                    fontWeight: 900,
                    color: "white",
                    filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))",
                    lineHeight: 1,
                  }}>
                    {char}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
