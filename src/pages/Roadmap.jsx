import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getMilestones, getTechnicalReadinessMilestone } from '../data/roadmapData';
import { pmRoles } from '../data/quizQuestions';
import {
  Lock, Unlock, CheckCircle, Star, BookOpen, ExternalLink,
  ChevronDown, ChevronUp, Trophy, Flame, Target, Calendar, UserCheck, Clock
} from 'lucide-react';

const availablePMs = [
  { name: 'Attharv Sardesai', title: 'Experienced PM', expertise: 'Product Strategy & Execution', avatar: 'AT', email: 'attharv@naum.systems', slots: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'] },
  { name: 'Anika Sharma', title: 'Senior PM @ Google', expertise: 'Search & AI Products', avatar: 'AS', email: null, slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
  { name: 'David Chen', title: 'Group PM @ Meta', expertise: 'Growth & Engagement', avatar: 'DC', email: null, slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
  { name: 'Sarah Williams', title: 'Staff PM @ Stripe', expertise: 'Platform & Payments', avatar: 'SW', email: null, slots: ['10:00 AM', '1:00 PM', '5:00 PM'] },
  { name: 'Raj Patel', title: 'Director of Product @ Notion', expertise: 'Productivity & B2B SaaS', avatar: 'RP', email: null, slots: ['11:00 AM', '2:00 PM', '4:00 PM'] },
  { name: 'Emily Torres', title: 'PM Lead @ Spotify', expertise: 'Consumer & Data Products', avatar: 'ET', email: null, slots: ['9:00 AM', '12:00 PM', '3:00 PM'] },
];

export default function Roadmap() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [expandedMilestone, setExpandedMilestone] = useState(null);
  const [milestoneActiveTab, setMilestoneActiveTab] = useState({});
  const [quizMode, setQuizMode] = useState(null);
  const [shuffledQuiz, setShuffledQuiz] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResultModal, setQuizResultModal] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({ date: '', time: '', pmName: '', notes: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!state.selectedPath) {
    const hasEvaluated = !!state.quizResults;
    return (
      <div className="page-container center-content">
        <div className="roadmap-gate-card">
          <div className="roadmap-gate-icon">🗺️</div>
          <h2>Your Roadmap Awaits</h2>
          {hasEvaluated ? (
            <>
              <p>You've completed the evaluation — now pick a learning path to unlock your personalized roadmap.</p>
              <button className="btn-primary" onClick={() => navigate('/profile?tab=evaluation')}>
                Choose Your Path →
              </button>
            </>
          ) : (
            <>
              <p>Take the PM Skills Assessment first. It takes ~5 minutes and builds a personalized roadmap based on your background and goals.</p>
              <div className="roadmap-gate-steps">
                <div className="gate-step"><span>1</span> Complete the skills assessment</div>
                <div className="gate-step"><span>2</span> Get your PM role recommendation</div>
                <div className="gate-step"><span>3</span> Unlock your personalized roadmap</div>
              </div>
              <button className="btn-primary" onClick={() => navigate('/profile?tab=evaluation')}>
                Take the Assessment →
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  const role = pmRoles.find(r => r.id === state.selectedPath);
  const milestones = getMilestones(state.selectedPath);
  const techMilestone = getTechnicalReadinessMilestone(state.selectedPath);

  const isMilestoneUnlocked = (index) => {
    if (index === 0) return true;
    const prevMilestone = milestones[index - 1];
    return state.roadmapProgress[prevMilestone.id]?.passed === true;
  };

  const isMilestonePassed = (milestoneId) => {
    return state.roadmapProgress[milestoneId]?.passed === true;
  };

  const totalXP = Object.values(state.roadmapProgress).reduce(
    (sum, m) => sum + (m.passed ? (m.xpReward || 0) : 0), 0
  );

  const completedCount = milestones.filter(m => isMilestonePassed(m.id)).length;
  const allRegularPassed = completedCount === milestones.length;
  const techMilestonePassed = isMilestonePassed(techMilestone.id);

  const handleQuizStart = (milestone) => {
    const shuffled = milestone.quiz.map(q => {
      const indexed = q.options.map((text, i) => ({ text, isCorrect: i === q.answer }));
      for (let i = indexed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
      }
      return { q: q.q, options: indexed.map(o => o.text), answer: indexed.findIndex(o => o.isCorrect) };
    });
    setQuizMode(milestone);
    setShuffledQuiz(shuffled);
    setQuizAnswers({});
    setQuizResultModal(null);
  };

  const handleQuizAnswer = (qIndex, ansIndex) => {
    setQuizAnswers(prev => ({ ...prev, [qIndex]: ansIndex }));
  };

  const handleQuizSubmit = () => {
    const milestone = quizMode;
    const correct = shuffledQuiz.reduce((count, q, i) => {
      return count + (quizAnswers[i] === q.answer ? 1 : 0);
    }, 0);
    const score = Math.round((correct / shuffledQuiz.length) * 100);
    const passed = score >= 80;

    dispatch({ type: 'COMPLETE_MILESTONE_QUIZ', payload: { milestoneId: milestone.id, score } });

    if (passed) {
      dispatch({
        type: 'UPDATE_ROADMAP_PROGRESS',
        payload: {
          [milestone.id]: {
            ...state.roadmapProgress[milestone.id],
            passed: true,
            quizScore: score,
            xpReward: milestone.xpReward,
          },
        },
      });
    }

    // Find next milestone for the "Next" button
    const allMilestones = [...milestones, techMilestone];
    const currentIdx = allMilestones.findIndex(m => m.id === milestone.id);
    const nextMilestone = passed && currentIdx < allMilestones.length - 1
      ? allMilestones[currentIdx + 1]
      : null;

    setQuizMode(null); // return to roadmap view; modal overlays it
    setQuizResultModal({
      milestone,
      score,
      passed,
      correct,
      total: shuffledQuiz.length,
      nextMilestone,
      shuffledQuiz: [...shuffledQuiz],
      quizAnswers: { ...quizAnswers },
    });
  };

  if (quizMode) {
    return (
      <div className="page-container">
        <div className="milestone-quiz">
          <h2>📝 {quizMode.title} — Assessment</h2>
          <p className="quiz-instruction">Score 80% or higher to pass and unlock the next level.</p>

          {shuffledQuiz.map((q, i) => (
            <div key={i} className="mq-card">
              <h4>Q{i + 1}. {q.q}</h4>
              <div className="mq-options">
                {q.options.map((opt, j) => (
                  <button
                    key={j}
                    className={`mq-option ${quizAnswers[i] === j ? 'selected' : ''}`}
                    onClick={() => handleQuizAnswer(i, j)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + j)}</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="quiz-actions">
            <button className="btn-secondary" onClick={() => setQuizMode(null)}>Cancel</button>
            <button
              className="btn-primary"
              disabled={Object.keys(quizAnswers).length < shuffledQuiz.length}
              onClick={handleQuizSubmit}
            >
              Submit ({Object.keys(quizAnswers).length}/{shuffledQuiz.length})
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="roadmap-header">
        <div>
          <h1>{role?.icon} {role?.label} Roadmap</h1>
          <p className="roadmap-subtitle">Complete each milestone to unlock the next level</p>
        </div>
        <div className="roadmap-stats">
          <div className="stat">
            <Flame size={20} color="#f59e0b" />
            <span>{totalXP} XP</span>
          </div>
          <div className="stat">
            <CheckCircle size={20} color="#10b981" />
            <span>{completedCount + (techMilestonePassed ? 1 : 0)}/{milestones.length + 1}</span>
          </div>
        </div>
      </div>

      <div className="roadmap-progress-bar">
        <div className="roadmap-progress-fill" style={{ width: `${((completedCount + (techMilestonePassed ? 1 : 0)) / (milestones.length + 1)) * 100}%` }} />
      </div>

      <div className="milestones-timeline">
        {milestones.map((milestone, index) => {
          const unlocked = isMilestoneUnlocked(index);
          const passed = isMilestonePassed(milestone.id);
          const expanded = expandedMilestone === milestone.id;
          const score = state.roadmapProgress[milestone.id]?.quizScore;

          return (
            <div
              key={milestone.id}
              id={`milestone-${milestone.id}`}
              className={`milestone-card ${passed ? 'completed' : ''} ${!unlocked ? 'locked' : ''} ${expanded ? 'expanded' : ''}`}
            >
              <div
                className="milestone-header"
                onClick={() => unlocked && setExpandedMilestone(expanded ? null : milestone.id)}
              >
                <div className="milestone-level">
                  {passed ? (
                    <CheckCircle size={28} color="#10b981" />
                  ) : unlocked ? (
                    <div className="level-badge">{milestone.level}</div>
                  ) : (
                    <Lock size={24} color="#9ca3af" />
                  )}
                </div>
                <div className="milestone-info">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                  <div className="milestone-meta">
                    <span><Star size={14} /> {milestone.xpReward} XP</span>
                    <span><BookOpen size={14} /> {milestone.courses.length} courses</span>
                    {score !== undefined && (
                      <span className={score >= 80 ? 'score-pass' : 'score-fail'}>
                        Score: {score}%
                      </span>
                    )}
                  </div>
                </div>
                {unlocked && (
                  <div className="milestone-expand">
                    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                )}
              </div>

              {expanded && unlocked && (
                <div className="milestone-content">
                  <div className="milestone-tabs">
                    <button
                      className={`milestone-tab ${(milestoneActiveTab[milestone.id] || 'courses') === 'courses' ? 'active' : ''}`}
                      onClick={() => setMilestoneActiveTab(p => ({ ...p, [milestone.id]: 'courses' }))}
                    >
                      📚 Courses
                    </button>
                    <button
                      className={`milestone-tab ${(milestoneActiveTab[milestone.id] || 'courses') === 'quiz' ? 'active' : ''}`}
                      onClick={() => setMilestoneActiveTab(p => ({ ...p, [milestone.id]: 'quiz' }))}
                    >
                      📝 Quiz
                      {score !== undefined && (
                        <span className={`tab-score ${score >= 80 ? 'pass' : 'fail'}`}>{score}%</span>
                      )}
                    </button>
                  </div>

                  {(milestoneActiveTab[milestone.id] || 'courses') === 'courses' && (
                    <div className="courses-list">
                      {milestone.courses.map((course, ci) => (
                        <a key={ci} href={course.url} target="_blank" rel="noopener noreferrer" className="course-item">
                          <div className="course-info">
                            <span className="course-name">{course.name}</span>
                            <span className="course-platform">
                              {course.platform} • {course.type === 'free' ? '🆓 Free' : '💰 Paid'}
                            </span>
                          </div>
                          <ExternalLink size={16} />
                        </a>
                      ))}
                    </div>
                  )}

                  {(milestoneActiveTab[milestone.id] || 'courses') === 'quiz' && (
                    <div className="milestone-quiz-tab">
                      {score === undefined ? (
                        <>
                          <p className="quiz-tab-desc">Test your understanding of <strong>{milestone.title}</strong>. Score 80%+ to unlock the next milestone and earn <strong>{milestone.xpReward} XP</strong>.</p>
                          <button className="btn-primary take-quiz-btn" onClick={() => handleQuizStart(milestone)}>
                            Start Assessment
                          </button>
                        </>
                      ) : (
                        <>
                          <div className={`quiz-tab-score-banner ${score >= 80 ? 'pass' : 'fail'}`}>
                            {score >= 80 ? '✅' : '❌'} Score: <strong>{score}%</strong> — {score >= 80 ? 'Passed!' : 'Need 80% to pass'}
                          </div>
                          <div className="quiz-answer-key">
                            <h4>Answer Key</h4>
                            {milestone.quiz.map((q, i) => (
                              <div key={i} className="mq-review-card mq-card-correct">
                                <p className="mq-review-q">Q{i + 1}. {q.q}</p>
                                <div className="mq-review-opts">
                                  {q.options.map((opt, j) => (
                                    <div key={j} className={`mq-review-opt ${j === q.answer ? 'mq-opt-correct' : ''}`}>
                                      <span className="option-letter">{String.fromCharCode(65 + j)}</span>
                                      {opt}
                                      {j === q.answer && <span className="mq-tag correct">Correct</span>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          {!passed && (
                            <button className="btn-primary take-quiz-btn" onClick={() => handleQuizStart(milestone)}>
                              Retry Assessment
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Technical Readiness Milestone */}
        {(() => {
          const unlocked = allRegularPassed;
          const passed = techMilestonePassed;
          const expanded = expandedMilestone === techMilestone.id;
          const score = state.roadmapProgress[techMilestone.id]?.quizScore;

          return (
            <div id={`milestone-${techMilestone.id}`} className={`milestone-card tech-readiness ${passed ? 'completed' : ''} ${!unlocked ? 'locked' : ''} ${expanded ? 'expanded' : ''}`}>
              <div
                className="milestone-header"
                onClick={() => unlocked && setExpandedMilestone(expanded ? null : techMilestone.id)}
              >
                <div className="milestone-level">
                  {passed ? (
                    <CheckCircle size={28} color="#10b981" />
                  ) : unlocked ? (
                    <div className="level-badge">💻</div>
                  ) : (
                    <Lock size={24} color="#9ca3af" />
                  )}
                </div>
                <div className="milestone-info">
                  <h3>{techMilestone.title}</h3>
                  <p>{techMilestone.description}</p>
                  <div className="milestone-meta">
                    <span><Star size={14} /> {techMilestone.xpReward} XP</span>
                    <span><BookOpen size={14} /> {techMilestone.courses.length} courses</span>
                    {score !== undefined && (
                      <span className={score >= 80 ? 'score-pass' : 'score-fail'}>Score: {score}%</span>
                    )}
                    {!unlocked && <span>Complete all milestones to unlock</span>}
                  </div>
                </div>
                {unlocked && (
                  <div className="milestone-expand">
                    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                )}
              </div>

              {expanded && unlocked && (
                <div className="milestone-content">
                  <div className="milestone-tabs">
                    <button
                      className={`milestone-tab ${(milestoneActiveTab[techMilestone.id] || 'courses') === 'courses' ? 'active' : ''}`}
                      onClick={() => setMilestoneActiveTab(p => ({ ...p, [techMilestone.id]: 'courses' }))}
                    >
                      📚 Courses
                    </button>
                    <button
                      className={`milestone-tab ${(milestoneActiveTab[techMilestone.id] || 'courses') === 'quiz' ? 'active' : ''}`}
                      onClick={() => setMilestoneActiveTab(p => ({ ...p, [techMilestone.id]: 'quiz' }))}
                    >
                      📝 Quiz
                      {score !== undefined && (
                        <span className={`tab-score ${score >= 80 ? 'pass' : 'fail'}`}>{score}%</span>
                      )}
                    </button>
                  </div>

                  {(milestoneActiveTab[techMilestone.id] || 'courses') === 'courses' && (
                    <div className="courses-list">
                      {techMilestone.courses.map((course, ci) => (
                        <a key={ci} href={course.url} target="_blank" rel="noopener noreferrer" className="course-item">
                          <div className="course-info">
                            <span className="course-name">{course.name}</span>
                            <span className="course-platform">
                              {course.platform} • {course.type === 'free' ? '🆓 Free' : '💰 Paid'}
                            </span>
                          </div>
                          <ExternalLink size={16} />
                        </a>
                      ))}
                    </div>
                  )}

                  {(milestoneActiveTab[techMilestone.id] || 'courses') === 'quiz' && (
                    <div className="milestone-quiz-tab">
                      {score === undefined ? (
                        <>
                          <p className="quiz-tab-desc">Test your technical PM readiness. Score 80%+ to unlock the AI Mock Interview and earn <strong>{techMilestone.xpReward} XP</strong>.</p>
                          <button className="btn-primary take-quiz-btn" onClick={() => handleQuizStart(techMilestone)}>
                            Start Assessment
                          </button>
                        </>
                      ) : (
                        <>
                          <div className={`quiz-tab-score-banner ${score >= 80 ? 'pass' : 'fail'}`}>
                            {score >= 80 ? '✅' : '❌'} Score: <strong>{score}%</strong> — {score >= 80 ? 'Passed!' : 'Need 80% to pass'}
                          </div>
                          <div className="quiz-answer-key">
                            <h4>Answer Key</h4>
                            {techMilestone.quiz.map((q, i) => (
                              <div key={i} className="mq-review-card mq-card-correct">
                                <p className="mq-review-q">Q{i + 1}. {q.q}</p>
                                <div className="mq-review-opts">
                                  {q.options.map((opt, j) => (
                                    <div key={j} className={`mq-review-opt ${j === q.answer ? 'mq-opt-correct' : ''}`}>
                                      <span className="option-letter">{String.fromCharCode(65 + j)}</span>
                                      {opt}
                                      {j === q.answer && <span className="mq-tag correct">Correct</span>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          {!passed && (
                            <button className="btn-primary take-quiz-btn" onClick={() => handleQuizStart(techMilestone)}>
                              Retry Assessment
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })()}

        {/* AI Mock Interview Milestone */}
        <div className={`milestone-card final ${allRegularPassed && techMilestonePassed ? 'unlocked' : 'locked'}`}>
          <div className="milestone-header" onClick={() => {
            if (allRegularPassed && techMilestonePassed) navigate('/interview');
          }}>
            <div className="milestone-level">
              {state.interviewResult?.overall >= 70 ? (
                <CheckCircle size={28} color="#10b981" />
              ) : allRegularPassed && techMilestonePassed ? (
                <div className="level-badge final-badge">🎤</div>
              ) : (
                <Lock size={24} color="#9ca3af" />
              )}
            </div>
            <div className="milestone-info">
              <h3>AI Mock Video Interview</h3>
              <p>30-minute AI-powered video interview to validate your PM readiness</p>
              <div className="milestone-meta">
                <span><Star size={14} /> 1000 XP</span>
                {state.interviewResult?.overall >= 70 ? (
                  <span className="score-pass">Score: {state.interviewResult.overall}%</span>
                ) : (
                  <span>Complete all milestones + Technical Readiness to unlock</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Book Real PM Interview Milestone */}
        {(() => {
          const interviewPassed = state.interviewResult?.overall >= 70;
          return (
            <div className={`milestone-card final booking-milestone ${interviewPassed ? 'unlocked' : 'locked'}`}>
              <div className="milestone-header" onClick={() => {
                if (interviewPassed) setShowBooking(!showBooking);
              }}>
                <div className="milestone-level">
                  {bookingConfirmed ? (
                    <CheckCircle size={28} color="#10b981" />
                  ) : interviewPassed ? (
                    <div className="level-badge final-badge">📅</div>
                  ) : (
                    <Lock size={24} color="#9ca3af" />
                  )}
                </div>
                <div className="milestone-info">
                  <h3>Book Interview with a PM</h3>
                  <p>Schedule a real 1:1 interview with an experienced Product Manager</p>
                  <div className="milestone-meta">
                    <span><UserCheck size={14} /> Real PM Feedback</span>
                    {interviewPassed ? (
                      <span className="score-pass">Unlocked</span>
                    ) : (
                      <span>Pass AI interview to unlock</span>
                    )}
                  </div>
                </div>
                {interviewPassed && (
                  <div className="milestone-expand">
                    {showBooking ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                )}
              </div>

              {showBooking && interviewPassed && !bookingConfirmed && (
                <div className="milestone-content booking-content">
                  <h4>Choose a PM to Interview With</h4>
                  <div className="pm-list">
                    {availablePMs.map((pm, i) => (
                      <div
                        key={i}
                        className={`pm-card ${bookingForm.pmName === pm.name ? 'selected' : ''}`}
                        onClick={() => setBookingForm(prev => ({ ...prev, pmName: pm.name }))}
                      >
                        <div className="pm-avatar">{pm.avatar}</div>
                        <div className="pm-details">
                          <strong>{pm.name}</strong>
                          <span className="pm-title">{pm.title}</span>
                          <span className="pm-expertise">{pm.expertise}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {bookingForm.pmName && (
                    <div className="booking-form">
                      <h4>Select Date & Time</h4>
                      <div className="booking-fields">
                        <div className="field-group">
                          <label>Date</label>
                          <input
                            type="date"
                            value={bookingForm.date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                          />
                        </div>
                        <div className="field-group">
                          <label>Time Slot</label>
                          <div className="time-slots">
                            {availablePMs.find(p => p.name === bookingForm.pmName)?.slots.map(slot => (
                              <button
                                key={slot}
                                className={`time-slot ${bookingForm.time === slot ? 'selected' : ''}`}
                                onClick={() => setBookingForm(prev => ({ ...prev, time: slot }))}
                              >
                                <Clock size={12} /> {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="field-group">
                          <label>Notes for the PM (optional)</label>
                          <textarea
                            value={bookingForm.notes}
                            onChange={e => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Topics you'd like to discuss, questions, or focus areas..."
                            rows={3}
                          />
                        </div>
                      </div>

                      <button
                        className="btn-primary book-btn"
                        disabled={!bookingForm.date || !bookingForm.time}
                        onClick={() => {
                          const selectedPM = availablePMs.find(p => p.name === bookingForm.pmName);
                          if (selectedPM?.email) {
                            // Build Google Calendar event link
                            const dateStr = bookingForm.date.replace(/-/g, '');
                            const [timePart, ampm] = bookingForm.time.split(' ');
                            let [hours, mins] = timePart.split(':').map(Number);
                            if (ampm === 'PM' && hours !== 12) hours += 12;
                            if (ampm === 'AM' && hours === 12) hours = 0;
                            const startTime = `${dateStr}T${String(hours).padStart(2,'0')}${String(mins).padStart(2,'0')}00`;
                            const endHours = hours + 1;
                            const endTime = `${dateStr}T${String(endHours).padStart(2,'0')}${String(mins).padStart(2,'0')}00`;
                            const title = encodeURIComponent(`PM Interview with ${selectedPM.name}`);
                            const details = encodeURIComponent(`PM Career Readiness Interview\n\nNotes: ${bookingForm.notes || 'N/A'}`);
                            const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&add=${selectedPM.email}`;
                            window.open(gcalUrl, '_blank');
                          }
                          setBookingConfirmed(true);
                        }}
                      >
                        <Calendar size={18} /> Book Interview with {bookingForm.pmName}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {bookingConfirmed && showBooking && (
                <div className="milestone-content booking-confirmed">
                  <div className="booking-success">
                    <CheckCircle size={40} color="#10b981" />
                    <h3>Interview Booked!</h3>
                    <div className="booking-details">
                      <p><strong>PM:</strong> {bookingForm.pmName}</p>
                      {availablePMs.find(p => p.name === bookingForm.pmName)?.email && (
                        <p><strong>Email:</strong> {availablePMs.find(p => p.name === bookingForm.pmName).email}</p>
                      )}
                      <p><strong>Date:</strong> {new Date(bookingForm.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p><strong>Time:</strong> {bookingForm.time}</p>
                    </div>
                    <p className="booking-note">
                      {availablePMs.find(p => p.name === bookingForm.pmName)?.email
                        ? 'A Google Calendar invite has been created. Check your calendar for the event with the PM.'
                        : 'A calendar invite has been sent. You\'ll receive a confirmation email with the meeting link.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* ── Quiz Result Modal ── */}
      {quizResultModal && (
        <div className="qrm-overlay" onClick={() => setQuizResultModal(null)}>
          <div className="qrm-modal" onClick={e => e.stopPropagation()}>
            <div className={`qrm-score-circle ${quizResultModal.passed ? 'pass' : 'fail'}`}>
              <span className="qrm-pct">{quizResultModal.score}%</span>
              <span className="qrm-label">{quizResultModal.passed ? 'Passed' : 'Failed'}</span>
            </div>
            <h3 className="qrm-title">{quizResultModal.passed ? '🎉 Well done!' : '😅 Not quite there'}</h3>
            <p className="qrm-detail">
              {quizResultModal.correct}/{quizResultModal.total} correct
              {quizResultModal.passed
                ? ` · +${quizResultModal.milestone.xpReward} XP earned!`
                : ' · Need 80% to pass'}
            </p>
            {quizResultModal.passed && (
              <div className="xp-earned">+{quizResultModal.milestone.xpReward} XP</div>
            )}

            <div className="qrm-actions">
              {!quizResultModal.passed && (
                <button className="btn-primary" onClick={() => {
                  const m = quizResultModal.milestone;
                  setQuizResultModal(null);
                  handleQuizStart(m);
                }}>
                  Retry Assessment
                </button>
              )}
              {quizResultModal.nextMilestone && (
                <button className="btn-primary" onClick={() => {
                  const next = quizResultModal.nextMilestone;
                  setExpandedMilestone(next.id);
                  setMilestoneActiveTab(p => ({ ...p, [next.id]: 'courses' }));
                  setQuizResultModal(null);
                  setTimeout(() => {
                    document.getElementById(`milestone-${next.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}>
                  Next: {quizResultModal.nextMilestone.title} →
                </button>
              )}
              {!quizResultModal.nextMilestone && quizResultModal.passed && (
                <button className="btn-primary" onClick={() => setQuizResultModal(null)}>
                  View Roadmap
                </button>
              )}
              <button className="btn-secondary" onClick={() => setQuizResultModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
