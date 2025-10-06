import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, Brain, Bug, BookOpen, Sparkles, Zap } from "lucide-react";

interface WelcomeSectionProps {
  onStart: () => void;
}

export const WelcomeSection = ({ onStart }: WelcomeSectionProps) => {
  const features = [
    {
      icon: Code2,
      title: "Code Generation",
      description: "Get instant code snippets in any programming language",
    },
    {
      icon: Brain,
      title: "Smart Explanations",
      description: "Understand complex concepts with step-by-step breakdowns",
    },
    {
      icon: Bug,
      title: "Debug Assistant",
      description: "Find and fix errors with intelligent debugging help",
    },
    {
      icon: BookOpen,
      title: "Adaptive Learning",
      description: "Responses tailored to your skill level",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-accent/30 animate-glow">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium">Powered by Advanced NLP & AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Your Personal{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Coding Instructor
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master programming with an AI mentor that understands your questions,
          generates code, explains concepts, and helps you debug — all in natural language.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Button
            size="lg"
            onClick={onStart}
            className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-lg glow-effect"
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Learning Now
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 pt-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-primary">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Supported Languages */}
      <div className="text-center space-y-4 pt-8">
        <p className="text-sm text-muted-foreground uppercase tracking-wider">
          Supports Multiple Languages
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {["Python", "JavaScript", "Java", "C++", "TypeScript", "Go", "Rust", "SQL"].map(
            (lang) => (
              <span
                key={lang}
                className="px-4 py-2 rounded-full bg-secondary text-sm font-medium border border-border"
              >
                {lang}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};
