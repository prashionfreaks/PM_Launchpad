import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getMilestones } from '../data/roadmapData';
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
  const [quizMode, setQuizMode] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({ date: '', time: '', pmName: '', notes: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!state.selectedPath) {
    return (
      <div className="page-container center-content">
        <h2>No path selected</h2>
        <p>Complete the evaluation and choose a learning path first.</p>
        <button className="btn-primary" onClick={() => navigate('/results')}>
          View Results
        </button>
      </div>
    );
  }

  const role = pmRoles.find(r => r.id === state.selectedPath);
  const milestones = getMilestones(state.selectedPath);

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

  const handleQuizStart = (milestone) => {
    setQuizMode(milestone);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleQuizAnswer = (qIndex, ansIndex) => {
    setQuizAnswers(prev => ({ ...prev, [qIndex]: ansIndex }));
  };

  const handleQuizSubmit = () => {
    const milestone = quizMode;
    const correct = milestone.quiz.reduce((count, q, i) => {
      return count + (quizAnswers[i] === q.answer ? 1 : 0);
    }, 0);
    const score = Math.round((correct / milestone.quiz.length) * 100);

    dispatch({
      type: 'COMPLETE_MILESTONE_QUIZ',
      payload: {
        milestoneId: milestone.id,
        score,
      },
    });

    if (score >= 80) {
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

    setQuizSubmitted(true);
  };

  if (quizMode && !quizSubmitted) {
    return (
      <div className="page-container">
        <div className="milestone-quiz">
          <h2>📝 {quizMode.title} — Assessment</h2>
          <p className="quiz-instruction">Score 80% or higher to pass and unlock the next level.</p>

          {quizMode.quiz.map((q, i) => (
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
              disabled={Object.keys(quizAnswers).length < quizMode.quiz.length}
              onClick={handleQuizSubmit}
            >
              Submit ({Object.keys(quizAnswers).length}/{quizMode.quiz.length})
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizSubmitted) {
    const score = state.roadmapProgress[quizMode.id]?.quizScore || 0;
    const passed = score >= 80;
    return (
      <div className="page-container center-content">
        <div className={`quiz-result-card ${passed ? 'passed' : 'failed'}`}>
          {passed ? <Trophy size={60} color="#f59e0b" /> : <Target size={60} color="#ef4444" />}
          <h2>{passed ? 'Congratulations!' : 'Not quite there yet'}</h2>
          <div className="result-score">
            <span className="big-score">{score}%</span>
            <span className="pass-mark">Pass mark: 80%</span>
          </div>
          {passed ? (
            <>
              <p>You earned <strong>{quizMode.xpReward} XP</strong>! 🎉</p>
              <div className="xp-earned">+{quizMode.xpReward} XP</div>
            </>
          ) : (
            <p>Review the course materials and try again. You can do this!</p>
          )}
          <button className="btn-primary" onClick={() => { setQuizMode(null); setQuizSubmitted(false); }}>
            Back to Roadmap
          </button>
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
            <span>{completedCount}/{milestones.length}</span>
          </div>
        </div>
      </div>

      <div className="roadmap-progress-bar">
        <div className="roadmap-progress-fill" style={{ width: `${(completedCount / milestones.length) * 100}%` }} />
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
                  <h4>📚 Recommended Courses</h4>
                  <div className="courses-list">
                    {milestone.courses.map((course, ci) => (
                      <a
                        key={ci}
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="course-item"
                      >
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

                  {!passed && (
                    <button className="btn-primary take-quiz-btn" onClick={() => handleQuizStart(milestone)}>
                      Take Assessment (need 80% to pass)
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* AI Mock Interview Milestone */}
        <div className={`milestone-card final ${completedCount === milestones.length ? 'unlocked' : 'locked'}`}>
          <div className="milestone-header" onClick={() => {
            if (completedCount === milestones.length) navigate('/interview');
          }}>
            <div className="milestone-level">
              {state.interviewResult?.overall >= 70 ? (
                <CheckCircle size={28} color="#10b981" />
              ) : completedCount === milestones.length ? (
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
                  <span>Complete all milestones to unlock</span>
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
    </div>
  );
}
