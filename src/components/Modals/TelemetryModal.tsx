import React from 'react';
import { X, Zap, Cpu, Server, Activity, Radio, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface TelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelemetryModal: React.FC<TelemetryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto custom-scrollbar">
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4.5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">AI Engine & Compute Telemetry</h3>
              <p className="text-xs text-indigo-200">GPU Accelerated TensorRT Inference Cluster</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs overflow-y-auto custom-scrollbar flex-1">
          {/* Top Real-time Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">INFERENCE LATENCY</span>
              <span className="font-mono text-xl font-black text-emerald-600">12.4 ms</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">per 1024x1024 tile</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">THROUGHPUT</span>
              <span className="font-mono text-xl font-black text-indigo-600">48.2 MP/s</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Megapixels/sec</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">ACTIVE SHARDS</span>
              <span className="font-mono text-xl font-black text-slate-900">4x A100</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">320 GB VRAM</span>
            </div>
          </div>

          {/* Model Weights and Pipeline Stages */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2.5">
            <span className="font-black text-xs text-slate-900 uppercase tracking-wider block">
              Active Neural Models
            </span>
            <div className="space-y-2 font-mono text-[11px] text-slate-600">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span>1. SAM-Cadastre-ViT-Huge (Boundary Delineation)</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Loaded (FP16)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span>2. Mask2Former-Building-Regularizer (Rooftop Extrusion)</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Loaded (INT8)</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>3. Topology-Graph-Neural-Net (Sliver & Overlap Triage)</span>
                <span className="text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Active</span>
              </div>
            </div>
          </div>

          {/* RTK Base Station Network */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-black text-xs text-slate-900 uppercase tracking-wider">
                CORS RTK Base Station Link
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> Connected
              </span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>Base ID: TN-CHN-MUNICIPAL-01</span>
              <span className="font-mono font-bold text-slate-700">Carrier Phase RMS: 0.4mm</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> All AI inferences authenticated & logged in immutable audit trail
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};
