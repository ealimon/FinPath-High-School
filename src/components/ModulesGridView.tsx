import React from 'react';
import { CheckCircle2, Play, BookOpen, Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { ModuleData } from '../types';

interface Props {
  modules: ModuleData[];
  selectedModuleId: number;
  onSelectModule: (id: number) => void;
}

export const ModulesGridView: React.FC<Props> = ({
  modules,
  selectedModuleId,
  onSelectModule,
}) => {
  const completedCount = modules.filter((m) => m.status === 'DONE').length;
  const totalCount = modules.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Divide modules into two columns of 5:
  // Column 1: Modules 1 to 5
  // Column 2: Modules 6 to 10
  const column1Modules = modules.slice(0, 5);
  const column2Modules = modules.slice(5, 10);

  const getSimulatorLabel = (gameType: string) => {
    switch (gameType) {
      case 'paycheck':
        return 'Paycheck & Tax Deductions Sim';
      case 'banking':
        return 'Paper Check Writer & ATM Sim';
      case 'budget':
        return '50/30/20 Budgeting Planner';
      case 'credit':
        return 'FICO Credit Score Simulator';
      case 'compound':
        return 'Roth IRA & Compound Growth';
      default:
        return 'Interactive Financial Simulator';
    }
  };

  const renderModuleCard = (mod: ModuleData) => {
    const isDone = mod.status === 'DONE';
    const isSelected = mod.id === selectedModuleId;

    return (
      <div
        key={mod.id}
        onClick={() => onSelectModule(mod.id)}
        className={`group text-left p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
          isSelected
            ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10 scale-[1.01]'
            : 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/60 hover:bg-slate-850 hover:shadow-lg hover:shadow-cyan-950/30 hover:scale-[1.01]'
        }`}
      >
        {/* TOP META ROW */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-slate-950 bg-cyan-400 px-2.5 py-0.5 rounded-lg tracking-wider font-mono">
                MODULE {mod.id}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/90 border border-cyan-800/80 px-2 py-0.5 rounded-md">
                {mod.tag}
              </span>
            </div>

            <div className="shrink-0">
              {isDone ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-700/80 px-2.5 py-1 rounded-full shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>COMPLETED</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 px-2.5 py-1 rounded-full">
                  <Play className="w-3 h-3 fill-cyan-400" />
                  <span>AVAILABLE</span>
                </span>
              )}
            </div>
          </div>

          {/* TITLE & SUBTITLE */}
          <h3 className="font-black text-lg text-white group-hover:text-cyan-300 transition-colors leading-snug">
            {mod.title}
          </h3>
          <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mt-1 mb-3">
            {mod.subtitle}
          </p>

          {/* KEY CONCEPTS BULLETS */}
          <div className="space-y-1.5 my-3 pt-3 border-t border-slate-800/80">
            {mod.learningConcepts.slice(0, 2).map((concept, idx) => (
              <div key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                <span className="text-cyan-400 shrink-0 font-bold">•</span>
                <span className="line-clamp-2">{concept}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 truncate">
            🎮 {getSimulatorLabel(mod.gameType)}
          </span>

          <button
            type="button"
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shrink-0 ${
              isDone
                ? 'bg-slate-800 text-slate-200 group-hover:bg-slate-700 group-hover:text-white border border-slate-700'
                : 'bg-cyan-500 group-hover:bg-cyan-400 text-slate-950 shadow-md'
            }`}
          >
            <span>{isDone ? 'Review Module' : 'Open Module'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* CURRICULUM OVERVIEW & PROGRESS HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl text-white relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>HIGH SCHOOL PERSONAL FINANCE & ADULTING CURRICULUM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              10 Core Adulting Modules
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Select any module below to launch its core interactive guide, real-world simulation, and evaluation quiz.
            </p>
          </div>

          {/* PROGRESS SUMMARY BADGE */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 shrink-0 w-full lg:w-auto">
            <div className="p-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Overall Progress</div>
              <div className="text-xl font-black text-white font-mono flex items-center gap-2">
                <span>{completedCount} of {totalCount} Done</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-500/30">
                  {progressPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="pt-5 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Curriculum Mastery Roadmap
            </span>
            <span className="text-cyan-400 font-mono font-bold">{progressPercent}% High School Ready</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
            <div
              className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-700 shadow-sm shadow-cyan-500/50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* TWO COLUMNS OF 5 MODULES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* COLUMN 1: MODULES 1 TO 5 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 px-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center text-xs font-black font-mono">
                1
              </span>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  PART 1: FOUNDATIONS (MODULES 1–5)
                </h3>
                <p className="text-[11px] text-slate-400">Paychecks, Banking, Budgeting, Credit & College</p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">5 Modules</span>
          </div>

          <div className="space-y-4">
            {column1Modules.map(renderModuleCard)}
          </div>
        </div>

        {/* COLUMN 2: MODULES 6 TO 10 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 px-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs font-black font-mono">
                2
              </span>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  PART 2: REAL-WORLD INDEPENDENCE (MODULES 6–10)
                </h3>
                <p className="text-[11px] text-slate-400">Auto, Housing, Investing, Insurance & Defense</p>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">5 Modules</span>
          </div>

          <div className="space-y-4">
            {column2Modules.map(renderModuleCard)}
          </div>
        </div>
      </div>
    </div>
  );
};
