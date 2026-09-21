import React, { useState, useEffect } from 'react';
import { Play, FileText, CheckCircle2, BookOpen, ArrowRight, ArrowLeft, LayoutGrid, ChevronLeft, ChevronRight, Award } from 'lucide-react';
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
  onBackToModules?: () => void;
  onSelectModule?: (id: number) => void;
  totalModules?: number;
}

export type ModuleStep = 'tutorial' | 'game' | 'evaluation' | 'completed';

export const ModuleDetail: React.FC<Props> = ({
  module,
  onOpenWorksheet,
  onCompleteModule,
  onBackToModules,
  onSelectModule,
  totalModules = 10,
}) => {
  const [activeStep, setActiveStep] = useState<ModuleStep>('tutorial');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Reset step and slide when switching modules
  useEffect(() => {
    setActiveStep('tutorial');
    setCurrentSlideIndex(0);
  }, [module.id]);

  const steps = [
    { id: 'tutorial' as ModuleStep, num: 1, label: 'Core Guide', icon: BookOpen },
    { id: 'game' as ModuleStep, num: 2, label: 'Interactive Simulator', icon: Play },
    { id: 'evaluation' as ModuleStep, num: 3, label: 'Check Understanding', icon: CheckCircle2 },
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
      {/* TOP NAVIGATION BAR */}
      {onBackToModules && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200/90 p-4 rounded-2xl shadow-xs text-slate-800">
          <button
            onClick={onBackToModules}
            className="text-slate-700 hover:text-emerald-800 font-semibold px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700" />
            <span>Back to All Lessons</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium px-2.5 py-1 bg-slate-100 rounded-lg">
              Lesson {module.id} of {totalModules}
            </span>

            {onSelectModule && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSelectModule(module.id - 1)}
                  disabled={module.id <= 1}
                  className={`p-2 rounded-xl text-xs border transition-all ${
                    module.id <= 1
                      ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer'
                  }`}
                  title="Previous Lesson"
                  aria-label="Previous Lesson"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelectModule(module.id + 1)}
                  disabled={module.id >= totalModules}
                  className={`p-2 rounded-xl text-xs border transition-all ${
                    module.id >= totalModules
                      ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer'
                  }`}
                  title="Next Lesson"
                  aria-label="Next Lesson"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE HEADER CARD */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs text-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <span className="inline-block text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              Lesson {module.id} • {module.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
              {module.title}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {module.subtitle}
            </p>
          </div>

          {/* Quick Action: Case Study Worksheet */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenWorksheet}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 text-xs"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>View Worksheet</span>
            </button>
          </div>
        </div>

        {/* STEPPER TABS */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          {steps.map((step) => {
            const isActive = activeStep === step.id;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-3 rounded-xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold shadow-xs'
                    : 'bg-slate-50/70 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {step.num}
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold truncate">{step.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: TUTORIAL GUIDE & CORE CONCEPTS */}
      {activeStep === 'tutorial' && (
        <div className="space-y-6">
          {/* Key Objectives */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Key Concepts in this Lesson</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">What You Will Learn</h3>

            <ul className="space-y-2 mb-6">
              {module.learningConcepts.map((concept, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{concept}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setActiveStep('game')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 text-sm cursor-pointer"
            >
              <span>Try the Practice Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tutorial Slide Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-500 font-medium border-b border-slate-100 pb-3">
              <span>Section {currentSlideIndex + 1} of {module.tutorialSlides.length}</span>
              <span>{module.tutorialSlides[currentSlideIndex].subtitle}</span>
            </div>

            <div className="py-2 space-y-3">
              <h4 className="text-xl font-bold text-slate-800">
                {module.tutorialSlides[currentSlideIndex].title}
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {module.tutorialSlides[currentSlideIndex].content}
              </p>

              {module.tutorialSlides[currentSlideIndex].keyTakeaway && (
                <div className="bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-xl text-xs text-emerald-900 font-medium mt-4">
                  💡 <strong>Key Takeaway:</strong> {module.tutorialSlides[currentSlideIndex].keyTakeaway}
                </div>
              )}
            </div>

            {/* Slide Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  currentSlideIndex === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Previous Section
              </button>

              {currentSlideIndex < module.tutorialSlides.length - 1 ? (
                <button
                  onClick={() => setCurrentSlideIndex((prev) => prev + 1)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  Next Section <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveStep('game')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  Launch Simulator <Play className="w-3.5 h-3.5" />
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
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center text-slate-800 shadow-sm space-y-6">
          <div className="inline-flex p-5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200/70">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Lesson Complete</span>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{module.title} Mastered!</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
              Great job completing this lesson and demonstrating your financial knowledge. This skill has been recorded in your progress scorecard.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {onSelectModule && module.id < totalModules && (
              <button
                onClick={() => onSelectModule(module.id + 1)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-2 text-sm"
              >
                <span>Continue to Lesson {module.id + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {onBackToModules && (
              <button
                onClick={onBackToModules}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-5 py-2.5 rounded-xl cursor-pointer inline-flex items-center gap-2 text-sm"
              >
                <span>Back to Lessons</span>
              </button>
            )}

            <button
              onClick={onOpenWorksheet}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-5 py-2.5 rounded-xl cursor-pointer inline-flex items-center gap-2 text-sm"
            >
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Printable Case Study</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
