import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [topContent, setTopContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("http://localhost:5000/user_feedback.json");
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTopContent = async () => {
      try {
        const res = await fetch("http://localhost:5000/top_content"); 
        const data = await res.json();
        setTopContent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
    fetchTopContent();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {loading && <p>Loading...</p>}

      {/* Top-rated content */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Top Rated Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {topContent.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white p-6 rounded-2xl shadow"
              >
                <p className="text-gray-400 text-xs uppercase mb-1">{c.tone}</p>
                <p className="font-semibold text-lg">{c.hook}</p>
                <p className="text-gray-700 mt-2">{c.story}</p>
                <p className="text-indigo-700 mt-2 font-medium">{c.cta}</p>
                <div className="mt-2 text-sm text-gray-500">
                  Reward: {c.reward.toFixed(2)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Feedback stats */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All Feedback</h2>
        <table className="w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Content ID</th>
              <th className="p-3 text-left">Reward</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{f.id}</td>
                <td className="p-3">{f.reward.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
