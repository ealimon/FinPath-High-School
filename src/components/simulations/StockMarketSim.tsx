import React, { useState } from 'react';
import { BarChart3, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';

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
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'VOO', name: 'S&P 500 Index Fund', price: 100, changePct: +1.2, sharesOwned: 0 },
    { symbol: 'TECH', name: 'MegaTech Corp', price: 150, changePct: +2.5, sharesOwned: 0 },
    { symbol: 'ECO', name: 'Clean Energy ETF', price: 50, changePct: -0.8, sharesOwned: 0 }
  ]);

  const [news, setNews] = useState('Market open: Tech sector surges following strong earnings report!');

  const portfolioStockValue = stocks.reduce((acc, s) => acc + s.price * s.sharesOwned, 0);
  const totalNetWorth = cash + portfolioStockValue;

  const handleBuy = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return;
    if (cash < stock.price) {
      alert('Insufficient cash to buy 1 share!');
      return;
    }
    setCash(prev => prev - stock.price);
    setStocks(prev => prev.map(s => s.symbol === symbol ? { ...s, sharesOwned: s.sharesOwned + 1 } : s));
  };

  const handleSell = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock || stock.sharesOwned <= 0) return;
    setCash(prev => prev + stock.price);
    setStocks(prev => prev.map(s => s.symbol === symbol ? { ...s, sharesOwned: s.sharesOwned - 1 } : s));
  };

  const handleSimulateNextDay = () => {
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
      'Federal Reserve holds interest rates steady; markets gain confidence!',
      'Green energy demand jumps 15% across global power grids.',
      'S&P 500 Index reaches new all-time high driven by index fund inflows.'
    ];
    setNews(headlines[Math.floor(Math.random() * headlines.length)]);
  };

  const isDiversified = stocks.filter(s => s.sharesOwned > 0).length >= 2;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl max-w-3xl mx-auto my-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black">Rocket Market: Stock & ETF Simulator</h3>
          <p className="text-xs text-slate-400">Build a $1,000 diversified portfolio across Index Funds, Tech, and Green Energy!</p>
        </div>
      </div>

      {/* Portfolio Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <div className="text-xs text-slate-400">Cash Available</div>
          <div className="text-xl font-black text-emerald-400 mt-1">${cash.toFixed(2)}</div>
        </div>

        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <div className="text-xs text-slate-400">Stock Holdings</div>
          <div className="text-xl font-black text-cyan-400 mt-1">${portfolioStockValue.toFixed(2)}</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-950 to-slate-800 p-3 rounded-xl border border-emerald-600/50">
          <div className="text-xs text-emerald-300">Total Net Worth</div>
          <div className="text-2xl font-black text-white mt-1">${totalNetWorth.toFixed(2)}</div>
        </div>
      </div>

      {/* Ticker / News Ticker */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
        <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold uppercase shrink-0">NEWS</span>
        <span className="truncate">{news}</span>
      </div>

      {/* Stocks Table */}
      <div className="space-y-3">
        {stocks.map(stock => (
          <div key={stock.symbol} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm bg-slate-700 px-2 py-0.5 rounded text-cyan-300">{stock.symbol}</span>
                <span className="font-bold text-sm text-white">{stock.name}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">Owned: <strong className="text-white">{stock.sharesOwned} shares</strong></div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <div className="font-black text-base text-white">${stock.price}</div>
                <div className={`text-xs font-bold ${stock.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stock.changePct >= 0 ? '+' : ''}{stock.changePct}%
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleBuy(stock.symbol)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all"
                >
                  Buy +1
                </button>
                <button
                  onClick={() => handleSell(stock.symbol)}
                  disabled={stock.sharesOwned <= 0}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    stock.sharesOwned > 0
                      ? 'bg-rose-600 hover:bg-rose-500 text-white cursor-pointer'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
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
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={handleSimulateNextDay}
          className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Simulate Next Market Day
        </button>

        <button
          onClick={() => onCompleteGame(50, 50)}
          disabled={!isDiversified}
          className={`px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all ${
            isDiversified
              ? 'bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 shadow-lg cursor-pointer hover:scale-105'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          {isDiversified ? 'Complete Market Challenge (+50 Coins & +50 XP)' : 'Buy Shares in at least 2 Assets'}
        </button>
      </div>
    </div>
  );
};
