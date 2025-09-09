import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { AnimatePresence } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal = ({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

  const handleClose = () => {
    onClose();
    // Reset to login mode when closing
    setTimeout(() => setMode('login'), 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-0 shadow-none">
        <AnimatePresence mode="wait">
          {mode === 'login' ? (
            <LoginForm
              key="login"
              onSwitchToRegister={() => setMode('register')}
              onClose={handleClose}
            />
          ) : (
            <RegisterForm
              key="register"
              onSwitchToLogin={() => setMode('login')}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};