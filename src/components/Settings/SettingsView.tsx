import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Download, 
  Sliders, 
  Globe, 
  Database, 
  HelpCircle, 
  Mail, 
  FileText, 
  Save,
  CheckCircle2
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [confidenceThreshold, setConfidenceThreshold] = useState(90);
  const [defaultCrs, setDefaultCrs] = useState('EPSG:32644 (UTM Zone 44N)');
  const [autoTopologyCorrection, setAutoTopologyCorrection] = useState(true);
  const [exportFormat, setExportFormat] = useState('GeoPackage (.gpkg)');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            System Configuration & Cadastral Standards
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure AI inference thresholds, spatial coordinate systems, and automated export pipelines.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? 'Saved Configuration!' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* AI Model Parameters */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>AI Inference Parameters</span>
          </h3>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-bold text-slate-700">
                Auto-Validation Confidence Threshold
              </label>
              <span className="font-mono font-bold text-indigo-600">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="75"
              max="99"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              Parcels detected with confidence above this threshold can be batch-approved directly into the municipal spatial ledger.
            </p>
          </div>

          <div className="pt-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-bold text-slate-700">
                Automated Topology Gap / Overlap Healing
              </span>
              <input
                type="checkbox"
                checked={autoTopologyCorrection}
                onChange={(e) => setAutoTopologyCorrection(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
              />
            </label>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              Automatically snap parcel boundary vertices within a 5cm geodetic tolerance to eliminate micro-slivers.
            </p>
          </div>
        </div>

        {/* GIS Coordinate Systems & Exports */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>Spatial CRS & Export Format</span>
          </h3>

          <div>
            <label className="block font-bold text-slate-700 mb-2">
              Default Coordinate Reference System (CRS)
            </label>
            <select
              value={defaultCrs}
              onChange={(e) => setDefaultCrs(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-mono text-slate-800 outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            >
              <option>EPSG:32644 (UTM Zone 44N - Tamil Nadu Standard)</option>
              <option>EPSG:3857 (WGS 84 / Pseudo-Mercator)</option>
              <option>EPSG:4326 (WGS 84 Geographic 2D)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-2">
              Municipal Data Export Standard
            </label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            >
              <option>GeoPackage (.gpkg) - OGC Compliant</option>
              <option>ESRI Shapefile (.shp / .dbf / .prj)</option>
              <option>GeoJSON FeatureCollection (.geojson)</option>
              <option>AutoCAD Spatial DXF (.dxf)</option>
            </select>
          </div>
        </div>

        {/* Security & Audit Compliance (Spans full width) */}
        <div className="md:col-span-2 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                Government FedRAMP & Digital Cadastre Compliance
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Compliant with National Geospatial Policy & State Cadastral Land Records Data Standards.
              </p>
            </div>
          </div>

          <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 font-bold font-mono text-xs rounded-xl border border-emerald-200/80">
            CERTIFIED COMPLIANT
          </span>
        </div>
      </div>
    </div>
  );
};
