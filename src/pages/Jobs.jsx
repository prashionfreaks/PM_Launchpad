import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { jobListings } from '../data/labsData';
import { pmRoles } from '../data/quizQuestions';
import {
  Briefcase, MapPin, Clock, ExternalLink, Filter,
  Star, Building2, Search
} from 'lucide-react';

export default function Jobs() {
  const { state } = useApp();
  const [filter, setFilter] = useState('recommended');
  const [searchTerm, setSearchTerm] = useState('');

  const targetRole = state.user?.targetRole || '';
  const yoe = state.user?.yoe || '';

  const getYoeRange = (yoeStr) => {
    if (yoeStr.includes('0-1')) return [0, 1];
    if (yoeStr.includes('1-3')) return [1, 3];
    if (yoeStr.includes('3-5')) return [3, 5];
    if (yoeStr.includes('5-8')) return [5, 8];
    if (yoeStr.includes('8+')) return [8, 20];
    return [0, 20];
  };

  const matchesExperience = (jobExp) => {
    if (!yoe) return true;
    const [userMin] = getYoeRange(yoe);
    const jobMatch = jobExp.match(/(\d+)-?(\d+)?/);
    if (!jobMatch) return true;
    const jobMin = parseInt(jobMatch[1]);
    const jobMax = jobMatch[2] ? parseInt(jobMatch[2]) : jobMin + 2;
    return userMin >= jobMin - 1 && userMin <= jobMax + 1;
  };

  const getRelevanceScore = (job) => {
    let score = 0;
    if (job.role === targetRole) score += 3;
    if (matchesExperience(job.experience)) score += 2;
    const roleCat = pmRoles.find(r => r.id === targetRole);
    const jobCat = pmRoles.find(r => r.id === job.role);
    if (roleCat && jobCat) score += 1;
    return score;
  };

  let filteredJobs = [...jobListings];

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredJobs = filteredJobs.filter(j =>
      j.title.toLowerCase().includes(term) ||
      j.company.toLowerCase().includes(term) ||
      j.skills.some(s => s.toLowerCase().includes(term))
    );
  }

  if (filter === 'recommended') {
    filteredJobs.sort((a, b) => getRelevanceScore(b) - getRelevanceScore(a));
  } else if (filter === 'entry') {
    filteredJobs = filteredJobs.filter(j => j.experience.includes('0-'));
  } else if (filter === 'mid') {
    filteredJobs = filteredJobs.filter(j => /[2-5]/.test(j.experience));
  } else if (filter === 'senior') {
    filteredJobs = filteredJobs.filter(j => /[4-9]/.test(j.experience));
  }

  const roleLabel = pmRoles.find(r => r.id === targetRole)?.label;

  return (
    <div className="page-container">
      <h1>Job Opportunities</h1>
      <p className="page-subtitle">
        {roleLabel
          ? `Curated PM jobs based on your goal: ${roleLabel}`
          : 'Explore PM opportunities across top companies'}
      </p>

      <div className="jobs-controls">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by title, company, or skill..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          {[
            { id: 'recommended', label: 'Recommended' },
            { id: 'all', label: 'All' },
            { id: 'entry', label: 'Entry Level' },
            { id: 'mid', label: 'Mid Level' },
            { id: 'senior', label: 'Senior' },
          ].map(f => (
            <button
              key={f.id}
              className={`filter-btn ${filter === f.id ? 'active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="jobs-grid">
        {filteredJobs.map(job => {
          const isRecommended = job.role === targetRole;
          return (
            <div key={job.id} className={`job-card ${isRecommended ? 'recommended' : ''}`}>
              {isRecommended && (
                <div className="recommended-badge">
                  <Star size={14} /> Best Match
                </div>
              )}

              <div className="job-header">
                <h3>{job.title}</h3>
                <div className="job-company">
                  <Building2 size={16} />
                  <span>{job.company}</span>
                </div>
              </div>

              <p className="job-desc">{job.description}</p>

              <div className="job-meta">
                <span><MapPin size={14} /> {job.location}</span>
                <span><Clock size={14} /> {job.experience}</span>
                <span><Briefcase size={14} /> {job.type}</span>
              </div>

              <div className="job-skills">
                {job.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>

              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary job-apply-btn"
              >
                Apply <ExternalLink size={16} />
              </a>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="empty-state">
          <Briefcase size={48} color="#9ca3af" />
          <h3>No jobs match your filters</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
