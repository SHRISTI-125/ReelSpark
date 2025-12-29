import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";


const toneColors = {
  trending: "bg-orange-100 text-orange-700",
  hooks: "bg-violet-100 text-violet-700",
  educational: "bg-emerald-100 text-emerald-700",
  storytelling: "bg-sky-100 text-sky-700",
  all: "bg-slate-200 text-slate-700",
  Trending: "bg-orange-100 text-orange-700",
  Hooks: "bg-violet-100 text-violet-700",
  Educational: "bg-emerald-100 text-emerald-700",
  Storytelling: "bg-sky-100 text-sky-700",
  All: "bg-slate-200 text-slate-700",
};

const Pill = ({ label, value }) => {
  if (!value) return null;
  const color =
    toneColors[value.toLowerCase()] || toneColors.all;

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
      {label}: {value}
    </span>
  );
};

const ConfidenceBar = ({ value }) => {
  const percent = Math.round(value * 100);
  const barColor =
    percent > 80
      ? "bg-emerald-500"
      : percent > 60
      ? "bg-indigo-500"
      : "bg-yellow-500";

  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>AI Confidence</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
    <div className="h-5 w-1/3 bg-gray-200 rounded mb-4" />
    <div className="h-4 w-full bg-gray-200 rounded mb-2" />
    <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />
    <div className="h-4 w-2/3 bg-gray-200 rounded" />
  </div>
);


const Generate = () => {
  const location = useLocation();
  const ideaDescription = location.state?.ideaDescription || "";

  const [inputText, setInputText] = useState(ideaDescription);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setInputText(ideaDescription);
  }, [ideaDescription]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: inputText }),
      });

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const sendFeedback = async (id, rating) => {
    try {
      await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, rating }),
      });
    } catch {
      console.error("Feedback failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-12">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          AI Hook · Story · CTA Generator
        </h1>
        <p className="text-gray-500 mt-2">
          Scroll-stopping content with AI confidence ✨
        </p>
      </div>

      {/* Input */}
      <div className="max-w-2xl mx-auto">
        <textarea
          rows={3}
          className="w-full p-4 text-lg border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Describe your reel idea..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg"
        >
          {loading ? "Thinking..." : "Generate Content"}
        </button>
      </div>

      {/* Results */}
      <div className="max-w-3xl mx-auto mt-12 space-y-6">
        {loading && [1, 2, 3].map((i) => <SkeletonCard key={i} />)}

        <AnimatePresence>
          {results.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              {/* Badges */}
              <div className="flex gap-2 flex-wrap mb-4">
                <Pill label="Type" value={r.content_type} />
                <Pill label="Intent" value={r.intent} />
                <Pill label="Tone" value={r.tone} />
              </div>

              {/* Hook */}
              <p className="text-sm uppercase text-gray-400 mb-1">Hook</p>
              <p className="text-lg font-semibold text-gray-800">
                {r.hook}
              </p>

              {/* Story */}
              <p className="text-sm uppercase text-gray-400 mt-4 mb-1">
                Story
              </p>
              <p className="text-gray-700">{r.story}</p>

              {/* CTA */}
              <p className="text-sm uppercase text-gray-400 mt-4 mb-1">
                CTA
              </p>
              <p className="font-medium text-indigo-700">{r.cta}</p>

              {/* Copy */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => copyToClipboard(r.hook)}
                  className="px-3 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  📋 Copy Hook
                </button>
                <button
                  onClick={() => copyToClipboard(r.story)}
                  className="px-3 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  📋 Copy Story
                </button>
              </div>

              {/* Confidence */}
              <ConfidenceBar value={r.confidence} />

              {/* RLHF */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => sendFeedback(r.id, 5)}
                  className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm"
                >
                  👍 Helpful
                </button>
                <button
                  onClick={() => sendFeedback(r.id, 1)}
                  className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm"
                >
                  👎 Not useful
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Copy Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-xl text-sm"
          >
            Copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Generate;

