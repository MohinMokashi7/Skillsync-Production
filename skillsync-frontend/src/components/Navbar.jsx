import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // ✅ AUTH NAVBAR (Login/Register)
  if (isAuthPage) {
    return (
      <nav className="bg-white py-6 border-b border-slate-100 shadow-sm">
        <div className="flex justify-center items-center gap-2">
          <div className="text-blue-500 text-2xl">🔗</div>
          <Link to="/" className="text-2xl font-bold text-slate-700">
            SkillSync
          </Link>
        </div>
      </nav>
    );
  }

  // ✅ STANDARD NAVBAR (Landing/Dashboard)
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-slate-700">
          <span className="text-blue-500">🔗</span>
          SkillSync
        </Link>

        {/* NOT LOGGED IN */}
        {!token && (
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 text-slate-600 font-medium hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 text-white font-medium bg-[#4A90E2] rounded-lg hover:bg-blue-600 shadow-sm transition"
            >
              Register
            </Link>
          </div>
        )}

        {/* LOGGED IN */}
        {token && (
  <>
    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center space-x-6">

      <Link
        to="/my-projects"
        className="text-slate-600 hover:text-blue-600 font-medium transition"
      >
        My Projects
      </Link>

      <Link
        to="/my-applications"
        className="text-slate-600 hover:text-blue-600 font-medium transition"
      >
        My Applications
      </Link>

      {/* Notification Icon */}
      <button className="relative text-slate-600 hover:text-blue-600 transition">
        🔔
      </button>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-slate-600 hover:text-blue-600 font-medium transition"
        >
          Profile ▾
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-lg border border-slate-100 py-2">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm hover:bg-slate-50"
              onClick={() => setMenuOpen(false)}
            >
              View Profile
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Mobile Toggle */}
    <button
      className="md:hidden text-2xl text-slate-600"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? "✕" : "☰"}
    </button>
  </>
)}

      </div>

      {/* Mobile Dropdown */}
      {token && menuOpen && (
  <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-4">

    <Link
      to="/my-projects"
      className="block text-slate-600 font-medium"
      onClick={() => setMenuOpen(false)}
    >
      My Projects
    </Link>

    <Link
      to="/my-applications"
      className="block text-slate-600 font-medium"
      onClick={() => setMenuOpen(false)}
    >
      My Applications
    </Link>

    <Link
      to="/profile"
      className="block text-slate-600 font-medium"
      onClick={() => setMenuOpen(false)}
    >
      Profile
    </Link>

    <button
      onClick={handleLogout}
      className="w-full text-left text-red-600 font-medium"
    >
      Logout
    </button>

  </div>
)}

    </nav>
  );
}

export default Navbar;