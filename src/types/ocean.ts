export interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
  style?: React.CSSProperties;
}

export interface BubbleProps {
  size: string;
  left: string;
  duration: string;
  delay: string;
}

export interface SoundToggleProps {
  playing: boolean;
  onToggle: () => void;
}

export interface HeaderProps {
  playing: boolean;
  onToggleSound: () => void;
}

export interface HeroSectionProps {
  playing: boolean;
  activeShell: string | null;
  onSplash: () => void;
}

export interface ShellSelectorProps {
  activeShell: string | null;
  onSelectShell: (shell: string) => void;
  onBubblePop: () => void;
}
