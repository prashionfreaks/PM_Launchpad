import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { pmRoles } from '../data/quizQuestions';
import { Trophy, ArrowRight, Sparkles } from 'lucide-react';

const currentRoles = [
  'Software Engineer', 'Data Analyst', 'Designer', 'Business Analyst',
  'Marketing', 'Project Manager', 'Student', 'Other'
];

const yoeOptions = ['0-1 years', '1-3 years', '3-5 years', '5-8 years', '8+ years'];

const timelineOptions = [
  '1-3 months', '3-6 months', '6-12 months', '12+ months', 'No rush'
];

export default function Register() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', email: '', currentRole: '', yoe: '',
    targetRole: '', timeline: ''
  });
  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const canProceed = () => {
    if (step === 0) return form.name && form.email;
    if (step === 1) return form.currentRole && form.yoe;
    if (step === 2) return form.targetRole && form.timeline;
    return false;
  };

  const handleSubmit = () => {
    dispatch({ type: 'SET_USER', payload: form });
    navigate('/quiz');
  };

  return (
    <div className="register-page">
      <div className="register-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Trophy size={40} color="#f59e0b" />
          </div>
          <h1>Ready PM</h1>
          <p className="hero-subtitle">Your personalized path to becoming a Product Manager</p>
          <div className="hero-features">
            <div className="feature"><Sparkles size={16} /> AI-Powered Evaluation</div>
            <div className="feature"><Sparkles size={16} /> Personalized Roadmap</div>
            <div className="feature"><Sparkles size={16} /> Hands-on Case Studies</div>
            <div className="feature"><Sparkles size={16} /> Mock Interviews</div>
          </div>
        </div>
      </div>

      <div className="register-form-container">
        <div className="step-indicator">
          {['About You', 'Current Profile', 'Your Goal'].map((label, i) => (
            <div key={i} className={`step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="dot">{i < step ? '✓' : i + 1}</div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="form-card">
          {step === 0 && (
            <>
              <h2>Let's get to know you</h2>
              <p className="form-desc">Tell us a bit about yourself to personalize your journey.</p>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text" placeholder="Enter your full name"
                  value={form.name} onChange={e => update('name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email" placeholder="your@email.com"
                  value={form.email} onChange={e => update('email', e.target.value)}
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2>Your Current Profile</h2>
              <p className="form-desc">This helps us understand your starting point and tailor recommendations.</p>
              <div className="form-group">
                <label>Current Role</label>
                <div className="option-grid">
                  {currentRoles.map(role => (
                    <button
                      key={role}
                      className={`option-btn ${form.currentRole === role ? 'selected' : ''}`}
                      onClick={() => update('currentRole', role)}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Years of Experience</label>
                <div className="option-grid small">
                  {yoeOptions.map(yoe => (
                    <button
                      key={yoe}
                      className={`option-btn ${form.yoe === yoe ? 'selected' : ''}`}
                      onClick={() => update('yoe', yoe)}
                    >
                      {yoe}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Your PM Goal</h2>
              <p className="form-desc">Which PM role are you aiming for, and when do you want to get there?</p>
              <div className="form-group">
                <label>Target PM Role</label>
                <div className="option-grid">
                  {pmRoles.map(role => (
                    <button
                      key={role.id}
                      className={`option-btn role-btn ${form.targetRole === role.id ? 'selected' : ''}`}
                      onClick={() => update('targetRole', role.id)}
                    >
                      <span className="role-icon">{role.icon}</span>
                      <span>{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Target Timeline</label>
                <div className="option-grid small">
                  {timelineOptions.map(t => (
                    <button
                      key={t}
                      className={`option-btn ${form.timeline === t ? 'selected' : ''}`}
                      onClick={() => update('timeline', t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="form-actions">
            {step > 0 && (
              <button className="btn-secondary" onClick={() => setStep(s => s - 1)}>
                Back
              </button>
            )}
            {step < 2 ? (
              <button
                className="btn-primary"
                disabled={!canProceed()}
                onClick={() => setStep(s => s + 1)}
              >
                Continue <ArrowRight size={18} />
              </button>
            ) : (
              <button
                className="btn-primary"
                disabled={!canProceed()}
                onClick={handleSubmit}
              >
                Start Evaluation <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
