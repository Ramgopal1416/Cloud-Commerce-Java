import { useState, useRef, useEffect } from "react";
import { useChatbotMessage, useGetChatbotHistory } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
};

export default function Chat() {
  const { user } = useAuth();
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: `Hello${user ? ` ${user.name}` : ''}. I'm your ShopAI personal assistant. How can I assist you with our catalog today?`
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatMutation = useChatbotMessage();

  const { data: history } = useGetChatbotHistory(
    { sessionId },
    { query: { enabled: false } } // Simplified for this demo
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    chatMutation.mutate(
      { data: { message: userMessage.content, sessionId } },
      {
        onSuccess: (res) => {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: "bot",
            content: res.response
          }]);
        },
        onError: () => {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: "bot",
            content: "I'm sorry, I'm having trouble connecting right now. Please try again."
          }]);
        }
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col container mx-auto max-w-4xl py-6 md:py-12 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full bg-card border border-border/50 shadow-sm overflow-hidden">
        <div className="bg-muted/50 p-4 border-b border-border/50 text-center">
          <h2 className="font-serif text-xl">AI Assistant</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Concierge Service</p>
        </div>

        <ScrollArea className="flex-1 p-4 md:p-8" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 font-light text-sm md:text-base ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted/40 border border-border/50 text-foreground"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 font-serif italic text-muted-foreground text-sm">
                  Assistant is typing...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 bg-muted/20 border-t border-border/50">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className="flex gap-2"
          >
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, orders, or styling advice..."
              className="flex-1 bg-background h-12 rounded-none border-border focus-visible:ring-0 focus-visible:border-primary"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="h-12 w-12 rounded-none shrink-0"
              disabled={!input.trim() || chatMutation.isPending}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
