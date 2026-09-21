import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainTab } from './components/TopNav';
import { ModulesGridView } from './components/ModulesGridView';
import { ModuleDetail } from './components/ModuleDetail';
import { CalculatorsView } from './components/CalculatorsView';
import { ReadinessTrackerView } from './components/ReadinessTrackerView';
import { WorksheetsView } from './components/WorksheetsView';
import { AITutorModal } from './components/AITutorModal';
import { MODULES_DATA } from './data/modulesData';
import { UserStats, ModuleData } from './types';
import { Sparkles, MessageCircle } from 'lucide-react';

export default function App() {
  const [modules, setModules] = useState<ModuleData[]>(MODULES_DATA);
  const [completedModuleIds, setCompletedModuleIds] = useState<number[]>([1, 2]);

  const [userStats, setUserStats] = useState<UserStats>({
    completedModulesCount: 2,
    totalModulesCount: MODULES_DATA.length,
    readinessPercentage: Math.round((2 / MODULES_DATA.length) * 100),
  });

  const [activeMainTab, setActiveMainTab] = useState<MainTab>('modules');
  const [moduleViewMode, setModuleViewMode] = useState<'grid' | 'detail'>('grid');
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleSelectTab = (tab: MainTab) => {
    if (tab === 'modules' && activeMainTab === 'modules' && moduleViewMode === 'detail') {
      // If clicking curriculum modules while in detail, return to overview
      setModuleViewMode('grid');
    }
    setActiveMainTab(tab);
  };

  const handleSelectModuleFromGrid = (id: number) => {
    setSelectedModuleId(id);
    setModuleViewMode('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans antialiased print:bg-white print:text-black print:min-h-0 print:h-auto selection:bg-emerald-100 selection:text-emerald-900">
      {/* UNIFIED CALM HEADER BAR */}
      <div className="print:hidden">
        <Header
          userStats={userStats}
          activeTab={activeMainTab}
          onSelectTab={handleSelectTab}
          onOpenAiTutor={() => setIsAiTutorOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 print:p-0 print:m-0 print:max-w-none">
        {/* CURRICULUM MODULES TAB */}
        {activeMainTab === 'modules' && (
          <div>
            {moduleViewMode === 'grid' ? (
              <ModulesGridView
                modules={modules}
                selectedModuleId={selectedModuleId}
                onSelectModule={handleSelectModuleFromGrid}
              />
            ) : (
              <ModuleDetail
                module={selectedModule}
                onOpenWorksheet={() => setActiveMainTab('worksheets')}
                onCompleteModule={handleCompleteModule}
                onBackToModules={() => setModuleViewMode('grid')}
                onSelectModule={(id) => setSelectedModuleId(id)}
                totalModules={modules.length}
              />
            )}
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
              setModuleViewMode('detail');
            }}
          />
        )}
      </main>

      {/* GENTLE, FLOATING AI HELPER (FINLEY) */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          onClick={() => setIsAiTutorOpen(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-4 py-3 rounded-full shadow-lg shadow-emerald-900/10 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer border border-emerald-600/30"
          title="Ask Finley a financial question"
        >
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span className="text-sm font-semibold">Ask Finley</span>
          <MessageCircle className="w-4 h-4 text-emerald-200" />
        </button>
      </div>

      {/* GENTLE FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>FinPath • High School Personal Finance & Life Skills Preparation</div>
          <div className="flex gap-4 font-medium text-slate-500">
            <span>Taxes & Paychecks</span>
            <span>•</span>
            <span>Credit & Banking</span>
            <span>•</span>
            <span>Investing</span>
            <span>•</span>
            <span>Living On Your Own</span>
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
