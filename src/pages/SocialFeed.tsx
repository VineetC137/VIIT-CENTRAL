import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Send, 
  ArrowLeft, 
  Sparkles, 
  TrendingUp,
  Image as ImageIcon,
  Smile,
  Hash,
  Users,
  Clock,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Post, 
  Reply, 
  loadPosts, 
  savePosts, 
  createPost, 
  createReply, 
  getAvatarInitials 
} from "@/lib/socialStorage";

const SocialFeed = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const loadedPosts = loadPosts();
    setPosts(loadedPosts);
  }, []);

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  const handleCreatePost = () => {
    if (!newPost.trim() || !user) return;

    const post = createPost(newPost, user.name);
    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    setNewPost("");
  };

  const handleLike = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    );
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  const handleReply = (postId: string) => {
    if (!replyContent.trim() || !user) return;

    const reply = createReply(replyContent, user.name);
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, replies: [...post.replies, reply] }
        : post
    );

    setPosts(updatedPosts);
    savePosts(updatedPosts);
    setReplyContent("");
    setReplyingTo(null);
  };

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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/")}
                  className="hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </motion.div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    VIT Social
                  </h1>
                  <p className="text-xs text-gray-500">Connect • Share • Learn</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">{posts.length}</span>
                  <span className="hidden sm:inline">posts</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Trending</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-700">{user.name}</p>
                  {user.department && (
                    <p className="text-xs text-gray-500">{user.department}</p>
                  )}
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold">
                    {getAvatarInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Create Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="w-14 h-14 ring-2 ring-blue-100">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg">
                    {getAvatarInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="relative">
                    <Textarea
                      placeholder="What's happening at VIT today? Share your thoughts, achievements, or ask for help..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[120px] border-0 bg-gradient-to-br from-gray-50/50 to-blue-50/30 focus:bg-white transition-all duration-300 resize-none text-base rounded-xl shadow-inner"
                    />
                    {newPost.length > 250 && (
                      <div className="absolute top-2 right-2">
                        <Badge variant={newPost.length > 280 ? "destructive" : "secondary"}>
                          {280 - newPost.length}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-600 hover:bg-green-50">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600 hover:bg-purple-50">
                        <Hash className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`text-sm transition-colors ${
                        newPost.length > 280 ? 'text-red-500' : 
                        newPost.length > 250 ? 'text-orange-500' : 'text-gray-500'
                      }`}>
                        {newPost.length}/280
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          onClick={handleCreatePost}
                          disabled={!newPost.trim() || newPost.length > 280}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 rounded-full font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Posts Feed */}
        <AnimatePresence>
          <div className="space-y-6">
            {posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <MessageCircle className="w-10 h-10 text-blue-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-3">No posts yet</h3>
                    <p className="text-gray-500 text-lg">Be the first to share something with your fellow VIT students!</p>
                    <div className="mt-6">
                      <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Start the conversation
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 group">
                    <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <Avatar className="w-14 h-14 ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg">
                          {getAvatarInitials(post.author)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg">{post.author}</h3>
                          {post.author === user.name && (
                            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-6">
                      <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                        {post.content}
                      </p>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between py-4 border-t border-gray-100">
                      <div className="flex items-center gap-8">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={`gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                              post.isLiked 
                                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                                : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                            <span className="font-semibold">{post.likes}</span>
                          </Button>
                        </motion.div>
                        
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                            className={`gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                              replyingTo === post.id
                                ? 'text-blue-500 bg-blue-50'
                                : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                            }`}
                          >
                            <MessageCircle className="w-5 h-5" />
                            <span className="font-semibold">{post.replies.length}</span>
                          </Button>
                        </motion.div>
                        
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-2 px-4 py-2 rounded-full text-gray-500 hover:text-green-500 hover:bg-green-50 transition-all duration-200"
                          >
                            <Share className="w-5 h-5" />
                            <span className="font-semibold">Share</span>
                          </Button>
                        </motion.div>
                      </div>
                    </div>

                  {/* Replies */}
                  {post.replies.length > 0 && (
                    <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
                      {post.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarFallback className="bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xs font-medium">
                              {getAvatarInitials(reply.author)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl p-4 border border-gray-100">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-sm text-gray-900">{reply.author}</h4>
                                {reply.author === user.name && (
                                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                    You
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">{reply.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 ml-2">{reply.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Input */}
                  {replyingTo === post.id && (
                    <div className="mt-6 border-t border-gray-100 pt-4">
                      <div className="flex gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium">
                            {getAvatarInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <Textarea
                            placeholder="Write a thoughtful reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="min-h-[80px] border-0 bg-gray-50/50 focus:bg-white transition-colors resize-none"
                          />
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              {replyContent.length}/200 characters
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setReplyingTo(null)}
                                className="hover:bg-gray-50"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleReply(post.id)}
                                disabled={!replyContent.trim() || replyContent.length > 200}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                              >
                                <Send className="w-3 h-3 mr-1" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Connect • Share • Learn • Grow with VIT Community 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;