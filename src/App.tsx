import React, { useState } from 'react';
import { Header } from './components/Header';
import { TopNav, MainTab } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { ModuleDetail } from './components/ModuleDetail';
import { CalculatorsView } from './components/CalculatorsView';
import { ReadinessTrackerView } from './components/ReadinessTrackerView';
import { WorksheetsView } from './components/WorksheetsView';
import { AITutorModal } from './components/AITutorModal';
import { MODULES_DATA } from './data/modulesData';
import { UserStats, ModuleData } from './types';

export default function App() {
  const [modules, setModules] = useState<ModuleData[]>(MODULES_DATA);
  const [completedModuleIds, setCompletedModuleIds] = useState<number[]>([1, 2]);

  const [userStats, setUserStats] = useState<UserStats>({
    completedModulesCount: 2,
    totalModulesCount: MODULES_DATA.length,
    readinessPercentage: Math.round((2 / MODULES_DATA.length) * 100),
  });

  const [activeMainTab, setActiveMainTab] = useState<MainTab>('modules');
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Completion handler
  const handleCompleteModule = () => {
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } catch (e) {
        // Audio fallback
      }
    }

    if (!completedModuleIds.includes(selectedModuleId)) {
      const updatedCompleted = [...completedModuleIds, selectedModuleId];
      setCompletedModuleIds(updatedCompleted);

      setUserStats({
        completedModulesCount: updatedCompleted.length,
        totalModulesCount: modules.length,
        readinessPercentage: Math.round((updatedCompleted.length / modules.length) * 100),
      });

      setModules((prev) =>
        prev.map((m) => (m.id === selectedModuleId ? { ...m, status: 'DONE' } : m))
      );
    }
  };

  const selectedModule = modules.find((m) => m.id === selectedModuleId) || modules[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased print:bg-white print:text-black print:min-h-0 print:h-auto selection:bg-cyan-500 selection:text-slate-950">
      {/* HEADER BAR */}
      <div className="print:hidden">
        <Header
          userStats={userStats}
          onOpenAiTutor={() => setIsAiTutorOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />
      </div>

      {/* TOP SUB-NAV TABS */}
      <div className="print:hidden">
        <TopNav
          activeTab={activeMainTab}
          onSelectTab={setActiveMainTab}
        />
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 print:p-0 print:m-0 print:max-w-none">
        {/* CURRICULUM MODULES TAB */}
        {activeMainTab === 'modules' && (
          <div className="flex flex-col lg:flex-row gap-8">
            <Sidebar
              modules={modules}
              selectedModuleId={selectedModuleId}
              onSelectModule={(id) => setSelectedModuleId(id)}
            />

            <ModuleDetail
              module={selectedModule}
              onOpenWorksheet={() => setActiveMainTab('worksheets')}
              onCompleteModule={handleCompleteModule}
            />
          </div>
        )}

        {/* FINANCIAL CALCULATORS TAB */}
        {activeMainTab === 'calculators' && (
          <CalculatorsView />
        )}

        {/* CASE STUDIES & WORKSHEETS TAB */}
        {activeMainTab === 'worksheets' && (
          <WorksheetsView modules={modules} selectedModuleId={selectedModuleId} />
        )}

        {/* READINESS SCORECARD TAB */}
        {activeMainTab === 'readiness' && (
          <ReadinessTrackerView
            completedModuleIds={completedModuleIds}
            onNavigateToModule={(id) => {
              setSelectedModuleId(id);
              setActiveMainTab('modules');
            }}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>© 2026 FINPATH HIGH SCHOOL • Personal Finance & Adulting Preparation</div>
          <div className="flex gap-4 font-bold text-slate-400">
            <span>🎓 TAXES & PAYROLL</span>
            <span>💳 CREDIT & BANKING</span>
            <span>📈 ROTH IRA INVESTING</span>
            <span>🚗 AUTO & RENTING</span>
          </div>
        </div>
      </footer>

      {/* FINLEY AI ADVISOR MODAL */}
      <AITutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        currentModule={selectedModule}
      />
    </div>
  );
}
