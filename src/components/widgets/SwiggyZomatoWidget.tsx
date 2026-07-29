import React, { useState } from 'react';
import { Scenario } from '@/data/scenarios';
import { Users, Coins, Info, ArrowLeftRight, ArrowLeft, ArrowRight, TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';

interface HistoryPoint {
  quarter: number;
  swiggyProfit: number;
  zomatoProfit: number;
  netProfit: number;
}

export function SwiggyZomatoWidget({ scenario }: { scenario: Scenario }) {
  const [swiggySpend, setSwiggySpend] = useState<boolean>(true);
  const [zomatoSpend, setZomatoSpend] = useState<boolean>(true);
  
  const [quarter, setQuarter] = useState(0);
  const [history, setHistory] = useState<HistoryPoint[]>([
    { quarter: 0, swiggyProfit: 0, zomatoProfit: 0, netProfit: 0 }
  ]);

  const handleSimulate = () => {
    const nextQuarter = quarter + 1;
    
    let swiggyQ = 0;
    let zomatoQ = 0;

    if (swiggySpend && zomatoSpend) {
      // Price War: Heavy cash burn for both
      swiggyQ = -500;
      zomatoQ = -500;
    } else if (!swiggySpend && !zomatoSpend) {
      // High Margins: Both hold and profit
      swiggyQ = 300;
      zomatoQ = 300;
    } else if (swiggySpend && !zomatoSpend) {
      // Swiggy gains share, Zomato takes loss
      swiggyQ = 100;
      zomatoQ = -200;
    } else {
      // Zomato gains share, Swiggy takes loss
      swiggyQ = -200;
      zomatoQ = 100;
    }

    const lastPoint = history[history.length - 1];
    const newPoint: HistoryPoint = {
      quarter: nextQuarter,
      swiggyProfit: lastPoint.swiggyProfit + swiggyQ,
      zomatoProfit: lastPoint.zomatoProfit + zomatoQ,
      netProfit: lastPoint.netProfit + (swiggyQ + zomatoQ),
    };

    setQuarter(nextQuarter);
    setHistory([...history, newPoint]);
  };

  const reset = () => {
    setQuarter(0);
    setHistory([{ quarter: 0, swiggyProfit: 0, zomatoProfit: 0, netProfit: 0 }]);
  };

  const currentPoint = history[history.length - 1];

  // Graph scaling math
  const maxVal = Math.max(1000, ...history.map(h => Math.max(Math.abs(h.swiggyProfit), Math.abs(h.zomatoProfit), Math.abs(h.netProfit))));
  const graphHeight = 120;
  const graphWidth = 320;
  
  const getSvgPoints = (key: 'swiggyProfit' | 'zomatoProfit' | 'netProfit') => {
    if (history.length === 1) return `0,${graphHeight / 2}`;
    return history.map((h, i) => {
      const x = (i / (history.length - 1)) * graphWidth;
      // normalize Y around middle
      const y = (graphHeight / 2) - ((h[key] / maxVal) * (graphHeight / 2 - 10));
      return `${x},${y}`;
    }).join(' ');
  };

  // customer position offset
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
    <div className="w-full max-w-4xl mx-auto py-4 flex flex-col items-center gap-8">
      
      {/* Instructions Header */}
      <div className="w-full max-w-lg p-4 rounded-xl bg-card border border-border flex items-start gap-3 text-sm text-muted-foreground text-left z-20">
        <Info size={20} className="text-primary shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-foreground block mb-1">How to Play:</span>
          Set strategies for <strong>Swiggy</strong> and <strong>Zomato</strong> and click <strong>Simulate Next Quarter</strong>. Watch market share shift and track cumulative profit/loss lines across unlimited quarters!
        </div>
      </div>

      {/* Main Interactive Arena */}
      <div className="flex justify-between items-center w-full relative h-60 my-2">
        
        {/* Swiggy Control */}
        <div className="flex flex-col items-start z-10">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-2">Swiggy</div>
          <div className="w-20 h-20 rounded-full bg-card border-4 border-orange-500 flex items-center justify-center mb-3 shadow-md">
            <Coins size={30} className="text-orange-500" />
          </div>
          <div className="flex gap-1.5 bg-background p-1 rounded-lg border">
            <button 
              onClick={() => setSwiggySpend(true)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${swiggySpend ? 'bg-orange-500 text-white' : 'hover:bg-muted'}`}
            >Spend</button>
            <button 
              onClick={() => setSwiggySpend(false)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${!swiggySpend ? 'bg-orange-500 text-white' : 'hover:bg-muted'}`}
            >Hold</button>
          </div>
        </div>

        {/* Shifting Customer Center Field */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-0 flex flex-col items-center"
          style={{ transform: `translate(calc(-50% + ${customerPos}px), -50%)` }}
        >
          <div className="relative p-3 bg-card rounded-2xl border-2 border-primary/30 shadow-lg flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-1.5 border border-primary/20">
              <Users size={24} className="text-primary" />
            </div>
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-muted border text-foreground whitespace-nowrap">
              {swiggySpend && !zomatoSpend && <ArrowLeft size={10} className="text-orange-500" />}
              {!swiggySpend && zomatoSpend && <ArrowRight size={10} className="text-red-500" />}
              {swiggySpend === zomatoSpend && <ArrowLeftRight size={10} className="text-muted-foreground" />}
              <span>{statusText}</span>
            </div>
          </div>
        </div>

        {/* Zomato Control */}
        <div className="flex flex-col items-end z-10">
          <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">Zomato</div>
          <div className="w-20 h-20 rounded-full bg-card border-4 border-red-500 flex items-center justify-center mb-3 shadow-md">
            <Coins size={30} className="text-red-500" />
          </div>
          <div className="flex gap-1.5 bg-background p-1 rounded-lg border">
            <button 
              onClick={() => setZomatoSpend(true)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${zomatoSpend ? 'bg-red-500 text-white' : 'hover:bg-muted'}`}
            >Spend</button>
            <button 
              onClick={() => setZomatoSpend(false)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${!zomatoSpend ? 'bg-red-500 text-white' : 'hover:bg-muted'}`}
            >Hold</button>
          </div>
        </div>

      </div>

      {/* Dynamic Graph & Controls Dashboard */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-card border rounded-2xl p-6 shadow-sm">
        
        {/* Left Side: Stats & Action */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Quarter {quarter}</span>
              <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Financial Breakdown Badges */}
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-orange-500 font-bold">Swiggy Net:</span>
                <span className="font-mono font-bold">₹{currentPoint.swiggyProfit > 0 ? `+${currentPoint.swiggyProfit}` : currentPoint.swiggyProfit} Cr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-500 font-bold">Zomato Net:</span>
                <span className="font-mono font-bold">₹{currentPoint.zomatoProfit > 0 ? `+${currentPoint.zomatoProfit}` : currentPoint.zomatoProfit} Cr</span>
              </div>
              <hr className="border-border/50" />
              <div className="flex justify-between text-base">
                <span className="font-bold">Combined Industry:</span>
                <span className={`font-mono font-bold ${currentPoint.netProfit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  ₹{currentPoint.netProfit > 0 ? `+${currentPoint.netProfit}` : currentPoint.netProfit} Cr
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSimulate}
            className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all text-center shadow-md"
          >
            Simulate Next Quarter →
          </button>
        </div>

        {/* Right Side: Live SVG Multi-Line Graph */}
        <div className="flex flex-col items-center justify-center bg-background/60 border border-border/50 rounded-xl p-4 relative">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground self-start mb-2 flex items-center gap-4">
            <span>Cumulative Financial Trajectory</span>
            <div className="flex items-center gap-2 text-[9px]">
              <span className="text-orange-500">● Swiggy</span>
              <span className="text-red-500">● Zomato</span>
              <span className="text-emerald-400">● Industry</span>
            </div>
          </div>

          <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-32 overflow-visible">
            {/* Zero Line */}
            <line x1="0" y1={graphHeight / 2} x2={graphWidth} y2={graphHeight / 2} stroke="currentColor" strokeDasharray="3 3" className="text-border" />

            {/* Swiggy Path (Orange) */}
            <polyline
              fill="none"
              stroke="#f97316"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={getSvgPoints('swiggyProfit')}
              className="transition-all duration-500"
            />

            {/* Zomato Path (Red) */}
            <polyline
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={getSvgPoints('zomatoProfit')}
              className="transition-all duration-500"
            />

            {/* Total Industry Path (Emerald) */}
            <polyline
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
              strokeDasharray="4 2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={getSvgPoints('netProfit')}
              className="transition-all duration-500"
            />
          </svg>
        </div>

      </div>

    </div>
  );
}
