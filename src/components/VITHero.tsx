import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Award, Building, TrendingUp } from "lucide-react";

interface VITHeroProps {
  onChatToggle: () => void;
}

export const VITHero = ({ onChatToggle }: VITHeroProps) => {
  return (
    <section className="bg-vit-gradient-reverse text-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold leading-tight">
                Excellence in 
                <span className="text-vit-blue block">Engineering Education</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Empowering students with cutting-edge technology, industry-aligned curriculum, 
                and exceptional placement opportunities since 1983.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-vit-blue hover:bg-vit-blue-dark text-white px-8 py-3 rounded-full shadow-medium hover:shadow-strong transition-all duration-300"
              >
                Explore Programs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={onChatToggle}
                className="border-2 border-vit-blue text-vit-blue hover:bg-vit-blue hover:text-white px-8 py-3 rounded-full transition-all duration-300"
              >
                Ask VIT Assistant
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-vit-blue">45 LPA</div>
                <div className="text-sm text-muted-foreground">Highest Package</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-vit-blue">86.3%</div>
                <div className="text-sm text-muted-foreground">Placement Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-background/80 backdrop-blur-sm border border-vit-blue/20 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-vit-blue/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-vit-blue" />
                </div>
                <div className="text-2xl font-bold text-vit-blue">3,720+</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Total UG Intake Capacity
              </p>
            </Card>

            <Card className="p-6 bg-background/80 backdrop-blur-sm border border-vit-blue/20 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-vit-blue/10 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-vit-blue" />
                </div>
                <div className="text-2xl font-bold text-vit-blue">12+</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Engineering Departments
              </p>
            </Card>

            <Card className="p-6 bg-background/80 backdrop-blur-sm border border-vit-blue/20 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-vit-blue/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-vit-blue" />
                </div>
                <div className="text-2xl font-bold text-vit-blue">9.5 LPA</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Median Package
              </p>
            </Card>

            <Card className="p-6 bg-background/80 backdrop-blur-sm border border-vit-blue/20 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-vit-blue/10 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-vit-blue" />
                </div>
                <div className="text-2xl font-bold text-vit-blue">40+</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Years of Excellence
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};