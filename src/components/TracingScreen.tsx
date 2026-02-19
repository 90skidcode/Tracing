import { Canvas, PencilBrush, Shadow, Text } from 'fabric'; // Fabric v6 imports
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SoundToggle from './SoundToggle';
import Icon from './ui/Icon';

const CATEGORIES: Record<string, string[]> = {
  ABC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  abc: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  '123': '0123456789'.split(''),
};

const VIEW_W = 320;
const VIEW_H = 400;
const FONT_SIZE = 300;
const TEXT_Y = VIEW_H / 2; // Fabric aligns well with originX/Y center
const TEXT_X = VIEW_W / 2;

export default function TracingScreen({ playing, onToggleSound }: { playing: boolean; onToggleSound: () => void }) {
  const { category, char } = useParams<{ category: string; char: string }>();
  const navigate = useNavigate();

  const items = CATEGORIES[category || 'ABC'] || CATEGORIES.ABC;
  const currentIndex = items.indexOf(char || '');
  const currentChar = char || 'A';
  const levelNum = currentIndex >= 0 ? currentIndex + 1 : 1;

  // Refs
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [traceProgress, setTraceProgress] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  // Nav
  const goNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    navigate(`/trace/${category}/${items[nextIdx]}`);
  };

  const goPrev = () => navigate(`/letters/${category}`);

  // ── Fabric Setup ───────────────────────────────────
  useEffect(() => {
    if (!canvasEl.current) return;

    // Initialize Fabric Canvas
    const canvas = new Canvas(canvasEl.current, {
      width: VIEW_W,
      height: VIEW_H,
      backgroundColor: 'transparent', // We'll manage background via objects or CSS
      isDrawingMode: true,
      selection: false,
    });
    fabricRef.current = canvas;

    // 1. Create Base Letter (Gray Fill) - The constraints
    const baseLetter = new Text(currentChar, {
      fontFamily: 'Fredoka',
      fontSize: FONT_SIZE,
      fontWeight: '700',
      left: TEXT_X,
      top: TEXT_Y,
      originX: 'center',
      originY: 'center',
      fill: '#E5E5E5',
      selectable: false,
      evented: false,
      hoverCursor: 'default',
    });
    
    // 2. Create Clipping Path (Same shape)
    // We clone the baseLetter to use as a clipPath for strokes
    // Note: Fabric objects used as clipPath must be positioned absolutely
    baseLetter.clone().then((cloned: Text) => {
      cloned.absolutePositioned = true;
      
      // Configure Brush
      const brush = new PencilBrush(canvas);
      brush.color = '#9B59B6'; // Purple fill
      brush.width = 45; // Thick brush
      // We can also set a shadow/glow on the brush for smoother look
      brush.shadow = new Shadow({ blur: 2, color: '#8E44AD', offsetX: 0, offsetY: 0 });
      canvas.freeDrawingBrush = brush;

      // Event: Clip strokes to letter shape when created
      canvas.on('path:created', (e: any) => {
        const path = e.path;
        if (!path) return;
        
        // Apply clipping to the new stroke
        path.clipPath = cloned; // The letter shape
        
        // Update progress (simple logic: count strokes or pixels? simpler to just count strokes for MVP)
        // A real implementation would verify coverage.
        setTraceProgress(prev => Math.min(100, prev + 10)); 
      });

      // Add visible objects
      canvas.add(baseLetter);
      
      // 3. Add Outline on Top (after strokes, but strokes are added dynamically)
      // To ensure outline stays on top, we can add it and bringToFront on drawing
      const outline = new Text(currentChar, {
        fontFamily: 'Fredoka',
        fontSize: FONT_SIZE,
        fontWeight: '700',
        left: TEXT_X,
        top: TEXT_Y,
        originX: 'center',
        originY: 'center',
        fill: '',
        stroke: '#2C3E50',
        strokeWidth: 8,
        strokeLineJoin: 'round',
        strokeLineCap: 'round',
        selectable: false,
        evented: false,
      });
      canvas.add(outline);
      
      // Dotted Guide Lines
      const guideDots = new Text(currentChar, {
        fontFamily: 'Fredoka',
        fontSize: FONT_SIZE,
        fontWeight: '700',
        left: TEXT_X,
        top: TEXT_Y,
        originX: 'center',
        originY: 'center',
        fill: '',
        stroke: '#FFFFFF',
        strokeWidth: 2,
        strokeDashArray: [10, 15],
        opacity: 0.6,
        selectable: false,
        evented: false,
      });
      canvas.add(guideDots);

      // Ensure brush strokes go under outline
      canvas.on('path:created', () => {
         canvas.bringObjectToFront(outline);
         canvas.bringObjectToFront(guideDots);
      });

      canvas.requestRenderAll();
    });

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, [currentChar]);

  // Handle Progress Calculation & Completion
  useEffect(() => {
    if (traceProgress >= 90 && !showComplete) {
      setShowComplete(true);
      // Play sound or confetti?
    }
  }, [traceProgress, showComplete]);

  // Clear
  const clearCanvas = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    // Remove all 'path' objects (strokes)
    const objects = canvas.getObjects();
    objects.forEach(obj => {
       if (obj.type === 'path') {
         canvas.remove(obj);
       }
    });
    setTraceProgress(0);
    setShowComplete(false);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 10 }}>

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "var(--header-padding)", position: "relative", zIndex: 50,
      }}>
        <button onClick={goPrev} style={{
          background: "rgba(255,255,255,0.3)", backdropFilter: "blur(8px)",
          color: "#005F6B", padding: "0.6rem", borderRadius: "9999px",
          border: "2px solid rgba(255,255,255,0.5)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="arrow_back" />
        </button>
        <div style={{
          background: "rgba(255,255,255,0.3)", backdropFilter: "blur(12px)",
          padding: "0.4rem 1.2rem", borderRadius: "9999px",
          border: "2px solid rgba(255,255,255,0.5)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}>
          <span style={{ color: "#005F6B", fontWeight: 800, fontSize: "clamp(0.85rem, 3vw, 1.1rem)", letterSpacing: "0.12em" }}>
            LEVEL {levelNum}
          </span>
        </div>
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

      {/* Progress bar */}
      <div style={{
        margin: "0.25rem auto 0", width: "clamp(200px, 60vw, 320px)", height: 6,
        background: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden",
      }}>
        <div style={{
          width: `${traceProgress}%`, height: "100%",
          background: "linear-gradient(90deg, #9B59B6, #E74C3C, #FFD93D)",
          borderRadius: 3, transition: "width 0.15s ease",
        }} />
      </div>

      {/* Main tracing area */}
      <main style={{
        flex: 1, position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0.25rem",
      }}>
        <div ref={containerRef} style={{
          position: "relative",
          width: "clamp(300px, 80vw, 400px)",
          height: "clamp(375px, 55vh, 500px)",
          display: "flex", justifyContent: "center", alignItems: "center",
        }}>
           {/* Fabric Canvas */}
           <canvas ref={canvasEl} width={VIEW_W} height={VIEW_H} style={{ touchAction: 'none' }} />

           {/* Keep the decorative Clownfish (as HTML overlay, because it's nice) */}
           <div className="animate-float" style={{
              position: "absolute", top: "40%", left: "5%",
              width: "clamp(50px, 12vw, 70px)",
              zIndex: 30, pointerEvents: "none",
           }}>
             <div className="animate-wiggle">
               <Icon name="set_meal" filled style={{ fontSize: "3rem", color: "#FF7E27" }} />
             </div>
           </div>
           
           {/* Success Star */}
           {showComplete && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              pointerEvents: "none", zIndex: 40,
            }}>
              <div style={{
                fontSize: "6rem",
                animation: "sparkle 1.5s ease-in-out infinite",
                textShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}>
                ⭐
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ position: "relative", width: "100%", height: "clamp(100px, 15vh, 140px)", zIndex: 20, marginTop: "auto" }}>
        {/* Sand Layers */}
        <div style={{ position: "absolute", bottom: 0, width: "100%", height: "70%", background: "#D4A33B", borderRadius: "50% 50% 0 0", transform: "scaleX(1.1) translateY(6px)" }} />
        <div style={{ position: "absolute", bottom: 0, width: "100%", height: "55%", background: "#F9D56E", borderRadius: "100% 100% 0 0", transform: "scaleX(1.25)", borderTop: "4px solid rgba(255,255,255,0.2)" }} />

        {/* Buttons */}
        <div style={{
          position: "absolute", bottom: "clamp(16px, 3vh, 28px)",
          left: 0, right: 0, padding: "0 clamp(1.5rem, 6vw, 2.5rem)",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          zIndex: 30,
        }}>
          <button onClick={clearCanvas} style={{
            background: "rgba(255,255,255,0.3)", backdropFilter: "blur(8px)",
            color: "#005F6B", padding: "0.75rem", borderRadius: "9999px",
            border: "2px solid rgba(255,255,255,0.5)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.1rem",
          }} aria-label="Clear">
            <Icon name="refresh" style={{ fontSize: "1.5rem" }} />
          </button>

          <button onClick={goNext} style={{
            background: showComplete ? "rgba(76,175,80,0.85)" : "rgba(255,159,28,0.85)",
            backdropFilter: "blur(8px)",
            color: "white", padding: "1rem", borderRadius: "9999px",
            border: "2px solid rgba(255,255,255,0.4)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }} aria-label="Next">
            <Icon name="arrow_forward" filled style={{ fontSize: "2rem" }} />
          </button>
        </div>
      </footer>
    </div>
  );
}
