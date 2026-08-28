import React, { useState } from 'react';
import { Landmark, CreditCard, CheckCircle2, ArrowRightLeft, DollarSign, Download, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

  // ATM Account balances
  const [checkingBalance, setCheckingBalance] = useState(1250.00);
  const [savingsBalance, setSavingsBalance] = useState(500.00);
  const [atmMessage, setAtmMessage] = useState('Welcome to FinVault ATM! Insert Card or Select Action.');
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
    if (!payee || !amount || parseFloat(amount) <= 0 || !signature) {
      alert('Please fill out all check fields (Payee, Amount, and Signature)!');
      return;
    }
    const checkAmt = parseFloat(amount);
    if (checkingBalance < checkAmt) {
      alert('Insufficient funds in Checking Account to clear this check!');
      return;
    }

    setCheckingBalance(prev => prev - checkAmt);
    setCheckProcessed(true);
    setCompletedSteps(prev => ({ ...prev, checkWritten: true }));
    setAtmMessage(`Check of $${checkAmt.toFixed(2)} issued to "${payee}". New Checking balance: $${(checkingBalance - checkAmt).toFixed(2)}.`);
  };

  const handleDepositCash = (depositAmt: number) => {
    setCheckingBalance(prev => prev + depositAmt);
    setCompletedSteps(prev => ({ ...prev, atmDeposit: true }));
    setAtmMessage(`Successfully deposited $${depositAmt.toFixed(2)} cash into Checking!`);
  };

  const handleTransferToSavings = (transferAmt: number) => {
    if (checkingBalance < transferAmt) {
      setAtmMessage('Cannot transfer: Insufficient funds in Checking!');
      return;
    }
    setCheckingBalance(prev => prev - transferAmt);
    setSavingsBalance(prev => prev + transferAmt);
    setCompletedSteps(prev => ({ ...prev, savingsTransfer: true }));
    setAtmMessage(`Transferred $${transferAmt.toFixed(2)} from Checking to Savings account!`);
  };

  const isGameComplete = completedSteps.checkWritten && (completedSteps.atmDeposit || completedSteps.savingsTransfer);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl max-w-4xl mx-auto my-4">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-wider uppercase">
            <Landmark className="w-5 h-5 text-cyan-400" />
            <span>FINKID VIRTUAL BANK SIMULATOR</span>
          </div>
          <h3 className="text-2xl font-black text-white mt-1">Unlock the Vault: Checks & ATM</h3>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('check')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'check' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Paper Check Writer
          </button>
          <button
            onClick={() => setActiveTab('atm')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'atm' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            FinVault ATM
          </button>
        </div>
      </div>

      {/* Account Balances Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="bg-gradient-to-r from-cyan-950 to-slate-800 p-4 rounded-xl border border-cyan-800/50 flex justify-between items-center">
          <div>
            <div className="text-xs text-cyan-300 font-medium">Checking Account (Debit / Bills)</div>
            <div className="text-2xl font-black text-white mt-1">${checkingBalance.toFixed(2)}</div>
          </div>
          <CreditCard className="w-8 h-8 text-cyan-400 opacity-80" />
        </div>

        <div className="bg-gradient-to-r from-emerald-950 to-slate-800 p-4 rounded-xl border border-emerald-800/50 flex justify-between items-center">
          <div>
            <div className="text-xs text-emerald-300 font-medium">Savings Account (Emergency / APY)</div>
            <div className="text-2xl font-black text-white mt-1">${savingsBalance.toFixed(2)}</div>
          </div>
          <Landmark className="w-8 h-8 text-emerald-400 opacity-80" />
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'check' ? (
        <div className="space-y-6">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 text-sm text-slate-300">
            💡 <strong className="text-cyan-300">Check Writer Guide:</strong> Fill out the check to pay your rent or vendor. Make sure the numerical dollar amount matches the written text line!
          </div>

          {/* Interactive Check Canvas */}
          <div className="bg-amber-50 text-slate-900 rounded-2xl p-6 shadow-2xl border-4 border-amber-200 relative overflow-hidden font-mono">
            {/* Watermark / Header */}
            <div className="flex justify-between items-start border-b-2 border-slate-300 pb-3 mb-4">
              <div>
                <div className="font-bold text-lg text-slate-800">ALEX STUDENT</div>
                <div className="text-xs text-slate-500">123 Academy Way, Apt 4B • FinCity, FC 90210</div>
              </div>
              <div className="text-right">
                <div className="font-black text-xl text-slate-700">CHECK # 1042</div>
                <div className="text-xs text-slate-500">Date: {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            {/* Check Fields */}
            <div className="space-y-4 text-sm">
              {/* Pay to Order Of */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <span className="font-bold text-slate-700 whitespace-nowrap">PAY TO THE ORDER OF:</span>
                <input
                  type="text"
                  value={payee}
                  onChange={(e) => setPayee(e.target.value)}
                  className="flex-1 bg-white border-b-2 border-slate-400 px-3 py-1 font-bold text-slate-900 focus:border-cyan-600 focus:outline-none rounded-md w-full"
                  placeholder="Recipient / Payee Name"
                />
                <div className="flex items-center bg-white border-2 border-slate-400 px-3 py-1 rounded-md font-bold text-slate-900">
                  <span className="mr-1">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-24 focus:outline-none font-black text-right"
                  />
                </div>
              </div>

              {/* Amount in Words */}
              <div className="border-b-2 border-slate-400 pb-1">
                <div className="text-xs text-slate-500 font-sans">AMOUNT IN WORDS (LEGAL):</div>
                <div className="font-bold text-cyan-900 capitalize text-sm sm:text-base">
                  {amountInWords(amount)}
                </div>
              </div>

              {/* Bank Name */}
              <div className="text-xs text-slate-500 font-sans italic pt-2">
                FinVault National Bank • 1-800-FINKID-BANK
              </div>

              {/* Memo & Signature */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-xs text-slate-500 font-sans block">MEMO:</span>
                  <input
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="w-full bg-white border-b-2 border-slate-400 px-2 py-1 text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-sans block">AUTHORIZED SIGNATURE:</span>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full bg-white border-b-2 border-slate-400 px-2 py-1 font-serif italic text-lg text-slate-900 focus:outline-none"
                    placeholder="Sign your name"
                  />
                </div>
              </div>

              {/* Routing & Account Numbers Bottom Line */}
              <div className="pt-4 text-center text-xs text-slate-400 font-mono tracking-widest border-t border-slate-200">
                ⑆123456789⑆ 9876543210⑈ 1042
              </div>
            </div>

            {/* Check Processed Stamp Overlay */}
            {checkProcessed && (
              <motion.div
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 bg-emerald-950/20 backdrop-blur-xs flex items-center justify-center p-4"
              >
                <div className="bg-emerald-600 text-white font-black text-2xl uppercase tracking-widest px-8 py-4 rounded-2xl shadow-2xl border-4 border-white rotate-[-8deg] flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8" />
                  CHECK CLEARED & DEPOSITED!
                </div>
              </motion.div>
            )}
          </div>

          {/* Process Button */}
          <div className="flex justify-end gap-3">
            {checkProcessed ? (
              <button
                onClick={() => setCheckProcessed(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Write Another Check
              </button>
            ) : (
              <button
                onClick={handleSignAndProcessCheck}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all shadow-lg hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                Sign & Process Check ${amount ? "($" + amount + ")" : ""}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ATM Terminal */
        <div className="space-y-6">
          <div className="bg-slate-950 rounded-2xl p-6 border-4 border-cyan-500/40 font-mono relative">
            <div className="text-cyan-400 text-xs mb-2 flex justify-between">
              <span>FINVAULT ATM TERMINAL v3.2</span>
              <span>ONLINE • SECURE 256-BIT</span>
            </div>

            {/* Screen Message */}
            <div className="bg-slate-900 border-2 border-cyan-500/50 p-4 rounded-xl text-cyan-300 mb-6 font-sans text-sm min-h-[60px] flex items-center">
              💬 {atmMessage}
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              <button
                onClick={() => handleDepositCash(100.00)}
                className="bg-slate-800 hover:bg-cyan-900/60 border border-slate-700 hover:border-cyan-500 p-4 rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="text-cyan-400 font-bold text-sm group-hover:text-cyan-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Deposit $100 Cash
                </div>
                <div className="text-xs text-slate-400 mt-1">Add birthday or allowance cash directly to Checking.</div>
              </button>

              <button
                onClick={() => handleTransferToSavings(100.00)}
                className="bg-slate-800 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 p-4 rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="text-emerald-400 font-bold text-sm group-hover:text-emerald-300 flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4" />
                  Transfer $100 to Savings
                </div>
                <div className="text-xs text-slate-400 mt-1">Automate your 20% savings goal into APY interest account.</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion & Rewards Banner */}
      <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <span className={completedSteps.checkWritten ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
              {completedSteps.checkWritten ? '✓' : '○'} Paper Check Written
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <span className={completedSteps.atmDeposit || completedSteps.savingsTransfer ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
              {completedSteps.atmDeposit || completedSteps.savingsTransfer ? '✓' : '○'} ATM Action Completed
            </span>
          </div>
        </div>

        <button
          onClick={() => onCompleteGame(50, 50)}
          disabled={!completedSteps.checkWritten}
          className={`px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all ${
            completedSteps.checkWritten
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-lg cursor-pointer hover:scale-105'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          Complete Vault Challenge & Earn +50 Coins & +50 XP!
        </button>
      </div>
    </div>
  );
};
