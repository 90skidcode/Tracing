import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './styles/ocean.css';

import { BUBBLES } from './data/constants';
import useOceanSounds from './hooks/useOceanSounds';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LetterGrid from './components/LetterGrid';
import SandyBottom from './components/SandyBottom';
import ShellSelector from './components/ShellSelector';
import TracingScreen from './components/TracingScreen';
import Bubble from './components/ui/Bubble';
import Icon from './components/ui/Icon';

function HomePage({ activeShell, setActiveShell, playing, splash, bubblePop }: {
  activeShell: string | null;
  setActiveShell: (s: string | null) => void;
  playing: boolean;
  splash: () => void;
  bubblePop: () => void;
}) {
  return (
    <>
      <main style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "var(--content-max-width)", margin: "0 auto", padding: `0 var(--content-padding) 2rem` }}>
        <HeroSection playing={playing} activeShell={activeShell} onSplash={splash} />
        <ShellSelector activeShell={activeShell} onSelectShell={setActiveShell} onBubblePop={bubblePop} />
      </main>
      <SandyBottom />
    </>
  );
}

function LetterPage({ playing, toggleSound }: { playing: boolean; toggleSound: () => void }) {
  return (
    <>
      <LetterGrid playing={playing} onToggleSound={toggleSound} />
      <SandyBottom />
    </>
  );
}

export default function OceanTrace() {
  const [activeShell, setActiveShell] = useState<string | null>(null);
  const { playing, start, stop, splash, bubblePop } = useOceanSounds();
  const location = useLocation();
  const isTracingPage = location.pathname.startsWith('/trace/') || location.pathname.startsWith('/letters/');

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

      {/* Header (shared across all pages except tracing) */}
      {!isTracingPage && <Header playing={playing} onToggleSound={toggleSound} />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={
          <HomePage
            activeShell={activeShell}
            setActiveShell={setActiveShell}
            playing={playing}
            splash={splash}
            bubblePop={bubblePop}
          />
        } />
        <Route path="/letters/:category" element={
          <LetterPage playing={playing} toggleSound={toggleSound} />
        } />
        <Route path="/trace/:category/:char" element={
          <TracingScreen playing={playing} onToggleSound={toggleSound} />
        } />
      </Routes>
    </div>
  );
}