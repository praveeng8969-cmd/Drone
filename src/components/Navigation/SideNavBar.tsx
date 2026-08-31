import React from 'react';
import { AppView } from '../../types';
import { 
  LayoutDashboard, 
  FolderGit2, 
  ScanSearch, 
  Cpu, 
  Map as MapIcon, 
  CheckSquare, 
  Settings, 
  HelpCircle, 
  Plus,
  Compass
} from 'lucide-react';

interface SideNavBarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onOpenNewProjectModal: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  currentView,
  onViewChange,
  onOpenNewProjectModal,
  isMobileOpen,
  onCloseMobile
}) => {
  const navItems: { id: AppView; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-5 h-5" /> },
    { id: 'drone-imagery', label: 'Drone Imagery', icon: <ScanSearch className="w-5 h-5" /> },
    { id: 'ai-processing', label: 'AI Processing', icon: <Cpu className="w-5 h-5" /> },
    { id: 'parcel-mapping', label: 'Parcel Mapping', icon: <MapIcon className="w-5 h-5" /> },
    { id: 'validation', label: 'Validation', icon: <CheckSquare className="w-5 h-5" /> },
  ];

  const handleNavClick = (view: AppView) => {
    onViewChange(view);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-white border-r border-slate-200 flex flex-col p-5 z-50 transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6 px-1">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-sm shadow-indigo-600/30">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-slate-800 block leading-tight">
              UrbanCadastra
            </span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
              AI Spatial Core
            </span>
          </div>
        </div>

        {/* Action CTA: New Survey Project */}
        <div className="mb-4">
          <button
            onClick={onOpenNewProjectModal}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Survey Project</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 flex-1 overflow-y-auto custom-scrollbar pr-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'
                }`}
              >
                <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Usage Card */}
        <div className="mt-auto pt-3">
          <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-xl shadow-slate-200/50 mb-3">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                GPU Usage Limit
              </span>
              <span className="text-[10px] text-indigo-400 font-bold">85%</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 w-[85%] h-full rounded-full transition-all"></div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2.5 leading-snug">
              4x NVIDIA A100 active • 12ms inference
            </p>
            <button
              onClick={onOpenNewProjectModal}
              className="w-full mt-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Scale Cluster
            </button>
          </div>

          {/* Quick links */}
          <div className="flex gap-1 border-t border-slate-100 pt-2">
            <button
              onClick={() => handleNavClick('settings')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                currentView === 'settings' ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => handleNavClick('support')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                currentView === 'support' ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Support</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
