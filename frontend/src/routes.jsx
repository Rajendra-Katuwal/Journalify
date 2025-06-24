import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import MinimalLayout from './layouts/MinimalLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Journal Pages
import JournalHomePage from './pages/journal/JournalHomePage';
import EntryEditorPage from './pages/journal/EntryEditorPage';
import EntryViewPage from './pages/journal/EntryViewPage';
import CalendarViewPage from './pages/journal/CalendarViewPage';

// Insights Pages
import InsightsPage from './pages/insights/InsightsPage';
import MoodAnalyticsPage from './pages/insights/MoodAnalyticsPage';

// Social Pages
import PublicFeedPage from './pages/social/PublicFeedPage';
import SharedEntryPage from './pages/social/SharedEntryPage';

// Other Pages
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Landing page with MinimalLayout */}
      <Route element={<MinimalLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shared/:entryId" element={<SharedEntryPage />} />
      </Route>

      {/* Protected routes with MainLayout */}
      {/* <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}> */}
      <Route element={<MainLayout />}>
        <Route path="/journal" element={<JournalHomePage />} />
        <Route path="/entry/new" element={<EntryEditorPage />} />
        <Route path="/entry/:entryId" element={<EntryViewPage />} />
        <Route path="/entry/edit/:entryId" element={<EntryEditorPage />} />
        <Route path="/calendar" element={<CalendarViewPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/mood" element={<MoodAnalyticsPage />} />
        <Route path="/social" element={<PublicFeedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* 404 - Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;