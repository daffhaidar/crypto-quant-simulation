"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp, FaShieldAlt, FaGamepad } from "react-icons/fa";

const COINS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "cardano", symbol: "ADA", name: "Cardano" },
  { id: "matic-network", symbol: "MATIC", name: "Polygon" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin" },
  { id: "binancecoin", symbol: "BNB", name: "BNB" },
  { id: "sui", symbol: "SUI", name: "Sui" },
];

// Tambahkan tipe Prices di sini
type Prices = {
  [coinId: string]: {
    usd: number;
  };
};

function CryptoPrices() {
  const [prices, setPrices] = useState<Prices>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      setLoading(true);
      const ids = COINS.map((c) => c.id).join(",");
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
      const data = await res.json();
      setPrices(data);
      setLoading(false);
    }
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="transition-all duration-500 bg-gradient-to-br from-white/80 to-blue-50 dark:from-gray-900/80 dark:to-gray-800 rounded-3xl shadow-xl p-4 sm:p-8 w-full max-w-3xl mx-auto hover:scale-[1.015] hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <FaArrowUp className="text-blue-600 text-2xl" />
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Real-Time Crypto Prices</h2>
      </div>
      {loading ? (
        <div className="text-center animate-pulse text-blue-600 font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {COINS.map((coin) => (
            <div key={coin.id} className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-4 transition hover:shadow-lg border border-gray-100 dark:border-gray-800">
              <span className="text-lg font-semibold mb-1">{coin.name}</span>
              <span className="text-sm text-gray-500 mb-2">{coin.symbol}</span>
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">${prices[coin.id]?.usd?.toLocaleString() ?? "-"}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function RTPSection() {
  const [rtp, setRtp] = useState(95);
  const [simResult, setSimResult] = useState<string | null>(null);

  function handleSimulate() {
    setSimResult(`If RTP ${rtp}%, probability of winning in 1000 games: ${((rtp / 100) * 1000).toFixed(0)} times.`);
  }

  return (
    <section className="transition-all duration-500 bg-gradient-to-br from-white/80 to-purple-50 dark:from-gray-900/80 dark:to-gray-800 rounded-3xl shadow-xl p-4 sm:p-8 w-full max-w-3xl mx-auto hover:scale-[1.015] hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <FaGamepad className="text-purple-600 text-2xl" />
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">RTP (Return to Player) Simulation</h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-4">
        <label className="font-medium text-lg">RTP (%):</label>
        <input
          type="number"
          min={50}
          max={100}
          value={rtp}
          onChange={(e) => setRtp(Number(e.target.value))}
          className="border-2 border-purple-300 dark:border-purple-700 rounded px-3 py-2 w-28 text-center text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button onClick={handleSimulate} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-purple-600 hover:to-blue-600 transition">
          Simulate
        </button>
      </div>
      {simResult && <div className="text-center text-purple-700 dark:text-purple-300 font-semibold text-lg animate-fade-in">{simResult}</div>}
    </section>
  );
}

function AntiAbuseSection() {
  const activities = [
    { user: "0xA1B2...C3D4", action: "Withdraw", amount: 1000, flagged: false },
    { user: "0xE5F6...G7H8", action: "Deposit", amount: 50000, flagged: true },
    { user: "0xI9J0...K1L2", action: "Play Game", amount: 50, flagged: false },
    { user: "0xM3N4...O5P6", action: "Withdraw", amount: 100000, flagged: true },
    { user: "0xe345...1110", action: "Withdraw", amount: 400000, flagged: false },
    { user: "0xe132...1234", action: "Withdraw", amount: 200000, flagged: true },
    { user: "0xANNA...0205", action: "Withdraw", amount: 200700, flagged: false },
    { user: "0xDAFFA...1110", action: "Withdraw", amount: 111100, flagged: true },
  ];
  return (
    <section className="transition-all duration-500 bg-gradient-to-br from-white/80 to-pink-50 dark:from-gray-900/80 dark:to-gray-800 rounded-3xl shadow-xl p-4 sm:p-8 w-full max-w-3xl mx-auto hover:scale-[1.015] hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <FaShieldAlt className="text-pink-600 text-2xl" />
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Suspicious Activity Detection</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-base text-left rounded-xl overflow-hidden">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act, idx) => (
              <tr key={idx} className={act.flagged ? "bg-pink-100 dark:bg-pink-900/40 animate-pulse" : "hover:bg-gray-100 dark:hover:bg-gray-800/60"}>
                <td className="py-2 px-4 font-mono">{act.user}</td>
                <td className="py-2 px-4">{act.action}</td>
                <td className="py-2 px-4">{act.amount.toLocaleString()}</td>
                <td className="py-2 px-4 font-bold">{act.flagged ? <span className="text-pink-700 dark:text-pink-300">Suspicious</span> : <span className="text-green-700 dark:text-green-300">Normal</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-8 sm:py-12 px-1 sm:px-2 flex flex-col items-center">
      <div className="max-w-3xl mx-auto mb-8 sm:mb-12 text-center animate-fade-in">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">Crypto Quant Dashboard</h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-3 font-medium">Portofolio Project — Quantitative Analyst (Crypto)</p>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">This dashboard displays real-time crypto prices, RTP simulations, and suspicious activity detection as an overview of the duties of a Quant in the crypto world.</p>
      </div>
      <div className="flex flex-col gap-12 w-full items-center">
        <CryptoPrices />
        <RTPSection />
        <AntiAbuseSection />
      </div>
    </div>
  );
}
