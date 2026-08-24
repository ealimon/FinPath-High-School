import React, { useState } from 'react';
import { Play, FileText, CheckCircle2, BookOpen, Sparkles, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { ModuleData } from '../types';
import { CheckWriterAndATM } from './simulations/CheckWriterAndATM';
import { BudgetPlanner503020 } from './simulations/BudgetPlanner503020';
import { CompoundInterestSim } from './simulations/CompoundInterestSim';
import { PaycheckBreakdownSim } from './simulations/PaycheckBreakdownSim';
import { SmartShoppingSim } from './simulations/SmartShoppingSim';
import { CreditScoreSim } from './simulations/CreditScoreSim';
import { StockMarketSim } from './simulations/StockMarketSim';
import { GenericModuleGame } from './simulations/GenericModuleGame';
import { EvaluationQuiz } from './EvaluationQuiz';

interface Props {
  module: ModuleData;
  onOpenWorksheet: () => void;
  onCompleteModule: () => void;
}

export type ModuleStep = 'tutorial' | 'game' | 'evaluation' | 'completed';

export const ModuleDetail: React.FC<Props> = ({
  module,
  onOpenWorksheet,
  onCompleteModule,
}) => {
  const [activeStep, setActiveStep] = useState<ModuleStep>('tutorial');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const steps = [
    { id: 'tutorial' as ModuleStep, num: 1, label: 'Core Guide', icon: BookOpen },
    { id: 'game' as ModuleStep, num: 2, label: 'Interactive Simulator', icon: Play },
    { id: 'evaluation' as ModuleStep, num: 3, label: 'Evaluation Quiz', icon: CheckCircle2 },
  ];

  const handleFinishGame = () => {
    setActiveStep('evaluation');
  };

  const handleFinishQuiz = (scorePercent: number) => {
    if (scorePercent >= 70) {
      onCompleteModule();
      setActiveStep('completed');
    }
  };

  // Render appropriate game simulation based on module
  const renderGameSimulation = () => {
    switch (module.gameType) {
      case 'banking':
        return <CheckWriterAndATM onCompleteGame={handleFinishGame} />;
      case 'budget':
        return <BudgetPlanner503020 onCompleteGame={handleFinishGame} />;
      case 'compound':
        return <CompoundInterestSim onCompleteGame={handleFinishGame} />;
      case 'paycheck':
        return <PaycheckBreakdownSim onCompleteGame={handleFinishGame} />;
      case 'credit':
        return <CreditScoreSim onCompleteGame={handleFinishGame} />;
      default:
        return <GenericModuleGame moduleTitle={module.title} onCompleteGame={handleFinishGame} />;
    }
  };

  return (
    <div className="flex-1 space-y-6">
      {/* MODULE HEADER CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-white">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-5 pb-5 border-b border-slate-800">
          <div className="space-y-1.5 min-w-0">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              {module.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{module.title}</h2>
            <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">{module.subtitle}</p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full xl:w-auto">
            <button
              onClick={() => setActiveStep('game')}
              className="flex-1 sm:flex-none whitespace-nowrap bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-5 py-2.5 rounded-2xl shadow-lg transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2 text-sm shrink-0"
            >
              <Play className="w-4 h-4 fill-slate-950 shrink-0" />
              <span>Launch Simulator</span>
            </button>

            <button
              onClick={onOpenWorksheet}
              className="flex-1 sm:flex-none whitespace-nowrap bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold px-5 py-2.5 rounded-2xl transition-all hover:border-slate-500 cursor-pointer flex items-center justify-center gap-2 text-sm shrink-0 shadow-sm"
            >
              <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Case Study Worksheet</span>
            </button>
          </div>
        </div>

        {/* STEPPER NAVIGATION BAR */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          {steps.map((step) => {
            const isActive = activeStep === step.id;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-black border-cyan-400 shadow-md scale-[1.02]'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-slate-950 text-cyan-400' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {step.num}
                </div>
                <div className="truncate">
                  <div className="text-[11px] font-black truncate">{step.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: TUTORIAL GUIDE & CORE CONCEPTS */}
      {activeStep === 'tutorial' && (
        <div className="space-y-6">
          {/* Core Learning Takeaways */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-2 text-cyan-400 font-black text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>HIGH SCHOOL FINANCIAL CURRICULUM</span>
            </div>
            <h3 className="text-xl font-black text-white mb-3">Core Learning Objectives</h3>

            <ul className="space-y-2 mb-6">
              {module.learningConcepts.map((concept, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="text-cyan-400 font-bold">💡</span>
                  <span>{concept}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setActiveStep('game')}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3 rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center gap-2 text-sm"
            >
              <span>LAUNCH INTERACTIVE SIMULATOR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Tutorial Slides */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold border-b border-slate-800 pb-3">
              <span>SECTION {currentSlideIndex + 1} OF {module.tutorialSlides.length}</span>
              <span>{module.tutorialSlides[currentSlideIndex].subtitle}</span>
            </div>

            <div className="py-4 space-y-3">
              <h4 className="text-xl font-black text-cyan-300">
                {module.tutorialSlides[currentSlideIndex].title}
              </h4>
              <p className="text-slate-300 leading-relaxed text-sm">
                {module.tutorialSlides[currentSlideIndex].content}
              </p>

              {module.tutorialSlides[currentSlideIndex].keyTakeaway && (
                <div className="bg-cyan-950/60 border border-cyan-800/60 p-3.5 rounded-xl text-xs text-cyan-200 font-bold mt-4">
                  🔑 Key Takeaway: {module.tutorialSlides[currentSlideIndex].keyTakeaway}
                </div>
              )}
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  currentSlideIndex === 0
                    ? 'text-slate-600 cursor-not-allowed'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              {currentSlideIndex < module.tutorialSlides.length - 1 ? (
                <button
                  onClick={() => setCurrentSlideIndex((prev) => prev + 1)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-md cursor-pointer"
                >
                  Next Section <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveStep('game')}
                  className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 px-5 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-md cursor-pointer"
                >
                  Start Simulator <Play className="w-4 h-4 fill-slate-950" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: INTERACTIVE SIMULATOR */}
      {activeStep === 'game' && renderGameSimulation()}

      {/* STEP 3: EVALUATION QUIZ */}
      {activeStep === 'evaluation' && (
        <EvaluationQuiz
          questions={module.quiz}
          onFinishQuiz={handleFinishQuiz}
        />
      )}

      {/* COMPLETED STEP */}
      {activeStep === 'completed' && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 border border-slate-800 rounded-3xl p-8 text-center text-white shadow-2xl space-y-6">
          <div className="inline-flex p-6 bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 rounded-full shadow-2xl">
            <Award className="w-12 h-12" />
          </div>

          <div>
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">MODULE MASTERY VERIFIED</span>
            <h3 className="text-3xl font-black text-white mt-1">{module.title} Competency Mastered!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto mt-2">
              You passed the evaluation quiz with flying colors. This skill is now added to your Adulting Readiness Scorecard.
            </p>
          </div>

          <button
            onClick={onOpenWorksheet}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-2 text-sm"
          >
            <FileText className="w-5 h-5" />
            View Printable Case Study Worksheet
          </button>
        </div>
      )}
    </div>
  );
};
