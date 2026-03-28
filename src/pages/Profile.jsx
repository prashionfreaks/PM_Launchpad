import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { pmRoles, categories, quizQuestions, roleWeights, roleSpecificQuestions } from '../data/quizQuestions';
import { getMilestones, getFastestPath, getTransitionInfo } from '../data/roadmapData';
import { getTodaysChallenge } from '../data/dailyChallengeData';
import { pmArticles } from '../data/labsData';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  User, Target, Clock, Briefcase, Award,
  BarChart3, Map, CheckCircle, Star, Flame,
  ArrowRight, ClipboardCheck, ChevronLeft, ChevronRight,
  TrendingUp, TrendingDown, Zap, RotateCcw
} from 'lucide-react';

const profileTabs = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'evaluation', label: 'Evaluation', icon: ClipboardCheck },
];

export default function Profile() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl === 'evaluation' ? 'evaluation' : 'overview');

  // Quiz state
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (tabFromUrl === 'evaluation') setActiveTab('evaluation');
  }, [tabFromUrl]);

  if (!state.user) {
    navigate('/');
    return null;
  }

  const user = state.user;
  const targetRole = pmRoles.find(r => r.id === user.targetRole);
  const selectedPath = pmRoles.find(r => r.id === state.selectedPath);

  const totalXP = Object.values(state.roadmapProgress || {}).reduce(
    (sum, m) => sum + (m.passed ? (m.xpReward || 0) : 0), 0
  );

  const milestones = state.selectedPath ? getMilestones(state.selectedPath) : [];
  const completedMilestones = milestones.filter(m => state.roadmapProgress?.[m.id]?.passed).length;

  const articlesRead = Object.keys(state.labsProgress || {}).filter(k => k.startsWith('article-')).length;
  const testsCompleted = Object.keys(state.labsProgress || {}).filter(k => k.startsWith('test-') && state.labsProgress[k]?.completed).length;

  // ─── Daily Challenge ───
  const todaysChallenge = getTodaysChallenge();
  const today = new Date().toDateString();
  const dailyDone = state.dailyChallenge?.lastCompletedDate === today;
  const streak = state.dailyChallenge?.streak || 0;
  const [dcAnswer, setDcAnswer] = useState(null);
  const [dcSubmitted, setDcSubmitted] = useState(false);
  const [showDCModal, setShowDCModal] = useState(!dailyDone && !!state.quizResults);

  const handleDCSubmit = () => {
    if (dcAnswer === null) return;
    setDcSubmitted(true);
    if (!dailyDone) dispatch({ type: 'COMPLETE_DAILY_CHALLENGE' });
  };

  // ─── Skill Gap Recommendations ───
  const skillRecommendations = {
    business:     { articles: ['art-2', 'art-3'], testId: 'mt-3' },
    technical:    { articles: [],                 testId: 'mt-2' },
    design:       { articles: ['art-1'],           testId: 'mt-9' },
    stakeholder:  { articles: ['art-6', 'art-7'],   testId: 'mt-10' },
    agile:        { articles: ['art-3'],           testId: 'mt-1' },
    analytics:    { articles: ['art-4'],           testId: 'mt-1' },
    strategy:     { articles: ['art-2', 'art-5'], testId: 'mt-3' },
    communication:{ articles: ['art-5', 'art-6'], testId: null  },
  };

  // ─── Quiz Logic ───
  const roleQuestions = roleSpecificQuestions[user.targetRole] || roleSpecificQuestions.product_manager;
  const allQuestions = [...quizQuestions, ...roleQuestions];
  const question = allQuestions[currentQ];
  const totalQuestions = allQuestions.length;
  const progress = ((currentQ + 1) / totalQuestions) * 100;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (qId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const calculateResults = () => {
    const categoryScores = {};
    const categoryMaxScores = {};

    categories.forEach(cat => {
      categoryScores[cat.id] = 0;
      categoryMaxScores[cat.id] = 0;
    });

    allQuestions.forEach(q => {
      const answerIdx = answers[q.id];
      categoryMaxScores[q.category] += 4;
      if (answerIdx !== undefined) {
        categoryScores[q.category] += q.options[answerIdx].score;
      }
    });

    const results = {};
    const weights = roleWeights[user.targetRole] || roleWeights.product_manager;
    let totalWeightedScore = 0;
    let totalWeightedMax = 0;

    categories.forEach(cat => {
      const raw = categoryScores[cat.id];
      const max = categoryMaxScores[cat.id];
      const pct = max > 0 ? Math.round((raw / max) * 100) : 0;
      const weight = weights[cat.id] || 1;

      results[cat.id] = {
        score: raw,
        maxScore: max,
        percentage: pct,
        weight,
        weightedScore: Math.round(pct * weight),
      };

      totalWeightedScore += pct * weight;
      totalWeightedMax += 100 * weight;
    });

    const overallScore = Math.round((totalWeightedScore / totalWeightedMax) * 100);
    const sorted = Object.entries(results).sort((a, b) => a[1].weightedScore - b[1].weightedScore);
    const weakAreas = sorted.filter(([, r]) => r.percentage < 80).slice(0, 3).map(([id]) => id);
    const strongAreas = [...sorted].reverse().filter(([, r]) => r.percentage >= 70).slice(0, 3).map(([id]) => id);

    return { categoryResults: results, overallScore, weakAreas, strongAreas };
  };

  const handleQuizSubmit = () => {
    const results = calculateResults();
    dispatch({ type: 'SET_QUIZ_RESULTS', payload: results });
    // Award 500 XP for completing the evaluation — only on first submission
    if (!state.roadmapProgress?.['evaluation-complete']?.passed) {
      dispatch({
        type: 'UPDATE_ROADMAP_PROGRESS',
        payload: { 'evaluation-complete': { passed: true, xpReward: 500 } },
      });
    }
    setQuizSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentQ(0);
    setAnswers({});
    setQuizSubmitted(false);
    dispatch({ type: 'SET_QUIZ_RESULTS', payload: null });
  };

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    setSearchParams(tabId === 'overview' ? {} : { tab: tabId });
  };

  // ─── Results Helpers ───
  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Developing';
    return 'Needs Work';
  };

  const handlePathSelection = (roleId) => {
    dispatch({ type: 'SET_SELECTED_PATH', payload: roleId });
    navigate('/roadmap');
  };

  // Determine if we should show results (quiz done either now or previously)
  const showResults = state.quizResults && (quizSubmitted || activeTab === 'evaluation');

  return (
    <div className="page-container">
      {/* Profile Header */}
      <div className="profile-page-header">
        <div className="profile-avatar-xl">{user.name?.[0]?.toUpperCase() || 'U'}</div>
        <div>
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <div className="profile-tags">
            <span className="tag"><Briefcase size={14} /> {user.currentRole}</span>
            <span className="tag"><Clock size={14} /> {user.yoe}</span>
            <span className="tag"><Target size={14} /> {targetRole?.label}</span>
          </div>
        </div>
      </div>

      {/* Subtabs */}
      <div className="profile-subtabs">
        {profileTabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`profile-subtab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => switchTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.id === 'evaluation' && state.quizResults && (
                <span className="subtab-badge">{state.quizResults.overallScore}%</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ═══════════ OVERVIEW TAB ═══════════ */}
      {activeTab === 'overview' && (
        <>
          {!state.quizResults && (
            <div className="eval-prompt-banner">
              <div className="eval-prompt-glow" />
              <div className="eval-prompt-content">
                <div className="eval-prompt-emoji">🎯</div>
                <div className="eval-prompt-text">
                  <h2>Hey {user.name.split(' ')[0]}, where do you stand in the PM market?</h2>
                  <p>Most aspiring PMs guess their strengths — the smart ones <em>measure</em> them. Take a 5-minute evaluation and get a personalized score across 8 key PM skills.</p>
                  <div className="eval-prompt-pills">
                    <span>⚡ 5 min</span>
                    <span>📊 8 skill areas</span>
                    <span>🗺️ Personalized roadmap</span>
                  </div>
                </div>
                <button className="eval-prompt-cta" onClick={() => switchTab('evaluation')}>
                  Find Out Now <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ── Daily Challenge trigger (only after evaluation) ── */}
          {state.quizResults && <div className="profile-section">
            <div className="dc-card dc-trigger-card" onClick={() => setShowDCModal(true)}>
              <div className="dc-title-row" style={{marginBottom: 0}}>
                <span className="dc-badge">⚡ Daily Challenge</span>
                {streak > 0 && <span className="dc-streak">🔥 {streak}-day streak</span>}
                <span style={{marginLeft: 'auto', fontSize: 13, color: 'var(--text-light)'}}>
                  {dailyDone || dcSubmitted ? '✅ Done today' : 'Tap to answer →'}
                </span>
              </div>
            </div>
          </div>}

          <div className="profile-stats-grid">
            <div className="stat-card">
              <Flame size={28} color="#f59e0b" />
              <div className="stat-value">{totalXP}</div>
              <div className="stat-label">Total XP</div>
            </div>
            <div className="stat-card">
              <CheckCircle size={28} color="#10b981" />
              <div className="stat-value">{completedMilestones}/{milestones.length || '-'}</div>
              <div className="stat-label">Milestones</div>
            </div>
            <div className="stat-card">
              <BarChart3 size={28} color="#6366f1" />
              <div className="stat-value">{state.quizResults?.overallScore || '-'}%</div>
              <div className="stat-label">Readiness Score</div>
            </div>
            <div className="stat-card">
              <Award size={28} color="#ec4899" />
              <div className="stat-value">{state.interviewResult?.overall || '-'}%</div>
              <div className="stat-label">Interview Score</div>
            </div>
          </div>

          {state.quizResults && (
            <div className="profile-section">
              <h2>Skill Breakdown</h2>
              <div className="skill-bars">
                {categories.map(cat => {
                  const result = state.quizResults.categoryResults[cat.id];
                  const pct = result?.percentage || 0;
                  const tag = pct >= 80 ? 'Strong' : pct >= 50 ? 'Needs Improvement' : 'Critical';
                  const tagClass = pct >= 80 ? 'skill-tag green' : pct >= 50 ? 'skill-tag amber' : 'skill-tag red';
                  const recs = skillRecommendations[cat.id];
                  const recArticles = pct < 80 ? (recs?.articles || []).map(id => pmArticles.find(a => a.id === id)).filter(Boolean) : [];
                  const recTest = pct < 80 && recs?.testId ? recs.testId : null;
                  return (
                    <div key={cat.id} className="skill-bar-item" style={{ borderLeftColor: cat.color }}>
                      <div className="skill-bar-top">
                        <span className="skill-name">{cat.label}</span>
                        <div className="skill-bar-track">
                          <div className="skill-bar-fill" style={{ width: `${pct}%`, background: cat.color }} />
                        </div>
                        <span className="skill-pct" style={{ color: cat.color }}>{pct}%</span>
                        <span className={tagClass}>{tag}</span>
                      </div>
                      {pct < 80 && (recArticles.length > 0 || recTest) && (
                        <div className="skill-bar-bottom skill-recs">
                          <span className="skill-recs-label">Revise:</span>
                          {recArticles.map(article => (
                            <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="skill-rec-pill article-pill">
                              {article.title}
                            </a>
                          ))}
                          {recTest && (
                            <button className="skill-rec-pill test-pill" onClick={() => navigate('/labs')}>
                              Practice Test
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="profile-section">
            <h2>Your Journey</h2>
            <div className="journey-cards">
              <div className="journey-card" onClick={() => switchTab('evaluation')}>
                <div className={`journey-status ${state.quizResults ? 'done' : 'todo'}`}>
                  {state.quizResults ? <CheckCircle size={20} /> : '1'}
                </div>
                <div>
                  <h4>PM Evaluation</h4>
                  <p>{state.quizResults ? 'Completed' : 'Take the readiness quiz'}</p>
                </div>
                <ArrowRight size={18} />
              </div>

              <div className="journey-card" onClick={() => switchTab('evaluation')}>
                <div className={`journey-status ${state.selectedPath ? 'done' : 'todo'}`}>
                  {state.selectedPath ? <CheckCircle size={20} /> : '2'}
                </div>
                <div>
                  <h4>Choose Path</h4>
                  <p>{selectedPath ? selectedPath.label : 'Select your learning path'}</p>
                </div>
                <ArrowRight size={18} />
              </div>

              <div className="journey-card" onClick={() => navigate('/roadmap')}>
                <div className={`journey-status ${completedMilestones === milestones.length && milestones.length > 0 ? 'done' : 'todo'}`}>
                  {completedMilestones === milestones.length && milestones.length > 0 ? <CheckCircle size={20} /> : '3'}
                </div>
                <div>
                  <h4>Complete Roadmap</h4>
                  <p>{state.selectedPath ? `${completedMilestones}/${milestones.length} milestones done` : 'Select a path to begin'}</p>
                </div>
                <ArrowRight size={18} />
              </div>

              <div className="journey-card" onClick={() => navigate('/interview')}>
                <div className={`journey-status ${state.interviewResult ? 'done' : 'todo'}`}>
                  {state.interviewResult ? <CheckCircle size={20} /> : '4'}
                </div>
                <div>
                  <h4>PM Interview</h4>
                  <p>{state.interviewResult ? `Score: ${state.interviewResult.overall}%` : 'Final readiness check'}</p>
                </div>
                <ArrowRight size={18} />
              </div>

              <div className="journey-card" onClick={() => navigate('/jobs')}>
                <div className="journey-status todo">5</div>
                <div>
                  <h4>Apply for Jobs</h4>
                  <p>Find your PM role</p>
                </div>
                <ArrowRight size={18} />
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Labs Progress</h2>
            <div className="labs-stats">
              <div className="lab-stat">
                <span className="lab-stat-value">{articlesRead}</span>
                <span className="lab-stat-label">Articles Read</span>
              </div>
              <div className="lab-stat">
                <span className="lab-stat-value">{testsCompleted}</span>
                <span className="lab-stat-label">Mock Tests Done</span>
              </div>
            </div>
          </div>

          <div className="profile-section reset-progress-section">
            <div className="reset-progress-card">
              <div className="reset-progress-info">
                <RotateCcw size={20} color="#ef4444" />
                <div>
                  <h4>Reset All Progress</h4>
                  <p>This will clear your evaluation results, roadmap progress, interview scores and portfolio data. This action cannot be undone.</p>
                </div>
              </div>
              <button
                className="btn-reset-progress"
                onClick={() => {
                  if (confirm('Reset all progress? This cannot be undone.')) {
                    dispatch({ type: 'RESET' });
                  }
                }}
              >
                Reset Progress
              </button>
            </div>
          </div>
        </>
      )}

      {/* ═══════════ EVALUATION TAB ═══════════ */}
      {activeTab === 'evaluation' && (
        <>
          {/* Case 1: Quiz results exist — show results */}
          {state.quizResults ? (() => {
            const { categoryResults, overallScore, weakAreas, strongAreas } = state.quizResults;
            const fastestRoleId = getFastestPath(user.currentRole);
            const fastestRole = pmRoles.find(r => r.id === fastestRoleId);
            const fastestTransition = getTransitionInfo(user.currentRole, fastestRoleId);
            const targetTransition = getTransitionInfo(user.currentRole, user.targetRole);

            const radarData = categories.map(cat => ({
              category: cat.label.split(' ').slice(0, 2).join(' '),
              score: categoryResults[cat.id]?.percentage || 0,
              fullMark: 100,
            }));

            const barData = categories.map(cat => ({
              name: cat.label.split(' ')[0],
              score: categoryResults[cat.id]?.percentage || 0,
              color: cat.color,
            }));

            return (
              <div className="evaluation-results">
                <div className="eval-results-header">
                  <h2>Your PM Readiness Report</h2>
                  <button className="btn-secondary btn-sm" onClick={handleRetakeQuiz}>
                    Retake Evaluation
                  </button>
                </div>

                <div className="results-overview">
                  <div className="score-circle-container">
                    <div className="score-circle" style={{ '--score-color': getScoreColor(overallScore) }}>
                      <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                        <circle
                          cx="60" cy="60" r="54" fill="none"
                          stroke={getScoreColor(overallScore)} strokeWidth="8"
                          strokeDasharray={`${(overallScore / 100) * 339.3} 339.3`}
                          strokeLinecap="round"
                          transform="rotate(-90 60 60)"
                        />
                      </svg>
                      <div className="score-text">
                        <span className="score-number">{overallScore}</span>
                        <span className="score-label">{getScoreLabel(overallScore)}</span>
                      </div>
                    </div>
                    <p className="score-desc">
                      Overall PM Readiness for <strong>{targetRole?.label}</strong>
                    </p>
                  </div>

                  <div className="score-details">
                    <div className="detail-card strengths">
                      <h3><TrendingUp size={20} color="#10b981" /> Your Strengths</h3>
                      {strongAreas.length > 0 ? strongAreas.map(area => {
                        const cat = categories.find(c => c.id === area);
                        return (
                          <div key={area} className="area-item">
                            <span className="area-dot" style={{ background: cat?.color }} />
                            <span>{cat?.label}</span>
                            <span className="area-score" style={{ color: '#10b981' }}>
                              {categoryResults[area]?.percentage}%
                            </span>
                          </div>
                        );
                      }) : (
                        <p className="no-areas">Complete the quiz with varied answers to see strengths.</p>
                      )}
                    </div>

                    <div className="detail-card improvements">
                      <h3><TrendingDown size={20} color="#f59e0b" /> Areas to Improve</h3>
                      {weakAreas.length > 0 ? weakAreas.map(area => {
                        const cat = categories.find(c => c.id === area);
                        return (
                          <div key={area} className="area-item">
                            <span className="area-dot" style={{ background: cat?.color }} />
                            <span>{cat?.label}</span>
                            <span className="area-score" style={{ color: '#f59e0b' }}>
                              {categoryResults[area]?.percentage}%
                            </span>
                          </div>
                        );
                      }) : (
                        <p className="no-areas">Great job! No major areas need improvement right now.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="charts-grid">
                  <div className="chart-card">
                    <h3>Skill Radar</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#6b7280' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-card">
                    <h3>Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={barData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={85} />
                        <Tooltip />
                        <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                          {barData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {!state.selectedPath && (
                  <div className="path-recommendation">
                    <h2>Recommended Path</h2>
                    <div className="path-cards">
                      <div className="path-card fastest">
                        <div className="path-badge"><Zap size={18} /> Fastest Path</div>
                        <h3>{fastestRole?.icon} {fastestRole?.label}</h3>
                        <p>Based on your current role as <strong>{user.currentRole}</strong>, this is the quickest transition.</p>
                        <div className="path-meta">
                          <span>⏱ {fastestTransition.duration}</span>
                          <span>📊 {fastestTransition.difficulty}</span>
                        </div>
                        <button className="btn-primary" onClick={() => handlePathSelection(fastestRoleId)}>
                          Choose This Path <ArrowRight size={18} />
                        </button>
                      </div>

                      {user.targetRole !== fastestRoleId && (
                        <div className="path-card target">
                          <div className="path-badge target-badge"><Target size={18} /> Your Goal</div>
                          <h3>{targetRole?.icon} {targetRole?.label}</h3>
                          <p>This is the role you selected as your target PM specialization.</p>
                          <div className="path-meta">
                            <span>⏱ {targetTransition.duration}</span>
                            <span>📊 {targetTransition.difficulty}</span>
                          </div>
                          <button className="btn-secondary" onClick={() => handlePathSelection(user.targetRole)}>
                            Choose This Path <ArrowRight size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {state.selectedPath && (
                  <div className="path-recommendation">
                    <h2>Your Selected Path</h2>
                    <div className="selected-path-banner">
                      <div>
                        <h3>{selectedPath?.icon} {selectedPath?.label}</h3>
                        <p>Your learning roadmap is ready.</p>
                      </div>
                      <button className="btn-primary" onClick={() => navigate('/roadmap')}>
                        Go to Roadmap <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })() : (
            /* Case 2: No results yet — show quiz */
            <div className="evaluation-quiz">
              <div className="quiz-header">
                <h2>PM Readiness Evaluation</h2>
                <div className="quiz-meta">
                  <span className="quiz-progress-text">
                    Question {currentQ + 1} of {totalQuestions}
                  </span>
                  <span className="quiz-answered">
                    {answeredCount}/{totalQuestions} answered
                  </span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="quiz-card">
                <div className="quiz-category-badge" style={{
                  background: categories.find(c => c.id === question.category)?.color + '20',
                  color: categories.find(c => c.id === question.category)?.color
                }}>
                  {categories.find(c => c.id === question.category)?.label}
                </div>

                <h2 className="quiz-question">{question.question}</h2>

                <div className="quiz-options">
                  {question.options.map((opt, idx) => (
                    <button
                      key={idx}
                      className={`quiz-option ${answers[question.id] === idx ? 'selected' : ''}`}
                      onClick={() => handleAnswer(question.id, idx)}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                      <span className="option-text">{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="quiz-navigation">
                <button
                  className="btn-secondary"
                  disabled={currentQ === 0}
                  onClick={() => setCurrentQ(q => q - 1)}
                >
                  <ChevronLeft size={18} /> Previous
                </button>

                <div className="quiz-dots">
                  {allQuestions.map((q, i) => (
                    <button
                      key={i}
                      className={`quiz-dot ${i === currentQ ? 'current' : ''} ${answers[q.id] !== undefined ? 'answered' : ''}`}
                      onClick={() => setCurrentQ(i)}
                      title={`Question ${i + 1}`}
                    />
                  ))}
                </div>

                {currentQ < totalQuestions - 1 ? (
                  <button className="btn-primary" onClick={() => setCurrentQ(q => q + 1)}>
                    Next <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    className="btn-primary submit-btn"
                    disabled={answeredCount < totalQuestions}
                    onClick={handleQuizSubmit}
                  >
                    Submit Evaluation ({answeredCount}/{totalQuestions})
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Daily Challenge Modal (only after evaluation) ── */}
      {showDCModal && state.quizResults && (
        <div
          className="dc-modal-overlay"
          onClick={e => { if (e.target === e.currentTarget && (dcSubmitted || dailyDone)) setShowDCModal(false); }}
        >
          <div className="dc-modal">
            <div className="dc-modal-header">
              <div className="dc-title-row" style={{marginBottom: 0}}>
                <span className="dc-badge">⚡ Daily Challenge</span>
                {streak > 0 && <span className="dc-streak">🔥 {streak}-day streak</span>}
              </div>
              <button
                className="dc-modal-close"
                onClick={() => setShowDCModal(false)}
                disabled={!dcSubmitted && !dailyDone}
                title={!dcSubmitted && !dailyDone ? 'Answer the challenge to close' : 'Close'}
              >✕</button>
            </div>

            {dailyDone && !dcSubmitted ? (
              <div className="dc-done-state">
                <div className="dc-done-icon">✅</div>
                <p><strong>You've completed today's challenge!</strong></p>
                <p className="dc-done-sub">Come back tomorrow for a new scenario.</p>
                {streak > 0 && <p className="dc-done-streak">🔥 {streak}-day streak — keep it going!</p>}
              </div>
            ) : (
              <>
                {!dcSubmitted && (
                  <p className="dc-subtitle" style={{marginBottom: 16}}>Answer today's PM scenario to earn +50 XP and keep your streak alive.</p>
                )}
                <p className="dc-question">{todaysChallenge.question}</p>
                <div className="dc-options">
                  {todaysChallenge.options.map((opt, i) => {
                    let cls = 'dc-option';
                    if (dcSubmitted) {
                      if (i === todaysChallenge.answer) cls += ' correct';
                      else if (i === dcAnswer && dcAnswer !== todaysChallenge.answer) cls += ' wrong';
                    } else if (dcAnswer === i) {
                      cls += ' selected';
                    }
                    return (
                      <button
                        key={i}
                        className={cls}
                        onClick={() => !dcSubmitted && setDcAnswer(i)}
                        disabled={dcSubmitted}
                      >
                        <span className="dc-option-letter">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {dcSubmitted ? (
                  <>
                    <div className="dc-explanation">
                      <span className="dc-result-icon">{dcAnswer === todaysChallenge.answer ? '🎉 Correct!' : '❌ Not quite'}</span>
                      <p>{todaysChallenge.explanation}</p>
                      {!dailyDone && <span className="dc-xp-earned">+50 XP earned</span>}
                    </div>
                    <button className="btn-primary dc-submit" style={{marginTop: 16}} onClick={() => setShowDCModal(false)}>
                      Close
                    </button>
                  </>
                ) : (
                  <button className="btn-primary dc-submit" disabled={dcAnswer === null} onClick={handleDCSubmit}>
                    Submit Answer
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
