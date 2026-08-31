import React, { useState } from 'react';
import { SurveyProject } from '../../types';
import { X, Plus, Sparkles, MapPin, Plane, Compass, Layers } from 'lucide-react';
import { IMAGES } from '../../data/mockData';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: SurveyProject) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject
}) => {
  const [name, setName] = useState('Tiruchirappalli Central Survey');
  const [zone, setZone] = useState('Zone 02 - Rockfort Heritage Precinct');
  const [areaKm2, setAreaKm2] = useState('14.6');
  const [droneModel, setDroneModel] = useState('DJI Matrice 350 RTK + Zenmuse P1');
  const [gsdResolution, setGsdResolution] = useState('2.0 cm/px');
  const [crs, setCrs] = useState('EPSG:32644 (UTM 44N)');
  const [aiPreset, setAiPreset] = useState('Urban High-Density Vectorizer (v4.2)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: SurveyProject = {
      id: `proj-${Date.now()}`,
      name,
      zone,
      status: 'PROCESSING',
      areaKm2: parseFloat(areaKm2) || 12.0,
      parcelsCount: 3820,
      buildingsCount: 5410,
      accuracy: 95.2,
      createdAt: '2026-08-30',
      lastSurveyDate: 'Just now',
      thumbnailUrl: IMAGES.coimbatoreThumb,
      originalDroneUrl: IMAGES.originalDrone,
      aiExtractionUrl: IMAGES.aiExtraction,
      operator: 'K. Rajagopal (Sr. GIS Officer)',
      droneModel,
      gsdResolution
    };

    onCreateProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto custom-scrollbar">
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4.5 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Initialize Survey Project</h3>
              <p className="text-xs text-slate-500">Configure drone telemetry and cadastral model parameters</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto custom-scrollbar flex-1">
          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Project Title
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-slate-900 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Municipal Zone
              </label>
              <input
                type="text"
                required
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Estimated Area (km²)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={areaKm2}
                onChange={(e) => setAreaKm2(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Drone Hardware
              </label>
              <select
                value={droneModel}
                onChange={(e) => setDroneModel(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50/50 focus:bg-white outline-none transition-all text-slate-900"
              >
                <option>DJI Matrice 350 RTK + Zenmuse P1</option>
                <option>WingtraOne GEN II (Sony RX1R II)</option>
                <option>SenseFly eBee X Real-Time RTK</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Target GSD Resolution
              </label>
              <select
                value={gsdResolution}
                onChange={(e) => setGsdResolution(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono bg-slate-50/50 focus:bg-white outline-none transition-all text-slate-900"
              >
                <option>1.5 cm/px (Ultra High Precision)</option>
                <option>2.0 cm/px (Standard Cadastral)</option>
                <option>3.5 cm/px (Regional Overview)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Spatial CRS
              </label>
              <select
                value={crs}
                onChange={(e) => setCrs(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono bg-slate-50/50 focus:bg-white outline-none transition-all text-slate-900"
              >
                <option>EPSG:32644 (UTM 44N)</option>
                <option>EPSG:3857 (Web Mercator)</option>
                <option>EPSG:4326 (WGS 84)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                AI Segmentation Model
              </label>
              <select
                value={aiPreset}
                onChange={(e) => setAiPreset(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50/50 focus:bg-white outline-none font-bold text-indigo-600"
              >
                <option>Urban High-Density Vectorizer (v4.2)</option>
                <option>Suburban Agricultural Parcel (v3.8)</option>
                <option>Dense Coastal Settlement Delineator</option>
              </select>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-5 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Deploy Survey & Run AI</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
