import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  DollarSign, 
  Users, 
  Trophy,
  MapPin,
  Calendar,
  MessageCircle
} from "lucide-react";

interface VITQuickInfoProps {
  onChatToggle: () => void;
}

export const VITQuickInfo = ({ onChatToggle }: VITQuickInfoProps) => {
  const quickInfoItems = [
    {
      icon: GraduationCap,
      title: "Admissions 2024-25",
      description: "B.Tech, M.Tech, MBA, MCA programs open",
      action: "Check Cutoffs",
      query: "What are the cutoffs for Computer Engineering 2024?"
    },
    {
      icon: DollarSign,
      title: "Fee Structure",
      description: "Detailed category-wise fees available",
      action: "View Fees",
      query: "Show me the complete fee structure for 2024-25"
    },
    {
      icon: Users,
      title: "Placements",
      description: "86.3% placement rate, 45 LPA highest",
      action: "Placement Details",
      query: "Tell me about placement statistics and top recruiters"
    },
    {
      icon: Trophy,
      title: "Departments",
      description: "12+ engineering departments with modern labs",
      action: "Explore Departments",
      query: "List all departments with their HODs and contact details"
    },
    {
      icon: MapPin,
      title: "Campus Facilities",
      description: "Hostels, library, sports, Wi-Fi campus",
      action: "Campus Info",
      query: "What are the hostel and campus facilities?"
    },
    {
      icon: Calendar,
      title: "Student Life",
      description: "Technical fests, clubs, cultural activities",
      action: "Student Activities",
      query: "Tell me about student clubs, fests and cultural activities"
    }
  ];

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Quick Information Hub
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant answers about admissions, fees, placements, and campus life. 
            Click on any topic or use our AI assistant for detailed information.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quickInfoItems.map((item, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-medium transition-all duration-300 hover:scale-105 border border-vit-blue/10 hover:border-vit-blue/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-vit-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onChatToggle()}
                    className="w-full border-vit-blue/30 text-vit-blue hover:bg-vit-blue hover:text-white transition-all duration-200"
                  >
                    {item.action}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block p-8 bg-vit-gradient text-white shadow-strong">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Need More Information?</h3>
            </div>
            <p className="mb-6 opacity-90">
              Our AI assistant has comprehensive knowledge about VIT Pune. 
              Ask anything about admissions, academics, placements, or student life!
            </p>
            <Button 
              variant="secondary"
              size="lg"
              onClick={onChatToggle}
              className="bg-white text-vit-blue hover:bg-gray-100 px-8 py-3 font-semibold rounded-full shadow-medium hover:shadow-strong transition-all duration-300"
            >
              Start Chatting Now
              <MessageCircle className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};