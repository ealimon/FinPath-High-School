import React, { useState } from 'react';
import { Briefcase, Sparkles } from 'lucide-react';

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
  { title: 'Junior Software Intern', hourlyRate: 28, hoursPerWeek: 40, icon: '💻' },
  { title: 'Graphic Designer', hourlyRate: 22, hoursPerWeek: 35, icon: '🎨' },
  { title: 'Cafe Associate', hourlyRate: 16, hoursPerWeek: 25, icon: '☕' },
  { title: 'Medical Assistant', hourlyRate: 25, hoursPerWeek: 36, icon: '🏥' }
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
    <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center border border-emerald-200/80 shrink-0">
          <Briefcase className="w-5 h-5 text-emerald-800" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Paycheck & Tax Paystub Inspector</h3>
          <p className="text-xs text-slate-500">Pick a role and compare Gross Pay versus Net Take-Home Pay after withholdings.</p>
        </div>
      </div>

      {/* Career Picker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CAREERS.map((career) => (
          <button
            key={career.title}
            onClick={() => setSelectedCareer(career)}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedCareer.title === career.title
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:text-slate-800'
            }`}
          >
            <div className="text-2xl mb-1">{career.icon}</div>
            <div className="font-semibold text-xs truncate">{career.title}</div>
            <div className="text-[11px] text-emerald-700 font-mono font-bold mt-0.5">${career.hourlyRate}/hr</div>
          </button>
        ))}
      </div>

      {/* Virtual Paystub */}
      <div className="bg-[#FFFDF9] text-slate-900 rounded-2xl p-6 shadow-xs border border-amber-200/90 font-mono text-sm space-y-4">
        <div className="flex justify-between items-start border-b border-slate-200 pb-3 font-sans">
          <div>
            <div className="font-bold text-base text-slate-800">{selectedCareer.title}</div>
            <div className="text-xs text-slate-500">Standard Monthly Period (160 Hours)</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-600">Sample Paystub</div>
            <div className="text-xs text-slate-400">#STUB-2026-88</div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-3 font-sans">
          <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 font-medium">
            <span className="text-slate-700 text-xs sm:text-sm">Gross Earnings ({selectedCareer.hoursPerWeek} hrs/wk @ ${selectedCareer.hourlyRate}/hr)</span>
            <span className="text-slate-900 font-mono font-bold text-sm sm:text-base">+${grossMonthly.toFixed(2)}</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
            <div className="font-semibold text-slate-800 border-b border-slate-200 pb-1">Mandatory Withholdings:</div>
            <div className="flex justify-between">
              <span>Federal Income Tax (~10%)</span>
              <span className="font-mono text-slate-700">-${fedTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>State Income Tax (~4%)</span>
              <span className="font-mono text-slate-700">-${stateTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>FICA (Social Security & Medicare 7.65%)</span>
              <span className="font-mono text-slate-700">-${ficaTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-1.5 border-t border-slate-200 text-slate-800">
              <span>Total Withholdings</span>
              <span className="font-mono text-slate-900">-${totalDeductions.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center bg-emerald-50 p-3.5 rounded-xl border border-emerald-300 text-emerald-900">
            <span className="font-semibold text-xs sm:text-sm">Net Take-Home Pay (Direct Deposit)</span>
            <span className="font-mono font-bold text-lg sm:text-xl text-emerald-950">${netTakeHome.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onCompleteGame(50, 50)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all text-xs sm:text-sm shadow-xs cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Complete Practice & Continue</span>
        </button>
      </div>
    </div>
  );
};
