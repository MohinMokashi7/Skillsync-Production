import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { CATEGORY_OPTIONS } from "../config/categories";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/about/profile");
      setProfile(response.data);
      setFormData(response.data);
    } catch (err) {
      setError("Failed to load profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills" || name === "interestedCategories") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put("/about/profile", formData);
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 md:px-12 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold mb-8">My Profile</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* ACCOUNT INFO */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4">
            Account Information
          </h2>

          <div className="space-y-3 text-sm">
            <p><span className="font-medium">Name:</span> {profile.name}</p>
            <p><span className="font-medium">Email:</span> {profile.email}</p>
            <p><span className="font-medium">Phone:</span> {profile.phone}</p>
          </div>
        </div>

        {/* PROFESSIONAL PROFILE */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Professional Profile
          </h2>

          {!editMode ? (
            <>
              <div className="space-y-3 text-sm">
                <p><span className="font-medium">Bio:</span> {profile.bio || "-"}</p>
                <p><span className="font-medium">Location:</span> {profile.location || "-"}</p>
                <p><span className="font-medium">College:</span> {profile.college || "-"}</p>

                <p>
                  <span className="font-medium">Skills:</span>{" "}
                  {profile.skills?.length > 0
                    ? profile.skills.join(", ")
                    : "-"}
                </p>

                <p>
                  <span className="font-medium">Categories:</span>{" "}
                  {profile.interestedCategories?.length > 0
                    ? profile.interestedCategories.join(", ")
                    : "-"}
                </p>
              </div>

              <button
                onClick={() => setEditMode(true)}
                className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="space-y-4">

                <input
                  name="bio"
                  value={formData.bio || ""}
                  onChange={handleChange}
                  placeholder="Bio"
                  className="w-full border px-4 py-3 rounded-lg"
                />

                <input
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full border px-4 py-3 rounded-lg"
                />

                <input
                  name="college"
                  value={formData.college || ""}
                  onChange={handleChange}
                  placeholder="College"
                  className="w-full border px-4 py-3 rounded-lg"
                />

                {/* Skills */}
<div>
  <label className="block text-sm font-medium mb-2">
    Skills
  </label>

  <div className="flex flex-wrap gap-2 mb-3">
    {formData.skills?.map((skill, index) => (
      <span
        key={index}
        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-2"
      >
        {skill}
        <button
          onClick={() => {
            const updated = formData.skills.filter(
              (_, i) => i !== index
            );
            setFormData({ ...formData, skills: updated });
          }}
          className="text-red-500 text-xs"
        >
          ✕
        </button>
      </span>
    ))}
  </div>

  <input
    type="text"
    placeholder="Type skill and press Enter"
    className="w-full border px-4 py-2 rounded-lg"
    onKeyDown={(e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        e.preventDefault();
        setFormData({
          ...formData,
          skills: [
            ...(formData.skills || []),
            e.target.value.trim(),
          ],
        });
        e.target.value = "";
      }
    }}
  />
</div>


                {/* Categories */}
<div className="flex flex-wrap gap-3">
   <label className="block text-sm font-medium mb-2">
   Interested Categories :


  </label>

  {CATEGORY_OPTIONS.map((cat) => {
    const isSelected =
      formData.interestedCategories?.includes(cat.value);

    return (
      <button
        key={cat.value}
        type="button"
        onClick={() => {
          let updated;

          if (isSelected) {
            updated = formData.interestedCategories.filter(
              (c) => c !== cat.value
            );
          } else {
            updated = [
              ...(formData.interestedCategories || []),
              cat.value,
            ];
          }

          setFormData({
            ...formData,
            interestedCategories: updated,
          });
        }}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
          isSelected
            ? "bg-purple-100 text-purple-700 border-purple-400"
            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
        }`}
      >
        {cat.label}
      </button>
    );
  })}
</div>



              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => {
                    setEditMode(false);
                    setFormData(profile);
                  }}
                  className="bg-gray-300 px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;
