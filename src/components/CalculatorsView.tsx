import React, { useState } from 'react';
import { Calculator, TrendingUp, Car, GraduationCap, Home, DollarSign, ArrowRight } from 'lucide-react';

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
  const estimatedInsurance = 175; // Average teen/young adult monthly rate
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
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-cyan-950 text-cyan-300 border border-cyan-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span>FINANCIAL DECISION TOOLKIT</span>
          </div>
          <h2 className="text-3xl font-black text-white">Interactive Life Calculators</h2>
          <p className="text-sm text-slate-300 mt-1">
            Run real-world financial projections for investing, buying a car, college loans, and renting your first apartment!
          </p>
        </div>
      </div>

      {/* CALCULATOR TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveCalc('roth')}
          className={`p-4 rounded-2xl border text-left font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-3 ${
            activeCalc === 'roth'
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg scale-102'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <TrendingUp className="w-5 h-5 shrink-0" />
          <span>Roth IRA Compounder</span>
        </button>

        <button
          onClick={() => setActiveCalc('auto')}
          className={`p-4 rounded-2xl border text-left font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-3 ${
            activeCalc === 'auto'
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg scale-102'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Car className="w-5 h-5 shrink-0" />
          <span>Car Financing</span>
        </button>

        <button
          onClick={() => setActiveCalc('college')}
          className={`p-4 rounded-2xl border text-left font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-3 ${
            activeCalc === 'college'
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg scale-102'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <GraduationCap className="w-5 h-5 shrink-0" />
          <span>Student Loan Repayment</span>
        </button>

        <button
          onClick={() => setActiveCalc('apartment')}
          className={`p-4 rounded-2xl border text-left font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-3 ${
            activeCalc === 'apartment'
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg scale-102'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Home className="w-5 h-5 shrink-0" />
          <span>Apartment Budgeter</span>
        </button>
      </div>

      {/* ROTH IRA CALCULATOR */}
      {activeCalc === 'roth' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-black text-cyan-300">Roth IRA Compound Wealth Growth Calculator</h3>
            <p className="text-xs text-slate-400">See how investing early in an S&P 500 index fund turns small monthly deposits into millions tax-free by age 65.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
              <div>
                <label className="text-xs font-bold text-slate-300 justify-between flex mb-2">
                  <span>Starting Age</span>
                  <span className="text-cyan-400 font-mono font-black">{rothStartAge} years old</span>
                </label>
                <input
                  type="range"
                  min={18}
                  max={45}
                  value={rothStartAge}
                  onChange={(e) => setRothStartAge(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 justify-between flex mb-2">
                  <span>Monthly Investment Contribution</span>
                  <span className="text-cyan-400 font-mono font-black">${rothMonthly}/month</span>
                </label>
                <input
                  type="range"
                  min={25}
                  max={600}
                  step={25}
                  value={rothMonthly}
                  onChange={(e) => setRothMonthly(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 justify-between flex mb-2">
                  <span>Expected Annual Market Return (S&P 500 average ~8-10%)</span>
                  <span className="text-cyan-400 font-mono font-black">{rothReturnRate}% APY</span>
                </label>
                <input
                  type="range"
                  min={4}
                  max={12}
                  step={0.5}
                  value={rothReturnRate}
                  onChange={(e) => setRothReturnRate(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/30 p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-black uppercase text-cyan-400 tracking-wider">PROJECTED ROTH IRA BALANCE AT AGE 65</div>
                <div className="text-4xl sm:text-5xl font-black text-white mt-2 font-mono">${rothFinalWealth.toLocaleString()}</div>
                <div className="text-xs text-emerald-400 font-bold mt-1">100% Tax-Free Growth & Retirement Withdrawals!</div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-[11px] text-slate-400 font-bold">Your Total Deposits</div>
                  <div className="text-lg font-black text-slate-200 font-mono">${totalContributed.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[11px] text-emerald-400 font-bold">Compound Interest Growth</div>
                  <div className="text-lg font-black text-emerald-400 font-mono">+${totalInterestEarned.toLocaleString()}</div>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                💡 <strong>Key Takeaway:</strong> Starting at age {rothStartAge} instead of 30 gives your money {rothYears} full years to compound. Over 80% of your final balance comes purely from interest growth!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTO FINANCING CALCULATOR */}
      {activeCalc === 'auto' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-black text-cyan-300">First Car Financing & Total Cost Estimator</h3>
            <p className="text-xs text-slate-400">Calculate total monthly costs including auto loan principal, interest, and young driver insurance premiums.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
              <div>
                <label className="text-xs font-bold text-slate-300 justify-between flex mb-2">
                  <span>Vehicle Purchase Price</span>
                  <span className="text-cyan-400 font-mono font-black">${carPrice.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={5000}
                  max={35000}
                  step={500}
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 justify-between flex mb-2">
                  <span>Cash Down Payment</span>
                  <span className="text-cyan-400 font-mono font-black">${downPayment.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={500}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Loan Interest (APR)</label>
                  <select
                    value={carApr}
                    onChange={(e) => setCarApr(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  >
                    <option value={4.5}>4.5% (Excellent Credit 750+)</option>
                    <option value={7.5}>7.5% (Good Credit 700+)</option>
                    <option value={12.0}>12.0% (First-Time Buyer / Fair Credit)</option>
                    <option value={18.0}>18.0% (Poor Credit / High Risk)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Loan Duration</label>
                  <select
                    value={loanTermMonths}
                    onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  >
                    <option value={36}>36 Months (3 Years)</option>
                    <option value={48}>48 Months (4 Years)</option>
                    <option value={60}>60 Months (5 Years)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 justify-between flex flex-col">
              <div>
                <div className="text-xs font-black uppercase text-cyan-400 tracking-wider">TOTAL ESTIMATED MONTHLY VEHICLE OUTFLOW</div>
                <div className="text-4xl sm:text-5xl font-black text-white mt-2 font-mono">${totalMonthlyAuto}/mo</div>
                <div className="text-xs text-slate-400 mt-1">Includes ${carMonthlyPayment}/mo auto loan + ~${estimatedInsurance}/mo estimated insurance</div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Loan Amount Financed:</span>
                  <span className="font-mono font-bold">${loanPrincipal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-rose-400">
                  <span>Total Loan Interest Paid ({loanTermMonths} mos):</span>
                  <span className="font-mono font-bold">${totalAutoInterest.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                💡 <strong>High School Auto Tip:</strong> Buying a reliable $10,000-$15,000 used car with a larger down payment saves thousands in loan interest compared to financing a brand new $30,000 vehicle.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT LOAN CALCULATOR */}
      {activeCalc === 'college' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-black text-cyan-300">Student Loan Debt Repayment & Salary Ratio</h3>
            <p className="text-xs text-slate-400">Calculate standard 10-year repayment payments and evaluate post-graduation salary debt ratios.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
              <div>
                <label className="text-xs font-bold text-slate-300 justify-between flex mb-2">
                  <span>Total Student Loan Debt</span>
                  <span className="text-cyan-400 font-mono font-black">${studentDebt.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={5000}
                  max={80000}
                  step={2500}
                  value={studentDebt}
                  onChange={(e) => setStudentDebt(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 justify-between flex mb-2">
                  <span>Expected Starting Annual Career Salary</span>
                  <span className="text-cyan-400 font-mono font-black">${expectedSalary.toLocaleString()}/yr</span>
                </label>
                <input
                  type="range"
                  min={30000}
                  max={120000}
                  step={2500}
                  value={expectedSalary}
                  onChange={(e) => setExpectedSalary(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="text-xs font-black uppercase text-cyan-400 tracking-wider">MONTHLY STUDENT LOAN REPAYMENT (10-YEAR STANDARD)</div>
                <div className="text-4xl font-black text-white mt-2 font-mono">${studentMonthlyPayment}/mo</div>
                <div className="text-xs text-slate-400 mt-1">Consumes ~{debtToIncomeRatio}% of gross monthly salary (${grossMonthlySalary}/mo)</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-white">Rule of Thumb for Student Loans:</div>
                <p className="text-slate-300">
                  Try to keep your total student loan debt BELOW your expected first-year career salary. Keeping loan payments under 10% of gross salary ensures you can afford rent, groceries, and savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APARTMENT BUDGET CALCULATOR */}
      {activeCalc === 'apartment' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-black text-cyan-300">First Apartment & Living Expense Estimator</h3>
            <p className="text-xs text-slate-400">Calculate upfront cash needed for move-in (security deposits + rent) and roommate expense splits.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
              <div>
                <label className="text-xs font-bold text-slate-300 justify-between flex mb-2">
                  <span>Total Monthly Rent for Apartment</span>
                  <span className="text-cyan-400 font-mono font-black">${monthlyRent.toLocaleString()}/mo</span>
                </label>
                <input
                  type="range"
                  min={800}
                  max={3000}
                  step={50}
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 justify-between flex mb-2">
                  <span>Number of Roommates Sharing Costs</span>
                  <span className="text-cyan-400 font-mono font-black">{numRoommates} people total</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={numRoommates}
                  onChange={(e) => setNumRoommates(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="text-xs font-black uppercase text-cyan-400 tracking-wider">YOUR INDIVIDUAL MONTHLY HOUSING SHARE</div>
                <div className="text-4xl font-black text-white mt-2 font-mono">${perPersonMonthlyHousing}/mo</div>
                <div className="text-xs text-slate-400 mt-1">Includes rent share (${Math.round(monthlyRent / numRoommates)}) + utilities share (${Math.round(utilities / numRoommates)})</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="font-bold text-amber-300">Upfront Cash Needed Before Moving In:</div>
                <div className="text-2xl font-black text-white font-mono">${upfrontMoveInCash.toLocaleString()}</div>
                <div className="text-slate-400 text-[11px]">(First Month Rent + Last Month Rent + Security Deposit)</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
