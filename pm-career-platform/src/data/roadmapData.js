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
      content: [
        { heading: 'What is Product Management?', body: 'Product management is the discipline of guiding a product from conception through launch and beyond, ensuring it delivers value to both users and the business. A PM sits at the intersection of business, technology, and user experience, acting as the voice of the customer while balancing company goals. The role requires a unique blend of strategic thinking, empathy, and execution skills.' },
        { heading: 'Key Concepts', body: 'The Product Requirements Document (PRD) is a foundational artifact that outlines what you are building and why, serving as the contract between product, design, and engineering. User stories capture requirements from the end user perspective using the format "As a [user], I want [goal] so that [benefit]." Product-market fit is the holy grail for any product, meaning you have found a market with a real problem and your product solves it in a way people will pay for.' },
        { heading: 'Frameworks & Tools', body: 'RICE (Reach, Impact, Confidence, Effort) is a prioritization framework that helps you score and rank features objectively. MoSCoW (Must have, Should have, Could have, Won\'t have) is another popular method for categorizing feature priority during planning. The Kano model helps you classify features into basic expectations, performance drivers, and delighters to understand how they affect user satisfaction.' },
        { heading: 'Real-World Example', body: 'When Spotify was deciding whether to build a podcasting feature, PMs had to evaluate whether it aligned with their mission of being an audio platform, assess the market opportunity, and prioritize it against other initiatives. They used data on user listening habits, competitive analysis of dedicated podcast apps, and strategic vision to justify the investment. This is a classic example of how PMs balance user needs, business strategy, and technical feasibility.' },
        { heading: 'Key Takeaways', body: 'A PM owns the "what" and "why" of a product, not the "how." Strong PMs are defined by their ability to prioritize ruthlessly using frameworks like RICE, communicate clearly through documents like PRDs, and maintain a relentless focus on delivering user value. Start building your PM muscle by practicing writing user stories and PRDs for products you use every day.' },
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
      content: [
        { heading: 'What is User Research & Discovery?', body: 'User research is the systematic study of your target users to understand their behaviors, needs, and motivations. Discovery is the broader process of identifying problems worth solving before committing engineering resources to build solutions. Together, they form the foundation of evidence-based product development and help PMs avoid the costly mistake of building something nobody wants.' },
        { heading: 'Key Concepts', body: 'The Jobs-to-be-Done (JTBD) framework focuses on understanding the underlying "job" a user is trying to accomplish, rather than just their stated feature requests. Personas are fictional but data-driven representations of key user segments that help teams build empathy and make consistent decisions. Assumption mapping is the practice of listing your riskiest assumptions about users and systematically testing them before investing in development.' },
        { heading: 'Frameworks & Tools', body: 'User interviews are the most powerful qualitative research method, but they require careful technique to avoid leading questions and confirmation bias. Contextual inquiry involves observing users in their natural environment to understand real workflows, which often reveals needs users cannot articulate. Surveys and analytics provide quantitative data at scale, while usability testing validates whether your solution actually works for real people.' },
        { heading: 'Real-World Example', body: 'When Airbnb was struggling with low booking rates in their early days, the founders flew to New York to visit hosts and discovered that poor-quality listing photos were the main barrier. This hands-on user research led them to offer free professional photography, which doubled revenue in markets where it was deployed. The insight came not from surveys or data dashboards, but from direct observation and conversation with users in their real environment.' },
        { heading: 'Key Takeaways', body: 'Always validate your assumptions before building, as the cost of research is tiny compared to the cost of building the wrong thing. Focus on understanding problems deeply rather than jumping to solutions, and use open-ended questions in interviews to uncover insights you did not anticipate. Build a habit of talking to at least five users per week to stay connected to real user needs and pain points.' },
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
      content: [
        { heading: 'What is Product Strategy & Roadmapping?', body: 'Product strategy defines how your product will achieve the company vision by identifying which markets to serve, what value to deliver, and how to differentiate from competitors. A product roadmap is the strategic communication tool that translates your strategy into a plan of action, showing themes and priorities over time. Together, strategy and roadmapping ensure every feature you build contributes to a coherent long-term direction rather than being a random collection of requests.' },
        { heading: 'Key Concepts', body: 'Your North Star metric is the single metric that best captures the core value your product delivers to users, such as "weekly active listeners" for a music app. Vision describes the future state of the world you want to create, while strategy is the set of deliberate choices about where to play and how to win. Outcome-based roadmaps organize work around the results you want to achieve rather than listing specific features, giving teams flexibility in how they solve problems.' },
        { heading: 'Frameworks & Tools', body: 'The "Now, Next, Later" roadmap format communicates priorities without committing to specific dates, reducing the risk of missed deadlines. Opportunity Solution Trees help you map desired outcomes to the opportunities and solutions that could drive them, ensuring alignment between strategy and execution. OKRs (Objectives and Key Results) connect your roadmap to measurable goals, making it clear how each initiative contributes to the bigger picture.' },
        { heading: 'Real-World Example', body: 'Slack\'s product strategy focused on replacing internal email rather than competing with every chat app on the market. Their roadmap prioritized integrations with tools teams already used, like Google Drive and Trello, because their strategy was to become the central hub of work communication. By saying no to features like video calling initially and focusing on what made them uniquely valuable, they grew to dominate the enterprise messaging space.' },
        { heading: 'Key Takeaways', body: 'A great roadmap is a communication tool, not a project plan, and should be understandable by anyone in the organization. The most important skill in strategy is learning to say no to good ideas that do not align with your current priorities. Practice defining your North Star metric and building outcome-based roadmaps for products you use, as these are the most commonly tested skills in PM interviews.' },
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
      content: [
        { heading: 'What is Data-Driven Product Management?', body: 'Data-driven product management is the practice of using quantitative evidence to inform product decisions rather than relying on intuition or the loudest voice in the room. It involves defining the right metrics, setting up instrumentation to track them, running experiments to test hypotheses, and interpreting results to guide your next move. Being data-driven does not mean ignoring qualitative insights; it means combining both to make well-rounded decisions.' },
        { heading: 'Key Concepts', body: 'Leading indicators are metrics that predict future outcomes, like activation rate predicting long-term retention, while lagging indicators like revenue reflect past performance. The DAU/MAU ratio measures product stickiness by showing what percentage of monthly users come back daily. Cohort analysis groups users by a shared characteristic, such as sign-up week, so you can track how behavior changes over time and measure the true impact of product changes.' },
        { heading: 'Frameworks & Tools', body: 'A/B testing is the gold standard for establishing causation by randomly assigning users to control and variant groups and measuring the difference. The HEART framework (Happiness, Engagement, Adoption, Retention, Task success) by Google provides a comprehensive set of user-centered metrics. Funnel analysis tracks conversion rates through sequential steps, helping you identify exactly where users drop off and where to focus optimization efforts.' },
        { heading: 'Real-World Example', body: 'Netflix uses sophisticated A/B testing for nearly every change, from thumbnail images to recommendation algorithms, running hundreds of experiments simultaneously. They discovered that personalized artwork for the same title could increase click-through rates by 20-30%, a finding that would have been impossible without rigorous experimentation. This data-driven approach allows them to make confident decisions at scale while avoiding the trap of relying on executive opinions about what "looks better."' },
        { heading: 'Key Takeaways', body: 'Always distinguish between correlation and causation, as acting on false causal claims can lead to wasted resources and wrong product decisions. Learn basic SQL so you can query data yourself rather than waiting for analyst support, which dramatically speeds up your decision-making cycle. Set up a metrics framework for your product that includes both leading and lagging indicators, and review them weekly to catch trends early.' },
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
      content: [
        { heading: 'What is Stakeholder Management?', body: 'Stakeholder management is the art of identifying, understanding, and effectively working with everyone who has an interest in or influence over your product. For PMs, this includes engineering leads, designers, executives, sales teams, customer support, and external partners. Since PMs rarely have direct authority over these groups, success depends on building trust, communicating clearly, and aligning everyone around shared goals.' },
        { heading: 'Key Concepts', body: 'Influence without authority is the defining leadership challenge for PMs, requiring you to drive outcomes through persuasion, data, and relationship-building rather than positional power. The RACI matrix (Responsible, Accountable, Consulted, Informed) clarifies roles and prevents confusion on cross-functional initiatives. Stakeholder mapping helps you identify who has high power and high interest in your product decisions, so you can invest your communication effort where it matters most.' },
        { heading: 'Frameworks & Tools', body: 'The pyramid principle for communication structures your message with the conclusion first, followed by supporting arguments and details, which respects busy stakeholders\' time. Regular stakeholder syncs and written status updates create transparency and reduce the chance of surprises. Decision logs document what was decided, why, and by whom, which prevents revisiting settled issues and builds organizational trust in the product team.' },
        { heading: 'Real-World Example', body: 'When a PM at a fintech company needed to delay a high-profile launch due to compliance issues, they proactively scheduled meetings with each affected stakeholder before the all-hands announcement. They presented the problem, the impact on timelines, and a concrete mitigation plan with revised dates and interim milestones. By being transparent and solution-oriented rather than defensive, they maintained stakeholder trust and actually strengthened their credibility as a reliable leader.' },
        { heading: 'Key Takeaways', body: 'Proactive communication is always better than reactive communication, especially when delivering bad news to stakeholders. Invest in building genuine relationships with your cross-functional partners before you need something from them, as trust is built over time. Practice writing concise executive summaries and framing recommendations with clear trade-offs, as these communication skills differentiate senior PMs from junior ones.' },
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
      content: [
        { heading: 'What are Technical Foundations for PMs?', body: 'Technical foundations give PMs the vocabulary and mental models needed to collaborate effectively with engineering teams and make informed product decisions. You do not need to write production code, but you must understand how software systems are built, how data flows between components, and what trade-offs engineers face. This knowledge allows you to ask the right questions, evaluate technical proposals, and avoid committing to timelines or features that are architecturally infeasible.' },
        { heading: 'Key Concepts', body: 'An API (Application Programming Interface) is a contract that defines how two software systems communicate, and understanding APIs is critical because most modern products are built by composing multiple services together. Databases store and retrieve your product\'s data, and the choice between relational databases (SQL) and non-relational databases (NoSQL) affects performance, scalability, and data modeling. Latency is the time it takes for a request to travel to a server and back, and it directly impacts user experience since users abandon pages that take more than a few seconds to load.' },
        { heading: 'Frameworks & Tools', body: 'REST APIs use standard HTTP methods (GET, POST, PUT, DELETE) and are the most common way web and mobile applications communicate with backend services. Microservices architecture breaks a large application into small, independently deployable services, which improves scalability but adds complexity in coordination and debugging. Understanding the basics of client-server architecture helps you reason about where logic should live, what happens when the network fails, and how to design for offline scenarios.' },
        { heading: 'Real-World Example', body: 'When Google Maps loads directions on your phone, the app makes API calls to multiple backend services: one for routing, one for real-time traffic data, one for map tile rendering, and one for place information. A technical PM working on this product needs to understand these service boundaries to scope features properly, like knowing that adding "avoid toll roads" requires changes to the routing service but not the map rendering service. This architectural awareness prevents scope creep and helps set accurate timelines.' },
        { heading: 'Key Takeaways', body: 'You do not need to be an engineer, but you must speak their language well enough to have productive technical discussions and earn their respect. Focus on understanding system boundaries, data flow, and the trade-offs between performance, cost, and complexity. Start by reading API documentation for products you use, inspecting network requests in your browser developer tools, and asking engineers to walk you through architecture diagrams.' },
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
      content: [
        { heading: 'What is Working with Engineering Teams?', body: 'Working effectively with engineering teams is perhaps the most important day-to-day skill for a technical PM. It involves understanding agile development processes, participating in sprint ceremonies, helping engineers break down ambiguous problems, and fostering a collaborative relationship built on mutual respect. The goal is to be a force multiplier for your engineering team, removing blockers and providing clarity so they can do their best work.' },
        { heading: 'Key Concepts', body: 'Technical debt refers to the accumulated cost of shortcuts and quick fixes in the codebase that slow down future development, and PMs must balance paying it down against shipping new features. Sprint planning involves selecting and committing to a set of work items that the team can realistically complete in a two-week cycle. CI/CD (Continuous Integration/Continuous Deployment) is the practice of automatically testing and deploying code changes, which reduces risk and accelerates delivery when implemented well.' },
        { heading: 'Frameworks & Tools', body: 'Story point estimation helps teams assess relative complexity of tasks without getting bogged down in exact hour counts, and techniques like planning poker build consensus. Sprint spikes are time-boxed research tasks that reduce uncertainty on technically risky items before the team commits to building them. Retrospectives at the end of each sprint create a structured space for the team to improve their process, and a good PM actively participates in driving action items from retros.' },
        { heading: 'Real-World Example', body: 'A technical PM at an e-commerce company noticed that sprint velocity had been declining for three consecutive sprints despite no change in team size. By reviewing the engineering team\'s retrospective notes and having one-on-one conversations, they discovered that accumulated tech debt in the payment processing module was causing every new feature to take twice as long. They worked with the engineering lead to dedicate 30% of the next two sprints to refactoring, which restored velocity and reduced production incidents.' },
        { heading: 'Key Takeaways', body: 'Never override engineering estimates; instead, collaborate to break down tasks and understand the complexity driving those estimates. Treat technical debt as a product management problem, not just an engineering concern, because it directly impacts your ability to ship features and maintain reliability. Build trust with your engineering team by being transparent about priorities, following through on commitments, and protecting their time from unnecessary meetings and scope changes.' },
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
      content: [
        { heading: 'What is System Design & Architecture?', body: 'System design is the process of defining the components, interfaces, and data flows of a software system to satisfy specific requirements around performance, scalability, and reliability. As a technical PM, you need to understand architectural patterns well enough to participate in design reviews, ask informed questions, and anticipate how architecture choices affect product capabilities. You are not expected to draw system diagrams from scratch, but you must be able to read them and understand the trade-offs involved.' },
        { heading: 'Key Concepts', body: 'Horizontal scaling means adding more machines to handle increased load, while vertical scaling means making existing machines more powerful. Each approach has trade-offs in cost, complexity, and reliability. Eventual consistency is a design choice where data across distributed systems may be temporarily out of sync but will converge over time, which is acceptable for many use cases like social media feeds but not for banking transactions. Caching stores frequently accessed data closer to the user to reduce latency and server load.' },
        { heading: 'Frameworks & Tools', body: 'CDNs (Content Delivery Networks) serve static content from servers geographically close to users, dramatically improving load times for global products. Load balancers distribute incoming traffic across multiple servers to prevent any single server from becoming overwhelmed. Rate limiting protects your system from abuse by capping the number of requests a client can make in a given time period, which is essential for APIs and public-facing services.' },
        { heading: 'Real-World Example', body: 'When Twitter experienced the "fail whale" era of frequent outages, it was because their original monolithic architecture could not handle the explosive growth in tweets and user activity. They eventually re-architected to a microservices-based system with dedicated services for the timeline, tweet storage, and user graph, along with aggressive caching and a CDN for media. As a PM, understanding this kind of scaling journey helps you anticipate when architectural investments are needed and advocate for them before they become emergencies.' },
        { heading: 'Key Takeaways', body: 'Every architecture decision involves trade-offs between consistency, availability, and partition tolerance, as described by the CAP theorem. PMs should understand these trade-offs because they directly affect product behavior and user experience, like whether a user sees stale data or experiences downtime. Practice by studying how products you use handle scale, asking your engineers about the architecture of your current system, and reading post-mortems of major outages.' },
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
      content: [
        { heading: 'What is Data & ML for PMs?', body: 'Data and machine learning literacy is increasingly essential for technical PMs as more products incorporate intelligent features like recommendations, search ranking, fraud detection, and personalization. You need to understand how data flows through your organization, what machine learning can and cannot do, and how to set realistic expectations for ML-powered features. This does not mean you need to train models yourself, but you must be able to evaluate ML proposals, define success metrics, and manage the unique risks of AI-driven products.' },
        { heading: 'Key Concepts', body: 'Supervised learning trains models on labeled data where the correct answer is known, like classifying emails as spam or not spam based on historical examples. Data pipelines are the automated workflows that extract data from various sources, transform it into usable formats, and load it into systems where it can be analyzed or used for model training (ETL). Overfitting occurs when a model memorizes training data rather than learning generalizable patterns, resulting in poor performance on new, unseen data.' },
        { heading: 'Frameworks & Tools', body: 'The ML product lifecycle differs from traditional software because models need continuous retraining as data distributions change over time, a phenomenon called data drift. Precision and recall are key metrics for evaluating ML models: precision measures how many of the model\'s positive predictions were correct, while recall measures how many actual positives the model caught. A/B testing ML features requires special care because model performance can vary across different user segments and edge cases.' },
        { heading: 'Real-World Example', body: 'Amazon\'s recommendation engine generates approximately 35% of the company\'s total revenue by using collaborative filtering and deep learning to suggest products based on browsing history, purchase patterns, and similar users. However, when Amazon tried to use ML for resume screening, the model exhibited gender bias because it was trained on historically male-dominated hiring data. This example illustrates both the enormous potential and the serious risks of ML products, and why PMs must actively monitor for bias and fairness.' },
        { heading: 'Key Takeaways', body: 'ML is not magic; it requires high-quality labeled data, clear success metrics, and ongoing monitoring to be effective in production. As a PM, your job is to define what success looks like for an ML feature, ensure the training data is representative and unbiased, and plan for graceful degradation when the model gets it wrong. Start building your data intuition by learning basic SQL, understanding your product\'s data model, and asking your data science team to walk you through how existing models work.' },
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
      content: [
        { heading: 'What is Technical Leadership & Strategy?', body: 'Technical leadership for PMs means setting the technical direction of your product area, making high-stakes architecture and platform decisions, and building a technical vision that guides the engineering organization over multiple years. At this level, you are not just managing features but shaping the technical foundation that determines what your product can and cannot become. This requires deep trust with engineering leadership, strong strategic thinking, and the ability to translate business needs into technical investments.' },
        { heading: 'Key Concepts', body: 'The build vs buy decision is one of the most consequential choices a technical PM makes, weighing the control and customization of building in-house against the speed and lower maintenance cost of purchasing a vendor solution. Platform strategy involves creating a foundation that other teams, products, or external developers can build upon, generating network effects and ecosystem value. SLAs (Service Level Agreements) define the expected reliability and performance standards for your product, typically expressed as uptime percentages like 99.9% availability.' },
        { heading: 'Frameworks & Tools', body: 'A technical moat is a sustainable competitive advantage rooted in technology, such as proprietary data, network effects, or switching costs that make it difficult for competitors to replicate your product. Total cost of ownership (TCO) analysis evaluates not just the upfront price of a solution but ongoing maintenance, integration, scaling costs, and opportunity costs over its full lifecycle. Technology radar and architecture review boards help organizations make consistent technology choices and avoid fragmentation across teams.' },
        { heading: 'Real-World Example', body: 'Stripe\'s platform strategy transformed them from a simple payment processor into the financial infrastructure layer for the internet. By building a developer-first API platform with extensive documentation and enabling third-party integrations, they created massive switching costs and network effects. Their technical PMs had to make critical build-vs-buy decisions on fraud detection (built in-house because it was core to their value proposition) versus tax calculation (acquired a company because it was adjacent but not core).' },
        { heading: 'Key Takeaways', body: 'Build in-house when the capability is core to your competitive advantage and buy when it is commodity infrastructure that others have already solved well. Develop a technical vision document that articulates where your platform needs to be in two to three years and the key investments required to get there. Senior technical PMs differentiate themselves by their ability to make sound long-term technical bets, communicate technical strategy to non-technical executives, and build partnerships with engineering leaders based on shared ownership of outcomes.' },
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
