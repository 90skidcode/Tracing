import { useCallback, useEffect, useRef, useState } from "react";
import bgMusic from "../asset/img/bg music.mp3";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export default function useOceanSounds() {
  const ctxRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const hasStartedRef = useRef(false);

  const getCtx = () => {
    if (!ctxRef.current)
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctxRef.current;
  };

  // Background music via HTML Audio element
  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(bgMusic);
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  // Actually play the audio (used internally)
  const playAudio = useCallback(() => {
    const audio = getAudio();
    audio
      .play()
      .then(() => {
        hasStartedRef.current = true;
        setPlaying(true);
      })
      .catch(() => {
        // Autoplay blocked — will try on user interaction
      });
  }, []);

  const start = useCallback(() => {
    playAudio();
  }, [playAudio]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    hasStartedRef.current = false;
    setPlaying(false);
  }, []);

  // Auto-play on mount + handle autoplay-blocked via user interaction
  useEffect(() => {
    const audio = getAudio();

    // Try playing immediately
    audio
      .play()
      .then(() => {
        hasStartedRef.current = true;
        setPlaying(true);
      })
      .catch(() => {
        // Autoplay blocked — wait for first user interaction
        const resume = () => {
          audio
            .play()
            .then(() => {
              hasStartedRef.current = true;
              setPlaying(true);
            })
            .catch(() => {});
        };
        document.addEventListener("touchstart", resume, { once: true });
        document.addEventListener("click", resume, { once: true });
      });

    // Cleanup: only remove listeners, do NOT stop audio or change state
    // (prevents React StrictMode double-mount from killing the music)
    return () => {
      document.removeEventListener("touchstart", () => {});
      document.removeEventListener("click", () => {});
    };
  }, []);

  // Splash sound for button clicks (Web Audio API)
  const splash = useCallback(() => {
    const ctx = getCtx();
    const bufLen = ctx.sampleRate * 0.3;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++)
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 2);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const lpf = ctx.createBiquadFilter();
    lpf.type = "bandpass";
    lpf.frequency.value = 800;
    lpf.Q.value = 0.5;
    const g = ctx.createGain();
    g.gain.value = 0.4;
    src.connect(lpf);
    lpf.connect(g);
    g.connect(ctx.destination);
    src.start();
  }, []);

  // Bubble pop for shell clicks (Web Audio API)
  const bubblePop = useCallback(() => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }, []);

  return { playing, start, stop, splash, bubblePop };
}
