import React, { useState } from 'react';
import { CheckCircle2, Play, BookOpen, ArrowRight } from 'lucide-react';
import { ModuleData } from '../types';

interface Props {
  modules: ModuleData[];
  selectedModuleId: number;
  onSelectModule: (id: number) => void;
}

type FilterCategory = 'all' | 'foundations' | 'real-world' | 'completed';

export const ModulesGridView: React.FC<Props> = ({
  modules,
  selectedModuleId,
  onSelectModule,
}) => {
  const [filter, setFilter] = useState<FilterCategory>('all');

  const completedCount = modules.filter((m) => m.status === 'DONE').length;
  const totalCount = modules.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Filter modules based on user choice
  const filteredModules = modules.filter((m) => {
    if (filter === 'foundations') return m.id <= 5;
    if (filter === 'real-world') return m.id > 5;
    if (filter === 'completed') return m.status === 'DONE';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* CURRICULUM OVERVIEW HEADER */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Financial Literacy Curriculum</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore practical life skills modules at your own comfortable pace.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-xl w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Curriculum Progress</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 font-mono">{completedCount} of {totalCount} Completed</div>
            </div>
          </div>
          <div className="w-24 sm:w-32 bg-slate-200 rounded-full h-2 overflow-hidden ml-2">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-emerald-800 font-mono">{progressPercent}%</span>
        </div>
      </div>

      {/* FILTER TABS (REDUCES OVERWHELM) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">All Curriculum Topics</h3>
          <p className="text-xs text-slate-500">Pick any lesson to explore at your own comfortable pace.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 self-stretch sm:self-auto overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            All (10)
          </button>
          <button
            onClick={() => setFilter('foundations')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'foundations'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Foundations (1–5)
          </button>
          <button
            onClick={() => setFilter('real-world')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'real-world'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Life Skills (6–10)
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'completed'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>
      </div>

      {/* CLEAN, SCANNABLE LESSON GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredModules.map((mod) => {
          const isDone = mod.status === 'DONE';
          const isSelected = mod.id === selectedModuleId;

          return (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`text-left p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between bg-white ${
                isSelected
                  ? 'border-emerald-500 shadow-md ring-1 ring-emerald-400/30'
                  : 'border-slate-200/90 hover:border-emerald-300 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                      Lesson {mod.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {mod.tag}
                    </span>
                  </div>

                  {isDone ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Play className="w-3 h-3 text-slate-400" />
                      <span>Ready to start</span>
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h4 className="font-bold text-base text-slate-800 group-hover:text-emerald-700 transition-colors">
                  {mod.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  {mod.subtitle}
                </p>

                {/* Key Concepts */}
                <div className="space-y-1.5 py-2.5 border-t border-slate-100 text-xs text-slate-600">
                  {mod.learningConcepts.slice(0, 2).map((concept, idx) => (
                    <div key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-600 font-bold shrink-0">•</span>
                      <span className="line-clamp-2">{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500">
                  Interactive practice
                </span>

                <button
                  type="button"
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isDone
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                  }`}
                >
                  <span>{isDone ? 'Review Lesson' : 'Open Lesson'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
