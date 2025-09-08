import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickSuggestions } from "./QuickSuggestions";
import { chatbotService, ChatMessage as ChatMessageType } from "@/services/ChatbotService";
import { useToast } from "@/components/ui/use-toast";
import { Bot, Minimize2, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VITChatbotProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  onClose?: () => void;
}

export const VITChatbot = ({ 
  isMinimized = false, 
  onToggleMinimize, 
  onClose 
}: VITChatbotProps) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: ChatMessageType = {
      id: "welcome",
      content: `🎓 Welcome to VIT Pune Assistant!

I'm here to help you with information about:
• Admissions & Cutoffs
• Fee Structure & Scholarships  
• Academic Programs & Departments
• Placements & Career Opportunities
• Campus Facilities & Student Life
• Research & Innovation

How can I assist you today?`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatbotService.sendMessage(content);
      
      const botMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-vit-gradient shadow-strong cursor-pointer hover:shadow-medium transition-all duration-300 hover:scale-105 z-50">
        <div 
          className="w-full h-full flex items-center justify-center text-white"
          onClick={onToggleMinimize}
        >
          <Bot className="w-6 h-6" />
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "fixed bottom-4 right-4 w-96 h-[600px] shadow-strong z-50",
      "flex flex-col bg-background border-2 border-vit-blue/20",
      "animate-slide-up transition-all duration-300"
    )}>
      {/* Header */}
      <div className="bg-vit-gradient text-white p-4 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">VIT Assistant</h3>
            <p className="text-xs opacity-90">
              {isLoading ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white hover:bg-black/20"
            onClick={onToggleMinimize}
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:bg-black/20"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/10">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border rounded-2xl rounded-bl-md p-4 shadow-soft">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-vit-blue rounded-full animate-pulse-soft"></div>
                <div className="w-2 h-2 bg-vit-blue rounded-full animate-pulse-soft" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-vit-blue rounded-full animate-pulse-soft" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <QuickSuggestions
          suggestions={chatbotService.getQuickSuggestions()}
          onSuggestionClick={handleSendMessage}
          disabled={isLoading}
        />
      )}

      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </Card>
  );
};