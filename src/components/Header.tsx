import React from 'react';
import { GraduationCap, Volume2, VolumeX, CheckCircle2, BookOpen, Calculator, FileText, ShieldCheck, Sparkles } from 'lucide-react';
import { UserStats } from '../types';
import { MainTab } from './TopNav';

interface Props {
  userStats: UserStats;
  activeTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  onOpenAiTutor: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<Props> = ({
  userStats,
  activeTab,
  onSelectTab,
  onOpenAiTutor,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* LOGO & BRANDING */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={() => onSelectTab('modules')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100/90 text-emerald-800 flex items-center justify-center border border-emerald-200/80 transition-transform group-hover:scale-105">
              <GraduationCap className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-800 tracking-tight">FinPath</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  High School
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal">Personal Finance & Life Prep</p>
            </div>
          </button>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleSound}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>

        {/* CALM, FRIENDLY NAVIGATION TABS */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full py-1">
          <button
            onClick={() => onSelectTab('modules')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'modules'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lessons</span>
          </button>

          <button
            onClick={() => onSelectTab('calculators')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'calculators'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Calculators</span>
          </button>

          <button
            onClick={() => onSelectTab('worksheets')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'worksheets'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Worksheets</span>
          </button>

          <button
            onClick={() => onSelectTab('readiness')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'readiness'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>My Progress</span>
          </button>
        </nav>

        {/* RIGHT CONTROLS: PROGRESS & SOUND */}
        <div className="hidden md:flex items-center gap-3">
          {/* Subtle Progress Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-600 font-medium">
              <strong className="text-slate-800">{userStats.completedModulesCount}</strong> of {userStats.totalModulesCount} completed
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-700" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>

      </div>
    </header>
  );
};

