// Daily challenge questions — situational PM judgment, different from the assessment quiz.
// One question is picked per day by hashing the date to an index.

export const dailyChallenges = [
  {
    id: 'dc-1',
    question: 'Your top feature request has 500 upvotes from users, but your data shows only 2% of users would actually use it daily. What do you do?',
    options: [
      'Build it immediately — user demand is clear',
      'Dig deeper: interview the vocal users to understand the real job-to-be-done before committing',
      'Reject it — low DAU impact means low priority',
      'Run a company-wide poll to get more votes',
    ],
    answer: 1,
    explanation: 'Vocal users often represent a niche. Understanding the underlying need helps you find a solution that serves the broader user base, not just the loudest ones.',
  },
  {
    id: 'dc-2',
    question: 'Two engineers estimate a feature at 2 weeks. Design says 3 weeks. How do you handle the discrepancy?',
    options: [
      'Go with the lower estimate to keep stakeholders happy',
      'Escalate to leadership to make the call',
      'Facilitate a joint session to align on scope, then use the higher estimate with a buffer',
      'Split the difference at 2.5 weeks',
    ],
    answer: 2,
    explanation: 'Estimates diverge when teams have different scope assumptions. A joint session surfaces hidden work. Always plan with the higher estimate — surprises in delivery are worse than setting honest expectations.',
  },
  {
    id: 'dc-3',
    question: 'Your A/B test shows variant B increases sign-ups by 15% but reduces 30-day retention by 8%. Which do you ship?',
    options: [
      'Ship B — more sign-ups means more top-of-funnel growth',
      'Ship A — retention is more important than acquisition',
      'Neither yet — investigate why retention dropped before deciding',
      'Ship B and fix retention in a follow-up sprint',
    ],
    answer: 2,
    explanation: 'A retention drop signals you may be attracting the wrong users or creating false expectations. Understanding the cause is critical before shipping at scale.',
  },
  {
    id: 'dc-4',
    question: 'A senior stakeholder asks you to add a feature to the roadmap "immediately." It wasn\'t in the plan. What\'s your first move?',
    options: [
      'Add it — seniority means priority',
      'Refuse — the roadmap is locked',
      'Ask what problem it solves, who it\'s for, and what it would displace on the current roadmap',
      'Tell engineering to squeeze it in during the next sprint',
    ],
    answer: 2,
    explanation: 'Every insertion has a cost. Understanding the problem first lets you evaluate whether it\'s truly urgent, find a faster path, or surface the trade-off explicitly.',
  },
  {
    id: 'dc-5',
    question: 'Your NPS drops from +45 to +28 in one month. What do you do first?',
    options: [
      'Launch a customer satisfaction campaign',
      'Segment the NPS data by user cohort, feature usage, and timing to find the pattern',
      'Immediately roll back last month\'s releases',
      'Send a company-wide alert and convene a war room',
    ],
    answer: 1,
    explanation: 'A raw NPS drop tells you something changed — but not what or for whom. Segmentation is the fastest way to isolate the signal before taking action.',
  },
  {
    id: 'dc-6',
    question: 'Engineering tells you a feature will take 3 months. A competitor just shipped something similar. What do you do?',
    options: [
      'Tell engineering to cut scope to ship faster',
      'Assess whether the competitive threat is real for your users, then decide if a faster MVP or a different differentiator is the right response',
      'Cancel the feature and find something else to build',
      'Ship whatever is ready in 4 weeks regardless of quality',
    ],
    answer: 1,
    explanation: 'Reactive shipping often produces poor outcomes. The right question is whether the competitor\'s feature changes your users\' behaviour — not just whether they shipped.',
  },
  {
    id: 'dc-7',
    question: 'You have to choose between fixing a bug that affects 5% of users severely, or shipping a feature requested by 60% of users. What do you prioritize?',
    options: [
      'Always fix bugs first, no exceptions',
      'Always ship features — bugs are engineering\'s job',
      'Evaluate severity: if the bug causes data loss, churn, or breaks core flows, fix it first',
      'Let leadership decide',
    ],
    answer: 2,
    explanation: 'Not all bugs are equal. A severe bug affecting even a small segment can destroy trust and cause churn disproportionate to its size.',
  },
  {
    id: 'dc-8',
    question: 'Your roadmap has 12 items for Q3. Engineering capacity supports 4. How do you decide what to cut?',
    options: [
      'Cut whatever is hardest to build',
      'Keep only what stakeholders have asked for most loudly',
      'Score each item on strategic impact, user value, and effort, then align leadership on the trade-offs before finalising',
      'Ship the 4 easiest items to show velocity',
    ],
    answer: 2,
    explanation: 'Cutting without a framework creates political problems. A scored, visible trade-off discussion builds trust and keeps the team focused on what matters most.',
  },
  {
    id: 'dc-9',
    question: 'A power user emails you with a detailed feature request. It\'s clever but very niche. What\'s the right response?',
    options: [
      'Thank them and add it to the backlog directly',
      'Ignore it — power users are outliers',
      'Thank them, probe the underlying problem, check if other users share it, and be honest about where it sits in priority',
      'Forward it to the design team to prototype',
    ],
    answer: 2,
    explanation: 'Power users are valuable signals, not gospel. The right move is to understand the need and validate it against the broader user base before committing.',
  },
  {
    id: 'dc-10',
    question: 'Your team is debating two approaches to a feature. Engineers are split. How do you break the deadlock?',
    options: [
      'Pick the approach the most senior engineer prefers',
      'Let the team vote',
      'Define the decision criteria (speed, scalability, maintainability) aligned to product goals, then evaluate each option against those criteria',
      'Escalate to the CTO',
    ],
    answer: 2,
    explanation: 'Technical debates become unproductive without shared criteria. A PM\'s role is to bring the product context that makes the trade-offs clear.',
  },
  {
    id: 'dc-11',
    question: 'You\'re launching a feature in 2 weeks. QA finds 3 critical bugs and 10 minor ones. What do you ship?',
    options: [
      'Ship everything — minor bugs are fine',
      'Delay until all 13 bugs are fixed',
      'Fix the 3 critical bugs before launch; create tickets for minor bugs and ship with known issues documented',
      'Ship and fix bugs post-launch based on user reports',
    ],
    answer: 2,
    explanation: 'Critical bugs block core value. Minor bugs can be managed post-launch with proper tracking. The key is intentionality — ship with eyes open, not by ignoring issues.',
  },
  {
    id: 'dc-12',
    question: 'Your free-to-paid conversion rate drops 20% after a pricing page redesign. What\'s your first hypothesis?',
    options: [
      'The new design is ugly',
      'Users don\'t understand the value of the paid plan, or the redesign introduced friction or confusion in the conversion flow',
      'The pricing is too high',
      'There\'s a bug in the payment processor',
    ],
    answer: 1,
    explanation: 'Conversion drops after a redesign almost always trace back to clarity or friction. Investigate what changed in the user\'s decision journey before assuming pricing is the issue.',
  },
  {
    id: 'dc-13',
    question: 'Sales says "we keep losing deals because we don\'t have feature X." What do you do?',
    options: [
      'Build feature X immediately — revenue is king',
      'Talk directly to the lost prospects to validate the claim and understand if X is truly the blocker or a post-hoc rationalisation',
      'Ask sales to document every lost deal mentioning X, then review in 3 months',
      'Tell sales to position around existing features better',
    ],
    answer: 1,
    explanation: 'Sales feedback is valuable but filtered. Prospects say many things. Talking directly to them reveals whether X was a real dealbreaker or one of many factors.',
  },
  {
    id: 'dc-14',
    question: 'You\'re building a B2B product. Your buyer is the IT director, but your user is a frontline employee. Who do you design for?',
    options: [
      'The buyer — they control the contract',
      'The end user — they drive adoption',
      'Both: design for end-user delight to drive adoption, but ensure the buyer\'s concerns (security, compliance, ROI) are addressed in the product and pitch',
      'Neither — let UX research decide',
    ],
    answer: 2,
    explanation: 'In B2B, the buyer signs the contract but the user determines whether it renews. You need both: a product that users love and evidence that satisfies the buyer.',
  },
  {
    id: 'dc-15',
    question: 'Your team\'s velocity has dropped 30% over the last 3 sprints. As PM, what\'s your response?',
    options: [
      'Push the team harder to recover lost ground',
      'Reduce scope for upcoming sprints',
      'Have a candid conversation with the team to understand root causes — tech debt, unclear requirements, morale, or external blockers',
      'Report the issue to engineering leadership',
    ],
    answer: 2,
    explanation: 'Velocity drops have root causes. Pushing harder without understanding why often makes things worse. A PM who investigates and removes blockers is more valuable than one who adds pressure.',
  },
  {
    id: 'dc-16',
    question: 'You\'re asked to define the MVP for a new product. How do you decide what\'s "minimum"?',
    options: [
      'The fewest features engineering can build in 4 weeks',
      'Whatever the CEO thinks is essential',
      'The smallest set of features that delivers the core value proposition to a specific user segment and allows you to test your key assumptions',
      'A stripped-down version of the full product vision',
    ],
    answer: 2,
    explanation: 'MVP is about learning, not minimising effort. It must deliver real value to real users while testing the riskiest assumptions in your business model.',
  },
  {
    id: 'dc-17',
    question: 'A user segment has 10x higher LTV than your average user but represents only 5% of your base. How does this affect your roadmap?',
    options: [
      'Ignore them — 5% is not statistically significant',
      'Build exclusively for them',
      'Evaluate whether serving this segment better would grow it, and balance their needs with the majority without alienating either',
      'Spin them off into a separate enterprise product immediately',
    ],
    answer: 2,
    explanation: 'High-LTV segments often point toward product-market fit in a specific niche. Understanding what drives their value can unlock growth without necessarily sacrificing your broader market.',
  },
  {
    id: 'dc-18',
    question: 'How do you write a good user story?',
    options: [
      '"Add a search bar to the homepage"',
      '"As a [user type], I want to [do something] so that [I achieve a goal]" — capturing the who, what, and why',
      '"Build a search feature with autocomplete, filters, and fuzzy matching"',
      '"Users need better search"',
    ],
    answer: 1,
    explanation: 'A good user story captures the role, the action, and the motivation. This gives engineers enough context to make good decisions without prescribing the solution.',
  },
  {
    id: 'dc-19',
    question: 'Your product has strong retention in the 25–34 age group but near-zero retention in 35–50. What\'s the most useful next step?',
    options: [
      'Stop targeting the 35–50 segment in marketing',
      'Redesign the entire product for older users',
      'Interview users in both segments to understand what\'s different about their needs, context, and expectations',
      'Add an "accessibility mode" for older users',
    ],
    answer: 2,
    explanation: 'Retention differences between segments reveal unmet needs or poor fit. Interviews surface the "why" that data alone can\'t provide.',
  },
  {
    id: 'dc-20',
    question: 'You have three features ready to prioritise. Feature A has high impact and high effort. Feature B has medium impact and low effort. Feature C has low impact and low effort. Which do you pick first?',
    options: [
      'Feature A — highest impact',
      'Feature C — easiest to ship',
      'Feature B — best effort-to-impact ratio, gets value out the door quickly',
      'All three in parallel',
    ],
    answer: 2,
    explanation: 'Quick wins with meaningful impact build momentum and free up capacity. Feature A may still be the right long-term bet, but B is the smarter first move.',
  },
  {
    id: 'dc-21',
    question: 'A/B test results are inconclusive after 2 weeks with 50,000 users. What do you do?',
    options: [
      'Ship the variant — inconclusive means it\'s not worse',
      'Check statistical significance, review if the sample is large enough, and consider whether the metric being measured is the right one',
      'Extend the test indefinitely until a winner emerges',
      'Pick the variant that looks better visually',
    ],
    answer: 1,
    explanation: 'Inconclusive results often mean the test is underpowered, measuring the wrong thing, or the variants aren\'t meaningfully different. Understanding why is more valuable than forcing a winner.',
  },
  {
    id: 'dc-22',
    question: 'You\'re launching in a new market. What\'s the single most important thing to validate first?',
    options: [
      'Whether you can localise the UI',
      'Whether the core problem exists and is painful enough that users in this market will pay for a solution',
      'Whether there are competitors in the market',
      'Whether your payment provider supports the local currency',
    ],
    answer: 1,
    explanation: 'Localisation, competition, and payments are all solvable once you know the problem is real. Demand validation is the riskiest assumption and must come first.',
  },
  {
    id: 'dc-23',
    question: 'Your head of design and head of engineering disagree on a UX approach. How do you resolve it?',
    options: [
      'Side with design — UX is their domain',
      'Side with engineering — feasibility constraints are real',
      'Reframe the debate around user outcomes: test both approaches with users or define success metrics that both teams agree on',
      'Escalate to the CPO',
    ],
    answer: 2,
    explanation: 'Cross-functional conflict usually means both sides are optimising for different things. Anchoring on the user outcome creates common ground and turns the debate into a hypothesis to test.',
  },
  {
    id: 'dc-24',
    question: 'Your DAU has been flat for 3 months despite growing MAU. What does this tell you?',
    options: [
      'Growth is healthy — more monthly users is always good',
      'Users are signing up but not forming a daily habit — the product may lack a core loop compelling enough for frequent use',
      'Your marketing is working but your product is broken',
      'DAU is the wrong metric for your product',
    ],
    answer: 1,
    explanation: 'Growing MAU with flat DAU signals acquisition without activation or habit formation. Your DAU/MAU ratio is a key engagement health metric.',
  },
  {
    id: 'dc-25',
    question: 'A user reports a bug. On investigation, you realise fixing it requires refactoring a core module — 3 weeks of work. The bug affects 1% of users. What do you do?',
    options: [
      'Fix it immediately — bugs must always be fixed',
      'Close the ticket — 1% is too small to matter',
      'Assess severity and workarounds: can you ship a targeted fix or workaround for affected users while planning the refactor properly?',
      'Tell the user it\'s a known limitation',
    ],
    answer: 2,
    explanation: 'Not every bug requires a full fix immediately. A targeted patch or workaround can unblock affected users while you schedule the real fix without disrupting the roadmap.',
  },
  {
    id: 'dc-26',
    question: 'How do you measure the success of an onboarding flow redesign?',
    options: [
      'Number of design compliments from users',
      'Reduction in support tickets',
      'Improvement in activation rate (users reaching the core value moment) and Day 7 retention compared to the previous flow',
      'Time saved in the onboarding steps',
    ],
    answer: 2,
    explanation: 'Onboarding success is about whether users get to value faster and stick around longer — not aesthetic improvements or operational metrics.',
  },
  {
    id: 'dc-27',
    question: 'Your product is growing fast, but customer support tickets are growing faster. What\'s the product response?',
    options: [
      'Hire more support staff',
      'Identify the top ticket categories and treat them as product bugs: reduce friction, improve error messages, add self-serve help, or fix the root cause in the product',
      'Add an FAQ page',
      'Build a chatbot to handle tickets',
    ],
    answer: 1,
    explanation: 'Support tickets are a product signal. Every category of ticket is a product failure waiting to be fixed. A good PM treats support volume as a backlog input.',
  },
  {
    id: 'dc-28',
    question: 'You are building a feature that 3 different teams have requested for different reasons. How do you proceed?',
    options: [
      'Build the version that satisfies the most teams',
      'Pick the team with the highest business priority and build for them',
      'Map the different use cases, find shared patterns, design for the common core, and communicate clearly what each team will and won\'t get',
      'Build three separate versions of the feature',
    ],
    answer: 2,
    explanation: 'Shared features with divergent use cases are a design challenge, not just a prioritisation one. Finding the common core avoids building duplicates while setting honest expectations.',
  },
  {
    id: 'dc-29',
    question: 'A key metric is trending down for 2 weeks. Your manager asks what\'s happening. You don\'t know yet. What do you say?',
    options: [
      'Make up a plausible explanation to seem in control',
      'Say nothing until you have a definitive answer',
      'Be transparent: share what you know, what you don\'t, what you\'re investigating, and when you\'ll have more clarity',
      'Blame an external factor like seasonality',
    ],
    answer: 2,
    explanation: 'Credibility is built on transparency, not certainty. Sharing your investigation status is more valuable than a confident wrong answer.',
  },
  {
    id: 'dc-30',
    question: 'You\'re asked to write a product requirements document (PRD). What\'s the most important section?',
    options: [
      'The detailed feature specification',
      'The problem statement and success metrics — everything else flows from a clear articulation of what you\'re solving and how you\'ll know it worked',
      'The engineering constraints',
      'The design mockups',
    ],
    answer: 1,
    explanation: 'A PRD without a sharp problem statement and measurable success criteria is just a list of features. The "why" and "how we\'ll know" are what make a PRD a strategic document, not a task list.',
  },
];

// Pick today's question deterministically based on the date
export function getTodaysChallenge() {
  const today = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash * 31 + today.charCodeAt(i)) % dailyChallenges.length;
  }
  return dailyChallenges[hash];
}
