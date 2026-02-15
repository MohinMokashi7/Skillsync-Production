import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {
    try {
      const response = await axiosInstance.get("/projects/my-projects");
      setProjects(response.data);
    } catch (err) {
      setError("Failed to load your projects.");
    }
  };

  const updateVisibility = async (projectId, currentVisibility) => {
    const newVisibility =
      currentVisibility === "PUBLIC" ? "UNLISTED" : "PUBLIC";

    try {
      await axiosInstance.patch(
        `/projects/${projectId}/visibility?visibility=${newVisibility}`
      );

      fetchMyProjects(); // refresh list
    } catch (err) {
      console.log(err);
      alert("Failed to update visibility");
    }
  };

  // 🚀 Step 2: Add Copy Function
  const copyToClipboard = (projectId) => {
    // 🚀 Step 1: Generate Share URL dynamically
    const shareUrl = `${window.location.origin}/projects/${projectId}`;
    
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-8 text-slate-800">
          My Projects
        </h1>

        {error && (
          <p className="text-red-500 mb-6">{error}</p>
        )}

        {projects.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <p className="text-slate-500">
              You haven’t created any projects yet.
            </p>

            <button
              onClick={() => navigate("/create-project")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-100"
              >
                <div className="flex justify-between items-start flex-col md:flex-row gap-4">

                  {/* Left Side */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-slate-800">
                      {project.title}
                    </h2>

                    <p className="text-slate-500 text-sm mt-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.requiredRoleDto?.map((role, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium"
                        >
                          {role.roleName}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 text-xs text-slate-500">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          project.status === "OPEN"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-500">
                      Visibility:{" "}
                      <span
                        className={`font-semibold ${
                          project.visibility === "PUBLIC"
                            ? "text-blue-600"
                            : "text-purple-600"
                        }`}
                      >
                        {project.visibility}
                      </span>
                    </div>

                    {/* 🚀 Step 3: Show Share Section for UNLISTED */}
                    {project.visibility === "UNLISTED" && (
                      <div className="mt-3 bg-purple-50 border border-purple-200 p-3 rounded-lg text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <span className="text-purple-700">
                          This project is unlisted. Share this link with teammates.
                        </span>

                        <button
                          onClick={() => copyToClipboard(project.id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-xs transition-colors"
                        >
                          Copy Link
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Side Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    
                    <button
                      onClick={() =>
                        updateVisibility(project.id, project.visibility)
                      }
                      className="px-4 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition text-slate-700"
                    >
                      {project.visibility === "PUBLIC"
                        ? "Make Unlisted"
                        : "Make Public"}
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/projects/${project.id}`)
                      }
                      className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition text-sm"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/project-applications/${project.id}`
                        )
                      }
                      className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-black transition text-sm"
                    >
                      View Applications
                    </button>
                    <button
                      onClick={() =>
                      navigate(`/team-dashboard/${project.id}`)
                           }
                         className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                          >
                   Team Dashboard
                     </button>

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

export default MyProjects;