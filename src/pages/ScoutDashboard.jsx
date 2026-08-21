import React, { useState } from 'react';

export default function ScoutDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [minScore, setMinScore] = useState(0);

  // Dashboard section
  const [activeSection, setActiveSection] = useState('Athletes');

  // Saved athletes
  const [savedAthletes, setSavedAthletes] = useState([]);

  // Athletes selected for comparison
  const [compareAthletes, setCompareAthletes] = useState([]);

  // Detailed athlete profile
  const [selectedAthleteProfile, setSelectedAthleteProfile] = useState(null);

  // ============================================================
  // MOCK TALENT DATABASE
  // ============================================================

  const athletes = [
    {
      id: 1,
      name: 'Rahul Das',
      sport: 'Football',
      position: 'Winger',
      age: 17,
      location: 'Kolkata, WB',

      score: 88,

      speed: 91,
      agility: 84,
      jump: 88,

      sprintTime: '2.84s',
      topSpeed: '24.2 km/h',

      verified: true,
      verifiedBy: 'AI Scout Video Assessment v2.4',

      bio:
        'Explosive winger with exceptional acceleration and dribbling abilities in tight spaces.',

      performanceHistory: [
        {
          test: '10m Sprint',
          result: '2.84s',
          score: 88,
          date: '17 Aug 2026',
          status: 'Verified',
        },
        {
          test: 'Agility Test',
          result: '84/100',
          score: 84,
          date: '16 Aug 2026',
          status: 'Verified',
        },
        {
          test: 'Vertical Jump',
          result: '68 cm',
          score: 88,
          date: '15 Aug 2026',
          status: 'Verified',
        },
      ],

      assessmentVideos: [
        {
          title: '10m Sprint Assessment',
          type: 'Sprint',
          status: 'Verified',
        },
        {
          title: 'Agility Assessment',
          type: 'Agility',
          status: 'Verified',
        },
        {
          title: 'Vertical Jump Assessment',
          type: 'Jump',
          status: 'Verified',
        },
      ],
    },

    {
      id: 2,
      name: 'Priya Sharma',
      sport: 'Football',
      position: 'Midfielder',
      age: 19,
      location: 'Mumbai, MH',

      score: 92,

      speed: 95,
      agility: 91,
      jump: 86,

      sprintTime: '2.71s',
      topSpeed: '25.8 km/h',

      verified: true,
      verifiedBy: 'AI Scout Video Assessment v2.4',

      bio:
        'Box-to-box midfielder known for high work rate, vision, and sustained top-end speed.',

      performanceHistory: [
        {
          test: '10m Sprint',
          result: '2.71s',
          score: 92,
          date: '17 Aug 2026',
          status: 'Verified',
        },
        {
          test: 'Agility Test',
          result: '91/100',
          score: 91,
          date: '16 Aug 2026',
          status: 'Verified',
        },
        {
          test: 'Vertical Jump',
          result: '65 cm',
          score: 86,
          date: '15 Aug 2026',
          status: 'Verified',
        },
      ],

      assessmentVideos: [
        {
          title: '10m Sprint Assessment',
          type: 'Sprint',
          status: 'Verified',
        },
        {
          title: 'Agility Assessment',
          type: 'Agility',
          status: 'Verified',
        },
        {
          title: 'Vertical Jump Assessment',
          type: 'Jump',
          status: 'Verified',
        },
      ],
    },

    {
      id: 3,
      name: 'Amit Patel',
      sport: 'Cricket',
      position: 'Fast Bowler',
      age: 18,
      location: 'Ahmedabad, GJ',

      score: 81,

      speed: 82,
      agility: 78,
      jump: 80,

      sprintTime: '3.02s',
      topSpeed: '22.5 km/h',

      verified: true,
      verifiedBy: 'AI Scout Video Assessment v2.4',

      bio:
        'Pace bowler with clean run-up mechanics and consistent line and length release.',

      performanceHistory: [
        {
          test: '10m Sprint',
          result: '3.02s',
          score: 81,
          date: '17 Aug 2026',
          status: 'Verified',
        },
        {
          test: 'Agility Test',
          result: '78/100',
          score: 78,
          date: '16 Aug 2026',
          status: 'Verified',
        },
        {
          test: 'Vertical Jump',
          result: '61 cm',
          score: 80,
          date: '15 Aug 2026',
          status: 'Verified',
        },
      ],

      assessmentVideos: [
        {
          title: '10m Sprint Assessment',
          type: 'Sprint',
          status: 'Verified',
        },
        {
          title: 'Agility Assessment',
          type: 'Agility',
          status: 'Verified',
        },
        {
          title: 'Vertical Jump Assessment',
          type: 'Jump',
          status: 'Verified',
        },
      ],
    },

    {
      id: 4,
      name: 'Sneha Verma',
      sport: 'Athletics',
      position: 'Sprinter',
      age: 16,
      location: 'Delhi, NCR',

      score: 95,

      speed: 98,
      agility: 93,
      jump: 91,

      sprintTime: '2.62s',
      topSpeed: '27.1 km/h',

      verified: true,
      verifiedBy: 'AI Scout Video Assessment v2.4',

      bio:
        'Elite junior sprinter displaying explosive block clearance and high terminal velocity.',

      performanceHistory: [
        {
          test: '10m Sprint',
          result: '2.62s',
          score: 95,
          date: '17 Aug 2026',
          status: 'Verified',
        },
        {
          test: 'Agility Test',
          result: '93/100',
          score: 93,
          date: '16 Aug 2026',
          status: 'Verified',
        },
        {
          test: 'Vertical Jump',
          result: '72 cm',
          score: 91,
          date: '15 Aug 2026',
          status: 'Verified',
        },
      ],

      assessmentVideos: [
        {
          title: '10m Sprint Assessment',
          type: 'Sprint',
          status: 'Verified',
        },
        {
          title: 'Agility Assessment',
          type: 'Agility',
          status: 'Verified',
        },
        {
          title: 'Vertical Jump Assessment',
          type: 'Jump',
          status: 'Verified',
        },
      ],
    },
  ];

  // ============================================================
  // FILTER ATHLETES
  // ============================================================

  const filteredAthletes = athletes.filter((athlete) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      athlete.name.toLowerCase().includes(search) ||
      athlete.position.toLowerCase().includes(search) ||
      athlete.location.toLowerCase().includes(search) ||
      athlete.sport.toLowerCase().includes(search);

    const matchesSport =
      selectedSport === 'All' || athlete.sport === selectedSport;

    const matchesScore = athlete.score >= minScore;

    return matchesSearch && matchesSport && matchesScore;
  });

  // ============================================================
  // SAVE ATHLETE
  // ============================================================

  const isSaved = (athleteId) => {
    return savedAthletes.some((athlete) => athlete.id === athleteId);
  };

  const toggleSaveAthlete = (athlete) => {
    if (isSaved(athlete.id)) {
      setSavedAthletes(
        savedAthletes.filter((saved) => saved.id !== athlete.id)
      );
    } else {
      setSavedAthletes([...savedAthletes, athlete]);
    }
  };

  // ============================================================
  // COMPARE ATHLETE
  // ============================================================

  const isSelectedForCompare = (athleteId) => {
    return compareAthletes.some(
      (athlete) => athlete.id === athleteId
    );
  };

  const toggleCompareAthlete = (athlete) => {
    if (isSelectedForCompare(athlete.id)) {
      setCompareAthletes(
        compareAthletes.filter(
          (selected) => selected.id !== athlete.id
        )
      );
    } else {
      if (compareAthletes.length >= 4) {
        alert('You can compare a maximum of 4 athletes.');
        return;
      }

      setCompareAthletes([
        ...compareAthletes,
        athlete,
      ]);
    }
  };

  const clearComparison = () => {
    setCompareAthletes([]);
  };

  // ============================================================
  // RESET FILTERS
  // ============================================================

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSport('All');
    setMinScore(0);
  };

  // ============================================================
  // EXPORT SHORTLIST
  // ============================================================

  const exportShortlist = () => {
    if (savedAthletes.length === 0) {
      alert('No saved athletes to export.');
      return;
    }

    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(savedAthletes, null, 2)
      );

    const downloadAnchor =
      document.createElement('a');

    downloadAnchor.setAttribute(
      'href',
      dataStr
    );

    downloadAnchor.setAttribute(
      'download',
      'scout_shortlist.json'
    );

    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // ============================================================
  // OPEN FULL ATHLETE PROFILE
  // ============================================================

  const openAthleteProfile = (athlete) => {
    setSelectedAthleteProfile(athlete);
  };

  // ============================================================
  // ATHLETE CARD
  // ============================================================

  const AthleteCard = ({ athlete }) => (
    <div
      className="bg-slate-900 border border-slate-800 hover:border-blue-500/60 rounded-2xl p-6 shadow-xl transition-all relative overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">

            {/* Avatar */}
            <button
              onClick={() => openAthleteProfile(athlete)}
              className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500 flex items-center justify-center text-blue-400 font-bold text-lg hover:bg-blue-600/30 transition-colors cursor-pointer"
              title="View full athlete profile"
            >
              {athlete.name.charAt(0)}
            </button>

            <div>
              {/* CLICKABLE NAME */}
              <button
                onClick={() => openAthleteProfile(athlete)}
                className="text-lg font-bold text-white hover:text-blue-400 transition-colors cursor-pointer text-left"
              >
                {athlete.name}
              </button>

              <p className="text-slate-400 text-xs">
                {athlete.sport} • {athlete.position} ({athlete.age} yrs)
              </p>

              <p className="text-slate-500 text-xs">
                {athlete.location}
              </p>
            </div>
          </div>

          {/* AI SCORE */}
          <div className="text-right">
            <span className="text-2xl font-extrabold text-blue-400">
              {athlete.score}
            </span>

            <span className="block text-[10px] text-slate-500 uppercase font-semibold">
              AI Score
            </span>
          </div>
        </div>

        {/* VERIFIED BADGE */}
        {athlete.verified && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              ✓ Verified Athlete
            </span>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 mb-4">

          <div>
            <span className="block text-slate-500">
              10m Sprint Time
            </span>

            <span className="font-bold text-slate-200">
              {athlete.sprintTime}
            </span>
          </div>

          <div>
            <span className="block text-slate-500">
              Top Speed
            </span>

            <span className="font-bold text-slate-200">
              {athlete.topSpeed}
            </span>
          </div>

        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div>

        <div className="grid grid-cols-2 gap-2 mb-2">

          {/* SAVE */}
          <button
            onClick={() => toggleSaveAthlete(athlete)}
            className={`font-medium py-2 rounded-lg text-sm transition-colors cursor-pointer ${
              isSaved(athlete.id)
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30'
                : 'bg-slate-800 hover:bg-yellow-500/20 text-white hover:text-yellow-400'
            }`}
          >
            {isSaved(athlete.id)
              ? '★ Saved'
              : '☆ Save'}
          </button>

          {/* COMPARE */}
          <button
            onClick={() => toggleCompareAthlete(athlete)}
            className={`font-medium py-2 rounded-lg text-sm transition-colors cursor-pointer ${
              isSelectedForCompare(athlete.id)
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 hover:bg-blue-600 text-white'
            }`}
          >
            {isSelectedForCompare(athlete.id)
              ? '✓ Selected'
              : 'Compare'}
          </button>

        </div>

        {/* FULL PROFILE */}
        <button
          onClick={() => openAthleteProfile(athlete)}
          className="w-full bg-slate-800 hover:bg-blue-600 text-white font-medium py-2 rounded-lg text-sm transition-colors cursor-pointer"
        >
          👤 View Full Profile →
        </button>

      </div>
    </div>
  );

  // ============================================================
  // MAIN RETURN
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 mb-6 shadow-xl">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <span className="bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3">
                Scout & Club Portal
              </span>

              <h1 className="text-3xl font-extrabold text-white mb-2">
                Scout Dashboard
              </h1>

              <p className="text-slate-400 text-sm">
                Search, save and compare AI-verified talent from registered athletes across India.
              </p>

            </div>

            {/* DASHBOARD STATS */}

            <div className="flex gap-3">

              <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-center">
                <p className="text-xl font-bold text-blue-400">
                  {athletes.length}
                </p>

                <p className="text-[10px] text-slate-500 uppercase">
                  Athletes
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-center">
                <p className="text-xl font-bold text-yellow-400">
                  {savedAthletes.length}
                </p>

                <p className="text-[10px] text-slate-500 uppercase">
                  Saved
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-center">
                <p className="text-xl font-bold text-purple-400">
                  {compareAthletes.length}
                </p>

                <p className="text-[10px] text-slate-500 uppercase">
                  Compare
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ====================================================
            NAVIGATION
        ==================================================== */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 mb-8 flex flex-wrap gap-2">

          <button
            onClick={() => setActiveSection('Athletes')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeSection === 'Athletes'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            👥 Athletes
          </button>

          <button
            onClick={() => setActiveSection('Saved')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeSection === 'Saved'
                ? 'bg-yellow-500 text-slate-950 font-semibold'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            ⭐ Saved Athletes

            {savedAthletes.length > 0 && (
              <span className="ml-2 bg-slate-950 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                {savedAthletes.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSection('Search')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeSection === 'Search'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            🔍 Search Talent
          </button>

          <button
            onClick={() => setActiveSection('Compare')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeSection === 'Compare'
                ? 'bg-green-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            ⚖ Compare

            {compareAthletes.length > 0 && (
              <span className="ml-2 bg-slate-950 text-green-400 px-2 py-0.5 rounded-full text-xs">
                {compareAthletes.length}
              </span>
            )}
          </button>

        </div>

        {/* ====================================================
            ATHLETES SECTION
        ==================================================== */}

        {activeSection === 'Athletes' && (
          <>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                All Athletes
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Browse registered athletes and discover new talent.
              </p>
            </div>

            {/* FILTERS */}

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1">
                  Search Athlete / City
                </label>

                <input
                  type="text"
                  placeholder="e.g. Rahul, Winger, Kolkata"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1">
                  Filter by Sport
                </label>

                <select
                  value={selectedSport}
                  onChange={(e) =>
                    setSelectedSport(e.target.value)
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="All">
                    All Sports
                  </option>

                  <option value="Football">
                    Football
                  </option>

                  <option value="Cricket">
                    Cricket
                  </option>

                  <option value="Athletics">
                    Athletics
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1">
                  Min. AI Performance Score ({minScore}+)
                </label>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={minScore}
                  onChange={(e) =>
                    setMinScore(Number(e.target.value))
                  }
                  className="w-full mt-2 cursor-pointer accent-blue-500"
                />
              </div>

            </div>

            {/* RESULTS */}

            <div className="flex justify-between items-center mb-4">

              <p className="text-sm text-slate-500">
                Showing {filteredAthletes.length} athlete
                {filteredAthletes.length !== 1
                  ? 's'
                  : ''}
              </p>

              {(searchTerm ||
                selectedSport !== 'All' ||
                minScore > 0) && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  Reset Filters
                </button>
              )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {filteredAthletes.map((athlete) => (
                <AthleteCard
                  key={athlete.id}
                  athlete={athlete}
                />
              ))}

            </div>

            {filteredAthletes.length === 0 && (
              <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl text-slate-500">
                <p className="text-lg mb-2">
                  No athletes found
                </p>

                <p className="text-sm">
                  Try changing your search or filter criteria.
                </p>
              </div>
            )}

          </>
        )}

        {/* ====================================================
            SEARCH SECTION
        ==================================================== */}

        {activeSection === 'Search' && (
          <>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Search Talent
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Find athletes by name, sport, position or location.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

              <label className="block text-slate-400 text-sm font-medium mb-2">
                Search Talent
              </label>

              <div className="flex flex-col md:flex-row gap-3">

                <input
                  type="text"
                  autoFocus
                  placeholder="Search by athlete name, sport, position or city..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />

                <select
                  value={selectedSport}
                  onChange={(e) =>
                    setSelectedSport(e.target.value)
                  }
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="All">
                    All Sports
                  </option>

                  <option value="Football">
                    Football
                  </option>

                  <option value="Cricket">
                    Cricket
                  </option>

                  <option value="Athletics">
                    Athletics
                  </option>
                </select>

              </div>

              <div className="mt-4 flex justify-between items-center">

                <p className="text-xs text-slate-500">
                  {filteredAthletes.length} matching talent
                  {filteredAthletes.length !== 1
                    ? 's'
                    : ''}{' '}
                  found
                </p>

                <button
                  onClick={resetFilters}
                  className="text-xs text-purple-400 hover:text-purple-300 cursor-pointer"
                >
                  Clear Search
                </button>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {filteredAthletes.map((athlete) => (
                <AthleteCard
                  key={athlete.id}
                  athlete={athlete}
                />
              ))}

            </div>

            {filteredAthletes.length === 0 && (
              <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl text-slate-500">
                No talent matches your search.
              </div>
            )}

          </>
        )}

        {/* ====================================================
            SAVED ATHLETES
        ==================================================== */}

        {activeSection === 'Saved' && (
          <>

            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Saved Athletes
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Athletes you have shortlisted for future review.
                </p>
              </div>

              <div className="flex items-center gap-3">

                {savedAthletes.length > 0 && (
                  <button
                    onClick={exportShortlist}
                    className="bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-yellow-500/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    📥 Export Shortlist
                  </button>
                )}

                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg text-sm font-medium">
                  {savedAthletes.length} saved
                </div>

              </div>

            </div>

            {savedAthletes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {savedAthletes.map((athlete) => (
                  <AthleteCard
                    key={athlete.id}
                    athlete={athlete}
                  />
                ))}

              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">

                <div className="text-5xl mb-4">
                  ⭐
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  No Saved Athletes
                </h3>

                <p className="text-slate-500 text-sm mb-5">
                  Save athletes you're interested in to create your shortlist.
                </p>

                <button
                  onClick={() =>
                    setActiveSection('Athletes')
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium cursor-pointer"
                >
                  Browse Athletes
                </button>

              </div>
            )}

          </>
        )}

        {/* ====================================================
            COMPARE SECTION
        ==================================================== */}

        {activeSection === 'Compare' && (
          <>

            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Compare Athletes
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Compare performance metrics side-by-side.
                </p>
              </div>

              {compareAthletes.length > 0 && (
                <button
                  onClick={clearComparison}
                  className="border border-red-500/30 text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-lg text-sm cursor-pointer"
                >
                  Clear Comparison
                </button>
              )}

            </div>

            {compareAthletes.length === 0 ? (
              <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">

                <div className="text-5xl mb-4">
                  ⚖️
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  No Athletes Selected
                </h3>

                <p className="text-slate-500 text-sm mb-5">
                  Select 2 to 4 athletes from the Athletes section to compare their performance.
                </p>

                <button
                  onClick={() =>
                    setActiveSection('Athletes')
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium cursor-pointer"
                >
                  Select Athletes
                </button>

              </div>
            ) : (
              <>

                {/* Selected Athletes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                  {compareAthletes.map((athlete) => (

                    <div
                      key={athlete.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between"
                    >

                      <button
                        onClick={() =>
                          openAthleteProfile(athlete)
                        }
                        className="flex items-center gap-3 cursor-pointer"
                      >

                        <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500 flex items-center justify-center text-blue-400 font-bold">
                          {athlete.name.charAt(0)}
                        </div>

                        <div className="text-left">

                          <p className="font-bold text-white text-sm hover:text-blue-400">
                            {athlete.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {athlete.sport}
                          </p>

                        </div>

                      </button>

                      <button
                        onClick={() =>
                          toggleCompareAthlete(athlete)
                        }
                        className="text-slate-500 hover:text-red-400 text-lg font-bold px-2 cursor-pointer"
                        title="Remove from comparison"
                      >
                        ×
                      </button>

                    </div>

                  ))}

                </div>

                {/* Comparison Table */}

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                  <div className="p-5 border-b border-slate-800">

                    <h3 className="font-bold text-white">
                      Performance Comparison
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      Side-by-side comparison of selected athletes.
                    </p>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="bg-slate-950">

                          <th className="text-left text-slate-500 font-medium px-5 py-4">
                            Metric
                          </th>

                          {compareAthletes.map(
                            (athlete) => (
                              <th
                                key={athlete.id}
                                className="text-left text-white font-bold px-5 py-4 min-w-[160px]"
                              >
                                {athlete.name}
                              </th>
                            )
                          )}

                        </tr>

                      </thead>

                      <tbody>

                        <tr className="border-t border-slate-800">
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            Sport
                          </td>

                          {compareAthletes.map(
                            (athlete) => (
                              <td
                                key={athlete.id}
                                className="px-5 py-4 text-slate-200"
                              >
                                {athlete.sport}
                              </td>
                            )
                          )}
                        </tr>

                        <tr className="border-t border-slate-800">
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            Position
                          </td>

                          {compareAthletes.map(
                            (athlete) => (
                              <td
                                key={athlete.id}
                                className="px-5 py-4 text-slate-200"
                              >
                                {athlete.position}
                              </td>
                            )
                          )}
                        </tr>

                        <tr className="border-t border-slate-800">
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            Age
                          </td>

                          {compareAthletes.map(
                            (athlete) => (
                              <td
                                key={athlete.id}
                                className="px-5 py-4 text-slate-200"
                              >
                                {athlete.age} years
                              </td>
                            )
                          )}
                        </tr>

                        <tr className="border-t border-slate-800">
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            Location
                          </td>

                          {compareAthletes.map(
                            (athlete) => (
                              <td
                                key={athlete.id}
                                className="px-5 py-4 text-slate-200"
                              >
                                {athlete.location}
                              </td>
                            )
                          )}
                        </tr>

                        <tr className="border-t border-slate-800">
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            AI Score
                          </td>

                          {compareAthletes.map(
                            (athlete) => (
                              <td
                                key={athlete.id}
                                className="px-5 py-4"
                              >
                                <span className="text-xl font-extrabold text-blue-400">
                                  {athlete.score}
                                </span>

                                <span className="text-xs text-slate-500">
                                  /100
                                </span>
                              </td>
                            )
                          )}
                        </tr>

                        <tr className="border-t border-slate-800">
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            Speed
                          </td>

                          {compareAthletes.map(
                            (athlete) => (
                              <td
                                key={athlete.id}
                                className="px-5 py-4 text-slate-200 font-semibold"
                              >
                                {athlete.speed}/100
                              </td>
                            )
                          )}
                        </tr>

                        <tr className="border-t border-slate-800">
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            Agility
                          </td>

                          {compareAthletes.map(
                            (athlete) => (
                              <td
                                key={athlete.id}
                                className="px-5 py-4 text-slate-200 font-semibold"
                              >
                                {athlete.agility}/100
                              </td>
                            )
                          )}
                        </tr>

                        <tr className="border-t border-slate-800">
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            Jump
                          </td>

                          {compareAthletes.map(
                            (athlete) => (
                              <td
                                key={athlete.id}
                                className="px-5 py-4 text-slate-200 font-semibold"
                              >
                                {athlete.jump}/100
                              </td>
                            )
                          )}
                        </tr>

                        <tr className="border-t border-slate-800">
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            10m Sprint
                          </td>

                          {compareAthletes.map(
                            (athlete) => (
                              <td
                                key={athlete.id}
                                className="px-5 py-4 text-slate-200 font-semibold"
                              >
                                {athlete.sprintTime}
                              </td>
                            )
                          )}
                        </tr>

                        <tr className="border-t border-slate-800">
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            Top Speed
                          </td>

                          {compareAthletes.map(
                            (athlete) => (
                              <td
                                key={athlete.id}
                                className="px-5 py-4 text-slate-200 font-semibold"
                              >
                                {athlete.topSpeed}
                              </td>
                            )
                          )}
                        </tr>

                        <tr className="border-t border-slate-800">
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            Verification
                          </td>

                          {compareAthletes.map(
                            (athlete) => (
                              <td
                                key={athlete.id}
                                className="px-5 py-4 text-emerald-400 text-xs font-semibold"
                              >
                                ✓ Verified
                              </td>
                            )
                          )}
                        </tr>

                      </tbody>

                    </table>

                  </div>

                </div>

              </>
            )}

          </>
        )}

      </div>

      {/* ========================================================
          FULL ATHLETE PROFILE MODAL
      ======================================================== */}

      {selectedAthleteProfile && (

        <div
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() =>
            setSelectedAthleteProfile(null)
          }
        >

          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* PROFILE HEADER */}

            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 z-10">

              <button
                onClick={() =>
                  setSelectedAthleteProfile(null)
                }
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl font-bold cursor-pointer"
              >
                ×
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                {/* Avatar */}

                <div className="w-20 h-20 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold text-3xl">
                  {selectedAthleteProfile.name.charAt(0)}
                </div>

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl font-extrabold text-white">
                      {selectedAthleteProfile.name}
                    </h2>

                    {/* VERIFIED BADGE */}

                    {selectedAthleteProfile.verified && (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                        ✓ Verified
                      </span>
                    )}

                  </div>

                  <p className="text-slate-400 text-sm mt-1">
                    {selectedAthleteProfile.sport} •{' '}
                    {selectedAthleteProfile.position} • U
                    {selectedAthleteProfile.age}
                  </p>

                  <p className="text-slate-500 text-sm">
                    📍 {selectedAthleteProfile.location}
                  </p>

                </div>

                {/* SCORE */}

                <div className="text-center bg-slate-950 border border-slate-800 rounded-xl px-5 py-3">

                  <p className="text-3xl font-extrabold text-blue-400">
                    {selectedAthleteProfile.score}
                  </p>

                  <p className="text-[10px] text-slate-500 uppercase font-bold">
                    Overall AI Score
                  </p>

                </div>

              </div>

            </div>

            <div className="p-6 space-y-6">

              {/* =================================================
                  VERIFIED STATUS
              ================================================= */}

              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    ✓
                  </div>

                  <div>

                    <h3 className="text-white font-bold text-sm">
                      Verified Athlete
                    </h3>

                    <p className="text-slate-500 text-xs">
                      {selectedAthleteProfile.verifiedBy}
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  BIO
              ================================================= */}

              <div>

                <h3 className="text-lg font-bold text-white mb-3">
                  Athlete Overview
                </h3>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedAthleteProfile.bio}
                  </p>

                </div>

              </div>

              {/* =================================================
                  PERFORMANCE STATS
              ================================================= */}

              <div>

                <h3 className="text-lg font-bold text-white mb-3">
                  Performance Metrics
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

                  {/* SPEED */}

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">

                    <p className="text-slate-500 text-xs uppercase">
                      Speed
                    </p>

                    <p className="text-2xl font-extrabold text-blue-400 mt-1">
                      {selectedAthleteProfile.speed}
                    </p>

                    <p className="text-[10px] text-slate-600">
                      /100
                    </p>

                  </div>

                  {/* AGILITY */}

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">

                    <p className="text-slate-500 text-xs uppercase">
                      Agility
                    </p>

                    <p className="text-2xl font-extrabold text-purple-400 mt-1">
                      {selectedAthleteProfile.agility}
                    </p>

                    <p className="text-[10px] text-slate-600">
                      /100
                    </p>

                  </div>

                  {/* JUMP */}

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">

                    <p className="text-slate-500 text-xs uppercase">
                      Jump
                    </p>

                    <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                      {selectedAthleteProfile.jump}
                    </p>

                    <p className="text-[10px] text-slate-600">
                      /100
                    </p>

                  </div>

                  {/* SPRINT */}

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">

                    <p className="text-slate-500 text-xs uppercase">
                      10m Sprint
                    </p>

                    <p className="text-2xl font-extrabold text-white mt-1">
                      {selectedAthleteProfile.sprintTime}
                    </p>

                  </div>

                  {/* TOP SPEED */}

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">

                    <p className="text-slate-500 text-xs uppercase">
                      Top Speed
                    </p>

                    <p className="text-xl font-extrabold text-white mt-1">
                      {selectedAthleteProfile.topSpeed}
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  PERFORMANCE HISTORY
              ================================================= */}

              <div>

                <div className="flex items-center justify-between mb-3">

                  <div>

                    <h3 className="text-lg font-bold text-white">
                      Performance History
                    </h3>

                    <p className="text-slate-500 text-xs">
                      Previous verified assessments
                    </p>

                  </div>

                  <span className="text-xs text-emerald-400 font-semibold">
                    ✓ Verified Records
                  </span>

                </div>

                <div className="space-y-3">

                  {selectedAthleteProfile.performanceHistory.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            ⚡
                          </div>

                          <div>

                            <p className="text-white font-bold text-sm">
                              {item.test}
                            </p>

                            <p className="text-slate-500 text-xs">
                              {item.date}
                            </p>

                          </div>

                        </div>

                        <div className="flex items-center gap-5">

                          <div className="text-right">

                            <p className="text-slate-500 text-[10px] uppercase">
                              Result
                            </p>

                            <p className="text-white font-bold text-sm">
                              {item.result}
                            </p>

                          </div>

                          <div className="text-right">

                            <p className="text-slate-500 text-[10px] uppercase">
                              Score
                            </p>

                            <p className="text-blue-400 font-bold">
                              {item.score}/100
                            </p>

                          </div>

                          <span className="text-emerald-400 text-xs font-bold">
                            ✓ {item.status}
                          </span>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  ASSESSMENT VIDEOS
              ================================================= */}

              <div>

                <div className="mb-3">

                  <h3 className="text-lg font-bold text-white">
                    Assessment Videos
                  </h3>

                  <p className="text-slate-500 text-xs">
                    AI-verified videos submitted during assessments
                  </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                  {selectedAthleteProfile.assessmentVideos.map(
                    (video, index) => (

                      <div
                        key={index}
                        className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden"
                      >

                        {/* VIDEO PREVIEW */}

                        <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">

                          <div className="text-center">

                            <div className="w-12 h-12 mx-auto rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xl">
                              ▶
                            </div>

                            <p className="text-[10px] text-slate-500 mt-2">
                              Assessment Recording
                            </p>

                          </div>

                        </div>

                        <div className="p-3">

                          <p className="text-white text-sm font-bold">
                            {video.title}
                          </p>

                          <div className="flex items-center justify-between mt-2">

                            <span className="text-xs text-slate-500">
                              {video.type}
                            </span>

                            <span className="text-xs text-emerald-400 font-semibold">
                              ✓ {video.status}
                            </span>

                          </div>

                          <button
                            onClick={() =>
                              alert(
                                `${video.title} video viewer will connect to the uploaded assessment video in the backend/storage phase.`
                              )
                            }
                            className="w-full mt-3 bg-slate-800 hover:bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                          >
                            ▶ View Assessment
                          </button>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  VERIFICATION
              ================================================= */}

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">

                <div className="flex items-center gap-3">

                  <span className="text-2xl">
                    🛡️
                  </span>

                  <div>

                    <h3 className="text-white text-sm font-bold">
                      Assessment Verification
                    </h3>

                    <p className="text-slate-500 text-xs">
                      Results verified using AI-assisted assessment pipeline.
                    </p>

                    <p className="text-slate-400 text-xs mt-1">
                      Method: {selectedAthleteProfile.verifiedBy}
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  ACTION BUTTONS
              ================================================= */}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">

                <button
                  onClick={() => {
                    alert(
                      `Recruitment request sent for ${selectedAthleteProfile.name}!`
                    );

                    setSelectedAthleteProfile(null);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
                >
                  📩 Send Official Inquiry
                </button>

                <button
                  onClick={() =>
                    toggleSaveAthlete(
                      selectedAthleteProfile
                    )
                  }
                  className={`flex-1 py-3 rounded-xl font-bold transition-colors cursor-pointer ${
                    isSaved(
                      selectedAthleteProfile.id
                    )
                      ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {isSaved(
                    selectedAthleteProfile.id
                  )
                    ? '★ Saved Athlete'
                    : '☆ Save Athlete'}
                </button>

                <button
                  onClick={() =>
                    setSelectedAthleteProfile(null)
                  }
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}