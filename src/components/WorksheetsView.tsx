import React, { useState } from 'react';
import { ModuleData } from '../types';
import { FileText, Download, CheckCircle2, Sparkles, Printer } from 'lucide-react';

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
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-black text-slate-400 uppercase tracking-wider px-2 shrink-0">SELECT WORKSHEET:</span>
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setActiveModuleId(m.id);
              setShowAnswers(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
              activeModuleId === m.id
                ? 'bg-cyan-500 text-slate-950 shadow-md scale-105'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Mod {m.id}: {m.title}
          </button>
        ))}
      </div>

      {/* WORKSHEET PRINTABLE CONTAINER */}
      <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border-4 border-slate-200 space-y-6 print:shadow-none print:border-none print:p-0">
        {/* Printable Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-2 border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-widest mb-1">
              <FileText className="w-4 h-4" />
              <span>FINPATH HIGH • HIGH SCHOOL FINANCIAL CASE STUDY WORKSHEET</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{worksheet.title}</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{worksheet.subtitle}</p>
          </div>

          <div className="flex gap-2 print:hidden">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer border border-slate-300 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-600" />
              {showAnswers ? 'Hide Answer Key' : 'Show Answer Key'}
            </button>

            <button
              onClick={handlePrint}
              className="bg-slate-900 hover:bg-slate-800 text-white font-black px-4 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Student Name & Date Header Block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono">
          <div><strong className="text-slate-600">STUDENT NAME:</strong> ____________________</div>
          <div><strong className="text-slate-600">CLASS / PERIOD:</strong> ____________________</div>
          <div><strong className="text-slate-600">DATE:</strong> {new Date().toLocaleDateString()}</div>
        </div>

        {/* Scenario Card */}
        <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-2xl text-xs text-amber-900 space-y-1">
          <strong className="text-amber-900 font-black uppercase tracking-wider block">📌 REAL-WORLD CASE SCENARIO:</strong>
          <p className="text-slate-800 text-sm">{worksheet.scenario}</p>
        </div>

        {/* Questions */}
        <div className="space-y-6 pt-2">
          {worksheet.questions.map((q, idx) => (
            <div key={q.id} className="space-y-2 border-b pb-6 border-slate-100">
              <label className="font-bold text-sm text-slate-900 flex items-start gap-2">
                <span className="bg-cyan-100 text-cyan-900 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{q.prompt}</span>
              </label>

              <textarea
                value={answers[q.id] || ''}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
                placeholder={q.placeholder || 'Type your answer or calculations here...'}
                rows={3}
                className="w-full bg-slate-50 border-2 border-slate-300 focus:border-cyan-500 rounded-xl p-3 text-sm focus:outline-none focus:bg-white text-slate-900 font-sans"
              />

              {showAnswers && q.suggestedAnswer && (
                <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl text-xs text-emerald-900 font-medium">
                  <strong>✅ Answer Key:</strong> {q.suggestedAnswer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
