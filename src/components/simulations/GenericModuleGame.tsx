import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Lightbulb } from 'lucide-react';

interface Props {
  moduleTitle: string;
  onCompleteGame: (earnedCoins: number, earnedXp: number) => void;
}

export const GenericModuleGame: React.FC<Props> = ({ moduleTitle, onCompleteGame }) => {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl max-w-3xl mx-auto my-4 space-y-6 text-center">
      <div className="inline-flex p-4 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
        <Lightbulb className="w-8 h-8" />
      </div>

      <h3 className="text-2xl font-black text-white">{moduleTitle} Interactive Simulation</h3>
      <p className="text-slate-300 text-sm max-w-lg mx-auto">
        Test your practical decision-making skills and apply core principles to solve real-world scenario challenges!
      </p>

      {!completed ? (
        <button
          onClick={() => setCompleted(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center gap-2 mx-auto"
        >
          <Sparkles className="w-5 h-5" />
          START INTERACTIVE GAME!
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-emerald-950/80 border border-emerald-500/50 p-6 rounded-2xl text-emerald-300 max-w-md mx-auto flex flex-col items-center gap-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            <div className="font-black text-xl text-white">Interactive Scenario Mastered!</div>
            <p className="text-xs text-emerald-200">You successfully applied key principles from {moduleTitle}. Great job!</p>
          </div>

          <button
            onClick={() => onCompleteGame(50, 50)}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            Claim Game Rewards (+50 Coins & +50 XP)
          </button>
        </div>
      )}
    </div>
  );
};
