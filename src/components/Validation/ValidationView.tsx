import React, { useState } from 'react';
import { ValidationItem } from '../../types';
import { MOCK_VALIDATION_ITEMS } from '../../data/mockData';
import { 
  CheckSquare, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Layers, 
  Sparkles, 
  CheckCheck, 
  Filter, 
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';

export const ValidationView: React.FC = () => {
  const [queue, setQueue] = useState<ValidationItem[]>(MOCK_VALIDATION_ITEMS);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [selectedItem, setSelectedItem] = useState<ValidationItem>(MOCK_VALIDATION_ITEMS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredQueue = queue.filter((item) => {
    if (filterType === 'ALL') return true;
    return item.issueType === filterType;
  });

  const handleApprove = (id: string) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'resolved' as const } : item))
    );
    showToast(`Validation item ${id} approved and resolved.`);
  };

  const handleReject = (id: string) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected' as const } : item))
    );
    showToast(`Validation item ${id} flagged as rejected.`);
  };

  const handleBatchApprove = () => {
    setQueue((prev) =>
      prev.map((item) => ({ ...item, status: 'resolved' as const }))
    );
    showToast("Batch approved all valid cadastral records.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Cadastral Validation & QA Queue
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review topology anomalies, setback non-compliances, and verify vector boundaries for official municipal registration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBatchApprove}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Batch Approve Clean Records</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Queue on Left, Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Validation Queue List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-[24px] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          {/* Queue Filter Bar */}
          <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Issue Filter:</span>
            </div>

            <div className="flex flex-wrap gap-1.5 text-xs">
              {['ALL', 'BOUNDARY_CONFLICT', 'SLIVER_POLYGON', 'SETBACK_VIOLATION'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    filterType === type
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {type.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Queue Items List */}
          <div className="divide-y divide-slate-100 max-h-[560px] overflow-y-auto custom-scrollbar">
            {filteredQueue.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 sm:p-5 transition-colors cursor-pointer ${
                    isSelected ? 'bg-indigo-50/50 border-l-4 border-indigo-600' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-900">
                          {item.parcelCode}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                            item.severity === 'HIGH'
                              ? 'bg-rose-50 text-rose-700 border border-rose-100'
                              : item.severity === 'MEDIUM'
                              ? 'bg-amber-50 text-amber-700 border border-amber-100'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.severity} SEVERITY
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.issueType.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                      <div className="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Suggestion: {item.aiSuggestion}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase ${
                          item.status === 'RESOLVED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : item.status === 'REJECTED'
                            ? 'bg-rose-50 text-rose-700 border border-rose-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Anomaly Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  DISPUTE INSPECTION
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-0.5">
                  {selectedItem.parcelCode} Cadastral Anomaly
                </h3>
              </div>
              <span className="text-xs font-mono text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                Zone 04 Mylapore
              </span>
            </div>

            {/* Geometric Anomaly Visual Schema */}
            <div className="h-44 bg-slate-950 rounded-2xl my-4 relative overflow-hidden flex items-center justify-center border border-slate-800">
              <svg className="w-full h-full" viewBox="0 0 300 160">
                {/* Adjacent Parcel A */}
                <polygon points="30,30 140,25 120,130 20,120" fill="rgba(99, 102, 241, 0.25)" stroke="#6366F1" strokeWidth="2" />
                <text x="75" y="80" fill="#C7D2FE" fontSize="10" fontWeight="bold">URB-CHN-00451</text>

                {/* Inspected Parcel B (with overlap or sliver highlight) */}
                <polygon points="125,25 260,35 245,135 115,130" fill="rgba(239, 68, 68, 0.35)" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3" />
                <text x="180" y="80" fill="#FCA5A5" fontSize="10" fontWeight="bold">{selectedItem.parcelCode}</text>

                {/* Overlap Anomaly Flare */}
                <polygon points="120,25 125,25 120,130 115,130" fill="#F59E0B" opacity="0.8" />
                <circle cx="120" cy="77" r="14" fill="none" stroke="#F59E0B" strokeWidth="2" className="animate-ping" />
              </svg>

              <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                Geometric Topology Overlap: 0.12 m²
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase block">ISSUE SUMMARY</span>
                <p className="text-slate-700 mt-1">{selectedItem.description}</p>
              </div>

              <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100">
                <span className="text-[10px] font-black text-indigo-700 uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  AUTOMATED CORRECTION RECOMMENDATION
                </span>
                <p className="text-slate-900 font-medium mt-1">{selectedItem.aiSuggestion}</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => handleApprove(selectedItem.id)}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply AI Topology Fix & Commit</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleReject(selectedItem.id)}
                className="flex-1 py-2.5 px-3 border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Mark for Field Survey</span>
              </button>

              <button
                onClick={() => showToast("Opened spatial vertex fine-adjustment tool.")}
                className="flex-1 py-2.5 px-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <span>Manual Vertex Fix</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl z-50 flex items-center gap-2 border border-slate-800 animate-in fade-in slide-in-from-top-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
