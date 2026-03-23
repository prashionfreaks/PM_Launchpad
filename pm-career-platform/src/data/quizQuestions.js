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
  // Business Acumen (3 questions)
  {
    id: 1,
    category: 'business',
    question: 'A competitor launches a feature that overlaps with your product roadmap. What do you do first?',
    options: [
      { text: 'Call an emergency stakeholder meeting to discuss a potential change in direction', score: 3 },
      { text: 'Immediately prioritize building a similar feature to match their release timeline', score: 1 },
      { text: 'Analyze the competitor\'s feature impact on your users and current market position', score: 4 },
      { text: 'Continue with the current roadmap without reassessing competitive dynamics at all', score: 2 },
    ],
  },
  {
    id: 2,
    category: 'business',
    question: 'How would you evaluate the market potential of a new product idea?',
    options: [
      { text: 'Build an MVP first, launch it to early adopters, then see what data emerges', score: 3 },
      { text: 'Conduct TAM/SAM/SOM analysis with customer interviews and competitive research', score: 4 },
      { text: 'Look at what direct competitors are doing and replicate their product approach', score: 2 },
      { text: 'Rely on gut feeling and general industry trend reports from analyst firms', score: 1 },
    ],
  },
  {
    id: 3,
    category: 'business',
    question: 'Your CEO asks you to justify the ROI of a feature. How do you approach this?',
    options: [
      { text: 'Benchmark against competitor features that appear to have driven their growth', score: 3 },
      { text: 'Present aggregated user feedback surveys as the primary business justification', score: 2 },
      { text: 'Agree it\'s important, promise to track relevant performance metrics post-launch', score: 1 },
      { text: 'Estimate development cost versus projected revenue impact backed by usage data', score: 4 },
    ],
  },
  // Technical Skills (3 questions)
  {
    id: 4,
    category: 'technical',
    question: 'An engineer says a feature will take 3 sprints. How do you respond?',
    options: [
      { text: 'Ask them to break it down and explore if an MVP version can ship sooner', score: 4 },
      { text: 'Push them to compress it into one sprint to meet the business launch deadline', score: 1 },
      { text: 'Accept their engineering estimate without further questions or detailed breakdown', score: 2 },
      { text: 'Suggest cutting scope items arbitrarily to make the timeline fit your plan', score: 1 },
    ],
  },
  {
    id: 5,
    category: 'technical',
    question: 'What does an API do in the context of product development?',
    options: [
      { text: 'It is an automated testing framework used by quality assurance engineering teams', score: 1 },
      { text: 'It is a visual design tool for creating user interfaces and interaction prototypes', score: 1 },
      { text: 'It enables different software systems to communicate and share data with each other', score: 4 },
      { text: 'It is a specialized programming language designed for building mobile applications', score: 1 },
    ],
  },
  {
    id: 6,
    category: 'technical',
    question: 'Your team wants to migrate from a monolith to microservices. What\'s your role as PM?',
    options: [
      { text: 'Oppose the migration because it will significantly slow down feature delivery speed', score: 1 },
      { text: 'Understand business impact, help prioritize migration order, communicate timelines', score: 4 },
      { text: 'Approve the migration immediately without evaluation to keep engineering satisfied', score: 1 },
      { text: 'Let the engineering team decide entirely since it is a purely technical decision', score: 2 },
    ],
  },
  // Design Thinking (3 questions)
  {
    id: 7,
    category: 'design',
    question: 'Users are dropping off during onboarding. What\'s your first step?',
    options: [
      { text: 'Add more tooltips, help text, and contextual guidance throughout each screen', score: 2 },
      { text: 'Remove onboarding entirely and let users explore the product on their own terms', score: 1 },
      { text: 'Analyze funnel data, conduct user interviews, and identify specific drop-off points', score: 4 },
      { text: 'Redesign the entire onboarding flow immediately based on best practice templates', score: 1 },
    ],
  },
  {
    id: 8,
    category: 'design',
    question: 'What is the primary purpose of creating user personas?',
    options: [
      { text: 'To define the engineering team structure and assign ownership of feature areas', score: 1 },
      { text: 'To represent different user segments and guide product decisions based on needs', score: 4 },
      { text: 'To satisfy compliance requirements for internal product documentation standards', score: 1 },
      { text: 'To make stakeholder presentations look professional and visually polished overall', score: 1 },
    ],
  },
  {
    id: 9,
    category: 'design',
    question: 'A designer presents a beautiful UI but usability testing shows users are confused. What do you do?',
    options: [
      { text: 'Ship the design anyway because the visual quality and brand alignment are strong', score: 1 },
      { text: 'Add a detailed instruction manual and onboarding tutorial overlay for all users', score: 1 },
      { text: 'Scrap the current design approach entirely and restart from basic wireframes now', score: 2 },
      { text: 'Work with the designer to iterate on usability findings while maintaining quality', score: 4 },
    ],
  },
  // Stakeholder Management (3 questions)
  {
    id: 10,
    category: 'stakeholder',
    question: 'Two executives want conflicting features prioritized. How do you handle this?',
    options: [
      { text: 'Try to build both features simultaneously by splitting the engineering team evenly', score: 2 },
      { text: 'Facilitate a data-driven discussion showing impact of each, align on shared goals', score: 4 },
      { text: 'Escalate the conflict to the CEO and ask them to make the final prioritization', score: 2 },
      { text: 'Do whatever the higher-ranking executive wants without further discussion needed', score: 1 },
    ],
  },
  {
    id: 11,
    category: 'stakeholder',
    question: 'An important stakeholder keeps adding scope mid-sprint. How do you manage this?',
    options: [
      { text: 'Document the impact on timeline, present trade-offs, and agree on a change process', score: 4 },
      { text: 'Accept all scope changes to keep the stakeholder satisfied with the team output', score: 1 },
      { text: 'Tell the engineering team to absorb the extra work by putting in overtime hours', score: 1 },
      { text: 'Ignore their requests completely until the current sprint cycle has fully concluded', score: 1 },
    ],
  },
  {
    id: 12,
    category: 'stakeholder',
    question: 'How do you communicate a product delay to stakeholders?',
    options: [
      { text: 'Quietly reduce scope to hit the original date without informing key stakeholders', score: 2 },
      { text: 'Blame the engineering team for underestimating the complexity of the deliverables', score: 1 },
      { text: 'Proactively share the delay, root cause, revised timeline, and a mitigation plan', score: 4 },
      { text: 'Wait until someone specifically asks about the timeline before sharing any updates', score: 1 },
    ],
  },
  // Agile & Execution (3 questions)
  {
    id: 13,
    category: 'agile',
    question: 'What is the main purpose of a sprint retrospective?',
    options: [
      { text: 'To demo all of the completed work to stakeholders and collect their input on it', score: 1 },
      { text: 'To plan the next sprint\'s backlog items and assign story points to each of them', score: 2 },
      { text: 'To assign blame for what went wrong during the sprint and hold people accountable', score: 1 },
      { text: 'To reflect on the team\'s process and identify improvements for the next sprint', score: 4 },
    ],
  },
  {
    id: 14,
    category: 'agile',
    question: 'Your sprint velocity has dropped 30% over 3 sprints. What do you investigate?',
    options: [
      { text: 'Check for increased tech debt, team changes, unclear requirements, or blockers', score: 4 },
      { text: 'Nothing specific, since velocity naturally fluctuates across sprints over time', score: 1 },
      { text: 'Add more developers to the team to compensate for the declining velocity trend', score: 2 },
      { text: 'Push the team to work harder and commit to more story points the next sprint', score: 1 },
    ],
  },
  {
    id: 15,
    category: 'agile',
    question: 'How do you prioritize features in a product backlog?',
    options: [
      { text: 'Prioritize whatever the loudest stakeholder requests in meetings and escalations', score: 1 },
      { text: 'Only work on features with a clear and immediate revenue impact on the business', score: 2 },
      { text: 'Use frameworks like RICE or MoSCoW, weighting value and strategic alignment', score: 4 },
      { text: 'Process them on a first come, first served basis in the order they were received', score: 1 },
    ],
  },
  // Analytics & Metrics (3 questions)
  {
    id: 16,
    category: 'analytics',
    question: 'What is a North Star metric?',
    options: [
      { text: 'Monthly recurring revenue tracked across all product lines and business segments', score: 2 },
      { text: 'The total number of features shipped per quarter as a measure of team throughput', score: 1 },
      { text: 'A single metric that best captures the core value your product delivers to users', score: 4 },
      { text: 'The company\'s stock price and overall market capitalization performance over time', score: 1 },
    ],
  },
  {
    id: 17,
    category: 'analytics',
    question: 'Your feature launched and DAU increased 20% but retention dropped 10%. How do you interpret this?',
    options: [
      { text: 'Wait one month and check the metrics again before making any product decisions now', score: 2 },
      { text: 'Investigate if the feature attracts low-intent users or degrades existing experience', score: 4 },
      { text: 'It\'s a clear success because DAU went up significantly across user segments overall', score: 1 },
      { text: 'It\'s a clear failure because retention dropped meaningfully across key user cohorts', score: 2 },
    ],
  },
  {
    id: 18,
    category: 'analytics',
    question: 'How would you set up an A/B test for a new checkout flow?',
    options: [
      { text: 'Show the new flow to all users at once and compare results with historical data', score: 1 },
      { text: 'Let the design team decide which version looks better based on their expert review', score: 1 },
      { text: 'Run the test for one day with a small sample and see which variant performs better', score: 2 },
      { text: 'Define hypothesis, success metrics, sample size, run control and variant together', score: 4 },
    ],
  },
  // Product Strategy (3 questions)
  {
    id: 19,
    category: 'strategy',
    question: 'How do you decide between building a feature in-house vs. using a third-party solution?',
    options: [
      { text: 'Always use a third-party solution to save time and reduce engineering resource needs', score: 1 },
      { text: 'Evaluate based on core competency, cost, time-to-market, and strategic long-term value', score: 4 },
      { text: 'Always build in-house to maintain full control over the codebase and architecture', score: 1 },
      { text: 'Let the engineering team decide based on their tooling preference and past experience', score: 2 },
    ],
  },
  {
    id: 20,
    category: 'strategy',
    question: 'Your product is growing but facing increasing churn. What strategic approach do you take?',
    options: [
      { text: 'Analyze churn cohorts, identify patterns, and invest in retention while maintaining growth', score: 4 },
      { text: 'Lower the subscription price across all tiers to keep existing users from cancelling', score: 2 },
      { text: 'Focus entirely on acquiring new users at a higher rate to offset the churn numbers', score: 1 },
      { text: 'Add more features across the board to increase overall product stickiness and usage', score: 2 },
    ],
  },
  {
    id: 21,
    category: 'strategy',
    question: 'What frameworks do you use to define product vision?',
    options: [
      { text: 'Copy the market leader\'s vision and adapt the framing for our specific product area', score: 1 },
      { text: 'Focus only on what the sales team requests since they hear from customers directly', score: 1 },
      { text: 'Combine market analysis, user research, and frameworks like Jobs-to-be-Done or JTBD', score: 4 },
      { text: 'I don\'t use structured frameworks at all and rely primarily on product intuition', score: 1 },
    ],
  },
  // Communication (3 questions)
  {
    id: 22,
    category: 'communication',
    question: 'How do you write an effective PRD (Product Requirements Document)?',
    options: [
      { text: 'Define the problem, user stories, success metrics, and leave room for eng solutions', score: 4 },
      { text: 'Copy a standard template and fill in the blanks with minimal customization needed', score: 2 },
      { text: 'List every detail of the solution upfront so engineering has full specifications ready', score: 2 },
      { text: 'Write a one-line description and let the team figure out the rest independently now', score: 1 },
    ],
  },
  {
    id: 23,
    category: 'communication',
    question: 'You need to present a product strategy to the board. How do you prepare?',
    options: [
      { text: 'Send a written document instead of presenting so the board can review it at length', score: 2 },
      { text: 'Wing it during the presentation since you know the product well enough to ad-lib', score: 1 },
      { text: 'Create a detailed fifty-slide deck covering every possible aspect of the strategy', score: 1 },
      { text: 'Craft a concise narrative with data-backed insights, clear asks, and prepared Q&A', score: 4 },
    ],
  },
  {
    id: 24,
    category: 'communication',
    question: 'An engineer disagrees with your product decision. How do you handle it?',
    options: [
      { text: 'Escalate the disagreement to their engineering manager to resolve the situation now', score: 1 },
      { text: 'Avoid the confrontation entirely and change your decision to keep the team aligned', score: 1 },
      { text: 'Listen to their perspective, share your reasoning with data, and find common ground', score: 4 },
      { text: 'Pull rank as the PM and move forward with the decision without further discussion', score: 1 },
    ],
  },
];

// Role-specific questions that get added based on user's target PM role
export const roleSpecificQuestions = {
  technical_pm: [
    {
      id: 'r-tpm-1', category: 'technical',
      question: 'Your engineering team proposes using GraphQL instead of REST for a new service. How do you evaluate this?',
      options: [
        { text: 'Default to REST since it is more common and the team already has deep expertise in it', score: 1 },
        { text: 'Evaluate trade-offs: query flexibility, caching complexity, client needs, migration cost', score: 4 },
        { text: 'Adopt GraphQL because it is the latest trend and will help with recruiting engineers', score: 1 },
        { text: 'Let engineering decide on their own since it is purely a technical architecture call', score: 2 },
      ],
    },
    {
      id: 'r-tpm-2', category: 'technical',
      question: 'A critical production incident brings down your service. As TPM, what\'s your immediate role?',
      options: [
        { text: 'Start debugging the production code yourself to identify the root cause of the outage', score: 1 },
        { text: 'Escalate the incident to the CTO immediately and let leadership handle communications', score: 2 },
        { text: 'Coordinate incident response: communicate status, prioritize debugging, drive post-mortem', score: 4 },
        { text: 'Wait for the engineers to fix it and then ask for a detailed incident summary report', score: 1 },
      ],
    },
    {
      id: 'r-tpm-3', category: 'technical',
      question: 'How do you decide between building on AWS Lambda (serverless) vs. a traditional containerized service?',
      options: [
        { text: 'Evaluate based on traffic patterns, cold start tolerance, execution limits, vendor lock-in', score: 4 },
        { text: 'Always go serverless to reduce infrastructure costs and eliminate operational overhead', score: 1 },
        { text: 'Let the architect decide without any PM input since it is a technical infrastructure call', score: 1 },
        { text: 'Use containers because the team already knows them well and has established workflows', score: 2 },
      ],
    },
    {
      id: 'r-tpm-4', category: 'technical',
      question: 'Your team wants to adopt a new CI/CD pipeline tool. How do you assess the transition?',
      options: [
        { text: 'Reject the proposal to avoid disruption and keep the team focused on feature delivery', score: 2 },
        { text: 'Delegate the entire decision to DevOps without considering product delivery implications', score: 1 },
        { text: 'Approve the switch immediately if the engineering lead recommends it without evaluation', score: 1 },
        { text: 'Assess migration effort, downtime risk, team ramp-up time, and integration with current stack', score: 4 },
      ],
    },
    {
      id: 'r-tpm-5', category: 'stakeholder',
      question: 'Engineering wants to spend 30% of the sprint on tech debt but leadership wants new features. How do you navigate this?',
      options: [
        { text: 'Quantify tech debt impact on velocity, propose a balanced split, and align both sides', score: 4 },
        { text: 'Side with engineering every time since they understand the codebase challenges the best', score: 2 },
        { text: 'Alternate sprints between tech debt and features without a data-driven rationale for it', score: 1 },
        { text: 'Side with leadership every time since feature delivery drives visible business outcomes', score: 1 },
      ],
    },
    {
      id: 'r-tpm-6', category: 'agile',
      question: 'Your system\'s P99 latency has increased 40% over two quarters. What do you do as TPM?',
      options: [
        { text: 'Mandate a complete system rewrite to address all latency concerns at the same time', score: 1 },
        { text: 'Add more server capacity to handle the load without investigating the root cause first', score: 2 },
        { text: 'Analyze latency trends by service, identify bottlenecks, and prioritize targeted fixes', score: 4 },
        { text: 'Ignore it unless customers file formal complaints about the performance degradation', score: 1 },
      ],
    },
  ],
  data_pm: [
    {
      id: 'r-dpm-1', category: 'analytics',
      question: 'Your data pipeline has a 6-hour lag, but stakeholders want real-time dashboards. How do you approach this?',
      options: [
        { text: 'Tell stakeholders that real-time is not technically possible with the current architecture', score: 2 },
        { text: 'Assess which metrics truly need real-time, evaluate streaming solutions, communicate costs', score: 4 },
        { text: 'Build a separate real-time pipeline for every single metric regardless of actual priority', score: 1 },
        { text: 'Promise real-time delivery to stakeholders and figure out the implementation details later', score: 1 },
      ],
    },
    {
      id: 'r-dpm-2', category: 'analytics',
      question: 'You discover that a key business metric has been calculated incorrectly for 3 months. What do you do?',
      options: [
        { text: 'Assess impact, fix the calculation, backfill corrected data, communicate the discrepancy', score: 4 },
        { text: 'Just fix it going forward without backfilling and don\'t worry about historical data gaps', score: 2 },
        { text: 'Quietly fix the calculation going forward and hope no one notices the historical change', score: 1 },
        { text: 'Blame the data engineering team for the error and request they handle all communications', score: 1 },
      ],
    },
    {
      id: 'r-dpm-3', category: 'analytics',
      question: 'How would you approach building a recommendation engine for your product?',
      options: [
        { text: 'Copy what Netflix or Amazon does and replicate their recommendation approach to your product', score: 2 },
        { text: 'Build the most sophisticated ML model possible from day one to maximize recommendation quality', score: 1 },
        { text: 'Define success metrics, start with simple heuristics, validate with A/B tests, then scale', score: 4 },
        { text: 'Use a pre-built third-party solution without evaluating if it fits your specific use case', score: 1 },
      ],
    },
    {
      id: 'r-dpm-4', category: 'technical',
      question: 'Your data warehouse query costs have tripled in the last quarter. How do you address this?',
      options: [
        { text: 'Audit query patterns, optimize expensive joins, implement caching, and set usage guardrails', score: 4 },
        { text: 'Restrict all teams from running ad-hoc queries until costs stabilize at acceptable levels', score: 2 },
        { text: 'Migrate to a different data warehouse vendor immediately to reduce per-query pricing costs', score: 1 },
        { text: 'Increase the budget allocation without investigating the root cause of the cost increase', score: 1 },
      ],
    },
    {
      id: 'r-dpm-5', category: 'strategy',
      question: 'Business teams request dozens of custom dashboards. How do you scale data product delivery?',
      options: [
        { text: 'Hire more analysts to handle the growing volume of incoming dashboard creation requests', score: 2 },
        { text: 'Reject all custom requests and only provide the existing standard set of dashboards', score: 1 },
        { text: 'Create self-serve analytics tools, standardize key metrics, and train teams on data access', score: 4 },
        { text: 'Build every custom dashboard request individually as they come in from business teams', score: 1 },
      ],
    },
    {
      id: 'r-dpm-6', category: 'business',
      question: 'Your A/B testing platform shows conflicting results between two metrics for the same experiment. What do you do?',
      options: [
        { text: 'Investigate segment-level data, check for novelty effects, and extend the test duration', score: 4 },
        { text: 'Pick the metric that supports the outcome you originally hypothesized and report that one', score: 1 },
        { text: 'Average the two conflicting metrics together and use that combined score as the result', score: 1 },
        { text: 'Declare the test inconclusive, abandon the experiment, and move on to the next feature', score: 2 },
      ],
    },
  ],
  growth_pm: [
    {
      id: 'r-gpm-1', category: 'strategy',
      question: 'Your signup funnel converts at 12%. Where do you focus to improve growth?',
      options: [
        { text: 'Add more product features to make the offering more attractive before users even sign up', score: 2 },
        { text: 'Analyze each funnel step to find the biggest drop-off, form hypotheses, run A/B tests', score: 4 },
        { text: 'Spend more on paid acquisition campaigns to compensate for the low conversion numbers', score: 1 },
        { text: 'Redesign the entire signup funnel from scratch based on industry best practice templates', score: 1 },
      ],
    },
    {
      id: 'r-gpm-2', category: 'analytics',
      question: 'Your viral coefficient (K-factor) is 0.7. How do you interpret and act on this?',
      options: [
        { text: 'K under 1 means growth isn\'t self-sustaining; optimize referral loops and reduce friction', score: 4 },
        { text: 'Focus on paid acquisition channels instead since organic virality clearly isn\'t working', score: 2 },
        { text: 'It\'s above zero so the viral growth loop is working fine and needs no further attention', score: 1 },
        { text: 'K-factor doesn\'t matter for our product category so deprioritize viral growth entirely', score: 1 },
      ],
    },
    {
      id: 'r-gpm-3', category: 'business',
      question: 'Your CAC (Customer Acquisition Cost) is higher than your LTV (Lifetime Value). What\'s your strategy?',
      options: [
        { text: 'Cut all marketing and acquisition spend immediately until the unit economics are positive', score: 1 },
        { text: 'Raise prices across all plans to increase LTV without adjusting the acquisition strategy', score: 2 },
        { text: 'Reduce CAC through channel optimization and increase LTV through retention and upselling', score: 4 },
        { text: 'Keep spending at the current rate to grow market share and worry about unit economics later', score: 1 },
      ],
    },
    {
      id: 'r-gpm-4', category: 'analytics',
      question: 'Your activation rate is 25% — most signups never reach the "aha moment." How do you improve this?',
      options: [
        { text: 'Redefine the activation metric to a lower bar so the percentage looks better in reports', score: 1 },
        { text: 'Map the activation journey, identify friction points, and run experiments on each step', score: 4 },
        { text: 'Focus on acquiring more signups to compensate for the low activation rate across cohorts', score: 1 },
        { text: 'Send more email reminders and push notifications to bring inactive signups back quickly', score: 2 },
      ],
    },
    {
      id: 'r-gpm-5', category: 'strategy',
      question: 'Your freemium product has high free-tier usage but low conversion to paid plans. What do you do?',
      options: [
        { text: 'Analyze feature usage by tier, test paywall placement, and optimize the upgrade triggers', score: 4 },
        { text: 'Remove the free tier entirely and force all users to subscribe to a paid plan immediately', score: 1 },
        { text: 'Keep the free tier as-is since high free usage means strong product-market fit for growth', score: 1 },
        { text: 'Add more premium features without studying what free users actually value and would pay for', score: 2 },
      ],
    },
    {
      id: 'r-gpm-6', category: 'communication',
      question: 'You want to run a growth experiment that might temporarily degrade the user experience. How do you handle it?',
      options: [
        { text: 'Avoid the experiment entirely since any user experience degradation is not worth the risk', score: 2 },
        { text: 'Run the experiment on all users at once to get statistically significant results much faster', score: 1 },
        { text: 'Define guardrail metrics, set rollback criteria, align with stakeholders, and limit blast radius', score: 4 },
        { text: 'Run the experiment quietly without telling anyone to avoid internal pushback on the test', score: 1 },
      ],
    },
  ],
  design_pm: [
    {
      id: 'r-dspm-1', category: 'design',
      question: 'You\'re launching a feature in a market with accessibility regulations (ADA/WCAG). How do you handle this?',
      options: [
        { text: 'Build accessibility into requirements from day one, include in acceptance criteria, and audit', score: 4 },
        { text: 'Plan to add accessibility fixes after the initial launch once you gather real user feedback', score: 2 },
        { text: 'Only focus on accessibility compliance if specific users actually complain about the issues', score: 1 },
        { text: 'Let the design team handle accessibility requirements entirely on their own without PM input', score: 1 },
      ],
    },
    {
      id: 'r-dspm-2', category: 'design',
      question: 'Quantitative data shows users love a feature, but qualitative research reveals frustration with the experience. What do you prioritize?',
      options: [
        { text: 'Trust the qualitative feedback completely and redesign the entire experience immediately', score: 2 },
        { text: 'Dig deeper: understand why both signals exist and iterate without losing what already works', score: 4 },
        { text: 'Trust the engagement numbers since users are clearly interacting with the feature heavily', score: 1 },
        { text: 'Ignore the contradiction between data sources and move on to other product priorities now', score: 1 },
      ],
    },
    {
      id: 'r-dspm-3', category: 'design',
      question: 'Your design system is becoming inconsistent across product areas. How do you approach this as a Design PM?',
      options: [
        { text: 'Force all teams to stop current work and adopt the unified design system immediately now', score: 2 },
        { text: 'Hire more designers to manually maintain visual consistency across all product surfaces', score: 1 },
        { text: 'Audit current usage, identify gaps, create governance, and invest in a shared component library', score: 4 },
        { text: 'Let each product team use whatever components they want to maintain their team autonomy', score: 1 },
      ],
    },
    {
      id: 'r-dspm-4', category: 'stakeholder',
      question: 'A PM from another team wants to ship a feature that violates your product\'s design principles. How do you respond?',
      options: [
        { text: 'Collaborate to find a solution that meets their goals while preserving design coherence', score: 4 },
        { text: 'Let them ship whatever they want since each team should own their own design decisions', score: 1 },
        { text: 'Block the feature entirely until they conform fully to every existing design principle rule', score: 2 },
        { text: 'Escalate the disagreement to the head of design and let leadership resolve the conflict', score: 1 },
      ],
    },
    {
      id: 'r-dspm-5', category: 'analytics',
      question: 'How do you measure the success of a UX redesign when users initially resist any changes?',
      options: [
        { text: 'Track task completion rates, time-on-task, satisfaction scores, and allow an adoption window', score: 4 },
        { text: 'Ignore the initial complaints since users always resist change and will adjust over time', score: 2 },
        { text: 'Survey only power users for feedback since casual users won\'t notice design differences', score: 1 },
        { text: 'Roll back the redesign immediately at the first sign of any user complaints or resistance', score: 1 },
      ],
    },
    {
      id: 'r-dspm-6', category: 'communication',
      question: 'Your user research reveals a need that conflicts with the current product direction. How do you present this?',
      options: [
        { text: 'Immediately pivot the product direction based solely on the new user research findings', score: 2 },
        { text: 'Present findings with data, propose options, and facilitate a discussion on strategic impact', score: 4 },
        { text: 'Share the raw data with stakeholders without any analysis and let them interpret the results', score: 1 },
        { text: 'Suppress the research findings to avoid creating strategic confusion among the leadership', score: 1 },
      ],
    },
  ],
  ai_pm: [
    {
      id: 'r-aipm-1', category: 'technical',
      question: 'Your ML model achieves 95% accuracy in testing but performs poorly in production. What do you investigate?',
      options: [
        { text: 'Check for data drift, training-serving skew, feature pipeline issues, and data differences', score: 4 },
        { text: 'Switch to a completely different model architecture without diagnosing the current failure', score: 1 },
        { text: 'Retrain the model with more data from the same source distribution used during testing', score: 2 },
        { text: 'Blame the ML engineering team for not properly validating the model before deployment', score: 1 },
      ],
    },
    {
      id: 'r-aipm-2', category: 'strategy',
      question: 'Stakeholders want to "add AI" to the product. How do you evaluate this request?',
      options: [
        { text: 'Use a pre-built AI API and add it broadly across features without targeting specific needs', score: 2 },
        { text: 'Tell the stakeholders that AI is overhyped and push back on the request with conviction', score: 1 },
        { text: 'Start building an AI-powered feature immediately to satisfy the stakeholder request fast', score: 1 },
        { text: 'Identify user problems AI could solve, assess data availability, and define success metrics', score: 4 },
      ],
    },
    {
      id: 'r-aipm-3', category: 'analytics',
      question: 'Your AI feature generates outputs that users find occasionally harmful or biased. What\'s your approach?',
      options: [
        { text: 'Wait for user complaints to reach a critical volume before taking any corrective actions', score: 1 },
        { text: 'Implement guardrails, build feedback loops, establish responsible AI guidelines, add monitoring', score: 4 },
        { text: 'Add a disclaimer about potential inaccuracies and move on to the next feature priority', score: 1 },
        { text: 'Remove the AI feature entirely from the product until the bias issue is permanently solved', score: 2 },
      ],
    },
    {
      id: 'r-aipm-4', category: 'business',
      question: 'Your LLM-based feature costs $0.15 per query and usage is growing fast. How do you manage the economics?',
      options: [
        { text: 'Optimize prompts, implement caching, evaluate smaller models, and align pricing to value', score: 4 },
        { text: 'Rate-limit all users aggressively to reduce costs without analyzing usage patterns first', score: 2 },
        { text: 'Remove the feature entirely since AI inference costs are too expensive to sustain long-term', score: 1 },
        { text: 'Absorb the cost as a growth investment and worry about unit economics at a later stage', score: 1 },
      ],
    },
    {
      id: 'r-aipm-5', category: 'design',
      question: 'Users don\'t trust the AI recommendations your product provides. How do you increase adoption?',
      options: [
        { text: 'Remove AI recommendations and revert to the previous rule-based system the users preferred', score: 1 },
        { text: 'Add explainability features, show confidence scores, allow easy overrides, and build trust over time', score: 4 },
        { text: 'Force users to follow AI recommendations by removing manual override options from the flow', score: 1 },
        { text: 'Improve the model accuracy behind the scenes without addressing user-facing trust concerns', score: 2 },
      ],
    },
    {
      id: 'r-aipm-6', category: 'stakeholder',
      question: 'Your ML team says they need 6 months to build a custom model, but leadership wants results in 6 weeks. What do you do?',
      options: [
        { text: 'Propose a phased approach: ship a rules-based MVP now, iterate toward ML over the timeline', score: 4 },
        { text: 'Promise the six-week deadline to leadership and pressure the ML team to work much faster', score: 1 },
        { text: 'Tell leadership the timeline is impossible and they need to wait for the full model build', score: 2 },
        { text: 'Outsource the entire model build to a third-party vendor without evaluating data privacy', score: 1 },
      ],
    },
  ],
  platform_pm: [
    {
      id: 'r-plpm-1', category: 'technical',
      question: 'Internal teams complain your platform API is hard to use. How do you improve developer experience?',
      options: [
        { text: 'Conduct developer interviews, analyze usage patterns, simplify workflows, create SDKs', score: 4 },
        { text: 'Tell teams to read the existing documentation more carefully before filing support tickets', score: 1 },
        { text: 'Add more documentation pages covering additional edge cases and technical specifications', score: 2 },
        { text: 'Rebuild the entire API from scratch using a completely new architecture and design pattern', score: 1 },
      ],
    },
    {
      id: 'r-plpm-2', category: 'strategy',
      question: 'You need to deprecate a widely-used API version. How do you manage this?',
      options: [
        { text: 'Keep supporting both API versions indefinitely to avoid disrupting any consumer teams now', score: 2 },
        { text: 'Communicate migration timeline, provide guides, offer coexistence, and track adoption rates', score: 4 },
        { text: 'Let consuming teams migrate to the new version whenever they feel like it on their own', score: 1 },
        { text: 'Set a hard deprecation date and shut it off regardless of consumer migration readiness', score: 1 },
      ],
    },
    {
      id: 'r-plpm-3', category: 'stakeholder',
      question: 'Multiple product teams want conflicting platform capabilities prioritized. How do you decide?',
      options: [
        { text: 'Build everything that any team asks for by expanding the platform team\'s scope and headcount', score: 1 },
        { text: 'Only build what the platform team internally thinks is important based on technical judgment', score: 2 },
        { text: 'Evaluate based on teams impacted, strategic alignment, reusability, and create a framework', score: 4 },
        { text: 'Build for the biggest team first since they have the most users and therefore the most impact', score: 1 },
      ],
    },
    {
      id: 'r-plpm-4', category: 'technical',
      question: 'A consuming team bypasses your platform and builds their own solution. How do you respond?',
      options: [
        { text: 'Understand why they bypassed, identify platform gaps, and improve to prevent future workarounds', score: 4 },
        { text: 'Escalate the violation to engineering leadership and request they enforce platform compliance', score: 1 },
        { text: 'Ignore it since each team should be free to make their own infrastructure and tooling choices', score: 2 },
        { text: 'Mandate that all teams must use the platform and block their custom solution immediately', score: 1 },
      ],
    },
    {
      id: 'r-plpm-5', category: 'analytics',
      question: 'How do you measure the success of an internal platform when there are no external customers?',
      options: [
        { text: 'Ask consuming teams for qualitative feedback once a year during the annual planning process', score: 2 },
        { text: 'Track the number of features the platform team ships per quarter as the primary metric used', score: 1 },
        { text: 'Measure success by the size of the platform team and the budget allocated to the function', score: 1 },
        { text: 'Measure adoption rate, developer satisfaction, integration time, and incident reduction rates', score: 4 },
      ],
    },
    {
      id: 'r-plpm-6', category: 'business',
      question: 'Leadership asks you to turn your internal platform into an external product. How do you evaluate this?',
      options: [
        { text: 'Assess market demand, productization gap, support requirements, and security implications first', score: 4 },
        { text: 'Refuse the request since internal platforms are never suitable for external customer usage', score: 1 },
        { text: 'Start selling the platform as-is to external customers without any changes or modifications', score: 1 },
        { text: 'Hire a separate team to build an external version from scratch without leveraging the existing one', score: 2 },
      ],
    },
  ],
  b2b_pm: [
    {
      id: 'r-b2b-1', category: 'business',
      question: 'Your largest enterprise client requests a custom feature that doesn\'t align with your product vision. How do you handle it?',
      options: [
        { text: 'Refuse the request and accept the risk of losing the enterprise account relationship', score: 2 },
        { text: 'Understand the underlying need, explore configurable solutions, communicate trade-offs', score: 4 },
        { text: 'Build it immediately since they are your biggest client and you cannot risk losing them', score: 1 },
        { text: 'Promise to build it to close the deal and figure out the implementation details later', score: 1 },
      ],
    },
    {
      id: 'r-b2b-2', category: 'stakeholder',
      question: 'Sales is closing deals with promises your product can\'t currently deliver. What do you do?',
      options: [
        { text: 'Create a capabilities document, align on committed vs. roadmap, establish a review process', score: 4 },
        { text: 'Rush to build everything sales promises to every prospect regardless of strategic fit or cost', score: 1 },
        { text: 'Tell the sales team to stop overselling the product in calls without providing alternatives', score: 2 },
        { text: 'Let sales continue doing their thing since deal closure is their problem, not yours at all', score: 1 },
      ],
    },
    {
      id: 'r-b2b-3', category: 'strategy',
      question: 'How do you balance feature requests from many small customers vs. a few large enterprise clients?',
      options: [
        { text: 'Only build features that every single customer segment wants to maximize broad appeal first', score: 1 },
        { text: 'Analyze revenue impact, strategic value, and market positioning; segment the roadmap by tier', score: 4 },
        { text: 'Always prioritize enterprise client requests since they pay significantly more per contract', score: 1 },
        { text: 'Treat all customer requests equally regardless of revenue contribution or strategic alignment', score: 2 },
      ],
    },
    {
      id: 'r-b2b-4', category: 'communication',
      question: 'An enterprise customer\'s procurement process requires a 6-month security review. How do you manage this?',
      options: [
        { text: 'Proactively prepare security documentation, assign a point of contact, and track milestones', score: 4 },
        { text: 'Pressure the customer to skip or shorten the review because it is delaying the deal closure', score: 1 },
        { text: 'Wait passively for the procurement team to finish and respond only when they reach out', score: 1 },
        { text: 'Deprioritize the deal entirely since six months is too long to wait for revenue recognition', score: 2 },
      ],
    },
    {
      id: 'r-b2b-5', category: 'analytics',
      question: 'Your enterprise product has low feature adoption despite positive sales feedback. How do you investigate?',
      options: [
        { text: 'Analyze usage data by persona, run customer interviews, and identify onboarding or UX gaps', score: 4 },
        { text: 'Build more features to give customers additional options and increase the chance they engage', score: 2 },
        { text: 'Ask the sales team to push customers harder on feature adoption during quarterly reviews', score: 1 },
        { text: 'Assume the product is fine since customers renewed their contracts and are paying on time', score: 1 },
      ],
    },
    {
      id: 'r-b2b-6', category: 'design',
      question: 'Enterprise customers want extensive customization, but it creates maintenance burden. How do you approach this?',
      options: [
        { text: 'Design a configurable framework with guardrails that scales across customers systematically', score: 4 },
        { text: 'Build every customization request as a one-off to keep each enterprise customer satisfied', score: 1 },
        { text: 'Offer customization only to the top five customers by revenue and decline all other requests', score: 2 },
        { text: 'Refuse all customization requests and tell customers to use the product as it was designed', score: 1 },
      ],
    },
  ],
  product_manager: [
    {
      id: 'r-pm-1', category: 'strategy',
      question: 'You\'re a new PM joining a team with no existing product documentation. What\'s your first month plan?',
      options: [
        { text: 'Write a comprehensive product strategy document before talking to any team members at all', score: 2 },
        { text: 'Start building features right away to demonstrate visible impact to the team and leadership', score: 1 },
        { text: 'Focus exclusively on team processes and sprint ceremonies to establish agile best practices', score: 2 },
        { text: 'Immerse in user research, map stakeholders, audit data, create baseline docs and quick wins', score: 4 },
      ],
    },
    {
      id: 'r-pm-2', category: 'business',
      question: 'Your product has strong engagement but monetization is flat. How do you approach this?',
      options: [
        { text: 'Focus only on engagement and growth for now since the revenue will naturally follow later', score: 2 },
        { text: 'Analyze willingness to pay, test pricing models, identify premium features from usage data', score: 4 },
        { text: 'Add advertisements everywhere across the product to generate immediate revenue from traffic', score: 1 },
        { text: 'Copy a competitor\'s monetization model directly and implement it without further validation', score: 1 },
      ],
    },
    {
      id: 'r-pm-3', category: 'agile',
      question: 'You inherit a backlog with 200+ items, many outdated. How do you manage this?',
      options: [
        { text: 'Ruthlessly triage: archive stale items, categorize by theme, reprioritize against goals', score: 4 },
        { text: 'Delete everything in the backlog completely and start fresh with a blank slate for the team', score: 2 },
        { text: 'Work through each backlog item one by one in the exact order they were originally entered', score: 1 },
        { text: 'Ask all stakeholders to re-submit their top priority requests through a new intake process', score: 2 },
      ],
    },
    {
      id: 'r-pm-4', category: 'stakeholder',
      question: 'Your cross-functional team has low morale after a failed product launch. How do you re-energize them?',
      options: [
        { text: 'Identify individuals who underperformed and address their specific shortcomings in one-on-ones', score: 1 },
        { text: 'Promise the next launch will succeed and set aggressive timelines to refocus the team energy', score: 2 },
        { text: 'Run a blameless retrospective, celebrate effort, extract lessons, and set achievable next goals', score: 4 },
        { text: 'Move on to the next project immediately without discussing the failure to avoid negativity', score: 1 },
      ],
    },
    {
      id: 'r-pm-5', category: 'design',
      question: 'You have limited user research budget. How do you still make informed product decisions?',
      options: [
        { text: 'Use guerrilla testing, analyze support tickets, leverage analytics, and do hallway usability tests', score: 4 },
        { text: 'Wait until next quarter when the research budget is available to start any discovery work', score: 1 },
        { text: 'Survey a large number of users with a generic questionnaire and base all decisions on it', score: 2 },
        { text: 'Skip user research entirely and rely on your own product judgment and industry experience', score: 1 },
      ],
    },
    {
      id: 'r-pm-6', category: 'communication',
      question: 'You need to say no to a feature request from a senior leader. How do you communicate this?',
      options: [
        { text: 'Explain the trade-offs with data, show what gets displaced, and propose alternative solutions', score: 4 },
        { text: 'Agree to the request in the meeting and quietly deprioritize it later without following up', score: 1 },
        { text: 'Defer the decision indefinitely by saying you will look into it and never circling back later', score: 2 },
        { text: 'Flatly refuse the request and say it does not align with the roadmap without further context', score: 1 },
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
