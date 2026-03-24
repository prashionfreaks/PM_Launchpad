import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Trophy, Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="auth-hero-content">
          <div className="hero-badge">
            <Trophy size={40} color="#f59e0b" />
          </div>
          <h1>PM Launchpad</h1>
          <p className="hero-subtitle">Your personalized path to becoming a Product Manager</p>
          <div className="hero-features">
            <div className="feature">✦ AI-Powered Evaluation</div>
            <div className="feature">✦ Personalized Roadmap</div>
            <div className="feature">✦ Hands-on Case Studies</div>
            <div className="feature">✦ Mock Interviews</div>
          </div>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-card">
          <h2>Welcome back</h2>
          <p className="auth-desc">Sign in to continue your PM journey</p>

          <button className="google-btn" onClick={handleGoogle} disabled={googleLoading}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />
            {googleLoading ? 'Redirecting...' : 'Continue with Google'}
          </button>

          <div className="auth-divider"><span>or</span></div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <div className="input-icon-wrap">
                <Mail size={16} className="input-icon" />
                <input
                  type="email" placeholder="your@email.com"
                  value={form.email} onChange={e => update('email', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="label-row">
                <label>Password</label>
                <Link to="/forgot-password" className="auth-link-sm">Forgot password?</Link>
              </div>
              <div className="input-icon-wrap">
                <Lock size={16} className="input-icon" />
                <input
                  type="password" placeholder="Enter your password"
                  value={form.password} onChange={e => update('password', e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="btn-primary auth-submit" disabled={loading}>
              <LogIn size={18} />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-footer-text">
            Don't have an account? <Link to="/signup" className="auth-link">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
