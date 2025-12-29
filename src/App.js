import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Ideas from "./pages/Ideas";
import Generate from "./pages/Generate";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/ideas" element={<h1 className="p-6">{<Ideas/>}</h1>} />
        <Route path="/generate" element={<h1 className="p-6">{<Generate/>}</h1>} />
        <Route path="/dashboard" element={<h1 className="p-6"><Dashboard/></h1>} />
        <Route path="/profile" element={<h1 className="p-6"><Profile/></h1>} />
      </Routes>
      
    </div>
  );
}

export default App;
