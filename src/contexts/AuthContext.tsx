import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  department?: string;
  year?: string;
}

interface UserProfile {
  id?: string;
  name: string;
  email: string;
  department: string;
  year: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  department: string;
  year: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  fetchUserProfile: (userId: string) => Promise<UserProfile | null>;
  updateUserProfile: (
    userId: string,
    profileData: UserProfile
  ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utility functions for localStorage operations
const USERS_KEY = "vit_users";
const CURRENT_USER_KEY = "vit_current_user";

const loadUsers = (): User[] => {
  try {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
};

const saveUsers = (users: User[]) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users:", error);
  }
};

const loadCurrentUser = (): User | null => {
  try {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Error loading current user:", error);
    return null;
  }
};

const saveCurrentUser = (user: User | null) => {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (error) {
    console.error("Error saving current user:", error);
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const currentUser = loadCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);

      const users = loadUsers();

      // Check if email already exists
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === data.email.toLowerCase()
      );
      if (existingUser) {
        return false;
      }

      // Create new user with complete profile
      const newUser: User = {
        id: Date.now().toString(), // Simple ID generation
        name: data.name,
        email: data.email,
        department: data.department,
        year: data.year,
      };

      // Save to users list
      users.push(newUser);
      saveUsers(users);

      // Set as current user and save
      setUser(newUser);
      saveCurrentUser(newUser);

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData): Promise<boolean> => {
    try {
      setIsLoading(true);

      const users = loadUsers();

      // Find user by email (case-insensitive)
      const user = users.find(
        (u) => u.email.toLowerCase() === data.email.toLowerCase()
      );

      if (user) {
        // In a real app, you would verify the password here
        // For demo purposes, we'll accept any password

        setUser(user);
        saveCurrentUser(user);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    saveCurrentUser(null);
  };

  const fetchUserProfile = async (
    userId: string
  ): Promise<UserProfile | null> => {
    try {
      const users = loadUsers();
      const user = users.find((u) => u.id === userId);

      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          department: user.department || "",
          year: user.year || "",
        };
      }

      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const updateUserProfile = async (
    userId: string,
    profileData: UserProfile
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      const users = loadUsers();
      const userIndex = users.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        return false;
      }

      // Update user data
      users[userIndex] = {
        ...users[userIndex],
        name: profileData.name,
        email: profileData.email,
        department: profileData.department,
        year: profileData.year,
      };

      // Save updated users list
      saveUsers(users);

      // Update current user if it's the same user
      if (user && user.id === userId) {
        const updatedUser = users[userIndex];
        setUser(updatedUser);
        saveCurrentUser(updatedUser);
      }

      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    fetchUserProfile,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
