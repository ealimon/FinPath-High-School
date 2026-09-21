import React, { useState } from 'react';
import { Calculator, TrendingUp, Car, GraduationCap, Home } from 'lucide-react';

export const CalculatorsView: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<'roth' | 'auto' | 'college' | 'apartment'>('roth');

  // 1. Roth IRA State
  const [rothStartAge, setRothStartAge] = useState<number>(18);
  const [rothMonthly, setRothMonthly] = useState<number>(200);
  const [rothReturnRate, setRothReturnRate] = useState<number>(8);

  const rothYears = 65 - rothStartAge;
  const rothMonths = rothYears * 12;
  const monthlyRate = rothReturnRate / 100 / 12;
  const rothFinalWealth = Math.round(
    rothMonthly * (((Math.pow(1 + monthlyRate, rothMonths) - 1) / monthlyRate))
  );
  const totalContributed = rothMonthly * rothMonths;
  const totalInterestEarned = Math.max(0, rothFinalWealth - totalContributed);

  // 2. Auto Loan State
  const [carPrice, setCarPrice] = useState<number>(18000);
  const [downPayment, setDownPayment] = useState<number>(3000);
  const [carApr, setCarApr] = useState<number>(7.5);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(48);

  const loanPrincipal = Math.max(0, carPrice - downPayment);
  const carMonthlyRate = carApr / 100 / 12;
  const carMonthlyPayment = Math.round(
    carMonthlyRate === 0
      ? loanPrincipal / loanTermMonths
      : (loanPrincipal * carMonthlyRate * Math.pow(1 + carMonthlyRate, loanTermMonths)) /
          (Math.pow(1 + carMonthlyRate, loanTermMonths) - 1)
  );
  const totalAutoPaid = carMonthlyPayment * loanTermMonths;
  const totalAutoInterest = Math.max(0, totalAutoPaid - loanPrincipal);
  const estimatedInsurance = 175; // Average young adult monthly rate
  const totalMonthlyAuto = carMonthlyPayment + estimatedInsurance;

  // 3. Student Loans State
  const [studentDebt, setStudentDebt] = useState<number>(25000);
  const [studentApr, setStudentApr] = useState<number>(5.5);
  const [expectedSalary, setExpectedSalary] = useState<number>(55000);

  const studentMonthlyRate = studentApr / 100 / 12;
  const studentTermMonths = 120; // 10 years
  const studentMonthlyPayment = Math.round(
    (studentDebt * studentMonthlyRate * Math.pow(1 + studentMonthlyRate, studentTermMonths)) /
      (Math.pow(1 + studentMonthlyRate, studentTermMonths) - 1)
  );
  const grossMonthlySalary = Math.round(expectedSalary / 12);
  const debtToIncomeRatio = Math.round((studentMonthlyPayment / grossMonthlySalary) * 100);

  // 4. Apartment Renting State
  const [monthlyRent, setMonthlyRent] = useState<number>(1400);
  const [numRoommates, setNumRoommates] = useState<number>(2);
  const [utilities, setUtilities] = useState<number>(180);

  const upfrontMoveInCash = monthlyRent * 3; // First + Last + Security Deposit
  const totalMonthlyHousing = monthlyRent + utilities;
  const perPersonMonthlyHousing = Math.round(totalMonthlyHousing / numRoommates);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Calculators</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Financial Planning Tools</h2>
          <p className="text-sm text-slate-600 mt-1">
            Explore how numbers work in real life: investing early, buying a car, managing student debt, and renting an apartment.
          </p>
        </div>
      </div>

      {/* CALCULATOR TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveCalc('roth')}
          className={`p-4 rounded-2xl border text-left font-semibold text-xs transition-all cursor-pointer flex items-center gap-3 ${
            activeCalc === 'roth'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <TrendingUp className="w-4 h-4 shrink-0" />
          <span>Roth IRA Growth</span>
        </button>

        <button
          onClick={() => setActiveCalc('auto')}
          className={`p-4 rounded-2xl border text-left font-semibold text-xs transition-all cursor-pointer flex items-center gap-3 ${
            activeCalc === 'auto'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Car className="w-4 h-4 shrink-0" />
          <span>Car Financing</span>
        </button>

        <button
          onClick={() => setActiveCalc('college')}
          className={`p-4 rounded-2xl border text-left font-semibold text-xs transition-all cursor-pointer flex items-center gap-3 ${
            activeCalc === 'college'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4 shrink-0" />
          <span>Student Loans</span>
        </button>

        <button
          onClick={() => setActiveCalc('apartment')}
          className={`p-4 rounded-2xl border text-left font-semibold text-xs transition-all cursor-pointer flex items-center gap-3 ${
            activeCalc === 'apartment'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Home className="w-4 h-4 shrink-0" />
          <span>First Apartment</span>
        </button>
      </div>

      {/* ROTH IRA CALCULATOR */}
      {activeCalc === 'roth' && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-800">Roth IRA Compound Growth Calculator</h3>
            <p className="text-xs text-slate-500 mt-0.5">See how investing early allows modest monthly deposits to grow significantly by age 65 tax-free.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80">
              <div>
                <label className="text-xs font-semibold text-slate-700 justify-between flex mb-2">
                  <span>Starting Age</span>
                  <span className="text-emerald-700 font-mono font-bold">{rothStartAge} years old</span>
                </label>
                <input
                  type="range"
                  min={18}
                  max={45}
                  value={rothStartAge}
                  onChange={(e) => setRothStartAge(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 justify-between flex mb-2">
                  <span>Monthly Contribution</span>
                  <span className="text-emerald-700 font-mono font-bold">${rothMonthly} / month</span>
                </label>
                <input
                  type="range"
                  min={25}
                  max={600}
                  step={25}
                  value={rothMonthly}
                  onChange={(e) => setRothMonthly(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 justify-between flex mb-2">
                  <span>Expected Annual Market Return (S&P 500 average ~8-10%)</span>
                  <span className="text-emerald-700 font-mono font-bold">{rothReturnRate}% APY</span>
                </label>
                <input
                  type="range"
                  min={4}
                  max={12}
                  step={0.5}
                  value={rothReturnRate}
                  onChange={(e) => setRothReturnRate(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-200/80 p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase text-emerald-800 tracking-wider">Estimated Balance at Age 65</div>
                <div className="text-4xl sm:text-5xl font-bold text-slate-800 mt-2 font-mono">${rothFinalWealth.toLocaleString()}</div>
                <div className="text-xs text-emerald-700 font-medium mt-1">100% Tax-Free Growth and Retirement Withdrawals</div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-200/60">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Your Total Deposits</div>
                  <div className="text-lg font-bold text-slate-700 font-mono">${totalContributed.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-emerald-800 font-medium">Compound Growth</div>
                  <div className="text-lg font-bold text-emerald-700 font-mono">+${totalInterestEarned.toLocaleString()}</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-emerald-200/60 text-xs text-slate-600">
                💡 <strong>Takeaway:</strong> Starting at age {rothStartAge} instead of 30 gives your money {rothYears} years to compound. Most of your final balance comes from interest growth, not out-of-pocket deposits!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTO FINANCING CALCULATOR */}
      {activeCalc === 'auto' && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-800">First Car Financing Estimator</h3>
            <p className="text-xs text-slate-500 mt-0.5">Calculate monthly loan payments plus realistic young driver insurance costs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80">
              <div>
                <label className="text-xs font-semibold text-slate-700 justify-between flex mb-2">
                  <span>Vehicle Purchase Price</span>
                  <span className="text-emerald-700 font-mono font-bold">${carPrice.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={5000}
                  max={35000}
                  step={500}
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 justify-between flex mb-2">
                  <span>Down Payment</span>
                  <span className="text-emerald-700 font-mono font-bold">${downPayment.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={500}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Loan Interest (APR)</label>
                  <select
                    value={carApr}
                    onChange={(e) => setCarApr(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-800"
                  >
                    <option value={4.5}>4.5% (Excellent Credit 750+)</option>
                    <option value={7.5}>7.5% (Good Credit 700+)</option>
                    <option value={12.0}>12.0% (First-Time Buyer)</option>
                    <option value={18.0}>18.0% (High Risk)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Loan Term</label>
                  <select
                    value={loanTermMonths}
                    onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-800"
                  >
                    <option value={36}>36 Months (3 Years)</option>
                    <option value={48}>48 Months (4 Years)</option>
                    <option value={60}>60 Months (5 Years)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/80 p-6 rounded-2xl space-y-4 justify-between flex flex-col">
              <div>
                <div className="text-xs font-semibold uppercase text-slate-600 tracking-wider">Estimated Total Monthly Cost</div>
                <div className="text-4xl sm:text-5xl font-bold text-slate-800 mt-2 font-mono">${totalMonthlyAuto} / mo</div>
                <div className="text-xs text-slate-500 mt-1">Includes ${carMonthlyPayment}/mo loan payment + ~${estimatedInsurance}/mo insurance</div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-200 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Loan Principal Financed:</span>
                  <span className="font-mono font-bold text-slate-800">${loanPrincipal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Interest Over {loanTermMonths} Months:</span>
                  <span className="font-mono font-bold text-amber-700">${totalAutoInterest.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600">
                💡 <strong>Helpful Tip:</strong> Buying a reliable 3–5 year old certified pre-owned car minimizes initial depreciation while keeping insurance and loan payments manageable.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT LOAN CALCULATOR */}
      {activeCalc === 'college' && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-800">Student Loan Repayment & Salary Ratio</h3>
            <p className="text-xs text-slate-500 mt-0.5">Evaluate standard 10-year repayment amounts against your expected starting salary.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80">
              <div>
                <label className="text-xs font-semibold text-slate-700 justify-between flex mb-2">
                  <span>Total Student Loan Debt</span>
                  <span className="text-emerald-700 font-mono font-bold">${studentDebt.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={5000}
                  max={80000}
                  step={2500}
                  value={studentDebt}
                  onChange={(e) => setStudentDebt(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 justify-between flex mb-2">
                  <span>Expected Starting Annual Salary</span>
                  <span className="text-emerald-700 font-mono font-bold">${expectedSalary.toLocaleString()} / yr</span>
                </label>
                <input
                  type="range"
                  min={30000}
                  max={120000}
                  step={2500}
                  value={expectedSalary}
                  onChange={(e) => setExpectedSalary(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 space-y-4 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold uppercase text-slate-600 tracking-wider">Estimated Monthly Payment (10-Year Plan)</div>
                <div className="text-4xl font-bold text-slate-800 mt-2 font-mono">${studentMonthlyPayment} / mo</div>
                <div className="text-xs text-slate-500 mt-1">Takes up ~{debtToIncomeRatio}% of gross monthly income (${grossMonthlySalary}/mo)</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="font-bold text-slate-800">Golden Rule of College Loans:</div>
                <p className="text-slate-600 leading-relaxed">
                  Try to keep your total student debt below your expected first-year salary. Keeping loan payments under 10% of monthly income leaves plenty of room for rent, groceries, and personal savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APARTMENT BUDGET CALCULATOR */}
      {activeCalc === 'apartment' && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-800">First Apartment & Moving Expense Estimator</h3>
            <p className="text-xs text-slate-500 mt-0.5">Calculate upfront move-in cash (first, last, and security deposit) plus monthly expense splits.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80">
              <div>
                <label className="text-xs font-semibold text-slate-700 justify-between flex mb-2">
                  <span>Monthly Apartment Rent</span>
                  <span className="text-emerald-700 font-mono font-bold">${monthlyRent.toLocaleString()} / mo</span>
                </label>
                <input
                  type="range"
                  min={800}
                  max={3000}
                  step={50}
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 justify-between flex mb-2">
                  <span>Number of People Splitting Costs</span>
                  <span className="text-emerald-700 font-mono font-bold">{numRoommates} people</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={numRoommates}
                  onChange={(e) => setNumRoommates(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 space-y-4 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold uppercase text-slate-600 tracking-wider">Your Monthly Share</div>
                <div className="text-4xl font-bold text-slate-800 mt-2 font-mono">${perPersonMonthlyHousing} / mo</div>
                <div className="text-xs text-slate-500 mt-1">Includes rent share (${Math.round(monthlyRent / numRoommates)}) + utilities share (${Math.round(utilities / numRoommates)})</div>
              </div>

              <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200/80 space-y-1 text-xs">
                <div className="font-bold text-amber-900">Upfront Cash Needed Before Moving In:</div>
                <div className="text-2xl font-bold text-amber-950 font-mono">${upfrontMoveInCash.toLocaleString()}</div>
                <div className="text-amber-800 text-[11px]">(First Month + Last Month + Security Deposit)</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
