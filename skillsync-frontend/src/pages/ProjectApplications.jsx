import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function ProjectApplications() {
  const { projectId } = useParams();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get(
        `/applications/${projectId}`
      );
      setApplications(response.data);
    } catch (err) {
      setError("Failed to load applications.");
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      // Using the backend endpoint logic: 
      // REJECTED status is used for both rejecting and removing.
      await axiosInstance.put(
        `/applications/${applicationId}/status?status=${status}`
      );
      fetchApplications(); // Refresh list after update
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 md:px-12 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          Applications
        </h1>

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {applications.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center shadow">
            No applications yet.
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                // CRITICAL FIX: Use app.applicationId instead of app.id
                key={app.applicationId} 
                className="bg-white p-6 rounded-2xl shadow border border-slate-100"
              >
                <div className="flex justify-between items-start flex-col md:flex-row gap-4">

                  {/* Applicant Details */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-slate-800">
                      {app.applicantName}
                    </h2>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {app.applicantSkills?.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-slate-500 mt-2">
                      Role: {app.roleName}
                    </p>

                    <p className="text-sm mt-2 text-slate-600">
                      Match Score:{" "}
                      <span className="font-semibold text-blue-600">
                        {app.matchScore ? app.matchScore.toFixed(1) : 0}%
                      </span>
                    </p>

                    <p className="mt-3 text-slate-700 text-sm">
                      {app.coverLetter}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Status: <span className={`font-medium ${app.status === 'ACCEPTED' ? 'text-green-600' : 'text-slate-600'}`}>
                        {app.status}
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 items-end">
                    
                    {/* Logic for PENDING Applications */}
                    {app.status === "PENDING" && (
                      <div className="flex gap-3">
                        <button
                          // CRITICAL FIX: app.applicationId
                          onClick={() => updateStatus(app.applicationId, "ACCEPTED")}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          Accept
                        </button>

                        <button
                          // CRITICAL FIX: app.applicationId
                          onClick={() => updateStatus(app.applicationId, "REJECTED")}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {/* Logic for ACCEPTED Applications (Remove from Team) */}
                    {app.status === "ACCEPTED" && (
                      <button
                        // CRITICAL FIX: app.applicationId
                        onClick={() => updateStatus(app.applicationId, "REJECTED")}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Remove From Team
                      </button>
                    )}
                    
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectApplications;