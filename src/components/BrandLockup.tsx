import React from 'react';
import { cn } from '@/lib/utils';

interface BrandLockupProps {
  variant?: 'horizontal' | 'stacked' | 'mark-only' | 'wordmark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLockup: React.FC<BrandLockupProps> = ({
  variant = 'horizontal',
  className,
  size = 'md',
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
        'flex items-center gap-3 select-none',
        variant === 'stacked' && 'flex-col items-start gap-2',
        className
      )}
    >
      <img
        src="/assets/brand/monolith-mark.png"
        alt="MONOLITH CODES Mark"
        className={cn(markSizes[size], 'object-contain shrink-0')}
      />
      <div className="flex flex-col justify-center leading-none">
        <span className={cn('font-medium text-mc-text-strong font-sans', titleSizes[size])}>
          MONOLITH <span className="text-mc-orange font-semibold">CODES</span>
        </span>
        <span className={cn('font-mono text-mc-text-tertiary uppercase mt-0.5', tagSizes[size])}>
          SOFTWARE ENGINEERING STUDIO
        </span>
      </div>
    </div>
  );
};
