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
    <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center border border-emerald-200/80 shrink-0">
          <ShoppingBag className="w-5 h-5 text-emerald-800" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Unit Price Comparison Practice</h3>
          <p className="text-xs text-slate-500">Calculate cost per ounce to see which package gives you the better value.</p>
        </div>
      </div>

      {/* Duel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option A */}
        <div
          onClick={() => setSelectedOption('A')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedOption === 'A'
              ? 'bg-amber-50/60 border-amber-400 ring-2 ring-amber-200'
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-3xl mb-2">🥣</div>
          <h4 className="font-semibold text-base text-slate-800">{optionA.name}</h4>
          <div className="text-slate-500 text-xs mt-1">Package Size: <strong className="text-slate-800 font-semibold">{optionA.sizeOz} oz</strong></div>
          <div className="text-slate-500 text-xs">Sticker Price: <strong className="text-slate-800 font-semibold">${optionA.price.toFixed(2)}</strong></div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 font-mono">
            Unit Price: ${optionA.price} ÷ {optionA.sizeOz} oz = <strong className="text-slate-800">$0.40 / oz</strong>
          </div>
        </div>

        {/* Option B */}
        <div
          onClick={() => setSelectedOption('B')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedOption === 'B'
              ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-200'
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-3xl mb-2">📦</div>
          <h4 className="font-semibold text-base text-slate-800">{optionB.name}</h4>
          <div className="text-slate-500 text-xs mt-1">Package Size: <strong className="text-slate-800 font-semibold">{optionB.sizeOz} oz</strong></div>
          <div className="text-slate-500 text-xs">Sticker Price: <strong className="text-slate-800 font-semibold">${optionB.price.toFixed(2)}</strong></div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 font-mono">
            Unit Price: ${optionB.price} ÷ {optionB.sizeOz} oz = <strong className="text-emerald-800">$0.30 / oz</strong>
          </div>
        </div>
      </div>

      {/* Result feedback */}
      {selectedOption && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs sm:text-sm ${
          selectedOption === 'B'
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          {selectedOption === 'B' ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span><strong>Correct Choice!</strong> Box B costs $0.30 per ounce compared to Box A's $0.40 per ounce. You save 25% on every ounce.</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span><strong>Notice the unit price:</strong> Although Box A costs less upfront ($4.80 vs $6.00), you get fewer ounces ($0.40/oz vs $0.30/oz). Box B gives more product per dollar spent.</span>
            </>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => onCompleteGame(50, 50)}
          disabled={selectedOption !== 'B'}
          className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all text-xs sm:text-sm ${
            selectedOption === 'B'
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
