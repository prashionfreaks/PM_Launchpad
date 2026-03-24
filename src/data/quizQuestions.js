export const pmRoles = [
  { id: 'product_manager', label: 'Product Manager (Generalist)', icon: '📦' },
  { id: 'technical_pm', label: 'Technical Product Manager', icon: '⚙️' },
  { id: 'data_pm', label: 'Data Product Manager', icon: '📊' },
  { id: 'growth_pm', label: 'Growth Product Manager', icon: '🚀' },
  { id: 'design_pm', label: 'Design / UX Product Manager', icon: '🎨' },
  { id: 'ai_pm', label: 'AI/ML Product Manager', icon: '🤖' },
  { id: 'platform_pm', label: 'Platform Product Manager', icon: '🏗️' },
  { id: 'b2b_pm', label: 'B2B / Enterprise Product Manager', icon: '🏢' },
];

export const categories = [
  { id: 'business', label: 'Business Acumen', color: '#6366f1' },
  { id: 'technical', label: 'Technical Skills', color: '#06b6d4' },
  { id: 'design', label: 'Design Thinking', color: '#f43f5e' },
  { id: 'stakeholder', label: 'Stakeholder Management', color: '#f59e0b' },
  { id: 'agile', label: 'Agile & Execution', color: '#10b981' },
  { id: 'analytics', label: 'Analytics & Metrics', color: '#8b5cf6' },
  { id: 'strategy', label: 'Product Strategy', color: '#ec4899' },
  { id: 'communication', label: 'Communication', color: '#14b8a6' },
];

export const quizQuestions = [
  // Business Acumen
  {
    id: 1,
    category: 'business',
    question: 'A competitor launches a feature that overlaps with your product roadmap. What do you do first?',
    options: [
      { text: 'Immediately prioritize building a similar feature', score: 1 },
      { text: 'Analyze the competitor\'s feature impact on your users and market position', score: 4 },
      { text: 'Ignore it and continue with the current roadmap', score: 2 },
      { text: 'Call an emergency meeting with stakeholders to discuss', score: 3 },
    ],
  },
  {
    id: 2,
    category: 'business',
    question: 'How would you evaluate the market potential of a new product idea?',
    options: [
      { text: 'Rely on gut feeling and industry trends', score: 1 },
      { text: 'Conduct TAM/SAM/SOM analysis with customer interviews and competitive research', score: 4 },
      { text: 'Look at what competitors are doing and follow suit', score: 2 },
      { text: 'Build an MVP first, then see what happens', score: 3 },
    ],
  },
  {
    id: 3,
    category: 'business',
    question: 'Your CEO asks you to justify the ROI of a feature. How do you approach this?',
    options: [
      { text: 'Estimate development cost vs. projected revenue impact with data', score: 4 },
      { text: 'Present user feedback as the main justification', score: 2 },
      { text: 'Agree it\'s important and promise to track metrics post-launch', score: 1 },
      { text: 'Benchmark against competitor features that drove their growth', score: 3 },
    ],
  },
  // Technical Skills
  {
    id: 4,
    category: 'technical',
    question: 'An engineer says a feature will take 3 sprints. How do you respond?',
    options: [
      { text: 'Accept their estimate without question', score: 2 },
      { text: 'Ask them to break it down and explore if an MVP version can ship sooner', score: 4 },
      { text: 'Push them to do it in 1 sprint to hit deadlines', score: 1 },
      { text: 'Suggest cutting scope arbitrarily to make it fit', score: 1 },
    ],
  },
  {
    id: 5,
    category: 'technical',
    question: 'What does an API do in the context of product development?',
    options: [
      { text: 'It\'s a programming language for mobile apps', score: 1 },
      { text: 'It enables different software systems to communicate and share data', score: 4 },
      { text: 'It\'s a testing framework for quality assurance', score: 1 },
      { text: 'It\'s a design tool for creating interfaces', score: 1 },
    ],
  },
  {
    id: 6,
    category: 'technical',
    question: 'Your team wants to migrate from a monolith to microservices. What\'s your role as PM?',
    options: [
      { text: 'Let engineering decide entirely, it\'s a technical decision', score: 2 },
      { text: 'Understand the business impact, help prioritize which services to migrate first, and communicate timeline to stakeholders', score: 4 },
      { text: 'Oppose it because it will slow down feature delivery', score: 1 },
      { text: 'Approve it immediately to keep engineering happy', score: 1 },
    ],
  },
  // Design Thinking
  {
    id: 7,
    category: 'design',
    question: 'Users are dropping off during onboarding. What\'s your first step?',
    options: [
      { text: 'Redesign the entire onboarding flow immediately', score: 1 },
      { text: 'Analyze funnel data, conduct user interviews, and identify specific drop-off points', score: 4 },
      { text: 'Add more tooltips and help text', score: 2 },
      { text: 'Skip onboarding entirely and let users figure it out', score: 1 },
    ],
  },
  {
    id: 8,
    category: 'design',
    question: 'What is the primary purpose of creating user personas?',
    options: [
      { text: 'To make presentations look professional', score: 1 },
      { text: 'To represent different user segments and guide product decisions based on their needs', score: 4 },
      { text: 'To satisfy stakeholder requirements for documentation', score: 1 },
      { text: 'To define the engineering team structure', score: 1 },
    ],
  },
  {
    id: 9,
    category: 'design',
    question: 'A designer presents a beautiful UI but usability testing shows users are confused. What do you do?',
    options: [
      { text: 'Ship it anyway because it looks great', score: 1 },
      { text: 'Work with the designer to iterate based on usability findings while maintaining visual quality', score: 4 },
      { text: 'Scrap the design entirely and start over', score: 2 },
      { text: 'Add an instruction manual for users', score: 1 },
    ],
  },
  // Stakeholder Management
  {
    id: 10,
    category: 'stakeholder',
    question: 'Two executives want conflicting features prioritized. How do you handle this?',
    options: [
      { text: 'Do whatever the higher-ranking executive wants', score: 1 },
      { text: 'Facilitate a data-driven discussion showing impact of each, align on shared goals', score: 4 },
      { text: 'Try to build both simultaneously', score: 2 },
      { text: 'Escalate to the CEO to decide', score: 2 },
    ],
  },
  {
    id: 11,
    category: 'stakeholder',
    question: 'An important stakeholder keeps adding scope mid-sprint. How do you manage this?',
    options: [
      { text: 'Accept all changes to keep them happy', score: 1 },
      { text: 'Document the impact on timeline, present trade-offs, and agree on a process for change requests', score: 4 },
      { text: 'Ignore their requests until the sprint is over', score: 1 },
      { text: 'Tell engineering to just work overtime', score: 1 },
    ],
  },
  {
    id: 12,
    category: 'stakeholder',
    question: 'How do you communicate a product delay to stakeholders?',
    options: [
      { text: 'Wait until someone asks about the timeline', score: 1 },
      { text: 'Proactively share the delay, root cause, revised timeline, and mitigation plan', score: 4 },
      { text: 'Blame the engineering team for underestimating', score: 1 },
      { text: 'Quietly reduce scope to hit the original date', score: 2 },
    ],
  },
  // Agile & Execution
  {
    id: 13,
    category: 'agile',
    question: 'What is the main purpose of a sprint retrospective?',
    options: [
      { text: 'To assign blame for what went wrong', score: 1 },
      { text: 'To reflect on the process and identify improvements for the next sprint', score: 4 },
      { text: 'To plan the next sprint\'s backlog', score: 2 },
      { text: 'To demo completed work to stakeholders', score: 1 },
    ],
  },
  {
    id: 14,
    category: 'agile',
    question: 'Your sprint velocity has dropped 30% over 3 sprints. What do you investigate?',
    options: [
      { text: 'Nothing, velocity fluctuates naturally', score: 1 },
      { text: 'Check for increased tech debt, team changes, unclear requirements, or external blockers', score: 4 },
      { text: 'Push the team to work harder', score: 1 },
      { text: 'Add more developers to the team', score: 2 },
    ],
  },
  {
    id: 15,
    category: 'agile',
    question: 'How do you prioritize features in a product backlog?',
    options: [
      { text: 'First come, first served', score: 1 },
      { text: 'Use frameworks like RICE, MoSCoW, or value vs. effort while considering strategic alignment', score: 4 },
      { text: 'Whatever the loudest stakeholder wants', score: 1 },
      { text: 'Only work on features with clear revenue impact', score: 2 },
    ],
  },
  // Analytics & Metrics
  {
    id: 16,
    category: 'analytics',
    question: 'What is a North Star metric?',
    options: [
      { text: 'The company\'s stock price', score: 1 },
      { text: 'A single metric that best captures the core value your product delivers to customers', score: 4 },
      { text: 'Monthly revenue', score: 2 },
      { text: 'The number of features shipped per quarter', score: 1 },
    ],
  },
  {
    id: 17,
    category: 'analytics',
    question: 'Your feature launched and DAU increased 20% but retention dropped 10%. How do you interpret this?',
    options: [
      { text: 'It\'s a success because DAU went up', score: 1 },
      { text: 'Investigate if the feature attracts low-intent users or degrades the experience for existing users', score: 4 },
      { text: 'It\'s a failure because retention dropped', score: 2 },
      { text: 'Wait a month and check again', score: 2 },
    ],
  },
  {
    id: 18,
    category: 'analytics',
    question: 'How would you set up an A/B test for a new checkout flow?',
    options: [
      { text: 'Show the new flow to all users and compare with historical data', score: 1 },
      { text: 'Define hypothesis, success metrics, sample size, run control/variant simultaneously, and analyze statistical significance', score: 4 },
      { text: 'Let the design team decide which version looks better', score: 1 },
      { text: 'Run it for one day and see which performs better', score: 2 },
    ],
  },
  // Product Strategy
  {
    id: 19,
    category: 'strategy',
    question: 'How do you decide between building a feature in-house vs. using a third-party solution?',
    options: [
      { text: 'Always build in-house for full control', score: 1 },
      { text: 'Evaluate based on core competency, cost, time-to-market, strategic value, and long-term maintenance', score: 4 },
      { text: 'Always use third-party to save time', score: 1 },
      { text: 'Let engineering decide based on their preference', score: 2 },
    ],
  },
  {
    id: 20,
    category: 'strategy',
    question: 'Your product is growing but facing increasing churn. What strategic approach do you take?',
    options: [
      { text: 'Focus entirely on acquiring new users to offset churn', score: 1 },
      { text: 'Analyze churn cohorts, identify patterns, and invest in retention-focused improvements while maintaining growth', score: 4 },
      { text: 'Lower the price to keep users', score: 2 },
      { text: 'Add more features to increase stickiness', score: 2 },
    ],
  },
  {
    id: 21,
    category: 'strategy',
    question: 'What frameworks do you use to define product vision?',
    options: [
      { text: 'I don\'t use frameworks, I rely on intuition', score: 1 },
      { text: 'Combine market analysis, user research, company mission, and frameworks like Jobs-to-be-Done or Vision/Strategy/Roadmap', score: 4 },
      { text: 'Copy the market leader\'s vision', score: 1 },
      { text: 'Focus only on what sales team requests', score: 1 },
    ],
  },
  // Communication
  {
    id: 22,
    category: 'communication',
    question: 'How do you write an effective PRD (Product Requirements Document)?',
    options: [
      { text: 'List every detail of the solution upfront', score: 2 },
      { text: 'Define the problem, user stories, success metrics, scope, and leave room for engineering to propose solutions', score: 4 },
      { text: 'Write a one-line description and let the team figure it out', score: 1 },
      { text: 'Copy a template and fill in the blanks', score: 2 },
    ],
  },
  {
    id: 23,
    category: 'communication',
    question: 'You need to present a product strategy to the board. How do you prepare?',
    options: [
      { text: 'Create a detailed 50-slide deck covering every aspect', score: 1 },
      { text: 'Craft a concise narrative with data-backed insights, clear asks, and anticipated questions', score: 4 },
      { text: 'Wing it since you know the product well', score: 1 },
      { text: 'Send a written document instead of presenting', score: 2 },
    ],
  },
  {
    id: 24,
    category: 'communication',
    question: 'An engineer disagrees with your product decision. How do you handle it?',
    options: [
      { text: 'Pull rank as the PM and move forward', score: 1 },
      { text: 'Listen to their perspective, share your reasoning with data, and find common ground', score: 4 },
      { text: 'Avoid the confrontation and change your decision', score: 1 },
      { text: 'Escalate to their manager', score: 1 },
    ],
  },
];

// Role-specific questions that get added based on user's target PM role
export const roleSpecificQuestions = {
  technical_pm: [
    {
      id: 'r-tpm-tech-1', category: 'technical',
      question: 'A new feature requires storing millions of user events per day. Which storage approach do you recommend and why?',
      options: [
        { text: 'Use the same relational DB already in place — no need to change', score: 1 },
        { text: 'Evaluate event-optimized stores (e.g. Kafka + data lake or time-series DB), balancing query patterns, write throughput, cost, and team expertise', score: 4 },
        { text: 'Store everything in a single JSON column for flexibility', score: 1 },
        { text: 'Delegate entirely to the data team — it\'s their problem', score: 2 },
      ],
    },
    {
      id: 'r-tpm-tech-2', category: 'technical',
      question: 'Engineering wants to introduce a feature flag system. What product benefits do you articulate to justify the investment?',
      options: [
        { text: 'Feature flags are just an engineering tool — no PM benefit', score: 1 },
        { text: 'Enable safe rollouts, targeted experiments, kill switches for incidents, and faster iteration without full redeployments', score: 4 },
        { text: 'They\'re useful but only for A/B testing', score: 2 },
        { text: 'Approve it without understanding the use case', score: 1 },
      ],
    },
    {
      id: 'r-tpm-tech-3', category: 'technical',
      question: 'You\'re building a payments feature. What security and compliance considerations do you include in the PRD?',
      options: [
        { text: 'Security is handled by the security team — not in scope for the PRD', score: 1 },
        { text: 'Include PCI-DSS requirements, encryption standards, fraud detection, audit logging, tokenization, and data residency constraints as acceptance criteria', score: 4 },
        { text: 'Add a note to "make it secure" and let engineering interpret it', score: 2 },
        { text: 'Focus on the happy path — security can be added in v2', score: 1 },
      ],
    },
    {
      id: 'r-tpm-1', category: 'technical',
      question: 'Your engineering team proposes using GraphQL instead of REST for a new service. How do you evaluate this?',
      options: [
        { text: 'Let engineering decide — it\'s purely a technical call', score: 2 },
        { text: 'Evaluate trade-offs: query flexibility, caching complexity, client needs, team familiarity, and migration cost', score: 4 },
        { text: 'Default to REST since it\'s more common', score: 1 },
        { text: 'Adopt GraphQL because it\'s the latest trend', score: 1 },
      ],
    },
    {
      id: 'r-tpm-2', category: 'technical',
      question: 'A critical production incident brings down your service. As TPM, what\'s your immediate role?',
      options: [
        { text: 'Wait for engineers to fix it and then ask for a report', score: 1 },
        { text: 'Coordinate incident response: communicate status to stakeholders, help prioritize debugging, and drive the post-mortem', score: 4 },
        { text: 'Start debugging the code yourself', score: 1 },
        { text: 'Escalate to the CTO immediately', score: 2 },
      ],
    },
    {
      id: 'r-tpm-3', category: 'technical',
      question: 'How do you decide between building on AWS Lambda (serverless) vs. a traditional containerized service?',
      options: [
        { text: 'Always go serverless to reduce costs', score: 1 },
        { text: 'Evaluate based on traffic patterns, cold start tolerance, execution time limits, team expertise, and vendor lock-in', score: 4 },
        { text: 'Use containers because the team knows them', score: 2 },
        { text: 'Let the architect decide without PM input', score: 1 },
      ],
    },
  ],
  data_pm: [
    {
      id: 'r-dpm-tech-1', category: 'analytics',
      question: 'A stakeholder asks for a dashboard metric but the underlying data has no agreed definition. What do you do?',
      options: [
        { text: 'Pick the most common definition and ship the dashboard', score: 2 },
        { text: 'Facilitate a data governance session to define, document, and socialise the canonical metric definition before building', score: 4 },
        { text: 'Build multiple versions of the metric and let stakeholders choose', score: 1 },
        { text: 'Escalate to the data engineering team to decide', score: 1 },
      ],
    },
    {
      id: 'r-dpm-tech-2', category: 'analytics',
      question: 'You need to run a cohort retention analysis. What SQL concept is most central to this?',
      options: [
        { text: 'UNION ALL to combine multiple tables', score: 1 },
        { text: 'Self-joins or window functions to compare user activity in the acquisition period versus subsequent periods', score: 4 },
        { text: 'GROUP BY on user_id to count events', score: 2 },
        { text: 'A simple SELECT with a WHERE clause on dates', score: 1 },
      ],
    },
    {
      id: 'r-dpm-tech-3', category: 'analytics',
      question: 'Your company wants to move analytics from a data warehouse to a data lakehouse. What is your role as a Data PM?',
      options: [
        { text: 'It\'s purely an infrastructure decision — stay out of it', score: 1 },
        { text: 'Define requirements from analytics consumers, ensure SLAs for query performance and data freshness are met, and align migration phases with business priorities', score: 4 },
        { text: 'Approve whatever the data engineering team proposes', score: 2 },
        { text: 'Focus only on the BI tooling layer above it', score: 1 },
      ],
    },
    {
      id: 'r-dpm-1', category: 'analytics',
      question: 'Your data pipeline has a 6-hour lag, but stakeholders want real-time dashboards. How do you approach this?',
      options: [
        { text: 'Promise real-time and figure it out later', score: 1 },
        { text: 'Assess which metrics truly need real-time vs. near-real-time, evaluate streaming solutions, and communicate trade-offs and costs', score: 4 },
        { text: 'Tell stakeholders real-time isn\'t possible', score: 2 },
        { text: 'Build a separate real-time pipeline for everything', score: 1 },
      ],
    },
    {
      id: 'r-dpm-2', category: 'analytics',
      question: 'You discover that a key business metric has been calculated incorrectly for 3 months. What do you do?',
      options: [
        { text: 'Quietly fix it and hope no one notices the change', score: 1 },
        { text: 'Assess the impact, fix the calculation, backfill corrected data, and proactively communicate the discrepancy and corrective actions to stakeholders', score: 4 },
        { text: 'Blame the data engineering team', score: 1 },
        { text: 'Just fix it going forward and don\'t worry about historical data', score: 2 },
      ],
    },
    {
      id: 'r-dpm-3', category: 'analytics',
      question: 'How would you approach building a recommendation engine for your product?',
      options: [
        { text: 'Use a pre-built third-party solution without evaluation', score: 1 },
        { text: 'Define success metrics, start with simple heuristics, validate with A/B tests, then evaluate whether ML models add enough lift to justify complexity', score: 4 },
        { text: 'Build the most sophisticated ML model possible from day one', score: 1 },
        { text: 'Copy what Netflix or Amazon does', score: 2 },
      ],
    },
  ],
  growth_pm: [
    {
      id: 'r-gpm-tech-1', category: 'analytics',
      question: 'You\'re diagnosing a sudden 25% drop in organic sign-ups. What is your structured investigation approach?',
      options: [
        { text: 'Assume it\'s a seasonality effect and wait it out', score: 1 },
        { text: 'Segment by channel, device, and geography; check for tracking breakage; review SEO ranking changes; correlate with any recent product or marketing changes', score: 4 },
        { text: 'Immediately increase paid acquisition budget', score: 1 },
        { text: 'Send a survey to recent sign-ups asking why they came', score: 2 },
      ],
    },
    {
      id: 'r-gpm-tech-2', category: 'strategy',
      question: 'You\'re designing a referral programme. What mechanics determine whether it will compound or fizzle?',
      options: [
        { text: 'The size of the reward — bigger is always better', score: 1 },
        { text: 'Invitee conversion rate, double-sided incentive alignment, share trigger placement, reward redemption friction, and whether referred users retain at similar rates', score: 4 },
        { text: 'How many users you seed the programme with initially', score: 2 },
        { text: 'The channel you use to send the referral link', score: 1 },
      ],
    },
    {
      id: 'r-gpm-tech-3', category: 'business',
      question: 'Your payback period on new users is 18 months but you\'re raising a Series B. How does this affect your growth strategy?',
      options: [
        { text: 'It doesn\'t matter — focus on top-line growth', score: 1 },
        { text: 'Prioritise improving payback period through LTV-increasing features or CAC reduction, and model scenarios for investors showing a credible path to unit economics', score: 4 },
        { text: 'Slow down growth until payback improves', score: 2 },
        { text: 'Change the payback calculation methodology', score: 1 },
      ],
    },
    {
      id: 'r-gpm-1', category: 'strategy',
      question: 'Your signup funnel converts at 12%. Where do you focus to improve growth?',
      options: [
        { text: 'Redesign the entire funnel from scratch', score: 1 },
        { text: 'Analyze each funnel step to find the biggest drop-off, form hypotheses, run targeted A/B tests, and iterate', score: 4 },
        { text: 'Spend more on paid acquisition to compensate', score: 1 },
        { text: 'Add more features to make the product more attractive', score: 2 },
      ],
    },
    {
      id: 'r-gpm-2', category: 'analytics',
      question: 'Your viral coefficient (K-factor) is 0.7. How do you interpret and act on this?',
      options: [
        { text: 'It\'s above 0 so virality is working fine', score: 1 },
        { text: 'K < 1 means growth isn\'t self-sustaining. Analyze referral loops, reduce friction in sharing, improve incentives, and test different viral mechanics', score: 4 },
        { text: 'Focus on paid acquisition instead since virality isn\'t working', score: 2 },
        { text: 'K-factor doesn\'t matter for our product', score: 1 },
      ],
    },
    {
      id: 'r-gpm-3', category: 'business',
      question: 'Your CAC (Customer Acquisition Cost) is higher than your LTV (Lifetime Value). What\'s your strategy?',
      options: [
        { text: 'Keep spending to grow market share', score: 1 },
        { text: 'Simultaneously work to reduce CAC through channel optimization and increase LTV through retention, upsell, and engagement improvements', score: 4 },
        { text: 'Cut all marketing spend immediately', score: 1 },
        { text: 'Raise prices to increase LTV', score: 2 },
      ],
    },
  ],
  design_pm: [
    {
      id: 'r-dspm-tech-1', category: 'design',
      question: 'Your product serves both power users and first-time users. How do you design for both without diluting the experience?',
      options: [
        { text: 'Design for the majority user type and ignore the other', score: 1 },
        { text: 'Use progressive disclosure — surface core actions prominently, layer advanced features behind discoverability patterns like contextual menus or settings', score: 4 },
        { text: 'Build two completely separate product interfaces', score: 2 },
        { text: 'Ask users to select their experience level on signup and maintain separate codebases', score: 1 },
      ],
    },
    {
      id: 'r-dspm-tech-2', category: 'design',
      question: 'A user researcher wants 6 weeks for a full research study before you can start designing. How do you balance rigour with speed?',
      options: [
        { text: 'Skip research entirely — you know the users well enough', score: 1 },
        { text: 'Negotiate a lean research sprint: 5-7 user interviews in 1 week to validate key assumptions, with deeper research scheduled post-launch', score: 4 },
        { text: 'Wait the full 6 weeks — research is non-negotiable', score: 2 },
        { text: 'Use a survey instead to gather data faster', score: 2 },
      ],
    },
    {
      id: 'r-dspm-tech-3', category: 'design',
      question: 'Heatmap data shows users are clicking on a non-clickable element. What does this signal and how do you act?',
      options: [
        { text: 'Nothing — users click on random things all the time', score: 1 },
        { text: 'Strong signal that users expect interactivity there. Investigate intent through session recordings, then either make the element functional or redesign to reduce the false affordance', score: 4 },
        { text: 'Add a tooltip explaining it\'s not clickable', score: 2 },
        { text: 'Remove the element to eliminate the confusion', score: 1 },
      ],
    },
    {
      id: 'r-dspm-1', category: 'design',
      question: 'You\'re launching a feature in a market with accessibility regulations (ADA/WCAG). How do you handle this?',
      options: [
        { text: 'Let the design team handle accessibility', score: 1 },
        { text: 'Build accessibility into the requirements from day one, include it in acceptance criteria, test with assistive technologies, and audit against WCAG standards', score: 4 },
        { text: 'Add accessibility fixes after launch', score: 2 },
        { text: 'Only focus on accessibility if users complain', score: 1 },
      ],
    },
    {
      id: 'r-dspm-2', category: 'design',
      question: 'Quantitative data shows users love a feature, but qualitative research reveals frustration with the experience. What do you prioritize?',
      options: [
        { text: 'Trust the numbers — users are engaging with it', score: 1 },
        { text: 'Dig deeper: understand why both signals exist, identify if users tolerate friction due to high value, and iterate on the experience without losing what works', score: 4 },
        { text: 'Trust the qualitative feedback and redesign immediately', score: 2 },
        { text: 'Ignore the contradiction and move to other priorities', score: 1 },
      ],
    },
    {
      id: 'r-dspm-3', category: 'design',
      question: 'Your design system is becoming inconsistent across product areas. How do you approach this as a Design PM?',
      options: [
        { text: 'Let each team use whatever components they want', score: 1 },
        { text: 'Audit current usage, identify gaps, create governance with design and eng, invest in a shared component library, and define adoption metrics', score: 4 },
        { text: 'Force all teams to stop and adopt the system immediately', score: 2 },
        { text: 'Hire more designers to maintain consistency manually', score: 1 },
      ],
    },
  ],
  ai_pm: [
    {
      id: 'r-aipm-tech-1', category: 'technical',
      question: 'You\'re evaluating whether to use a fine-tuned model vs. prompt engineering with a foundation model for your use case. What factors drive this decision?',
      options: [
        { text: 'Fine-tuning is always better because it\'s more customised', score: 1 },
        { text: 'Consider data availability, inference cost, latency, how specialised the task is, how often the task evolves, and whether prompt engineering achieves acceptable quality first', score: 4 },
        { text: 'Use prompt engineering — it\'s always cheaper and fast enough', score: 2 },
        { text: 'Let the ML team decide without PM input', score: 1 },
      ],
    },
    {
      id: 'r-aipm-tech-2', category: 'analytics',
      question: 'Users report your AI assistant gives confident but wrong answers. What product and technical interventions do you prioritise?',
      options: [
        { text: 'Add a disclaimer that the AI can make mistakes', score: 1 },
        { text: 'Implement RAG for grounding, add confidence scoring, build a human review loop for high-stakes outputs, create feedback mechanisms, and track hallucination rate as a KPI', score: 4 },
        { text: 'Retrain the model with more data', score: 2 },
        { text: 'Limit the assistant to only pre-written answers', score: 1 },
      ],
    },
    {
      id: 'r-aipm-tech-3', category: 'strategy',
      question: 'A regulator asks you to explain how your AI model makes decisions for loan approvals. What is your response?',
      options: [
        { text: 'Explain that neural networks are black boxes and transparency isn\'t possible', score: 1 },
        { text: 'Provide model documentation, feature importance explanations, fairness audits, and ensure an explainability framework (SHAP/LIME) is built into the system architecture', score: 4 },
        { text: 'Commit to providing documentation and figure it out afterwards', score: 2 },
        { text: 'Switch to a simpler rule-based system to avoid the question', score: 1 },
      ],
    },
    {
      id: 'r-aipm-1', category: 'technical',
      question: 'Your ML model achieves 95% accuracy in testing but performs poorly in production. What do you investigate?',
      options: [
        { text: 'Retrain the model with more data', score: 2 },
        { text: 'Check for data drift, training/serving skew, feature pipeline issues, and differences between test and production data distributions', score: 4 },
        { text: 'Blame the ML engineering team', score: 1 },
        { text: 'Switch to a different model architecture', score: 1 },
      ],
    },
    {
      id: 'r-aipm-2', category: 'strategy',
      question: 'Stakeholders want to "add AI" to the product. How do you evaluate this request?',
      options: [
        { text: 'Start building an AI feature immediately', score: 1 },
        { text: 'Identify specific user problems AI could solve, assess data availability, evaluate build vs. API vs. open-source, and define clear success metrics before committing', score: 4 },
        { text: 'Tell them AI is overhyped and push back', score: 1 },
        { text: 'Use a pre-built AI API and add it to everything', score: 2 },
      ],
    },
    {
      id: 'r-aipm-3', category: 'analytics',
      question: 'Your AI feature generates outputs that users find occasionally harmful or biased. What\'s your approach?',
      options: [
        { text: 'Add a disclaimer and move on', score: 1 },
        { text: 'Implement guardrails, create a red-teaming process, build feedback loops, establish responsible AI guidelines, and set up monitoring for harmful outputs', score: 4 },
        { text: 'Remove the feature entirely', score: 2 },
        { text: 'Wait for user complaints before acting', score: 1 },
      ],
    },
  ],
  platform_pm: [
    {
      id: 'r-plpm-tech-1', category: 'technical',
      question: 'You\'re designing a rate-limiting strategy for your public API. What considerations inform the policy?',
      options: [
        { text: 'Apply a single global limit to all consumers equally', score: 1 },
        { text: 'Tier limits by plan/use case, use sliding window algorithms, return informative 429 responses with retry-after headers, and monitor for abuse patterns', score: 4 },
        { text: 'No rate limiting — it adds latency and reduces developer experience', score: 1 },
        { text: 'Let engineering set limits without consulting business needs', score: 2 },
      ],
    },
    {
      id: 'r-plpm-tech-2', category: 'technical',
      question: 'An external developer reports that your webhook delivery is unreliable. What systemic improvements do you prioritise?',
      options: [
        { text: 'Tell them to poll the API instead', score: 1 },
        { text: 'Implement retry logic with exponential backoff, delivery status tracking, a webhook log dashboard for developers, and SLA guarantees with alerting', score: 4 },
        { text: 'Investigate only their specific integration', score: 2 },
        { text: 'Add more documentation about webhook handling', score: 1 },
      ],
    },
    {
      id: 'r-plpm-tech-3', category: 'strategy',
      question: 'Your platform team is asked to support both internal product teams and external third-party developers. How do you manage the tension between these two customer segments?',
      options: [
        { text: 'Always prioritise internal teams — they drive direct revenue', score: 1 },
        { text: 'Segment the roadmap, define separate SLAs, ensure backward-compatible changes, use internal teams as design partners for external APIs, and build a developer feedback programme', score: 4 },
        { text: 'Build separate APIs for each segment', score: 2 },
        { text: 'Prioritise external developers since they grow the ecosystem', score: 1 },
      ],
    },
    {
      id: 'r-plpm-1', category: 'technical',
      question: 'Internal teams complain your platform API is hard to use. How do you improve developer experience?',
      options: [
        { text: 'Add more documentation pages', score: 2 },
        { text: 'Conduct developer interviews, analyze API usage patterns, simplify common workflows, create SDKs/examples, and measure time-to-first-API-call as a key metric', score: 4 },
        { text: 'Tell teams to read the existing docs more carefully', score: 1 },
        { text: 'Rebuild the entire API from scratch', score: 1 },
      ],
    },
    {
      id: 'r-plpm-2', category: 'strategy',
      question: 'You need to deprecate a widely-used API version. How do you manage this?',
      options: [
        { text: 'Set a date and shut it off', score: 1 },
        { text: 'Communicate a migration timeline, provide migration guides, offer coexistence period, track adoption of new version, and support teams through the transition', score: 4 },
        { text: 'Keep supporting both versions indefinitely', score: 2 },
        { text: 'Let teams migrate whenever they feel like it', score: 1 },
      ],
    },
    {
      id: 'r-plpm-3', category: 'stakeholder',
      question: 'Multiple product teams want conflicting platform capabilities prioritized. How do you decide?',
      options: [
        { text: 'Build for the biggest team first', score: 1 },
        { text: 'Evaluate based on number of teams impacted, strategic alignment, reusability of the capability, and create a transparent prioritization framework', score: 4 },
        { text: 'Build everything teams ask for', score: 1 },
        { text: 'Only build what the platform team thinks is important', score: 2 },
      ],
    },
  ],
  b2b_pm: [
    {
      id: 'r-b2b-tech-1', category: 'business',
      question: 'A prospect\'s security team requires SOC 2 Type II compliance before signing. Your product isn\'t certified yet. How do you handle this?',
      options: [
        { text: 'Tell them it\'s in progress and close the deal anyway', score: 1 },
        { text: 'Assess certification timeline and cost, evaluate if this deal warrants accelerating the audit, offer a security questionnaire bridge, and set honest expectations on timelines', score: 4 },
        { text: 'Tell them SOC 2 isn\'t necessary for your product', score: 1 },
        { text: 'Start the SOC 2 process immediately regardless of deal size', score: 2 },
      ],
    },
    {
      id: 'r-b2b-tech-2', category: 'stakeholder',
      question: 'Your enterprise customer wants a dedicated instance of your SaaS product (single-tenant). How do you evaluate and price this request?',
      options: [
        { text: 'Reject it — multi-tenancy is your architecture and it can\'t change', score: 1 },
        { text: 'Assess infrastructure cost, operational overhead, strategic value of the customer, and whether it sets a precedent; create a dedicated infrastructure tier with appropriate pricing', score: 4 },
        { text: 'Agree immediately to close the deal', score: 1 },
        { text: 'Charge the same price as multi-tenant — it\'s the same product', score: 1 },
      ],
    },
    {
      id: 'r-b2b-tech-3', category: 'strategy',
      question: 'You\'re building an integration marketplace for your B2B platform. How do you decide which integrations to build first?',
      options: [
        { text: 'Build the most technically complex integrations first to showcase capability', score: 1 },
        { text: 'Analyse which tools appear in the most customers\' tech stacks, measure integration requests in sales cycles, and prioritise integrations that unblock deals or reduce churn', score: 4 },
        { text: 'Let customers vote and build whatever gets the most votes', score: 2 },
        { text: 'Replicate whatever integrations your top competitor has', score: 1 },
      ],
    },
    {
      id: 'r-b2b-1', category: 'business',
      question: 'Your largest enterprise client requests a custom feature that doesn\'t align with your product vision. How do you handle it?',
      options: [
        { text: 'Build it — they\'re your biggest client', score: 1 },
        { text: 'Understand the underlying need, explore if a configurable solution serves both them and the broader market, and communicate trade-offs transparently', score: 4 },
        { text: 'Refuse and risk losing the account', score: 2 },
        { text: 'Promise to build it to close the deal, figure it out later', score: 1 },
      ],
    },
    {
      id: 'r-b2b-2', category: 'stakeholder',
      question: 'Sales is closing deals with promises your product can\'t currently deliver. What do you do?',
      options: [
        { text: 'Let sales do their thing — it\'s not your problem', score: 1 },
        { text: 'Create a clear product capabilities document, align with sales on what\'s committed vs. roadmap, and establish a process for evaluating custom requests', score: 4 },
        { text: 'Tell sales to stop overselling', score: 2 },
        { text: 'Rush to build everything sales promises', score: 1 },
      ],
    },
    {
      id: 'r-b2b-3', category: 'strategy',
      question: 'How do you balance feature requests from many small customers vs. a few large enterprise clients?',
      options: [
        { text: 'Always prioritize enterprise — they pay more', score: 1 },
        { text: 'Analyze revenue impact, strategic value, and market positioning; segment the roadmap to serve both; use tiered packaging to differentiate', score: 4 },
        { text: 'Treat all customers equally regardless of revenue', score: 2 },
        { text: 'Only build features that all customers want', score: 1 },
      ],
    },
  ],
  product_manager: [
    {
      id: 'r-pm-tech-1', category: 'strategy',
      question: 'You\'re conducting a competitive analysis for a product in a crowded market. What framework and data sources do you use?',
      options: [
        { text: 'Check competitor websites and write up your impressions', score: 1 },
        { text: 'Combine a positioning matrix with Jobs-to-be-Done analysis, use app reviews, sales call recordings, win/loss data, and direct user interviews to map real differentiation gaps', score: 4 },
        { text: 'Use a standard SWOT analysis based on public information', score: 2 },
        { text: 'Focus only on pricing comparisons', score: 1 },
      ],
    },
    {
      id: 'r-pm-tech-2', category: 'business',
      question: 'Your product has product-market fit signals in one segment but not another. How do you decide where to focus?',
      options: [
        { text: 'Try to serve both segments equally', score: 1 },
        { text: 'Double down on the segment with fit: analyse retention, NPS, and willingness to pay; narrow ICP; and build a repeatable go-to-market before expanding to adjacent segments', score: 4 },
        { text: 'Pivot to the larger market even without fit signals', score: 1 },
        { text: 'Raise more funding to serve both simultaneously', score: 2 },
      ],
    },
    {
      id: 'r-pm-tech-3', category: 'agile',
      question: 'You\'re launching a major feature to a global user base. What does your go-to-market and rollout plan look like?',
      options: [
        { text: 'Ship to everyone at once and monitor metrics', score: 1 },
        { text: 'Staged rollout by cohort, localisation review, internal dogfooding, aligned comms across marketing/support/sales, feature flags for rollback, and defined success criteria with review gates', score: 4 },
        { text: 'Let engineering manage the deployment — it\'s their domain', score: 2 },
        { text: 'Send an email announcement and ship to all users', score: 1 },
      ],
    },
    {
      id: 'r-pm-1', category: 'strategy',
      question: 'You\'re a new PM joining a team with no existing product documentation. What\'s your first month plan?',
      options: [
        { text: 'Start building features right away to show impact', score: 1 },
        { text: 'Immerse in user research, map stakeholders, audit existing data, create baseline docs (PRD template, roadmap), and identify quick wins', score: 4 },
        { text: 'Write a comprehensive product strategy document', score: 2 },
        { text: 'Focus on team processes and sprint ceremonies', score: 2 },
      ],
    },
    {
      id: 'r-pm-2', category: 'business',
      question: 'Your product has strong engagement but monetization is flat. How do you approach this?',
      options: [
        { text: 'Add ads everywhere', score: 1 },
        { text: 'Analyze willingness to pay, test pricing models, identify premium features through usage data, and validate monetization hypotheses with user segments', score: 4 },
        { text: 'Focus only on engagement and growth — revenue will follow', score: 2 },
        { text: 'Copy a competitor\'s monetization model', score: 1 },
      ],
    },
    {
      id: 'r-pm-3', category: 'agile',
      question: 'You inherit a backlog with 200+ items, many outdated. How do you manage this?',
      options: [
        { text: 'Work through them one by one in order', score: 1 },
        { text: 'Ruthlessly triage: archive stale items, categorize by strategic themes, re-prioritize against current goals, and establish a regular grooming cadence', score: 4 },
        { text: 'Delete everything and start fresh', score: 2 },
        { text: 'Ask stakeholders to re-submit their top requests', score: 2 },
      ],
    },
  ],
};

export const roleWeights = {
  product_manager: { business: 1.2, technical: 0.8, design: 1.0, stakeholder: 1.2, agile: 1.1, analytics: 1.0, strategy: 1.2, communication: 1.1 },
  technical_pm: { business: 0.8, technical: 1.5, design: 0.7, stakeholder: 1.0, agile: 1.2, analytics: 1.0, strategy: 0.9, communication: 0.9 },
  data_pm: { business: 1.0, technical: 1.2, design: 0.7, stakeholder: 0.9, agile: 1.0, analytics: 1.5, strategy: 1.0, communication: 0.8 },
  growth_pm: { business: 1.3, technical: 0.8, design: 0.9, stakeholder: 0.9, agile: 1.0, analytics: 1.4, strategy: 1.2, communication: 1.0 },
  design_pm: { business: 0.8, technical: 0.7, design: 1.5, stakeholder: 1.0, agile: 1.0, analytics: 0.9, strategy: 1.0, communication: 1.1 },
  ai_pm: { business: 0.9, technical: 1.5, design: 0.7, stakeholder: 0.9, agile: 1.0, analytics: 1.3, strategy: 1.1, communication: 0.8 },
  platform_pm: { business: 0.9, technical: 1.4, design: 0.6, stakeholder: 1.1, agile: 1.2, analytics: 1.0, strategy: 1.1, communication: 0.9 },
  b2b_pm: { business: 1.4, technical: 0.8, design: 0.8, stakeholder: 1.3, agile: 1.0, analytics: 1.0, strategy: 1.2, communication: 1.2 },
};
