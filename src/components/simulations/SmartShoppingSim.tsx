import React, { useState } from 'react';
import { ShoppingBag, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  onCompleteGame: (earnedCoins: number, earnedXp: number) => void;
}

export const SmartShoppingSim: React.FC<Props> = ({ onCompleteGame }) => {
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);

  const optionA = { name: 'Box A (Standard)', sizeOz: 12, price: 4.80, unitCost: 0.40 };
  const optionB = { name: 'Box B (Family Bulk Pack)', sizeOz: 20, price: 6.00, unitCost: 0.30 };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black">Smart Shopping Sweep: Unit Price Duel</h3>
          <p className="text-xs text-slate-400">Calculate the cost-per-ounce to find which option gives you more cereal for less cash!</p>
        </div>
      </div>

      {/* Duel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Option A */}
        <div
          onClick={() => setSelectedOption('A')}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedOption === 'A'
              ? 'bg-amber-950/60 border-amber-400 ring-2 ring-amber-400/50'
              : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
          }`}
        >
          <div className="text-3xl mb-2">🥣</div>
          <h4 className="font-bold text-lg text-white">{optionA.name}</h4>
          <div className="text-slate-400 text-sm mt-1">Size: <span className="text-white font-bold">{optionA.sizeOz} oz</span></div>
          <div className="text-slate-400 text-sm">Price: <span className="text-white font-bold">${optionA.price.toFixed(2)}</span></div>

          <div className="mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-cyan-300">
            Unit Cost: ${optionA.price} / {optionA.sizeOz} oz = <strong>$0.40 / oz</strong>
          </div>
        </div>

        {/* Option B */}
        <div
          onClick={() => setSelectedOption('B')}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedOption === 'B'
              ? 'bg-emerald-950/60 border-emerald-400 ring-2 ring-emerald-400/50'
              : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
          }`}
        >
          <div className="text-3xl mb-2">📦</div>
          <h4 className="font-bold text-lg text-white">{optionB.name}</h4>
          <div className="text-slate-400 text-sm mt-1">Size: <span className="text-white font-bold">{optionB.sizeOz} oz</span></div>
          <div className="text-slate-400 text-sm">Price: <span className="text-white font-bold">${optionB.price.toFixed(2)}</span></div>

          <div className="mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-emerald-300">
            Unit Cost: ${optionB.price} / {optionB.sizeOz} oz = <strong>$0.30 / oz</strong>
          </div>
        </div>
      </div>

      {/* Result feedback */}
      {selectedOption && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 text-sm ${
          selectedOption === 'B'
            ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
            : 'bg-amber-950/80 border-amber-500/60 text-amber-300'
        }`}>
          {selectedOption === 'B' ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <span><strong>Correct Choice!</strong> Box B costs $0.30 per ounce compared to Box A\'s $0.40 per ounce. You save 25% on every bowl!</span>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 text-amber-400 shrink-0" />
              <span><strong>Not quite!</strong> Box A looks cheaper ($4.80 total), but you get fewer ounces ($0.40/oz). Box B gives you a lower unit cost ($0.30/oz)!</span>
            </>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => onCompleteGame(50, 50)}
          disabled={selectedOption !== 'B'}
          className={`px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all ${
            selectedOption === 'B'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-lg cursor-pointer hover:scale-105'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          Complete Shopping Challenge (+50 Coins & +50 XP)
        </button>
      </div>
    </div>
  );
};
