import { useState } from 'react';
import './styles/ocean.css';

import { BUBBLES } from './data/constants';
import useOceanSounds from './hooks/useOceanSounds';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SandyBottom from './components/SandyBottom';
import ShellSelector from './components/ShellSelector';
import Bubble from './components/ui/Bubble';
import Icon from './components/ui/Icon';

export default function OceanTrace() {
  const [activeShell, setActiveShell] = useState<string | null>(null);
  const { playing, start, stop, splash, bubblePop } = useOceanSounds();

  const toggleSound = () => {
    if (playing) { stop(); } else { start(); }
  };

  return (
    <div
      className="bg-water"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Background bubbles */}
      {BUBBLES.map((b, i) => (
        <Bubble key={i} {...b} />
      ))}

      {/* Swimming fish */}
      <div className="animate-swim" style={{ position: "absolute", top: "var(--fish-top-1)", left: 0, opacity: 0.8, zIndex: 0 }}>
        <Icon name="water_full" filled style={{ fontSize: "var(--fish-size-1)", color: "#FF6B6B", transform: "scaleX(-1)" }} />
      </div>
      <div className="animate-swim-slow" style={{ position: "absolute", top: "var(--fish-top-2)", left: 0, opacity: 0.6, zIndex: 0 }}>
        <Icon name="sailing" style={{ fontSize: "var(--fish-size-2)", color: "#F9D56E", transform: "scaleX(-1)" }} />
      </div>

      {/* Header */}
      <Header playing={playing} onToggleSound={toggleSound} />

      {/* Main content */}
      <main style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "var(--content-max-width)", margin: "0 auto", padding: `0 var(--content-padding) 2rem` }}>
        <HeroSection playing={playing} onSplash={splash} />
        <ShellSelector activeShell={activeShell} onSelectShell={setActiveShell} onBubblePop={bubblePop} />
      </main>

      {/* Sandy footer */}
      <SandyBottom />
    </div>
  );
}