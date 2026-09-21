import React, { useState } from 'react';
import { TrendingUp, Sparkles, Clock } from 'lucide-react';

interface Props {
  onCompleteGame: (earnedCoins: number, earnedXp: number) => void;
}

export const CompoundInterestSim: React.FC<Props> = ({ onCompleteGame }) => {
  const [startAge, setStartAge] = useState(15);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const annualReturn = 8; // 8% average return

  const endAge = 65;
  const yearsInv = endAge - startAge;

  // Calculate compound growth vs total money contributed out-of-pocket
  const monthlyRate = annualReturn / 100 / 12;
  const months = yearsInv * 12;
  const totalContributions = monthlyContribution * months;
  
  // Future Value formula: FV = P * (((1 + r)^n - 1) / r)
  const futureValue = Math.round(
    monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  );

  const interestEarned = futureValue - totalContributions;

  return (
    <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center border border-emerald-200/80 shrink-0">
          <TrendingUp className="w-5 h-5 text-emerald-800" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Compound Growth Simulator</h3>
          <p className="text-xs text-slate-500">See how time turns modest monthly savings into substantial retirement savings.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80">
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-slate-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-700" /> Starting Age
            </span>
            <span className="text-slate-900 font-mono font-bold">Age {startAge}</span>
          </div>
          <input
            type="range"
            min="15"
            max="35"
            value={startAge}
            onChange={(e) => setStartAge(Number(e.target.value))}
            className="w-full accent-emerald-700 cursor-pointer"
          />
          <span className="text-[11px] text-slate-500 block mt-1">Investing until age 65 ({yearsInv} years)</span>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-slate-700">Monthly Contribution</span>
            <span className="text-slate-900 font-mono font-bold">${monthlyContribution} / mo</span>
          </div>
          <input
            type="range"
            min="25"
            max="500"
            step="25"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full accent-emerald-700 cursor-pointer"
          />
        </div>
      </div>

      {/* Results Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">You Deposit Out-Of-Pocket</div>
          <div className="text-xl font-bold text-slate-700 mt-1 font-mono">${totalContributions.toLocaleString()}</div>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80">
          <div className="text-xs text-emerald-800 font-medium">Compound Interest Earned</div>
          <div className="text-xl font-bold text-emerald-800 mt-1 font-mono">+${interestEarned.toLocaleString()}</div>
        </div>

        <div className="bg-emerald-100/60 p-4 rounded-2xl border border-emerald-300">
          <div className="text-xs text-emerald-900 font-semibold">Total Portfolio at Age 65</div>
          <div className="text-2xl font-bold text-emerald-950 mt-1 font-mono">${futureValue.toLocaleString()}</div>
        </div>
      </div>

      {/* Comparison Callout */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
        💡 <strong>Key Takeaway:</strong> Compound interest makes up <strong className="text-emerald-800">{Math.round((interestEarned / futureValue) * 100)}%</strong> of your total balance. Starting in high school gives your deposits an extra decade of exponential growth compared to waiting until your late 20s.
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onCompleteGame(50, 50)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all text-xs sm:text-sm cursor-pointer shadow-xs"
        >
          <Sparkles className="w-4 h-4" />
          <span>Complete Practice & Continue</span>
        </button>
      </div>
    </div>
  );
};
