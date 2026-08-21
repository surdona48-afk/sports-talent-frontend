
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SportSelection() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">Select Fitness Test</h1>
        <p className="text-slate-500 text-sm max-w-lg mx-auto">
          Choose an AI physical evaluation test to update your talent scorecard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test 1: 10m Sprint */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-2xl font-bold">
              ⚡
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">10m Sprint</h2>
              <p className="text-slate-500 text-xs">Test 1 • Speed & Acceleration</p>
            </div>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            Measures acceleration time and peak stride velocity over 10 metres.
          </p>
          <button
            onClick={() => navigate('/test/sprint')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Start Sprint Assessment →
          </button>
        </div>

        {/* Test 2: Vertical Jump (Phase 11) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500/50 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl font-bold">
              🚀
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Vertical Jump</h2>
              <p className="text-slate-500 text-xs">Test 2 • Explosive Power</p>
            </div>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            Measures maximum leap height, flight hang time, and explosive takeoff power.
          </p>
          <button
            onClick={() => navigate('/test/vertical-jump')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Start Vertical Jump →
          </button>
        </div>
      </div>
    </div>
  );
}