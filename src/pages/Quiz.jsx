import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { quizQuestions, categories, roleWeights, roleSpecificQuestions } from '../data/quizQuestions';
import { Clock, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

export default function Quiz() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!state.user) {
    navigate('/');
    return null;
  }

  // Combine generic questions with role-specific ones
  const targetRole = state.user.targetRole;
  const roleQuestions = roleSpecificQuestions[targetRole] || roleSpecificQuestions.product_manager;
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
    const targetRole = state.user.targetRole;
    const weights = roleWeights[targetRole] || roleWeights.product_manager;
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

    // Sort by weighted score (percentage * role weight) to reflect importance for target role
    const sorted = Object.entries(results).sort((a, b) => a[1].weightedScore - b[1].weightedScore);

    // Only flag as "weak" if the weighted score is below 80% of ideal (100 * weight)
    const weakAreas = sorted
      .filter(([, r]) => r.percentage < 80)
      .slice(0, 3)
      .map(([id]) => id);

    // Only flag as "strong" if score is 70%+
    const strongAreas = [...sorted]
      .reverse()
      .filter(([, r]) => r.percentage >= 70)
      .slice(0, 3)
      .map(([id]) => id);

    return { categoryResults: results, overallScore, weakAreas, strongAreas };
  };

  const handleSubmit = () => {
    const results = calculateResults();
    dispatch({ type: 'SET_QUIZ_RESULTS', payload: results });
    setSubmitted(true);
    setTimeout(() => navigate('/results'), 1500);
  };

  if (submitted) {
    return (
      <div className="page-container center-content">
        <div className="success-animation">
          <CheckCircle size={80} color="#10b981" />
          <h2>Evaluation Complete!</h2>
          <p>Analyzing your PM readiness...</p>
          <div className="loading-dots"><span></span><span></span><span></span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="quiz-header">
        <h1>PM Readiness Evaluation</h1>
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
            onClick={handleSubmit}
          >
            Submit Evaluation ({answeredCount}/{totalQuestions})
          </button>
        )}
      </div>
    </div>
  );
}
