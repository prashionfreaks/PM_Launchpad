import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User, GraduationCap, Briefcase,
  Award, Star, Mail, Sparkles, CheckCircle,
  ExternalLink, Trophy, Calendar, TrendingUp, Zap
} from 'lucide-react';

function decodePortfolioData(encoded) {
  try {
    const json = atob(decodeURIComponent(encoded));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function PublicPortfolio() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const encoded = searchParams.get('d');
    if (encoded) {
      const decoded = decodePortfolioData(encoded);
      if (decoded) {
        setData(decoded);
        setTimeout(() => setLoaded(true), 100);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="pub-page">
        <div className="pub-error">
          <div className="pub-error-icon">
            <Trophy size={48} color="#f59e0b" />
          </div>
          <h1>PM Launchpad</h1>
          <h2>Portfolio Not Found</h2>
          <p>This portfolio link may be invalid or expired.</p>
          <Link to="/" className="pub-cta-btn">Go to PM Launchpad</Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="pub-page">
        <div className="pub-loading">
          <div className="pub-loading-spinner" />
          <span>Loading portfolio...</span>
        </div>
      </div>
    );
  }

  const getColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#f97316';
  };

  const hasStats = data.readinessScore || data.interviewScore || data.totalXP > 0 || data.milestonesCompleted > 0;

  return (
    <div className={`pub-page ${loaded ? 'pub-loaded' : ''}`}>
      {/* Floating header bar */}
      <div className="pub-topbar">
        <div className="pub-topbar-brand">
          <Trophy size={18} color="#f59e0b" />
          <span>PM Launchpad</span>
        </div>
        <Link to="/" className="pub-topbar-link">
          Start Your Journey <ExternalLink size={12} />
        </Link>
      </div>

      <div className="pub-container">
        {/* Hero Card */}
        <div className="pub-hero-card">
          <div className="pub-hero-bg">
            <div className="pub-hero-shape s1" />
            <div className="pub-hero-shape s2" />
            <div className="pub-hero-shape s3" />
          </div>
          <div className="pub-hero-content">
            <div className="pub-avatar-ring">
              <div className="pub-avatar">{data.name?.[0]?.toUpperCase() || 'U'}</div>
            </div>
            <h1>{data.name || 'PM Professional'}</h1>
            {data.headline && <p className="pub-headline">{data.headline}</p>}
            <div className="pub-badges">
              {data.email && (
                <span className="pub-badge"><Mail size={13} /> {data.email}</span>
              )}
              {data.currentRole && (
                <span className="pub-badge"><Briefcase size={13} /> {data.currentRole}</span>
              )}
              {data.targetRole && (
                <span className="pub-badge accent"><Star size={13} /> {data.targetRole}</span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        {hasStats && (
          <div className="pub-stats-row">
            {data.readinessScore && (
              <div className="pub-stat-card">
                <div className="pub-stat-ring" style={{ '--ring-color': getColor(data.readinessScore), '--ring-pct': `${(data.readinessScore / 100) * 157}` }}>
                  <svg viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="25" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                    <circle cx="28" cy="28" r="25" fill="none" stroke="var(--ring-color)" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={`${(data.readinessScore / 100) * 157} 157`} transform="rotate(-90 28 28)" />
                  </svg>
                  <span>{data.readinessScore}%</span>
                </div>
                <div className="pub-stat-label">PM Readiness</div>
              </div>
            )}
            {data.interviewScore && (
              <div className="pub-stat-card">
                <div className="pub-stat-ring" style={{ '--ring-color': getColor(data.interviewScore) }}>
                  <svg viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="25" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                    <circle cx="28" cy="28" r="25" fill="none" stroke="var(--ring-color)" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={`${(data.interviewScore / 100) * 157} 157`} transform="rotate(-90 28 28)" />
                  </svg>
                  <span>{data.interviewScore}%</span>
                </div>
                <div className="pub-stat-label">Interview</div>
              </div>
            )}
            {data.totalXP > 0 && (
              <div className="pub-stat-card">
                <div className="pub-stat-icon"><Zap size={24} color="#f59e0b" /></div>
                <div className="pub-stat-big">{data.totalXP}</div>
                <div className="pub-stat-label">XP Earned</div>
              </div>
            )}
            {data.milestonesCompleted > 0 && (
              <div className="pub-stat-card">
                <div className="pub-stat-icon"><TrendingUp size={24} color="#10b981" /></div>
                <div className="pub-stat-big">{data.milestonesCompleted}</div>
                <div className="pub-stat-label">Milestones</div>
              </div>
            )}
          </div>
        )}

        {/* About */}
        {data.summary && (
          <div className="pub-card fade-up">
            <div className="pub-card-title"><User size={18} /> About</div>
            <p className="pub-about-text">{data.summary}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div className="pub-card fade-up">
            <div className="pub-card-title"><Sparkles size={18} /> Skills</div>
            <div className="pub-skills-cloud">
              {data.skills.map((skill, i) => (
                <span key={i} className="pub-skill" style={{ animationDelay: `${i * 0.04}s` }}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <div className="pub-card fade-up">
            <div className="pub-card-title"><Briefcase size={18} /> Experience</div>
            <div className="pub-exp-list">
              {data.experience.map((exp, i) => (
                <div key={i} className="pub-exp-item">
                  <div className="pub-exp-marker">
                    <div className="pub-exp-dot" />
                    {i < data.experience.length - 1 && <div className="pub-exp-line" />}
                  </div>
                  <div className="pub-exp-content">
                    <h3>{exp.title}</h3>
                    {exp.company && <p className="pub-exp-company">{exp.company}</p>}
                    {exp.duration && <span className="pub-exp-date"><Calendar size={11} /> {exp.duration}</span>}
                    {exp.description && <p className="pub-exp-desc">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two-column: Education + Certifications */}
        {(data.education?.length > 0 || data.certifications?.length > 0) && (
          <div className="pub-two-col">
            {data.education?.length > 0 && (
              <div className="pub-card fade-up">
                <div className="pub-card-title"><GraduationCap size={18} /> Education</div>
                {data.education.map((edu, i) => (
                  <div key={i} className="pub-edu-entry">
                    <div className="pub-edu-icon"><GraduationCap size={16} /></div>
                    <div>
                      <h4>{edu.degree}</h4>
                      {edu.institution && <p>{edu.institution}</p>}
                      {edu.year && <span className="pub-edu-year">{edu.year}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {data.certifications?.length > 0 && (
              <div className="pub-card fade-up">
                <div className="pub-card-title"><Award size={18} /> Certifications</div>
                {data.certifications.map((cert, i) => (
                  <div key={i} className="pub-cert-entry">
                    <CheckCircle size={16} color="#10b981" />
                    <div>
                      <h4>{cert.name}</h4>
                      <p>{[cert.issuer, cert.year].filter(Boolean).join(' · ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Competencies */}
        {(data.strengths?.length > 0 || data.improvements?.length > 0) && (
          <div className="pub-card fade-up">
            <div className="pub-card-title"><Star size={18} /> PM Competencies</div>
            <div className="pub-comp-grid">
              {data.strengths?.length > 0 && (
                <div className="pub-comp-col green">
                  <h4><TrendingUp size={14} /> Strengths</h4>
                  {data.strengths.map((s, i) => (
                    <div key={i} className="pub-comp-item"><CheckCircle size={13} /> {s}</div>
                  ))}
                </div>
              )}
              {data.improvements?.length > 0 && (
                <div className="pub-comp-col amber">
                  <h4><Star size={14} /> Growth Areas</h4>
                  {data.improvements.map((s, i) => (
                    <div key={i} className="pub-comp-item"><Star size={13} /> {s}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pub-footer">
          <Trophy size={18} color="#f59e0b" />
          <span>Built with <strong>PM Launchpad</strong></span>
          <Link to="/">Start Your PM Journey <ExternalLink size={12} /></Link>
        </div>
      </div>
    </div>
  );
}
