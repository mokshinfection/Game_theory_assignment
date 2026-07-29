export type GameType = "Prisoner's Dilemma" | "Battle of the Sexes" | "Game of Chicken";

export interface Outcome {
  color: 'green' | 'red' | 'amber';
  value: string;
  desc: string;
}

export interface Scenario {
  id: string;
  name: string;
  players: string[];
  accentColor: string;
  badgeColors: Record<string, { bg: string; text: string }>;
  hook: string;
  stakes: string;
  gameType: GameType;
  payoffMatrix: {
    rowPlayer: string;
    colPlayer: string;
    rowStrategies: [string, string];
    colStrategies: [string, string];
    outcomes: [
      [Outcome, Outcome], // row 0, col 0 | row 0, col 1
      [Outcome, Outcome]  // row 1, col 0 | row 1, col 1
    ];
    nashIndex: [number, number];
  };
  setupExplanation: string[];
  timeline: { date: string; title: string; color: 'green' | 'red' | 'amber' }[];
  takeaway: {
    title: string;
    desc: string;
  };
  nextId: string | null;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'telecom',
    name: 'Telecom Price War',
    players: ['Reliance Jio', 'Airtel', 'Vodafone Idea'],
    accentColor: '#1a73e8',
    badgeColors: {
      'Reliance Jio': { bg: '#1a73e8', text: '#ffffff' },
      'Airtel': { bg: '#e8311a', text: '#ffffff' },
      'Vodafone Idea': { bg: '#e8001a', text: '#ffffff' }
    },
    hook: "One company entered with free calls. Three players had to decide whether to match or hold.",
    stakes: "A multi-billion dollar fight for the digital future of India.",
    gameType: "Prisoner's Dilemma",
    setupExplanation: [
      "In 2016, the Indian telecom market was highly profitable and controlled by a few incumbents holding prices steady.",
      "When Jio entered with unprecedented price cuts, incumbents faced a dilemma: match the cuts and destroy their own profit margins, or hold prices and lose their entire market share to Jio."
    ],
    payoffMatrix: {
      rowPlayer: 'Incumbent (Airtel+Vi)',
      colPlayer: 'Reliance Jio',
      rowStrategies: ['Hold Price', 'Cut Price'],
      colStrategies: ['Hold Price', 'Cut Price'],
      outcomes: [
        [
          { color: 'green', value: 'High / High', desc: 'Industry profits stable' },
          { color: 'red', value: 'Loss / Gain', desc: 'Jio gains massive share' }
        ],
        [
          { color: 'amber', value: 'Gain / Loss', desc: 'Incumbents retain edge' },
          { color: 'red', value: 'Low / Low', desc: 'Price war, profits collapse' }
        ]
      ],
      nashIndex: [1, 1] // Cut Price / Cut Price
    },
    timeline: [
      { date: 'Sep 2016', title: 'Jio launches with free voice + near-free data', color: 'red' },
      { date: 'Oct 2016', title: 'Airtel forced to slash tariffs', color: 'red' },
      { date: 'Dec 2016', title: 'Vodafone India matches cuts', color: 'red' },
      { date: '2017', title: 'Industry ARPU drops 50%', color: 'red' },
      { date: '2018', title: 'Vodafone-Idea merger announced to survive', color: 'amber' },
      { date: '2021', title: 'Industry slowly stabilizes at lower equilibrium', color: 'green' }
    ],
    takeaway: {
      title: "When one player defects, rational self-interest forces everyone to follow — even when it destroys the whole industry.",
      desc: "This is the classic Prisoner's Dilemma. Even though all companies would be better off holding prices high, the threat of losing everything forces them to cut prices, leading to a permanent reduction in industry profitability."
    },
    nextId: 'swiggy-zomato'
  },
  {
    id: 'swiggy-zomato',
    name: 'Marketing Escalation',
    players: ['Swiggy', 'Zomato'],
    accentColor: '#fc8019',
    badgeColors: {
      'Swiggy': { bg: '#fc8019', text: '#ffffff' },
      'Zomato': { bg: '#e23744', text: '#ffffff' }
    },
    hook: "Two competitors. Identical products. Infinite budgets. Neither can stop spending.",
    stakes: "The food delivery duopoly burns cash to stand absolutely still.",
    gameType: "Prisoner's Dilemma",
    setupExplanation: [
      "In a duopoly where products are nearly identical, marketing and discounts are the only weapons.",
      "If neither spends, both are highly profitable. But if one spends on aggressive customer acquisition while the other holds back, the spender takes the entire market. The result? Both are forced to spend billions just to maintain their existing market share."
    ],
    payoffMatrix: {
      rowPlayer: 'Swiggy',
      colPlayer: 'Zomato',
      rowStrategies: ['Spend', 'Hold'],
      colStrategies: ['Spend', 'Hold'],
      outcomes: [
        [
          { color: 'red', value: 'Burn / Burn', desc: 'Both drain cash, no share gained' },
          { color: 'amber', value: 'Win / Lose', desc: 'Swiggy gains massive share' }
        ],
        [
          { color: 'amber', value: 'Lose / Win', desc: 'Zomato gains massive share' },
          { color: 'green', value: 'Profit / Profit', desc: 'Both highly profitable' }
        ]
      ],
      nashIndex: [0, 0] // Spend / Spend
    },
    timeline: [
      { date: '2019', title: 'Zomato launches Gold subscription aggressively', color: 'amber' },
      { date: '2020', title: 'Swiggy launches One subscription to counter', color: 'amber' },
      { date: '2021', title: 'IPL bidding war — both buy ad inventory at premium', color: 'red' },
      { date: '2022', title: 'Zomato Q1 results: ₹1,200 Cr loss. Swiggy similar.', color: 'red' },
      { date: '2023', title: 'Both pledge path-to-profitability while spending', color: 'amber' },
      { date: '2024', title: 'Still fighting for the same ~45% market share each', color: 'red' }
    ],
    takeaway: {
      title: "Millions spent to stay exactly where they started.",
      desc: "Marketing wars are often negative-sum games. The optimal collective outcome is mutual restraint, but individual incentives make restraint impossible."
    },
    nextId: 'tata-leyland'
  },
  {
    id: 'tata-leyland',
    name: 'Green CapEx Dilemma',
    players: ['Tata Motors', 'Ashok Leyland'],
    accentColor: '#1877f2',
    badgeColors: {
      'Tata Motors': { bg: '#1877f2', text: '#ffffff' },
      'Ashok Leyland': { bg: '#e63910', text: '#ffffff' }
    },
    hook: "Invest billions now — or wait until regulators force your hand.",
    stakes: "The race to electrify commercial transport.",
    gameType: "Prisoner's Dilemma",
    setupExplanation: [
      "Transitioning to electric vehicles requires massive capital expenditure. If a company invests early, they take a huge short-term hit to profits.",
      "If they wait, they maximize short-term profits but risk being wiped out when regulators inevitably ban diesel. When one competitor leaps, the other must follow or die."
    ],
    payoffMatrix: {
      rowPlayer: 'Tata Motors',
      colPlayer: 'Ashok Leyland',
      rowStrategies: ['Invest in EVs', 'Stay Diesel'],
      colStrategies: ['Invest in EVs', 'Stay Diesel'],
      outcomes: [
        [
          { color: 'green', value: 'Growth / Growth', desc: 'Shared transition, market grows' },
          { color: 'amber', value: 'Lead / Lockout', desc: 'Tata gains regulatory advantage' }
        ],
        [
          { color: 'amber', value: 'Lockout / Lead', desc: 'Leyland gains regulatory advantage' },
          { color: 'red', value: 'Profit / Profit', desc: 'Short-term gain, then both hit wall' }
        ]
      ],
      nashIndex: [0, 0] // Invest / Invest
    },
    timeline: [
      { date: '2017', title: 'BS-IV norms enforced, industry scrambles', color: 'amber' },
      { date: '2020', title: 'BS-VI norms bring stricter emissions', color: 'amber' },
      { date: '2021', title: 'FAME II subsidies heavily favor EV adopters', color: 'green' },
      { date: '2022', title: 'Tata Motors launches comprehensive EV bus range', color: 'green' },
      { date: '2023', title: 'Ashok Leyland announces electric truck program', color: 'green' },
      { date: '2024', title: 'Gov targets 30% EV penetration in commercial by 2030', color: 'amber' }
    ],
    takeaway: {
      title: "The early cost is the price of staying in the game.",
      desc: "Capital expenditure on R&D looks like a loss in the short term, but it is the only way to avoid the catastrophic 'regulation wall' in the long term."
    },
    nextId: 'tesla-ccs'
  },
  {
    id: 'tesla-ccs',
    name: 'Charging Standards War',
    players: ['Tesla', 'CCS Coalition'],
    accentColor: '#cc0000',
    badgeColors: {
      'Tesla': { bg: '#cc0000', text: '#ffffff' },
      'CCS Coalition': { bg: '#666666', text: '#ffffff' },
      'Ford': { bg: '#003475', text: '#ffffff' },
      'GM': { bg: '#0170CE', text: '#ffffff' }
    },
    hook: "Two incompatible plugs. One market. Someone had to blink.",
    stakes: "Controlling the infrastructure of the electric vehicle revolution.",
    gameType: "Battle of the Sexes",
    setupExplanation: [
      "Tesla built out the superior NACS charging network early on. The rest of the industry backed the CCS standard.",
      "Having two incompatible standards hurts overall EV adoption. Both sides want to converge on a single standard (growing the total market), but each side strongly prefers their own standard."
    ],
    payoffMatrix: {
      rowPlayer: 'Tesla',
      colPlayer: 'Ford/GM (CCS)',
      rowStrategies: ['Maintain NACS', 'Adopt CCS'],
      colStrategies: ['Maintain CCS', 'Adopt NACS'],
      outcomes: [
        [
          { color: 'red', value: 'Low / Low', desc: 'Fragmented market, adoption stalls' },
          { color: 'green', value: 'Win / Accept', desc: 'Unified on NACS, market booms' }
        ],
        [
          { color: 'amber', value: 'Accept / Win', desc: 'Unified on CCS, market booms' },
          { color: 'red', value: 'Chaos / Chaos', desc: 'Pointless swap, zero coordination' }
        ]
      ],
      nashIndex: [0, 1] // Tesla maintains, Ford/GM adopt NACS (or vice versa, but this is the real one)
    },
    timeline: [
      { date: '2012', title: 'Tesla launches Supercharger network with NACS', color: 'amber' },
      { date: '2020', title: 'CCS becomes European standard', color: 'amber' },
      { date: '2022', title: 'Biden admin pushes for unified US standard', color: 'amber' },
      { date: 'May 2023', title: 'Ford announces NACS adoption for 2025 models', color: 'green' },
      { date: 'Jun 2023', title: 'GM follows Ford to NACS', color: 'green' },
      { date: '2024', title: 'Tesla opens network to non-Tesla vehicles', color: 'green' }
    ],
    takeaway: {
      title: "A shared standard grows the whole market — even for the side that gives up its own.",
      desc: "In coordination games like the Battle of the Sexes, converging on either standard is drastically better than remaining uncoordinated. Ford and GM gave up their preferred standard to unlock the network effect."
    },
    nextId: 'uaw-strikes'
  },
  {
    id: 'uaw-strikes',
    name: 'Brinkmanship',
    players: ['UAW (United Auto Workers)', 'Ford/GM/Stellantis'],
    accentColor: '#1a3a6e',
    badgeColors: {
      'UAW (United Auto Workers)': { bg: '#1a3a6e', text: '#ffffff' },
      'Ford/GM/Stellantis': { bg: '#003475', text: '#ffffff' }
    },
    hook: "Both sides drive toward each other. The first to swerve loses — but both pay if no one does.",
    stakes: "The largest simultaneous auto strike in American history.",
    gameType: "Game of Chicken",
    setupExplanation: [
      "In union negotiations, both sides use the threat of mutual destruction (a prolonged strike) to force concessions.",
      "If one side blinks, they lose at the bargaining table. If neither side blinks, the strike continues, costing billions in lost wages and production. The key is convincing the other side you will never swerve."
    ],
    payoffMatrix: {
      rowPlayer: 'UAW',
      colPlayer: 'Automakers',
      rowStrategies: ['Hold Firm (Strike)', 'Concede (Negotiate)'],
      colStrategies: ['Hold Firm (Lockout)', 'Concede (Negotiate)'],
      outcomes: [
        [
          { color: 'red', value: 'Crash / Crash', desc: 'Prolonged strike, billions lost' },
          { color: 'green', value: 'Win / Lose', desc: 'UAW wins massive wage gains' }
        ],
        [
          { color: 'amber', value: 'Lose / Win', desc: 'Automakers hold wages down' },
          { color: 'green', value: 'Stable / Stable', desc: 'Early compromise, production continues' }
        ]
      ],
      nashIndex: [0, 1] // Actually multiple, but UAW held firm, Automakers conceded
    },
    timeline: [
      { date: 'Jul 2023', title: 'UAW contract expires; demands 40% wage increase', color: 'amber' },
      { date: 'Sep 15, 2023', title: 'Historic simultaneous strike begins at all three', color: 'red' },
      { date: 'Sep 22, 2023', title: 'Strike expands to additional plants', color: 'red' },
      { date: 'Oct 11, 2023', title: 'Ford tentative deal — 25% raise over 4 years', color: 'green' },
      { date: 'Oct 25, 2023', title: 'GM tentative deal reached', color: 'green' },
      { date: 'Nov 2023', title: 'Ratification complete. ~$1.3B in lost production', color: 'amber' }
    ],
    takeaway: {
      title: "Whoever blinks first avoids the crash — but pays the risk premium either way.",
      desc: "By holding firm longer and absorbing the cost of a prolonged strike, the UAW credibly signaled they would not swerve, forcing the automakers to concede to avoid total economic destruction."
    },
    nextId: null
  }
];
