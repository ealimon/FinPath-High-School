import React from 'react';
import { GraduationCap, MessageCircle, Volume2, VolumeX, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { UserStats } from '../types';

interface Props {
  userStats: UserStats;
  onOpenAiTutor: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<Props> = ({
  userStats,
  onOpenAiTutor,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-xl text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-black px-3.5 py-2 rounded-2xl shadow-lg text-lg tracking-wider flex items-center gap-2 border border-cyan-300">
              <GraduationCap className="w-6 h-6 text-slate-950" />
              <span>FINPATH</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-white leading-none">HIGH SCHOOL</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-800/50 mt-1">
                PERSONAL FINANCE & ADULTING PREP
              </span>
            </div>
          </div>
        </div>

        {/* METRICS & CONTROLS BAR */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          
          {/* READINESS COMPLETED MODULES */}
          <div className="bg-slate-950/90 border border-slate-800 px-3.5 py-1.5 rounded-2xl flex items-center gap-2.5 shadow-inner">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Modules Completed</div>
              <div className="font-black text-xs text-white font-mono">
                {userStats.completedModulesCount} of {userStats.totalModulesCount}
              </div>
            </div>
          </div>

          {/* ADULTING READINESS PERCENTAGE */}
          <div className="bg-slate-950/90 border border-slate-800 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 shadow-inner">
            <div className="p-1 bg-cyan-500/20 text-cyan-400 rounded-lg">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Readiness Score</div>
              <div className="font-black text-xs text-cyan-300 font-mono">{userStats.readinessPercentage}%</div>
            </div>
          </div>

          {/* SOUND TOGGLE */}
          <button
            onClick={onToggleSound}
            className="p-2 bg-slate-950 border border-slate-800 hover:border-slate-600 rounded-2xl text-slate-300 hover:text-white transition-all cursor-pointer"
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* AI ADVISOR (FINLEY) */}
          <button
            onClick={onOpenAiTutor}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 transition-all hover:scale-105 cursor-pointer border border-cyan-300"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <div className="text-left">
              <div className="text-xs font-black leading-none">FINLEY AI ADVISOR</div>
              <div className="text-[9px] text-slate-950/80 font-bold">24/7 High School Finance Coach</div>
            </div>
            <MessageCircle className="w-4 h-4 ml-1 fill-slate-950" />
          </button>
        </div>

      </div>
    </header>
  );
};
