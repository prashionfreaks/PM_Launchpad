import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  User, ClipboardCheck, BarChart3, Map, FlaskConical,
  Mic, Briefcase, FolderOpen, LogOut, Trophy, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/labs', label: 'Labs', icon: FlaskConical },
  { path: '/interview', label: 'Interview', icon: Mic },
  { path: '/jobs', label: 'Jobs', icon: Briefcase },
  { path: '/portfolio', label: 'Portfolio', icon: FolderOpen },
];

export default function Layout() {
  const { state, dispatch } = useApp();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalXP = Object.values(state.roadmapProgress).reduce(
    (sum, m) => sum + (m.passed ? (m.xpReward || 0) : 0), 0
  );

  const getLevel = (xp) => {
    if (xp >= 4000) return { level: 5, title: 'PM Leader', color: '#f59e0b' };
    if (xp >= 2500) return { level: 4, title: 'Senior PM', color: '#8b5cf6' };
    if (xp >= 1500) return { level: 3, title: 'PM', color: '#6366f1' };
    if (xp >= 500) return { level: 2, title: 'Associate PM', color: '#06b6d4' };
    return { level: 1, title: 'PM Aspirant', color: '#10b981' };
  };

  const levelInfo = getLevel(totalXP);

  return (
    <div className="app-layout">
      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <Trophy size={28} color="#f59e0b" />
            <div>
              <h1>Ready PM</h1>
              <span className="tagline">Your PM Career Starts Here</span>
            </div>
          </div>
        </div>

        {state.user && (
          <div className="user-badge">
            <div className="avatar">{state.user.name?.[0]?.toUpperCase() || 'U'}</div>
            <div className="user-info">
              <span className="user-name">{state.user.name}</span>
              <span className="user-level" style={{ color: levelInfo.color }}>
                Lv.{levelInfo.level} {levelInfo.title}
              </span>
            </div>
            <div className="xp-bar">
              <div className="xp-fill" style={{ width: `${Math.min(100, (totalXP / 4500) * 100)}%` }} />
            </div>
            <span className="xp-text">{totalXP} XP</span>
          </div>
        )}

        <nav>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {state.user && (
          <button className="logout-btn" onClick={() => {
            if (confirm('Reset all progress? This cannot be undone.')) {
              dispatch({ type: 'RESET' });
            }
          }}>
            <LogOut size={18} />
            <span>Reset Progress</span>
          </button>
        )}
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
