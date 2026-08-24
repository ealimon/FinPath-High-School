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
    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-pink-500/20 text-pink-400 rounded-xl border border-pink-500/30">
          <PieChart className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black">50 / 30 / 20 Budget Allocator Challenge</h3>
          <p className="text-xs text-slate-400">Monthly Net Income: <strong className="text-white">${totalIncome}</strong>. Balance your budget sliders!</p>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-4 bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
        {/* Needs Slider */}
        <div>
          <div className="flex justify-between items-center text-sm font-bold mb-1">
            <span className="text-cyan-400">Needs (Target 50% = $500)</span>
            <span className="text-white">${needs} ({needsPct}%)</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={needs}
            onChange={(e) => setNeeds(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Wants Slider */}
        <div>
          <div className="flex justify-between items-center text-sm font-bold mb-1">
            <span className="text-pink-400">Wants (Target 30% = $300)</span>
            <span className="text-white">${wants} ({wantsPct}%)</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={wants}
            onChange={(e) => setWants(Number(e.target.value))}
            className="w-full accent-pink-400 cursor-pointer"
          />
        </div>

        {/* Savings Slider */}
        <div>
          <div className="flex justify-between items-center text-sm font-bold mb-1">
            <span className="text-emerald-400">Savings (Target 20% = $200)</span>
            <span className="text-white">${savings} ({savingsPct}%)</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={savings}
            onChange={(e) => setSavings(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Bar */}
      <div>
        <div className="text-xs text-slate-400 mb-2 font-bold flex justify-between">
          <span>ALLOCATION VISUALIZER</span>
          <span className={allocatedTotal === totalIncome ? 'text-emerald-400' : 'text-amber-400'}>
            Total: ${allocatedTotal} / ${totalIncome}
          </span>
        </div>
        <div className="h-6 bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
          <div style={{ width: `${needsPct}%` }} className="bg-cyan-500 h-full transition-all" title="Needs" />
          <div style={{ width: `${wantsPct}%` }} className="bg-pink-500 h-full transition-all" title="Wants" />
          <div style={{ width: `${savingsPct}%` }} className="bg-emerald-500 h-full transition-all" title="Savings" />
        </div>
      </div>

      {/* Feedback Card */}
      {isBalanced ? (
        <div className="bg-emerald-950/60 border border-emerald-500/50 p-4 rounded-xl flex items-center gap-3 text-emerald-300 text-sm">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <span><strong>Perfect 50/30/20 Balance!</strong> You allocated exactly $500 Needs, $300 Wants, and $200 Savings. Your future self is thrilled!</span>
        </div>
      ) : (
        <div className="bg-amber-950/60 border border-amber-500/50 p-4 rounded-xl flex items-center gap-3 text-amber-300 text-sm">
          <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
          <span>
            {allocatedTotal !== totalIncome
              ? `Your total is $${allocatedTotal}. Adjust sliders so total equals exactly $1000.`
              : 'Adjust sliders to hit exactly 50% Needs ($500), 30% Wants ($300), and 20% Savings ($200)!'}
          </span>
        </div>
      )}

      {/* Action */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => onCompleteGame(50, 50)}
          disabled={!isBalanced}
          className={`px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all ${
            isBalanced
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white shadow-lg cursor-pointer hover:scale-105'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          Complete Budget Challenge (+50 Coins & +50 XP)
        </button>
      </div>
    </div>
  );
};
