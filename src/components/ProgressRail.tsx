import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressRailProps {
  currentSection: number;
  totalSections: number;
  accentColor: string;
  onDotClick: (index: number) => void;
}

export function ProgressRail({ currentSection, totalSections, accentColor, onDotClick }: ProgressRailProps) {
  return (
    <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {Array.from({ length: totalSections }).map((_, i) => {
        const isActive = i === currentSection;
        return (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className="group relative flex items-center justify-center w-6 h-6 transition-all focus:outline-none"
            aria-label={`Scroll to section ${i + 1}`}
          >
            <span
              className={cn(
                "block rounded-full transition-all duration-300",
                isActive ? "w-3 h-3" : "w-2 h-2 group-hover:w-2.5 group-hover:h-2.5 bg-muted-foreground/40 border border-muted-foreground/60"
              )}
              style={isActive ? { backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` } : {}}
            />
          </button>
        );
      })}
    </div>
  );
}
