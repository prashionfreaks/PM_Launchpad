import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';
import { pmArticles } from '../data/labsData';
import { Trophy, BookOpen, TrendingUp, Medal, Clock, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

const FALLBACK_USERS = [
  { name: 'Aryan Mehta',      role: 'Software Engineer → PM',  xp: 4250, avatar: 'A' },
  { name: 'Sneha Iyer',       role: 'Data Analyst → PM',       xp: 3800, avatar: 'S' },
  { name: 'Rohan Kapoor',     role: 'Designer → PM',           xp: 3400, avatar: 'R' },
  { name: 'Divya Nair',       role: 'MBA → Product',           xp: 3100, avatar: 'D' },
  { name: 'Karan Sharma',     role: 'Business Analyst → PM',   xp: 2900, avatar: 'K' },
  { name: 'Priya Venkat',     role: 'Marketing → PM',          xp: 2600, avatar: 'P' },
  { name: 'Nikhil Bose',      role: 'Student → PM',            xp: 2200, avatar: 'N' },
  { name: 'Aisha Rahman',     role: 'Consultant → PM',         xp: 1900, avatar: 'A' },
  { name: 'Vikram Joshi',     role: 'Engineer → PM',           xp: 1600, avatar: 'V' },
  { name: 'Meera Pillai',     role: 'Operations → PM',         xp: 1300, avatar: 'M' },
  { name: 'Sahil Gupta',      role: 'Sales → PM',              xp: 950,  avatar: 'S' },
  { name: 'Tanvi Desai',      role: 'HR → PM',                 xp: 620,  avatar: 'T' },
  { name: 'Harsh Malhotra',   role: 'Finance → PM',            xp: 380,  avatar: 'H' },
  { name: 'Riya Choudhary',   role: 'Student → PM',            xp: 210,  avatar: 'R' },
  { name: 'Aman Tiwari',      role: 'Fresher → PM',            xp: 80,   avatar: 'A' },
];

const calcXP = (roadmapProgress) => {
  if (!roadmapProgress || typeof roadmapProgress !== 'object') return 0;
  return Object.values(roadmapProgress).reduce(
    (sum, m) => sum + (m?.passed ? (m?.xpReward || 0) : 0), 0
  );
};

// Simulated community read counts per article
const ARTICLE_READ_COUNTS = {
  'art-1': 1284,
  'art-2': 1107,
  'art-3': 982,
  'art-4': 874,
  'art-5': 763,
  'art-6': 651,
};

const getLevel = (xp) => {
  if (xp >= 4000) return { level: 5, title: 'PM Leader',    color: '#f59e0b' };
  if (xp >= 2500) return { level: 4, title: 'Senior PM',    color: '#8b5cf6' };
  if (xp >= 1500) return { level: 3, title: 'PM',           color: '#6366f1' };
  if (xp >= 500)  return { level: 2, title: 'Associate PM', color: '#06b6d4' };
  return              { level: 1, title: 'PM Aspirant',  color: '#10b981' };
};

const rankMedal = (rank) => {
  if (rank === 1) return { icon: '🥇', color: '#f59e0b' };
  if (rank === 2) return { icon: '🥈', color: '#9ca3af' };
  if (rank === 3) return { icon: '🥉', color: '#cd7f32' };
  return null;
};

export default function Community() {
  const { state } = useApp();
  const [leaderboardUsers, setLeaderboardUsers] = useState(null);
  const [loadingLB, setLoadingLB] = useState(true);

  useEffect(() => {
    supabase
      .from('users')
      .select('name, current_role, roadmap_progress')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const mapped = data.map(u => ({
            name: u.name || 'Anonymous',
            role: u.current_role ? `${u.current_role} → PM` : 'PM Aspirant',
            xp: calcXP(u.roadmap_progress),
            avatar: (u.name?.[0] || 'U').toUpperCase(),
            isReal: true,
          }));
          setLeaderboardUsers(mapped);
        } else {
          setLeaderboardUsers(null);
        }
      })
      .finally(() => setLoadingLB(false));
  }, []);

  // Calculate current user XP
  const totalXP = Object.values(state.roadmapProgress || {}).reduce(
    (sum, m) => sum + (m.passed ? (m.xpReward || 0) : 0), 0
  );

  const currentUser = state.user
    ? { name: state.user.name, role: state.user.currentRole ? `${state.user.currentRole} → PM` : 'PM Aspirant', xp: totalXP, avatar: state.user.name?.[0]?.toUpperCase() || 'U', isCurrentUser: true, isReal: true }
    : null;

  // Merge real users over fallback (real users replace fallback by name match),
  // then add current user, then sort by XP
  const allUsers = (() => {
    const realUsers = leaderboardUsers ?? [];
    const realNames = new Set(realUsers.map(u => u.name));
    // Keep fallback users that don't have a real counterpart
    const fallbackPool = FALLBACK_USERS.filter(u => !realNames.has(u.name));
    // Blend: real users + enough fallback to pad the board
    const blended = [...realUsers, ...fallbackPool];
    // Add current user (deduplicate by name)
    const withCurrentUser = currentUser
      ? [...blended.filter(u => u.name !== currentUser.name), currentUser]
      : blended;
    return withCurrentUser.sort((a, b) => b.xp - a.xp);
  })();

  const currentUserRank = currentUser
    ? allUsers.findIndex(u => u.isCurrentUser) + 1
    : null;

  // Top articles by community read count
  const topArticles = pmArticles
    .filter(a => ARTICLE_READ_COUNTS[a.id])
    .sort((a, b) => (ARTICLE_READ_COUNTS[b.id] || 0) - (ARTICLE_READ_COUNTS[a.id] || 0));

  const labsProgress = state.labsProgress || {};

  return (
    <div className="page-container">
      <h1>Community</h1>
      <p className="page-subtitle">See how you stack up against other aspiring PMs and discover what the community is reading.</p>

      <div className="community-layout">

        {/* ── Leaderboard ─────────────────────────────────────── */}
        <div className="community-main">
          <div className="community-card">
            <div className="community-card-header">
              <Trophy size={20} color="#f59e0b" />
              <h2>XP Leaderboard</h2>
              {loadingLB
                ? <span className="lb-loading-badge">Loading…</span>
                : leaderboardUsers
                  ? <span className="lb-live-badge">Live</span>
                  : <span className="lb-demo-badge">Demo data</span>
              }
              {currentUserRank && (
                <span className="your-rank-badge">Your rank: #{currentUserRank}</span>
              )}
            </div>

            {/* Top 3 podium */}
            <div className="podium">
              {allUsers.slice(0, 3).map((user, i) => {
                const lvl = getLevel(user.xp);
                const rank = i + 1;
                return (
                  <div key={i} className={`podium-card rank-${rank} ${user.isCurrentUser ? 'is-you' : ''}`}>
                    <div className="podium-medal">{rankMedal(rank).icon}</div>
                    <div className="podium-avatar" style={{ background: user.isCurrentUser ? '#6366f1' : lvl.color }}>
                      {user.avatar}
                    </div>
                    <div className="podium-name">{user.isCurrentUser ? `${user.name} (You)` : user.name}</div>
                    <div className="podium-role">{user.role}</div>
                    <div className="podium-xp" style={{ color: lvl.color }}>{user.xp.toLocaleString()} XP</div>
                    <div className="podium-level" style={{ color: lvl.color }}>Lv.{lvl.level} {lvl.title}</div>
                  </div>
                );
              })}
            </div>

            {/* Rest of leaderboard */}
            <div className="leaderboard-list">
              {allUsers.slice(3).map((user, i) => {
                const rank = i + 4;
                const lvl = getLevel(user.xp);
                return (
                  <div key={i} className={`leaderboard-row ${user.isCurrentUser ? 'is-you' : ''}`}>
                    <span className="lb-rank">#{rank}</span>
                    <div className="lb-avatar" style={{ background: user.isCurrentUser ? '#6366f1' : lvl.color }}>
                      {user.avatar}
                    </div>
                    <div className="lb-info">
                      <span className="lb-name">{user.isCurrentUser ? `${user.name} (You)` : user.name}</span>
                      <span className="lb-role">{user.role}</span>
                    </div>
                    <div className="lb-right">
                      <span className="lb-xp" style={{ color: lvl.color }}>{user.xp.toLocaleString()} XP</span>
                      <span className="lb-title" style={{ color: lvl.color }}>Lv.{lvl.level} {lvl.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Sidebar: Most Read Articles ─────────────────────── */}
        <div className="community-sidebar">
          <div className="community-card">
            <div className="community-card-header">
              <TrendingUp size={20} color="#6366f1" />
              <h2>Trending in Community</h2>
            </div>
            <p className="community-card-sub">Most read articles by aspiring PMs this week</p>

            <div className="trending-list">
              {topArticles.map((article, i) => {
                const isRead = !!labsProgress[`article-${article.id}`];
                const reads = ARTICLE_READ_COUNTS[article.id];
                return (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`trending-item ${isRead ? 'already-read' : ''}`}
                  >
                    <span className="trending-rank">{i + 1}</span>
                    <div className="trending-info">
                      <div className="trending-title">{article.title}</div>
                      <div className="trending-meta">
                        <span className="trending-author">{article.author}</span>
                        <span className="trending-dot">·</span>
                        <span><Clock size={12} /> {article.readTime}</span>
                        <span className="trending-dot">·</span>
                        <span className="trending-reads"><BookOpen size={12} /> {reads.toLocaleString()} reads</span>
                      </div>
                      {isRead && <span className="trending-read-badge">Read</span>}
                    </div>
                    <ExternalLink size={14} className="trending-ext" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* XP tip card */}
          <div className="community-card xp-tip-card">
            <div className="community-card-header">
              <Medal size={20} color="#8b5cf6" />
              <h2>Earn More XP</h2>
            </div>
            <ul className="xp-tip-list">
              <li><span className="xp-pill">+100–300</span> Complete roadmap milestones</li>
              <li><span className="xp-pill">+50</span> Pass a milestone quiz</li>
              <li><span className="xp-pill">Bonus</span> Score 90%+ on mock tests</li>
              <li><span className="xp-pill">Bonus</span> Complete mock interview</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
