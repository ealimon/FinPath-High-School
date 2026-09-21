import React, { useState } from 'react';
import { BarChart3, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface Props {
  onCompleteGame: (earnedCoins: number, earnedXp: number) => void;
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  sharesOwned: number;
}

export const StockMarketSim: React.FC<Props> = ({ onCompleteGame }) => {
  const [cash, setCash] = useState(1000);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'VOO', name: 'S&P 500 Index Fund ETF', price: 100, changePct: +1.2, sharesOwned: 0 },
    { symbol: 'TECH', name: 'Diversified Tech Index', price: 150, changePct: +2.5, sharesOwned: 0 },
    { symbol: 'CLEAN', name: 'Clean Energy & Infrastructure ETF', price: 50, changePct: -0.8, sharesOwned: 0 }
  ]);

  const [news, setNews] = useState('Market open: Economic reports indicate steady employment and controlled inflation.');

  const portfolioStockValue = stocks.reduce((acc, s) => acc + s.price * s.sharesOwned, 0);
  const totalNetWorth = cash + portfolioStockValue;

  const handleBuy = (symbol: string) => {
    setErrorMessage(null);
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return;
    if (cash < stock.price) {
      setErrorMessage(`Insufficient cash to purchase 1 share of ${stock.symbol} ($${stock.price}).`);
      return;
    }
    setCash(prev => prev - stock.price);
    setStocks(prev => prev.map(s => s.symbol === symbol ? { ...s, sharesOwned: s.sharesOwned + 1 } : s));
  };

  const handleSell = (symbol: string) => {
    setErrorMessage(null);
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock || stock.sharesOwned <= 0) return;
    setCash(prev => prev + stock.price);
    setStocks(prev => prev.map(s => s.symbol === symbol ? { ...s, sharesOwned: s.sharesOwned - 1 } : s));
  };

  const handleSimulateNextDay = () => {
    setErrorMessage(null);
    setStocks(prev => prev.map(s => {
      const randomChange = (Math.random() * 6 - 2.5); // -2.5% to +3.5%
      const newPrice = Math.max(10, Math.round(s.price * (1 + randomChange / 100)));
      return {
        ...s,
        price: newPrice,
        changePct: parseFloat(randomChange.toFixed(1))
      };
    }));

    const headlines = [
      'Federal Reserve policy update supports steady economic growth.',
      'Renewable energy demand rises across nationwide power grids.',
      'Broad market index funds hit new milestones with long-term contributions.'
    ];
    setNews(headlines[Math.floor(Math.random() * headlines.length)]);
  };

  const isDiversified = stocks.filter(s => s.sharesOwned > 0).length >= 2;

  return (
    <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center border border-emerald-200/80 shrink-0">
          <BarChart3 className="w-5 h-5 text-emerald-800" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Index Fund & Investment Practice</h3>
          <p className="text-xs text-slate-500">Practice allocating your $1,000 starting cash across diversified index funds.</p>
        </div>
      </div>

      {/* Portfolio Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Cash Balance</div>
          <div className="text-xl font-bold text-slate-800 mt-1 font-mono">${cash.toFixed(2)}</div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Investments Value</div>
          <div className="text-xl font-bold text-emerald-800 mt-1 font-mono">${portfolioStockValue.toFixed(2)}</div>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80">
          <div className="text-xs text-emerald-800 font-medium">Total Net Worth</div>
          <div className="text-2xl font-bold text-emerald-950 mt-1 font-mono">${totalNetWorth.toFixed(2)}</div>
        </div>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* News Ticker */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
        <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold text-[11px] uppercase shrink-0">MARKET UPDATE</span>
        <span className="truncate">{news}</span>
      </div>

      {/* Stocks Table */}
      <div className="space-y-3">
        {stocks.map(stock => (
          <div key={stock.symbol} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 font-mono">{stock.symbol}</span>
                <span className="font-semibold text-sm text-slate-800">{stock.name}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Shares Owned: <strong className="text-slate-800">{stock.sharesOwned}</strong></div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <div className="font-bold text-base text-slate-900 font-mono">${stock.price}</div>
                <div className={`text-xs font-semibold ${stock.changePct >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {stock.changePct >= 0 ? '+' : ''}{stock.changePct}%
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleBuy(stock.symbol)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors shadow-xs"
                >
                  Buy +1
                </button>
                <button
                  onClick={() => handleSell(stock.symbol)}
                  disabled={stock.sharesOwned <= 0}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    stock.sharesOwned > 0
                      ? 'bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Sell -1
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simulate Market Day */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
        <button
          onClick={handleSimulateNextDay}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Advance Market Day</span>
        </button>

        <button
          onClick={() => onCompleteGame(50, 50)}
          disabled={!isDiversified}
          className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all text-xs sm:text-sm ${
            isDiversified
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs cursor-pointer'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isDiversified ? 'Complete Practice & Continue' : 'Diversify by Buying 2 Different Funds'}</span>
        </button>
      </div>
    </div>
  );
};
