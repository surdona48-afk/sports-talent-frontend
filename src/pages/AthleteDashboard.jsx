import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAssessmentHistory } from '../utils/assessmentStorage';

export default function AthleteDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);

  // ==========================================
  // PHASE 32 — PRIVACY & CONSENT
  // ==========================================
  const [profileVisibility, setProfileVisibility] = useState('private');
  const [guardianConsent, setGuardianConsent] = useState(false);

  const overallScore = localStorage.getItem('overallAIScore') || '--';

  useEffect(() => {
    const savedProfile = localStorage.getItem('athleteProfile');

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);

      // Load saved guardian consent
      const savedGuardianConsent =
        localStorage.getItem('guardianConsent') === 'true';

      setGuardianConsent(savedGuardianConsent);
    }

    setHistory(getAssessmentHistory());

    // Load saved privacy setting
    const savedVisibility =
      localStorage.getItem('profileVisibility') || 'private';

    setProfileVisibility(savedVisibility);
  }, []);

  // Determine whether athlete is a minor.
  // This works if your athleteProfile contains an "age" field.
  const athleteAge = Number(profile?.age);

  const isMinor =
    Number.isFinite(athleteAge) &&
    athleteAge > 0 &&
    athleteAge < 18;

  // ==========================================
  // PRIVACY SETTING HANDLER
  // ==========================================
  const handleVisibilityChange = (value) => {
    // Minor cannot become discoverable without guardian consent
    if (value === 'discoverable' && isMinor && !guardianConsent) {
      alert(
        'Guardian consent is required before a minor athlete can make their profile discoverable to scouts.'
      );
      return;
    }

    setProfileVisibility(value);
    localStorage.setItem('profileVisibility', value);
  };

  // ==========================================
  // GUARDIAN CONSENT HANDLER
  // ==========================================
  const handleGuardianConsentChange = (checked) => {
    setGuardianConsent(checked);
    localStorage.setItem('guardianConsent', String(checked));

    // If consent is removed, automatically make profile private
    if (!checked && isMinor) {
      setProfileVisibility('private');
      localStorage.setItem('profileVisibility', 'private');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 mb-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3">
            Athlete Control Center
          </span>

          <h1 className="text-3xl font-extrabold text-white mb-1">
            Welcome back, {profile?.name || 'Athlete'}! 👋
          </h1>

          <p className="text-slate-400 text-sm">
            {profile?.primarySport
              ? `${profile.primarySport} Athlete`
              : 'Sports Assessment Platform'}{' '}
            • {profile?.location || 'India'}
          </p>
        </div>

        <button
          onClick={() => navigate('/sports')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
        >
          Take New Test ⚡
        </button>
      </div>

      {/* Analytics Button */}
      <button
        onClick={() => (window.location.href = '/analytics')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg flex items-center gap-2"
      >
        📈 View Sprint & Performance Analytics
      </button>

      {/* Training Focus */}
      <div
        onClick={() => navigate('/training-focus')}
        className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 shadow-xl cursor-pointer transition-all group mt-6"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl bg-blue-500/10 border border-blue-500/30 p-3 rounded-xl">
            ⚡
          </span>

          <span className="text-xs text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
            View Focus →
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          Training Focus
        </h3>

        <p className="text-slate-400 text-xs">
          Agility, Endurance & recommended drills roadmap.
        </p>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Overall AI Score
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-blue-400">
              {overallScore}
            </span>

            <span className="text-slate-500 text-sm">
              / 100
            </span>
          </div>

          <p className="text-emerald-400 text-xs mt-3 font-medium">
            ↑ Verified Performance Index
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Tests Completed
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">
              {history.length}
            </span>

            <span className="text-slate-500 text-sm">
              Recorded
            </span>
          </div>

          <p className="text-slate-400 text-xs mt-3">
            Synced with Scout Network
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Scout Visibility
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span
              className={`w-3 h-3 rounded-full ${
                profileVisibility === 'discoverable'
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-slate-500'
              }`}
            ></span>

            <span className="text-lg font-bold text-white">
              {profileVisibility === 'discoverable'
                ? 'Discoverable'
                : 'Private'}
            </span>
          </div>

          <p className="text-slate-400 text-xs mt-2">
            {profileVisibility === 'discoverable'
              ? 'Visible to scouts'
              : 'Hidden from scout discovery'}
          </p>
        </div>
      </div>

      {/* ==========================================
          PHASE 32 — PRIVACY & CONSENT
          ========================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">

        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">
              Privacy & Consent
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Control whether scouts can discover your athlete profile.
            </p>
          </div>

          <div className="text-2xl">
            🔒
          </div>
        </div>

        {/* Privacy Options */}
        <div className="space-y-3">

          {/* PRIVATE */}
          <label
            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
              profileVisibility === 'private'
                ? 'border-blue-500/50 bg-blue-500/10'
                : 'border-slate-800 bg-slate-950 hover:border-slate-700'
            }`}
          >
            <input
              type="radio"
              name="profileVisibility"
              value="private"
              checked={profileVisibility === 'private'}
              onChange={() => handleVisibilityChange('private')}
              className="w-4 h-4 accent-blue-600"
            />

            <div>
              <p className="text-white font-semibold">
                Private
              </p>

              <p className="text-slate-400 text-xs mt-1">
                Your profile will not appear in scout discovery.
              </p>
            </div>
          </label>

          {/* DISCOVERABLE */}
          <label
            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
              profileVisibility === 'discoverable'
                ? 'border-emerald-500/50 bg-emerald-500/10'
                : 'border-slate-800 bg-slate-950 hover:border-slate-700'
            }`}
          >
            <input
              type="radio"
              name="profileVisibility"
              value="discoverable"
              checked={profileVisibility === 'discoverable'}
              onChange={() =>
                handleVisibilityChange('discoverable')
              }
              className="w-4 h-4 accent-emerald-600"
            />

            <div>
              <p className="text-white font-semibold">
                Discoverable by scouts
              </p>

              <p className="text-slate-400 text-xs mt-1">
                Scouts can discover your athlete profile and performance information.
              </p>
            </div>
          </label>
        </div>

        {/* MINOR / GUARDIAN CONSENT */}
        {isMinor && (
          <div className="mt-5 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">

            <div className="flex items-start gap-3">

              <div className="text-xl">
                🛡️
              </div>

              <div className="flex-1">
                <h3 className="text-amber-300 font-bold text-sm">
                  Guardian Consent Required
                </h3>

                <p className="text-amber-200/70 text-xs mt-1 mb-4">
                  Because this athlete is under 18, guardian consent is required before the profile can be made discoverable to scouts.
                </p>

                <label className="flex items-start gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={guardianConsent}
                    onChange={(e) =>
                      handleGuardianConsentChange(
                        e.target.checked
                      )
                    }
                    className="mt-1 w-4 h-4 accent-amber-500"
                  />

                  <span className="text-slate-200 text-xs leading-relaxed">
                    I confirm that appropriate guardian consent has been obtained for this athlete's profile to be discoverable by scouts.
                  </span>

                </label>
              </div>
            </div>
          </div>
        )}

        {/* Current Status */}
        <div className="mt-5 p-4 bg-slate-950 rounded-xl border border-slate-800">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-500 text-[10px] uppercase font-semibold">
                Current Profile Visibility
              </p>

              <p className="text-white font-bold mt-1">
                {profileVisibility === 'discoverable'
                  ? '🟢 Discoverable by scouts'
                  : '🔒 Private'}
              </p>
            </div>

            {isMinor && (
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  guardianConsent
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                {guardianConsent
                  ? 'Guardian Consent ✓'
                  : 'Consent Required'}
              </span>
            )}

          </div>
        </div>

      </div>

      {/* Profile Match */}
      <div
        onClick={() => navigate('/profile-match')}
        className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 shadow-xl cursor-pointer transition-all group mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl">
            ⚡
          </span>

          <span className="text-xs text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
            View Match →
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          Profile Match
        </h3>

        <p className="text-slate-400 text-xs">
          Speed, Agility & Explosiveness breakdowns.
        </p>
      </div>

      {/* Talent Card */}
      <div
        onClick={() => navigate('/talent-card')}
        className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 shadow-xl cursor-pointer transition-all group mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl">
            🪪
          </span>

          <span className="text-xs text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
            View Card →
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          Sport Talent Card
        </h3>

        <p className="text-slate-400 text-xs">
          Official rating pass, Speed, Agility & Jump stats.
        </p>
      </div>

      {/* Performance History List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">

        <h2 className="text-xl font-bold text-white mb-4">
          Performance History
        </h2>

        {history.length > 0 ? (

          <div className="space-y-3">

            {history.map((item) => (

              <div
                key={item.id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl font-bold">
                    {(item.testName || '').includes('Sprint')
                      ? '⚡'
                      : '🚀'}
                  </div>

                  <div>

                    <h3 className="text-white font-bold text-sm">
                      {item.testName}
                    </h3>

                    <p className="text-slate-400 text-xs">
                      {item.date} • {item.badge}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-6 text-sm">

                  {item.time && (
                    <div>
                      <span className="block text-slate-500 text-[10px]">
                        Time
                      </span>

                      <span className="font-bold text-white">
                        {item.time}
                      </span>
                    </div>
                  )}

                  {item.topSpeed && (
                    <div>
                      <span className="block text-slate-500 text-[10px]">
                        Top Speed
                      </span>

                      <span className="font-bold text-white">
                        {item.topSpeed}
                      </span>
                    </div>
                  )}

                  {item.jumpHeight && (
                    <div>
                      <span className="block text-slate-500 text-[10px]">
                        Jump Height
                      </span>

                      <span className="font-bold text-white">
                        {item.jumpHeight}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="block text-slate-500 text-[10px]">
                      AI Score
                    </span>

                    <span className="font-bold text-blue-400">
                      {item.score}/100
                    </span>
                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="text-center py-10 bg-slate-950/50 rounded-xl border border-dashed border-slate-800">

            <p className="text-sm text-slate-400 mb-3">
              No performance history found.
            </p>

            <Link
              to="/sports"
              className="text-blue-400 hover:underline text-sm font-semibold"
            >
              Take your first test →
            </Link>

          </div>

        )}

      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Link
          to="/profile"
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between group"
        >
          <div>

            <h4 className="text-white font-semibold text-sm group-hover:text-blue-400">
              Update Profile Details
            </h4>

            <p className="text-slate-400 text-xs">
              Edit height, weight, position, and bio.
            </p>

          </div>

          <span className="text-slate-500 group-hover:text-blue-400">
          </span>

        </Link>

        <Link
          to="/sports"
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between group"
        >
          <div>

            <h4 className="text-white font-semibold text-sm group-hover:text-blue-400">
              Take Another Assessment
            </h4>

            <p className="text-slate-400 text-xs">
              Test sprint acceleration or vertical jump power.
            </p>

          </div>

          <span className="text-slate-500 group-hover:text-blue-400">
            →
          </span>

        </Link>

      </div>

    </div>
  );
}