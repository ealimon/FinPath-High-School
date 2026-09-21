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
    <aside className="w-full lg:w-80 shrink-0 space-y-4">
      {/* PROGRESS CARD */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs text-slate-800">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-xs text-slate-700 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>Curriculum Progress</span>
          </span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/70 font-semibold text-xs px-2.5 py-0.5 rounded-full">
            {completedCount}/{totalCount} Completed
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Explore lessons at your own pace to build practical life skills.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* MODULES NAVIGATION LIST */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider px-2">
          Lessons ({modules.length})
        </div>

        {modules.map((mod) => {
          const isSelected = mod.id === selectedModuleId;
          const isDone = mod.status === 'DONE';

          return (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                isSelected
                  ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                  : 'bg-white border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div
                className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
                    Lesson {mod.id}
                  </span>
                  {isDone && (
                    <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Done
                    </span>
                  )}
                </div>

                <h4 className="font-semibold text-xs text-slate-800 truncate">
                  {mod.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{mod.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
