import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  // Check for token to determine if user is logged in
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await axiosInstance.get(`/projects/${id}`);
      setProject(response.data);
    } catch (err) {
      setError("Failed to load project.");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 md:px-12 py-10">

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        {/* Title */}
        <div className="flex justify-between items-start flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {project.title}
            </h1>

            <p className="text-slate-500 mt-2">
              {project.description}
            </p>
          </div>

          {/* Status Badge */}
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              project.status === "OPEN"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-sm">

          <div>
            <span className="font-semibold">Category:</span>{" "}
            {project.category}
          </div>

          <div>
            <span className="font-semibold">Location:</span>{" "}
            {project.location || "Flexible / Not specified"}
          </div>

          <div>
            <span className="font-semibold">Expected Duration:</span>{" "}
            {project.expectedDuration || "Not specified"}
          </div>

          <div>
            <span className="font-semibold">Team Size:</span>{" "}
            {project.teamSize}
          </div>

          <div>
            <span className="font-semibold">Visibility:</span>{" "}
            {project.visibility}
          </div>

        </div>

        {/* Required Roles */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Required Roles
          </h2>

          {project.requiredRoleDto?.map((role, index) => (
            <div
              key={index}
              className="border border-slate-100 p-5 rounded-xl mb-4 shadow-sm"
            >
              {/* Role Name */}
              <h3 className="font-semibold text-lg text-slate-800 border-b border-slate-100 pb-2">
                {role.roleName}
              </h3>

              {/* Skills Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
                <span className="text-sm font-semibold text-slate-500">
                  Skills:
                </span>
                
                <div className="flex flex-wrap gap-2">
                  {role.requiredSkills?.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Apply Button Logic */}
        {project.status === "OPEN" && project.ownerEmail !== profile?.email && (
          <div className="mt-8 text-right">
            {token ? (
              <button
                onClick={() => navigate(`/apply/${project.id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
              >
                Apply to Project
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
              >
                Login to Apply
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default ProjectDetails;