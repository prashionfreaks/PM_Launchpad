import { createContext, useContext, useReducer, useEffect } from 'react';

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

  useEffect(() => {
    localStorage.setItem('pm-platform-state', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
