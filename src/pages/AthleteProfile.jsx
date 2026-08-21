import React, { useState, useEffect } from 'react';
import axios from 'axios';

const saveProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.post('http://localhost:5000/api/athletes/profile', profileData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Saved successfully to backend:', response.data);
  } catch (error) {
    console.warn('Backend offline. Saving to local storage fallback:', error.message);
    localStorage.setItem('athleteProfile', JSON.stringify(profileData));
  }
};

export default function AthleteProfile() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    location: '',
    primarySport: 'Football',
    position: '',
    experience: '',
    trainingFrequency: '3-4 days/week',
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/athletes/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data) {
          setProfile(response.data);
        }
      } catch (err) {
        console.warn('Backend offline. Loading from local storage fallback.');
        const storedProfile = localStorage.getItem('athleteProfile');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        } else if (user.fullName) {
          setProfile((prev) => ({ ...prev, name: user.fullName }));
        }
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('athleteProfile', JSON.stringify(profile));
    await saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-2">Athlete Profile Settings</h2>
        <p className="text-slate-400 text-sm mb-6">
          Keep your physical metrics and sports bio updated for accurate AI scoring.
        </p>

        {saved && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg text-sm mb-6 text-center font-medium">
            ✓ Profile saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Rahul Das"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1 font-medium">Age (Years)</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                placeholder="17"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1 font-medium">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={profile.height}
                onChange={handleChange}
                placeholder="175"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1 font-medium">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={profile.weight}
                onChange={handleChange}
                placeholder="68"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="Kolkata, West Bengal"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1 font-medium">Primary Sport</label>
              <select
                name="primarySport"
                value={profile.primarySport}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Basketball">Basketball</option>
                <option value="Athletics">Athletics</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1 font-medium">Playing Position</label>
              <input
                type="text"
                name="position"
                value={profile.position}
                onChange={handleChange}
                placeholder="Winger / Midfielder"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1 font-medium">Experience (Years)</label>
              <input
                type="number"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                placeholder="3"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1 font-medium">Training Frequency</label>
              <select
                name="trainingFrequency"
                value={profile.trainingFrequency}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="1-2 days/week">1-2 days/week</option>
                <option value="3-4 days/week">3-4 days/week</option>
                <option value="5-6 days/week">5-6 days/week</option>
                <option value="Daily">Daily</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors cursor-pointer mt-4"
          >
            Save Profile
          </button>
        </form>
      </div>

      {/* Live Profile Card View */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-300">Live Athlete Card</h3>
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border border-slate-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg tracking-wider">
            Verified Draft
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold text-2xl">
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <h4 className="text-xl font-bold text-white leading-tight">
                {profile.name || 'Athlete Name'}
              </h4>
              <p className="text-blue-400 text-sm font-medium">
                {profile.primarySport} • {profile.position || 'Position'}
              </p>
              <p className="text-slate-400 text-xs mt-0.5">{profile.location || 'Location'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm bg-slate-950/60 p-4 rounded-xl border border-slate-800 mb-4">
            <div>
              <span className="block text-slate-500 text-xs">Age</span>
              <span className="font-semibold text-slate-200">{profile.age || '--'} yrs</span>
            </div>
            <div>
              <span className="block text-slate-500 text-xs">Height / Weight</span>
              <span className="font-semibold text-slate-200">
                {profile.height || '--'} cm / {profile.weight || '--'} kg
              </span>
            </div>
            <div>
              <span className="block text-slate-500 text-xs">Experience</span>
              <span className="font-semibold text-slate-200">{profile.experience || '--'} yrs</span>
            </div>
            <div>
              <span className="block text-slate-500 text-xs">Training</span>
              <span className="font-semibold text-slate-200">{profile.trainingFrequency}</span>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="inline-block text-xs text-slate-400 border border-slate-800 rounded-full px-3 py-1 bg-slate-900">
              Ready for AI Assessment ⚡
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}