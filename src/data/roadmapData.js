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

export const technicalReadinessMilestones = {
  product_manager: {
    id: 'tech-readiness-product_manager',
    title: 'Technical Readiness',
    description: 'Understand APIs, read tech specs, and collaborate effectively with engineering',
    xpReward: 750,
    courses: [
      { name: 'Technical Skills for Non-Technical PMs', platform: 'Udemy', url: 'https://www.udemy.com/course/technical-product-manager/', type: 'paid' },
      { name: 'APIs for Product Managers', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=T5y0WKmKenQ', type: 'free' },
      { name: 'SQL for Product Managers', platform: 'Udemy', url: 'https://www.udemy.com/course/sql-for-product-managers/', type: 'paid' },
      { name: 'How to Write a Technical Spec', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=a4L9GhldTHo', type: 'free' },
    ],
    quiz: [
      { q: 'What does an API endpoint do?', options: ['Stores data permanently', 'Exposes a specific function or resource for other systems to use', 'Renders the UI', 'Manages user sessions'], answer: 1 },
      { q: 'A PM writing a technical spec should include:', options: ['Line-by-line code instructions', 'Requirements, constraints, and success criteria — not implementation details', 'Only wireframes', 'The full database schema'], answer: 1 },
      { q: 'What is the best way to handle technical debt as a generalist PM?', options: ['Ignore it — that\'s engineering\'s job', 'Prioritize it when it threatens velocity, reliability, or user experience', 'Fix all debt before shipping features', 'Delegate entirely to the tech lead'], answer: 1 },
      { q: 'Which SQL clause filters rows after aggregation?', options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'], answer: 1 },
      { q: 'What does "latency" mean in a product context?', options: ['Server downtime', 'Time delay experienced by the user', 'Database size', 'Number of API calls'], answer: 1 },
    ],
  },
  technical_pm: {
    id: 'tech-readiness-technical_pm',
    title: 'Technical Readiness',
    description: 'Master distributed systems, cloud architecture, and ML pipeline decisions',
    xpReward: 750,
    courses: [
      { name: 'System Design Interview Course', platform: 'Udemy', url: 'https://www.udemy.com/course/system-design-interview-prep/', type: 'paid' },
      { name: 'Cloud Architecture for PMs', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=M988_fsOSWo', type: 'free' },
      { name: 'Distributed Systems Explained', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=UEAMfLPZZhE', type: 'free' },
    ],
    quiz: [
      { q: 'What is the CAP theorem?', options: ['A security standard', 'A distributed system can guarantee only 2 of: Consistency, Availability, Partition tolerance', 'A cloud pricing model', 'A database indexing strategy'], answer: 1 },
      { q: 'When would you choose a NoSQL database over SQL?', options: ['Always', 'When data is highly unstructured, schema changes frequently, or scale demands it', 'Never', 'Only for analytics'], answer: 1 },
      { q: 'What is a message queue used for?', options: ['Storing emails', 'Decoupling services and handling asynchronous workloads', 'Caching responses', 'Load balancing'], answer: 1 },
      { q: 'What does "idempotency" mean in API design?', options: ['The API is fast', 'Making the same request multiple times produces the same result', 'The API requires authentication', 'The API is RESTful'], answer: 1 },
      { q: 'What is the primary benefit of containerization (e.g., Docker)?', options: ['Faster internet', 'Consistent environments across dev, staging, and production', 'Better UI rendering', 'Cheaper cloud bills'], answer: 1 },
    ],
  },
  data_pm: {
    id: 'tech-readiness-data_pm',
    title: 'Technical Readiness',
    description: 'SQL proficiency, data pipelines, BI tools, and experiment design for data products',
    xpReward: 750,
    courses: [
      { name: 'Advanced SQL for Data Analysis', platform: 'Coursera', url: 'https://www.coursera.org/learn/sql-for-data-science', type: 'paid' },
      { name: 'Data Engineering for PMs', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=Mzm6mVDhKpU', type: 'free' },
      { name: 'Intro to dbt (Data Build Tool)', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=5rNquRnNb4E', type: 'free' },
    ],
    quiz: [
      { q: 'What is a data warehouse?', options: ['A place to store physical servers', 'A centralised repository for structured, historical data used for analytics', 'A real-time database', 'A backup system'], answer: 1 },
      { q: 'What does a window function do in SQL?', options: ['Opens a new browser window', 'Performs calculations across rows related to the current row without collapsing them', 'Filters null values', 'Joins two tables'], answer: 1 },
      { q: 'What is data lineage?', options: ['Who owns the data', 'The ability to trace the origin and transformation of data through a pipeline', 'A data privacy law', 'A BI chart type'], answer: 1 },
      { q: 'What is the purpose of A/B test holdout groups?', options: ['To test UI designs', 'To measure the long-term impact of a feature by keeping a group unexposed', 'To reduce experiment costs', 'To test mobile vs desktop'], answer: 1 },
      { q: 'Which tool is commonly used for self-serve BI dashboards?', options: ['Docker', 'Looker / Tableau', 'Redis', 'Kafka'], answer: 1 },
    ],
  },
  growth_pm: {
    id: 'tech-readiness-growth_pm',
    title: 'Technical Readiness',
    description: 'Analytics instrumentation, A/B testing platforms, and funnel tracking implementation',
    xpReward: 750,
    courses: [
      { name: 'Growth Analytics with Amplitude', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=Rl6t6yJOFnY', type: 'free' },
      { name: 'A/B Testing Mastery', platform: 'Udemy', url: 'https://www.udemy.com/course/ab-testing/', type: 'paid' },
      { name: 'Event Tracking for Product Teams', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=i7MqBKVLhTg', type: 'free' },
    ],
    quiz: [
      { q: 'What is event tracking in analytics?', options: ['Tracking calendar events', 'Logging specific user actions (clicks, page views, conversions) for analysis', 'Monitoring server events', 'Tracking marketing campaigns'], answer: 1 },
      { q: 'What is multi-touch attribution?', options: ['Tracking touchscreen inputs', 'Assigning conversion credit across multiple marketing or product touchpoints', 'A UI interaction pattern', 'A referral program model'], answer: 1 },
      { q: 'What is the minimum detectable effect in an A/B test?', options: ['The maximum improvement possible', 'The smallest change in a metric the test is powered to detect', 'The test duration', 'The sample size'], answer: 1 },
      { q: 'What does "novelty effect" mean in growth experiments?', options: ['A new feature always wins', 'Users engage with new things temporarily, inflating early metrics', 'Growth plateaus after launch', 'Users ignore new features'], answer: 1 },
      { q: 'What is a funnel drop-off analysis?', options: ['Analysing server logs', 'Identifying where users abandon a multi-step flow', 'Tracking revenue loss', 'A churn prediction model'], answer: 1 },
    ],
  },
  design_pm: {
    id: 'tech-readiness-design_pm',
    title: 'Technical Readiness',
    description: 'Design tools, accessibility standards, design systems, and front-end basics for PMs',
    xpReward: 750,
    courses: [
      { name: 'Figma for Product Managers', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8', type: 'free' },
      { name: 'Web Accessibility (WCAG) Basics', platform: 'Coursera', url: 'https://www.coursera.org/learn/web-accessibility', type: 'paid' },
      { name: 'Design Systems 101', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=EK-pHkc5EL4', type: 'free' },
    ],
    quiz: [
      { q: 'What is a design system?', options: ['A project management tool', 'A shared library of reusable UI components and guidelines for consistent product design', 'A design file format', 'A CSS framework'], answer: 1 },
      { q: 'What does WCAG stand for?', options: ['Web Content Accessibility Guidelines', 'Web Component Architecture Guide', 'Web CSS Accessibility Grammar', 'Web Content Alignment Goals'], answer: 0 },
      { q: 'What is the purpose of a component\'s "variant" in Figma?', options: ['To create animations', 'To define multiple states or configurations of the same component', 'To set typography', 'To export assets'], answer: 1 },
      { q: 'What is a "contrast ratio" in accessibility?', options: ['Image resolution ratio', 'The difference in luminance between text and background to ensure readability', 'Screen pixel density', 'Font size comparison'], answer: 1 },
      { q: 'What does "responsive design" mean?', options: ['Fast loading pages', 'Layouts that adapt fluidly to different screen sizes and devices', 'Interactive animations', 'Accessible colour palettes'], answer: 1 },
    ],
  },
  ai_pm: {
    id: 'tech-readiness-ai_pm',
    title: 'Technical Readiness',
    description: 'ML fundamentals, LLM capabilities, prompt engineering, and responsible AI for product decisions',
    xpReward: 750,
    courses: [
      { name: 'AI for Everyone - Andrew Ng', platform: 'Coursera', url: 'https://www.coursera.org/learn/ai-for-everyone', type: 'paid' },
      { name: 'Prompt Engineering for Developers', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=_ZvnD73m40o', type: 'free' },
      { name: 'LLMs Explained for PMs', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=osKyvYJ3PRM', type: 'free' },
    ],
    quiz: [
      { q: 'What is "hallucination" in LLMs?', options: ['A visualisation feature', 'When a model generates plausible but factually incorrect output', 'A training data issue only', 'A prompt engineering technique'], answer: 1 },
      { q: 'What is RAG (Retrieval-Augmented Generation)?', options: ['A reinforcement learning method', 'Combining a retrieval system with a generative model to ground answers in real data', 'A model fine-tuning technique', 'An image generation method'], answer: 1 },
      { q: 'What is the difference between fine-tuning and prompt engineering?', options: ['They are the same', 'Fine-tuning updates model weights; prompt engineering guides behaviour without changing the model', 'Prompt engineering is more expensive', 'Fine-tuning only works for images'], answer: 1 },
      { q: 'What is a "token" in the context of LLMs?', options: ['A security credential', 'A unit of text (roughly a word or sub-word) the model processes', 'A payment unit', 'An API key'], answer: 1 },
      { q: 'Why is AI bias a product concern?', options: ['It is only an engineering issue', 'Biased model outputs can cause unfair user experiences and legal/reputational risk', 'Bias improves model accuracy', 'It only affects enterprise products'], answer: 1 },
    ],
  },
  platform_pm: {
    id: 'tech-readiness-platform_pm',
    title: 'Technical Readiness',
    description: 'API design, developer experience, authentication standards, and platform architecture patterns',
    xpReward: 750,
    courses: [
      { name: 'API Design Best Practices', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=_gQaygjm_hg', type: 'free' },
      { name: 'Developer Experience (DX) for PMs', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=ERCU7wFxvsg', type: 'free' },
      { name: 'OAuth and Authentication for PMs', platform: 'Udemy', url: 'https://www.udemy.com/course/oauth-2-simplified/', type: 'paid' },
    ],
    quiz: [
      { q: 'What is the difference between REST and GraphQL?', options: ['They are the same', 'REST uses fixed endpoints; GraphQL lets clients request exactly the data they need', 'GraphQL is only for mobile', 'REST is newer than GraphQL'], answer: 1 },
      { q: 'What is OAuth 2.0 used for?', options: ['Encrypting databases', 'Delegating authorisation so users can grant apps limited access to their accounts', 'Storing API keys', 'Rate limiting APIs'], answer: 1 },
      { q: 'What is API versioning important for?', options: ['Reducing server costs', 'Allowing backward-compatible changes without breaking existing integrations', 'Improving API speed', 'Tracking API usage'], answer: 1 },
      { q: 'What is a webhook?', options: ['A type of API endpoint', 'A server-to-server callback triggered by an event in real time', 'A browser feature', 'An authentication token'], answer: 1 },
      { q: 'What makes a great developer experience (DX)?', options: ['Complex documentation', 'Clear docs, fast onboarding, predictable APIs, and helpful error messages', 'Many endpoints', 'Enterprise-only access'], answer: 1 },
    ],
  },
  b2b_pm: {
    id: 'tech-readiness-b2b_pm',
    title: 'Technical Readiness',
    description: 'Enterprise integrations, SaaS architecture, security compliance, and SSO for B2B products',
    xpReward: 750,
    courses: [
      { name: 'SaaS Architecture for PMs', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=qjFOlEIqCkU', type: 'free' },
      { name: 'Enterprise Security & Compliance Basics', platform: 'Coursera', url: 'https://www.coursera.org/learn/information-security-data', type: 'paid' },
      { name: 'SSO and Identity for Product Managers', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=996OiexHze0', type: 'free' },
    ],
    quiz: [
      { q: 'What does SSO (Single Sign-On) solve for enterprise customers?', options: ['Faster page loads', 'Centralised identity management so users log in once across multiple apps', 'Database synchronisation', 'API rate limiting'], answer: 1 },
      { q: 'What is SOC 2 compliance?', options: ['A software development standard', 'A security framework auditing a company\'s controls around data security and availability', 'A SaaS pricing model', 'A product certification'], answer: 1 },
      { q: 'What is multi-tenancy in SaaS?', options: ['Having multiple pricing tiers', 'A single software instance serving multiple customer organisations with data isolation', 'Running on multiple clouds', 'Supporting multiple languages'], answer: 1 },
      { q: 'Why do enterprise customers care about data residency?', options: ['For performance reasons only', 'Regulations may require customer data to be stored in specific geographic regions', 'It reduces storage costs', 'It improves uptime'], answer: 1 },
      { q: 'What is an SLA in B2B contexts?', options: ['Sales Lead Agreement', 'A contractual commitment on service uptime, response times, and support standards', 'Software Licensing Agreement', 'System Load Analysis'], answer: 1 },
    ],
  },
};

export function getTechnicalReadinessMilestone(roleId) {
  return technicalReadinessMilestones[roleId] || technicalReadinessMilestones.product_manager;
}

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
