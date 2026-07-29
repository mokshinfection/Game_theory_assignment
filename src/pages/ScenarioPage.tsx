import React, { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { SCENARIOS } from '@/data/scenarios';
import { WordmarkBadge } from '@/components/WordmarkBadge';
import { PayoffMatrix } from '@/components/PayoffMatrix';
import { WidgetDispatcher } from '@/components/WidgetDispatcher';

export default function ScenarioPage({ params }: { params: { id: string } }) {
  const scenario = SCENARIOS.find((s) => s.id === params.id);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!scenario) {
      setLocation('/');
    }
  }, [scenario, setLocation]);

  // Scroll window to top whenever scenario changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  if (!scenario) return null;

  return (
    <div className="min-h-screen bg-background text-foreground pt-16 pb-24 px-6 md:px-12 max-w-6xl mx-auto space-y-24">
      
      {/* SECTION 1: HOOK */}
      <section className="flex flex-col items-center text-center pt-8">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8">
          <WordmarkBadge 
            name={scenario.players[0]} 
            color={scenario.badgeColors[scenario.players[0]]?.bg || '#333'} 
            textColor={scenario.badgeColors[scenario.players[0]]?.text || '#fff'} 
            size="lg" 
          />
          <span className="font-serif italic text-2xl md:text-4xl text-muted-foreground">vs</span>
          <WordmarkBadge 
            name={scenario.players[1]} 
            color={scenario.badgeColors[scenario.players[1]]?.bg || '#333'} 
            textColor={scenario.badgeColors[scenario.players[1]]?.text || '#fff'} 
            size="lg" 
          />
        </div>
        
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl leading-tight mb-6">
          {scenario.hook}
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          {scenario.stakes}
        </p>
      </section>

      <hr className="border-border/40" />

      {/* SECTION 2: THE SETUP */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: scenario.accentColor }}>
            The Setup
          </h2>
          <h3 className="font-serif text-3xl md:text-4xl font-bold">{scenario.gameType}</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-4">
            {scenario.setupExplanation.map((p, i) => (
              <p key={i} className="text-base text-muted-foreground leading-relaxed">{p}</p>
            ))}
          </div>
          <div className="lg:col-span-2">
            <PayoffMatrix scenario={scenario} isVisible={true} />
          </div>
        </div>
      </section>

      <hr className="border-border/40" />

      {/* SECTION 3: PLAY IT */}
      <section className="space-y-8 flex flex-col items-center">
        <div className="text-center">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: scenario.accentColor }}>
            Play It
          </h2>
          <h3 className="font-serif text-3xl md:text-4xl font-bold">Make Your Move</h3>
        </div>

        <div className="w-full">
          <WidgetDispatcher scenario={scenario} />
        </div>
      </section>

      <hr className="border-border/40" />

      {/* SECTION 4: WHAT ACTUALLY HAPPENED */}
      <section className="max-w-3xl mx-auto w-full space-y-12">
        <div className="text-center">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: scenario.accentColor }}>
            History
          </h2>
          <h3 className="font-serif text-3xl md:text-4xl font-bold">What Actually Happened</h3>
        </div>
        
        <div className="relative border-l-2 border-muted ml-4 md:ml-8 pl-6 md:pl-8 space-y-10 py-2">
          {scenario.timeline.map((event, i) => (
            <div key={i} className="relative">
              <div 
                className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-4 border-background"
                style={{ 
                  backgroundColor: event.color === 'green' ? '#10b981' : event.color === 'red' ? '#f43f5e' : '#f59e0b'
                }} 
              />
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                <span className="font-mono text-xs font-bold shrink-0 text-muted-foreground w-28">{event.date}</span>
                <span className="text-lg font-serif">{event.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border/40" />

      {/* SECTION 5: THE TAKEAWAY */}
      <section className="text-center space-y-8 max-w-4xl mx-auto pt-4">
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: scenario.accentColor }}>
            The Takeaway
          </h2>
          <h3 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-6">
            {scenario.takeaway.title}
          </h3>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {scenario.takeaway.desc}
          </p>
        </div>

        <div className="pt-4">
          {scenario.nextId ? (
            <Link 
              href={`/scenario/${scenario.nextId}`} 
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-base transition-transform hover:scale-105 shadow-md" 
              style={{ backgroundColor: scenario.accentColor, color: '#fff' }}
            >
              Next Scenario <ArrowRight size={18} />
            </Link>
          ) : (
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-base transition-transform hover:scale-105 shadow-md"
            >
              Back to Library
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}
