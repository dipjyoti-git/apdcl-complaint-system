import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PortalLayout from './components/PortalLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import FaqPage from './pages/FaqPage';
import Dashboard from './pages/Dashboard';
import CreateComplaint from './pages/CreateComplaint';
import ActivityLogPage from './pages/ActivityLogPage'; 

// Helper component to pass user/logout to PortalLayout
const LayoutWrapper = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <PortalLayout user={user} logout={logout}>
      {children}
    </PortalLayout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/faq" element={<FaqPage />} />
          
          {/* Protected Routes wrapped inside APDCL Layout */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <LayoutWrapper>
                  <Dashboard />
                </LayoutWrapper>
              </ProtectedRoute>
            } 
          />
          {/* Staff-only: agents and admins */}
          <Route 
            path="/activity-log" 
            element={
              <ProtectedRoute roles={['agent', 'admin']}>
                <LayoutWrapper>
                  <ActivityLogPage />
                </LayoutWrapper>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create" 
            element={
              <ProtectedRoute>
                <LayoutWrapper>
                  <CreateComplaint />
                </LayoutWrapper>
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
