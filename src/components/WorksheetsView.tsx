import React, { useState } from 'react';
import { ModuleData } from '../types';
import { FileText, Sparkles, Printer } from 'lucide-react';

interface Props {
  modules: ModuleData[];
  selectedModuleId: number;
}

export const WorksheetsView: React.FC<Props> = ({ modules, selectedModuleId }) => {
  const [activeModuleId, setActiveModuleId] = useState<number>(selectedModuleId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAnswers, setShowAnswers] = useState(false);

  const activeModule = modules.find((m) => m.id === activeModuleId) || modules[0];
  const worksheet = activeModule.worksheet;

  const handleInputChange = (qId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* MODULE SELECTOR RIBBON */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs flex items-center gap-2 overflow-x-auto print:hidden">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 shrink-0">
          Lesson Worksheets:
        </span>
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setActiveModuleId(m.id);
              setShowAnswers(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer whitespace-nowrap ${
              activeModuleId === m.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lesson {m.id}: {m.title}
          </button>
        ))}
      </div>

      {/* WORKSHEET PRINTABLE CONTAINER */}
      <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-200 space-y-6 print:shadow-none print:border-none print:p-0 print:m-0 print:space-y-4 print:text-black print:rounded-none">
        {/* Printable Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-200 print:pb-2 print:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase tracking-wider mb-1 print:text-slate-700">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>FinPath High School • Personal Finance Case Study</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 print:text-xl">{worksheet.title}</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5 print:text-slate-600">{worksheet.subtitle}</p>
          </div>

          <div className="flex gap-2 print:hidden shrink-0">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer border border-slate-200 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{showAnswers ? 'Hide Answer Key' : 'Show Answer Key'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Student Name & Date Header Block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono print:bg-white print:border-slate-400 print:p-2 print:gap-2">
          <div><strong className="text-slate-700">Student Name:</strong> ____________________</div>
          <div><strong className="text-slate-700">Class / Period:</strong> ____________________</div>
          <div><strong className="text-slate-700">Date:</strong> {new Date().toLocaleDateString()}</div>
        </div>

        {/* Scenario Card */}
        <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-xl text-xs text-amber-950 space-y-1 print:bg-slate-50 print:border-slate-400 print:p-3 print-avoid-break">
          <strong className="text-amber-900 font-bold uppercase tracking-wider block print:text-slate-900">📌 Case Study Scenario:</strong>
          <p className="text-slate-800 text-xs sm:text-sm leading-relaxed print:text-black">{worksheet.scenario}</p>
        </div>

        {/* Questions */}
        <div className="space-y-5 pt-1 print:space-y-4">
          {worksheet.questions.map((q, idx) => (
            <div key={q.id} className="space-y-2 border-b pb-5 border-slate-100 print:border-slate-200 print:pb-3 print-avoid-break">
              <label className="font-semibold text-sm text-slate-900 flex items-start gap-2.5 print:text-xs">
                <span className="bg-emerald-100 text-emerald-900 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 print:bg-slate-200 print:text-black">
                  {idx + 1}
                </span>
                <span>{q.prompt}</span>
              </label>

              {/* Screen Input Area */}
              <div className="print:hidden">
                <textarea
                  value={answers[q.id] || ''}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder={q.placeholder || 'Type your notes, calculations, or answer here...'}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white rounded-xl p-3 text-sm focus:outline-none text-slate-800 font-sans transition-colors"
                />
              </div>

              {/* Printed Output Line / Answer */}
              <div className="hidden print:block">
                {answers[q.id] ? (
                  <div className="p-2 border border-slate-300 rounded bg-slate-50 text-xs font-mono text-black min-h-[32px]">
                    {answers[q.id]}
                  </div>
                ) : (
                  <div className="h-14 border-b border-dashed border-slate-400" />
                )}
              </div>

              {/* Answer Key Box */}
              {showAnswers && (
                <div className="bg-emerald-50/70 border border-emerald-200/80 p-3 rounded-xl text-xs text-emerald-950 space-y-1">
                  <div className="font-bold text-emerald-900">Suggested Solution & Rubric:</div>
                  <div className="leading-relaxed">{q.sampleAnswer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
