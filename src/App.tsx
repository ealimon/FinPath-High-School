import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MainTab } from './components/TopNav';
import { ModulesGridView } from './components/ModulesGridView';
import { ModuleDetail } from './components/ModuleDetail';
import { CalculatorsView } from './components/CalculatorsView';
import { ReadinessTrackerView } from './components/ReadinessTrackerView';
import { WorksheetsView } from './components/WorksheetsView';
import { MODULES_DATA } from './data/modulesData';
import { UserStats, ModuleData } from './types';
import { RotateCcw, AlertTriangle } from 'lucide-react';

const STORAGE_KEY = 'finpath_completed_modules';

export default function App() {
  const [completedModuleIds, setCompletedModuleIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [modules, setModules] = useState<ModuleData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const completed: number[] = saved ? JSON.parse(saved) : [];
      return MODULES_DATA.map((m) => ({
        ...m,
        status: completed.includes(m.id) ? 'DONE' : 'AVAILABLE',
      }));
    } catch {
      return MODULES_DATA.map((m) => ({ ...m, status: 'AVAILABLE' }));
    }
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const completed: number[] = saved ? JSON.parse(saved) : [];
      return {
        completedModulesCount: completed.length,
        totalModulesCount: MODULES_DATA.length,
        readinessPercentage: Math.round((completed.length / MODULES_DATA.length) * 100),
      };
    } catch {
      return {
        completedModulesCount: 0,
        totalModulesCount: MODULES_DATA.length,
        readinessPercentage: 0,
      };
    }
  });

  const [activeMainTab, setActiveMainTab] = useState<MainTab>('modules');
  const [moduleViewMode, setModuleViewMode] = useState<'grid' | 'detail'>('grid');
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedModuleIds));
    } catch {
      // Ignore storage write errors
    }
  }, [completedModuleIds]);

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

  // Reset all progress
  const handleResetProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setCompletedModuleIds([]);
    setModules(MODULES_DATA.map((m) => ({ ...m, status: 'AVAILABLE' })));
    setUserStats({
      completedModulesCount: 0,
      totalModulesCount: MODULES_DATA.length,
      readinessPercentage: 0,
    });
    setShowResetConfirm(false);
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

      {/* GENTLE FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>FinPath • High School Personal Finance & Life Skills Preparation</div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-3 font-medium text-slate-500">
              <span>Taxes & Paychecks</span>
              <span>•</span>
              <span>Credit & Banking</span>
              <span>•</span>
              <span>Investing</span>
              <span>•</span>
              <span>Living On Your Own</span>
            </div>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-rose-600 transition-colors py-1 px-2 rounded-md hover:bg-rose-50 cursor-pointer text-xs"
              title="Reset all lesson progress back to 0%"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progress</span>
            </button>
          </div>
        </div>
      </footer>

      {/* RESET CONFIRMATION DIALOG */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-800">Reset All Progress?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                This will clear all completed lesson marks and reset your readiness score back to 0%. This cannot be undone.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetProgress}
                className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white transition-colors cursor-pointer shadow-xs"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
