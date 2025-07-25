"use client"

import { useState, useRef, useEffect, useCallback, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Bot, 
  Paperclip, 
  Sparkles,
  Command,
  ImageIcon,
  Figma,
  MonitorIcon,
  LoaderIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "../../components/chat/chat-bubble";
import { ChatMessageList } from "../../components/chat/chat-message-list";
import { TextShimmer } from "../../components/chat/text-shimmer";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
}

interface CommandSuggestion {
  icon: React.ReactNode;
  label: string;
  description: string;
  prefix: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [isPending, startTransition] = useTransition();

  const commandSuggestions: CommandSuggestion[] = [
    { 
      icon: <ImageIcon className="w-4 h-4" />, 
      label: "Clone UI", 
      description: "Generate a UI from a screenshot", 
      prefix: "/clone" 
    },
    { 
      icon: <Figma className="w-4 h-4" />, 
      label: "Import Figma", 
      description: "Import a design from Figma", 
      prefix: "/figma" 
    },
    { 
      icon: <MonitorIcon className="w-4 h-4" />, 
      label: "Create Page", 
      description: "Generate a new web page", 
      prefix: "/page" 
    },
    { 
      icon: <Sparkles className="w-4 h-4" />, 
      label: "Improve", 
      description: "Improve existing UI design", 
      prefix: "/improve" 
    },
  ];

  useEffect(() => {
    if (input.startsWith('/') && !input.includes(' ')) {
      setShowCommandPalette(true);
      const matchingIndex = commandSuggestions.findIndex(
        (cmd) => cmd.prefix.startsWith(input)
      );
      setActiveSuggestion(matchingIndex >= 0 ? matchingIndex : -1);
    } else {
      setShowCommandPalette(false);
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);
    setShowWelcome(false);

    startTransition(() => {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          content: "Thanks for your message! This is a demo AI response.",
          sender: "ai",
        }]);
        setIsLoading(false);
      }, 2000);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showCommandPalette) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < commandSuggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev > 0 ? prev - 1 : commandSuggestions.length - 1
        );
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        if (activeSuggestion >= 0) {
          const selectedCommand = commandSuggestions[activeSuggestion];
          setInput(selectedCommand.prefix + ' ');
          setShowCommandPalette(false);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowCommandPalette(false);
      }
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const selectCommand = (index: number) => {
    const selectedCommand = commandSuggestions[index];
    setInput(selectedCommand.prefix + ' ');
    setShowCommandPalette(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Welcome Screen */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <TextShimmer className="text-3xl font-bold mb-4">
                  How can I help you today?
                </TextShimmer>
                <p className="text-muted-foreground max-w-md">
                  I'm your AI assistant, ready to help with any questions or tasks you have.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-3 w-full max-w-md"
              >
                {commandSuggestions.map((suggestion, index) => (
                  <Button
                    key={suggestion.prefix}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start gap-2"
                    onClick={() => selectCommand(index)}
                  >
                    <div className="flex items-center gap-2">
                      {suggestion.icon}
                      <span className="font-medium">{suggestion.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-left">
                      {suggestion.description}
                    </span>
                  </Button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Messages */}
        {!showWelcome && (
          <div className="flex-1 min-h-0 pb-24">
            <ChatMessageList>
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  variant={message.sender === "user" ? "sent" : "received"}
                >
                  <ChatBubbleAvatar>
                    <AvatarImage src={message.sender === "user" ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop" : undefined} />
                    <AvatarFallback>{message.sender === "user" ? "U" : "AI"}</AvatarFallback>
                  </ChatBubbleAvatar>
                  <ChatBubbleMessage variant={message.sender === "user" ? "sent" : "received"}>
                    {message.content}
                  </ChatBubbleMessage>
                </ChatBubble>
              ))}

              {isLoading && (
                <ChatBubble variant="received">
                  <ChatBubbleAvatar>
                    <AvatarFallback>AI</AvatarFallback>
                  </ChatBubbleAvatar>
                  <ChatBubbleMessage isLoading />
                </ChatBubble>
              )}
            </ChatMessageList>
          </div>
        )}
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t">
        <div className="max-w-4xl mx-auto p-4">
          <div className="relative">
            <AnimatePresence>
              {showCommandPalette && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-2 left-0 right-0 bg-popover border rounded-lg shadow-lg z-50"
                >
                  <div className="p-2">
                    {commandSuggestions.map((suggestion, index) => (
                      <button
                        key={suggestion.prefix}
                        className={cn(
                          "w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors",
                          activeSuggestion === index
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent/50"
                        )}
                        onClick={() => selectCommand(index)}
                      >
                        {suggestion.icon}
                        <div>
                          <div className="font-medium">{suggestion.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {suggestion.description}
                          </div>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">
                          {suggestion.prefix}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message or use / for commands..."
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setShowCommandPalette(!showCommandPalette)}
                  >
                    <Command className="h-3 w-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                  >
                    <Paperclip className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button type="submit" disabled={!input.trim() || isLoading}>
                {isLoading ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}