import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';

export default function VerifyEmail() {
  return (
    <div className="auth-page auth-page-centered">
      <div className="auth-card auth-card-center">
        <div className="auth-icon-circle">
          <MailCheck size={32} color="#6366f1" />
        </div>
        <h2>Check your inbox</h2>
        <p className="auth-desc">
          We sent a verification link to your email address.
          Click the link to activate your account.
        </p>
        <p className="auth-desc-sm">
          Didn't receive it? Check your spam folder or{' '}
          <Link to="/signup" className="auth-link">try again</Link>.
        </p>
        <Link to="/login" className="btn-primary auth-submit" style={{ display: 'flex', justifyContent: 'center' }}>
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
