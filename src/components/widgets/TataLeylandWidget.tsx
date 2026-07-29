import React, { useState } from 'react';
import { Scenario } from '@/data/scenarios';
import { Settings, Battery, ShieldAlert, Info } from 'lucide-react';

export function TataLeylandWidget({ scenario }: { scenario: Scenario }) {
  const [tataGreen, setTataGreen] = useState(false);
  const [leylandGreen, setLeylandGreen] = useState(false);
  const [phase, setPhase] = useState<1 | 2>(1);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 flex flex-col items-start space-y-8">
      
      {/* How to Play Instruction Box */}
      <div className="w-full max-w-md p-4 rounded-xl bg-card border border-border flex items-start gap-3 text-sm text-muted-foreground text-left">
        <Info size={20} className="text-primary shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-foreground block mb-1">How to Play:</span>
          1. Select whether <strong>Tata Motors</strong> and <strong>Ashok Leyland</strong> choose to <strong>Stay Diesel</strong> or <strong>Go Green (EV)</strong> in Phase 1.<br />
          2. Toggle to <strong>Phase 2: 3 Years Later</strong> to see how government emission regulations impact production and revenue!
        </div>
      </div>

      {/* Phase Switcher Buttons */}
      <div className="flex justify-start gap-4">
        <button 
          onClick={() => setPhase(1)}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${phase === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
        >
          Phase 1: Present Day
        </button>
        <button 
          onClick={() => setPhase(2)}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${phase === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
        >
          Phase 2: 3 Years Later
        </button>
      </div>

      {/* Assembly Lines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden p-4 w-full">
        
        {/* Regulation Wall */}
        <div 
          className={`absolute inset-y-0 right-0 w-32 bg-amber-500/20 border-l-4 border-amber-500 flex items-center justify-center z-20 transition-transform duration-1000 ease-in-out ${phase === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          <div className="bg-amber-950 text-amber-500 text-xs font-bold px-2 py-6 text-center transform -rotate-90 whitespace-nowrap flex items-center gap-2">
            <ShieldAlert size={16} /> REGULATION WALL
          </div>
        </div>

        {/* Tata Line */}
        <div className="bg-card border rounded-xl p-6 relative text-left">
          <h4 className="font-bold text-lg mb-6" style={{ color: scenario.badgeColors['Tata Motors'].bg }}>Tata Motors</h4>
          
          <div className="flex bg-muted/50 p-1 rounded-lg mb-8 border w-fit">
            <button onClick={() => {if(phase===1) setTataGreen(false)}} className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${!tataGreen ? 'bg-zinc-800 text-white shadow-sm' : 'text-muted-foreground'} ${phase===2 && 'opacity-50 cursor-not-allowed'}`}>Stay Diesel</button>
            <button onClick={() => {if(phase===1) setTataGreen(true)}} className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${tataGreen ? 'bg-emerald-600 text-white shadow-sm' : 'text-muted-foreground'} ${phase===2 && 'opacity-50 cursor-not-allowed'}`}>Go Green (EV)</button>
          </div>

          <div className="relative h-24 bg-muted/30 border-y border-dashed overflow-hidden flex items-center">
            <div className={`absolute flex gap-8 whitespace-nowrap ${phase === 1 || tataGreen ? 'animate-[slide-in-right_3s_linear_infinite]' : ''}`} style={(!tataGreen && phase === 2) ? { transform: 'translateX(80px)' } : {}}>
              {[1,2,3,4].map(i => (
                <div key={i} className={`flex items-center gap-2 bg-background p-2 border rounded shadow-sm ${!tataGreen && phase===2 ? 'opacity-30' : ''}`}>
                  {!tataGreen ? <Settings size={20} className="text-zinc-500 animate-spin" /> : <Battery size={20} className="text-emerald-500" />}
                  <span className="font-mono text-xs font-bold">{!tataGreen ? 'Diesel' : 'EV'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-between font-mono text-sm">
            <div>
              <span className="text-muted-foreground">Revenue: </span>
              {phase === 1 ? (
                <span className={tataGreen ? 'text-amber-500' : 'text-emerald-500'}>{tataGreen ? 'Hit (CapEx)' : 'High'}</span>
              ) : (
                <span className={tataGreen ? 'text-emerald-500' : 'text-rose-500'}>{tataGreen ? 'Growing' : '↓ 40% (Locked)'}</span>
              )}
            </div>
          </div>
        </div>

        {/* Leyland Line */}
        <div className="bg-card border rounded-xl p-6 relative text-left">
          <h4 className="font-bold text-lg mb-6" style={{ color: scenario.badgeColors['Ashok Leyland'].bg }}>Ashok Leyland</h4>
          
          <div className="flex bg-muted/50 p-1 rounded-lg mb-8 border w-fit">
            <button onClick={() => {if(phase===1) setLeylandGreen(false)}} className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${!leylandGreen ? 'bg-zinc-800 text-white shadow-sm' : 'text-muted-foreground'} ${phase===2 && 'opacity-50 cursor-not-allowed'}`}>Stay Diesel</button>
            <button onClick={() => {if(phase===1) setLeylandGreen(true)}} className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${leylandGreen ? 'bg-emerald-600 text-white shadow-sm' : 'text-muted-foreground'} ${phase===2 && 'opacity-50 cursor-not-allowed'}`}>Go Green (EV)</button>
          </div>

          <div className="relative h-24 bg-muted/30 border-y border-dashed overflow-hidden flex items-center">
            <div className={`absolute flex gap-8 whitespace-nowrap ${phase === 1 || leylandGreen ? 'animate-[slide-in-right_3s_linear_infinite]' : ''}`} style={(!leylandGreen && phase === 2) ? { transform: 'translateX(80px)' } : {}}>
              {[1,2,3,4].map(i => (
                <div key={i} className={`flex items-center gap-2 bg-background p-2 border rounded shadow-sm ${!leylandGreen && phase===2 ? 'opacity-30' : ''}`}>
                  {!leylandGreen ? <Settings size={20} className="text-zinc-500 animate-spin" /> : <Battery size={20} className="text-emerald-500" />}
                  <span className="font-mono text-xs font-bold">{!leylandGreen ? 'Diesel' : 'EV'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-between font-mono text-sm">
            <div>
              <span className="text-muted-foreground">Revenue: </span>
              {phase === 1 ? (
                <span className={leylandGreen ? 'text-amber-500' : 'text-emerald-500'}>{leylandGreen ? 'Hit (CapEx)' : 'High'}</span>
              ) : (
                <span className={leylandGreen ? 'text-emerald-500' : 'text-rose-500'}>{leylandGreen ? 'Growing' : '↓ 40% (Locked)'}</span>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
