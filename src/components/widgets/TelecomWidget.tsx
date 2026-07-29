import React, { useState } from 'react';
import { Scenario } from '@/data/scenarios';
import { WordmarkBadge } from '../WordmarkBadge';

export function TelecomWidget({ scenario }: { scenario: Scenario }) {
  const [jioCut, setJioCut] = useState(true); // Jio is always cutting in this scenario
  const [incumbentChoice, setIncumbentChoice] = useState<'hold' | 'cut' | null>(null);
  
  const isCut = incumbentChoice === 'cut';
  
  // Market share approximations
  const jioShare = incumbentChoice === null ? 33 : (isCut ? 40 : 80);
  const airtelShare = incumbentChoice === null ? 33 : (isCut ? 35 : 10);
  const viShare = incumbentChoice === null ? 34 : (isCut ? 25 : 10);

  // SVG Pie chart calculation
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const createPieSlice = (percent: number, startPercent: number, color: string) => {
    const [startX, startY] = getCoordinatesForPercent(startPercent);
    const [endX, endY] = getCoordinatesForPercent(startPercent + percent);
    const largeArcFlag = percent > 0.5 ? 1 : 0;
    const pathData = [
      `M ${startX} ${startY}`, // Move
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
      `L 0 0`, // Line to center
    ].join(' ');

    return <path d={pathData} fill={color} className="transition-all duration-1000 ease-out" />;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-12 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
        
        {/* Left: Interactive Controls */}
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">You are the Incumbents (residents) </h3>
            <p className="text-muted-foreground mb-6">Jio has entered with free voice and data. You must react.</p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setIncumbentChoice('hold')}
                className={`p-4 rounded-xl border-2 transition-all font-semibold flex items-center justify-between
                  ${incumbentChoice === 'hold' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-border hover:border-emerald-500/50'}`}
              >
                <span>Hold Prices (Protect Profit Margin)</span>
                {incumbentChoice === 'hold' && <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />}
              </button>
              
              <button
                onClick={() => setIncumbentChoice('cut')}
                className={`p-4 rounded-xl border-2 transition-all font-semibold flex items-center justify-between
                  ${incumbentChoice === 'cut' ? 'border-rose-500 bg-rose-500/10 text-rose-500' : 'border-border hover:border-rose-500/50'}`}
              >
                <span>Cut Prices (Match Jio)</span>
                {incumbentChoice === 'cut' && <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />}
              </button>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Combined Industry Profit</h4>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${incumbentChoice === 'cut' ? 'bg-rose-500 w-1/4' : 'bg-emerald-500 w-full'}`}
              />
            </div>
            <div className="mt-2 text-right text-sm font-medium">
              {incumbentChoice === 'cut' ? 'Cratered (-60%)' : 'Stable'}
            </div>
          </div>
        </div>

        {/* Right: Market Share Viz */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-8">Market Share</h4>
          
          <div className="relative w-64 h-64">
            <svg viewBox="-1 -1 2 2" className="w-full h-full transform -rotate-90">
              {createPieSlice(jioShare / 100, 0, scenario.badgeColors['Reliance Jio'].bg)}
              {createPieSlice(airtelShare / 100, jioShare / 100, scenario.badgeColors['Airtel'].bg)}
              {createPieSlice(viShare / 100, (jioShare + airtelShare) / 100, scenario.badgeColors['Vodafone Idea'].bg)}
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none mix-blend-difference text-white drop-shadow-md">
              <span className="font-bold text-2xl">{jioShare}%</span>
              <span className="text-xs font-semibold tracking-wider">JIO</span>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-4 w-full">
             <div className="text-center">
               <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: scenario.badgeColors['Reliance Jio'].bg }} />
               <div className="text-xs text-muted-foreground">Jio</div>
               <div className="font-bold">{jioShare}%</div>
             </div>
             <div className="text-center">
               <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: scenario.badgeColors['Airtel'].bg }} />
               <div className="text-xs text-muted-foreground">Airtel</div>
               <div className="font-bold">{airtelShare}%</div>
             </div>
             <div className="text-center">
               <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: scenario.badgeColors['Vodafone Idea'].bg }} />
               <div className="text-xs text-muted-foreground">Vi</div>
               <div className="font-bold">{viShare}%</div>
             </div>
          </div>
        </div>

      </div>

      {incumbentChoice !== null && (
        <div className="animate-in fade-in slide-in-from-bottom-4 bg-accent/10 border border-accent/20 p-6 rounded-xl w-full text-center">
          <p className="font-serif text-xl">
            {incumbentChoice === 'hold' 
              ? "If you hold prices, Jio takes nearly the entire market. Profits mean nothing without customers."
              : "By cutting prices, you stop Jio from taking the whole market — but you destroy your own profitability. Welcome to the Nash Equilibrium."}
          </p>
        </div>
      )}
    </div>
  );
}
