import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { CATEGORY_OPTIONS } from "../config/categories";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("OPEN");
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    fetchProfile();
  }, []);

  
  const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get("/about/profile");
    setProfile(response.data);
  } catch (err) {
    setProfile(null);
  }
};

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/projects");
      setProjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ 2️⃣ Add search function
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchProjects();
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/projects/search?keyword=${searchTerm}`
      );
      setProjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Filter projects by Tab (Open/Closed)
  const filteredProjects = projects.filter((project) => {
  const statusMatch = project.status === activeTab;

  const categoryMatch =
    selectedCategory === "" ||
    project.category === selectedCategory;

  return statusMatch && categoryMatch;
});

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-100 px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Build Your Own Team
            </h1>
            <p className="text-slate-500 mt-2">
              Create a project and find people with the exact skills you need.
            </p>

            <button
              onClick={() => navigate("/create-project")}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md"
            >
              Create Project
            </button>
          </div>

          <div className="hidden md:block w-72 h-40 bg-blue-100 rounded-xl"></div>
        </div>
      </div>
      {profile && (!profile.skills || profile.skills.length === 0) && (
      <div className="max-w-6xl mx-auto mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-xl flex justify-between items-center">
    <p className="text-sm">
      Add your skills to improve your match score and get selected faster.
       </p>

       <button
      onClick={() => navigate("/profile")}
      className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
        >
      Update Profile
        </button>
       </div>
            )}


      {/* SEARCH + TABS SECTION */}
      <div className="px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
  type="text"
  placeholder="Search by project title, skill, role..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleSearch();
  }}
  className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


            {/* ✅ 3️⃣ Update Search Button */}
            <button
            onClick={handleSearch}
       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
            Search
            </button>
           {filteredProjects.length === 0 && (
         <div className="text-center text-slate-500 mt-10">
           No projects found.
          </div>
               )}

          </div>
{/* Category Filter */}
<div className="flex flex-wrap gap-3 mb-6">
  <button
    onClick={() => setSelectedCategory("")}
    className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
      selectedCategory === ""
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-slate-600 border-slate-200"
    }`}
  >
    All
  </button>

  {CATEGORY_OPTIONS.map((cat) => (
    <button
      key={cat.value}
      onClick={() => setSelectedCategory(cat.value)}
      className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
        selectedCategory === cat.value
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
      }`}
    >
      {cat.label}
    </button>
  ))}
</div>

         

          {/* PROJECT CARDS */}
          <div className="space-y-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-md p-6 border border-slate-100"
                >
                  <div className="flex justify-between items-start flex-col md:flex-row gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">
                        {project.title}
                      </h2>

                      <p className="text-slate-500 mt-2 text-sm">
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
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        View Details
                      </button>

                      {project.status === "OPEN" && (
                        <button
                          onClick={() => navigate(`/apply/${project.id}`)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-400">No projects found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;