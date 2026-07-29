import React, { useState } from 'react';
import { Scenario } from '@/data/scenarios';
import { Users, Coins, Info, ArrowLeftRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { WordmarkBadge } from '../WordmarkBadge';

export function SwiggyZomatoWidget({ scenario }: { scenario: Scenario }) {
  const [swiggySpend, setSwiggySpend] = useState<boolean>(true);
  const [zomatoSpend, setZomatoSpend] = useState<boolean>(true);
  
  const [round, setRound] = useState(0);
  const [cashBurned, setCashBurned] = useState(0);

  const handleSimulate = () => {
    if (round >= 3) return;
    setRound(r => r + 1);
    
    let burn = 0;
    if (swiggySpend) burn += 500;
    if (zomatoSpend) burn += 500;
    setCashBurned(c => c + burn);
  };

  const reset = () => {
    setRound(0);
    setCashBurned(0);
  };

  // customer position offset: shift toward Swiggy (-40px) or Zomato (+40px)
  let customerPos = 0;
  let statusText = "Market Split 50 / 50";
  
  if (swiggySpend && !zomatoSpend) {
    customerPos = -40;
    statusText = "Shifted to Swiggy";
  } else if (!swiggySpend && zomatoSpend) {
    customerPos = 40;
    statusText = "Shifted to Zomato";
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-4 flex flex-col items-start gap-8">
      
      {/* Instructions Header - Clear of the Arena below */}
      <div className="w-full max-w-lg p-4 rounded-xl bg-card border border-border flex items-start gap-3 text-sm text-muted-foreground text-left z-20">
        <Info size={20} className="text-primary shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-foreground block mb-1">How to Play:</span>
          Select whether <strong>Swiggy</strong> and <strong>Zomato</strong> choose to <strong>Spend</strong> (discount/market) or <strong>Hold</strong> back cash this quarter, then click <strong>Simulate Quarter</strong> to watch the outcome!
        </div>
      </div>

      {/* Main Simulation Field with increased vertical height & safety padding */}
      <div className="flex justify-between items-center w-full relative h-64 my-4">
        
        {/* Swiggy Side */}
        <div className="flex flex-col items-start z-10">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-2">Swiggy Treasury</div>
          <div 
            className="w-24 h-24 rounded-full bg-card border-4 flex items-center justify-center mb-4 transition-all duration-500 ease-in-out shadow-md"
            style={{ 
              borderColor: scenario.badgeColors['Swiggy']?.bg || '#fc8019',
              transform: `scale(${1 - (swiggySpend && round > 0 ? 0.1 * round : 0)})`,
              opacity: swiggySpend && round > 0 ? 0.8 : 1
            }}
          >
            <Coins size={36} className="text-orange-500" />
          </div>
          <div className="flex gap-2 bg-background p-1 rounded-lg border">
            <button 
              onClick={() => setSwiggySpend(true)}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${swiggySpend ? 'bg-orange-500 text-white' : 'hover:bg-muted'}`}
            >Spend</button>
            <button 
              onClick={() => setSwiggySpend(false)}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${!swiggySpend ? 'bg-orange-500 text-white' : 'hover:bg-muted'}`}
            >Hold</button>
          </div>
        </div>

        {/* Customer Base / Market Share (Centered & Shiftable without collision) */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-0 flex flex-col items-center"
          style={{ transform: `translate(calc(-50% + ${customerPos}px), -50%)` }}
        >
          <div className="relative p-4 bg-card rounded-2xl border-2 border-primary/30 shadow-lg flex flex-col items-center text-center min-w-[140px]">
            {/* Multiple Users Icon */}
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-2 border border-primary/20">
              <Users size={30} className="text-primary" />
            </div>

            {/* Shift Direction Indicator */}
            <div className="flex items-center justify-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-muted border text-foreground whitespace-nowrap">
              {swiggySpend && !zomatoSpend && <ArrowLeft size={12} className="text-orange-500" />}
              {!swiggySpend && zomatoSpend && <ArrowRight size={12} className="text-red-500" />}
              {swiggySpend === zomatoSpend && <ArrowLeftRight size={12} className="text-muted-foreground" />}
              <span>{statusText}</span>
            </div>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mt-2">Active Customers</span>
        </div>

        {/* Zomato Side */}
        <div className="flex flex-col items-end z-10">
          <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">Zomato Treasury</div>
          <div 
            className="w-24 h-24 rounded-full bg-card border-4 flex items-center justify-center mb-4 transition-all duration-500 ease-in-out shadow-md"
            style={{ 
              borderColor: scenario.badgeColors['Zomato']?.bg || '#e23744',
              transform: `scale(${1 - (zomatoSpend && round > 0 ? 0.1 * round : 0)})`,
              opacity: zomatoSpend && round > 0 ? 0.8 : 1
            }}
          >
            <Coins size={36} className="text-red-500" />
          </div>
          <div className="flex gap-2 bg-background p-1 rounded-lg border">
            <button 
              onClick={() => setZomatoSpend(true)}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${zomatoSpend ? 'bg-red-500 text-white' : 'hover:bg-muted'}`}
            >Spend</button>
            <button 
              onClick={() => setZomatoSpend(false)}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${!zomatoSpend ? 'bg-red-500 text-white' : 'hover:bg-muted'}`}
            >Hold</button>
          </div>
        </div>

      </div>

      {/* Control Card - Left Aligned */}
      <div className="bg-card border rounded-xl p-6 flex flex-col items-start w-full max-w-md text-left z-10">
        <div className="flex justify-between w-full mb-6">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Round</div>
            <div className="font-mono text-2xl font-bold">{round} / 3</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Cash Burned</div>
            <div className={`font-mono text-2xl font-bold ${cashBurned > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
              ₹{cashBurned} Cr
            </div>
          </div>
        </div>
        
        {round < 3 ? (
          <button 
            onClick={handleSimulate}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors text-center"
          >
            Simulate Quarter
          </button>
        ) : (
          <div className="w-full text-left space-y-4">
            <div className="text-amber-500 font-serif font-bold text-xl">
              {swiggySpend && zomatoSpend 
                ? "Both burned cash. Market share barely moved."
                : (!swiggySpend && !zomatoSpend ? "Peace! Both saved money." : "One side won, but at what cost?")}
            </div>
            <button onClick={reset} className="text-sm underline text-muted-foreground block">Reset Simulation</button>
          </div>
        )}
      </div>

    </div>
  );
}
