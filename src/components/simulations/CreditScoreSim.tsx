import React, { useState } from 'react';
import { ShieldCheck, Sparkles, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  onCompleteGame: (earnedCoins: number, earnedXp: number) => void;
}

export const CreditScoreSim: React.FC<Props> = ({ onCompleteGame }) => {
  const [score, setScore] = useState(680);
  const [balance, setBalance] = useState(250);
  const [creditLimit] = useState(1000);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([
    'Account opened with $1,000 credit limit',
    'On-time payment recorded (+10 pts)'
  ]);

  const handlePayFull = () => {
    setErrorMessage(null);
    setBalance(0);
    setScore(prev => Math.min(850, prev + 25));
    setHistory(prev => ['Paid statement balance in full. $0 interest charged (+25 pts)', ...prev]);
  };

  const handlePayMinimum = () => {
    setErrorMessage(null);
    setBalance(prev => Math.round(prev * 1.18)); // 18% APR interest
    setScore(prev => Math.max(300, prev - 15));
    setHistory(prev => ['Paid minimum only. Interest added to remaining balance (-15 pts)', ...prev]);
  };

  const handleMakePurchase = () => {
    setErrorMessage(null);
    if (balance + 300 > creditLimit) {
      setErrorMessage('Purchase declined: This purchase would exceed your $1,000 credit limit.');
      return;
    }
    setBalance(prev => prev + 300);
    setHistory(prev => ['Purchased school supplies & tech ($300)', ...prev]);
  };

  const utilizationPct = Math.round((balance / creditLimit) * 100);

  return (
    <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center border border-emerald-200/80 shrink-0">
          <ShieldCheck className="w-5 h-5 text-emerald-800" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Credit Score & Interest Simulator</h3>
          <p className="text-xs text-slate-500">Practice keeping your score in the Good/Excellent zone (720+) by keeping utilization low and paying in full.</p>
        </div>
      </div>

      {/* Credit Gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Credit Score</div>
          <div className={`text-3xl font-bold mt-1 font-mono ${
            score >= 750 ? 'text-emerald-700' : score >= 670 ? 'text-slate-800' : 'text-amber-700'
          }`}>{score} / 850</div>
          <div className="text-[11px] text-slate-500 mt-1 font-semibold">
            {score >= 750 ? 'Excellent' : score >= 670 ? 'Good' : 'Needs Attention'}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Card Balance</div>
          <div className="text-2xl font-bold text-slate-800 mt-1 font-mono">${balance}</div>
          <div className="text-[11px] text-slate-400 mt-1">Total Limit: ${creditLimit}</div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Credit Utilization</div>
          <div className={`text-2xl font-bold mt-1 font-mono ${utilizationPct <= 30 ? 'text-emerald-700' : 'text-amber-700'}`}>
            {utilizationPct}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">{utilizationPct <= 30 ? 'Healthy (< 30%)' : 'High Utilization'}</div>
        </div>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={handlePayFull}
          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold p-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Pay Full Balance ($0 Interest)</span>
        </button>

        <button
          onClick={handlePayMinimum}
          className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold p-3 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>Pay Minimum (Incurs Interest)</span>
        </button>

        <button
          onClick={handleMakePurchase}
          className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold p-3 rounded-xl text-xs transition-colors cursor-pointer"
        >
          + Add Purchase ($300)
        </button>
      </div>

      {/* History Log */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5 max-h-32 overflow-y-auto font-sans">
        <div className="text-slate-400 text-[11px] font-semibold mb-1">Recent Activity Log:</div>
        {history.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-emerald-700 font-bold">•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onCompleteGame(50, 50)}
          disabled={score < 720}
          className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all text-xs sm:text-sm ${
            score >= 720
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs cursor-pointer'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{score >= 720 ? 'Complete Practice & Continue' : 'Reach 720+ Score to Complete'}</span>
        </button>
      </div>
    </div>
  );
};
