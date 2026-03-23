import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { pmArticles, caseStudies, mockTests, brandingStrategies, companyQuestionBank } from '../data/labsData';
import {
  BookOpen, FlaskConical, ClipboardCheck, Megaphone, Building2,
  ExternalLink, Clock, ChevronDown, ChevronUp, CheckCircle,
  Star, Lightbulb, Tag, BarChart3, MessageSquare, PenTool, Brain, Users
} from 'lucide-react';

const tabs = [
  { id: 'articles', label: 'Articles', icon: BookOpen },
  { id: 'cases', label: 'Case Studies', icon: FlaskConical },
  { id: 'tests', label: 'Mock Tests', icon: ClipboardCheck },
  { id: 'companies', label: 'Company Prep', icon: Building2 },
  { id: 'branding', label: 'Personal Branding', icon: Megaphone },
];

const questionTypeIcons = {
  'product-design': { icon: PenTool, label: 'Product Design', color: '#6366f1' },
  'estimation': { icon: BarChart3, label: 'Estimation', color: '#f59e0b' },
  'analytical': { icon: Brain, label: 'Analytical', color: '#10b981' },
  'strategy': { icon: Star, label: 'Strategy', color: '#8b5cf6' },
  'behavioral': { icon: Users, label: 'Behavioral', color: '#ec4899' },
  'metrics': { icon: BarChart3, label: 'Metrics', color: '#14b8a6' },
  'execution': { icon: CheckCircle, label: 'Execution', color: '#f97316' },
  'writing': { icon: PenTool, label: 'Writing', color: '#6366f1' },
};

const difficultyColors = {
  'Easy': '#10b981',
  'Medium': '#f59e0b',
  'Hard': '#ef4444',
};

export default function Labs() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('articles');
  const [expandedItem, setExpandedItem] = useState(null);
  const [mockTestMode, setMockTestMode] = useState(null);
  const [mtAnswers, setMtAnswers] = useState({});
  const [mtSubmitted, setMtSubmitted] = useState(false);

  // Company prep state
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [companyFilter, setCompanyFilter] = useState('all'); // question type filter

  const labsProgress = state.labsProgress || {};

  const markArticleRead = (id) => {
    dispatch({
      type: 'UPDATE_LABS_PROGRESS',
      payload: { [`article-${id}`]: true },
    });
  };

  const handleMockTestSubmit = () => {
    const test = mockTestMode;
    const mcQuestions = test.testQuestions.filter(q => q.type === 'multiple-choice');
    const correct = mcQuestions.reduce((count, q, i) => {
      const qIndex = test.testQuestions.indexOf(q);
      return count + (mtAnswers[qIndex] === q.answer ? 1 : 0);
    }, 0);
    const score = mcQuestions.length > 0 ? Math.round((correct / mcQuestions.length) * 100) : 100;

    dispatch({
      type: 'UPDATE_LABS_PROGRESS',
      payload: { [`test-${test.id}`]: { score, completed: true } },
    });
    setMtSubmitted(true);
  };

  if (mockTestMode && !mtSubmitted) {
    return (
      <div className="page-container">
        <h2>📝 {mockTestMode.title}</h2>
        <p className="test-info"><Clock size={16} /> {mockTestMode.timeLimit}</p>

        {mockTestMode.testQuestions.map((q, i) => (
          <div key={i} className="mq-card">
            <h4>Q{i + 1}. {q.q}</h4>
            {q.type === 'multiple-choice' ? (
              <div className="mq-options">
                {q.options.map((opt, j) => (
                  <button
                    key={j}
                    className={`mq-option ${mtAnswers[i] === j ? 'selected' : ''}`}
                    onClick={() => setMtAnswers(prev => ({ ...prev, [i]: j }))}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + j)}</span>
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <textarea
                className="open-ended-input"
                placeholder="Type your answer here... (This is for practice — self-evaluate your response)"
                rows={4}
                value={mtAnswers[i] || ''}
                onChange={e => setMtAnswers(prev => ({ ...prev, [i]: e.target.value }))}
              />
            )}
          </div>
        ))}

        <div className="quiz-actions">
          <button className="btn-secondary" onClick={() => { setMockTestMode(null); setMtAnswers({}); }}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleMockTestSubmit}>
            Submit Test
          </button>
        </div>
      </div>
    );
  }

  if (mtSubmitted) {
    const result = labsProgress[`test-${mockTestMode.id}`];
    return (
      <div className="page-container center-content">
        <div className="quiz-result-card passed">
          <CheckCircle size={60} color="#10b981" />
          <h2>Test Complete!</h2>
          <p>Multiple choice score: <strong>{result?.score}%</strong></p>
          <p className="test-note">For open-ended questions, compare your answers with best practices and PM frameworks.</p>
          <button className="btn-primary" onClick={() => { setMockTestMode(null); setMtSubmitted(false); setMtAnswers({}); }}>
            Back to Labs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Practical Labs</h1>
      <p className="page-subtitle">Build real PM skills through articles, case studies, mock tests, and personal branding.</p>

      <div className="tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="tab-content">
        {activeTab === 'articles' && (
          <div className="articles-grid">
            {pmArticles.map(article => (
              <div key={article.id} className={`article-card ${labsProgress[`article-${article.id}`] ? 'read' : ''}`}>
                <div className="article-category">{article.category}</div>
                <h3>{article.title}</h3>
                <p className="article-author">by {article.author}</p>
                <p>{article.description}</p>
                <div className="article-footer">
                  <span><Clock size={14} /> {article.readTime}</span>
                  <div className="article-actions">
                    {labsProgress[`article-${article.id}`] && (
                      <span className="read-badge"><CheckCircle size={14} /> Read</span>
                    )}
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-small"
                      onClick={() => markArticleRead(article.id)}
                    >
                      Read <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="cases-list">
            {caseStudies.map(cs => (
              <div key={cs.id} className="case-card">
                <div className="case-header" onClick={() => setExpandedItem(expandedItem === cs.id ? null : cs.id)}>
                  <div>
                    <div className="case-meta">
                      <span className={`difficulty ${cs.difficulty.toLowerCase()}`}>{cs.difficulty}</span>
                      <span className="case-type">{cs.type}</span>
                      <span><Clock size={14} /> {cs.timeLimit}</span>
                    </div>
                    <h3>{cs.title}</h3>
                    <p>{cs.description}</p>
                  </div>
                  {expandedItem === cs.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {expandedItem === cs.id && (
                  <div className="case-details">
                    <div className="case-framework">
                      <h4><Star size={16} /> Framework</h4>
                      <pre>{cs.framework}</pre>
                    </div>
                    <div className="case-hints">
                      <h4><Lightbulb size={16} /> Hints</h4>
                      <ul>
                        {cs.hints.map((hint, i) => (
                          <li key={i}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="tests-grid">
            {mockTests.map(test => {
              const result = labsProgress[`test-${test.id}`];
              return (
                <div key={test.id} className={`test-card ${result?.completed ? 'completed' : ''}`}>
                  <div className="test-category">{test.category}</div>
                  <h3>{test.title}</h3>
                  <div className="test-meta">
                    <span>{test.questions} questions</span>
                    <span><Clock size={14} /> {test.timeLimit}</span>
                  </div>
                  {result?.completed && (
                    <div className="test-score">
                      <CheckCircle size={16} color="#10b981" />
                      Score: {result.score}%
                    </div>
                  )}
                  <button
                    className="btn-primary"
                    onClick={() => { setMockTestMode(test); setMtAnswers({}); setMtSubmitted(false); }}
                  >
                    {result?.completed ? 'Retake' : 'Start'} Test
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'companies' && !selectedCompany && (
          <div className="company-grid">
            {Object.entries(companyQuestionBank).map(([key, company]) => (
              <div
                key={key}
                className="company-card"
                onClick={() => { setSelectedCompany(key); setExpandedQuestion(null); setCompanyFilter('all'); }}
              >
                <div className="company-logo" style={{ background: company.color }}>
                  {company.logo || company.name[0]}
                </div>
                <div className="company-card-info">
                  <h3>{company.name}</h3>
                  <div className="company-programs">
                    {company.programs.map((p, i) => (
                      <span key={i} className="program-tag">{p}</span>
                    ))}
                  </div>
                  <p className="company-q-count">{company.questions.length} interview questions</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'companies' && selectedCompany && (() => {
          const company = companyQuestionBank[selectedCompany];
          const filteredQuestions = companyFilter === 'all'
            ? company.questions
            : company.questions.filter(q => q.type === companyFilter);
          const questionTypes = [...new Set(company.questions.map(q => q.type))];

          return (
            <div className="company-detail">
              <button className="btn-back" onClick={() => setSelectedCompany(null)}>
                ← All Companies
              </button>

              <div className="company-detail-header">
                <div className="company-logo large" style={{ background: company.color }}>
                  {company.logo || company.name[0]}
                </div>
                <div>
                  <h2>{company.name} PM Interview Prep</h2>
                  <div className="company-programs">
                    {company.programs.map((p, i) => (
                      <span key={i} className="program-tag">{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="company-overview">
                <div className="overview-card">
                  <h4><MessageSquare size={16} /> Interview Style</h4>
                  <p>{company.interviewStyle}</p>
                </div>
                <div className="overview-card">
                  <h4><Tag size={16} /> Interview Rounds</h4>
                  <div className="rounds-list">
                    {company.rounds.map((round, i) => (
                      <span key={i} className="round-tag">
                        <span className="round-num">{i + 1}</span>
                        {round}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="question-bank-header">
                <h3>Question Bank ({filteredQuestions.length})</h3>
                <div className="type-filters">
                  <button
                    className={`type-filter ${companyFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setCompanyFilter('all')}
                  >
                    All
                  </button>
                  {questionTypes.map(type => {
                    const typeInfo = questionTypeIcons[type];
                    return (
                      <button
                        key={type}
                        className={`type-filter ${companyFilter === type ? 'active' : ''}`}
                        onClick={() => setCompanyFilter(type)}
                        style={companyFilter === type ? { borderColor: typeInfo?.color, color: typeInfo?.color } : {}}
                      >
                        {typeInfo?.label || type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="questions-list">
                {filteredQuestions.map((q, i) => {
                  const typeInfo = questionTypeIcons[q.type] || {};
                  const TypeIcon = typeInfo.icon || Star;
                  const isExpanded = expandedQuestion === i;

                  return (
                    <div key={i} className={`question-card ${isExpanded ? 'expanded' : ''}`}>
                      <div className="question-header" onClick={() => setExpandedQuestion(isExpanded ? null : i)}>
                        <div className="question-left">
                          <div className="question-type-icon" style={{ background: `${typeInfo.color}15`, color: typeInfo.color }}>
                            <TypeIcon size={16} />
                          </div>
                          <div>
                            <p className="question-text">{q.q}</p>
                            <div className="question-tags">
                              <span className="q-type-tag" style={{ color: typeInfo.color }}>{typeInfo.label || q.type}</span>
                              <span className="q-difficulty" style={{ color: difficultyColors[q.difficulty] }}>{q.difficulty}</span>
                              <span className="q-round">{q.round}</span>
                            </div>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>

                      {isExpanded && (
                        <div className="question-tips">
                          <div className="tips-box">
                            <h4><Lightbulb size={16} /> Tips & Approach</h4>
                            <p>{q.tips}</p>
                          </div>
                          <div className="practice-area">
                            <h4><PenTool size={16} /> Practice Your Answer</h4>
                            <textarea
                              className="open-ended-input"
                              placeholder="Draft your answer here... Use frameworks, be structured, and include metrics."
                              rows={5}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {activeTab === 'branding' && (
          <div className="branding-list">
            {brandingStrategies.map(strategy => (
              <div key={strategy.id} className="branding-card">
                <h3>{strategy.title}</h3>
                <p>{strategy.description}</p>
                <div className="branding-steps">
                  <h4>Steps</h4>
                  <ol>
                    {strategy.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="branding-tools">
                  <h4>Recommended Tools</h4>
                  <div className="tool-tags">
                    {strategy.tools.map((tool, i) => (
                      <span key={i} className="tool-tag">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
