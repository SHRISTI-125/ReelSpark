import React, { useState, useEffect } from "react";
import { ideasData } from "./ideas-for-content";
import { useNavigate } from "react-router-dom";

const platforms = ["All", "Instagram Reels", "YouTube Shorts", "LinkedIn", "Blogs"];
const categories = ["All", "Trending", "Hooks", "Educational", "Storytelling"];

export default function Ideas() {
  const navigate = useNavigate();
  const [activePlatform, setActivePlatform] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [like, setLike] = useState(() => {
    const saved = localStorage.getItem("likes");
    return saved ? JSON.parse(saved) : {};
  });

  const filteredIdeas = ideasData.filter((idea) => {
    const platformMatch =
      activePlatform === "All" || idea.platform === activePlatform || idea.platform === "All";
    const categoryMatch = activeCategory === "All" || idea.category === activeCategory;
    return platformMatch && categoryMatch;
  });

  const handleLike = (id) => {
    setLike((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(like));
  }, [like]);

  return (
    <section className="px-1 md:px-24 py-16 bg-[#fefcfc] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto mb-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Content Ideas</h1>
            <p className="mt-2 text-slate-500 text-lg max-w-xl">
              Ideas that spark creativity. From inspiration to execution; all in one place.
            </p>
          </div>
          <div className="text-sm text-slate-400 font-medium mt-1 md:mt-2">
            Showing <span className="font-semibold text-slate-700">{filteredIdeas.length}</span> ideas
          </div>
        </div>

        {/* Filters */}
        <div className="mt-10 space-y-6">
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  activePlatform === platform
                    ? "bg-red-500 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-red-300"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeCategory === category
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            className="group flex flex-col justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-red-200 hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                  {idea.platform}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{idea.category}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition">
                {idea.title}
              </h3>
              <p className="mt-3 text-slate-600 text-sm">{idea.description}</p>
            </div>

            <div>
              {/* Generate Strategy */}
              <button
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm font-bold border border-slate-100 hover:bg-red-500 hover:text-white hover:border-red-500 transition"
                onClick={() => navigate("/generate", { state: { ideaDescription: idea.description } })}
              >
                Generate Ideas
              </button>
              {/*<div>
            <button className="mt-6 w-full py-2.5 rounded-xl bg-slate-50 text-slate-900 text-sm font-bold border border-slate-100 hover:bg-red-500 hover:text-white hover:border-red-500 transition">
              Generate Content
            </button>
            <button className="bg-blue-500 text-white px-3 py-1" 
            onClick={()=>setLike(like + 1)}>Like</button>{like}*/}
            {/*<button
                className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
                onClick={() => handleLike(idea.id)}
              >
                Like
              </button>
              <span className="ml-2 font-bold">{like[idea.id] || 0}</span>
            </div>*/}
            

              {/* Like */}
              <div className="flex items-center mt-3">
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition ${
                    like[idea.id] ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
                  }`}
                  onClick={() => handleLike(idea.id)}
                >
                  <span className="text-sm">❤️</span>
                  <span className="text-sm font-semibold">{like[idea.id] || 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* EMPTY STATE */}
      {filteredIdeas.length === 0 && (
        <div className="max-w-6xl mx-auto text-center py-24">
          <p className="text-slate-400 font-medium">No ideas match your filters.</p>
          <button
            onClick={() => {
              setActivePlatform("All");
              setActiveCategory("All");
            }}
            className="mt-4 text-red-500 font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}


              
            