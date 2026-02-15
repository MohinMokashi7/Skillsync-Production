import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("ACCEPTED");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get(
        "/applications/My-applications"
      );
      setApplications(response.data);
    } catch (err) {
      setError("Failed to load applications.");
    }
  };

  const filteredApplications = applications.filter(
    (app) => app.status === activeTab
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-8">
          My Applications
        </h1>

        {error && <p className="text-red-500">{error}</p>}

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {["ACCEPTED", "PENDING", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                activeTab === status
                  ? status === "ACCEPTED"
                    ? "bg-green-600 text-white"
                    : status === "PENDING"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Cards */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <p className="text-slate-500">
              No {activeTab.toLowerCase()} applications.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredApplications.map((app) => (
              <div
                key={app.applicationId}
                className="bg-white p-6 rounded-2xl shadow border border-slate-100"
              >
                <h2 className="text-lg font-semibold text-slate-800">
                  {app.projectTitle}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Role: {app.roleName}
                </p>

                <p className="text-sm mt-2">
                  Match Score:{" "}
                  <span className="font-semibold text-blue-600">
                    {app.matchScore?.toFixed(1)}%
                  </span>
                </p>

                <p className="text-sm mt-3 text-slate-600">
                  {app.coverLetter}
                </p>

                {activeTab === "ACCEPTED" && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={() =>
                       navigate(`/team-dashboard/${app.projectId}`)

                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      View TeamDashboard
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;
