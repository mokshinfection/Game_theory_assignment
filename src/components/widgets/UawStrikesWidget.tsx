import React, { useState, useEffect } from 'react';
import { Scenario } from '@/data/scenarios';
import { AlertOctagon, Info } from 'lucide-react';

// Reusable Top-Down Car SVG Component
const TopDownCar = ({ color, label, isReversed }) => (
  <div className="relative w-32 h-16 flex items-center justify-center">
    <svg
      viewBox="0 0 120 60"
      className="absolute inset-0 w-full h-full drop-shadow-xl"
      style={{ transform: isReversed ? 'scaleX(-1)' : 'none' }}
    >
      {/* Wheels */}
      <rect x="15" y="2" width="22" height="8" rx="3" fill="#000" />
      <rect x="85" y="2" width="22" height="8" rx="3" fill="#000" />
      <rect x="15" y="50" width="22" height="8" rx="3" fill="#000" />
      <rect x="85" y="50" width="22" height="8" rx="3" fill="#000" />

      {/* Main Body */}
      <rect x="10" y="8" width="100" height="44" rx="12" fill={color} />
      
      {/* Windshield / Windows block */}
      <rect x="35" y="12" width="40" height="36" rx="8" fill="#1e293b" />
      
      {/* Roof */}
      <rect x="42" y="15" width="26" height="30" rx="4" fill={color} opacity="0.9" />

      {/* Headlights */}
      <rect x="105" y="12" width="6" height="12" rx="3" fill="#fef08a" className="animate-pulse" />
      <rect x="105" y="36" width="6" height="12" rx="3" fill="#fef08a" className="animate-pulse" />

      {/* Tail lights */}
      <rect x="8" y="12" width="4" height="10" rx="2" fill="#ef4444" />
      <rect x="8" y="38" width="4" height="10" rx="2" fill="#ef4444" />
      
      {/* Hood details */}
      <path d="M 80 14 L 105 14" stroke="#ffffff20" strokeWidth="2" strokeLinecap="round" />
      <path d="M 80 46 L 105 46" stroke="#ffffff20" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <span className="relative z-10 font-bold text-white text-lg tracking-widest drop-shadow-md">
      {label}
    </span>
  </div>
);

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
      setIsFinished(true);
    }
  };

  const handleAutoSwerve = () => {
    if (playing && !crashed) {
      setAutoSwerve(true);
      setPlaying(false);
      setIsFinished(true);
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
        <div className="absolute top-1/2 -translate-y-1/2 w-full border-t-4 border-dashed border-zinc-600" />
        
        {/* Distance Indicator */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-mono text-zinc-500">
          Distance: {distance}
        </div>

        {/* UAW Car */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
          style={{ 
            left: `${50 - (distance / 2)}%`, 
            transform: `translate(-100%, ${uawSwerve ? '-150%' : '-50%'}) rotate(${uawSwerve ? '-20deg' : '0deg'})` 
          }}
        >
          <TopDownCar color="#1a3a6e" label="UAW" isReversed={false} />
        </div>

        {/* Automaker Car */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
          style={{ 
            right: `${50 - (distance / 2)}%`, 
            transform: `translate(100%, ${autoSwerve ? '150%' : '-50%'}) rotate(${autoSwerve ? '-20deg' : '0deg'})` 
          }}
        >
          <TopDownCar color="#4f46e5" label="BIG 3" isReversed={true} />
        </div>
        
        {crashed && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500 animate-pulse">
            <AlertOctagon size={80} fill="currentColor" className="text-zinc-900" />
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
