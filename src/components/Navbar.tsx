import React from 'react';
import { Link, useLocation } from 'wouter';
import { SCENARIOS } from '@/data/scenarios';
import { Home } from 'lucide-react';

export function Navbar() {
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent pointer-events-none">
      {/* Top Gradient Border Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-amber-500 to-rose-500 opacity-80" />
      
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-start gap-4 pointer-events-auto">
        {/* Home Link */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-serif font-bold text-sm text-foreground/90 hover:text-primary transition-colors shrink-0 bg-background/90 px-2.5 py-1 rounded-md border border-border/50 shadow-xs"
        >
          <Home size={15} />
          <span className="hidden sm:inline">Game Theory</span>
        </Link>

        {/* Separator Line */}
        <div className="h-3 w-[1px] bg-border/40 shrink-0" />

        {/* Left-Aligned Numbered Navigation (1, 2, 3, 4, 5) */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {SCENARIOS.map((scenario, index) => {
            const isActive = location === `/scenario/${scenario.id}`;
            const scenarioNumber = index + 1;

            return (
              <Link
                key={scenario.id}
                href={`/scenario/${scenario.id}`}
                title={scenario.name}
                className={`w-7 h-7 rounded-md text-xs font-bold transition-all flex items-center justify-center shrink-0 border ${
                  isActive 
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs scale-105' 
                    : 'bg-background/90 text-muted-foreground border-border/50 hover:text-foreground hover:bg-background'
                }`}
              >
                {scenarioNumber}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
