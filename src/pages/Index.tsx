import { useState } from "react";
import { VITChatbot } from "@/components/VITChatbot";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  MessageCircle,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Users,
  Award,
  BookOpen,
  Building,
  Star,
  ArrowRight,
  Play,
  Calendar,
  Trophy,
  Globe,
  Zap,
  LogIn,
  LogOut,
  Instagram,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, User } from "lucide-react";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1 });

  // Load saved userProfile from localStorage
  const savedProfile = localStorage.getItem("userProfile");
  const userProfile = savedProfile ? JSON.parse(savedProfile) : null;

  // Decide what to display
  const activeUser = userProfile || user;

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSocialClick = () => {
    if (user) {
      navigate("/social");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleNoteSharing = () => {
    if (user) {
      navigate("/notes");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const getAvatarInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const stats = [
    { number: "40+", label: "Years of Excellence", icon: Trophy },
    { number: "12+", label: "Engineering Departments", icon: Building },
    { number: "86.3%", label: "Placement Rate", icon: Award },
    { number: "45L", label: "Highest Package", icon: Star },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description:
        "World-class education with industry-aligned curriculum and modern laboratories",
      color: "bg-blue-600",
      bgColor: "bg-blue-50",
      isClickable: false,
    },
    {
      icon: Users,
      title: "VIT Social Network",
      description:
        "Connect with fellow students, share experiences, and build lasting friendships. Join discussions, share notes, and stay connected with your peers.",
      color: "bg-primary",
      bgColor: "bg-primary/5",
      isClickable: true,
    },
    {
      icon: BookOpen,
      title: "Note Sharing Platform",
      description:
        "Share and access study materials, lecture notes, and academic resources. Collaborate with classmates and enhance your learning experience.",
      color: "bg-green-600",
      bgColor: "bg-green-50",
      isClickable: true,
    },
    {
      icon: Zap,
      title: "Innovation Hub",
      description:
        "State-of-the-art research facilities and startup incubation programs",
      color: "bg-orange-600",
      bgColor: "bg-orange-50",
      isClickable: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full glass shadow-professional border-b z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-card hover-lift">
                <GraduationCap className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  VIT Pune
                </h1>
                <p className="text-sm text-muted-foreground">
                  Vishwakarma Institute of Technology
                </p>
              </div>
            </motion.div>

            <div className="flex gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleSocialClick}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-button hover-lift"
                >
                  <Users className="w-4 h-4 mr-2" />
                  VIT Social
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleNoteSharing}
                  className="bg-green-600 hover:bg-green-700 text-white shadow-button hover-lift"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Note Sharing
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleChatToggle}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-button hover-lift"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
              </motion.div>
              {user ? (
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      variant="ghost"
                      className="flex items-center gap-2 hover:bg-blue-50"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                          {getAvatarInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block font-medium text-gray-700">
                        {user.name.split(" ")[0]}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </Button>
                  </motion.div>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 glass rounded-lg shadow-professional py-2 animate-slide-up"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user.email || user.department}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          handleProfileClick();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </button>

                      <button
                        onClick={() => {
                          handleSocialClick();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                      >
                        <Users className="w-4 h-4" />
                        VIT Social
                      </button>

                      <button
                        onClick={() => {
                          handleNoteSharing();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                      >
                        <BookOpen className="w-4 h-4" />
                        My Notes
                      </button>

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-3 text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setIsAuthModalOpen(true)}
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white shadow-button hover-lift"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Click outside to close user menu */}
        {showUserMenu && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowUserMenu(false)}
          />
        )}
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-green-600/5"></div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-primary/10 text-primary border border-primary/20 hover-lift">
                  <Star className="w-3 h-3 mr-1" />
                  Established 1983
                </Badge>
                {user && (
                  <Badge className="bg-green-100 text-green-700 border border-green-200 hover-lift">
                    <Users className="w-3 h-3 mr-1" />
                    Welcome, {user.name.split(" ")[0]}!
                  </Badge>
                )}
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-primary">
                  Shape Your Future
                </span>
                <br />
                <span className="text-foreground">at VIT Pune</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join India's premier engineering institute with 40+ years of
                excellence. Experience world-class education, cutting-edge
                research, and exceptional placement opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={handleSocialClick}
                    className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg shadow-professional hover-lift"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    {user ? "Go to VIT Social" : "Join VIT Community"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-border hover:border-primary hover:text-primary px-8 py-4 text-lg shadow-button hover-lift"
                    onClick={() =>
                      window.open(
                        "https://youtu.be/cZ590Z8ROws?feature=shared",
                        "_blank"
                      )
                    }
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Campus Tour
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-professional hover-lift cursor-pointer"
                   onClick={() => window.open("https://youtu.be/cZ590Z8ROws", "_blank")}>
                <div className="w-full h-96 campus-photo bg-slate-100 flex items-center justify-center border border-border"
                     style={{
                       backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                         <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                           <rect width="400" height="300" fill="#f1f5f9"/>
                           <rect x="50" y="50" width="300" height="150" fill="#e2e8f0" rx="8"/>
                           <rect x="70" y="70" width="80" height="110" fill="#cbd5e1"/>
                           <rect x="170" y="70" width="80" height="110" fill="#cbd5e1"/>
                           <rect x="270" y="70" width="60" height="110" fill="#cbd5e1"/>
                           <circle cx="200" cy="240" r="30" fill="#22c55e"/>
                           <circle cx="150" cy="250" r="20" fill="#22c55e"/>
                           <circle cx="250" cy="250" r="25" fill="#22c55e"/>
                           <text x="200" y="280" text-anchor="middle" fill="#64748b" font-size="12">VIT Campus</text>
                         </svg>
                       `)}`
                     }}>
                  <div className="text-center bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                    <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Campus Virtual Tour
                    </h3>
                    <p className="text-muted-foreground">Click to watch our campus tour</p>
                  </div>
                </div>
                <div className="absolute inset-0 campus-overlay"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">VIT Pune Campus</h3>
                  <p className="text-white/90">
                    Modern facilities in a serene environment
                  </p>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass rounded-xl shadow-card p-4 hover-lift"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Top Ranked</p>
                    <p className="text-xs text-muted-foreground">Engineering College</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-4 -left-4 glass rounded-xl shadow-card p-4 hover-lift"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">5000+</p>
                    <p className="text-xs text-muted-foreground">Active Students</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 glass">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-primary">
              Excellence in Numbers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four decades of educational excellence and innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <Card className="p-8 border shadow-professional bg-card hover-lift">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-card">
                      <stat.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-primary">
              Why Choose VIT Pune?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover what makes us one of India's leading engineering
              institutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className={`group ${feature.isClickable ? 'cursor-pointer' : ''}`}
                onClick={
                  feature.title === "VIT Social Network"
                    ? handleSocialClick
                    : feature.title === "Note Sharing Platform"
                    ? handleNoteSharing
                    : undefined
                }
              >
                <Card className={`p-8 border shadow-professional ${feature.bgColor} hover-lift group ${feature.isClickable ? 'hover:shadow-xl' : ''}`}>
                  <CardContent className="p-0">
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-card group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    {feature.isClickable && (
                      <div className="flex items-center text-primary font-semibold group-hover:text-green-600 transition-colors">
                        <span>
                          {feature.title === "VIT Social Network" ? "Join Community" : "Access Platform"}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Gallery */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Our Beautiful Campus
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience world-class infrastructure and a vibrant learning
              environment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Campus Tour Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-professional group cursor-pointer"
              onClick={() =>
                window.open(
                  "https://youtu.be/cZ590Z8ROws",
                  "_blank"
                )
              }
            >
              <div className="w-full h-80 campus-photo bg-slate-200 flex items-center justify-center"
                   style={{
                     backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                       <svg width="600" height="320" xmlns="http://www.w3.org/2000/svg">
                         <rect width="600" height="320" fill="#e2e8f0"/>
                         <rect x="50" y="50" width="500" height="220" fill="#cbd5e1" rx="12"/>
                         <rect x="80" y="80" width="120" height="160" fill="#94a3b8"/>
                         <rect x="220" y="80" width="120" height="160" fill="#94a3b8"/>
                         <rect x="360" y="80" width="120" height="160" fill="#94a3b8"/>
                         <circle cx="300" cy="290" r="40" fill="#22c55e"/>
                         <circle cx="200" cy="300" r="25" fill="#22c55e"/>
                         <circle cx="400" cy="300" r="30" fill="#22c55e"/>
                         <rect x="250" y="140" width="100" height="60" fill="#3b82f6" rx="30"/>
                         <polygon points="280,160 320,170 280,180" fill="white"/>
                       </svg>
                     `)}`
                   }}>
                <div className="text-center bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-xl">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Virtual Campus Tour
                  </h3>
                  <p className="text-muted-foreground mb-4">Take a complete tour of our beautiful campus</p>
                  <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                    Watch Now
                  </Button>
                </div>
              </div>
              <div className="absolute inset-0 campus-overlay group-hover:bg-black/30 transition-colors duration-300"></div>
            </motion.div>

            {/* Academic Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden shadow-professional group"
            >
              <div className="w-full h-80 campus-photo bg-slate-200"
                   style={{
                     backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                       <svg width="300" height="320" xmlns="http://www.w3.org/2000/svg">
                         <rect width="300" height="320" fill="#f1f5f9"/>
                         <rect x="20" y="40" width="260" height="240" fill="#e2e8f0" rx="8"/>
                         <rect x="40" y="60" width="60" height="200" fill="#cbd5e1"/>
                         <rect x="120" y="60" width="60" height="200" fill="#cbd5e1"/>
                         <rect x="200" y="60" width="60" height="200" fill="#cbd5e1"/>
                         <circle cx="150" cy="290" r="20" fill="#22c55e"/>
                         <circle cx="100" cy="300" r="15" fill="#22c55e"/>
                         <circle cx="200" cy="300" r="18" fill="#22c55e"/>
                       </svg>
                     `)}`
                   }}>
              </div>
              <div className="absolute inset-0 campus-overlay"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1">Academic Block</h3>
                <p className="text-white/90 text-sm">Modern classrooms & labs</p>
              </div>
            </motion.div>

            {/* Library */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-professional group"
            >
              <div className="w-full h-64 campus-photo bg-slate-200"
                   style={{
                     backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                       <svg width="300" height="256" xmlns="http://www.w3.org/2000/svg">
                         <rect width="300" height="256" fill="#f8fafc"/>
                         <rect x="30" y="30" width="240" height="196" fill="#e2e8f0" rx="8"/>
                         <rect x="50" y="50" width="200" height="20" fill="#94a3b8"/>
                         <rect x="50" y="80" width="200" height="20" fill="#94a3b8"/>
                         <rect x="50" y="110" width="200" height="20" fill="#94a3b8"/>
                         <rect x="50" y="140" width="200" height="20" fill="#94a3b8"/>
                         <rect x="50" y="170" width="200" height="20" fill="#94a3b8"/>
                         <circle cx="150" cy="220" r="15" fill="#22c55e"/>
                       </svg>
                     `)}`
                   }}>
              </div>
              <div className="absolute inset-0 campus-overlay"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1">Central Library</h3>
                <p className="text-white/90 text-sm">Extensive digital resources</p>
              </div>
            </motion.div>

            {/* Sports Complex */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-professional group"
            >
              <div className="w-full h-64 campus-photo bg-slate-200"
                   style={{
                     backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                       <svg width="300" height="256" xmlns="http://www.w3.org/2000/svg">
                         <rect width="300" height="256" fill="#ecfdf5"/>
                         <rect x="20" y="40" width="260" height="176" fill="#d1fae5" rx="8"/>
                         <circle cx="150" cy="128" r="60" fill="#a7f3d0"/>
                         <circle cx="150" cy="128" r="40" fill="#6ee7b7"/>
                         <circle cx="150" cy="128" r="20" fill="#34d399"/>
                         <rect x="50" y="230" width="200" height="10" fill="#22c55e"/>
                       </svg>
                     `)}`
                   }}>
              </div>
              <div className="absolute inset-0 campus-overlay"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1">Sports Complex</h3>
                <p className="text-white/90 text-sm">Indoor & outdoor facilities</p>
              </div>
            </motion.div>

            {/* Instagram Link */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative rounded-2xl overflow-hidden shadow-professional group cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/official_vitpune/?hl=en",
                  "_blank"
                )
              }
            >
              <div className="w-full h-64 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Instagram className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Follow Us</h3>
                  <p className="text-white/90">@official_vitpune</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1">Campus Life</h3>
                <p className="text-white/90 text-sm">Daily updates & events</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 glass">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-primary">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground">
              Ready to start your journey with us?
            </p>
          </motion.div>

          <Card className="max-w-4xl mx-auto border shadow-professional bg-card">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-card group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Address
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Survey No. 3, 4, 9/1, 9/2
                    <br />
                    Kondhwa (Budruk)
                    <br />
                    Pune - 411048, Maharashtra
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-card group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Phone
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    +91-20-2660 1881/82/83
                    <br />
                    <span className="text-xs text-muted-foreground/70">
                      Mon - Fri, 9:00 AM - 5:00 PM
                    </span>
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-card group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Email
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    admission@vit.edu
                    <br />
                    <span className="text-xs text-muted-foreground/70">
                      We'll respond within 24 hours
                    </span>
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 pt-8 border-t border-gray-200 text-center"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Campus Visit
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Download Brochure
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">VIT Pune</h3>
                  <p className="text-xs text-gray-300">
                    Excellence in Education
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Shaping future engineers and innovators since 1983 with
                world-class education and industry partnerships.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Admissions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Academics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Placements
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Research
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Student Life</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a
                    href="/social"
                    className="hover:text-white transition-colors"
                  >
                    VIT Social
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Campus Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Clubs & Activities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sports
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300 text-sm">
              © 2024 Vishwakarma Institute of Technology, Pune. All rights
              reserved.
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Powered by VIT Social Platform | For official information visit{" "}
              <a
                href="https://www.vit.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                www.vit.edu
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <VITChatbot
        isMinimized={!isChatOpen}
        onToggleMinimize={handleChatToggle}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Index;
