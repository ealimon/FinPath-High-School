import React, { useState } from 'react';
import { Landmark, CreditCard, CheckCircle2, ArrowRightLeft, DollarSign, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onCompleteGame: (earnedCoins: number, earnedXp: number) => void;
}

export const CheckWriterAndATM: React.FC<Props> = ({ onCompleteGame }) => {
  const [activeTab, setActiveTab] = useState<'check' | 'atm'>('check');

  // Check state
  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [signature, setSignature] = useState('');
  const [checkProcessed, setCheckProcessed] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // ATM Account balances
  const [checkingBalance, setCheckingBalance] = useState(1250.00);
  const [savingsBalance, setSavingsBalance] = useState(500.00);
  const [atmMessage, setAtmMessage] = useState('Welcome! Select an option below to practice managing your funds.');
  const [completedSteps, setCompletedSteps] = useState<{ checkWritten: boolean; atmDeposit: boolean; savingsTransfer: boolean }>({
    checkWritten: false,
    atmDeposit: false,
    savingsTransfer: false
  });

  // Convert numbers to words helper
  const amountInWords = (numStr: string) => {
    const num = parseFloat(numStr) || 0;
    const dollars = Math.floor(num);
    const cents = Math.round((num - dollars) * 100);
    const dollarsWord = dollars > 0 ? `${dollars}` : 'Zero';
    return `${dollarsWord} and ${cents < 10 ? '0' + cents : cents}/100 Dollars`;
  };

  const handleSignAndProcessCheck = () => {
    setValidationError(null);
    if (!payee.trim() || !amount || parseFloat(amount) <= 0 || !signature.trim()) {
      setValidationError('Please complete all check fields (Payee, Amount, and Signature).');
      return;
    }
    const checkAmt = parseFloat(amount);
    if (checkingBalance < checkAmt) {
      setValidationError('Insufficient funds in your checking balance to clear this amount.');
      return;
    }

    setCheckingBalance(prev => prev - checkAmt);
    setCheckProcessed(true);
    setCompletedSteps(prev => ({ ...prev, checkWritten: true }));
    setAtmMessage(`Check of $${checkAmt.toFixed(2)} issued to "${payee}". Current checking balance: $${(checkingBalance - checkAmt).toFixed(2)}.`);
  };

  const handleDepositCash = (depositAmt: number) => {
    setCheckingBalance(prev => prev + depositAmt);
    setCompletedSteps(prev => ({ ...prev, atmDeposit: true }));
    setAtmMessage(`Successfully deposited $${depositAmt.toFixed(2)} cash into Checking.`);
  };

  const handleTransferToSavings = (transferAmt: number) => {
    if (checkingBalance < transferAmt) {
      setAtmMessage('Cannot transfer: Insufficient funds in Checking.');
      return;
    }
    setCheckingBalance(prev => prev - transferAmt);
    setSavingsBalance(prev => prev + transferAmt);
    setCompletedSteps(prev => ({ ...prev, savingsTransfer: true }));
    setAtmMessage(`Transferred $${transferAmt.toFixed(2)} from Checking to High-Yield Savings.`);
  };

  return (
    <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-4xl mx-auto my-4 space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs tracking-wider uppercase">
            <Landmark className="w-4 h-4 text-emerald-700" />
            <span>Interactive Banking Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">Checks & ATM Practice</h3>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setActiveTab('check')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'check' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Paper Check</span>
          </button>
          <button
            onClick={() => setActiveTab('atm')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'atm' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
            <span>ATM Terminal</span>
          </button>
        </div>
      </div>

      {/* Account Balances Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex justify-between items-center">
          <div>
            <div className="text-xs text-slate-500 font-medium">Checking Account (Debit & Bills)</div>
            <div className="text-2xl font-bold text-slate-800 mt-1 font-mono">${checkingBalance.toFixed(2)}</div>
          </div>
          <CreditCard className="w-7 h-7 text-slate-400" />
        </div>

        <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 flex justify-between items-center">
          <div>
            <div className="text-xs text-emerald-800 font-medium">Savings Account (Emergency Reserve)</div>
            <div className="text-2xl font-bold text-emerald-900 mt-1 font-mono">${savingsBalance.toFixed(2)}</div>
          </div>
          <Landmark className="w-7 h-7 text-emerald-600" />
        </div>
      </div>

      {/* Validation Alert */}
      {validationError && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Main Tab Content */}
      {activeTab === 'check' ? (
        <div className="space-y-6">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600">
            💡 <strong>Check Writing Tip:</strong> Fill in the recipient (Payee), numerical amount, and sign your name. Notice how the legal written words line formats automatically!
          </div>

          {/* Interactive Check Canvas */}
          <div className="bg-[#FFFDF9] text-slate-900 rounded-2xl p-6 shadow-sm border-2 border-amber-200/90 relative overflow-hidden font-mono text-xs sm:text-sm">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-300 pb-3 mb-4">
              <div>
                <div className="font-bold text-slate-800">ALEX STUDENT</div>
                <div className="text-[11px] text-slate-500 font-sans">123 Academy Way, Apt 4B • City, ST 90210</div>
              </div>
              <div className="text-right font-sans">
                <div className="font-bold text-slate-700">CHECK # 1042</div>
                <div className="text-xs text-slate-500">Date: {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            {/* Check Fields */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <span className="font-semibold text-slate-700 whitespace-nowrap font-sans">PAY TO THE ORDER OF:</span>
                <input
                  type="text"
                  value={payee}
                  onChange={(e) => setPayee(e.target.value)}
                  className="flex-1 bg-white border-b-2 border-slate-300 px-2 py-1 font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none rounded-sm w-full font-sans"
                  placeholder="Recipient Name (e.g. Apex Apartments)"
                />
                <div className="flex items-center bg-white border border-slate-300 px-2.5 py-1 rounded-md font-bold text-slate-900">
                  <span className="mr-1">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-24 focus:outline-none text-right font-mono"
                  />
                </div>
              </div>

              {/* Amount in Words */}
              <div className="border-b border-slate-300 pb-1.5 pt-1">
                <div className="text-[10px] text-slate-400 font-sans">AMOUNT IN WORDS (LEGAL):</div>
                <div className="font-semibold text-emerald-900 capitalize font-sans text-xs sm:text-sm">
                  {amountInWords(amount)}
                </div>
              </div>

              {/* Bank Name */}
              <div className="text-[11px] text-slate-400 font-sans italic pt-1">
                Community National Bank • Member FDIC
              </div>

              {/* Memo & Signature */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-sans">
                <div>
                  <span className="text-[11px] text-slate-500 block">MEMO:</span>
                  <input
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="e.g. November Rent"
                    className="w-full bg-white border-b border-slate-300 px-2 py-1 text-slate-900 focus:outline-none text-xs"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">AUTHORIZED SIGNATURE:</span>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full bg-white border-b border-slate-300 px-2 py-1 font-serif italic text-base text-slate-900 focus:outline-none"
                    placeholder="Sign your name"
                  />
                </div>
              </div>

              {/* MICR Line */}
              <div className="pt-3 text-center text-xs text-slate-400 font-mono tracking-widest border-t border-slate-200">
                ⑆123456789⑆ 9876543210⑈ 1042
              </div>
            </div>

            {/* Check Processed Overlay */}
            {checkProcessed && (
              <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 bg-emerald-900/10 backdrop-blur-xs flex items-center justify-center p-4"
              >
                <div className="bg-emerald-700 text-white font-bold text-lg uppercase tracking-wide px-6 py-3 rounded-2xl shadow-lg border-2 border-white rotate-[-5deg] flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Check Cleared Successfully!</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Process Button */}
          <div className="flex justify-end gap-3">
            {checkProcessed ? (
              <button
                onClick={() => setCheckProcessed(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors cursor-pointer text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Write Another Check</span>
              </button>
            ) : (
              <button
                onClick={handleSignAndProcessCheck}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer text-xs sm:text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sign & Process Check {amount ? `($${amount})` : ''}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ATM Terminal */
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 font-sans space-y-4">
            <div className="text-slate-500 text-xs flex justify-between">
              <span>ATM Terminal Simulator</span>
              <span className="text-emerald-700 font-medium">Secure Banking</span>
            </div>

            {/* Screen Message */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl text-slate-700 text-sm min-h-[50px] flex items-center">
              💬 {atmMessage}
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleDepositCash(100.00)}
                className="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl text-left transition-all cursor-pointer"
              >
                <div className="text-emerald-800 font-semibold text-sm flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  <span>Deposit $100 Cash</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Add birthday or job cash directly to your checking account.</div>
              </button>

              <button
                onClick={() => handleTransferToSavings(100.00)}
                className="bg-white hover:bg-slate-50 border border-slate-200 p-4 rounded-xl text-left transition-all cursor-pointer"
              >
                <div className="text-emerald-800 font-semibold text-sm flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-emerald-700" />
                  <span>Transfer $100 to Savings</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Move cash into your savings account to earn interest.</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Banner */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 text-xs">
            <span className={completedSteps.checkWritten ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
              {completedSteps.checkWritten ? '✓' : '○'} Check Written
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 text-xs">
            <span className={completedSteps.atmDeposit || completedSteps.savingsTransfer ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
              {completedSteps.atmDeposit || completedSteps.savingsTransfer ? '✓' : '○'} ATM Action Tried
            </span>
          </div>
        </div>

        <button
          onClick={() => onCompleteGame(50, 50)}
          disabled={!completedSteps.checkWritten}
          className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all text-xs sm:text-sm ${
            completedSteps.checkWritten
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs cursor-pointer'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Complete Practice & Continue</span>
        </button>
      </div>
    </div>
  );
};
