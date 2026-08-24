import React from 'react';
import { Award, CheckCircle2, Circle, GraduationCap, ShieldCheck, FileText, Landmark, CreditCard, Car, Home, TrendingUp, ShieldAlert } from 'lucide-react';
import { ReadinessMetric } from '../types';

interface ReadinessTrackerViewProps {
  completedModuleIds: number[];
  onNavigateToModule: (moduleId: number) => void;
}

export const ReadinessTrackerView: React.FC<ReadinessTrackerViewProps> = ({
  completedModuleIds,
  onNavigateToModule,
}) => {
  const metrics: (ReadinessMetric & { moduleId: number })[] = [
    {
      moduleId: 1,
      category: 'Taxes & Payroll',
      title: 'First Job W-4 & Paycheck Mastery',
      description: 'Understanding federal/state withholding, FICA taxes (7.65%), and filing Form 1040.',
      status: completedModuleIds.includes(1) ? 'Mastered' : 'Not Started',
      iconName: 'FileText',
      keySkills: ['Form W-4 Filling', 'Gross vs Net Pay', 'Form W-2 Reading']
    },
    {
      moduleId: 2,
      category: 'Banking & Cash',
      title: 'Debit Card & Overdraft Protection',
      description: 'Opting out of $35 overdraft fee traps and utilizing High-Yield Savings Accounts (HYSA).',
      status: completedModuleIds.includes(2) ? 'Mastered' : 'Not Started',
      iconName: 'Landmark',
      keySkills: ['Overdraft Opt-Out', 'Debit vs Credit Cards', '4.5% APY Savings']
    },
    {
      moduleId: 3,
      category: 'Budgeting',
      title: '50/30/20 Real-World Budget Plan',
      description: 'Structuring income into Needs, Wants, and emergency savings.',
      status: completedModuleIds.includes(3) ? 'Mastered' : 'Not Started',
      iconName: 'PieChart',
      keySkills: ['Fixed vs Variable Costs', '50/30/20 Allocation', 'Emergency Reserve']
    },
    {
      moduleId: 4,
      category: 'Credit & Debt',
      title: 'Credit Score (FICO) & Debt Prevention',
      description: 'Building a 750+ credit score while avoiding 24% APR interest charges.',
      status: completedModuleIds.includes(4) ? 'Mastered' : 'Not Started',
      iconName: 'CreditCard',
      keySkills: ['35% Payment History', '30% Utilization Rule', 'Zero-Interest Grace Period']
    },
    {
      moduleId: 5,
      category: 'College Aid',
      title: 'FAFSA & Student Debt Management',
      description: 'Maximizing Pell Grants, evaluating award letters, and managing loan repayment.',
      status: completedModuleIds.includes(5) ? 'Mastered' : 'Not Started',
      iconName: 'GraduationCap',
      keySkills: ['FAFSA Grants', 'Subsidized vs Unsubsidized', 'Debt-to-Salary Ratio']
    },
    {
      moduleId: 6,
      category: 'Auto Ownership',
      title: 'Car Financing & Auto Insurance',
      description: 'Understanding auto loan APR, buying used vs leasing, and insurance deductibles.',
      status: completedModuleIds.includes(6) ? 'Mastered' : 'Not Started',
      iconName: 'Car',
      keySkills: ['Auto Loan Interest', 'Premiums vs Deductibles', 'Total Cost of Ownership']
    },
    {
      moduleId: 7,
      category: 'Housing',
      title: 'Apartment Leases & Utilities',
      description: 'Reviewing lease contracts, budgeting move-in security deposits, and splitting utility bills.',
      status: completedModuleIds.includes(7) ? 'Mastered' : 'Not Started',
      iconName: 'Home',
      keySkills: ['Lease Agreement Terms', 'Security Deposit Refunds', 'Roommate Cost Splits']
    },
    {
      moduleId: 8,
      category: 'Investing',
      title: 'Roth IRA at 18 & Compound Growth',
      description: 'Building tax-free wealth in S&P 500 index funds over a 40-year horizon.',
      status: completedModuleIds.includes(8) ? 'Mastered' : 'Not Started',
      iconName: 'TrendingUp',
      keySkills: ['Roth IRA Tax-Free Advantage', 'Index Fund Diversification', 'Compound Growth Math']
    }
  ];

  const masteredCount = metrics.filter(m => m.status === 'Mastered').length;
  const readinessPercentage = Math.round((masteredCount / metrics.length) * 100);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-5 h-5 text-cyan-400" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-cyan-400" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-cyan-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      case 'Car': return <Car className="w-5 h-5 text-cyan-400" />;
      case 'Home': return <Home className="w-5 h-5 text-cyan-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      default: return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>HIGH SCHOOL ADULTING READINESS</span>
            </div>
            <h2 className="text-3xl font-black text-white">Financial Independence Scorecard</h2>
            <p className="text-sm text-slate-300 mt-1">
              Track your essential adulting financial competencies as you prepare for college, trade school, or the workforce.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center min-w-[160px]">
            <div className="text-3xl font-black text-emerald-400 font-mono">{readinessPercentage}%</div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Adulting Readiness</div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>Competencies Mastered ({masteredCount} of {metrics.length})</span>
            <span>{readinessPercentage}% Ready</span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${readinessPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((m) => (
          <div
            key={m.moduleId}
            className={`p-5 rounded-2xl border transition-all ${
              m.status === 'Mastered'
                ? 'bg-slate-900/90 border-emerald-500/40 text-white'
                : 'bg-slate-900/60 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  {getIconComponent(m.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">{m.category}</span>
                  <h4 className="text-base font-black text-white">{m.title}</h4>
                </div>
              </div>

              {m.status === 'Mastered' ? (
                <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mastered</span>
                </div>
              ) : (
                <button
                  onClick={() => onNavigateToModule(m.moduleId)}
                  className="text-xs font-black text-cyan-300 hover:text-white bg-slate-950 hover:bg-cyan-600 px-3 py-1.5 rounded-xl border border-slate-800 transition-all cursor-pointer"
                >
                  Start Lesson
                </button>
              )}
            </div>

            <p className="text-xs text-slate-400 mt-3">{m.description}</p>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
              {m.keySkills.map((skill, idx) => (
                <span key={idx} className="bg-slate-950 text-slate-300 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-slate-800">
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
