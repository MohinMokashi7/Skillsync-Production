import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { CATEGORY_OPTIONS } from "../config/categories";

function CreateProject() {
  const navigate = useNavigate();

  const [project, setProject] = useState({
    title: "",
    description: "",
    category: "HACKATHON",
    location: "",
    expectedDuration: "",
    teamSize: 1,
    visibility: "PUBLIC",
    requiredRoleDto: [
      {
        roleName: "",
        requiredSkills: [""],
      },
    ],
  });

  const [error, setError] = useState("");

  // Handle basic fields
  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  // Handle role name change
  const handleRoleChange = (index, value) => {
    const updatedRoles = [...project.requiredRoleDto];
    updatedRoles[index].roleName = value;
    setProject({ ...project, requiredRoleDto: updatedRoles });
  };

  // Handle skill change
  const handleSkillChange = (roleIndex, skillIndex, value) => {
    const updatedRoles = [...project.requiredRoleDto];
    updatedRoles[roleIndex].requiredSkills[skillIndex] = value;
    setProject({ ...project, requiredRoleDto: updatedRoles });
  };

  // Add new role
  const addRole = () => {
    setProject({
      ...project,
      requiredRoleDto: [
        ...project.requiredRoleDto,
        { roleName: "", requiredSkills: [""] },
      ],
    });
  };

  // Add skill to role
  const addSkill = (roleIndex) => {
    const updatedRoles = [...project.requiredRoleDto];
    updatedRoles[roleIndex].requiredSkills.push("");
    setProject({ ...project, requiredRoleDto: updatedRoles });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axiosInstance.post("/projects", project);
      navigate("/my-projects");
    } catch (err) {
      setError("Failed to create project.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 md:px-12 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Create Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info */}
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={project.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={project.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

         <div>
  <label className="block text-sm font-medium mb-2">
    Project Category
  </label>

  <select
    name="category"
    value={project.category}
    onChange={handleChange}
    className="w-full px-4 py-3 border rounded-lg bg-white"
  >
    <option value="">Select Category</option>
    {CATEGORY_OPTIONS.map((cat) => (
      <option key={cat.value} value={cat.value}>
        {cat.label}
      </option>
    ))}
  </select>
</div>


          <div>
       <label className="text-sm font-medium text-slate-600">
         Location
          </label>

           <select
          name="location"
           value={project.location}
         onChange={handleChange}
         className="w-full mt-2 px-4 py-3 border rounded-lg bg-white"
            >
         <option value="">Select Location (Optional)</option>
        <option value="ONLINE">Online</option>
          <option value="ON_LOCATION">On Location</option>
       </select>

       <p className="text-xs text-slate-500 mt-1">
       Leave empty if flexible.
     </p>
       </div>

          <input
            type="text"
            name="expectedDuration"
            placeholder="Expected Duration (e.g. 2 Months)"
            value={project.expectedDuration}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <div>
         <label className="text-sm font-medium text-slate-600">
         Team Size
       </label>
      <input
       type="number"
       name="teamSize"
       value={project.teamSize}
          onChange={handleChange}
        min="1"
          required
         placeholder="Enter number of team members"
         className="w-full mt-2 px-4 py-3 border rounded-lg"
        />
         </div>


          <select
            name="visibility"
            value={project.visibility}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="PUBLIC">Public</option>
            <option value="UNLISTED">Unlisted</option>
          </select>

          {/* Roles Section */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Required Roles</h2>

            {project.requiredRoleDto.map((role, roleIndex) => (
              <div key={roleIndex} className="border p-4 rounded-lg mb-4">

                <input
                  type="text"
                  placeholder="Role Name"
                  value={role.roleName}
                  onChange={(e) =>
                    handleRoleChange(roleIndex, e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-lg mb-3"
                />

                {role.requiredSkills.map((skill, skillIndex) => (
                  <input
                    key={skillIndex}
                    type="text"
                    placeholder="Required Skill"
                    value={skill}
                    onChange={(e) =>
                      handleSkillChange(roleIndex, skillIndex, e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg mb-2"
                  />
                ))}

                <button
                  type="button"
                  onClick={() => addSkill(roleIndex)}
                  className="text-blue-600 text-sm"
                >
                  + Add Skill
                </button>

              </div>
            ))}

            <button
              type="button"
              onClick={addRole}
              className="text-blue-600 font-medium"
            >
              + Add Another Role
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Create Project
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateProject;
