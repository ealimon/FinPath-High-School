import React, { useState } from 'react';
import { Briefcase, FileText, Sparkles, DollarSign } from 'lucide-react';

interface Props {
  onCompleteGame: (earnedCoins: number, earnedXp: number) => void;
}

interface Career {
  title: string;
  hourlyRate: number;
  hoursPerWeek: number;
  icon: string;
}

const CAREERS: Career[] = [
  { title: 'Software Engineer Intern', hourlyRate: 28, hoursPerWeek: 40, icon: '💻' },
  { title: 'Graphic Designer', hourlyRate: 22, hoursPerWeek: 35, icon: '🎨' },
  { title: 'Barista / Cafe Associate', hourlyRate: 16, hoursPerWeek: 25, icon: '☕' },
  { title: 'Registered Nurse Assistant', hourlyRate: 25, hoursPerWeek: 36, icon: '🏥' }
];

export const PaycheckBreakdownSim: React.FC<Props> = ({ onCompleteGame }) => {
  const [selectedCareer, setSelectedCareer] = useState<Career>(CAREERS[0]);

  const grossWeekly = selectedCareer.hourlyRate * selectedCareer.hoursPerWeek;
  const grossMonthly = grossWeekly * 4.33;

  // Deductions
  const fedTax = grossMonthly * 0.10; // 10%
  const stateTax = grossMonthly * 0.04; // 4%
  const ficaTax = grossMonthly * 0.0765; // 7.65% Social Security + Medicare
  const totalDeductions = fedTax + stateTax + ficaTax;

  const netTakeHome = grossMonthly - totalDeductions;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
          <Briefcase className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black">Paycheck & Tax Paystub Inspector</h3>
          <p className="text-xs text-slate-400">Pick a career path and see Gross Pay vs Net Take-Home Pay!</p>
        </div>
      </div>

      {/* Career Picker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CAREERS.map((career) => (
          <button
            key={career.title}
            onClick={() => setSelectedCareer(career)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedCareer.title === career.title
                ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-2xl mb-1">{career.icon}</div>
            <div className="font-bold text-xs truncate">{career.title}</div>
            <div className="text-[11px] text-blue-300 font-mono">${career.hourlyRate}/hr</div>
          </button>
        ))}
      </div>

      {/* Virtual Paystub */}
      <div className="bg-amber-50 text-slate-900 rounded-2xl p-6 shadow-xl border-2 border-amber-200 font-mono text-sm space-y-4">
        <div className="flex justify-between items-start border-b-2 border-slate-300 pb-3">
          <div>
            <div className="font-black text-base text-slate-900">{selectedCareer.title.toUpperCase()}</div>
            <div className="text-xs text-slate-500 font-sans">Pay Period: Monthly (160 Hours)</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-slate-600">EMPLOYER PAYSTUB</div>
            <div className="text-xs text-slate-500">ID: #STUB-2026-88</div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-2 font-sans">
          <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-300 font-bold">
            <span className="text-slate-800">Gross Monthly Income ({selectedCareer.hoursPerWeek} hrs/wk @ ${selectedCareer.hourlyRate}/hr)</span>
            <span className="text-emerald-700 font-mono text-base">+${grossMonthly.toFixed(2)}</span>
          </div>

          <div className="p-3 bg-slate-100 rounded-lg border border-slate-300 space-y-1.5 text-xs text-slate-700">
            <div className="font-bold text-slate-800 mb-1 border-b pb-1">Mandatory Tax Withholdings:</div>
            <div className="flex justify-between">
              <span>Federal Income Tax (10%)</span>
              <span className="font-mono text-red-600">-${fedTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>State Income Tax (4%)</span>
              <span className="font-mono text-red-600">-${stateTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>FICA (Social Security + Medicare 7.65%)</span>
              <span className="font-mono text-red-600">-${ficaTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-1 border-t border-slate-300 text-slate-900">
              <span>Total Deductions</span>
              <span className="font-mono text-red-700">-${totalDeductions.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center bg-emerald-100 p-3 rounded-lg border-2 border-emerald-400 font-black text-base text-emerald-950">
            <span>NET TAKE-HOME PAY (DIRECT DEPOSIT)</span>
            <span className="font-mono text-xl">${netTakeHome.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onCompleteGame(50, 50)}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all shadow-lg cursor-pointer hover:scale-105"
        >
          <Sparkles className="w-5 h-5" />
          Complete Paycheck Challenge (+50 Coins & +50 XP)
        </button>
      </div>
    </div>
  );
};
