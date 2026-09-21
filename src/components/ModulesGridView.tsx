import React, { useState } from 'react';
import { CheckCircle2, Play, BookOpen, ArrowRight, Sparkles, Compass } from 'lucide-react';
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

  // Find the next recommended module to study (first not-done module, or module 1)
  const nextUpModule = modules.find((m) => m.status !== 'DONE') || modules[0];

  // Filter modules based on user choice
  const filteredModules = modules.filter((m) => {
    if (filter === 'foundations') return m.id <= 5;
    if (filter === 'real-world') return m.id > 5;
    if (filter === 'completed') return m.status === 'DONE';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* CALM FOCUS CARD: CONTINUE WHERE YOU LEFT OFF */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>Recommended Next Lesson</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              Module {nextUpModule.id}: {nextUpModule.title}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {nextUpModule.subtitle}. Learn the core principles, try the interactive practice simulator, and master this life skill!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => onSelectModule(nextUpModule.id)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3 rounded-2xl shadow-sm transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <span>{nextUpModule.status === 'DONE' ? 'Review Lesson' : 'Continue Lesson'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-500 text-center md:text-right">
              ~10–15 minutes • Interactive simulator included
            </span>
          </div>
        </div>

        {/* PROGRESS OVERVIEW BAR */}
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
          <div className="flex justify-between items-center text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              Your Learning Journey
            </span>
            <span className="text-emerald-800 font-semibold font-mono">
              {completedCount} of {totalCount} lessons completed ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
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
