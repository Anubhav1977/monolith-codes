import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeLine {
  num: number;
  content: string;
  highlighted?: boolean;
}

interface CodeWindowProps {
  filename: string;
  language?: string;
  lines: CodeLine[];
  className?: string;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({
  filename,
  language = 'typescript',
  lines,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const codeText = lines.map((l) => l.content).join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'rounded-lg border border-mc-border bg-mc-surface-deep overflow-hidden font-mono text-xs shadow-xl',
        className
      )}
    >
      {/* Code Header */}
      <div className="h-10 px-4 bg-mc-surface border-b border-mc-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-mc-text-secondary text-xs">
          <Terminal className="w-3.5 h-3.5 text-mc-orange" />
          <span className="text-mc-text-strong font-medium">{filename}</span>
          <span className="text-[10px] text-mc-text-tertiary uppercase">({language})</span>
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copy Code Snippet"
          className="flex items-center gap-1.5 px-2 py-1 text-[11px] rounded bg-mc-surface-deep border border-mc-border text-mc-text-secondary hover:text-mc-text-strong hover:border-mc-border-strong transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-mc-orange" />
              <span className="text-mc-orange">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto leading-relaxed">
        <pre className="text-mc-text-body font-mono">
          {lines.map((line) => (
            <div
              key={line.num}
              className={cn(
                'flex items-start gap-4 px-2 py-0.5 rounded transition-colors',
                line.highlighted ? 'bg-mc-orange-10 border-l-2 border-mc-orange text-mc-text-strong' : ''
              )}
            >
              <span className="w-6 shrink-0 text-right text-mc-text-tertiary select-none">
                {line.num}
              </span>
              <span className="whitespace-pre">{line.content}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};
