import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { pmRoles } from '../data/quizQuestions';
import { Mic, MicOff, Send, Clock, Award, RefreshCw, Volume2, Keyboard, Video, VideoOff, SkipForward, RotateCcw } from 'lucide-react';

const interviewQuestions = {
  product_manager: [
    "Tell me about a product you admire and why. What would you improve about it?",
    "How would you prioritize between two features that have equal business impact but different engineering effort?",
    "Walk me through how you would launch a new product from scratch. What steps would you take?",
    "Describe a time you had to make a difficult trade-off. How did you decide?",
    "How would you measure the success of a social media app's new 'Stories' feature?",
    "A key stakeholder disagrees with your product direction. How do you handle it?",
    "What's your approach to creating and maintaining a product roadmap?",
    "How do you gather and incorporate user feedback into product decisions?",
  ],
  technical_pm: [
    "Explain how you would evaluate whether to build a feature in-house or use a third-party API.",
    "How would you handle a situation where a critical system has 99.5% uptime but the SLA requires 99.9%?",
    "Walk me through how you'd design the architecture for a real-time notification system.",
    "How do you prioritize technical debt vs. new feature development?",
    "Describe how you would communicate a complex technical migration to non-technical stakeholders.",
    "What metrics would you track for an API platform product?",
    "How would you approach breaking a monolithic application into microservices?",
    "What's your process for writing technical specifications?",
  ],
  data_pm: [
    "How would you design a recommendation engine for an e-commerce platform?",
    "What metrics would you use to measure the health of a data pipeline?",
    "How do you handle data quality issues that affect product decisions?",
    "Explain how you would set up an experimentation framework for your team.",
    "How would you balance user privacy with data collection needs?",
    "Walk me through designing a dashboard for executive stakeholders.",
    "How do you ensure data-informed decisions don't become data-paralyzed decisions?",
    "What's your approach to defining and tracking North Star metrics?",
  ],
  growth_pm: [
    "How would you improve user activation for a SaaS product with 30% activation rate?",
    "Design an experiment to increase trial-to-paid conversion by 20%.",
    "What growth loops would you implement for a marketplace product?",
    "How do you balance growth tactics with long-term user experience?",
    "Walk me through your approach to reducing churn by analyzing cohort data.",
    "How would you design an effective referral program?",
    "What metrics matter most in the AARRR framework and why?",
    "How do you identify the biggest growth lever for a product?",
  ],
};

const getQuestionsForRole = (roleId) => {
  return interviewQuestions[roleId] || interviewQuestions.product_manager;
};

// Speech synthesis helper
const speak = (text, onEnd) => {
  if (!window.speechSynthesis) {
    onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
    voices.find(v => v.lang.startsWith('en') && v.name.includes('Natural')) ||
    voices.find(v => v.lang.startsWith('en-US')) ||
    voices.find(v => v.lang.startsWith('en'));
  if (preferred) utterance.voice = preferred;
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utterance);
};

const QUESTION_TIME = 3 * 60; // 3 minutes per question
const RING_R = 18;
const RING_C = 2 * Math.PI * RING_R;

export default function Interview() {
  const { state, dispatch } = useApp();
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [finished, setFinished] = useState(false);
  const [scores, setScores] = useState(null);
  const [skipped, setSkipped] = useState(new Set());
  const [questionTimeLeft, setQuestionTimeLeft] = useState(QUESTION_TIME);
  const [questionTimeExpired, setQuestionTimeExpired] = useState(false);

  // Voice state
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  const [useTyping, setUseTyping] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');

  // Camera state
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraSupported, setCameraSupported] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const timerRef = useRef(null);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const questionTimerRef = useRef(null);
  const currentAnswerRef = useRef('');

  const roleId = state.selectedPath || state.user?.targetRole || 'product_manager';
  const role = pmRoles.find(r => r.id === roleId);
  const questions = getQuestionsForRole(roleId);

  // Keep currentAnswer accessible in timer callbacks
  useEffect(() => {
    currentAnswerRef.current = currentAnswer;
  }, [currentAnswer]);

  // Check browser support
  useEffect(() => {
    setVoiceSupported('speechSynthesis' in window);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setMicSupported(!!SpeechRecognition);
    setCameraSupported(!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia));

    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }

    return () => {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.abort();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Camera controls
  const startCamera = useCallback(async () => {
    try {
      setCameraError('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 320 }, height: { ideal: 240 }, facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
    } catch (err) {
      setCameraError('Camera access denied. Please allow camera permissions.');
      console.warn('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
  }, []);

  const toggleCamera = useCallback(() => {
    if (cameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  }, [cameraOn, startCamera, stopCamera]);

  // Total interview timer
  useEffect(() => {
    if (started && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [started, finished]);

  // Per-question timer — resets every time currentQ changes
  useEffect(() => {
    if (!started || finished) return;
    setQuestionTimeLeft(QUESTION_TIME);
    clearInterval(questionTimerRef.current);

    questionTimerRef.current = setInterval(() => {
      setQuestionTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(questionTimerRef.current);
          setQuestionTimeExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(questionTimerRef.current);
  }, [currentQ, started, finished]);

  // Auto-submit or auto-skip when question timer expires
  useEffect(() => {
    if (!questionTimeExpired) return;
    setQuestionTimeExpired(false);
    if (currentAnswerRef.current.trim()) {
      handleSubmitAnswer();
    } else {
      handleSkip();
    }
  }, [questionTimeExpired]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentQ, answers]);

  // Speak the question when it changes
  useEffect(() => {
    if (started && !finished && voiceSupported && !useTyping) {
      setIsSpeaking(true);
      speak(questions[currentQ], () => {
        setIsSpeaking(false);
      });
    }
  }, [currentQ, started, finished]);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let finalTranscript = currentAnswer;

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += (finalTranscript ? ' ' : '') + result[0].transcript;
          setCurrentAnswer(finalTranscript);
          setTranscript(finalTranscript);
        } else {
          interim += result[0].transcript;
        }
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      if (event.error !== 'aborted' && event.error !== 'no-speech') {
        console.warn('Speech recognition error:', event.error);
      }
      if (event.error === 'no-speech' && isListeningRef.current) {
        try { recognition.start(); } catch (e) { /* ignore */ }
      }
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        try { recognition.start(); } catch (e) { /* ignore */ }
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
      setIsListening(true);
      isListeningRef.current = true;
    } catch (e) {
      console.warn('Could not start recognition:', e);
    }
  }, [currentAnswer]);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    setIsListening(false);
    setInterimTranscript('');
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getQuestionTimerColor = () => {
    if (questionTimeLeft > 60) return '#10b981';
    if (questionTimeLeft > 30) return '#f59e0b';
    return '#ef4444';
  };

  // Clear the current recording so user can start fresh
  const handleReRecord = () => {
    stopListening();
    setCurrentAnswer('');
    setTranscript('');
    setInterimTranscript('');
  };

  const handleSubmitAnswer = () => {
    const answer = currentAnswer.trim();
    if (!answer) return;

    clearInterval(questionTimerRef.current);
    stopListening();
    window.speechSynthesis?.cancel();

    const newAnswers = { ...answers, [currentQ]: answer };
    setAnswers(newAnswers);
    setCurrentAnswer('');
    setTranscript('');
    setInterimTranscript('');

    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      generateScores(newAnswers, skipped);
    }
  };

  const generateFeedback = (answer, hasFramework, hasStructure, hasDepth) => {
    const tips = [];
    if (!hasFramework) tips.push('Try incorporating PM frameworks (RICE, Jobs-to-be-Done, etc.)');
    if (!hasStructure) tips.push('Structure your answer with clear steps or bullet points');
    if (!hasDepth) tips.push('Add more depth with specific examples or data points');
    if (tips.length === 0) tips.push('Great answer! Consider adding metrics for even more impact.');
    return tips;
  };

  const generateScores = (allAnswers, skippedSet = new Set()) => {
    clearInterval(timerRef.current);
    clearInterval(questionTimerRef.current);
    stopListening();
    window.speechSynthesis?.cancel();

    const criteria = ['Clarity', 'Structure', 'Depth', 'PM Thinking', 'Communication'];
    const questionScores = {};

    Object.entries(allAnswers).forEach(([qIdx, answer]) => {
      const words = answer.split(/\s+/).length;
      const hasFramework = /framework|metric|user|data|stakeholder|prioriti|trade.?off|hypothesis|mvp|roadmap|strategy/i.test(answer);
      const hasStructure = /first|second|third|step|approach|framework|1\.|2\.|3\./i.test(answer);
      const hasDepth = words > 50;
      const hasExamples = /example|instance|case|scenario|imagine|consider/i.test(answer);

      const baseScore = Math.min(100, 40 + (words > 30 ? 15 : 0) + (hasFramework ? 15 : 0) + (hasStructure ? 10 : 0) + (hasDepth ? 10 : 0) + (hasExamples ? 10 : 0));

      questionScores[qIdx] = {
        score: baseScore + Math.floor(Math.random() * 10) - 5,
        feedback: generateFeedback(answer, hasFramework, hasStructure, hasDepth),
      };
    });

    const overallScores = {};
    const answeredScores = Object.values(questionScores).map(q => q.score);
    criteria.forEach(c => {
      if (answeredScores.length === 0) {
        overallScores[c] = 0;
        return;
      }
      overallScores[c] = Math.round(answeredScores.reduce((a, b) => a + b, 0) / answeredScores.length) + Math.floor(Math.random() * 10) - 5;
      overallScores[c] = Math.max(30, Math.min(100, overallScores[c]));
    });

    const overall = answeredScores.length > 0
      ? Math.round(Object.values(overallScores).reduce((a, b) => a + b, 0) / criteria.length)
      : 0;

    const result = {
      questionScores,
      overallScores,
      overall,
      answeredCount: Object.keys(allAnswers).length,
      totalQuestions: questions.length,
      skippedIndices: [...skippedSet],
    };
    setScores(result);
    setFinished(true);

    stopCamera();
    dispatch({ type: 'SET_INTERVIEW_RESULT', payload: result });
    if (overall >= 70) {
      dispatch({
        type: 'UPDATE_ROADMAP_PROGRESS',
        payload: { interview: { passed: true, xpReward: 1000, quizScore: overall } },
      });
    }
  };

  // Move to next question without answering
  const handleSkip = () => {
    clearInterval(questionTimerRef.current);
    stopListening();
    window.speechSynthesis?.cancel();

    const newSkipped = new Set([...skipped, currentQ]);
    setSkipped(newSkipped);
    setCurrentAnswer('');
    setTranscript('');
    setInterimTranscript('');

    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      generateScores(answers, newSkipped);
    }
  };

  const handleFinish = () => {
    generateScores(answers, skipped);
  };

  // ----- REPORT CARD VIEW -----
  if (finished && scores) {
    return (
      <div className="page-container">
        <div className="interview-report">
          <div className="report-header">
            <Award size={48} color="#f59e0b" />
            <h1>Interview Report Card</h1>
            <p>{role?.icon} {role?.label} Readiness Interview</p>
          </div>

          <div className="report-overall">
            <div className="report-score-circle" style={{ '--score-color': scores.overall >= 70 ? '#10b981' : '#f59e0b' }}>
              <span className="big-score">{scores.overall}%</span>
              <span>{scores.overall >= 70 ? 'Passed' : 'Needs Improvement'}</span>
            </div>
            <p>
              {scores.answeredCount} answered · {scores.skippedIndices.length} skipped · {scores.totalQuestions} total
            </p>
            {scores.overall >= 70 && <div className="xp-earned">+1000 XP</div>}
          </div>

          <div className="report-criteria">
            <h3>Evaluation Criteria</h3>
            {Object.entries(scores.overallScores).map(([criteria, score]) => (
              <div key={criteria} className="criteria-row">
                <span className="criteria-label">{criteria}</span>
                <div className="criteria-bar">
                  <div
                    className="criteria-fill"
                    style={{
                      width: `${score}%`,
                      background: score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
                <span className="criteria-score">{score}%</span>
              </div>
            ))}
          </div>

          <div className="report-questions">
            <h3>Question-by-Question Feedback</h3>
            {questions.map((q, qIdx) => {
              const wasSkipped = scores.skippedIndices.includes(qIdx);
              const data = scores.questionScores[qIdx];
              return (
                <div key={qIdx} className={`question-feedback ${wasSkipped ? 'question-skipped' : ''}`}>
                  <h4>Q{qIdx + 1}: {q}</h4>
                  {wasSkipped ? (
                    <p className="skipped-label">Skipped</p>
                  ) : data ? (
                    <>
                      <p className="your-answer">{answers[qIdx]}</p>
                      <div className="feedback-tips">
                        {data.feedback.map((tip, i) => (
                          <span key={i} className="tip">💡 {tip}</span>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>

          <button className="btn-primary" onClick={() => {
            setStarted(false); setFinished(false); setCurrentQ(0);
            setAnswers({}); setScores(null); setTimeLeft(30 * 60);
            setCurrentAnswer(''); setTranscript('');
            setSkipped(new Set()); setQuestionTimeLeft(QUESTION_TIME);
          }}>
            <RefreshCw size={18} /> Retake Interview
          </button>
        </div>
      </div>
    );
  }

  // ----- INTRO VIEW -----
  if (!started) {
    return (
      <div className="page-container center-content">
        <div className="interview-intro">
          <div className="voice-icon-wrapper">
            <Video size={64} color="#6366f1" />
            <div className="voice-rings" />
          </div>
          <h1>Mock PM Video Interview</h1>
          <p>A 30-minute simulated video interview to assess your PM knowledge and communication skills for the <strong>{role?.label}</strong> role.</p>

          <div className="interview-rules">
            <h3>How it works:</h3>
            <ul>
              <li>Enable your camera for a realistic interview simulation</li>
              <li>The interviewer will ask you {questions.length} questions via voice</li>
              <li>You have <strong>3 minutes per question</strong> and 30 minutes total</li>
              <li>Respond by speaking into your microphone, or switch to typing mode</li>
              <li>Use PM frameworks and real examples in your answers</li>
              <li>Skip questions you want to come back to — or re-record if you stumble</li>
              <li>You'll receive a detailed report card at the end</li>
            </ul>
            {!micSupported && (
              <div className="voice-warning">
                Your browser doesn't support speech recognition. You can still use typing mode.
              </div>
            )}
            {!cameraSupported && (
              <div className="voice-warning">
                Your browser doesn't support camera access. You can still proceed without video.
              </div>
            )}
          </div>

          <button className="btn-primary btn-large" onClick={() => { setStarted(true); if (cameraSupported) startCamera(); }}>
            Start Video Interview <Video size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ----- ACTIVE INTERVIEW VIEW -----
  const displayAnswer = currentAnswer + (interimTranscript ? (currentAnswer ? ' ' : '') + interimTranscript : '');
  const wc = (() => {
    const count = displayAnswer.trim() ? displayAnswer.trim().split(/\s+/).length : 0;
    if (count === 0) return { label: '', color: 'var(--text-light)' };
    if (count < 40) return { label: `${count} words · too short`, color: '#ef4444' };
    if (count < 80) return { label: `${count} words · getting there`, color: '#f59e0b' };
    return { label: `${count} words · strong`, color: '#10b981' };
  })();

  return (
    <div className="page-container interview-page">
      {/* Webcam PiP */}
      <div className={`webcam-pip ${cameraOn ? 'active' : ''}`}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="webcam-video"
        />
        {!cameraOn && (
          <div className="webcam-placeholder">
            <VideoOff size={24} />
            <span>Camera off</span>
          </div>
        )}
        <button className="webcam-toggle" onClick={toggleCamera} title={cameraOn ? 'Turn off camera' : 'Turn on camera'}>
          {cameraOn ? <VideoOff size={14} /> : <Video size={14} />}
        </button>
        {cameraError && <div className="webcam-error">{cameraError}</div>}
      </div>

      {/* Timer bar */}
      <div className="interview-timer">
        <Clock size={18} />
        <span className={timeLeft < 300 ? 'timer-warning' : ''} title="Total time remaining">
          {formatTime(timeLeft)}
        </span>

        <div className="question-timer-ring-wrap" title="Time for this question">
          <svg width="44" height="44">
            <circle cx="22" cy="22" r={RING_R} fill="none" stroke="var(--border)" strokeWidth="3" />
            <circle
              cx="22" cy="22" r={RING_R}
              fill="none"
              stroke={getQuestionTimerColor()}
              strokeWidth="3"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - questionTimeLeft / QUESTION_TIME)}
              strokeLinecap="round"
              transform="rotate(-90 22 22)"
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
            />
            <text x="22" y="26" textAnchor="middle" fontSize="9" fontWeight="700" fill={getQuestionTimerColor()}>
              {formatTime(questionTimeLeft)}
            </text>
          </svg>
        </div>

        <div className="interview-mode-toggle">
          <button
            className={`mode-btn ${!useTyping ? 'active' : ''}`}
            onClick={() => setUseTyping(false)}
            title="Voice mode"
          >
            <Mic size={14} /> Voice
          </button>
          <button
            className={`mode-btn ${useTyping ? 'active' : ''}`}
            onClick={() => { setUseTyping(true); stopListening(); }}
            title="Typing mode"
          >
            <Keyboard size={14} /> Type
          </button>
        </div>

        <span className="q-counter">Question {currentQ + 1}/{questions.length}</span>
      </div>

      {/* Question progress bar */}
      <div className="interview-progress-bar">
        {questions.map((_, i) => {
          let status = 'remaining';
          if (answers[i]) status = 'answered';
          else if (skipped.has(i)) status = 'skipped';
          else if (i === currentQ) status = 'current';
          return <div key={i} className={`progress-pip ${status}`} title={`Q${i + 1}`} />;
        })}
      </div>

      <div className="chat-container">
        {Array.from({ length: currentQ + 1 }).map((_, i) => (
          <div key={i}>
            <div className="chat-message interviewer">
              <div className="interviewer-avatar">
                <Volume2 size={18} />
              </div>
              <div className="message-bubble">
                <p>{questions[i]}</p>
                {i === currentQ && isSpeaking && (
                  <div className="speaking-indicator">
                    <span className="wave-bar" /><span className="wave-bar" /><span className="wave-bar" /><span className="wave-bar" />
                  </div>
                )}
              </div>
            </div>
            {answers[i] && (
              <div className="chat-message candidate">
                <div className="message-bubble">
                  <p>{answers[i]}</p>
                </div>
              </div>
            )}
            {skipped.has(i) && i !== currentQ && (
              <div className="chat-message candidate">
                <div className="message-bubble skipped-bubble">
                  <p>— Skipped —</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Live transcript for current answer */}
        {(isListening || displayAnswer) && !answers[currentQ] && (
          <div className="chat-message candidate">
            <div className="message-bubble live-transcript">
              <p>
                {displayAnswer || <span className="listening-placeholder">Listening...</span>}
              </p>
              {isListening && (
                <div className="listening-indicator">
                  <span className="pulse-dot" />
                  <span className="pulse-dot" />
                  <span className="pulse-dot" />
                </div>
              )}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="voice-input-area">
        {useTyping ? (
          <div className="chat-input">
            <div className="chat-input-field-wrap">
              <textarea
                value={currentAnswer}
                onChange={e => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer..."
                rows={3}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitAnswer();
                  }
                }}
              />
              {wc.label && <span className="word-count-badge" style={{ color: wc.color }}>{wc.label}</span>}
            </div>
            <div className="chat-input-actions">
              <button
                className="btn-skip"
                onClick={handleSkip}
                title="Skip this question"
              >
                <SkipForward size={16} /> Skip
              </button>
              <button
                className="btn-primary send-btn"
                disabled={!currentAnswer.trim()}
                onClick={handleSubmitAnswer}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="voice-controls">
            <div className="voice-status">
              {isSpeaking ? (
                <span className="status-text speaking">Interviewer is speaking...</span>
              ) : isListening ? (
                <span className="status-text recording">Recording your answer...</span>
              ) : (
                <span className="status-text ready">Tap the mic to start answering</span>
              )}
            </div>

            <div className="voice-buttons">
              <button
                className="btn-skip"
                onClick={handleSkip}
                title="Skip this question"
                disabled={isSpeaking}
              >
                <SkipForward size={16} /> Skip
              </button>

              <button
                className={`mic-button ${isListening ? 'recording' : ''}`}
                onClick={toggleListening}
                disabled={isSpeaking}
                title={isListening ? 'Stop recording' : 'Start recording'}
              >
                <div className="mic-button-inner">
                  {isListening ? <MicOff size={28} /> : <Mic size={28} />}
                </div>
                {isListening && <div className="mic-pulse-ring" />}
              </button>

              <button
                className="btn-primary submit-voice-btn"
                disabled={!currentAnswer.trim()}
                onClick={handleSubmitAnswer}
              >
                Submit <Send size={16} />
              </button>
            </div>

            {displayAnswer && (
              <div className="transcript-preview">
                <div className="transcript-preview-header">
                  <p className="transcript-label">Your answer:</p>
                  <button
                    className="btn-rerecord"
                    onClick={handleReRecord}
                    title="Clear and re-record"
                  >
                    <RotateCcw size={14} /> Re-record
                  </button>
                </div>
                <p className="transcript-text">{displayAnswer}</p>
                {wc.label && <span className="word-count-badge" style={{ color: wc.color }}>{wc.label}</span>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
