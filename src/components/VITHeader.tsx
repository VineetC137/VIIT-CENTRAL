import { Button } from "@/components/ui/button";
import { MessageCircle, GraduationCap, Users, Building, Phone } from "lucide-react";

interface VITHeaderProps {
  onChatToggle: () => void;
}

export const VITHeader = ({ onChatToggle }: VITHeaderProps) => {
  return (
    <header className="bg-background border-b border-border shadow-soft sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-border/50">
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+91-20-24237100</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✉️ info@vit.edu</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.vit.edu/" target="_blank" rel="noopener noreferrer" 
               className="text-vit-blue hover:text-vit-blue-dark transition-colors">
              Official Website
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={onChatToggle}
              className="border-vit-blue text-vit-blue hover:bg-vit-blue hover:text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Assistant
            </Button>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-vit-gradient rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Vishwakarma Institute of Technology
              </h1>
              <p className="text-muted-foreground">Pune | Established 1983 | Autonomous</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#admissions" className="text-foreground hover:text-vit-blue transition-colors font-medium">
              Admissions
            </a>
            <a href="#academics" className="text-foreground hover:text-vit-blue transition-colors font-medium">
              Academics
            </a>
            <a href="#placements" className="text-foreground hover:text-vit-blue transition-colors font-medium">
              Placements
            </a>
            <a href="#campus" className="text-foreground hover:text-vit-blue transition-colors font-medium">
              Campus Life
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};