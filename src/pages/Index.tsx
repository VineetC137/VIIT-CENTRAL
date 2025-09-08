import { useState } from "react";
import { VITChatbot } from "@/components/VITChatbot";
import { Button } from "@/components/ui/button";
import { MessageCircle, GraduationCap, MapPin, Phone, Mail } from "lucide-react";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-vit-blue/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-vit-blue" />
              <div>
                <h1 className="text-xl font-bold text-vit-blue">VIT Pune</h1>
                <p className="text-xs text-muted-foreground">Vishwakarma Institute of Technology</p>
              </div>
            </div>
            <Button 
              onClick={handleChatToggle}
              className="bg-vit-blue hover:bg-vit-blue/90"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-vit-blue mb-4">
            Welcome to VIT Pune
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Established in 1983, Vishwakarma Institute of Technology is a premier engineering institute 
            affiliated with Savitribai Phule Pune University. We offer B.Tech, M.Tech, MBA, MCA, and PhD programs 
            with excellent placement records.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-soft border border-vit-blue/10">
            <div className="w-16 h-16 bg-vit-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-vit-blue mb-2">Academic Excellence</h3>
            <p className="text-muted-foreground">
              12+ Engineering departments with modern labs and industry-aligned curriculum
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-soft border border-vit-blue/10">
            <div className="w-16 h-16 bg-vit-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-white font-bold text-lg">86%</div>
            </div>
            <h3 className="text-xl font-semibold text-vit-blue mb-2">Placements</h3>
            <p className="text-muted-foreground">
              86.3% placement rate with highest package of 45 LPA
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-soft border border-vit-blue/10">
            <div className="w-16 h-16 bg-vit-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-vit-blue mb-2">Campus Life</h3>
            <p className="text-muted-foreground">
              Modern facilities, hostels, library, sports, and vibrant student activities
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-vit-gradient text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <MapPin className="w-6 h-6 mb-2" />
              <p className="text-sm opacity-90">
                Survey No. 3, 4, 9/1, 9/2, Kondhwa (Budruk), Pune - 411048
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-6 h-6 mb-2" />
              <p className="text-sm opacity-90">
                +91-20-2660 1881/82/83
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-6 h-6 mb-2" />
              <p className="text-sm opacity-90">
                admission@vit.edu
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-vit-blue text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-90">
            © 2024 Vishwakarma Institute of Technology, Pune. All rights reserved.
          </p>
          <p className="text-xs opacity-70 mt-2">
            Powered by AI Assistant | For official information visit{" "}
            <a 
              href="https://www.vit.edu/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              www.vit.edu
            </a>
          </p>
        </div>
      </footer>

      {/* Chatbot */}
      <VITChatbot 
        isMinimized={!isChatOpen}
        onToggleMinimize={handleChatToggle}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default Index;
