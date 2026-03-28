export default function PMLoader({ message = 'Launching your PM journey...' }) {
  return (
    <div className="pml-overlay">
      <div className="pml-sky">
        {/* Stars */}
        <div className="pml-stars" />

        {/* Clouds */}
        <div className="pml-cloud pml-c1" />
        <div className="pml-cloud pml-c2" />
        <div className="pml-cloud pml-c3" />

        {/* Dotted arc trail */}
        <svg className="pml-trail-svg" viewBox="0 0 560 220" preserveAspectRatio="none">
          <path
            d="M 55 150 Q 180 30 490 90"
            fill="none"
            stroke="rgba(165,180,252,0.25)"
            strokeWidth="2"
            strokeDasharray="7 5"
          />
        </svg>

        {/* PM Destination flag */}
        <div className="pml-dest">
          <div className="pml-dest-glow" />
          <div className="pml-dest-flag">PM</div>
          <div className="pml-dest-pole" />
          <div className="pml-dest-base" />
        </div>

        {/* Flying kite */}
        <div className="pml-kite-wrap">
          <div className="pml-kite">
            <svg viewBox="0 0 48 58" width="44" height="52" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="pml-kg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a5b4fc" />
                  <stop offset="55%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4338ca" />
                </linearGradient>
              </defs>
              {/* Body */}
              <polygon points="24,1 47,24 24,47 1,24" fill="url(#pml-kg)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
              {/* Cross sticks */}
              <line x1="1" y1="24" x2="47" y2="24" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
              <line x1="24" y1="1" x2="24" y2="47" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
              {/* Highlight */}
              <polygon points="24,1 36,13 24,25 12,13" fill="rgba(255,255,255,0.13)" />
              {/* Tail string */}
              <line x1="24" y1="47" x2="24" y2="57" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
            </svg>
          </div>
          {/* Ribbon tail */}
          <div className="pml-tail">
            <span className="pml-bow" style={{ '--bd': '0s' }} />
            <span className="pml-bow" style={{ '--bd': '0.12s' }} />
            <span className="pml-bow" style={{ '--bd': '0.24s' }} />
          </div>
        </div>
      </div>

      <div className="pml-bottom">
        <p className="pml-message">{message}</p>
        <div className="pml-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
