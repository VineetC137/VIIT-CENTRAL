import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft,
  LogOut,
  GraduationCap,
  Edit3,
  Save,
  X,
  Users,
  BookOpen,
  ChevronDown,
  FileText,
  Share,
  Calendar,
  Upload,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Types
interface UserProfile {
  id?: string;
  name: string;
  email: string;
  department: string;
  year: string;
}

interface SharedNote {
  id: string;
  title: string;
  subject: string;
  year: string; // ADD THIS
  description: string; // ADD THIS
  fileName: string; // ADD THIS
  fileSize: string; // ADD THIS
  sharedDate: string; // This is the uploadDate
  downloads: number;
  uploadedBy: string;
  uploadedById: string; // This was userId before
}

// Utility functions
const getAvatarInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Load notes specific to the current user
const loadUserNotes = (userId: string): SharedNote[] => {
  try {
    const saved = localStorage.getItem("vitNotes"); // Same key as NoteShare
    const allNotes = saved ? JSON.parse(saved) : [];

    // Filter notes by uploadedById and convert to SharedNote format
    return allNotes
      .filter((note: any) => note.uploadedById === userId)
      .map((note: any) => ({
        id: note.id,
        title: note.title,
        subject: note.subject,
        year: note.year,
        description: note.description,
        fileName: note.fileName,
        fileSize: note.fileSize,
        sharedDate: note.uploadDate,
        downloads: note.downloads,
        uploadedBy: note.uploadedBy,
        uploadedById: note.uploadedById,
      }));
  } catch (error) {
    console.error("Error loading user notes:", error);
    return [];
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserProfile, fetchUserProfile } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>({
    name: "",
    email: "",
    department: "",
    year: "",
  });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sharedNotes, setSharedNotes] = useState<SharedNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const years = ["First Year", "Second Year", "Third Year", "Final Year"];
  const departments = [
    "Computer Engineering",
    "Information Technology",
    "Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Artificial Intelligence & Data Science",
    "Cybersecurity",
    "Instrumentation Engineering",
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  // Load user profile from AuthContext/database
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);

        const fullProfile = await fetchUserProfile(user.id);

        if (fullProfile) {
          setUserProfile(fullProfile);
          setEditForm(fullProfile);

          // Load user's shared notes
          const userNotes = loadUserNotes(user.id);
          setSharedNotes(userNotes);
        } else {
          const basicProfile: UserProfile = {
            id: user.id,
            name: user.name || "",
            email: user.email || "",
            department: user.department || "",
            year: user.year || "",
          };

          setUserProfile(basicProfile);
          setEditForm(basicProfile);

          if (
            !basicProfile.name ||
            !basicProfile.email ||
            !basicProfile.department ||
            !basicProfile.year
          ) {
            setIsEditing(true);
          }

          setSharedNotes([]);
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        if (user) {
          const fallbackProfile: UserProfile = {
            id: user.id,
            name: user.name || "",
            email: user.email || "",
            department: user.department || "",
            year: user.year || "",
          };
          setUserProfile(fallbackProfile);
          setEditForm(fallbackProfile);
          setIsEditing(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();

    // Refresh notes when component becomes visible (user navigates back)
    const handleVisibilityChange = () => {
      if (!document.hidden && user?.id) {
        // Inline refresh function
        const userNotes = loadUserNotes(user.id);
        setSharedNotes(userNotes);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [user, fetchUserProfile]);

  // Don't render if not authenticated
  if (!user) return null;

  const handleSaveProfile = async () => {
    if (
      !editForm.name ||
      !editForm.email ||
      !editForm.department ||
      !editForm.year
    ) {
      alert("Please fill all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setSaving(true);

      // Update profile in AuthContext/database
      const success = await updateUserProfile(user.id, editForm);

      if (success) {
        setUserProfile(editForm);
        setIsEditing(false);

        // Reload user's shared notes in case the user info changed
        const userNotes = loadUserNotes(user.id);
        setSharedNotes(userNotes);

        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("An error occurred while saving your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (!userProfile) {
      return;
    }
    setEditForm(userProfile);
    setIsEditing(false);
  };

  const startEditing = () => {
    if (userProfile) {
      setEditForm(userProfile);
    }
    setIsEditing(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:block">Back to Home</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    VIT Pune
                  </h1>
                  <p className="text-xs text-gray-600">Student Profile</p>
                </div>
              </div>
            </div>

            {userProfile && !isEditing && (
              <div className="flex items-center gap-3">
                <button
                  onClick={startEditing}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  disabled={saving}
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {getAvatarInitials(userProfile.name)}
                    </div>
                    <span className="hidden md:block font-medium text-gray-700">
                      {userProfile.name.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900 text-sm">
                          {userProfile.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {userProfile.email}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          {userProfile.department} • {userProfile.year}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-3 text-red-600 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {showUserMenu && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowUserMenu(false)}
          />
        )}
      </header>

      {/* Profile Content */}
      <main className="pt-28 container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Information Card */}
          <div className="bg-white rounded-xl shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center gap-4">
                {userProfile && !isEditing && (
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20 text-white text-xl font-bold">
                    {getAvatarInitials(userProfile.name)}
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {isEditing ? "Edit Your Profile" : "My Profile"}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    {isEditing
                      ? "Update your profile information"
                      : `Welcome back, ${userProfile?.name.split(" ")[0]}!`}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={saving}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={saving}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department *
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={editForm.department}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            department: e.target.value,
                          })
                        }
                        disabled={saving}
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Academic Year *
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={editForm.year}
                        onChange={(e) =>
                          setEditForm({ ...editForm, year: e.target.value })
                        }
                        disabled={saving}
                        required
                      >
                        <option value="">Select Year</option>
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Profile
                        </>
                      )}
                    </button>
                    {userProfile && (
                      <button
                        onClick={handleCancelEdit}
                        disabled={saving}
                        className="px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ) : userProfile ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Full Name
                        </label>
                        <p className="text-lg font-semibold text-gray-900">
                          {userProfile.name}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Email Address
                        </label>
                        <p className="text-gray-700">{userProfile.email}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Department
                        </label>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {userProfile.department}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Academic Year
                        </label>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                          {userProfile.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {sharedNotes.length}
                      </p>
                      <p className="text-sm text-gray-500">Notes Shared</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {sharedNotes.reduce(
                          (sum, note) => sum + note.downloads,
                          0
                        )}
                      </p>
                      <p className="text-sm text-gray-500">Total Downloads</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {userProfile.year}
                      </p>
                      <p className="text-sm text-gray-500">Current Year</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Welcome to VIT Notes
                  </h3>
                  <p className="text-gray-500">
                    Please complete your profile to get started
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Shared Notes Section */}
          {userProfile && !isEditing && (
            <div className="bg-white rounded-xl shadow-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6" />
                    <h3 className="text-xl font-bold">My Shared Notes</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      {sharedNotes.length} Notes
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/notes")}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload New Note
                  </button>
                </div>
                <p className="text-green-100 text-sm mt-2">
                  Notes you've shared with the VIT community
                </p>
              </div>

              <div className="p-6">
                {sharedNotes.length > 0 ? (
                  <div className="space-y-4">
                    {sharedNotes.map((note) => (
                      <div
                        key={note.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {note.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {note.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {note.subject}
                                </span>
                                <span className="flex items-center gap-1">
                                  <GraduationCap className="w-4 h-4" />
                                  {note.year}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(note.sharedDate)}
                                </span>
                                <span className="flex items-center gap-1 text-green-600">
                                  <Share className="w-4 h-4" />
                                  {note.downloads} downloads
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {note.fileName} • {note.fileSize}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate("/notes")}
                            className="px-3 py-1 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded text-sm transition-colors"
                          >
                            View in Notes
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      No shared notes yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Start sharing your notes to help fellow students!
                    </p>
                    <button
                      onClick={() => navigate("/notes")}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
                    >
                      <Share className="w-4 h-4" />
                      Share Your First Note
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
