import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Lightbulb } from 'lucide-react';

interface Props {
  moduleTitle: string;
  onCompleteGame: (earnedCoins: number, earnedXp: number) => void;
}

export const GenericModuleGame: React.FC<Props> = ({ moduleTitle, onCompleteGame }) => {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-3xl mx-auto my-4 space-y-6 text-center">
      <div className="inline-flex p-3.5 bg-emerald-100 text-emerald-800 rounded-2xl border border-emerald-200/80">
        <Lightbulb className="w-7 h-7 text-emerald-800" />
      </div>

      <h3 className="text-xl font-bold text-slate-800">{moduleTitle} Interactive Practice</h3>
      <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
        Test your practical decision-making skills and apply core principles to solve this real-world scenario.
      </p>

      {!completed ? (
        <button
          onClick={() => setCompleted(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2 mx-auto text-xs sm:text-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Start Scenario Simulation</span>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-emerald-900 max-w-md mx-auto flex flex-col items-center gap-2.5">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            <div className="font-bold text-base text-slate-800">Scenario Mastered!</div>
            <p className="text-xs text-slate-600">You successfully applied key principles from {moduleTitle}. Great job!</p>
          </div>

          <button
            onClick={() => onCompleteGame(50, 50)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2 mx-auto text-xs sm:text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Complete Practice & Continue</span>
          </button>
        </div>
      )}
    </div>
  );
};
