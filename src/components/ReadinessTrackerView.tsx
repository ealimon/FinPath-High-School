import React from 'react';
import { Award, CheckCircle2, FileText, Landmark, CreditCard, GraduationCap, Car, Home, TrendingUp, ShieldCheck } from 'lucide-react';
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
      description: 'Understanding federal and state withholding, FICA taxes (7.65%), and Form W-2.',
      status: completedModuleIds.includes(1) ? 'Mastered' : 'Not Started',
      iconName: 'FileText',
      keySkills: ['Form W-4 Setup', 'Gross vs Net Pay', 'Understanding W-2']
    },
    {
      moduleId: 2,
      category: 'Banking & Cash',
      title: 'Debit Cards & Account Security',
      description: 'Opting out of overdraft fees, writing checks, and high-yield savings benefits.',
      status: completedModuleIds.includes(2) ? 'Mastered' : 'Not Started',
      iconName: 'Landmark',
      keySkills: ['Overdraft Protection', 'Debit vs Credit Cards', 'Emergency Savings']
    },
    {
      moduleId: 3,
      category: 'Budgeting',
      title: '50/30/20 Budgeting Plan',
      description: 'Balancing essential needs, personal wants, and future savings.',
      status: completedModuleIds.includes(3) ? 'Mastered' : 'Not Started',
      iconName: 'PieChart',
      keySkills: ['Fixed vs Variable Costs', '50/30/20 Rule', 'Emergency Fund']
    },
    {
      moduleId: 4,
      category: 'Credit & Debt',
      title: 'Credit Score & Responsible Cards',
      description: 'Building a strong credit score while avoiding high interest charges.',
      status: completedModuleIds.includes(4) ? 'Mastered' : 'Not Started',
      iconName: 'CreditCard',
      keySkills: ['Payment History (35%)', 'Low Credit Utilization', 'Paying Full Balance']
    },
    {
      moduleId: 5,
      category: 'Higher Education',
      title: 'FAFSA & Student Aid',
      description: 'Evaluating grants, subsidized vs unsubsidized loans, and career salary ratios.',
      status: completedModuleIds.includes(5) ? 'Mastered' : 'Not Started',
      iconName: 'GraduationCap',
      keySkills: ['FAFSA Deadlines', 'Grant Opportunities', 'Debt-to-Salary Ratio']
    },
    {
      moduleId: 6,
      category: 'Transportation',
      title: 'Car Buying & Insurance Costs',
      description: 'Auto loans, certified pre-owned advantages, and young driver insurance premiums.',
      status: completedModuleIds.includes(6) ? 'Mastered' : 'Not Started',
      iconName: 'Car',
      keySkills: ['Total Cost of Ownership', 'Auto Loan APR', 'Insurance Deductibles']
    },
    {
      moduleId: 7,
      category: 'Housing',
      title: 'Apartments & Living on Your Own',
      description: 'Understanding leases, budgeting security deposits, and sharing roommate costs.',
      status: completedModuleIds.includes(7) ? 'Mastered' : 'Not Started',
      iconName: 'Home',
      keySkills: ['Lease Agreements', 'Security Deposits', 'Utility Splitting']
    },
    {
      moduleId: 8,
      category: 'Investing',
      title: 'Roth IRA & Compound Growth',
      description: 'Investing early in broad index funds for tax-free compounding.',
      status: completedModuleIds.includes(8) ? 'Mastered' : 'Not Started',
      iconName: 'TrendingUp',
      keySkills: ['Tax-Free Growth', 'Index Fund Diversification', 'Long-term Compounding']
    }
  ];

  const masteredCount = metrics.filter(m => m.status === 'Mastered').length;
  const readinessPercentage = Math.round((masteredCount / metrics.length) * 100);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-5 h-5 text-emerald-700" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-emerald-700" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-emerald-700" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-emerald-700" />;
      case 'Car': return <Car className="w-5 h-5 text-emerald-700" />;
      case 'Home': return <Home className="w-5 h-5 text-emerald-700" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-700" />;
      default: return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>Personal Financial Readiness</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Life Skills Scorecard</h2>
            <p className="text-sm text-slate-600 mt-1">
              Track essential financial competencies as you prepare for independence, college, or your career.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center min-w-[150px]">
            <div className="text-3xl font-bold text-emerald-700 font-mono">{readinessPercentage}%</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">Overall Readiness</div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-slate-600">
            <span>Competencies Mastered: <strong className="text-slate-800">{masteredCount} of {metrics.length}</strong></span>
            <span className="font-semibold text-emerald-800">{readinessPercentage}% Complete</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${readinessPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((m) => {
          const isMastered = m.status === 'Mastered';

          return (
            <div
              key={m.moduleId}
              className={`p-5 rounded-2xl border transition-all bg-white ${
                isMastered
                  ? 'border-emerald-200/90 shadow-xs'
                  : 'border-slate-200/80'
              }`}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    {getIconComponent(m.iconName)}
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">{m.category}</span>
                    <h4 className="text-sm font-bold text-slate-800">{m.title}</h4>
                  </div>
                </div>

                {isMastered ? (
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mastered</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onNavigateToModule(m.moduleId)}
                    className="text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer shrink-0"
                  >
                    Start Lesson
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-500 mt-3 leading-relaxed">{m.description}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                {m.keySkills.map((skill, idx) => (
                  <span key={idx} className="bg-slate-50 text-slate-600 text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-slate-200/60">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
