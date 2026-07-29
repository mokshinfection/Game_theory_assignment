import React, { useState, useEffect } from 'react';
import { Scenario } from '@/data/scenarios';
import { AlertOctagon, Info } from 'lucide-react';

export function UawStrikesWidget({ scenario }: { scenario: Scenario }) {
  const [playing, setPlaying] = useState(false);
  const [distance, setDistance] = useState(100);
  const [uawSwerve, setUawSwerve] = useState(false);
  const [autoSwerve, setAutoSwerve] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playing && distance > 0 && !uawSwerve && !autoSwerve) {
      interval = setInterval(() => {
        setDistance((prev) => {
          if (prev <= 1) {
            setCrashed(true);
            setPlaying(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [playing, distance, uawSwerve, autoSwerve]);

  const handleUawSwerve = () => {
    if (playing && !crashed) {
      setUawSwerve(true);
      setPlaying(false);
      setIsFinished(true); // Triggers Reset button immediately
    }
  };

  const handleAutoSwerve = () => {
    if (playing && !crashed) {
      setAutoSwerve(true);
      setPlaying(false);
      setIsFinished(true); // Triggers Reset button immediately
    }
  };

  const reset = () => {
    setPlaying(false);
    setDistance(100);
    setUawSwerve(false);
    setAutoSwerve(false);
    setCrashed(false);
    setIsFinished(false);
  };

  const playRealOutcome = () => {
    reset();
    setTimeout(() => {
      setPlaying(true);
      setTimeout(() => {
        setAutoSwerve(true);
        setPlaying(false);
        setIsFinished(true);
      }, 4000);
    }, 100);
  };

  const getStatusText = () => {
    if (crashed) return "CRASH: Strike dragged on. Both sides lost billions.";
    if (uawSwerve && autoSwerve) return "BOTH SWERVED: Early compromise, stable outcome.";
    if (uawSwerve) return "UAW BLINKED: Automakers hold wages down. Union loses.";
    if (autoSwerve) return "AUTOMAKERS BLINKED: UAW wins historic 25% raise.";
    if (playing) return "Driving towards the cliff...";
    return "Ready. Who will blink first?";
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 flex flex-col items-center space-y-8">
      
      {/* How to Play Instruction Box */}
      <div className="w-full max-w-md p-4 rounded-xl bg-card border border-border flex items-start gap-3 text-sm text-muted-foreground text-left self-start">
        <Info size={20} className="text-primary shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-foreground block mb-1">How to Play:</span>
          1. Click <strong>Start Collision Course</strong> to begin the Game of Chicken.<br />
          2. Click <strong>UAW: Swerve Now</strong> or <strong>Automakers: Swerve Now</strong> mid-drive to blink first, or watch them collide!
        </div>
      </div>

      {/* Control Buttons & Loss Tracker */}
      <div className="flex gap-4 w-full justify-between max-w-2xl items-center">
        <button 
          onClick={handleUawSwerve}
          disabled={!playing || uawSwerve || crashed}
          className="px-6 py-3 font-bold rounded-lg bg-blue-900 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors"
        >
          UAW: Swerve Now
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Lost Production</span>
          <span className="font-mono text-2xl font-bold text-rose-500">
            ${((100 - distance) * 0.013).toFixed(2)}B
          </span>
        </div>

        <button 
          onClick={handleAutoSwerve}
          disabled={!playing || autoSwerve || crashed}
          className="px-6 py-3 font-bold rounded-lg bg-zinc-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-600 transition-colors"
        >
          Automakers: Swerve Now
        </button>
      </div>

      {/* Collision Track Visualization */}
      <div className="w-full h-48 bg-zinc-900 rounded-xl relative overflow-hidden border border-zinc-800 shadow-inner">
        {/* Road markings */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full border-t-2 border-dashed border-zinc-600" />
        
        {/* Distance Indicator */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-mono text-zinc-500">
          Distance: {distance}
        </div>

        {/* UAW Truck */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-24 h-16 bg-[#1a3a6e] border-2 border-white/20 rounded shadow-lg flex items-center justify-center transition-all duration-100"
          style={{ 
            left: `${50 - (distance / 2)}%`, 
            transform: `translate(-100%, ${uawSwerve ? '-150%' : '-50%'}) rotate(${uawSwerve ? '-20deg' : '0deg'})` 
          }}
        >
          <span className="font-bold text-white text-xl">UAW</span>
        </div>

        {/* Automaker Truck */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-24 h-16 bg-[#003475] border-2 border-white/20 rounded shadow-lg flex items-center justify-center transition-all duration-100"
          style={{ 
            right: `${50 - (distance / 2)}%`, 
            transform: `translate(100%, ${autoSwerve ? '150%' : '-50%'}) rotate(${autoSwerve ? '-20deg' : '0deg'})` 
          }}
        >
          <span className="font-bold text-white text-xl text-center leading-tight">BIG 3</span>
        </div>
        
        {crashed && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500 animate-pulse">
            <AlertOctagon size={64} fill="currentColor" className="text-zinc-900" />
          </div>
        )}
      </div>

      {/* Outcome Banner & Primary Actions */}
      <div className="bg-card border p-6 rounded-xl w-full max-w-2xl text-center space-y-6">
        <p className="font-serif text-2xl font-bold text-foreground">{getStatusText()}</p>
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center gap-4 flex-wrap items-center">
            {!playing && !isFinished && (
              <>
                <button onClick={() => setPlaying(true)} className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors">
                  Start Collision Course
                </button>
                <div className="flex flex-col items-center">
                  <button onClick={playRealOutcome} className="px-6 py-2.5 border border-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/10 transition-colors">
                    Play Historical Outcome
                  </button>
                  <span className="text-[11px] text-muted-foreground mt-1.5 italic">
                    (This is what happened in real life)
                  </span>
                </div>
              </>
            )}

            {/* Appears after manual swerves, crashes, or automated runs */}
            {isFinished && (
              <button onClick={reset} className="px-6 py-2.5 bg-secondary text-secondary-foreground border font-bold rounded-lg hover:bg-secondary/80 transition-colors">
                Reset Simulation
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
