import React, { useState } from "react";
import { Send, Bot, User, Sparkles, CheckCheck } from "lucide-react";

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! How can I help you today?",
    time: "10:30 AM"
  }
];

const SimpleChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Thanks for your message! I'm here to help.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full  bg-white rounded-xl  border border-blue-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px"
            }}
          />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">futurDooM</h1>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-blue-200 text-xs">Online · Ready to help</p>
                </div>
              </div>
            </div>
          
          </div>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-white to-blue-50/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {/* AI Avatar - Left side for AI messages */}
              {msg.role === "assistant" && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0f1f6e] to-[#2563eb] flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-blue-500/30">
                  <Bot size={18} />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[75%]`}>
                <div
                  className={`px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-2xl rounded-br-none shadow-md shadow-blue-500/30"
                      : "bg-white text-slate-700 rounded-2xl rounded-bl-none border border-blue-100 shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
                <div className={`flex items-center gap-1 mt-1.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p className="text-[11px] text-slate-400">{msg.time}</p>
                  {msg.role === "user" && (
                    <CheckCheck size={12} className="text-[#2563eb]" />
                  )}
                </div>
              </div>

              {/* User Avatar - Right side for user messages */}
              {msg.role === "user" && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a3aad] to-[#2563eb] flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-blue-500/30">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0f1f6e] to-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <Bot size={18} />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-none px-5 py-3.5 border border-blue-100 shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-[#2563eb] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-[#1a3aad] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-[#0f1f6e] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-5 border-t border-blue-100 bg-white">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-5 py-3 rounded-xl border border-blue-200 bg-blue-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb] text-sm transition-all duration-200"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                input.trim()
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md shadow-blue-500/30 hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Send size={18} />
            </button>
          </div>
          
          {/* Quick suggestions */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {["React help", "Custom hook", "State management", "Next.js"].map((suggestion, i) => (
              <button
                key={i}
                onClick={() => setInput(suggestion)}
                className="px-3 py-1.5 text-xs bg-blue-50 text-[#1a3aad] rounded-full border border-blue-200 hover:bg-blue-100 whitespace-nowrap transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="flex items-center  justify-center mt-3">
            <div className="flex items-center gap-1">
              <Sparkles size={12} className="text-[#2563eb]" />
              <p className="text-xs text-slate-400">
                Powered by <span className="text-[#2563eb] font-medium">futurDooM</span>
              </p>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleChat;