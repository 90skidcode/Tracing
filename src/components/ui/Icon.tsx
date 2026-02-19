import type { IconProps } from '../../types/ocean';

export default function Icon({ name, className = "", filled = false, style = {} }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? "filled" : ""} ${className}`}
      style={style}
    >
      {name}
    </span>
  );
}
