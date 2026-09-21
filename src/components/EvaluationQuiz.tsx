import React, { useState, useMemo } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  onFinishQuiz: (scorePercent: number) => void;
}

interface PreparedQuestion {
  originalQuestion: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
}

// Fisher-Yates shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const EvaluationQuiz: React.FC<Props> = ({ questions, onFinishQuiz }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Randomize question sequence and answer options
  const randomizedQuiz: PreparedQuestion[] = useMemo(() => {
    const prepared = questions.map((q) => {
      const optionsWithMeta = q.options.map((text, idx) => ({
        text,
        isCorrect: idx === q.correctIndex
      }));
      return {
        originalQuestion: q.question,
        options: shuffleArray(optionsWithMeta),
        explanation: q.explanation
      };
    });
    return shuffleArray(prepared);
  }, [questions]);

  const currentQ = randomizedQuiz[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (currentQ.options[idx]?.isCorrect) {
      setScoreCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < randomizedQuiz.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const isLastCorrect = selectedOpt !== null && currentQ.options[selectedOpt]?.isCorrect;
      const finalScoreCount = isLastCorrect ? scoreCount : scoreCount;
      const scorePct = Math.round((finalScoreCount / randomizedQuiz.length) * 100);
      onFinishQuiz(scorePct);
    }
  };

  const scorePct = Math.round((scoreCount / randomizedQuiz.length) * 100);

  if (!currentQ) return null;

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs text-slate-800 max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-emerald-700" />
          <span>Knowledge Check</span>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Question {currentIdx + 1} of {randomizedQuiz.length}
        </div>
      </div>

      {!quizFinished ? (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 leading-snug">
            {currentQ.originalQuestion}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOpt === optIdx;
              const isCorrect = opt.isCorrect;

              let optStyle = 'bg-slate-50/70 border-slate-200 hover:border-emerald-300 hover:bg-white text-slate-700';

              if (isAnswered) {
                if (isCorrect) {
                  optStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                } else if (isSelected && !isCorrect) {
                  optStyle = 'bg-rose-50 border-rose-300 text-rose-900 font-semibold';
                } else {
                  optStyle = 'bg-slate-50/50 border-slate-100 opacity-50 text-slate-400';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                >
                  <span>{opt.text}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="bg-amber-50/80 border border-amber-200/80 p-4 rounded-xl text-xs text-amber-950 space-y-1">
              <span className="font-bold text-amber-900 block">💡 Explanation:</span>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2 text-sm"
              >
                <span>{currentIdx < randomizedQuiz.length - 1 ? 'Next Question' : 'View Results'}</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="text-center py-6 space-y-4">
          <div className="text-4xl mb-2">{scorePct >= 70 ? '🌱' : '📖'}</div>
          <h3 className="text-2xl font-bold text-slate-800">Quiz Completed!</h3>
          <div className="text-3xl font-bold text-emerald-700 font-mono">{scorePct}%</div>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            {scorePct >= 70
              ? 'Great job! You have a solid grasp of this concept.'
              : 'Nice effort! Review the guide slides whenever you like to strengthen this skill.'}
          </p>

          <button
            onClick={() => onFinishQuiz(scorePct)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-8 py-3 rounded-xl shadow-xs transition-all cursor-pointer text-sm"
          >
            Finish & Record Progress
          </button>
        </div>
      )}
    </div>
  );
};
