import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { type Scenario } from '@/data/scenarios';

interface PayoffMatrixProps {
  scenario: Scenario;
  isVisible?: boolean;
}

export function PayoffMatrix({ scenario, isVisible = true }: PayoffMatrixProps) {
  const { payoffMatrix, accentColor } = scenario;
  const [showCells, setShowCells] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowCells(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowCells(false);
    }
    return undefined;
  }, [isVisible]);

  const getCellColorClass = (color: 'green' | 'red' | 'amber') => {
    switch (color) {
      case 'green': return 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50';
      case 'red': return 'bg-rose-950/40 text-rose-400 border-rose-900/50';
      case 'amber': return 'bg-amber-950/40 text-amber-400 border-amber-900/50';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto overflow-x-auto py-8">
      <div className="min-w-[500px] grid grid-cols-[120px_1fr] gap-4">
        {/* Top Header (Col Player) */}
        <div />
        <div className="flex flex-col items-center pb-4">
          <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-2">
            {payoffMatrix.colPlayer}
          </span>
          <div className="grid grid-cols-2 w-full gap-4 text-center">
            <div className="font-serif text-lg font-medium">{payoffMatrix.colStrategies[0]}</div>
            <div className="font-serif text-lg font-medium">{payoffMatrix.colStrategies[1]}</div>
          </div>
        </div>

        {/* Row Header (Row Player) + Matrix */}
        <div className="flex items-center justify-end pr-4 text-right">
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-2">
              {payoffMatrix.rowPlayer}
            </span>
            <div className="flex flex-col gap-4 justify-around h-full font-serif text-lg font-medium py-10">
              <div>{payoffMatrix.rowStrategies[0]}</div>
              <div>{payoffMatrix.rowStrategies[1]}</div>
            </div>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-rows-2 gap-4">
          {[0, 1].map((r) => (
            <div key={`row-${r}`} className="grid grid-cols-2 gap-4">
              {[0, 1].map((c) => {
                const outcome = payoffMatrix.outcomes[r][c];
                const isNash = payoffMatrix.nashIndex[0] === r && payoffMatrix.nashIndex[1] === c;
                
                return (
                  <div
                    key={`cell-${r}-${c}`}
                    className={cn(
                      'relative p-6 rounded-xl border flex flex-col justify-center transition-all duration-700 ease-out min-h-[140px]',
                      getCellColorClass(outcome.color), // Using the first outcome's color for the overall cell tint
                      showCells ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    )}
                    style={{
                      transitionDelay: `${(r * 2 + c) * 100}ms`
                    }}
                  >
                    {isNash && (
                      <div 
                        className="absolute inset-0 rounded-xl border-2 pointer-events-none transition-all duration-1000"
                        style={{ borderColor: accentColor, boxShadow: `0 0 20px ${accentColor}40 inset` }}
                      >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-2 text-xs font-bold tracking-widest uppercase" style={{ color: accentColor }}>
                          Nash Equilibrium
                        </div>
                      </div>
                    )}
                    <div className="text-center space-y-2 relative z-10">
                      <div className="font-mono font-bold text-xl mb-1 tracking-tight">
                        <span className={cn(outcome.color === 'green' ? 'text-emerald-400' : outcome.color === 'red' ? 'text-rose-400' : 'text-amber-400')}>
                          {outcome.value.split(' / ')[0]}
                        </span>
                        <span className="text-muted-foreground mx-2">/</span>
                        <span className={cn(outcome.color === 'green' ? 'text-emerald-400' : outcome.color === 'red' ? 'text-rose-400' : 'text-amber-400')}>
                          {outcome.value.split(' / ')[1]}
                        </span>
                      </div>
                      <div className="text-sm font-medium leading-tight opacity-90">
                        {outcome.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
