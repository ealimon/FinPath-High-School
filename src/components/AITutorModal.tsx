import React, { useState } from 'react';
import { ModuleData } from '../types';
import { X, Send, Sparkles, MessageCircle, Bot } from 'lucide-react';

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
      text: `Hello! I'm Finley, your High School Financial Advisor. 🎓\n\nAsk me anything about ${
        currentModule ? currentModule.title : 'taxes, credit cards, student loans, budgeting, or investing in a Roth IRA'
      }! What topic would you like to explore today?`,
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'How do I read my W-2 tax form?',
    'What is a good FICO credit score?',
    'How does a Roth IRA work at age 18?',
    'Subsidized vs Unsubsidized student loans?'
  ];

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

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: "Sorry, I couldn't generate a response right now. Please verify your GEMINI_API_KEY setting." },
        ]);
      }
    } catch (err) {
      console.error('Error fetching tutor response:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: "Network error fetching advisor response. Please try asking again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-cyan-500/40 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] text-white">
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 p-4 px-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 rounded-2xl shadow-lg border border-cyan-300">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-white">Finley AI Financial Advisor</span>
                <span className="bg-cyan-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-slate-400">High School & College Financial Literacy Coach</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CHAT MESSAGES BODY */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-950/60">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="p-2 bg-slate-800 text-cyan-400 rounded-xl border border-slate-700 shrink-0 self-start">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed whitespace-pre-line shadow-md ${
                  m.role === 'user'
                    ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="p-2 bg-slate-800 text-cyan-400 rounded-xl border border-slate-700">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-800/90 p-4 rounded-2xl rounded-tl-none text-xs text-cyan-300 font-bold animate-pulse flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Finley is preparing your financial explanation...</span>
              </div>
            </div>
          )}
        </div>

        {/* QUICK PROMPTS CHIPS */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2 overflow-x-auto">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-cyan-950 hover:border-cyan-500 border border-slate-700 text-slate-300 hover:text-cyan-300 text-xs rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer"
            >
              💬 {qp}
            </button>
          ))}
        </div>

        {/* INPUT FORM */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Finley a financial question..."
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl px-4 py-3 text-sm focus:outline-none text-white placeholder-slate-500"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className={`px-5 rounded-2xl font-black flex items-center justify-center transition-all ${
              input.trim() && !loading
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg cursor-pointer hover:scale-105'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
