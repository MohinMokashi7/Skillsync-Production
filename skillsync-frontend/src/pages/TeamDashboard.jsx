import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function TeamDashboard() {
  const { projectId } = useParams();

  const [teamMembers, setTeamMembers] = useState([]);
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");
  const [error, setError] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    fetchTeam();
    fetchNotices();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axiosInstance.get(
        `/team/${projectId}/team`
      );

      setIsOwner(response.data.owner);
      setTeamMembers(response.data.members);

    } catch (err) {
      setError("Not authorized to view team.");
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await axiosInstance.get(
        `/notice/${projectId}`
      );
      setNotices(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostNotice = async () => {
    if (!newNotice.trim()) return;

    try {
      await axiosInstance.post(
        `/notice/${projectId}`,
        newNotice,
        {
          headers: { "Content-Type": "text/plain" },
        }
      );

      setNewNotice("");
      fetchNotices();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-8">
          Team Dashboard
        </h1>

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {/* TEAM MEMBERS */}
        <div className="bg-white p-6 rounded-2xl shadow border border-slate-100 mb-10">
          <h2 className="text-lg font-semibold mb-6">
            Team Members
          </h2>

          <div className="space-y-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="border border-slate-100 p-4 rounded-xl"
              >
                <h3 className="font-semibold">
                  {member.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {member.email}
                </p>

                <p className="text-sm mt-2">
                  Role: {member.roleName}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {member.skills?.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NOTICEBOARD */}
        <div className="bg-white p-6 rounded-2xl shadow border border-slate-100">
          <h2 className="text-lg font-semibold mb-6">
            Noticeboard
          </h2>

          {/* Post Notice (Owner Only) */}
          {isOwner && (
            <div className="mb-6">
              <textarea
                value={newNotice}
                onChange={(e) => setNewNotice(e.target.value)}
                placeholder="Post an announcement..."
                className="w-full border rounded-lg px-4 py-3"
              />

              <button
                onClick={handlePostNotice}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Post Notice
              </button>
            </div>
          )}

          {/* Notice List */}
          {notices.length === 0 ? (
            <p className="text-slate-500">
              No notices yet.
            </p>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="border border-slate-100 p-4 rounded-xl"
                >
                  <p className="text-slate-800">
                    {notice.notice}
                  </p>

                  <div className="text-xs text-slate-500 mt-2 flex justify-between">
                    <span>By {notice.ownerName}</span>
                    <span>
                      {new Date(
                        notice.timestamp
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default TeamDashboard;