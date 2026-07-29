import React from 'react';
import { TelecomWidget } from './widgets/TelecomWidget';
import { SwiggyZomatoWidget } from './widgets/SwiggyZomatoWidget';
import { TataLeylandWidget } from './widgets/TataLeylandWidget';
import { TeslaCcsWidget } from './widgets/TeslaCcsWidget';
import { UawStrikesWidget } from './widgets/UawStrikesWidget';
import { Scenario } from '@/data/scenarios';

export function WidgetDispatcher({ scenario }: { scenario: Scenario }) {
  switch (scenario.id) {
    case 'telecom':
      return <TelecomWidget scenario={scenario} />;
    case 'swiggy-zomato':
      return <SwiggyZomatoWidget scenario={scenario} />;
    case 'tata-leyland':
      return <TataLeylandWidget scenario={scenario} />;
    case 'tesla-ccs':
      return <TeslaCcsWidget scenario={scenario} />;
    case 'uaw-strikes':
      return <UawStrikesWidget scenario={scenario} />;
    default:
      return <div>Interactive widget not found.</div>;
  }
}
