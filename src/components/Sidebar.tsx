import React from 'react';
import { CheckCircle2, Play, BookOpen } from 'lucide-react';
import { ModuleData } from '../types';

interface Props {
  modules: ModuleData[];
  selectedModuleId: number;
  onSelectModule: (id: number) => void;
}

export const Sidebar: React.FC<Props> = ({
  modules,
  selectedModuleId,
  onSelectModule,
}) => {
  const completedCount = modules.filter((m) => m.status === 'DONE').length;
  const totalCount = modules.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-6">
      {/* HIGH SCHOOL CURRICULUM PROGRESS CARD */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl text-white">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Curriculum Progress</span>
          </span>
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-black text-xs px-2.5 py-1 rounded-full font-mono">
            {completedCount}/{totalCount} Completed
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          Complete modules to unlock case studies, simulations, and financial calculators.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mt-2">
          <span>HIGH SCHOOL READINESS</span>
          <span className="text-cyan-400 font-mono">{progressPercent}%</span>
        </div>
      </div>

      {/* MODULES NAVIGATION LIST */}
      <div className="space-y-3">
        <div className="text-xs font-black uppercase text-slate-400 tracking-wider px-2">
          10 CORE ADULTING MODULES
        </div>

        {modules.map((mod) => {
          const isSelected = mod.id === selectedModuleId;
          const isDone = mod.status === 'DONE';

          return (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative overflow-hidden group ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
              }`}
            >
              <div
                className={`mt-0.5 p-2 rounded-xl shrink-0 ${
                  isDone
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Play className="w-5 h-5 fill-cyan-400" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                    MODULE {mod.id}
                  </span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      isDone
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-cyan-500 text-slate-950 font-black'
                    }`}
                  >
                    {isDone ? 'COMPLETED' : 'START'}
                  </span>
                </div>

                <h4 className="font-black text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                  {mod.title}
                </h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{mod.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
