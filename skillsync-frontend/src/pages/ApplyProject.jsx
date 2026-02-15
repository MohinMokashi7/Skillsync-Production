import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function ApplyProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await axiosInstance.get(`/projects/${projectId}`);
      setProject(response.data);
    } catch (err) {
      setError("Failed to load project.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedRoleId) {
      setError("Please select a role.");
      return;
    }

    try {
      await axiosInstance.post(
        `/applications/${projectId}/apply`,
        {
          coverLetter,
          requiredRoleId: selectedRoleId,
        }
      );

      setSuccess("Application submitted successfully!");

      setTimeout(() => {
        navigate("/my-applications");
      }, 1500);

    } catch (err) {
  if (err.response && err.response.data) {
    setError(err.response.data);
  } else {
    setError("Something went wrong.");
  }
}

  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 md:px-12 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Apply to {project.title}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Role Selection */}
          <div>
            <label className="text-sm font-medium text-slate-600">
              Select Role
            </label>

            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg"
            >
              <option value="">Choose a role</option>

              {project.requiredRoleDto?.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="text-sm font-medium text-slate-600">
              Cover Letter
            </label>

            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Explain why you're a good fit..."
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg h-32"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {success && (
            <p className="text-green-600 text-sm">{success}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
}

export default ApplyProject;
