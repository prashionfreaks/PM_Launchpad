import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Trophy, Mail, Lock, UserPlus } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else if (data.user && data.user.identities?.length === 0) {
      // Supabase returns a fake success for existing emails — detect via empty identities
      setError('An account with this email already exists. Please sign in.');
    } else {
      await supabase.auth.signOut();
      navigate('/login', { state: { fromSignup: true, email: form.email } });
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
          <h1>Ready PM</h1>
          <p className="hero-subtitle">From Aspiring to Hired — your personalized PM career launchpad.</p>
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
          <h2>Create your account</h2>
          <p className="auth-desc">Start your PM journey today — it's free</p>

          <button className="google-btn" onClick={handleGoogle} disabled={googleLoading}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />
            {googleLoading ? 'Redirecting...' : 'Continue with Google'}
          </button>

          <div className="auth-divider"><span>or</span></div>

          <form onSubmit={handleSignup}>
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
              <label>Password</label>
              <div className="input-icon-wrap">
                <Lock size={16} className="input-icon" />
                <input
                  type="password" placeholder="Min. 6 characters"
                  value={form.password} onChange={e => update('password', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-icon-wrap">
                <Lock size={16} className="input-icon" />
                <input
                  type="password" placeholder="Re-enter your password"
                  value={form.confirm} onChange={e => update('confirm', e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="btn-primary auth-submit" disabled={loading}>
              <UserPlus size={18} />
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
