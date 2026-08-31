/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppView, Parcel, SurveyProject } from './types';
import { MOCK_PROJECTS, MOCK_PARCELS } from './data/mockData';
import { SideNavBar } from './components/Navigation/SideNavBar';
import { TopNavBar } from './components/Navigation/TopNavBar';
import { LoginScreen } from './components/Auth/LoginScreen';
import { DashboardView } from './components/Dashboard/DashboardView';
import { GisMapWorkspace } from './components/MapWorkspace/GisMapWorkspace';
import { AIProcessingView } from './components/AIProcessing/AIProcessingView';
import { ProjectsView } from './components/Projects/ProjectsView';
import { DroneImageryView } from './components/DroneImagery/DroneImageryView';
import { ValidationView } from './components/Validation/ValidationView';
import { SettingsView } from './components/Settings/SettingsView';
import { SupportView } from './components/Support/SupportView';
import { NewProjectModal } from './components/Modals/NewProjectModal';
import { TelemetryModal } from './components/Modals/TelemetryModal';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedProject, setSelectedProject] = useState<SurveyProject>(MOCK_PROJECTS[0]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel>(MOCK_PARCELS[0]);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [isTelemetryModalOpen, setIsTelemetryModalOpen] = useState<boolean>(false);
  const [projectsList, setProjectsList] = useState<SurveyProject[]>(MOCK_PROJECTS);

  // If user is not signed in, show the authentication screen (with toggle for Gov and Designer UI)
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const handleCreateProject = (newProj: SurveyProject) => {
    setProjectsList([newProj, ...projectsList]);
    setSelectedProject(newProj);
    setCurrentView('ai-processing');
  };

  const handleSelectProject = (project: SurveyProject) => {
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* Side Navigation Bar */}
      <SideNavBar
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="md:pl-[260px] flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <TopNavBar
          currentView={currentView}
          onViewChange={setCurrentView}
          selectedProjectName={selectedProject.name}
          selectedZoneName={selectedProject.zone}
          onOpenMobileMenu={() => setIsMobileNavOpen(true)}
          onOpenTelemetry={() => setIsTelemetryModalOpen(true)}
          onLogout={() => setIsAuthenticated(false)}
        />

        {/* Dynamic Main Workspace Router */}
        <main className="flex-1 mt-[76px] p-6 md:p-8 overflow-y-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              onViewChange={setCurrentView}
              onSelectProject={handleSelectProject}
              onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
            />
          )}

          {currentView === 'parcel-mapping' && (
            <GisMapWorkspace
              selectedParcel={selectedParcel}
              onParcelSelect={setSelectedParcel}
            />
          )}

          {currentView === 'ai-processing' && (
            <AIProcessingView onViewChange={setCurrentView} />
          )}

          {currentView === 'projects' && (
            <ProjectsView
              onViewChange={setCurrentView}
              onSelectProject={handleSelectProject}
              onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
            />
          )}

          {currentView === 'drone-imagery' && (
            <DroneImageryView />
          )}

          {currentView === 'validation' && (
            <ValidationView />
          )}

          {currentView === 'settings' && (
            <SettingsView />
          )}

          {currentView === 'support' && (
            <SupportView />
          )}
        </main>
      </div>

      {/* Modals */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />

      <TelemetryModal
        isOpen={isTelemetryModalOpen}
        onClose={() => setIsTelemetryModalOpen(false)}
      />
    </div>
  );
}
