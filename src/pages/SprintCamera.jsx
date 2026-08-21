import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SprintCamera() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: 'user' },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraReady(true);
        }
      } catch (err) {
        console.error('Camera access error:', err);
        setError('Camera permission denied or camera not found. Please allow access and reload.');
      }
    }

    setupCamera();

    return () => {
      // Clean up camera stream on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const startCountdown = () => {
    setIsCounting(true);
    setCountdown(3);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setTimeout(() => {
            // Save mock sprint score to local storage for Phase 7 results
            localStorage.setItem(
              'sprintResult',
              JSON.stringify({
                time: '2.84s',
                topSpeed: '24.2 km/h',
                score: 88,
              })
            );
            navigate('/test/sprint/result');
          }, 1000);
          return 'GO!';
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">10m Sprint — Camera Viewfinder</h2>
        <p className="text-slate-400 text-sm">
          Align yourself within the bounding box so your entire body is visible.
        </p>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl text-center">
          <p className="font-semibold">{error}</p>
        </div>
      ) : (
        <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center min-h-[420px]">
          {/* Live Video Feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-auto max-h-[500px] object-cover -scale-x-100"
          />

          {/* Alignment Overlay Guide */}
          {cameraReady && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="border-2 border-dashed border-blue-500/70 rounded-3xl w-48 h-80 flex items-center justify-center bg-blue-500/5">
                <span className="text-blue-400 text-xs font-semibold bg-slate-950/80 px-3 py-1 rounded-full border border-blue-500/30">
                  Stand Here
                </span>
              </div>
            </div>
          )}

          {/* Countdown Overlay */}
          {countdown !== null && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center">
              <span className="text-7xl font-extrabold text-blue-400 animate-pulse">
                {countdown}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Action Controls */}
      {cameraReady && !isCounting && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={startCountdown}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            Start Test (3s Countdown)
          </button>
        </div>
      )}
    </div>
  );
}