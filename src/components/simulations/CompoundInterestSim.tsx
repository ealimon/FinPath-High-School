import React, { useState } from 'react';
import { TrendingUp, Sparkles, Clock } from 'lucide-react';

interface Props {
  onCompleteGame: (earnedCoins: number, earnedXp: number) => void;
}

export const CompoundInterestSim: React.FC<Props> = ({ onCompleteGame }) => {
  const [startAge, setStartAge] = useState(15);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [annualReturn, setAnnualReturn] = useState(8); // 8% average return

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
    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black">Compound Interest Time Machine</h3>
          <p className="text-xs text-slate-400">See how starting at age 15 turns small monthly savings into retirement wealth!</p>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
        <div>
          <div className="flex justify-between items-center text-sm font-bold mb-1">
            <span className="text-cyan-400 flex items-center gap-1">
              <Clock className="w-4 h-4" /> Starting Age
            </span>
            <span className="text-white">Age {startAge}</span>
          </div>
          <input
            type="range"
            min="15"
            max="35"
            value={startAge}
            onChange={(e) => setStartAge(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <span className="text-xs text-slate-400">Investing until age 65 ({yearsInv} years)</span>
        </div>

        <div>
          <div className="flex justify-between items-center text-sm font-bold mb-1">
            <span className="text-emerald-400">Monthly Contribution</span>
            <span className="text-white">${monthlyContribution}/mo</span>
          </div>
          <input
            type="range"
            min="25"
            max="500"
            step="25"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Results Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="text-xs text-slate-400">You Invest Out-Of-Pocket</div>
          <div className="text-xl font-black text-slate-200 mt-1">${totalContributions.toLocaleString()}</div>
        </div>

        <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-600/50">
          <div className="text-xs text-emerald-300">Compound Interest Earned</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">+${interestEarned.toLocaleString()}</div>
        </div>

        <div className="bg-gradient-to-br from-cyan-950 to-blue-900 p-4 rounded-xl border border-cyan-500/50">
          <div className="text-xs text-cyan-200">Total Portfolio Value at Age 65</div>
          <div className="text-2xl font-black text-cyan-300 mt-1">${futureValue.toLocaleString()}</div>
        </div>
      </div>

      {/* Comparison Callout */}
      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-sm text-slate-300">
        💡 <strong>Key Takeaway:</strong> Interest makes up <span className="text-emerald-400 font-bold">{Math.round((interestEarned / futureValue) * 100)}%</span> of your total wealth! Starting at age 15 vs age 25 gives you over <strong>2.5x more wealth</strong> because of compound time!
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onCompleteGame(50, 50)}
          className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all shadow-lg cursor-pointer hover:scale-105"
        >
          <Sparkles className="w-5 h-5" />
          Complete Time Machine Challenge (+50 Coins & +50 XP)
        </button>
      </div>
    </div>
  );
};
