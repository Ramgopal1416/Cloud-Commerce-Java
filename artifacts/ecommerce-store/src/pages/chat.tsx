import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { useChatbotMessage, useGetChatbotHistory, getGetChatbotHistoryQueryKey } from "@workspace/api-client-react";
import type { Product } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, ShoppingBag, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SUGGESTIONS = [
  "Show me wireless headphones",
  "What bags do you have?",
  "Recommend skincare products",
  "Gift ideas under $50",
  "Best running gear",
  "Show me new arrivals",
];

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
  products?: Product[];
};

function ProductMiniCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group flex gap-3 p-3 bg-background border border-border/50 hover:border-primary/40 transition-colors cursor-pointer">
        <div className="w-16 h-20 bg-muted shrink-0 overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            <p className="font-medium text-sm leading-snug line-clamp-2">{product.name}</p>
            {product.brand && (
              <p className="text-xs text-muted-foreground mt-0.5">{product.brand}</p>
            )}
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="font-serif text-sm">${Number(product.price).toFixed(2)}</p>
            {product.comparePrice && (
              <p className="text-xs text-muted-foreground line-through">
                ${Number(product.comparePrice).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Chat() {
  const { user } = useAuth();
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: `Hello${user ? ` ${user.name}` : ""}! I'm your ShopAI concierge. Ask me anything — product recommendations, styling advice, gift ideas, or just tell me what you're looking for.`,
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const chatMutation = useChatbotMessage();

  const { data: _history } = useGetChatbotHistory(
    { sessionId },
    { query: { enabled: false, queryKey: getGetChatbotHistoryQueryKey({ sessionId }) } }
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || chatMutation.isPending) return;
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    chatMutation.mutate(
      { data: { message: text, sessionId } },
      {
        onSuccess: (res) => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              role: "bot",
              content: res.response,
              products: res.products ?? [],
            },
          ]);
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              role: "bot",
              content: "I'm having trouble connecting right now. Please try again in a moment.",
            },
          ]);
        },
      }
    );
  };

  const handleSend = () => sendMessage(input);

  return (
    <div className="flex-1 flex flex-col container mx-auto max-w-4xl py-6 md:py-10 px-4">
      <div className="flex flex-col h-[calc(100dvh-10rem)] min-h-[500px] bg-card border border-border/50 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="bg-foreground text-background px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-background/15 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg">AI Shopping Assistant</h2>
            <p className="text-xs text-background/60 uppercase tracking-widest">Concierge</p>
          </div>
        </div>

        {/* Suggestions bar */}
        <div className="bg-muted/30 border-b border-border/50 px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              disabled={chatMutation.isPending}
              className="whitespace-nowrap text-xs px-3 py-1.5 border border-border/60 bg-background hover:border-primary/60 hover:bg-primary/5 transition-colors rounded-full text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                msg.role === "user"
                  ? "bg-foreground text-background"
                  : "bg-muted border border-border/50 text-muted-foreground"
              }`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`flex flex-col gap-3 max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`px-4 py-3 text-sm font-light leading-relaxed ${
                  msg.role === "user"
                    ? "bg-foreground text-background"
                    : "bg-muted/40 border border-border/50 text-foreground"
                }`}>
                  {msg.content}
                </div>

                {/* Inline product cards */}
                {msg.products && msg.products.length > 0 && (
                  <div className="w-full space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">
                      {msg.products.length} product{msg.products.length !== 1 ? "s" : ""} found
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.products.map((p) => (
                        <ProductMiniCard key={p.id} product={p} />
                      ))}
                    </div>
                    <Link
                      href="/products"
                      className="block text-center text-xs text-muted-foreground hover:text-foreground transition-colors pt-1 border-t border-border/30"
                    >
                      Browse full catalog →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}

          {chatMutation.isPending && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted border border-border/50 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="px-4 py-3 bg-muted/40 border border-border/50">
                <span className="font-serif italic text-muted-foreground text-sm">Searching catalog...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-muted/20 border-t border-border/50">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, styling, gifts..."
              className="flex-1 h-12 rounded-none bg-background border-border focus-visible:ring-0 focus-visible:border-primary"
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
