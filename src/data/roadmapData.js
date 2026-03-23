export const roleTransitions = {
  'Software Engineer': {
    fastest: 'technical_pm',
    paths: {
      technical_pm: { duration: '3-6 months', difficulty: 'Medium' },
      product_manager: { duration: '6-9 months', difficulty: 'Medium' },
      ai_pm: { duration: '4-8 months', difficulty: 'Medium-Hard' },
      platform_pm: { duration: '4-7 months', difficulty: 'Medium' },
      data_pm: { duration: '5-8 months', difficulty: 'Medium' },
      growth_pm: { duration: '6-10 months', difficulty: 'Hard' },
      design_pm: { duration: '8-12 months', difficulty: 'Hard' },
      b2b_pm: { duration: '6-10 months', difficulty: 'Hard' },
    },
  },
  'Data Analyst': {
    fastest: 'data_pm',
    paths: {
      data_pm: { duration: '3-6 months', difficulty: 'Medium' },
      growth_pm: { duration: '4-7 months', difficulty: 'Medium' },
      product_manager: { duration: '6-9 months', difficulty: 'Medium' },
      analytics: { duration: '3-5 months', difficulty: 'Easy' },
      ai_pm: { duration: '6-10 months', difficulty: 'Hard' },
      technical_pm: { duration: '7-11 months', difficulty: 'Hard' },
      design_pm: { duration: '8-12 months', difficulty: 'Hard' },
      b2b_pm: { duration: '6-9 months', difficulty: 'Medium-Hard' },
      platform_pm: { duration: '7-11 months', difficulty: 'Hard' },
    },
  },
  'Designer': {
    fastest: 'design_pm',
    paths: {
      design_pm: { duration: '3-6 months', difficulty: 'Medium' },
      product_manager: { duration: '5-8 months', difficulty: 'Medium' },
      growth_pm: { duration: '6-9 months', difficulty: 'Medium-Hard' },
      b2b_pm: { duration: '7-10 months', difficulty: 'Hard' },
      technical_pm: { duration: '9-14 months', difficulty: 'Hard' },
      data_pm: { duration: '8-12 months', difficulty: 'Hard' },
      ai_pm: { duration: '10-14 months', difficulty: 'Very Hard' },
      platform_pm: { duration: '9-13 months', difficulty: 'Hard' },
    },
  },
  'Business Analyst': {
    fastest: 'product_manager',
    paths: {
      product_manager: { duration: '3-5 months', difficulty: 'Medium' },
      b2b_pm: { duration: '3-6 months', difficulty: 'Medium' },
      growth_pm: { duration: '4-7 months', difficulty: 'Medium' },
      data_pm: { duration: '5-8 months', difficulty: 'Medium' },
      design_pm: { duration: '6-10 months', difficulty: 'Medium-Hard' },
      technical_pm: { duration: '8-12 months', difficulty: 'Hard' },
      ai_pm: { duration: '9-13 months', difficulty: 'Hard' },
      platform_pm: { duration: '8-12 months', difficulty: 'Hard' },
    },
  },
  'Marketing': {
    fastest: 'growth_pm',
    paths: {
      growth_pm: { duration: '3-6 months', difficulty: 'Medium' },
      product_manager: { duration: '5-8 months', difficulty: 'Medium' },
      b2b_pm: { duration: '5-8 months', difficulty: 'Medium' },
      design_pm: { duration: '6-9 months', difficulty: 'Medium-Hard' },
      data_pm: { duration: '7-10 months', difficulty: 'Hard' },
      technical_pm: { duration: '9-14 months', difficulty: 'Hard' },
      ai_pm: { duration: '10-14 months', difficulty: 'Very Hard' },
      platform_pm: { duration: '9-14 months', difficulty: 'Very Hard' },
    },
  },
  'Project Manager': {
    fastest: 'product_manager',
    paths: {
      product_manager: { duration: '3-5 months', difficulty: 'Medium' },
      b2b_pm: { duration: '4-6 months', difficulty: 'Medium' },
      growth_pm: { duration: '5-8 months', difficulty: 'Medium' },
      design_pm: { duration: '6-9 months', difficulty: 'Medium-Hard' },
      data_pm: { duration: '6-10 months', difficulty: 'Hard' },
      technical_pm: { duration: '7-11 months', difficulty: 'Hard' },
      ai_pm: { duration: '9-13 months', difficulty: 'Hard' },
      platform_pm: { duration: '7-11 months', difficulty: 'Hard' },
    },
  },
  'Student': {
    fastest: 'product_manager',
    paths: {
      product_manager: { duration: '6-10 months', difficulty: 'Medium-Hard' },
      growth_pm: { duration: '7-11 months', difficulty: 'Hard' },
      design_pm: { duration: '7-11 months', difficulty: 'Hard' },
      data_pm: { duration: '8-12 months', difficulty: 'Hard' },
      b2b_pm: { duration: '8-12 months', difficulty: 'Hard' },
      technical_pm: { duration: '10-14 months', difficulty: 'Very Hard' },
      ai_pm: { duration: '12-16 months', difficulty: 'Very Hard' },
      platform_pm: { duration: '10-14 months', difficulty: 'Very Hard' },
    },
  },
  'Other': {
    fastest: 'product_manager',
    paths: {
      product_manager: { duration: '6-10 months', difficulty: 'Medium-Hard' },
      growth_pm: { duration: '7-11 months', difficulty: 'Hard' },
      b2b_pm: { duration: '7-11 months', difficulty: 'Hard' },
      design_pm: { duration: '7-11 months', difficulty: 'Hard' },
      data_pm: { duration: '8-12 months', difficulty: 'Hard' },
      technical_pm: { duration: '9-13 months', difficulty: 'Hard' },
      ai_pm: { duration: '10-14 months', difficulty: 'Very Hard' },
      platform_pm: { duration: '10-14 months', difficulty: 'Very Hard' },
    },
  },
};

export const milestones = {
  product_manager: [
    {
      id: 'pm-1',
      level: 1,
      title: 'PM Foundations',
      description: 'Core product management concepts, frameworks, and mindset',
      xpReward: 500,
      courses: [
        { name: 'Become a Product Manager', platform: 'Udemy', url: 'https://www.udemy.com/course/become-a-product-manager-learn-the-skills-get-a-job/', type: 'paid' },
        { name: 'Digital Product Management', platform: 'Coursera', url: 'https://www.coursera.org/specializations/uva-darden-digital-product-management', type: 'paid' },
        { name: 'Product Management 101: Full Course', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=5nAeyqNuZYU', type: 'free' },
        { name: 'How to Land Your First PM Job', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=dWtcnnmdIsU', type: 'free' },
      ],
      quiz: [
        { q: 'What is the main role of a Product Manager?', options: ['Write code', 'Own the product vision and drive outcomes', 'Design UI', 'Manage the team schedule'], answer: 1 },
        { q: 'What does a PRD stand for?', options: ['Product Review Draft', 'Product Requirements Document', 'Project Resource Deck', 'Production Release Doc'], answer: 1 },
        { q: 'Which framework helps prioritize features by Reach, Impact, Confidence, Effort?', options: ['SWOT', 'RICE', 'MoSCoW', 'Kano'], answer: 1 },
        { q: 'What is a user story?', options: ['A marketing narrative', 'A description of functionality from the user\'s perspective', 'A bug report', 'A design spec'], answer: 1 },
        { q: 'What is product-market fit?', options: ['Having a large marketing budget', 'When a product satisfies strong market demand', 'Having many features', 'Getting press coverage'], answer: 1 },
      ],
    },
    {
      id: 'pm-2',
      level: 2,
      title: 'User Research & Discovery',
      description: 'Learn to identify user needs, conduct interviews, and validate assumptions',
      xpReward: 600,
      courses: [
        { name: 'User Research Methods', platform: 'Coursera', url: 'https://www.coursera.org/learn/research-methods', type: 'paid' },
        { name: 'Product Discovery & Validation', platform: 'Udemy', url: 'https://www.udemy.com/course/product-discovery/', type: 'paid' },
        { name: 'How to Talk to Users - Y Combinator', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=MT4Ig2uqjTc', type: 'free' },
      ],
      quiz: [
        { q: 'What is the primary goal of user interviews?', options: ['Sell the product', 'Understand user needs and pain points', 'Validate your solution', 'Get feature requests'], answer: 1 },
        { q: 'What is a Jobs-to-be-Done framework?', options: ['A hiring framework', 'Understanding what job users hire a product to do', 'Task management method', 'Sprint planning tool'], answer: 1 },
        { q: 'Which is NOT a good user research method?', options: ['Contextual inquiry', 'Surveys', 'Asking leading questions', 'A/B testing'], answer: 2 },
        { q: 'What is a persona?', options: ['Real user profile', 'Fictional representation of a user segment', 'Marketing material', 'Design template'], answer: 1 },
        { q: 'When should you validate assumptions?', options: ['After launch', 'Before building', 'Never', 'Only when stakeholders ask'], answer: 1 },
      ],
    },
    {
      id: 'pm-3',
      level: 3,
      title: 'Product Strategy & Roadmapping',
      description: 'Define vision, set strategy, and build effective roadmaps',
      xpReward: 700,
      courses: [
        { name: 'Product Strategy', platform: 'Coursera', url: 'https://www.coursera.org/learn/product-strategy', type: 'paid' },
        { name: 'Product Roadmapping', platform: 'Udemy', url: 'https://www.udemy.com/course/product-roadmap/', type: 'paid' },
        { name: 'Product Strategy - Lenny Rachitsky', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=4WiGX_KFKw8', type: 'free' },
      ],
      quiz: [
        { q: 'What should a good product roadmap communicate?', options: ['Exact ship dates', 'Strategic direction and priorities', 'Every feature ever requested', 'Technical architecture'], answer: 1 },
        { q: 'What is a North Star metric?', options: ['Revenue', 'A metric capturing core value delivered to users', 'DAU', 'NPS'], answer: 1 },
        { q: 'Vision vs Strategy — what\'s the difference?', options: ['They\'re the same thing', 'Vision is where you\'re going; strategy is how you get there', 'Strategy is long-term, vision is short-term', 'Vision is for executives, strategy is for PMs'], answer: 1 },
        { q: 'What is an outcome-based roadmap?', options: ['A list of features with dates', 'A roadmap organized around business and user outcomes', 'A Gantt chart', 'Sprint plans'], answer: 1 },
        { q: 'When should you say no to a feature request?', options: ['Never', 'When it doesn\'t align with strategy and goals', 'Always', 'Only when engineering says no'], answer: 1 },
      ],
    },
    {
      id: 'pm-4',
      level: 4,
      title: 'Metrics, Analytics & Data-Driven Decisions',
      description: 'Master product analytics, experimentation, and data-driven decision making',
      xpReward: 800,
      courses: [
        { name: 'Product Analytics', platform: 'Coursera', url: 'https://www.coursera.org/learn/product-analytics', type: 'paid' },
        { name: 'SQL for Product Managers', platform: 'Udemy', url: 'https://www.udemy.com/course/sql-for-product-managers/', type: 'paid' },
        { name: 'How to Set a Great North Star Metric', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=ZwrRJlhJBrE', type: 'free' },
      ],
      quiz: [
        { q: 'What is statistical significance in A/B testing?', options: ['Getting a large sample size', 'Confidence that results aren\'t due to chance', 'Having more metrics', 'Running the test longer'], answer: 1 },
        { q: 'Which metric best indicates product stickiness?', options: ['Page views', 'DAU/MAU ratio', 'Downloads', 'Sign-ups'], answer: 1 },
        { q: 'What is a leading indicator?', options: ['Revenue', 'A metric that predicts future outcomes', 'DAU', 'Churn rate'], answer: 1 },
        { q: 'What\'s the difference between correlation and causation?', options: ['They\'re identical', 'Correlation shows relationship; causation proves one causes the other', 'Causation is weaker than correlation', 'Correlation only applies to A/B tests'], answer: 1 },
        { q: 'What is cohort analysis?', options: ['Analyzing all users together', 'Grouping users by shared characteristics to track behavior over time', 'A survey method', 'Competitive analysis'], answer: 1 },
      ],
    },
    {
      id: 'pm-5',
      level: 5,
      title: 'Stakeholder Management & Communication',
      description: 'Lead without authority, manage stakeholders, and communicate effectively',
      xpReward: 900,
      courses: [
        { name: 'Stakeholder Management for PMs', platform: 'Udemy', url: 'https://www.udemy.com/course/stakeholder-management/', type: 'paid' },
        { name: 'Influence Without Authority', platform: 'Coursera', url: 'https://www.coursera.org/learn/influencing-people', type: 'paid' },
        { name: 'Influence Without Authority for PMs', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=idEHtrp6H18', type: 'free' },
      ],
      quiz: [
        { q: 'What does "influence without authority" mean for PMs?', options: ['PMs have no power', 'Leading teams and decisions without direct reporting authority', 'Avoiding conflict', 'Using politics'], answer: 1 },
        { q: 'How should you handle conflicting stakeholder priorities?', options: ['Pick the most senior stakeholder', 'Use data and shared goals to align', 'Avoid the conflict', 'Do both'], answer: 1 },
        { q: 'What is a RACI matrix?', options: ['A prioritization framework', 'A matrix defining Responsible, Accountable, Consulted, Informed roles', 'A risk assessment tool', 'A design framework'], answer: 1 },
        { q: 'Best practice for sharing bad news with stakeholders?', options: ['Avoid it', 'Share proactively with context, impact, and mitigation plan', 'Blame others', 'Wait until asked'], answer: 1 },
        { q: 'Why is executive summary important?', options: ['Executives like summaries', 'It communicates key points quickly to busy decision-makers', 'It\'s a formality', 'To show thoroughness'], answer: 1 },
      ],
    },
  ],
  technical_pm: [
    {
      id: 'tpm-1', level: 1, title: 'Technical Foundations',
      description: 'APIs, system design, databases, and software architecture basics',
      xpReward: 500,
      courses: [
        { name: 'CS Fundamentals for PMs', platform: 'Udemy', url: 'https://www.udemy.com/course/technical-product-manager/', type: 'paid' },
        { name: 'APIs for Product Managers', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=T5y0WKmKenQ', type: 'free' },
      ],
      quiz: [
        { q: 'What is an API?', options: ['A programming language', 'An interface for systems to communicate', 'A database', 'A UI framework'], answer: 1 },
        { q: 'What is a microservice?', options: ['A small team', 'An independently deployable service handling specific functionality', 'A mini application', 'A testing tool'], answer: 1 },
        { q: 'What does REST stand for?', options: ['Real-time State Transfer', 'Representational State Transfer', 'Remote Service Technology', 'Resource State Tracking'], answer: 1 },
        { q: 'What is latency?', options: ['Download speed', 'Time delay between request and response', 'Server capacity', 'Data storage'], answer: 1 },
        { q: 'What is a database index?', options: ['A backup', 'A data structure that improves query speed', 'A table', 'A primary key'], answer: 1 },
      ],
    },
    {
      id: 'tpm-2', level: 2, title: 'Working with Engineering Teams',
      description: 'Sprint planning, technical debt, estimation, and dev workflows',
      xpReward: 600,
      courses: [
        { name: 'Agile for Technical PMs', platform: 'Coursera', url: 'https://www.coursera.org/learn/agile-development', type: 'paid' },
        { name: 'What is a Technical Product Manager', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=pp1F8wz3WkA', type: 'free' },
      ],
      quiz: [
        { q: 'What is technical debt?', options: ['Budget overrun', 'Shortcuts in code that need future refactoring', 'Hardware costs', 'Team overtime'], answer: 1 },
        { q: 'How should a TPM handle engineer pushback on estimates?', options: ['Override them', 'Collaborate to break down tasks and understand complexity', 'Accept any estimate', 'Add buffer'], answer: 1 },
        { q: 'What is CI/CD?', options: ['Customer Interface/Design', 'Continuous Integration/Continuous Deployment', 'Code Inspection/Debug', 'Central IT/Cloud Development'], answer: 1 },
        { q: 'What is a sprint spike?', options: ['Extra work', 'Time-boxed research to reduce uncertainty', 'A bug fix sprint', 'Overtime period'], answer: 1 },
        { q: 'When should you prioritize tech debt?', options: ['Never', 'When it starts impacting velocity, reliability, or feature development', 'Every sprint', 'Only when engineers ask'], answer: 1 },
      ],
    },
    {
      id: 'tpm-3', level: 3, title: 'System Design & Architecture',
      description: 'Scalability, reliability, security, and infrastructure decisions',
      xpReward: 700,
      courses: [
        { name: 'System Design: Horizontal vs Vertical Scaling', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=xpDnVSmNFX0', type: 'free' },
        { name: 'Cloud Computing for PMs', platform: 'Udemy', url: 'https://www.udemy.com/course/cloud-computing-for-product-managers/', type: 'paid' },
      ],
      quiz: [
        { q: 'What is horizontal scaling?', options: ['Making servers bigger', 'Adding more servers to handle load', 'Optimizing code', 'Upgrading hardware'], answer: 1 },
        { q: 'What is a load balancer?', options: ['A project manager', 'A system that distributes traffic across servers', 'A database tool', 'A monitoring tool'], answer: 1 },
        { q: 'What is eventual consistency?', options: ['Always consistent', 'Data will become consistent over time across replicas', 'Never consistent', 'Consistent only at night'], answer: 1 },
        { q: 'What is a CDN?', options: ['Central Data Node', 'Content Delivery Network for faster content serving', 'Cloud Database Network', 'Code Deployment Node'], answer: 1 },
        { q: 'What is rate limiting?', options: ['Speed testing', 'Controlling the number of requests a user can make', 'Network speed', 'Database throttling'], answer: 1 },
      ],
    },
    {
      id: 'tpm-4', level: 4, title: 'Data & Machine Learning for PMs',
      description: 'Data pipelines, ML concepts, and data-informed product decisions',
      xpReward: 800,
      courses: [
        { name: 'AI/ML for Product Managers', platform: 'Coursera', url: 'https://www.coursera.org/learn/ai-for-everyone', type: 'paid' },
        { name: 'Data Science for PMs', platform: 'Udemy', url: 'https://www.udemy.com/course/data-science-for-product-managers/', type: 'paid' },
      ],
      quiz: [
        { q: 'What is supervised learning?', options: ['Learning with a teacher', 'ML trained on labeled data', 'Monitored systems', 'Manual testing'], answer: 1 },
        { q: 'What is a data pipeline?', options: ['A database', 'A series of data processing steps from source to destination', 'An API', 'A report'], answer: 1 },
        { q: 'What is overfitting?', options: ['Too much data', 'Model performs well on training data but poorly on new data', 'Not enough features', 'Fast training'], answer: 1 },
        { q: 'What is ETL?', options: ['Extract, Transform, Load', 'Evaluate, Test, Launch', 'Edit, Track, Log', 'Execute, Transfer, Link'], answer: 0 },
        { q: 'Why is bias in ML important for PMs?', options: ['It\'s not', 'Biased models can lead to unfair or harmful product outcomes', 'Only engineers worry about it', 'It improves accuracy'], answer: 1 },
      ],
    },
    {
      id: 'tpm-5', level: 5, title: 'Technical Leadership & Strategy',
      description: 'Platform strategy, build vs buy, technical vision',
      xpReward: 900,
      courses: [
        { name: 'How to Build a Product that Scales', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=r-98YRAF1dY', type: 'free' },
        { name: 'Platform Product Management', platform: 'Udemy', url: 'https://www.udemy.com/course/platform-product-management/', type: 'paid' },
      ],
      quiz: [
        { q: 'When should you build vs buy?', options: ['Always build', 'Evaluate core competency, cost, time, strategic value', 'Always buy', 'Let engineering decide'], answer: 1 },
        { q: 'What is a platform strategy?', options: ['Using AWS', 'Building products that enable an ecosystem of value creation', 'Having a website', 'Using SaaS tools'], answer: 1 },
        { q: 'What is an SLA?', options: ['Software License Agreement', 'Service Level Agreement defining expected service standards', 'System Log Analysis', 'Secure Link Access'], answer: 1 },
        { q: 'What is a technical moat?', options: ['A firewall', 'Technical advantage that\'s hard for competitors to replicate', 'Code complexity', 'Patent'], answer: 1 },
        { q: 'How do you evaluate vendor solutions?', options: ['Price only', 'Assess fit, scalability, support, integration, total cost of ownership', 'Popularity', 'Brand name'], answer: 1 },
      ],
    },
  ],
};

// For roles without custom milestones, generate from generic PM milestones
const genericMilestoneTemplate = milestones.product_manager;

export function getMilestones(roleId) {
  return milestones[roleId] || genericMilestoneTemplate;
}

export function getTransitionInfo(currentRole, targetRole) {
  const roleData = roleTransitions[currentRole] || roleTransitions['Other'];
  return roleData.paths[targetRole] || { duration: '6-12 months', difficulty: 'Medium-Hard' };
}

export function getFastestPath(currentRole) {
  const roleData = roleTransitions[currentRole] || roleTransitions['Other'];
  return roleData.fastest;
}
