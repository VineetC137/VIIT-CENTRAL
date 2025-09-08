import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-background border-t border-border">
      <div className="flex-1 relative">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about admissions, cutoffs, fees, placements, or student life..."
          disabled={disabled}
          className={cn(
            "pr-12 min-h-[44px] rounded-full border-2 border-border",
            "focus:border-vit-blue focus:ring-vit-blue/20 focus:ring-2",
            "transition-all duration-200"
          )}
        />
      </div>
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        size="sm"
        className={cn(
          "rounded-full px-4 h-[44px] min-w-[44px] shadow-soft",
          "bg-vit-blue hover:bg-vit-blue-dark text-white",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-all duration-200 hover:shadow-medium"
        )}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </Button>
    </form>
  );
};