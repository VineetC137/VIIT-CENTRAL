export interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
  isLiked: boolean;
  avatar?: string;
}

export interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

const STORAGE_KEY = 'vit_social_posts';

// Sample initial data
const initialPosts: Post[] = [
  {
    id: "1",
    author: "Rahul Sharma",
    content: "Just finished my Data Structures assignment! The binary tree implementation was challenging but fun 🌳 Anyone else working on similar problems? #VITPune #DSA #Programming",
    timestamp: "2 hours ago",
    likes: 15,
    replies: [
      {
        id: "r1",
        author: "Priya Patel",
        content: "Great job! I'm still working on mine 😅 Could you share some tips?",
        timestamp: "1 hour ago"
      },
      {
        id: "r2",
        author: "Arjun Singh",
        content: "Binary trees are tricky! I found visualizing them really helpful.",
        timestamp: "45 minutes ago"
      }
    ],
    isLiked: false
  },
  {
    id: "2",
    author: "Sneha Kulkarni",
    content: "Anyone up for a study group for tomorrow's Machine Learning exam? Let's meet at the library! 📚 We can cover neural networks and backpropagation together.",
    timestamp: "4 hours ago",
    likes: 23,
    replies: [
      {
        id: "r3",
        author: "Vikram Desai",
        content: "Count me in! What time works for everyone?",
        timestamp: "3 hours ago"
      }
    ],
    isLiked: true
  },
  {
    id: "3",
    author: "Ananya Joshi",
    content: "The new cafeteria menu is amazing! 🍕 Finally some good food options on campus. The pasta is definitely worth trying!",
    timestamp: "6 hours ago",
    likes: 8,
    replies: [],
    isLiked: false
  },
  {
    id: "4",
    author: "Karan Mehta",
    content: "Placement season is here! Just got selected for the final round at TCS. Feeling nervous but excited 🚀 Any tips from seniors?",
    timestamp: "8 hours ago",
    likes: 31,
    replies: [
      {
        id: "r4",
        author: "Riya Sharma",
        content: "Congratulations! Just be confident and review your projects thoroughly.",
        timestamp: "7 hours ago"
      },
      {
        id: "r5",
        author: "Dev Patel",
        content: "All the best! You've got this! 💪",
        timestamp: "6 hours ago"
      }
    ],
    isLiked: false
  }
];

export const loadPosts = (): Post[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // If no posts exist, save and return initial posts
    savePosts(initialPosts);
    return initialPosts;
  } catch (error) {
    console.error('Error loading posts:', error);
    return initialPosts;
  }
};

export const savePosts = (posts: Post[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts:', error);
  }
};

export const createPost = (content: string, author: string = "You"): Post => {
  return {
    id: Date.now().toString(),
    author,
    content,
    timestamp: "Just now",
    likes: 0,
    replies: [],
    isLiked: false
  };
};

export const createReply = (content: string, author: string = "You"): Reply => {
  return {
    id: Date.now().toString(),
    author,
    content,
    timestamp: "Just now"
  };
};

export const getAvatarInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export const formatTimestamp = (timestamp: string): string => {
  if (timestamp === "Just now") return timestamp;
  
  // For demo purposes, we'll keep the simple format
  // In a real app, you'd use proper date formatting
  return timestamp;
};