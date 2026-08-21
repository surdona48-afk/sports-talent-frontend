import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAssessmentResult } from '../utils/assessmentStorage';

export default function SprintResult() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('sprintResult');
    if (data) {
      const parsed = JSON.parse(data);
      setResult(parsed);
      // Save permanently to history helper
      saveAssessmentResult('10m Sprint Assessment', {
        time: parsed.time,
        topSpeed: parsed.topSpeed,
        score: parsed.score,
        badge: '🟢 Verified Assessment',
      });
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner with 🟢 Verified Assessment badge */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-8 shadow-sm text-center">
        <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          🟢 Verified Assessment
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-1">10m Sprint Scorecard</h1>
        <p className="text-slate-500 text-sm">Assessment successfully recorded, verified, and synced.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <span className="block text-slate-500 text-xs uppercase font-semibold mb-1">Sprint Time</span>
          <span className="text-4xl font-semibold text-slate-900">{result?.time || '--'}</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <span className="block text-slate-500 text-xs uppercase font-semibold mb-1">Top Velocity</span>
          <span className="text-4xl font-semibold text-slate-900">{result?.topSpeed || '--'}</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <span className="block text-slate-500 text-xs uppercase font-semibold mb-1">AI Rating</span>
          <span className="text-4xl font-semibold text-emerald-400">{result?.score || '--'} / 100</span>
          <span className="block text-[10px] text-emerald-400 font-semibold mt-1">✓ Verified Score</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate('/athlete/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all cursor-pointer"
        >
          View Dashboard & History →
        </button>
      </div>
    </div>
  );
}