import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import AthleteProfile from './pages/AthleteProfile';
import SportSelection from './pages/SportSelection';
import SprintTestInstructions from './pages/SprintTestInstructions';
import SprintCamera from './pages/SprintCamera';
import SprintResult from './pages/SprintResult';
import VerticalJumpInstructions from './pages/VerticalJumpInstructions';
import VerticalJumpCamera from './pages/VerticalJumpCamera';
import VerticalJumpResult from './pages/VerticalJumpResult';
import LivePoseCamera from './pages/LivePoseCamera';
import AthleteDashboard from './pages/AthleteDashboard';
import ScoutDashboard from './pages/ScoutDashboard';
import Leaderboard from './pages/Leaderboard';
import AthleteAnalytics from './pages/AthleteAnalytics';
import TrainingFocus from './pages/TrainingFocus';
import ProfileMatch from './pages/ProfileMatch';
import SportTalentCard from './pages/SportTalentCard';
import AthleteDetails from "./pages/AthleteDetails";
import PrivacyConsent from "./pages/PrivacyConsent";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-white font-sans">
        <Navbar />
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Athlete Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRole="athlete">
                <AthleteProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sports"
            element={
              <ProtectedRoute allowedRole="athlete">
                <SportSelection />
              </ProtectedRoute>
            }
          />

          {/* Sprint Test Routes */}
          <Route
            path="/test/sprint"
            element={
              <ProtectedRoute allowedRole="athlete">
                <SprintTestInstructions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test/sprint/camera"
            element={
              <ProtectedRoute allowedRole="athlete">
                <SprintCamera />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test/sprint/result"
            element={
              <ProtectedRoute allowedRole="athlete">
                <SprintResult />
              </ProtectedRoute>
            }
          />

          {/* Vertical Jump Test Routes (Phase 11) */}
          <Route
            path="/test/vertical-jump"
            element={
              <ProtectedRoute allowedRole="athlete">
                <VerticalJumpInstructions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test/vertical-jump/camera"
            element={
              <ProtectedRoute allowedRole="athlete">
                <VerticalJumpCamera />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test/vertical-jump/result"
            element={
              <ProtectedRoute allowedRole="athlete">
                <VerticalJumpResult />
              </ProtectedRoute>
            }
          />

          {/* Live Pose Engine Route (Phase 12) */}
          <Route
            path="/test/live-pose"
            element={
              <ProtectedRoute allowedRole="athlete">
                <LivePoseCamera />
              </ProtectedRoute>
            }
          />

          {/* Dashboards */}
          <Route
            path="/athlete/dashboard"
            element={
              <ProtectedRoute allowedRole="athlete">
                <AthleteDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-focus"
            element={
              <ProtectedRoute allowedRole="athlete">
                <TrainingFocus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scout/dashboard"
            element={
              <ProtectedRoute allowedRole="scout">
                <ScoutDashboard />
              </ProtectedRoute>
            }
          />

          {/* Additional Features */}
          <Route
            path="/talent-card"
            element={
              <ProtectedRoute allowedRole="athlete">
                <SportTalentCard />
              </ProtectedRoute>
            }
          />
          <Route
  path="/privacy-consent"
  element={<PrivacyConsent />}
/>
          <Route
            path="/scout/athletes/:id"
        element={<AthleteDetails />}
        />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute allowedRole="athlete">
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-match"
            element={
              <ProtectedRoute allowedRole="athlete">
                <ProfileMatch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRole="athlete">
                <AthleteAnalytics />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}