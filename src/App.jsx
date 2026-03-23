import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Roadmap from './pages/Roadmap';
import Labs from './pages/Labs';
import Interview from './pages/Interview';
import Jobs from './pages/Jobs';
import Portfolio from './pages/Portfolio';
import PublicPortfolio from './pages/PublicPortfolio';
import './App.css';

function AppRoutes() {
  const { state } = useApp();
  const isRegistered = !!state.user;

  return (
    <Routes>
      <Route path="/portfolio/public" element={<PublicPortfolio />} />
      <Route path="/" element={isRegistered ? <Navigate to="/profile" /> : <Register />} />
      <Route element={isRegistered ? <Layout /> : <Navigate to="/" />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Navigate to="/profile?tab=evaluation" />} />
        <Route path="/results" element={<Navigate to="/profile?tab=evaluation" />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/portfolio" element={<Portfolio />} />
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
