import React, { useState } from 'react';
import { IMAGES } from '../../data/mockData';
import { 
  ScanSearch, 
  UploadCloud, 
  Plane, 
  Satellite, 
  CheckCircle2, 
  Radio, 
  Compass, 
  Wind, 
  BatteryCharging, 
  Camera, 
  Eye, 
  Download, 
  Sparkles,
  Layers
} from 'lucide-react';

export const DroneImageryView: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState('MSN-2026-0828-A');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsUploading(false), 500);
          return 100;
        }
        return p + 18;
      });
    }, 250);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Drone Orthomosaic & Flight Missions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ingest raw high-resolution aerial surveys, verify RTK geotagging, and dispatch AI vectorization.
          </p>
        </div>

        <button
          onClick={handleSimulateUpload}
          disabled={isUploading}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>{isUploading ? `Ingesting Ortho (${uploadProgress}%)...` : 'Upload Drone Orthomosaic'}</span>
        </button>
      </div>

      {/* Flight Telemetry & Mission Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Mission Selector & Flight Specs (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 mb-3.5 flex items-center gap-2">
              <Plane className="w-4 h-4 text-indigo-600" />
              <span>Survey Flights Ingested</span>
            </h3>

            <div className="space-y-2">
              {[
                { id: 'MSN-2026-0828-A', name: 'Mylapore North Ortho Run 04', date: '28 Aug 2026', gsd: '2.4 cm/px', status: 'Ready' },
                { id: 'MSN-2026-0824-B', name: 'Egmore West Corridor Run 02', date: '24 Aug 2026', gsd: '2.1 cm/px', status: 'Ready' },
                { id: 'MSN-2026-0820-C', name: 'Anna Nagar Grid Quadrant 01', date: '20 Aug 2026', gsd: '1.9 cm/px', status: 'Archived' }
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMission(m.id)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedMission === m.id
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs'
                      : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-900">{m.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                      {m.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>{m.id}</span>
                    <span className="font-bold text-slate-700">{m.gsd}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RTK Live Telemetry Box */}
          <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-3.5">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                RTK Flight Telemetry
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100 font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
                FIX 3D (28 Sats)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium block">Altitude (AGL)</span>
                <span className="font-bold text-slate-900">120.0 m</span>
              </div>
              <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-emerald-700 font-medium block">Horizontal RMS</span>
                <span className="font-bold text-emerald-700">±0.8 cm</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium block">Forward Overlap</span>
                <span className="font-bold text-slate-900">80%</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium block">Side Overlap</span>
                <span className="font-bold text-slate-900">70%</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-500 pt-1">
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5 text-slate-400"><Camera className="w-3.5 h-3.5" /> Sensor:</span>
                <span className="font-medium text-slate-800">Sony α7R IV (61 MP RGB)</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5 text-slate-400"><Wind className="w-3.5 h-3.5" /> Wind Speed:</span>
                <span className="font-medium text-slate-800">3.2 m/s (Calm)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: High-Res Orthomosaic Preview (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Orthomosaic Viewport (EPSG:32644 - UTM Zone 44N)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Mylapore Urban Core • Ingestion Timestamp: 2026-08-28 14:12 UTC
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert("GeoTIFF orthomosaic cloud download package prepared.")}
                className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                <span>Export GeoTIFF</span>
              </button>
            </div>
          </div>

          {/* Canvas Image Container */}
          <div
            className="relative h-[430px] rounded-2xl overflow-hidden border border-slate-200 bg-cover bg-center group"
            style={{ backgroundImage: `url('${IMAGES.originalDrone}')` }}
          >
            {/* Grid Overlays */}
            <div className="absolute inset-0 pointer-events-none opacity-20 grid grid-cols-6 grid-rows-4 border border-white/50">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border border-white/40" />
              ))}
            </div>

            <div className="absolute top-3.5 left-3.5 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-lg">
              Center: 13.0418° N, 80.2635° E • GSD: 2.4cm/px
            </div>

            <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-xl text-slate-900 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg border border-slate-200/90 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Vectorization Model Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
