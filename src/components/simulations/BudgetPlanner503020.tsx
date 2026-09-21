import React, { useState } from 'react';
import { PieChart, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  onCompleteGame: (earnedCoins: number, earnedXp: number) => void;
}

export const BudgetPlanner503020: React.FC<Props> = ({ onCompleteGame }) => {
  const totalIncome = 1000;
  const [needs, setNeeds] = useState(500);
  const [wants, setWants] = useState(300);
  const [savings, setSavings] = useState(200);

  const allocatedTotal = needs + wants + savings;
  const needsPct = Math.round((needs / totalIncome) * 100);
  const wantsPct = Math.round((wants / totalIncome) * 100);
  const savingsPct = Math.round((savings / totalIncome) * 100);

  const isBalanced = needsPct === 50 && wantsPct === 30 && savingsPct === 20;

  return (
    <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center border border-emerald-200/80 shrink-0">
          <PieChart className="w-5 h-5 text-emerald-800" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">50 / 30 / 20 Budget Allocator</h3>
          <p className="text-xs text-slate-500">Monthly Net Income: <strong className="text-slate-800 font-semibold">${totalIncome}</strong>. Adjust the sliders to match the recommended 50/30/20 breakdown.</p>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-4 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80">
        {/* Needs Slider */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-slate-700">Needs (Target 50% = $500)</span>
            <span className="text-slate-900 font-mono">${needs} ({needsPct}%)</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={needs}
            onChange={(e) => setNeeds(Number(e.target.value))}
            className="w-full accent-slate-700 cursor-pointer"
          />
        </div>

        {/* Wants Slider */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-amber-800">Wants (Target 30% = $300)</span>
            <span className="text-slate-900 font-mono">${wants} ({wantsPct}%)</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={wants}
            onChange={(e) => setWants(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>

        {/* Savings Slider */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-emerald-800">Savings & Emergency (Target 20% = $200)</span>
            <span className="text-slate-900 font-mono">${savings} ({savingsPct}%)</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={savings}
            onChange={(e) => setSavings(Number(e.target.value))}
            className="w-full accent-emerald-700 cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Bar */}
      <div>
        <div className="text-xs text-slate-500 mb-2 font-medium flex justify-between">
          <span>Allocation Distribution:</span>
          <span className={allocatedTotal === totalIncome ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
            Total: ${allocatedTotal} / ${totalIncome}
          </span>
        </div>
        <div className="h-5 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
          <div style={{ width: `${needsPct}%` }} className="bg-slate-600 h-full transition-all" title="Needs" />
          <div style={{ width: `${wantsPct}%` }} className="bg-amber-500 h-full transition-all" title="Wants" />
          <div style={{ width: `${savingsPct}%` }} className="bg-emerald-600 h-full transition-all" title="Savings" />
        </div>
        <div className="flex gap-4 mt-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" /> Needs (50%)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Wants (30%)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Savings (20%)</span>
        </div>
      </div>

      {/* Feedback Card */}
      {isBalanced ? (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl flex items-center gap-3 text-emerald-900 text-xs sm:text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span><strong>Balanced!</strong> You allocated exactly $500 Needs, $300 Wants, and $200 Savings. You have mastered this foundational budgeting habit!</span>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-amber-900 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            {allocatedTotal !== totalIncome
              ? `Your total is $${allocatedTotal}. Adjust the sliders so the total equals exactly $1,000.`
              : 'Keep adjusting until you hit 50% Needs ($500), 30% Wants ($300), and 20% Savings ($200).'}
          </span>
        </div>
      )}

      {/* Action */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => onCompleteGame(50, 50)}
          disabled={!isBalanced}
          className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all text-xs sm:text-sm ${
            isBalanced
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs cursor-pointer'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Complete Practice & Continue</span>
        </button>
      </div>
    </div>
  );
};
