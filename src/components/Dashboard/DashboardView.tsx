import React from 'react';
import { AppView, SurveyProject } from '../../types';
import { MOCK_PROJECTS } from '../../data/mockData';
import { 
  Map, 
  Share2, 
  Building2, 
  Sparkles, 
  TrendingUp, 
  Server, 
  Cpu, 
  HardDrive, 
  Users, 
  FolderOpen, 
  ArrowRight,
  Plus,
  ShieldAlert,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

interface DashboardViewProps {
  onViewChange: (view: AppView) => void;
  onSelectProject: (project: SurveyProject) => void;
  onOpenNewProjectModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onViewChange,
  onSelectProject,
  onOpenNewProjectModal
}) => {
  const handleProjectClick = (project: SurveyProject) => {
    onSelectProject(project);
    if (project.status === 'PROCESSING') {
      onViewChange('ai-processing');
    } else {
      onViewChange('parcel-mapping');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Operations Center
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time cadastral performance, parcel extraction velocity, and municipal GIS nodes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onViewChange('validation')}
            className="px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            Export Audit
          </button>
          <button
            onClick={onOpenNewProjectModal}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Drone Survey</span>
          </button>
        </div>
      </div>

      {/* KPI 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Node Health / Cadastral Accuracy */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.1em] mb-3">
            Cadastral Accuracy
          </p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">99.2%</span>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md font-bold">
              +0.4%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">Ground-truth verified RMS</p>
        </div>

        {/* KPI 2: Parcels Auto-Vectorized */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.1em] mb-3">
            Auto-Vectorized Parcels
          </p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">18.6K</span>
            <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md font-bold">
              +14%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">18,642 polygons generated</p>
        </div>

        {/* KPI 3: Buildings Detected */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.1em] mb-3">
            3D Regularized Footprints
          </p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">27.3K</span>
            <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded-md font-bold">
              Peak
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">27,315 structures modeled</p>
        </div>

        {/* KPI 4: Survey Area Mapped */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.1em] mb-3">
            Area Surveyed
          </p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">42.8 <span className="text-sm font-normal text-slate-500">km²</span></span>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md font-bold">
              4 Zones
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">High-resolution 2.4cm GSD</p>
        </div>
      </div>

      {/* Activity Feed & Detailed Stats Split (Sleek Theme pattern) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: AI Extraction & Network Velocity */}
        <div className="lg:col-span-3 bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col p-6 md:p-8">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-800">Network & Pipeline Velocity</h3>
              <p className="text-xs text-slate-400 mt-0.5">Megapixels vectorized per second across GPU shards</p>
            </div>
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
            </div>
          </div>

          {/* Interactive Bar Chart Visualization */}
          <div className="flex-1 pt-8 pb-4 flex items-end gap-2.5 sm:gap-4 min-h-[180px]">
            <div className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full bg-indigo-50 hover:bg-indigo-100 h-[45px] rounded-t-xl transition-all"></div>
              <span className="text-[10px] font-bold text-slate-400">08:00</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full bg-indigo-100 hover:bg-indigo-200 h-[75px] rounded-t-xl transition-all"></div>
              <span className="text-[10px] font-bold text-slate-400">10:00</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full bg-indigo-200 hover:bg-indigo-300 h-[60px] rounded-t-xl transition-all"></div>
              <span className="text-[10px] font-bold text-slate-400">12:00</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full bg-indigo-400 hover:bg-indigo-500 h-[110px] rounded-t-xl transition-all"></div>
              <span className="text-[10px] font-bold text-slate-400">14:00</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full bg-indigo-600 h-[145px] rounded-t-xl shadow-lg shadow-indigo-600/20 transition-all"></div>
              <span className="text-[10px] font-bold text-indigo-600">Peak</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full bg-indigo-300 hover:bg-indigo-400 h-[90px] rounded-t-xl transition-all"></div>
              <span className="text-[10px] font-bold text-slate-400">18:00</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full bg-indigo-500 h-[130px] rounded-t-xl shadow-md shadow-indigo-600/10 transition-all"></div>
              <span className="text-[10px] font-bold text-slate-400">20:00</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full bg-slate-100 hover:bg-slate-200 h-[70px] rounded-t-xl transition-all"></div>
              <span className="text-[10px] font-bold text-slate-400">22:00</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Throughput: <strong className="text-slate-800">48.2 MP/s</strong></span>
            <button 
              onClick={() => onViewChange('ai-processing')}
              className="text-indigo-600 font-bold hover:underline"
            >
              Open AI Pipeline Studio →
            </button>
          </div>
        </div>

        {/* Right: Threat & Cadastral Anomaly Feed (Sleek Dark Panel) */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[32px] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl shadow-slate-200/50">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Threat & Anomaly Detection</span>
              </h3>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold border border-indigo-500/30">
                LIVE
              </span>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-1.5 h-10 bg-indigo-500 rounded-full shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-slate-100">Anomaly in Parcel URB-CHN-00455</p>
                  <p className="text-xs text-slate-400 mt-0.5">Sliver polygon overlap detected with 94.7% confidence</p>
                  <p className="text-[10px] text-indigo-400 mt-1.5 font-bold uppercase tracking-wider">14:02 PM</p>
                </div>
              </div>

              <div className="flex gap-4 opacity-75">
                <div className="w-1.5 h-10 bg-slate-600 rounded-full shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-slate-100">Cluster Rebalancing Complete</p>
                  <p className="text-xs text-slate-400 mt-0.5">Distributed inference synced on A100-Node-03</p>
                  <p className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-wider">12:30 PM</p>
                </div>
              </div>

              <div className="flex gap-4 opacity-50">
                <div className="w-1.5 h-10 bg-slate-600 rounded-full shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-slate-100">Cadastral Ledger Backup Stored</p>
                  <p className="text-xs text-slate-400 mt-0.5">Verified 4.2TB across 3 municipal zones</p>
                  <p className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-wider">09:15 AM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800">
            <button 
              onClick={() => onViewChange('validation')}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
            >
              View Full Cadastral Queue
            </button>
          </div>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="space-y-4 pt-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Active Municipal Surveys</h3>
            <p className="text-xs text-slate-500">Select any project to inspect cadastral maps or AI pipelines</p>
          </div>
          <button
            onClick={() => onViewChange('projects')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Surveys</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_PROJECTS.slice(0, 3).map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group overflow-hidden flex flex-col"
            >
              {/* Thumbnail with overlay status badge */}
              <div
                className="h-40 w-full bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url('${project.thumbnailUrl}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent group-hover:scale-105 transition-transform duration-500" />
                
                {/* Status Badge */}
                <span
                  className={`absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm uppercase tracking-wider ${
                    project.status === 'PROCESSING'
                      ? 'bg-indigo-600 text-white'
                      : project.status === 'COMPLETED'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-white'
                  }`}
                >
                  {project.status}
                </span>

                <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold">
                  {project.gsdResolution}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{project.zone}</p>
                </div>

                <div className="flex justify-between items-center mt-5 pt-3.5 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">AREA</div>
                    <div className="font-bold text-xs text-slate-800 mt-0.5">{project.areaKm2} km²</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">PARCELS</div>
                    <div className="font-bold text-xs text-slate-800 mt-0.5">{project.parcelsCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">ACCURACY</div>
                    <div className="font-bold text-xs text-indigo-600 mt-0.5">{project.accuracy}%</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
