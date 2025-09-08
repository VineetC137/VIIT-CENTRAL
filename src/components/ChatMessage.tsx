import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/services/ChatbotService";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[80%] gap-3 items-start",
          message.isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Avatar */}
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-soft",
            message.isUser
              ? "bg-vit-blue text-white"
              : "bg-accent text-accent-foreground"
          )}
        >
          {message.isUser ? (
            <User className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={cn(
            "relative rounded-2xl px-4 py-3 shadow-soft transition-all duration-300 hover:shadow-medium",
            message.isUser
              ? "bg-vit-blue text-white rounded-br-md"
              : "bg-card border border-border text-card-foreground rounded-bl-md"
          )}
        >
          {/* Message Content */}
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
          
          {/* Timestamp */}
          <div
            className={cn(
              "text-xs mt-2 opacity-70",
              message.isUser ? "text-blue-100" : "text-muted-foreground"
            )}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
};