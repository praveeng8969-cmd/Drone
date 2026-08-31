import React, { useState } from 'react';
import { AppView } from '../../types';
import { IMAGES } from '../../data/mockData';
import { 
  Zap, 
  Bell, 
  Settings as SettingsIcon, 
  Activity, 
  ChevronRight, 
  Menu,
  CheckCircle2,
  LogOut,
  User,
  ShieldCheck
} from 'lucide-react';

interface TopNavBarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  selectedProjectName?: string;
  selectedZoneName?: string;
  onOpenMobileMenu?: () => void;
  onOpenTelemetry?: () => void;
  onLogout?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentView,
  onViewChange,
  selectedProjectName = 'Chennai Urban Survey',
  selectedZoneName = 'Zone 04',
  onOpenMobileMenu,
  onOpenTelemetry,
  onLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'AI Extraction Complete', desc: 'Sector 4 Alpha parcel boundaries vectorized with 94.7% confidence', time: '10m ago', unread: true },
    { id: 2, title: 'Cadastral Anomaly Flagged', desc: 'Boundary overlap detected on parcel URB-CHN-00455', time: '45m ago', unread: true },
    { id: 3, title: 'Drone Orthomosaic Ingested', desc: 'Flight mission #204 - Mylapore North (GSD 2.4cm/px)', time: '2h ago', unread: false }
  ];

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[260px] h-[76px] bg-white border-b border-slate-200 shadow-xs z-30 flex items-center justify-between px-6 md:px-8">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-64 md:w-80 hidden sm:block">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input 
            type="text" 
            className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-xs md:text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 font-medium transition-all" 
            placeholder="Global parcel & flight search..."
          />
        </div>

        {/* Breadcrumb pills */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-500">
          <span 
            onClick={() => onViewChange('dashboard')}
            className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors"
          >
            UrbanCadastra
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => onViewChange('projects')}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Projects
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 font-semibold truncate max-w-[160px]">
            {selectedProjectName}
          </span>
        </div>
      </div>

      {/* Right: AI Engine Status & Quick Actions */}
      <div className="flex items-center gap-4 md:gap-5">
        {/* AI Online Live Badge */}
        <button
          onClick={onOpenTelemetry}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100/70 text-xs font-bold transition-all cursor-pointer shadow-xs"
          title="Click to view AI Engine Telemetry & GPU inference metrics"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <Zap className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" />
          <span className="hidden sm:inline">AI Engine: Online</span>
        </button>

        {/* Action Icons */}
        <div className="flex items-center gap-1.5">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></div>
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 z-50 p-4 animate-in fade-in zoom-in-95">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-sm text-slate-900">System Alerts & Logs</h4>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">2 New</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto custom-scrollbar">
                  {notifications.map((n) => (
                    <div key={n.id} className={`py-3 ${n.unread ? 'bg-slate-50' : ''} px-2 rounded-xl`}>
                      <div className="flex items-start gap-2.5">
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-900">{n.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block font-mono font-medium">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2.5 border-t border-slate-100 text-center">
                  <button 
                    onClick={() => { setShowNotifications(false); onViewChange('validation'); }}
                    className="text-xs text-indigo-600 font-bold hover:underline"
                  >
                    View Cadastral Validation Queue →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sensor Telemetry */}
          <button
            onClick={onOpenTelemetry}
            className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
            title="Sensor Telemetry & RTK GPS"
          >
            <Activity className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

        {/* User Profile Badge */}
        <div className="relative">
          <div 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                Julian Pierce
              </p>
              <p className="text-[10px] text-slate-500 font-medium">Chief Operations Officer</p>
            </div>
            <img
              src={IMAGES.avatar1}
              alt="Julian Pierce"
              className="w-10 h-10 bg-slate-200 rounded-full border-2 border-slate-50 shadow-sm object-cover"
            />
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 z-50 p-3 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl mb-2">
                <img src={IMAGES.avatar1} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Julian Pierce</p>
                  <p className="text-[10px] text-slate-500">Chief Operations Officer</p>
                  <span className="inline-flex items-center gap-1 text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded mt-1">
                    <ShieldCheck className="w-3 h-3" /> FedRAMP Clear
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <button 
                  onClick={() => { setShowUserMenu(false); onViewChange('settings'); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 font-medium rounded-xl text-left transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" /> Account & Security
                </button>
                <button 
                  onClick={() => { setShowUserMenu(false); if (onLogout) onLogout(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 font-semibold rounded-xl text-left transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-500" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
