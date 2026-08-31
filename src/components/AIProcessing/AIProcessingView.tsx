import React, { useState, useRef, useCallback } from 'react';
import { AppView, PipelineStep } from '../../types';
import { IMAGES, MOCK_PIPELINE_STEPS } from '../../data/mockData';
import { 
  Check, 
  Sparkles, 
  Flag, 
  Layers, 
  Maximize2, 
  Plus, 
  Minus, 
  Ruler, 
  CheckCheck, 
  ArrowRight, 
  Activity,
  Sliders,
  Play,
  RotateCcw
} from 'lucide-react';

interface AIProcessingViewProps {
  onViewChange: (view: AppView) => void;
}

export const AIProcessingView: React.FC<AIProcessingViewProps> = ({ onViewChange }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [steps, setSteps] = useState<PipelineStep[]>(MOCK_PIPELINE_STEPS);
  const [acceptedBatch, setAcceptedBatch] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeStepInfo, setActiveStepInfo] = useState<PipelineStep>(MOCK_PIPELINE_STEPS[2]);

  const containerRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    [isDragging]
  );

  const handleAcceptHighConfidence = () => {
    setAcceptedBatch(true);
    showToast("Successfully accepted 17,290 high-confidence (>90%) parcel boundaries and updated cadastral registry.");
  };

  const handleAdvanceStep = () => {
    const activeIdx = steps.findIndex((s) => s.status === 'active');
    if (activeIdx !== -1 && activeIdx < steps.length - 1) {
      const newSteps = [...steps];
      newSteps[activeIdx] = { ...newSteps[activeIdx], status: 'completed' as const, progress: 100 };
      newSteps[activeIdx + 1] = { ...newSteps[activeIdx + 1], status: 'active' as const, progress: 45 };
      setSteps(newSteps);
      setActiveStepInfo(newSteps[activeIdx + 1]);
      showToast(`Advanced AI Pipeline to Step: ${newSteps[activeIdx + 1].name}`);
    }
  };

  const handleResetPipeline = () => {
    setSteps(MOCK_PIPELINE_STEPS);
    setActiveStepInfo(MOCK_PIPELINE_STEPS[2]);
    setAcceptedBatch(false);
    showToast("AI Pipeline reset to baseline checkpoint.");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] space-y-4 animate-in fade-in duration-200 select-none">
      {/* 1. Pipeline Stepper Header Bar */}
      <section className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <h2 className="font-bold text-base md:text-lg text-slate-900">
              Pipeline Status: Sector 4 Alpha (Mylapore North)
            </h2>
            <span className="bg-indigo-50 text-indigo-600 font-mono text-xs px-2.5 py-1 rounded-lg font-bold border border-indigo-100">
              v4.2-Vision
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleAdvanceStep}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Step Next Stage</span>
            </button>
            <button
              onClick={handleResetPipeline}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Reset Pipeline"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stepper Visual Track */}
        <div className="relative px-2 py-1">
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-6 right-6 h-1 bg-slate-100 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-6 h-1 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(2 / 6) * 100}%` }}
          />

          <div className="relative z-10 flex items-center justify-between">
            {steps.map((step) => {
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepInfo(step)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isActive
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20'
                        : 'bg-slate-100 border-2 border-slate-200 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : isActive ? (
                      <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    ) : step.id === 7 ? (
                      <Flag className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <span className="font-mono">{step.id}</span>
                    )}
                  </div>

                  <div className="flex flex-col items-center">
                    <span
                      className={`text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider text-center ${
                        isActive
                          ? 'text-indigo-600'
                          : isCompleted
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.shortName}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-mono font-bold text-indigo-600">
                        {step.progress}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Split Screen Comparison Slider */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="flex-1 relative bg-slate-200 rounded-[28px] overflow-hidden border border-slate-200 shadow-sm cursor-col-resize select-none"
      >
        {/* Right Pane: AI Extraction Cadastral Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${IMAGES.aiExtraction}')` }}
        >
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xl px-3.5 py-1.5 rounded-xl border border-indigo-200 shadow-lg z-10 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              AI Cadastral Extraction
            </span>
          </div>
        </div>

        {/* Left Pane: Original Drone Imagery (Clipped by slider width) */}
        <div
          className="absolute inset-0 overflow-hidden border-r-2 border-indigo-600 shadow-2xl"
          style={{ width: `${sliderPosition}%` }}
        >
          {/* Image inside left pane anchored full size */}
          <div
            className="absolute top-0 left-0 h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${IMAGES.originalDrone}')`,
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw'
            }}
          />

          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xl px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-lg z-10 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Original Drone Orthomosaic
            </span>
          </div>
        </div>

        {/* Slider Handle Divider */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className="absolute top-0 bottom-0 z-30 flex items-center justify-center -ml-4 w-8 cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl border-2 border-white transform active:scale-110 transition-transform">
            <Sliders className="w-4 h-4" />
          </div>
        </div>

        {/* Floating Quick Slider Ratio Pills (Bottom Left) */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-xl p-1 shadow-lg z-20 flex gap-1 text-[11px] font-mono font-bold">
          {[25, 50, 75].map((val) => (
            <button
              key={val}
              onClick={(e) => { e.stopPropagation(); setSliderPosition(val); }}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                Math.round(sliderPosition) === val ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {val}%
            </button>
          ))}
        </div>

        {/* Floating Tool Controls on Right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-1.5 shadow-xl flex flex-col gap-1 z-20">
          <button onClick={() => showToast("Zoomed into high-density quadrant.")} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer">
            <Plus className="w-4 h-4" />
          </button>
          <button onClick={() => showToast("Zoomed out to sector overview.")} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer">
            <Minus className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-100 mx-1" />
          <button onClick={() => showToast("Layer Inspector: Toggled Deep Semantic Mask.")} className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors cursor-pointer">
            <Layers className="w-4 h-4" />
          </button>
          <button onClick={() => showToast("Calibrated Euclidean measuring grid.")} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer">
            <Ruler className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Bottom Detection Summary Panel */}
      <section className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm shrink-0">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          {/* Metrics List */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Parcel Boundaries */}
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">
                DETECTION SUMMARY
              </span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-xs" />
                <span className="text-xs font-semibold text-slate-800">Parcel Boundaries</span>
                <span className="font-bold text-sm sm:text-base text-slate-900 ml-1">
                  18,642
                </span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-7 bg-slate-100" />

            {/* Buildings */}
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5 opacity-0 sm:opacity-100">
                STRUCTURES
              </span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-xs" />
                <span className="text-xs font-semibold text-slate-800">Buildings</span>
                <span className="font-bold text-sm sm:text-base text-slate-900 ml-1">
                  27,315
                </span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-7 bg-slate-100" />

            {/* Average Confidence */}
            <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-100">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  Avg Confidence
                </span>
                <span className="font-bold text-sm sm:text-base text-emerald-700">
                  94.7%
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleAcceptHighConfidence}
              disabled={acceptedBatch}
              className={`flex-1 lg:flex-none px-4 py-2.5 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                acceptedBatch
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-600'
              }`}
            >
              <CheckCheck className="w-4 h-4" />
              <span>{acceptedBatch ? 'Batch Approved (17,290)' : 'Accept All High Confidence'}</span>
            </button>

            <button
              onClick={() => onViewChange('validation')}
              className="flex-1 lg:flex-none px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              <span>Start Validation Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl z-50 flex items-center gap-2 border border-slate-800 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
