import React from 'react';
import { HelpCircle, BookOpen, FileCheck, PhoneCall, Mail, MessageSquare, ExternalLink } from 'lucide-react';

export const SupportView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
          Cadastral Helpdesk & GIS Documentation
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Guides, RTK GPS field survey checklists, and spatial vectorization tutorials.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Drone Survey Handbook</h3>
            <p className="text-slate-500 leading-relaxed">
              Standard operating procedures for flight height, GCP placement, and 80/70 image overlap calibration.
            </p>
          </div>
          <button 
            onClick={() => alert("Downloading Drone Survey Handbook PDF...")}
            className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1.5 pt-2 cursor-pointer transition-colors"
          >
            <span>Read Guidelines</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">AI Vectorizer Docs</h3>
            <p className="text-slate-500 leading-relaxed">
              Understanding SAM segmentation weights, rooftop edge regularization, and automated topology validation.
            </p>
          </div>
          <button 
            onClick={() => alert("Opening AI Vectorizer Technical Specification...")}
            className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1.5 pt-2 cursor-pointer transition-colors"
          >
            <span>View Architecture</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Municipal Support Desk</h3>
            <p className="text-slate-500 leading-relaxed">
              24/7 technical hotline for registered cadastral officers and municipal survey teams across Tamil Nadu.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-slate-900 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            Toll-Free: 1800-425-SURVEY
          </div>
        </div>
      </div>
    </div>
  );
};
