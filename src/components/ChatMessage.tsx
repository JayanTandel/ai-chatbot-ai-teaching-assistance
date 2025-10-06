import { Code2, User, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();
  const isUser = message.role === "user";

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const renderContent = () => {
    const parts = message.content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const codeContent = part.slice(3, -3);
        const lines = codeContent.split("\n");
        const language = lines[0].trim();
        const code = lines.slice(1).join("\n");
        const codeId = `${message.id}-${index}`;

        return (
          <div key={index} className="code-block my-4 group">
            <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border">
              <span className="text-xs font-mono text-muted-foreground uppercase">
                {language || "code"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(code, codeId)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {copiedCode === codeId ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="font-mono">{code}</code>
            </pre>
          </div>
        );
      }
      
      return (
        <p key={index} className="whitespace-pre-wrap">
          {part}
        </p>
      );
    });
  };

  return (
    <div className={`flex items-start gap-4 animate-fade-in ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`p-2 rounded-lg ${
          isUser ? "bg-secondary" : "bg-gradient-primary"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5" />
        ) : (
          <Code2 className="w-5 h-5 text-primary-foreground" />
        )}
      </div>
      
      <div
        className={`flex-1 space-y-2 ${
          isUser
            ? "bg-secondary rounded-lg p-4 max-w-[80%]"
            : "max-w-[90%]"
        }`}
      >
        <div className="prose prose-invert max-w-none">
          {renderContent()}
        </div>
        <span className="text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
