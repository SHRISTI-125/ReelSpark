import { motion } from "framer-motion";
function Landing() {
  return (
    <div className="min-h-screen bg-grey-500">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 md:px-24 py-60">

  {/* Brand name */}
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-4xl md:text-6xl font-extrabold leading-tight"
  >
    <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
      ReelSpark
    </span>
    <br />
    <span className="text-red-500">
      Create Viral Content in Seconds with AI
    </span>
  </motion.h1>

  {/* Subtitle */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
    className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"
  >
    Generate captions, blogs, reel scripts, and content ideas —
    all designed to help influencers grow faster.
  </motion.p>

  {/* Buttons */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    className="mt-8 flex gap-4"
  >
    <button className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
      Generate Content
    </button>

    <button className="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-100 transition">
      Explore Features
    </button>
  </motion.div>

</section>



      {/* Features Section */}
      <section className="px-6 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          What You Can Doc
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <FeatureCard title="AI Captions" desc="Engaging captions for Instagram, LinkedIn & more." />
          <FeatureCard title="Blog Writing" desc="SEO-friendly blogs generated instantly." />
          <FeatureCard title="Reel Scripts" desc="Hook-based short video scripts that convert." />
          <FeatureCard title="Content Ideas" desc="Never run out of creative post ideas again." />
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Built For Creators Like You
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto">
          Whether you're an influencer, marketing student, brand owner,
          or content creator — this tool saves hours of brainstorming.
        </p>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 text-center bg-red-500 text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Creating Content Today
        </h2>

        <p className="mt-4 text-lg opacity-90">
          No credit card required. Just creativity.
        </p>

        <button className="mt-8 px-8 py-3 bg-white text-red-500 rounded-lg font-semibold hover:bg-gray-100 transition">
          Get Started Free
        </button>
      </section>

    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

export default Landing;
