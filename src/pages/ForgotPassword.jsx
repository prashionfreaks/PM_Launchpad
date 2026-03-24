import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="auth-page auth-page-centered">
      <div className="auth-card auth-card-center">
        {sent ? (
          <>
            <div className="auth-icon-circle">
              <Mail size={32} color="#6366f1" />
            </div>
            <h2>Reset link sent</h2>
            <p className="auth-desc">
              We sent a password reset link to <strong>{email}</strong>.
              Check your inbox and follow the instructions.
            </p>
            <Link to="/login" className="btn-primary auth-submit" style={{ display: 'flex', justifyContent: 'center' }}>
              Back to Sign In
            </Link>
          </>
        ) : (
          <>
            <h2>Forgot your password?</h2>
            <p className="auth-desc">
              Enter your email and we'll send you a reset link.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <div className="input-icon-wrap">
                  <Mail size={16} className="input-icon" />
                  <input
                    type="email" placeholder="your@email.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                <Send size={18} />
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <p className="auth-footer-text">
              <Link to="/login" className="auth-link-back">
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
