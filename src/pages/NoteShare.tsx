import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Download,
  Search,
  Filter,
  FileText,
  BookOpen,
  ArrowLeft,
  LogOut,
  User,
  Calendar,
  Tag,
  X,
  ChevronDown,
  Trophy,
  Star,
  TrendingUp,
  Award,
  Crown,
  Medal,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Note {
  id: string;
  title: string;
  year: string;
  subject: string;
  description: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  uploadedById: string; // ADD THIS FIELD
  uploadDate: string;
  fileContent?: string;
  downloads: number;
}

interface UserData {
  name: string;
  department?: string;
}

interface Contributor {
  name: string;
  notesCount: number;
  totalDownloads: number;
}

// TF-IDF Implementation
function calculateTFIDF(query: string, documents: Note[]): Note[] {
  const words = query
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0);
  if (words.length === 0) return documents;

  const scores = documents.map((doc) => {
    const content =
      `${doc.title} ${doc.subject} ${doc.description}`.toLowerCase();
    const contentWords = content.split(" ");

    let score = 0;
    words.forEach((queryWord) => {
      const tf =
        contentWords.filter((word) => word.includes(queryWord)).length /
        contentWords.length;
      const docsContaining = documents.filter((d) =>
        `${d.title} ${d.subject} ${d.description}`
          .toLowerCase()
          .includes(queryWord)
      ).length;
      const idf = Math.log(documents.length / (docsContaining + 1));
      score += tf * idf;
    });

    return { ...doc, score };
  });

  return scores
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score);
}

// Utility functions
const getAvatarInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const loadNotes = (): Note[] => {
  const saved = localStorage.getItem("vitNotes");
  return saved ? JSON.parse(saved) : [];
};

const saveNotes = (notes: Note[]) => {
  localStorage.setItem("vitNotes", JSON.stringify(notes));
};

const getTopContributors = (notes: Note[]): Contributor[] => {
  const contributorMap = new Map<string, Contributor>();

  notes.forEach((note) => {
    const existing = contributorMap.get(note.uploadedBy);
    if (existing) {
      existing.notesCount += 1;
      existing.totalDownloads += note.downloads;
    } else {
      contributorMap.set(note.uploadedBy, {
        name: note.uploadedBy,
        notesCount: 1,
        totalDownloads: note.downloads,
      });
    }
  });

  return Array.from(contributorMap.values())
    .sort((a, b) => {
      // First sort by number of uploads (notesCount) - descending
      if (a.notesCount !== b.notesCount) {
        return b.notesCount - a.notesCount;
      }
      // If uploads are equal, then sort by downloads - descending
      return b.totalDownloads - a.totalDownloads;
    })
    .slice(0, 3);
};

const NoteShare = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent rendering if not authenticated

  const handleLogout = () => {
    logout(); // clears user from context + localStorage
    navigate("/"); // redirect without refresh
  };

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: "",
    year: "FY",
    subject: "",
    customSubject: "",
    description: "",
    file: null as File | null,
  });

  const years = ["FY", "SY", "TY", "B.Tech"];
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Programming",
    "Data Structures",
    "Algorithms",
    "Database Systems",
    "Computer Networks",
    "Operating Systems",
    "Software Engineering",
    "Machine Learning",
    "Web Development",
    "Mobile Development",
  ];

  // Load notes from localStorage
  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);
  }, []);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  // Search and filter logic
  useEffect(() => {
    let result = [...notes];

    if (searchQuery.trim()) {
      result = calculateTFIDF(searchQuery, result);
    }

    if (selectedYear !== "all") {
      result = result.filter((note) => note.year === selectedYear);
    }
    if (selectedSubject !== "all") {
      result = result.filter((note) => note.subject === selectedSubject);
    }

    setFilteredNotes(result);
  }, [searchQuery, selectedYear, selectedSubject, notes]);

  const handleUpload = () => {
    if (!uploadForm.title || !uploadForm.description || !uploadForm.file) {
      alert("Please fill all required fields and select a file");
      return;
    }

    const finalSubject =
      uploadForm.subject === "custom"
        ? uploadForm.customSubject
        : uploadForm.subject;
    if (!finalSubject) {
      alert("Please select or enter a subject");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newNote: Note = {
        id: Date.now().toString(),
        title: uploadForm.title,
        year: uploadForm.year,
        subject: finalSubject,
        description: uploadForm.description,
        fileName: uploadForm.file!.name,
        fileSize: (uploadForm.file!.size / 1024).toFixed(2) + " KB",
        uploadedBy: user.name,
        uploadedById: user.id, // ADD THIS LINE
        uploadDate: new Date().toLocaleDateString(),
        fileContent: e.target?.result as string,
        downloads: 0,
      };

      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      saveNotes(updatedNotes);

      setUploadForm({
        title: "",
        year: "FY",
        subject: "",
        customSubject: "",
        description: "",
        file: null,
      });
      setShowUploadForm(false);
    };
    reader.readAsDataURL(uploadForm.file);
  };

  const handleDownload = (note: Note) => {
    if (note.fileContent) {
      const link = document.createElement("a");
      link.href = note.fileContent;
      link.download = note.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Update downloads count
      const updatedNotes = notes.map((n) =>
        n.id === note.id ? { ...n, downloads: n.downloads + 1 } : n
      );
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
    }
  };

  const getTopContributors = (notes: Note[]): Contributor[] => {
    const contributorMap = new Map<string, Contributor>();

    notes.forEach((note) => {
      // Use uploadedById as the key for more accurate tracking
      const contributorId = note.uploadedById || note.uploadedBy;
      const existing = contributorMap.get(contributorId);
      if (existing) {
        existing.notesCount += 1;
        existing.totalDownloads += note.downloads;
      } else {
        contributorMap.set(contributorId, {
          name: note.uploadedBy,
          notesCount: 1,
          totalDownloads: note.downloads,
        });
      }
    });

    return Array.from(contributorMap.values())
      .sort((a, b) => {
        if (a.notesCount !== b.notesCount) {
          return b.notesCount - a.notesCount;
        }
        return b.totalDownloads - a.totalDownloads;
      })
      .slice(0, 3);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadForm({ ...uploadForm, file });
  };

  const topContributors = getTopContributors(notes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => (window.location.href = "/")}
                  className="hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </motion.div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    VIT Notes
                  </h1>
                  <p className="text-xs text-gray-500">Share • Learn • Excel</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">{notes.length}</span>
                  <span className="hidden sm:inline">notes</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">
                    {notes.reduce((sum, note) => sum + note.downloads, 0)}
                  </span>
                  <span className="hidden sm:inline">downloads</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-700">
                    {user.name}
                  </p>
                  {user.department && (
                    <p className="text-xs text-gray-500">{user.department}</p>
                  )}
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold">
                    {getAvatarInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search notes by title, subject, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 border-0 bg-white shadow-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="outline"
                    className="h-12 px-6 hover:bg-blue-50"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    <ChevronDown
                      className={`w-4 h-4 ml-2 transition-transform ${
                        showFilters ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => setShowUploadForm(true)}
                    className="h-12 px-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Notes
                  </Button>
                </motion.div>
              </div>

              {/* Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-lg p-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year
                        </label>
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="all">All Years</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <select
                          value={selectedSubject}
                          onChange={(e) => setSelectedSubject(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="all">All Subjects</option>
                          {subjects.map((subject) => (
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Notes Grid */}
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredNotes.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="col-span-full"
                  >
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-12 text-center">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                          className="w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                          <FileText className="w-10 h-10 text-green-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-3">
                          {notes.length === 0
                            ? "No notes yet"
                            : "No notes found"}
                        </h3>
                        <p className="text-gray-500 text-lg">
                          {notes.length === 0
                            ? "Be the first to upload and share your notes with fellow students!"
                            : searchQuery ||
                              selectedYear !== "all" ||
                              selectedSubject !== "all"
                            ? "Try adjusting your search or filters"
                            : "Something went wrong"}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  filteredNotes.map((note, index) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm group cursor-pointer h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {note.title}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge className="bg-blue-100 text-blue-700 border-0">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {note.year}
                                </Badge>
                                <Badge className="bg-green-100 text-green-700 border-0">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {note.subject}
                                </Badge>
                              </div>
                            </div>
                            <FileText className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                            {note.description}
                          </p>

                          <div className="space-y-3 mt-auto">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <User className="w-3 h-3" />
                              <span>By {note.uploadedBy}</span>
                              <span>•</span>
                              <span>{note.uploadDate}</span>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className="truncate mr-2">
                                {note.fileName}
                              </span>
                              <span>{note.fileSize}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Download className="w-3 h-3" />
                                <span>{note.downloads} downloads</span>
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  onClick={() => handleDownload(note)}
                                  size="sm"
                                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  Download
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </AnimatePresence>
          </div>

          {/* Sidebar - Top Contributors */}
          {notes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full lg:w-80"
            >
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                        Top Contributors
                      </h2>
                      <p className="text-xs text-gray-500">
                        Most downloaded notes
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {topContributors.length === 0 ? (
                      <div className="text-center py-6">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">
                          No contributors yet
                        </p>
                      </div>
                    ) : (
                      topContributors.map((contributor, index) => (
                        <motion.div
                          key={contributor.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50/30 hover:from-gray-100 hover:to-blue-100/50 transition-all duration-200"
                        >
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                                {getAvatarInitials(contributor.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                              {index === 0 && (
                                <Crown className="w-4 h-4 text-yellow-500" />
                              )}
                              {index === 1 && (
                                <Medal className="w-4 h-4 text-gray-400" />
                              )}
                              {index === 2 && (
                                <Award className="w-4 h-4 text-orange-500" />
                              )}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900 truncate text-sm">
                                {contributor.name}
                              </h3>
                              {index === 0 && (
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{contributor.notesCount} notes</span>
                              <span>
                                {contributor.totalDownloads} downloads
                              </span>
                            </div>
                          </div>

                          <div
                            className={`text-right ${
                              index === 0
                                ? "text-yellow-600"
                                : index === 1
                                ? "text-gray-600"
                                : "text-orange-600"
                            }`}
                          >
                            <div className="text-lg font-bold">
                              #{index + 1}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Stats Summary */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {notes.length}
                        </div>
                        <div className="text-xs text-gray-500">Total Notes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {notes.reduce((sum, note) => sum + note.downloads, 0)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Total Downloads
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {showUploadForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Upload Notes
                    </h2>
                    <Button
                      onClick={() => setShowUploadForm(false)}
                      variant="ghost"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <Input
                        value={uploadForm.title}
                        onChange={(e) =>
                          setUploadForm({
                            ...uploadForm,
                            title: e.target.value,
                          })
                        }
                        placeholder="Enter note title"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year *
                        </label>
                        <select
                          value={uploadForm.year}
                          onChange={(e) =>
                            setUploadForm({
                              ...uploadForm,
                              year: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          value={uploadForm.subject}
                          onChange={(e) =>
                            setUploadForm({
                              ...uploadForm,
                              subject: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select subject</option>
                          {subjects.map((subject) => (
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                          <option value="custom">Other (Custom)</option>
                        </select>
                      </div>
                    </div>

                    {uploadForm.subject === "custom" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Subject *
                        </label>
                        <Input
                          value={uploadForm.customSubject}
                          onChange={(e) =>
                            setUploadForm({
                              ...uploadForm,
                              customSubject: e.target.value,
                            })
                          }
                          placeholder="Enter custom subject name"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <Textarea
                        value={uploadForm.description}
                        onChange={(e) =>
                          setUploadForm({
                            ...uploadForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe the content of your notes"
                        rows={3}
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File (PDF/DOCX) *
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {uploadForm.file && (
                        <p className="text-sm text-gray-600 mt-2">
                          Selected: {uploadForm.file.name} (
                          {(uploadForm.file.size / 1024).toFixed(2)} KB)
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      onClick={() => setShowUploadForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={handleUpload}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Share knowledge • Build community • Excel together
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteShare;
