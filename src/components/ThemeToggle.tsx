import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import type { ThemeMode } from '@/context/ThemeContext';

const THEME_OPTIONS: { mode: ThemeMode; label: string; Icon: typeof Sun }[] = [
  { mode: 'system', label: 'System', Icon: Monitor },
  { mode: 'light', label: 'Light', Icon: Sun },
  { mode: 'dark', label: 'Dark', Icon: Moon },
];

export const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const modeLabel = theme === 'system' ? `System (${resolvedTheme})` : theme === 'dark' ? 'Dark' : 'Light';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerOutside = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handlePointerOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Theme: ${modeLabel}. Choose system, light or dark theme.`}
        className={cn(
          'inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-md px-2.5 text-xs font-mono',
          'lg:gap-2 lg:px-3 bg-mc-surface border border-mc-border text-mc-text-body',
          'hover:bg-mc-surface-hover hover:border-mc-border-strong hover:text-mc-text-strong',
          'focus-visible:outline-2 focus-visible:outline-mc-orange transition-[background-color,border-color,color] duration-160'
        )}
      >
        <span className="text-mc-orange" aria-hidden="true">
          {theme === 'system' ? <Monitor className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> : resolvedTheme === 'dark' ? <Moon className="w-4 h-4 lg:w-3.5 lg:h-3.5" /> : <Sun className="w-4 h-4 lg:w-3.5 lg:h-3.5" />}
        </span>
        <span className="hidden lg:inline">{theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}</span>
        <ChevronDown aria-hidden="true" className={cn('w-3.5 h-3.5 lg:w-3 lg:h-3 text-mc-text-tertiary transition-transform duration-160', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div role="menu" aria-label="Choose theme" className="absolute right-0 mt-1 w-36 rounded-md bg-mc-elevated border border-mc-border-strong shadow-xl py-1 z-50">
          {THEME_OPTIONS.map((option) => {
            const isSelected = theme === option.mode;
            const { Icon } = option;
            return (
              <button
                key={option.mode}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => { setTheme(option.mode); setIsOpen(false); }}
                className={cn('w-full min-h-11 flex items-center justify-between px-3 text-xs font-mono text-left transition-[background-color,color]', isSelected ? 'bg-mc-surface-active text-mc-text-strong font-medium' : 'text-mc-text-secondary hover:bg-mc-surface-hover hover:text-mc-text-strong')}
              >
                <span className="flex items-center gap-2"><Icon aria-hidden="true" className={cn('w-3.5 h-3.5', isSelected ? 'text-mc-orange' : 'text-mc-text-tertiary')} />{option.label}</span>
                {isSelected && <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-mc-orange" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
