import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Profile = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [top, setTop] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("http://localhost:5000/user_feedback");
        const data = await res.json();
        setFeedbacks(data);

        const topRes = await fetch("http://localhost:5000/top_feedback");
        const topData = await topRes.json();
        setTop(topData);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchFeedback();
  }, []);

  const totalFeedback = feedbacks.length;
  const avgReward =
    feedbacks.reduce((acc, f) => acc + f.reward, 0) /
    (totalFeedback || 1);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white shadow rounded-xl text-center">
            <p className="text-gray-500">Total Feedback</p>
            <p className="text-2xl font-bold">{totalFeedback}</p>
          </div>
          <div className="p-6 bg-white shadow rounded-xl text-center">
            <p className="text-gray-500">Average Reward</p>
            <p className="text-2xl font-bold">{(avgReward * 100).toFixed(1)}%</p>
          </div>
          <div className="p-6 bg-white shadow rounded-xl text-center">
            <p className="text-gray-500">Top Hook Reward</p>
            <p className="text-2xl font-bold">
              {top[0]?.reward ? (top[0].reward * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Top Rated Content</h2>
          {loading ? (
            <p>Loading...</p>
          ) : top.length === 0 ? (
            <p>No feedback yet.</p>
          ) : (
            top.map((f) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-xl shadow"
              >
                <p>
                  <strong>Hook:</strong> {f.hook}
                </p>
                <p>
                  <strong>Story:</strong> {f.story}
                </p>
                <p>
                  <strong>CTA:</strong> {f.cta}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Reward: {(f.reward * 100).toFixed(1)}%
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
