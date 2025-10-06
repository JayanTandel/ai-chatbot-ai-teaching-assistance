import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { WelcomeSection } from "@/components/WelcomeSection";
import { Code2 } from "lucide-react";

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Coding Instructor AI
              </h1>
              <p className="text-xs text-muted-foreground">Your Personal Programming Mentor</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!hasStarted ? (
          <WelcomeSection onStart={() => setHasStarted(true)} />
        ) : (
          <ChatInterface />
        )}
      </main>
    </div>
  );
};

export default Index;
