import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/Authentication/PrivateRoute';
import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import ShipDetailPage from './pages/ShipDetailPage';
import { JobsProvider } from './contexts/JobsContext';
import JobsPage from './pages/JobsPage';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationToast from './components/NotificationToast';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ShipsProvider>
          <ComponentsProvider>
            <JobsProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/dashboard" element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  } />
                  <Route path="/ships" element={
                    <PrivateRoute roles={['Admin', 'Inspector', 'Engineer']}>
                      <ShipsPage />
                    </PrivateRoute>
                  } />
                  <Route path="/ships/:id" element={
                    <PrivateRoute roles={['Admin', 'Engineer', 'Inspector']}>
                      <ShipDetailPage />
                    </PrivateRoute>
                  } />
                  <Route path="/jobs" element={
                    <PrivateRoute roles={['Admin', 'Engineer', 'Inspector']}>
                      <JobsPage />
                    </PrivateRoute>
                  } />
                </Routes>
                <NotificationToast />
              </Router>
            </JobsProvider>
          </ComponentsProvider>
        </ShipsProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
