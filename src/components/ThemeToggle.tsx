import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeMode } from '@/context/ThemeContext';
import { Sun, Moon, Laptop, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'system', label: 'System', icon: <Laptop className="w-3.5 h-3.5" /> },
    { mode: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> },
    { mode: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
  ];

  const currentOption = options.find((o) => o.mode === theme) || options[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Current theme mode is ${currentOption.label}. Select to change theme.`}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-md',
          'bg-mc-surface border border-mc-border text-mc-text-body',
          'hover:bg-mc-surface-hover hover:border-mc-border-strong hover:text-mc-text-strong',
          'focus-visible:outline-2 focus-visible:outline-mc-orange transition-all duration-160'
        )}
      >
        <span className="text-mc-orange">{currentOption.icon}</span>
        <span>{currentOption.label}</span>
        <ChevronDown className={cn('w-3 h-3 text-mc-text-tertiary transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-1 w-32 rounded-md bg-mc-elevated border border-mc-border-strong shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          {options.map((opt) => {
            const isSelected = theme === opt.mode;
            return (
              <button
                key={opt.mode}
                role="menuitem"
                onClick={() => {
                  setTheme(opt.mode);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-1.5 text-xs font-mono text-left transition-colors',
                  isSelected
                    ? 'bg-mc-surface-active text-mc-text-strong font-medium'
                    : 'text-mc-text-secondary hover:bg-mc-surface-hover hover:text-mc-text-strong'
                )}
              >
                <span className="flex items-center gap-2">
                  <span className={cn(isSelected ? 'text-mc-orange' : 'text-mc-text-tertiary')}>
                    {opt.icon}
                  </span>
                  {opt.label}
                </span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-mc-orange" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
