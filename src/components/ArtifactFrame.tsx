import React from 'react';
import { cn } from '@/lib/utils';

interface ArtifactFrameProps {
  title?: string;
  category?: string;
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
  variant?: 'website' | 'application' | 'technical';
}

export const ArtifactFrame: React.FC<ArtifactFrameProps> = ({
  title = 'MONOLITH SYSTEM ARTIFACT',
  category,
  children,
  className,
  headerRight,
  variant = 'application',
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-mc-border overflow-hidden bg-mc-surface shadow-2xl transition-all duration-240',
        'hover:border-mc-border-strong',
        className
      )}
    >
      {/* Top Bar Chrome */}
      <div className="h-10 px-4 bg-mc-surface-deep border-b border-mc-border flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          {/* Subtle Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-mc-border-bright" />
            <span className="w-2.5 h-2.5 rounded-full bg-mc-border-bright" />
            <span className="w-2.5 h-2.5 rounded-full bg-mc-border-bright" />
          </div>

          {/* Title / Path */}
          <div className="flex items-center gap-2 font-mono text-xs text-mc-text-secondary truncate">
            {category && (
              <span className="px-1.5 py-0.5 rounded bg-mc-surface border border-mc-border text-[10px] text-mc-orange uppercase">
                {category}
              </span>
            )}
            <span className="truncate">{title}</span>
          </div>
        </div>

        {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
      </div>

      {/* Frame Body */}
      <div className="relative overflow-hidden bg-mc-bg">{children}</div>
    </div>
  );
};
