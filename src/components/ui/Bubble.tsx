import type { BubbleProps } from '../../types/ocean';

export default function Bubble({ size, left, duration, delay }: BubbleProps) {
  return (
    <div
      className={`animate-bubble ${size}`}
      style={{
        position: "absolute",
        left,
        background: "rgba(255,255,255,0.4)",
        borderRadius: "50%",
        pointerEvents: "none",
        animationDuration: duration,
        animationDelay: delay,
        bottom: 0,
      }}
    />
  );
}
