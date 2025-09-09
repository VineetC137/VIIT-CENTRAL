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
  Instagram
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1 });

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
      description: "World-class education with industry-aligned curriculum and modern laboratories",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "VIT Social Network",
      description: "Connect with fellow students, share experiences, and build lasting friendships",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "International collaborations and exchange programs with top universities",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Innovation Hub",
      description: "State-of-the-art research facilities and startup incubation programs",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  VIT Pune
                </h1>
                <p className="text-sm text-gray-600">Vishwakarma Institute of Technology</p>
              </div>
            </motion.div>
            
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={handleSocialClick}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                >
                  <Users className="w-4 h-4 mr-2" />
                  VIT Social
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={handleChatToggle}
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
              </motion.div>
              {user ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={logout}
                    variant="outline"
                    className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white shadow-lg"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => setIsAuthModalOpen(true)}
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white shadow-lg"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
                  <Star className="w-3 h-3 mr-1" />
                  Established 1983
                </Badge>
                {user && (
                  <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-0">
                    <Users className="w-3 h-3 mr-1" />
                    Welcome, {user.name.split(' ')[0]}!
                  </Badge>
                )}
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Shape Your Future
                </span>
                <br />
                <span className="text-gray-800">at VIT Pune</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join India's premier engineering institute with 40+ years of excellence. 
                Experience world-class education, cutting-edge research, and exceptional placement opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    onClick={handleSocialClick}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    {user ? "Go to VIT Social" : "Join VIT Community"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 text-lg"
                    onClick={() => window.open("https://youtu.be/cZ590Z8ROws?feature=shared", "_blank")}
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
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <Building className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700">VIT Campus</h3>
                    <p className="text-gray-600">Modern Infrastructure</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Beautiful Campus</h3>
                  <p className="text-white/90">Modern facilities in a serene environment</p>
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Top Ranked</p>
                    <p className="text-xs text-gray-600">Engineering College</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">5000+</p>
                    <p className="text-xs text-gray-600">Active Students</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Excellence in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50 hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
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
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose VIT Pune?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes us one of India's leading engineering institutions
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
                className="group cursor-pointer"
                onClick={feature.title === "VIT Social Network" ? handleSocialClick : undefined}
              >
                <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50 hover:shadow-2xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-blue-50/30">
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    {feature.title === "VIT Social Network" && (
                      <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
                        <span>Explore Now</span>
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Beautiful Campus
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Experience world-class infrastructure and a vibrant learning environment
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
              onClick={() => window.open("https://youtu.be/cZ590Z8ROws?feature=shared", "_blank")}
            >
              <div className="w-full h-64 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="text-center text-white">
                  <Building className="w-12 h-12 mx-auto mb-3" />
                  <Play className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <p className="text-sm">Click to watch campus tour</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-1">Academic Block</h3>
                <p className="text-white/90">State-of-the-art classrooms and laboratories</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
              onClick={() => window.open("https://www.instagram.com/official_vitpune/?hl=en", "_blank")}
            >
              <div className="w-full h-64 bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="text-center text-white">
                  <Globe className="w-12 h-12 mx-auto mb-3" />
                  <Instagram className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <p className="text-sm">Follow us on Instagram</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-1">Campus Life</h3>
                <p className="text-white/90">Lush green spaces for recreation and events</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to start your journey with us?
            </p>
          </motion.div>
          
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50/30">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Address</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Survey No. 3, 4, 9/1, 9/2<br />
                    Kondhwa (Budruk)<br />
                    Pune - 411048, Maharashtra
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
                  <p className="text-gray-600 text-sm">
                    +91-20-2660 1881/82/83<br />
                    <span className="text-xs text-gray-500">Mon - Fri, 9:00 AM - 5:00 PM</span>
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600 text-sm">
                    admission@vit.edu<br />
                    <span className="text-xs text-gray-500">We'll respond within 24 hours</span>
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
                  <p className="text-xs text-gray-300">Excellence in Education</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Shaping future engineers and innovators since 1983 with world-class education and industry partnerships.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Admissions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Academics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Placements</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Student Life</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/social" className="hover:text-white transition-colors">VIT Social</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Campus Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Clubs & Activities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sports</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300 text-sm">
              © 2024 Vishwakarma Institute of Technology, Pune. All rights reserved.
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
