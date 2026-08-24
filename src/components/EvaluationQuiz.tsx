import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  onFinishQuiz: (scorePercent: number) => void;
}

export const EvaluationQuiz: React.FC<Props> = ({ questions, onFinishQuiz }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScoreCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const scorePct = Math.round(((scoreCount + (selectedOpt === currentQ.correctIndex ? 0 : 0)) / questions.length) * 100);
      onFinishQuiz(scorePct);
    }
  };

  const scorePct = Math.round((scoreCount / questions.length) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-white max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-cyan-400 font-black text-xs uppercase tracking-wider">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <span>EVALUATION QUIZ</span>
        </div>
        <div className="text-xs text-slate-400 font-mono font-bold">
          Question {currentIdx + 1} of {questions.length}
        </div>
      </div>

      {!quizFinished ? (
        <div className="space-y-6">
          <h3 className="text-xl font-black text-white leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((optionText, optIdx) => {
              let optStyle = 'bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-200';

              if (isAnswered) {
                if (optIdx === currentQ.correctIndex) {
                  optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                } else if (selectedOpt === optIdx) {
                  optStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold';
                } else {
                  optStyle = 'bg-slate-900 border-slate-800 opacity-50 text-slate-500';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-sm transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                >
                  <span>{optionText}</span>
                  {isAnswered && optIdx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && selectedOpt === optIdx && optIdx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="bg-slate-800/90 border border-cyan-800/60 p-4 rounded-2xl text-xs text-slate-300 space-y-1">
              <span className="font-bold text-cyan-400 block">💡 Explanation:</span>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3 rounded-2xl shadow-lg transition-all hover:scale-105 cursor-pointer flex items-center gap-2 text-sm"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <Sparkles className="w-4 h-4 fill-slate-950" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="text-center py-6 space-y-4">
          <div className="text-5xl mb-2">{scorePct >= 70 ? '🎉' : '📚'}</div>
          <h3 className="text-2xl font-black text-white">Evaluation Complete!</h3>
          <div className="text-3xl font-black text-cyan-400 font-mono">{scorePct}% Score</div>
          <p className="text-sm text-slate-300 max-w-sm mx-auto">
            {scorePct >= 70
              ? 'Awesome job! You demonstrated solid financial knowledge and unlocked the badge claim step!'
              : 'Good try! Review the tutorial book slides and try again to unlock your badge!'}
          </p>

          <button
            onClick={() => onFinishQuiz(scorePct)}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer text-sm"
          >
            Continue to Badges
          </button>
        </div>
      )}
    </div>
  );
};
