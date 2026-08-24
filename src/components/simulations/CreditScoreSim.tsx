import React, { useState } from 'react';
import { ShieldCheck, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  onCompleteGame: (earnedCoins: number, earnedXp: number) => void;
}

export const CreditScoreSim: React.FC<Props> = ({ onCompleteGame }) => {
  const [score, setScore] = useState(680);
  const [balance, setBalance] = useState(250);
  const [creditLimit] = useState(1000);
  const [history, setHistory] = useState<string[]>([
    'Account opened with $1,000 limit',
    'On-time payment recorded (+10 pts)'
  ]);

  const handlePayFull = () => {
    setBalance(0);
    setScore(prev => Math.min(850, prev + 25));
    setHistory(prev => ['Paid statement in FULL! 0% interest charged (+25 pts)', ...prev]);
  };

  const handlePayMinimum = () => {
    setBalance(prev => Math.round(prev * 1.18)); // 18% APR interest hit
    setScore(prev => Math.max(300, prev - 15));
    setHistory(prev => ['Paid minimum only. 18% APR interest added (-15 pts)', ...prev]);
  };

  const handleMakePurchase = () => {
    if (balance + 300 > creditLimit) {
      alert('Transaction Declined: Credit limit exceeded!');
      return;
    }
    setBalance(prev => prev + 300);
    setHistory(prev => ['Purchased concert ticket ($300)', ...prev]);
  };

  const utilizationPct = Math.round((balance / creditLimit) * 100);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black">Credit Score & APR Simulator</h3>
          <p className="text-xs text-slate-400">Keep your score in the Excellent 750+ zone by managing card utilization and paying in full!</p>
        </div>
      </div>

      {/* Credit Gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="text-xs text-slate-400">FICO® Credit Score</div>
          <div className={`text-3xl font-black mt-1 ${
            score >= 750 ? 'text-emerald-400' : score >= 670 ? 'text-cyan-400' : 'text-amber-400'
          }`}>{score} / 850</div>
          <div className="text-[11px] text-slate-400 mt-1 font-bold">
            {score >= 750 ? '🌟 EXCELLENT' : score >= 670 ? '👍 GOOD' : '⚠️ FAIR'}
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="text-xs text-slate-400">Card Balance</div>
          <div className="text-2xl font-black text-white mt-1">${balance}</div>
          <div className="text-[11px] text-slate-400 mt-1">Limit: ${creditLimit}</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="text-xs text-slate-400">Utilization</div>
          <div className={`text-2xl font-black mt-1 ${utilizationPct <= 30 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {utilizationPct}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">{utilizationPct <= 30 ? 'Target < 30%' : 'High Utilization!'}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={handlePayFull}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Pay Full Statement ($0 Interest)
        </button>

        <button
          onClick={handlePayMinimum}
          className="bg-amber-600 hover:bg-amber-500 text-white font-bold p-3 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <AlertTriangle className="w-4 h-4" />
          Pay Minimum Only (Adds Interest)
        </button>

        <button
          onClick={handleMakePurchase}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold p-3 rounded-xl text-xs transition-all cursor-pointer"
        >
          + Buy Something ($300)
        </button>
      </div>

      {/* History Log */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1 max-h-32 overflow-y-auto">
        <div className="text-slate-500 text-[10px] uppercase font-sans mb-1 font-bold">Activity Log:</div>
        {history.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-cyan-400">•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onCompleteGame(50, 50)}
          disabled={score < 720}
          className={`px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all ${
            score >= 720
              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-lg cursor-pointer hover:scale-105'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          {score >= 720 ? 'Complete Credit Challenge (+50 Coins & +50 XP)' : 'Reach 720+ Score to Win'}
        </button>
      </div>
    </div>
  );
};
