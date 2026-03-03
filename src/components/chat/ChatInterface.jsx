import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Share2,
  Settings,
  Phone,
  Video,
  Info,
  Smile,
  Paperclip,
  MoreHorizontal,
  CheckCheck,
  Sparkles,
  Copy,
  Trash2,
  Heart,
  Brain,
  User,
  Code,
  Terminal,
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BLUE = "#2563eb";
const DARK_BLUE = "#1a3aad";

const initialMessages = [
  {
    id: 1,
    from: "user",
    text: "how to do frontend in html",
    time: "2:10 PM",
    read: true
  },
  {
    id: 2,
    from: "ai",
    text: "To create a frontend in HTML, follow these steps: start with a basic HTML structure, add CSS for styling, and use JavaScript for interactivity.",
    time: "2:11 PM",
    read: true,
  },
  {
    id: 3,
    from: "user",
    text: "Can you give me a simple example?",
    time: "2:13 PM",
    read: false,
  },
];

// Function to format message with code blocks and markdown
const formatMessage = (text) => {
  if (!text) return text;

  // Split by code blocks (```language...```)
  const parts = text.split(/(```[\s\S]*?```)/g);
  
  return parts.map((part, index) => {
    // Check if this part is a code block
    if (part.startsWith('```') && part.endsWith('```')) {
      // Extract language and code
      const firstLineEnd = part.indexOf('\n');
      const language = part.substring(3, firstLineEnd).trim() || 'text';
      const code = part.substring(firstLineEnd + 1, part.length - 3).trim();
      
      return (
        <div key={index} className="my-2 rounded-lg overflow-hidden border border-slate-700/50">
          {/* Code header */}
          <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-slate-400" />
              <span className="text-xs font-mono text-slate-300">{language}</span>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <Copy size={14} />
            </button>
          </div>
          
          {/* Code content */}
          <pre className="bg-slate-900 p-4 overflow-x-auto">
            <code className="text-sm font-mono text-slate-300 whitespace-pre">
              {code}
            </code>
          </pre>
        </div>
      );
    }
    
    // Regular text - parse inline code and formatting
    if (part) {
      // Split by inline code (`code`)
      const inlineParts = part.split(/(`[^`]+`)/g);
      
      return (
        <div key={index} className="space-y-2">
          {inlineParts.map((inlinePart, inlineIndex) => {
            if (inlinePart.startsWith('`') && inlinePart.endsWith('`')) {
              // Inline code
              return (
                <code
                  key={inlineIndex}
                  className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono text-blue-600 dark:text-blue-400"
                >
                  {inlinePart.slice(1, -1)}
                </code>
              );
            }
            
            // Split by bold (**text**)
            const boldParts = inlinePart.split(/(\*\*[^*]+\*\*)/g);
            
            return (
              <React.Fragment key={inlineIndex}>
                {boldParts.map((boldPart, boldIndex) => {
                  if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
                    return (
                      <strong key={boldIndex} className="font-bold text-slate-900 dark:text-white">
                        {boldPart.slice(2, -2)}
                      </strong>
                    );
                  }
                  
                  // Split by italic (*text*)
                  const italicParts = boldPart.split(/(\*[^*]+\*)/g);
                  
                  return (
                    <React.Fragment key={boldIndex}>
                      {italicParts.map((italicPart, italicIndex) => {
                        if (italicPart.startsWith('*') && italicPart.endsWith('*')) {
                          return (
                            <em key={italicIndex} className="italic text-slate-700 dark:text-slate-300">
                              {italicPart.slice(1, -1)}
                            </em>
                          );
                        }
                        
                        // Handle bullet points and numbered lists
                        const lines = italicPart.split('\n');
                        return lines.map((line, lineIndex) => {
                          if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
                            return (
                              <div key={lineIndex} className="flex items-start gap-2 ml-4">
                                <span className="text-blue-500">•</span>
                                <span>{line.trim().substring(2)}</span>
                              </div>
                            );
                          }
                          
                          if (/^\d+\.\s/.test(line.trim())) {
                            const match = line.trim().match(/^(\d+)\.\s(.*)/);
                            if (match) {
                              return (
                                <div key={lineIndex} className="flex items-start gap-2 ml-4">
                                  <span className="text-blue-500 font-mono text-xs mt-1">{match[1]}.</span>
                                  <span>{match[2]}</span>
                                </div>
                              );
                            }
                          }
                          
                          return line ? <span key={lineIndex}>{line}{lineIndex < lines.length - 1 ? <br /> : ''}</span> : <br key={lineIndex} />;
                        });
                      })}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      );
    }
    
    return null;
  });
};

// Code block component for better organization
const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="my-3 rounded-lg overflow-hidden border border-slate-700/50">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <Code size={14} className="text-slate-400" />
          <span className="text-xs font-mono text-slate-300">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors relative"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="bg-slate-900 p-4 overflow-x-auto">
        <code className="text-sm font-mono text-slate-300 whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
};

const Avatar = ({ size = 36, status = true, type = "user" }) => {
  let initials = "DP";
  let gradient = "from-purple-500 to-pink-500";

  if (type === "ai") {
    initials = "fD";
    gradient = "from-[#1a3aad] to-[#2563eb]";
  }

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`flex items-center justify-center rounded-xl text-white font-bold bg-gradient-to-r ${gradient}`}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.35,
          boxShadow: "0 4px 10px rgba(37,99,235,0.3)",
        }}
      >
        {initials}
      </div>
      {status && (
        <motion.span
          className="absolute rounded-full ring-2 ring-white"
          style={{
            width: size * 0.25,
            height: size * 0.25,
            background: "#22c55e",
            bottom: 0,
            right: 0
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
};

const ChatInterface = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const send = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: "user",
        text: input.trim(),
        time: "Just now",
        read: false,
      },
    ]);
    setInput("");

    // Simulate AI typing response with formatted code
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      // Check if the user asked for code
      const userInput = input.toLowerCase();
      let responseText = "";
      
      if (userInput.includes("reverse a number") && userInput.includes("cpp")) {
        responseText = `Here's a C++ program to reverse a number:

\`\`\`cpp
#include <iostream>
using namespace std;

int reverseNumber(int num) {
    int reversed = 0;
    
    while (num > 0) {
        int lastDigit = num % 10;
        reversed = reversed * 10 + lastDigit;
        num = num / 10;
    }
    
    return reversed;
}

int main() {
    int number;
    
    cout << "Enter a number: ";
    cin >> number;
    
    int reversed = reverseNumber(number);
    
    cout << "Original number: " << number << endl;
    cout << "Reversed number: " << reversed << endl;
    
    return 0;
}
\`\`\`

**How it works:**
1. *Extract last digit* using modulo operator (% 10)
2. *Build reversed number* by multiplying by 10 and adding last digit
3. *Remove last digit* using division by 10
4. *Repeat* until original number becomes 0

**Example:**
- Input: 12345
- Process:
  - reversed = 0 * 10 + 5 = 5
  - reversed = 5 * 10 + 4 = 54  
  - reversed = 54 * 10 + 3 = 543
  - reversed = 543 * 10 + 2 = 5432
  - reversed = 5432 * 10 + 1 = 54321
- Output: 54321

**Time Complexity:** O(log₁₀ n) - number of digits in the input
**Space Complexity:** O(1) - constant space used`;
      } else {
        responseText = "I understand you're asking about frontend development. Here's a simple HTML example:\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n  <style>\n    body { font-family: sans-serif; }\n    h1 { color: blue; }\n  </style>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>\n```\n\nYou can save this as an **.html** file and open it in any browser!";
      }
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "ai",
          text: responseText,
          time: "Just now",
          read: false
        },
      ]);
    }, 2000);
  };

  const removeMsg = (id) => setMessages((prev) => prev.filter((m) => m.id !== id));

  // Animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  const typingAnimation = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex-1"
    >
      <div
        className="flex flex-col overflow-hidden bg-white rounded-xl border border-blue-50"
        style={{
          height: 700,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* ── Header ── */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex items-center gap-3 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-5 py-3"
        >
          <Avatar size={48} status={true} type="ai" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-slate-800">
                futurDooM <span className="text-xs font-normal text-slate-500">(Assistant)</span>
              </p>
              <Sparkles size={14} className="text-blue-500" />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <motion.span
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-xs font-semibold text-green-500">
                Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {[
              { Icon: Phone, label: "Call" },
              { Icon: Video, label: "Video" },
              { Icon: Info, label: "Info" },
              { Icon: MoreHorizontal, label: "More" },
            ].map(({ Icon, label }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center rounded-xl hover:bg-white w-9 h-9 text-blue-600 transition-all"
              >
                <Icon size={18} strokeWidth={1.8} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Messages ── */}
        <div
          className="flex-1 overflow-y-auto p-5 space-y-4"
          style={{ background: "#fafcff" }}
        >
          {/* Date pill */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
              Feb 20, 2026
            </span>
          </motion.div>

          {/* Messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => {
              const isAI = msg.from === "ai";
              const isUser = msg.from === "user";
              const prevSame = i > 0 && messages[i - 1].from === msg.from;

              return (
                <motion.div
                  key={msg.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout
                  className="flex flex-col"
                >
                  {/* Action Icons */}
                  <div className={`flex items-center gap-1 mb-1 ${isAI ? 'justify-end' : 'justify-start'}`}>
                    {isUser && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeMsg(msg.id)}
                          className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Like"
                        >
                          <Heart size={14} />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Copy"
                          onClick={() => navigator.clipboard.writeText(msg.text)}
                        >
                          <Copy size={14} />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => navigate("/deepaskshare", { 
                            state: { 
                              thread: {
                                userMessage: messages[i-1]?.text || msg.text,
                                aiResponse: messages[i+1]?.text || "",
                                time: msg.time,
                                responseTime: messages[i+1]?.time,
                                conversationId: msg.id,
                                context: "full-conversation"
                              }
                            } 
                          })}
                          className="p-1 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-500 transition-colors relative"
                          title="Deep Ask Share - 4 notifications"
                        >
                          <Brain size={14} />
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            4
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Share"
                        >
                          <Share2 size={14} />
                        </motion.button>
                      </>
                    )}
                  </div>

                  {/* Message bubble with avatar */}
                  <div className={`flex items-end gap-2 ${isAI ? 'justify-end' : 'justify-start'}`}>
                    {/* Avatar for user messages */}
                    {isUser && !prevSame && (
                      <Avatar size={36} status={true} type="user" />
                    )}
                    {isUser && prevSame && <div className="w-9" />}

                    {/* Message bubble */}
                    <div className={`flex flex-col max-w-[80%] ${isAI ? 'items-end' : 'items-start'}`}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className={`px-4 py-3 text-sm ${isAI
                            ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-2xl rounded-br-sm'
                            : 'bg-white text-slate-800 rounded-2xl rounded-bl-sm border border-blue-100'
                          }`}
                        style={{
                          boxShadow: isAI
                            ? '0 4px 15px rgba(37,99,235,0.3)'
                            : '0 2px 8px rgba(0,0,0,0.03)',
                        }}
                      >
                        {/* Format the message with code blocks and markdown */}
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          {isAI ? (
                            <div className="text-white/90 space-y-2">
                              {formatMessage(msg.text)}
                            </div>
                          ) : (
                            <div className="text-slate-800">
                              {msg.text}
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Time + read receipt */}
                      <div className={`flex items-center gap-1.5 mt-1 text-xs ${isAI ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-slate-400">{msg.time}</span>
                        {isAI && (
                          <CheckCheck
                            size={14}
                            className={msg.read ? "text-blue-600" : "text-slate-300"}
                          />
                        )}
                      </div>
                    </div>

                    {/* Avatar for AI messages */}
                    {isAI && !prevSame && (
                      <Avatar size={36} status={true} type="ai" />
                    )}
                    {isAI && prevSame && <div className="w-9" />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-2 justify-end"
              >
                <div className="bg-gradient-to-r from-[#1a3aad] to-[#2563eb] px-4 py-3 rounded-2xl rounded-br-sm flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      variants={typingAnimation}
                      animate="animate"
                      className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                  ))}
                </div>
                <Avatar size={30} status={true} type="ai" />
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input bar ── */}
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="flex items-center gap-2 flex-shrink-0 px-4 py-3 border-t border-slate-200 bg-white"
        >
          {[Paperclip, Smile].map((Icon, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, rotate: i === 1 ? 15 : 0 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center rounded-xl hover:bg-blue-50 w-10 h-10 text-slate-500 transition-colors"
            >
              <Icon size={18} strokeWidth={1.8} />
            </motion.button>
          ))}

          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask fD something... (try 'reverse a number in cpp')"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          <motion.button
            onClick={send}
            whileHover={{ scale: input.trim() ? 1.1 : 1 }}
            whileTap={{ scale: input.trim() ? 0.95 : 1 }}
            className={`flex items-center justify-center rounded-xl w-10 h-10 transition-all ${input.trim()
                ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md shadow-blue-500/30'
                : 'bg-slate-200 text-slate-400'
              }`}
            disabled={!input.trim()}
          >
            <Send size={16} strokeWidth={2} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatInterface;