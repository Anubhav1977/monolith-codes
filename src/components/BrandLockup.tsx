import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BrandLockupProps {
  variant?: 'horizontal' | 'stacked' | 'mark-only' | 'wordmark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  interactiveHover?: boolean;
}

export const BrandLockup: React.FC<BrandLockupProps> = ({
  variant = 'horizontal',
  className,
  size = 'md',
  interactiveHover = true,
}) => {
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

  if (variant === 'mark-only') {
    return (
      <motion.img
        whileHover={interactiveHover ? { scale: 1.12, rotate: 2 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
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
    <motion.div
      initial="initial"
      whileHover="hover"
      className={cn(
        'flex items-center gap-3 select-none group cursor-pointer',
        variant === 'stacked' && 'flex-col items-start gap-2',
        className
      )}
    >
      {/* Brand Icon Mark with Pop & Glow Animation */}
      <motion.div
        variants={{
          initial: { scale: 1, filter: 'drop-shadow(0 0 0px rgba(255,107,0,0))' },
          hover: {
            scale: 1.15,
            rotate: [0, -3, 3, 0],
            filter: 'drop-shadow(0 0 12px rgba(255,107,0,0.5))',
          },
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        className="shrink-0 relative"
      >
        <img
          src="/assets/brand/monolith-mark.png"
          alt="MONOLITH CODES Mark"
          className={cn(markSizes[size], 'object-contain')}
        />
      </motion.div>

      {/* Wordmark Text with Smooth Rightward Slide & Stagger Animation */}
      <motion.div
        variants={{
          initial: { x: 0, opacity: 0.95 },
          hover: { x: 4, opacity: 1 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex flex-col justify-center leading-none"
      >
        <span className={cn('font-medium text-mc-text-strong font-sans flex items-center gap-1', titleSizes[size])}>
          <span>MONOLITH</span>
          <motion.span
            variants={{
              initial: { color: 'var(--mc-orange)' },
              hover: { color: '#FF9A1F', scale: 1.05 },
            }}
            className="font-semibold text-mc-orange inline-block"
          >
            CODES
          </motion.span>
        </span>

        <span className={cn('font-mono text-mc-text-tertiary uppercase mt-0.5 group-hover:text-mc-text-secondary transition-colors', tagSizes[size])}>
          SOFTWARE ENGINEERING STUDIO
        </span>
      </motion.div>
    </motion.div>
  );
};
