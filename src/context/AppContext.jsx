import { createContext, useContext, useReducer, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  upsertUser,
  updateQuizResults,
  updateSelectedPath,
  updateRoadmapProgress,
  updateInterviewResult,
} from '../lib/userService';

const AppContext = createContext();

const initialState = {
  user: null,
  quizResults: null,
  selectedPath: null,
  roadmapProgress: {},
  labsProgress: {},
  interviewResult: null,
  portfolio: {
    education: [],
    products: [],
    industries: [],
    resume: null,
  },
};

function loadState() {
  try {
    const saved = localStorage.getItem('pm-platform-state');
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  } catch {
    return initialState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_QUIZ_RESULTS':
      return { ...state, quizResults: action.payload };
    case 'SET_SELECTED_PATH':
      return { ...state, selectedPath: action.payload };
    case 'UPDATE_ROADMAP_PROGRESS':
      return {
        ...state,
        roadmapProgress: { ...state.roadmapProgress, ...action.payload },
      };
    case 'COMPLETE_MILESTONE_QUIZ':
      return {
        ...state,
        roadmapProgress: {
          ...state.roadmapProgress,
          [action.payload.milestoneId]: {
            ...state.roadmapProgress[action.payload.milestoneId],
            quizScore: action.payload.score,
            passed: action.payload.score >= 80,
          },
        },
      };
    case 'UPDATE_LABS_PROGRESS':
      return {
        ...state,
        labsProgress: { ...state.labsProgress, ...action.payload },
      };
    case 'SET_INTERVIEW_RESULT':
      return { ...state, interviewResult: action.payload };
    case 'UPDATE_PORTFOLIO':
      return {
        ...state,
        portfolio: { ...state.portfolio, ...action.payload },
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);
  const prevState = useRef(state);
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('pm-platform-state', JSON.stringify(state));

    const prev = prevState.current;
    const email = state.user?.email;

    // New user registered
    if (state.user && state.user !== prev.user) {
      upsertUser(state.user);
    }

    // Quiz results saved
    if (email && state.quizResults && state.quizResults !== prev.quizResults) {
      updateQuizResults(email, state.quizResults);
    }

    // Learning path selected
    if (email && state.selectedPath && state.selectedPath !== prev.selectedPath) {
      updateSelectedPath(email, state.selectedPath);
    }

    // Roadmap milestone completed
    if (email && state.roadmapProgress !== prev.roadmapProgress) {
      updateRoadmapProgress(email, state.roadmapProgress);
    }

    // Interview result saved
    if (email && state.interviewResult && state.interviewResult !== prev.interviewResult) {
      updateInterviewResult(email, state.interviewResult);
    }

    prevState.current = state;
  }, [state]);

  useEffect(() => {
    // Get current session on load
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setAuthUser(session?.user ?? null);
      })
      .catch(() => {
        setAuthUser(null);
      })
      .finally(() => {
        setAuthLoading(false);
      });

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthUser(session?.user ?? null);
        if (event === 'SIGNED_OUT') {
          dispatch({ type: 'RESET' });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, authUser, authLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
