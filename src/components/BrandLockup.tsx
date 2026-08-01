import React, { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BrandLockupProps {
  variant?: 'horizontal' | 'stacked' | 'mark-only' | 'wordmark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Enables the navigation's one-shot monolith installation interaction. */
  interactiveHover?: boolean;
}

const DUST_PARTICLES = [0, 1, 2, 3];

export const BrandLockup: React.FC<BrandLockupProps> = ({
  variant = 'horizontal',
  className,
  size = 'md',
  interactiveHover = false,
}) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const playedForCurrentHover = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  const markSizes = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-10 w-auto',
  };

  const titleSizes = {
    sm: 'text-sm tracking-tight',
    md: 'text-base tracking-tight',
    lg: 'text-xl tracking-tight',
  };

  const tagSizes = {
    sm: 'text-[9px] tracking-widest',
    md: 'text-[10px] tracking-widest',
    lg: 'text-[11px] tracking-widest',
  };

  const startInstallation = (event: React.PointerEvent<HTMLDivElement>) => {
    // Touch devices have no stable hover state; preserve a quiet, reliable logo there.
    if (
      !interactiveHover ||
      shouldReduceMotion ||
      event.pointerType !== 'mouse' ||
      playedForCurrentHover.current ||
      isInstalling
    ) {
      return;
    }

    playedForCurrentHover.current = true;
    setIsInstalling(true);
  };

  const resetHoverCycle = () => {
    playedForCurrentHover.current = false;
  };

  if (variant === 'mark-only') {
    return (
      <img
        src="/assets/brand/monolith-mark.png"
        alt="MONOLITH CODES"
        className={cn(markSizes[size], 'object-contain', className)}
      />
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={cn('flex flex-col justify-center', className)}>
        <span className={cn('font-medium text-mc-text-strong font-sans', titleSizes[size])}>
          MONOLITH CODES
        </span>
        <span className={cn('font-mono text-mc-text-tertiary uppercase', tagSizes[size])}>
          Software Engineering Studio
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'mc-brand-lockup flex items-center gap-3 select-none',
        interactiveHover && 'cursor-pointer',
        variant === 'stacked' && 'flex-col items-start gap-2',
        isInstalling && 'mc-brand-lockup--installing',
        className
      )}
      onPointerEnter={startInstallation}
      onPointerLeave={resetHoverCycle}
      onAnimationEnd={(event) => {
        if (event.animationName === 'mc-brand-settle') setIsInstalling(false);
      }}
    >
      <div className="mc-brand-mark shrink-0 relative" aria-hidden="true">
        <span className="mc-brand-glow" />
        <span className="mc-brand-shadow" />
        <span className="mc-brand-shockwave" />
        {DUST_PARTICLES.map((particle) => (
          <span key={particle} className={`mc-brand-dust mc-brand-dust--${particle + 1}`} />
        ))}
        <div className="mc-brand-mark-shell relative">
          <img
            src="/assets/brand/monolith-mark.png"
            alt=""
            className={cn(markSizes[size], 'object-contain')}
          />
        </div>
      </div>

      <div className="mc-brand-copy flex flex-col justify-center leading-none">
        <span className={cn('font-medium text-mc-text-strong font-sans flex items-center gap-1', titleSizes[size])}>
          <span className="mc-brand-title-word mc-brand-title-word--monolith">MONOLITH</span>
          <span className="mc-brand-title-word mc-brand-title-word--codes font-semibold text-mc-orange">
            CODES
          </span>
        </span>
        <span className={cn('mc-brand-subtitle font-mono text-mc-text-tertiary uppercase mt-0.5', tagSizes[size])}>
          SOFTWARE ENGINEERING STUDIO
        </span>
      </div>
    </div>
  );
};
