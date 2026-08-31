import React, { useState } from 'react';
import { AppView, SurveyProject } from '../../types';
import { MOCK_PROJECTS } from '../../data/mockData';
import { 
  FolderGit2, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  User, 
  Layers, 
  ArrowUpRight, 
  Sparkles,
  MapPin,
  CheckCircle2,
  Clock,
  LayoutGrid,
  List
} from 'lucide-react';

interface ProjectsViewProps {
  onViewChange: (view: AppView) => void;
  onSelectProject: (project: SurveyProject) => void;
  onOpenNewProjectModal: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onViewChange,
  onSelectProject,
  onOpenNewProjectModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PROCESSING' | 'COMPLETED' | 'VALIDATION'>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.operator.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenProject = (project: SurveyProject, target: 'map' | 'ai') => {
    onSelectProject(project);
    if (target === 'ai' || project.status === 'PROCESSING') {
      onViewChange('ai-processing');
    } else {
      onViewChange('parcel-mapping');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Municipal Survey Projects
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage drone orthomosaic flights, cadastral AI pipelines, and zone boundaries.
          </p>
        </div>

        <button
          onClick={onOpenNewProjectModal}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Survey Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by zone, project, officer..."
            className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] mr-1">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          {(['ALL', 'PROCESSING', 'COMPLETED', 'VALIDATION'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}

          {/* View Mode Toggle */}
          <div className="border-l border-slate-200 pl-2 ml-1 flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${viewMode === 'table' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between"
            >
              {/* Header image banner */}
              <div
                className="h-44 w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url('${project.thumbnailUrl}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent" />

                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm uppercase tracking-wider ${
                    project.status === 'PROCESSING'
                      ? 'bg-indigo-600 text-white'
                      : project.status === 'COMPLETED'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {project.status}
                </span>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-bold text-base leading-tight truncate drop-shadow-xs">{project.name}</h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-indigo-400" />
                    <span className="truncate">{project.zone}</span>
                  </p>
                </div>
              </div>

              {/* Body specifications */}
              <div className="p-5 space-y-4 text-xs flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase block">AREA</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{project.areaKm2} km²</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase block">PARCELS</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{project.parcelsCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase block">ACCURACY</span>
                    <span className="text-xs font-bold text-indigo-600 mt-0.5 block">{project.accuracy}%</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Drone Hardware:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[170px]">{project.droneModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">GSD Ortho:</span>
                    <span className="font-bold text-indigo-600">{project.gsdResolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lead Officer:</span>
                    <span className="text-slate-800 font-medium">{project.operator}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => handleOpenProject(project, 'map')}
                    className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>GIS Map</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenProject(project, 'ai')}
                    className="py-2.5 px-3.5 border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-600 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Open AI Vectorizer Pipeline"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pipeline</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase text-[10px] font-black tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Project Name & Zone</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Area (km²)</th>
                  <th className="py-3.5 px-4">Parcels</th>
                  <th className="py-3.5 px-4">AI Accuracy</th>
                  <th className="py-3.5 px-4">GSD</th>
                  <th className="py-3.5 px-4">Survey Officer</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{p.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{p.zone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                        p.status === 'PROCESSING' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : p.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold">{p.areaKm2}</td>
                    <td className="py-3.5 px-4 font-bold">{p.parcelsCount}</td>
                    <td className="py-3.5 px-4 font-bold text-indigo-600">{p.accuracy}%</td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">{p.gsdResolution}</td>
                    <td className="py-3.5 px-4 text-slate-600">{p.operator}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenProject(p, 'map')}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
