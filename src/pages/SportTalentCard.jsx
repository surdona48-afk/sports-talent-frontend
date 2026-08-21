import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SportTalentCard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('athleteProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const athleteName = profile?.name || 'Rahul Das';
  const primarySport = profile?.primarySport || 'Football';
  const age = profile?.age ? `U${profile.age}` : 'U18';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
      {/* Top Banner */}
      <div className="w-full text-center mb-8">
        <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          Phase 19 Digital Talent Card
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-2 mb-1">
          Sport Talent Card
        </h1>
        <p className="text-slate-400 text-sm">
          Official digital athletic passport and verified performance metrics.
        </p>
      </div>

      {/* The Sport Talent Card */}
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 border-2 border-amber-500/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden mb-8">
        {/* Card Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Card Header */}
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <span className="bg-blue-500/20 border border-blue-500/40 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
              {primarySport}
            </span>
            <h2 className="text-2xl font-black text-white mt-3 tracking-wide">
              {athleteName}
            </h2>
            <p className="text-slate-400 text-xs font-semibold mt-0.5">
              {primarySport} | {age}
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/50 rounded-2xl p-3 text-center min-w-[70px] shadow-lg">
            <span className="block text-[10px] text-amber-400 uppercase font-bold tracking-wider">Overall</span>
            <span className="text-3xl font-black text-white">87</span>
          </div>
        </div>

        {/* Attribute Breakdown */}
        <div className="space-y-3 bg-slate-950/60 border border-slate-800 rounded-2xl p-4 mb-6 relative z-10">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-300 font-medium flex items-center gap-2">
              ⚡ Speed
            </span>
            <span className="font-extrabold text-blue-400 text-base">91</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '91%' }}></div>
          </div>

          <div className="flex justify-between items-center text-sm pt-2">
            <span className="text-slate-300 font-medium flex items-center gap-2">
              🔄 Agility
            </span>
            <span className="font-extrabold text-blue-400 text-base">84</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '84%' }}></div>
          </div>

          <div className="flex justify-between items-center text-sm pt-2">
            <span className="text-slate-300 font-medium flex items-center gap-2">
              💥 Jump
            </span>
            <span className="font-extrabold text-blue-400 text-base">88</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>

        {/* Verified Footer Badge */}
        <div className="flex justify-center items-center relative z-10 pt-2 border-t border-slate-800/80">
          <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ✓ Verified Assessments
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate('/athlete/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all cursor-pointer shadow-lg"
        >
          Return to Dashboard →
        </button>
      </div>
    </div>
  );
}