import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, CheckCircle } from 'lucide-react';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
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
    const { error } = await supabase.auth.updateUser({ password: form.password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setDone(true);
      setTimeout(() => navigate('/login'), 2500);
    }
  };

  return (
    <div className="auth-page auth-page-centered">
      <div className="auth-card auth-card-center">
        {done ? (
          <>
            <div className="auth-icon-circle auth-icon-success">
              <CheckCircle size={32} color="#10b981" />
            </div>
            <h2>Password updated</h2>
            <p className="auth-desc">
              Your password has been changed successfully. Redirecting you to sign in...
            </p>
          </>
        ) : (
          <>
            <h2>Set new password</h2>
            <p className="auth-desc">Enter and confirm your new password below.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>New Password</label>
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
                <label>Confirm New Password</label>
                <div className="input-icon-wrap">
                  <Lock size={16} className="input-icon" />
                  <input
                    type="password" placeholder="Re-enter new password"
                    value={form.confirm} onChange={e => update('confirm', e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
