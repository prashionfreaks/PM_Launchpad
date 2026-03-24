import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Roadmap from './pages/Roadmap';
import Labs from './pages/Labs';
import Interview from './pages/Interview';
import Jobs from './pages/Jobs';
import Portfolio from './pages/Portfolio';
import PublicPortfolio from './pages/PublicPortfolio';
import Community from './pages/Community';
import './App.css';

function AppRoutes() {
  const { state, authUser, authLoading } = useApp();

  if (authLoading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner" />
      </div>
    );
  }

  const isAuthenticated = !!authUser;
  const isOnboarded = !!state.user;

  return (
    <Routes>
      {/* Public — always accessible */}
      <Route path="/portfolio/public" element={<PublicPortfolio />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Auth pages — redirect away if already logged in */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
      />

      {/* Onboarding — requires auth, but not yet onboarded */}
      <Route
        path="/"
        element={
          !isAuthenticated
            ? <Navigate to="/login" />
            : isOnboarded
            ? <Navigate to="/profile" />
            : <Register />
        }
      />

      {/* App — requires auth + onboarding */}
      <Route
        element={
          !isAuthenticated
            ? <Navigate to="/login" />
            : !isOnboarded
            ? <Navigate to="/" />
            : <Layout />
        }
      >
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Navigate to="/profile?tab=evaluation" />} />
        <Route path="/results" element={<Navigate to="/profile?tab=evaluation" />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/community" element={<Community />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
