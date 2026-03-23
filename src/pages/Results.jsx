import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { categories, pmRoles } from '../data/quizQuestions';
import { getFastestPath, getTransitionInfo } from '../data/roadmapData';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Zap, Target, ArrowRight } from 'lucide-react';

export default function Results() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  if (!state.quizResults || !state.user) {
    return (
      <div className="page-container center-content">
        <h2>No results yet</h2>
        <p>Complete the PM readiness evaluation first.</p>
        <button className="btn-primary" onClick={() => navigate('/quiz')}>
          Take Evaluation
        </button>
      </div>
    );
  }

  const { categoryResults, overallScore, weakAreas, strongAreas } = state.quizResults;
  const targetRole = pmRoles.find(r => r.id === state.user.targetRole);
  const fastestRoleId = getFastestPath(state.user.currentRole);
  const fastestRole = pmRoles.find(r => r.id === fastestRoleId);
  const fastestTransition = getTransitionInfo(state.user.currentRole, fastestRoleId);
  const targetTransition = getTransitionInfo(state.user.currentRole, state.user.targetRole);

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

  return (
    <div className="page-container">
      <h1>Your PM Readiness Report</h1>

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

      <div className="path-recommendation">
        <h2>Recommended Path</h2>

        <div className="path-cards">
          <div className="path-card fastest">
            <div className="path-badge"><Zap size={18} /> Fastest Path</div>
            <h3>{fastestRole?.icon} {fastestRole?.label}</h3>
            <p>Based on your current role as <strong>{state.user.currentRole}</strong>, this is the quickest transition.</p>
            <div className="path-meta">
              <span>⏱ {fastestTransition.duration}</span>
              <span>📊 {fastestTransition.difficulty}</span>
            </div>
            <button className="btn-primary" onClick={() => handlePathSelection(fastestRoleId)}>
              Choose This Path <ArrowRight size={18} />
            </button>
          </div>

          {state.user.targetRole !== fastestRoleId && (
            <div className="path-card target">
              <div className="path-badge target-badge"><Target size={18} /> Your Goal</div>
              <h3>{targetRole?.icon} {targetRole?.label}</h3>
              <p>This is the role you selected as your target PM specialization.</p>
              <div className="path-meta">
                <span>⏱ {targetTransition.duration}</span>
                <span>📊 {targetTransition.difficulty}</span>
              </div>
              <button className="btn-secondary" onClick={() => handlePathSelection(state.user.targetRole)}>
                Choose This Path <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
