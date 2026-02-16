import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import FullScreenLoader from "../components/FullScreenLoader"; // Import the loader

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // New loading states
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Initialize loading state
    setLoading(true);
    setError(""); // Clear previous errors
    setLoadingMessage("Connecting to SkillSync...");

    // Timer to update message if the server is slow (e.g., waking up from sleep)
    const slowServerTimer = setTimeout(() => {
      setLoadingMessage("Waking up server... first request may take 30 seconds.");
    }, 8000);

    try {
      const response = await axiosInstance.post("/auth/login", {
        username: email,
        password: password,
      });

      clearTimeout(slowServerTimer);
      setLoadingMessage("Fetching your data...");

      const token = response.data.accessToken;
      localStorage.setItem("token", token);

      // Brief delay so the user can actually see the "Fetching data" message
      setTimeout(() => navigate("/dashboard"), 500);

    } catch (err) {
      clearTimeout(slowServerTimer);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-300/40 p-8">
        <div className="flex justify-center mb-6">
          <h1 className="text-2xl font-bold text-[#2563eb]">SkillSync</h1>
        </div>

        <h2 className="text-2xl font-semibold text-[#1e293b] text-center">
          Welcome Back
        </h2>

        <p className="text-slate-500 text-center mt-2 text-sm">
          Login to continue building teams.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          New here?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      {/* Render the Full Screen Loader when loading is true */}
      {loading && <FullScreenLoader message={loadingMessage} />}
    </div>
  );
}

export default Login;