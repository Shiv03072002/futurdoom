import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Send, 
  CheckCheck, 
  ArrowLeft, 
  Brain,
  MessageSquare,
  Sparkles,
  Zap,
  Cpu
} from "lucide-react";
import { motion } from "framer-motion";
const SimpleChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [threadContext, setThreadContext] = useState(null);
  const [deepAskMode, setDeepAskMode] = useState(false);

  useEffect(() => {
    if (location.state?.thread) {
      setThreadContext(location.state.thread);
      setDeepAskMode(true);
      
      const threadMessages = [
        {
          id: 1,
          role: "user",
          content: location.state.thread.userMessage,
          time: location.state.thread.time,
        },
        {
          id: 2,
          role: "assistant",
          content: location.state.thread.aiResponse,
          time: location.state.thread.responseTime,
        },
        {
          id: 3,
          role: "assistant",
          content: `I see you're asking about "${location.state.thread.userMessage}". Let me provide a more detailed explanation with examples. What specific aspect would you like to dive deeper into?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDeepAsk: true
        }
      ];
      setMessages(threadMessages);
    } else {
      setMessages([
        {
          id: 1,
          role: "assistant",
          content: "Hello! I'm fD, your AI assistant. Select a message with the brain icon to deep dive into a specific topic, or ask me anything!",
          time: "10:30 AM"
        }
      ]);
    }
  }, [location.state]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let response = "";
      if (threadContext) {
        response = `**Deep Analysis:**\n\nBased on your question about "${threadContext.userMessage}", here's a comprehensive breakdown:\n\n${input.toLowerCase().includes("example") 
          ? "**Practical Example:**\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>DeepAsk Example</title>\n  <style>\n    .container { max-width: 800px; margin: 0 auto; }\n    .highlight { background: #f0f4ff; padding: 20px; }\n  </style>\n</head>\n<body>\n  <div class='container'>\n    <h1>Deep Learning Example</h1>\n    <div class='highlight'>\n      <p>This is a detailed explanation with code.</p>\n    </div>\n  </div>\n</body>\n</html>\n```" 
          : "**Key Insights:**\n\n• Advanced concepts explained\n• Best practices and patterns\n• Performance considerations\n• Common pitfalls to avoid"}`
      } else {
        response = "I understand your question. Let me help you with that.";
      }
      
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDeepAsk: deepAskMode
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 2000);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full  bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200/50 overflow-hidden ">
        {/* Header with glass morphism */}
        <div className="relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl" />
          
          <div className="relative border-b border-blue-200/50 bg-white/50 backdrop-blur-sm">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleGoBack}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-blue-600 hover:bg-blue-100/50 transition-all hover:scale-110"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <div className={`relative ${
                      deepAskMode ? "animate-pulse" : ""
                    }`}>
                      <div className={`w-10 h-10 rounded-xl ${
                        deepAskMode 
                          ? "bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30"
                          : "bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-500/20"
                      } flex items-center justify-center transform hover:scale-105 transition-transform`}>
                        {deepAskMode ? (
                          <Brain size={20} className="text-white" />
                        ) : (
                          <Sparkles size={20} className="text-white" />
                        )}
                      </div>
                      {deepAskMode && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full ring-2 ring-white animate-ping" />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-gray-800 font-semibold text-base">
                          {deepAskMode ? "Deep Ask" : "fD Assistant"}
                        </h1>
                        {deepAskMode && (
                          <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-blue-200">
                            <Zap size={8} />
                            Deep
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <p className="text-blue-600 text-xs font-medium flex items-center gap-1">
                          {deepAskMode ? "Deep learning mode" : "Online"}
                          {deepAskMode && <Cpu size={10} className="text-blue-500" />}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {threadContext && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50 shadow-sm"
                  >
                    <MessageSquare size={14} className="text-blue-500" />
                    <span className="text-xs text-blue-700 font-medium max-w-[200px] truncate">
                      "{threadContext.userMessage.substring(0, 30)}..."
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Messages with modern styling */}
        <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/30 to-white">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex gap-2 ${msg.role === "user" ? "justify-start" : "justify-end"}`}
            >
              {/* User Avatar */}
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/30">
                  <span className="text-xs font-medium text-white">U</span>
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[75%] ${msg.role === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`px-4 py-2.5 text-sm whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-tl-none shadow-lg shadow-blue-500/30"
                      : msg.isDeepAsk
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-gray-800 rounded-2xl rounded-tr-none border border-blue-200/50 shadow-md shadow-blue-500/10"
                      : "bg-white text-gray-800 rounded-2xl rounded-tr-none border border-blue-100/50 shadow-sm hover:shadow-md transition-shadow"
                  }`}
                >
                  {msg.role === "assistant" && msg.isDeepAsk && (
                    <div className="flex items-center gap-1 mb-1.5 text-xs font-medium text-blue-700">
                      <Brain size={11} className="text-blue-600" />
                      <span>Deep analysis</span>
                    </div>
                  )}
                  <div className="text-xs leading-relaxed">
                    {msg.content}
                  </div>
                </div>
                
                <div className={`flex items-center gap-1 mt-1.5 ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                  <p className="text-[10px] text-gray-400">{msg.time}</p>
                  {msg.role === "user" && (
                    <CheckCheck size={10} className="text-blue-500" />
                  )}
                  {msg.role === "assistant" && msg.isDeepAsk && (
                    <span className="text-[9px] text-blue-400 flex items-center gap-0.5">
                      <Brain size={8} />
                      deep
                    </span>
                  )}
                </div>
              </div>

              {/* AI Avatar */}
              {msg.role === "assistant" && (
                <div className={`w-7 h-7 rounded-xl ${
                  msg.isDeepAsk
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30"
                    : "bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-500/20"
                } flex items-center justify-center flex-shrink-0 order-2 transform hover:scale-105 transition-transform`}>
                  <span className="text-xs font-medium text-white">fD</span>
                </div>
              )}
            </motion.div>
          ))}

          {/* Stylish typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 justify-end"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl rounded-tr-none px-5 py-3.5 order-1 shadow-md shadow-blue-500/5">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                      className={`w-2 h-2 rounded-full ${
                        i === 0 ? 'bg-blue-400' : i === 1 ? 'bg-blue-500' : 'bg-blue-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center order-2 shadow-md shadow-blue-500/30">
                <span className="text-xs font-medium text-white">fD</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Modern input area */}
        <div className="p-4 border-t border-blue-200/50 bg-white/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <div className="flex-1 relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={deepAskMode ? "Ask a deeper question..." : "Type your message..."}
                className="w-full px-4 py-3 text-sm bg-white border border-blue-200/50 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all pr-10 shadow-sm hover:border-blue-300"
              />
              {input.trim() && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 text-xs">
                  ↵
                </span>
              )}
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                input.trim()
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              {deepAskMode ? "Deep mode • Enhanced responses" : "fD assistant"}
            </p>
            
            {threadContext && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-500 flex items-center gap-1 bg-blue-50/50 px-2 py-0.5 rounded-full"
              >
                <MessageSquare size={10} className="text-blue-500" />
                <span className="text-blue-600 font-medium truncate max-w-[150px]">
                  {threadContext.userMessage.substring(0, 15)}...
                </span>
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleChat;