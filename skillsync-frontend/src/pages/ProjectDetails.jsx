import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProject();
    fetchProfile();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axiosInstance.get(`/projects/${id}`);
      setProject(response.data);
      setFormData(response.data);
    } catch {
      setError("Failed to load project.");
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/about/profile");
      setProfile(response.data);
    } catch {
      setProfile(null);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/projects/${project.id}`, formData);
      setEditMode(false);
      fetchProject();
    } catch (err) {
      console.log(err);
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

  const isOwner = profile && project.ownerEmail === profile.email;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 md:px-12 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        {/* TITLE + DESCRIPTION */}
        <div className="mb-6">
          {editMode ? (
            <>
              <input
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-lg mb-3"
              />

              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-lg"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-slate-800">
                {project.title}
              </h1>
              <p className="text-slate-500 mt-2">
                {project.description}
              </p>
            </>
          )}
        </div>

        {/* STATUS */}
        <div className="mb-6">
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

        {/* META INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-8">

          {["category", "location", "expectedDuration", "teamSize", "visibility"].map((field) => (
            <div key={field}>
              <span className="font-semibold capitalize">{field}:</span>{" "}
              {editMode ? (
                <input
                  value={formData[field] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="border px-2 py-1 rounded ml-2"
                />
              ) : (
                project[field] || "-"
              )}
            </div>
          ))}

        </div>

        {/* ROLES */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Required Roles</h2>

          {editMode
            ? formData.requiredRoleDto?.map((role, index) => (
                <div key={index} className="border p-4 rounded mb-4">

                  <input
                    value={role.roleName || ""}
                    onChange={(e) => {
                      const updated = [...formData.requiredRoleDto];
                      updated[index].roleName = e.target.value;
                      setFormData({ ...formData, requiredRoleDto: updated });
                    }}
                    placeholder="Role Name"
                    className="border px-3 py-2 rounded w-full mb-2"
                  />

                  <input
                    value={(role.requiredSkills || []).join(", ")}
                    onChange={(e) => {
                      const updated = [...formData.requiredRoleDto];
                      updated[index].requiredSkills =
                        e.target.value.split(",").map(s => s.trim());
                      setFormData({ ...formData, requiredRoleDto: updated });
                    }}
                    placeholder="Comma separated skills"
                    className="border px-3 py-2 rounded w-full"
                  />

                  <button
                    onClick={() => {
                      const updated = formData.requiredRoleDto.filter(
                        (_, i) => i !== index
                      );
                      setFormData({ ...formData, requiredRoleDto: updated });
                    }}
                    className="mt-2 text-red-500"
                  >
                    Remove Role
                  </button>
                </div>
              ))
            : project.requiredRoleDto?.map((role, index) => (
                <div key={index} className="border p-4 rounded mb-4">
                  <h3 className="font-semibold">{role.roleName}</h3>
                  <p>{role.requiredSkills?.join(", ")}</p>
                </div>
              ))}

          {editMode && (
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  requiredRoleDto: [
                    ...(formData.requiredRoleDto || []),
                    { roleName: "", requiredSkills: [] }
                  ]
                })
              }
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Role
            </button>
          )}
        </div>

        {/* APPLY BUTTON */}
        {project.status === "OPEN" && profile && !isOwner && (
          <div className="mt-8 text-right">
            {token ? (
              <button
                onClick={() => navigate(`/apply/${project.id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md"
              >
                Apply to Project
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md"
              >
                Login to Apply
              </button>
            )}
          </div>
        )}

        {/* EDIT BUTTON */}
        {isOwner && !editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded-lg"
          >
            Edit Project
          </button>
        )}

        {/* SAVE / CANCEL */}
        {isOwner && editMode && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              Save Changes
            </button>

            <button
              onClick={() => {
                setEditMode(false);
                setFormData(project);
              }}
              className="bg-gray-300 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProjectDetails;