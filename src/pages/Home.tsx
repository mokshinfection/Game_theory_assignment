import React from 'react';
import { Link } from 'wouter';
import { SCENARIOS } from '@/data/scenarios';
import { WordmarkBadge } from '@/components/WordmarkBadge';

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground selection:bg-primary/20">
      
      {/* Embedded Shimmer Styles */}
      <style>{`
        .shimmer-text {
          background: linear-gradient(100deg, #6E6C68 30%, #FF8A00 50%, #6E6C68 70%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          to { background-position: -200% center; }
        }
      `}</style>

      {/* Hero */}
      <header className="pt-24 pb-16 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-border bg-card text-sm font-bold tracking-widest uppercase text-muted-foreground">
          An Interactive Explainer
        </div>
        
        {/* Animated Shimmer Heading */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="shimmer-text block">
            Game Theory:
          </span>
          <span className="shimmer-text italic block">
            Real World Rivalries
          </span>
        </h1>

        {/* Authors / Presented By */}
        <div className="mt-4 mb-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm md:text-base font-medium text-muted-foreground border-y border-border/50 py-3 max-w-3xl mx-auto">
          <span className="font-semibold text-foreground">Created by:</span>
          <span>Akshay Shibu <span className="opacity-75">(2424205)</span></span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span>Disha Dimri <span className="opacity-75">(2424217)</span></span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span>Mokshith S <span className="opacity-75">(2424238)</span></span>
        </div>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Five classic corporate showdowns that prove human behavior is painfully predictable. Explore the math behind the madness.
        </p>
      </header>

      {/* Grid */}
      <main className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCENARIOS.map((scenario) => (
            <Link 
              key={scenario.id} 
              href={`/scenario/${scenario.id}`}
              className="group relative flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:border-transparent"
            >
              {/* Animated Glow Border on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom right, ${scenario.accentColor}40, transparent)`,
                  border: `1px solid ${scenario.accentColor}`
                }}
              />
              
              <div className="p-8 flex flex-col flex-grow relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <WordmarkBadge name={scenario.players[0]} color={scenario.badgeColors[scenario.players[0]].bg} textColor={scenario.badgeColors[scenario.players[0]].text} size="sm" />
                  <span className="font-serif italic text-muted-foreground font-bold">vs</span>
                  <WordmarkBadge name={scenario.players[1]} color={scenario.badgeColors[scenario.players[1]].bg} textColor={scenario.badgeColors[scenario.players[1]].text} size="sm" />
                </div>
                
                <h3 className="font-serif text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {scenario.name}
                </h3>
                
                <p className="text-muted-foreground mb-8 flex-grow line-clamp-3">
                  {scenario.hook}
                </p>
                
                <div className="mt-auto">
                  <span 
                    className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded bg-background border"
                    style={{ color: scenario.accentColor, borderColor: `${scenario.accentColor}40` }}
                  >
                    {scenario.gameType}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      
    </div>
  );
}
