import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">
      <ul className="flex gap-6 px-8 py-4 text-gray-700 font-medium">
        <li><Link className="hover:text-blue-600" to="/Landing">Home</Link></li>
        <li><Link className="hover:text-blue-600" to="/ideas">Ideas</Link></li>
        <li><Link className="hover:text-blue-600" to="/generate">Generate</Link></li>
        <li><Link className="hover:text-blue-600" to="/dashboard">Dashboard</Link></li>
        <li><Link className="hover:text-blue-600" to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
