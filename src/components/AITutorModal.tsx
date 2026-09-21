import React, { useState } from 'react';
import { ModuleData } from '../types';
import { X, Send, Sparkles, Bot } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentModule?: ModuleData;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const AITutorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentModule,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: `Hello! I'm Finley, your personal finance helper. 🎓\n\nAsk me anything about ${
        currentModule ? currentModule.title : 'taxes, credit cards, student loans, budgeting, or investing in a Roth IRA'
      }! What would you like help understanding today?`,
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'How do I read my W-2 tax form?',
    'What is a good credit score?',
    'How does a Roth IRA work at 18?',
    'Subsidized vs Unsubsidized student loans?'
  ];

  const getFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('w-2') || q.includes('w2') || q.includes('w-4') || q.includes('tax') || q.includes('fica') || q.includes('paycheck')) {
      return "📄 **Taxes & Paychecks Guide:**\n\n• **Form W-4:** Completed when hired to dictate how much federal tax is withheld.\n• **Form W-2:** Received by January 31st each year summarizing total earnings and taxes withheld (Boxes 1 & 2 for Federal, Boxes 3-6 for Social Security & Medicare).\n• **FICA Tax:** Mandatory 7.65% deduction (6.2% Social Security + 1.45% Medicare).\n• **Standard Deduction:** For high school workers, earnings below the standard deduction (~$14,600) owe $0 in federal income tax, but you must file Form 1040 to refund withheld taxes!";
    }
    if (q.includes('credit') || q.includes('score') || q.includes('card') || q.includes('fico') || q.includes('apr')) {
      return "💳 **Credit & Score Essentials:**\n\n• **FICO Range:** 300 to 850 (720+ is Good, 750+ is Excellent).\n• **Two Biggest Factors:** Payment History (35%) + Credit Utilization (30%).\n• **Golden Rule:** Keep credit utilization under 10% to 30% of your credit limit and pay your entire statement balance in full every single month to avoid 24%+ APR interest charges.";
    }
    if (q.includes('roth') || q.includes('ira') || q.includes('invest') || q.includes('s&p') || q.includes('stock') || q.includes('compound')) {
      return "📈 **Roth IRA & Compound Investing:**\n\n• **What is a Roth IRA?** An account where you contribute post-tax money from earned income. All growth and withdrawals after age 59½ are 100% tax-free!\n• **Power of Starting Young:** Investing $150/month from age 18 in an S&P 500 index fund (~10% historical return) grows to over **$1,000,000+** at retirement with less than $85k out of pocket.\n• **Custodial IRA:** If under 18 with earned income (W-2/1099), parents can open a Custodial Roth IRA for you.";
    }
    if (q.includes('loan') || q.includes('fafsa') || q.includes('college') || q.includes('subsidized') || q.includes('grant')) {
      return "🎓 **Student Loans & Financial Aid:**\n\n• **FAFSA First:** Always submit FAFSA to qualify for free federal Pell Grants and institutional aid.\n• **Subsidized Loans:** The federal government pays interest while in school.\n• **Unsubsidized Loans:** Interest accrues from the day funds are disbursed.\n• **Rule of Thumb:** Keep total student debt under your expected first-year starting salary after graduation.";
    }
    if (q.includes('budget') || q.includes('50/30/20') || q.includes('save') || q.includes('emergency')) {
      return "📊 **50/30/20 Budgeting Rule:**\n\n• **50% Needs:** Rent, groceries, gas/transit, phone bill, minimum debt payments.\n• **30% Wants:** Dining out, shopping, streaming subscriptions, entertainment.\n• **20% Savings:** High-Yield Savings Account (HYSA emergency fund of 3-6 months) + Roth IRA investments.";
    }
    if (q.includes('car') || q.includes('auto') || q.includes('lease') || q.includes('insurance')) {
      return "🚗 **Auto & Insurance Basics:**\n\n• **Buy vs. Lease:** Buying reliable 3-5 yr old pre-owned minimizes rapid depreciation.\n• **Rule 20/4/10:** Put down 20%, finance for max 4 years, keep car payment + insurance under 10% of gross pay.\n• **Young Driver Insurance:** Rates are higher for teens; maintain a good student discount (GPA 3.0+) and choose appropriate deductibles ($500–$1,000).";
    }
    if (q.includes('rent') || q.includes('apartment') || q.includes('lease') || q.includes('deposit')) {
      return "🏠 **Apartment Renting Realities:**\n\n• **Move-in Cash:** Landlords often require first month + last month + security deposit upfront (e.g., $3,600+ on a $1,200/mo unit).\n• **Rule of Rent:** Never spend more than 30% of your gross monthly pay on rent.\n• **Roommates:** Sign co-leases with care and establish clear split agreements for utility/Wi-Fi bills.";
    }
    return `🎓 **Financial Tip on "${query}":**\n\nEvery strong financial foundation starts with three pillars: (1) Tracking net income vs expenses, (2) Automating deposits into a High-Yield Savings Account for emergencies, and (3) Paying credit balances on time to build a 720+ FICO score. Let me know if you want a deeper walkthrough of taxes, budgeting, Roth IRAs, or loans!`;
  };

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: messageText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          context: currentModule ? { moduleTitle: currentModule.title, moduleConcepts: currentModule.learningConcepts } : null,
          history: messages,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', text: getFallbackResponse(messageText) }]);
      }
    } catch (err) {
      // Graceful fallback for static environments
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: getFallbackResponse(messageText) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl overflow-hidden shadow-xl flex flex-col max-h-[85vh] text-slate-800">
        {/* MODAL HEADER */}
        <div className="p-4 px-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center border border-emerald-200/80">
              <Bot className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-800">Finley • Financial Advisor</span>
                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200/60">
                  Ready to help
                </span>
              </div>
              <p className="text-xs text-slate-500">Ask any question in simple, stress-free language</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Close Advisor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CHAT MESSAGES BODY */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F8FAFC]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center shrink-0 self-start mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-[82%] text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                  m.role === 'user'
                    ? 'bg-emerald-700 text-white font-normal rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-none text-xs text-slate-600 border border-slate-200/80 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>Finley is preparing an explanation...</span>
              </div>
            </div>
          )}
        </div>

        {/* QUICK PROMPTS CHIPS */}
        <div className="p-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-slate-700 hover:text-emerald-900 text-xs rounded-xl font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              💬 {qp}
            </button>
          ))}
        </div>

        {/* INPUT FORM */}
        <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question about money, taxes, or budgeting..."
            className="flex-1 bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none text-slate-800 placeholder-slate-400 transition-colors"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className={`px-4 rounded-xl font-medium flex items-center justify-center transition-all ${
              input.trim() && !loading
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
