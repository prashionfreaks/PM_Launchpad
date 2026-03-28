export default function PMLoader({ message = 'Launching your PM journey...' }) {
  return (
    <div className="pml-overlay">
      {/* Stars */}
      <div className="pml-stars" />

      {/* Clouds */}
      <div className="pml-cloud pml-c1" />
      <div className="pml-cloud pml-c2" />
      <div className="pml-cloud pml-c3" />
      <div className="pml-cloud pml-c4" />

      {/* Dotted arc trail across full screen */}
      <svg className="pml-trail-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          x1="-2" y1="82" x2="102" y2="45"
          stroke="rgba(165,180,252,0.18)"
          strokeWidth="0.4"
          strokeDasharray="2 1.5"
        />
      </svg>

      {/* PM Destination flag — top-right area */}
      <div className="pml-dest">
        <div className="pml-dest-glow" />
        <div className="pml-dest-flag">PM</div>
        <div className="pml-dest-pole" />
        <div className="pml-dest-base" />
      </div>

      {/* Flying plane */}
      <div className="pml-plane-wrap">
        <svg viewBox="0 0 64 64" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pml-pg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0e7ff" />
              <stop offset="100%" stopColor="#a5b4fc" />
            </linearGradient>
            <linearGradient id="pml-wg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
          </defs>
          {/* Fuselage */}
          <path d="M8,30 Q20,24 44,28 Q52,29 56,32 Q52,35 44,36 Q20,40 8,34 Z" fill="url(#pml-pg)" />
          {/* Nose */}
          <path d="M44,28 Q58,30 62,32 Q58,34 44,36 Z" fill="#c7d2fe" />
          {/* Wings */}
          <path d="M24,28 Q30,14 40,16 Q36,24 34,28 Z" fill="url(#pml-wg)" opacity="0.95" />
          <path d="M24,36 Q30,50 40,48 Q36,40 34,36 Z" fill="url(#pml-wg)" opacity="0.85" />
          {/* Tail fins */}
          <path d="M10,29 Q12,20 18,22 Q16,26 14,29 Z" fill="#818cf8" />
          <path d="M10,35 Q12,44 18,42 Q16,38 14,35 Z" fill="#818cf8" opacity="0.7" />
          {/* Windows */}
          <ellipse cx="36" cy="32" rx="3.5" ry="2.2" fill="rgba(255,255,255,0.55)" />
          <ellipse cx="29" cy="32" rx="2.8" ry="1.9" fill="rgba(255,255,255,0.4)" />
          {/* Engine */}
          <rect x="27" y="36" width="10" height="4" rx="2" fill="#4338ca" opacity="0.8" />
          <ellipse cx="27" cy="38" rx="2" ry="2" fill="#a5b4fc" opacity="0.5" />
        </svg>
        {/* Exhaust trail */}
        <div className="pml-exhaust">
          <span style={{ '--ed': '0s',   '--ew': '22px' }} />
          <span style={{ '--ed': '0.1s', '--ew': '14px' }} />
          <span style={{ '--ed': '0.2s', '--ew': '9px'  }} />
        </div>
      </div>

      {/* Message — bottom center */}
      <div className="pml-bottom">
        <p className="pml-message">{message}</p>
        <div className="pml-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
