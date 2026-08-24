import React from 'react';
import { BookOpen, Calculator, FileText, ShieldCheck } from 'lucide-react';

export type MainTab = 'modules' | 'calculators' | 'worksheets' | 'readiness';

interface Props {
  activeTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
}

export const TopNav: React.FC<Props> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-2.5 px-4 sticky top-[61px] z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start gap-2 sm:gap-3 overflow-x-auto">
        <button
          onClick={() => onSelectTab('modules')}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'modules'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-102'
              : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>CURRICULUM MODULES</span>
        </button>

        <button
          onClick={() => onSelectTab('calculators')}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'calculators'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-102'
              : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>FINANCIAL CALCULATORS</span>
        </button>

        <button
          onClick={() => onSelectTab('worksheets')}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'worksheets'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-102'
              : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>CASE STUDIES & WORKSHEETS</span>
        </button>

        <button
          onClick={() => onSelectTab('readiness')}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'readiness'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-102'
              : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>READINESS SCORECARD</span>
        </button>
      </div>
    </nav>
  );
};
