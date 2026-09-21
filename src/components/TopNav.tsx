import React from 'react';
import { BookOpen, Calculator, FileText, ShieldCheck } from 'lucide-react';
import { MainTab } from '../types';

export type { MainTab };

interface Props {
  activeTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
}

export const TopNav: React.FC<Props> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-2.5 px-4 sticky top-[61px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start gap-2 overflow-x-auto">
        <button
          onClick={() => onSelectTab('modules')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
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
          className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
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
          className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
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
          className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'readiness'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>My Progress</span>
        </button>
      </div>
    </nav>
  );
};
