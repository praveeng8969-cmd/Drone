import React, { useState } from 'react';
import { Parcel, MapLayerConfig } from '../../types';
import { IMAGES, MOCK_PARCELS, MOCK_BUILDINGS, MOCK_ROADS } from '../../data/mockData';
import { 
  Plus, 
  Minus, 
  Crosshair, 
  Maximize2, 
  Ruler, 
  PenTool, 
  Edit3, 
  Layers, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  X,
  FileCheck,
  Tag,
  Check,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface GisMapWorkspaceProps {
  selectedParcel?: Parcel;
  onParcelSelect?: (parcel: Parcel) => void;
}

export const GisMapWorkspace: React.FC<GisMapWorkspaceProps> = ({
  selectedParcel: initialSelectedParcel,
  onParcelSelect
}) => {
  const [parcels, setParcels] = useState<Parcel[]>(MOCK_PARCELS);
  const [activeParcel, setActiveParcel] = useState<Parcel>(
    initialSelectedParcel || MOCK_PARCELS[0]
  );
  const [layers, setLayers] = useState<MapLayerConfig>({
    parcelBoundaries: true,
    buildings: true,
    roads: true,
    waterBodies: false,
    vegetation: false,
    aiConfidenceHeatmap: false
  });
  const [activeTool, setActiveTool] = useState<'select' | 'measure' | 'draw' | 'edit'>('edit');
  const [isEditingBoundary, setIsEditingBoundary] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectParcel = (p: Parcel) => {
    setActiveParcel(p);
    setIsInfoPanelOpen(true);
    if (onParcelSelect) onParcelSelect(p);
  };

  const handleVerifyParcel = () => {
    const updated = parcels.map((p) =>
      p.id === activeParcel.id ? { ...p, status: 'VERIFIED' as const } : p
    );
    setParcels(updated);
    setActiveParcel({ ...activeParcel, status: 'VERIFIED' });
    showToast(`Parcel ${activeParcel.code} marked as VERIFIED and committed to cadastral ledger.`);
  };

  const handleRejectParcel = () => {
    const updated = parcels.map((p) =>
      p.id === activeParcel.id ? { ...p, status: 'REJECTED' as const } : p
    );
    setParcels(updated);
    setActiveParcel({ ...activeParcel, status: 'REJECTED' });
    showToast(`Parcel ${activeParcel.code} marked as REJECTED. Sent to dispute triage.`);
  };

  const handleResetVerification = () => {
    const updated = parcels.map((p) =>
      p.id === activeParcel.id ? { ...p, status: 'AI_DETECTED' as const } : p
    );
    setParcels(updated);
    setActiveParcel({ ...activeParcel, status: 'AI_DETECTED' });
    showToast(`Parcel ${activeParcel.code} status reset to AI DETECTED.`);
  };

  const toggleLayer = (layerKey: keyof MapLayerConfig) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="relative w-full h-[calc(100vh-120px)] rounded-[28px] overflow-hidden border border-slate-200 shadow-sm bg-slate-100 select-none">
      {/* Satellite Imagery Base Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
        style={{
          backgroundImage: `url('${IMAGES.chennaiSatellite}')`,
          transform: `scale(${zoomLevel / 100})`
        }}
      />

      {/* Interactive SVG GIS Vector Overlay */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
      >
        {/* Heatmap Overlay */}
        {layers.aiConfidenceHeatmap && (
          <g opacity="0.45">
            <radialGradient id="heat1" cx="620" cy="310" r="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#818CF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heat2" cx="200" cy="150" r="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#6366F1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <circle cx="620" cy="310" r="180" fill="url(#heat1)" />
            <circle cx="200" cy="150" r="200" fill="url(#heat2)" />
          </g>
        )}

        {/* Road Network Layer */}
        {layers.roads && (
          <g stroke="#6366F1" strokeWidth="4" strokeOpacity="0.75" fill="none">
            {MOCK_ROADS.map((road) => (
              <path key={road.id} d={road.path} className="hover:stroke-indigo-400 transition-colors" />
            ))}
          </g>
        )}

        {/* Water Bodies Layer */}
        {layers.waterBodies && (
          <g fill="#38BDF8" fillOpacity="0.3" stroke="#0284C7" strokeWidth="1.5">
            <polygon points="850,20 980,10 990,300 890,280" />
          </g>
        )}

        {/* Vegetation Layer */}
        {layers.vegetation && (
          <g fill="#22C55E" fillOpacity="0.3" stroke="#16A34A" strokeWidth="1">
            <circle cx="150" cy="500" r="45" />
            <circle cx="480" cy="180" r="35" />
            <circle cx="700" cy="650" r="60" />
          </g>
        )}

        {/* Building Footprints Layer */}
        {layers.buildings && (
          <g fill="#8B5CF6" fillOpacity="0.4" stroke="#7C3AED" strokeWidth="1.5">
            {MOCK_BUILDINGS.map((bldg) => {
              const pointsStr = bldg.polygon.map(([x, y]) => `${x},${y}`).join(' ');
              return (
                <polygon
                  key={bldg.id}
                  points={pointsStr}
                  className="hover:fill-opacity-70 transition-all cursor-pointer"
                />
              );
            })}
          </g>
        )}

        {/* Parcel Boundaries Layer */}
        {layers.parcelBoundaries && (
          <g>
            {parcels.map((parcel) => {
              const isSelected = parcel.id === activeParcel.id;
              const pointsStr = parcel.polygon.map(([x, y]) => `${x},${y}`).join(' ');
              const strokeColor =
                parcel.status === 'VERIFIED'
                  ? '#10B981'
                  : parcel.status === 'REJECTED'
                  ? '#EF4444'
                  : isSelected
                  ? '#4F46E5'
                  : '#6366F1';

              const fillColor =
                parcel.status === 'VERIFIED'
                  ? 'rgba(16, 185, 129, 0.25)'
                  : parcel.status === 'REJECTED'
                  ? 'rgba(239, 68, 68, 0.25)'
                  : isSelected
                  ? 'rgba(79, 70, 229, 0.35)'
                  : 'rgba(99, 102, 241, 0.2)';

              return (
                <g key={parcel.id} onClick={() => handleSelectParcel(parcel)} className="cursor-pointer group">
                  <polygon
                    points={pointsStr}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? 3.5 : 2}
                    className="transition-all duration-200"
                  />

                  {/* Parcel Vertex Handles if in edit mode */}
                  {isSelected && isEditingBoundary && (
                    <>
                      {parcel.polygon.map(([vx, vy], idx) => (
                        <circle
                          key={idx}
                          cx={vx}
                          cy={vy}
                          r="5"
                          fill="#FFFFFF"
                          stroke="#4F46E5"
                          strokeWidth="2.5"
                          className="cursor-move animate-pulse"
                        />
                      ))}
                    </>
                  )}

                  {/* Centroid Tag Label */}
                  <text
                    x={parcel.centroid[0]}
                    y={parcel.centroid[1]}
                    fill="#0F172A"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="700"
                    textAnchor="middle"
                    className="select-none pointer-events-none drop-shadow-md"
                  >
                    {parcel.code}
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </svg>

      {/* Floating Toolbar on Right Side */}
      <div className="absolute right-4 top-4 flex flex-col gap-2.5 z-20">
        {/* Navigation & Zoom Tools */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-1.5 flex flex-col gap-1 shadow-lg shadow-slate-900/5">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 15, 200))}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 15, 70))}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-100 mx-1" />
          <button
            onClick={() => { setZoomLevel(100); showToast("Centered on Zone 04 Municipal Grid."); }}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            title="Recenter Map"
          >
            <Crosshair className="w-4 h-4" />
          </button>
          <button
            onClick={() => showToast("Expanded GIS viewport to full-screen mode.")}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            title="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Spatial Measurement & Vector Tools */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-1.5 flex flex-col gap-1 shadow-lg shadow-slate-900/5">
          <button
            onClick={() => {
              setActiveTool('measure');
              showToast("Measure Tool Active: Click two points to calculate geodetic Euclidean distance.");
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer ${
              activeTool === 'measure'
                ? 'bg-indigo-50 text-indigo-600 font-bold border-l-2 border-indigo-600'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Measure Distance & Area"
          >
            <Ruler className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setActiveTool('draw');
              showToast("Draw Tool Active: Click vertices to delineate a new parcel boundary.");
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer ${
              activeTool === 'draw'
                ? 'bg-indigo-50 text-indigo-600 font-bold border-l-2 border-indigo-600'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Draw Polygon"
          >
            <PenTool className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setActiveTool('edit');
              setIsEditingBoundary(!isEditingBoundary);
              showToast(isEditingBoundary ? "Exited Boundary Vertex Editor." : "Vertex Editor Active: Drag corner nodes to calibrate geometry.");
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer ${
              activeTool === 'edit'
                ? 'bg-indigo-50 text-indigo-600 font-bold border-l-2 border-indigo-600'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Edit Boundary Vertices"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Map Layers Panel (Top Right - Offset from Toolbar) */}
      <div className="absolute right-[68px] top-4 w-64 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/10 z-20 flex flex-col overflow-hidden">
        <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Map Layers</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-semibold">EPSG:3857</span>
        </div>

        <div className="p-3.5 space-y-2 text-xs">
          {/* Parcel Boundaries */}
          <label className="flex items-center justify-between cursor-pointer group py-0.5">
            <div className="flex items-center gap-2.5 text-slate-800">
              <div className="w-3 h-3 rounded-md bg-indigo-600 shadow-2xs" />
              <span className="font-medium">Parcel Boundaries</span>
            </div>
            <input
              type="checkbox"
              checked={layers.parcelBoundaries}
              onChange={() => toggleLayer('parcelBoundaries')}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </label>

          {/* Buildings */}
          <label className="flex items-center justify-between cursor-pointer group py-0.5">
            <div className="flex items-center gap-2.5 text-slate-800">
              <div className="w-3 h-3 rounded-md bg-purple-600 shadow-2xs" />
              <span className="font-medium">Buildings</span>
            </div>
            <input
              type="checkbox"
              checked={layers.buildings}
              onChange={() => toggleLayer('buildings')}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </label>

          {/* Roads */}
          <label className="flex items-center justify-between cursor-pointer group py-0.5">
            <div className="flex items-center gap-2.5 text-slate-800">
              <div className="w-3 h-3 rounded-md bg-indigo-400 shadow-2xs" />
              <span className="font-medium">Roads</span>
            </div>
            <input
              type="checkbox"
              checked={layers.roads}
              onChange={() => toggleLayer('roads')}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </label>

          <div className="h-px bg-slate-100 my-1" />

          {/* Water Bodies */}
          <label className="flex items-center justify-between cursor-pointer group py-0.5">
            <div className="flex items-center gap-2.5 text-slate-500 group-hover:text-slate-800">
              <div className="w-3 h-3 rounded-md border border-slate-300 bg-sky-400" />
              <span>Water Bodies</span>
            </div>
            <input
              type="checkbox"
              checked={layers.waterBodies}
              onChange={() => toggleLayer('waterBodies')}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </label>

          {/* Vegetation */}
          <label className="flex items-center justify-between cursor-pointer group py-0.5">
            <div className="flex items-center gap-2.5 text-slate-500 group-hover:text-slate-800">
              <div className="w-3 h-3 rounded-md border border-slate-300 bg-emerald-500" />
              <span>Vegetation</span>
            </div>
            <input
              type="checkbox"
              checked={layers.vegetation}
              onChange={() => toggleLayer('vegetation')}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </label>

          <div className="h-px bg-slate-100 my-1" />

          {/* AI Confidence Heatmap Toggle */}
          <label className="flex items-center justify-between cursor-pointer group pt-1">
            <div className="flex items-center gap-2 text-indigo-600 font-bold">
              <Flame className="w-4 h-4" />
              <span>AI Heatmap</span>
            </div>
            <button
              type="button"
              onClick={() => toggleLayer('aiConfidenceHeatmap')}
              className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors ${
                layers.aiConfidenceHeatmap ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform ${
                  layers.aiConfidenceHeatmap ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Floating Parcel Information Panel (Bottom Right) */}
      {isInfoPanelOpen && (
        <div className="absolute right-[68px] bottom-4 w-80 sm:w-88 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/10 z-20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Panel Header */}
          <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100 flex justify-between items-start">
            <div>
              <h2 className="font-bold text-sm text-slate-900">Parcel Information</h2>
              <p className="font-mono text-xs text-indigo-600 font-bold mt-0.5">{activeParcel.code}</p>
            </div>
            <button
              onClick={() => setIsInfoPanelOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Panel Body */}
          <div className="p-4 space-y-3.5 text-xs">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Status</span>
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  activeParcel.status === 'VERIFIED'
                    ? 'bg-emerald-100 text-emerald-700'
                    : activeParcel.status === 'REJECTED'
                    ? 'bg-red-100 text-red-700'
                    : activeParcel.status === 'CONFLICT'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {activeParcel.status === 'VERIFIED' ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : activeParcel.status === 'REJECTED' ? (
                  <XCircle className="w-3.5 h-3.5" />
                ) : activeParcel.status === 'CONFLICT' ? (
                  <AlertTriangle className="w-3.5 h-3.5" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{activeParcel.status.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2.5 p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Area</span>
                <span className="font-bold text-sm text-slate-800">
                  {activeParcel.areaSqMeters.toLocaleString()} m²
                </span>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Perimeter</span>
                <span className="font-bold text-sm text-slate-800">
                  {activeParcel.perimeterMeters} m
                </span>
              </div>

              <div className="col-span-2 pt-2 border-t border-slate-200/70">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Confidence Score</span>
                  <span className="font-bold text-xs text-indigo-600">{activeParcel.confidenceScore}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${activeParcel.confidenceScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Metadata tags */}
            <div className="space-y-1.5 text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-400 text-[11px] font-medium">Survey No:</span>
                <span className="font-mono font-bold text-slate-800">{activeParcel.surveyNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-[11px] font-medium">Zoning:</span>
                <span className="font-bold text-indigo-600">{activeParcel.zoningType}</span>
              </div>
              {activeParcel.ownerName && (
                <div className="flex justify-between truncate">
                  <span className="text-slate-400 text-[11px] font-medium">Registry Owner:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[150px]">{activeParcel.ownerName}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setIsEditingBoundary(!isEditingBoundary);
                  showToast(isEditingBoundary ? "Boundary changes saved." : "Boundary vertex editing active on map.");
                }}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <span>{isEditingBoundary ? 'Save Edited Boundary' : 'Edit Boundary Vertices'}</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handleVerifyParcel}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify</span>
                </button>

                <button
                  onClick={handleRejectParcel}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>

              {activeParcel.status !== 'AI_DETECTED' && (
                <button
                  onClick={handleResetVerification}
                  className="w-full text-[11px] text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-1 pt-1 font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset status to AI Detected</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mini Parcel Selector Pill (if info panel was closed) */}
      {!isInfoPanelOpen && (
        <button
          onClick={() => setIsInfoPanelOpen(true)}
          className="absolute right-4 bottom-4 bg-white/95 backdrop-blur-xl border border-slate-200/90 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold text-indigo-600 hover:bg-slate-50 cursor-pointer z-20"
        >
          <Tag className="w-4 h-4" />
          <span>Inspect {activeParcel.code}</span>
        </button>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl z-50 flex items-center gap-2 border border-slate-800 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
