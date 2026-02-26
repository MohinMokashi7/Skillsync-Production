import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (formData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits");
       return;
     }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  

    // Timer for slow server wake-up
    const slowServerTimer = setTimeout(() => {
  setLoadingMessage("Waking up server... this may take up to 30 seconds.");
}, 8000);

try {
  // 1️⃣ Register user
  await axiosInstance.post("/auth/register", {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
  });

  // 2️⃣ Immediately login
  const loginResponse = await axiosInstance.post("/auth/login", {
    username: formData.email,
    password: formData.password,
  });
console.log("LOGIN RESPONSE:", loginResponse.data);
  // 3️⃣ Store JWT
  localStorage.setItem("token", loginResponse.data.accessToken);

  setSuccess("Account created! Redirecting to dashboard...");

  setTimeout(() => {
    navigate("/dashboard");
  }, 1200);

} catch (err) {
  console.log("REGISTER ERROR:", err.response);
  setError(err.response?.data?.message || "Registration failed.");
} finally {
  clearTimeout(slowServerTimer);
}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-300/40 p-8">

        <div className="flex justify-center mb-6">
          <h1 className="text-2xl font-bold text-[#2563eb]">
            SkillSync
          </h1>
        </div>

        <h2 className="text-2xl font-semibold text-[#1e293b] text-center">
          Create Account
        </h2>

        <p className="text-slate-500 text-center mt-2 text-sm">
          Start building teams today.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div>
            <label className="text-sm font-medium text-slate-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
               placeholder="Enter your Name"
              className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
               placeholder="Enter valid email"
              className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Phone
            </label>
            <input
  type="text"
  name="phone"
  value={formData.phone}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (value.length <= 10) {
      setFormData({
        ...formData,
        phone: value,
      });
    }
  }}
  placeholder="Enter 10 digit phone number"
  required
  className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
/>

          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
               placeholder="Enter password of your choice"
              className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
               placeholder="confirm your password"
              className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600 text-sm text-center">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
