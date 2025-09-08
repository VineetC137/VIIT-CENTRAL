import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  disabled?: boolean;
}

export const QuickSuggestions = ({ 
  suggestions, 
  onSuggestionClick, 
  disabled 
}: QuickSuggestionsProps) => {
  return (
    <div className="p-4 border-t border-border bg-secondary/30">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Quick Questions
      </h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.slice(0, 6).map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            disabled={disabled}
            className={cn(
              "text-xs rounded-full h-8 px-3 transition-all duration-200",
              "border-vit-blue/30 text-vit-blue-dark hover:bg-vit-blue hover:text-white",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:shadow-soft hover:scale-105"
            )}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};