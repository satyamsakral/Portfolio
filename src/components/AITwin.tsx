import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Terminal, Cpu } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { soundFx } from '../utils/audio';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const suggestedPrompts = [
  'What is Satyam\'s background in AI?',
  'Explain the Study AI architecture',
  'What are his key skills & metrics?',
  'Is he available for jobs & internships?',
];

export default function AITwin() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: 'Greetings. I am Satyam\'s AI Twin. Ask me anything about his neural architectures, full-stack systems, or engineering experience.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim()) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: textToSend.trim() }]);
    setIsTyping(true);
    soundFx.playClick();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: messages,
        }),
      });

      const data = await response.json().catch(() => ({}));
      const rawText = data?.text || data?.error || "";
      let replyText = rawText;

      if (!replyText || replyText.includes("running in fallback mode")) {
        const q = textToSend.toLowerCase().trim();
        if (q.includes("background")) {
          replyText = "### Satyam Sakral — AI Engineer & Full-Stack Developer\n\nSatyam specializes in **Generative AI, RAG Systems, and Software Engineering**.\n\n- **Experience**: LLM Trainer Intern at **Ethara AI** & Django Developer Intern at **Doosra College**.\n- **Education**: MCA (JIMS, GGSIPU - CGPA 8.2) and BCA (SGTBIMIT, GGSIPU - CGPA 7.7).\n- **Projects**: **Study AI** (Gemini & LangChain RAG), **FaceMask Detector** (PyTorch CNN), and **VividChat** (WebRTC P2P).\n- **Certifications**: AI & ML with Drone Technology (TiHAN, IIT Hyderabad).";
        } else if (q.includes("study ai") || (q.includes("study") && q.includes("architecture"))) {
          replyText = "### Study AI Architecture (Deep RAG Engine)\n\n**Study AI** is an autonomous learning assistant built by Satyam:\n\n1. **Multi-Source Ingestion**: Ingests PDFs & YouTube lecture transcripts via LangChain & YouTube Transcript API.\n2. **Vector Embeddings**: 768-dimensional embeddings stored in **ChromaDB**.\n3. **LLM Synthesis**: Powered by **Gemini API** for study plan generation and citation-backed Q&A.\n4. **Metrics**: <450ms query latency, 94.2% retrieval accuracy.";
        } else if (q.includes("skill") || q.includes("metric")) {
          replyText = "### Technical Skills & Verified Metrics\n\n- **Languages**: Python, Java, C++, SQL\n- **AI & RAG**: LangChain, Gemini API, PyTorch, OpenCV, RAG, Scikit-learn, Fine-Tuning\n- **Web & Backend**: Django, FastAPI, Spring Boot, React, Node.js, WebRTC, Socket.io\n- **Verified Metrics**: <450ms RAG latency, ~81% CNN precision, 60% database query latency reduction.";
        } else if (q.includes("available") || q.includes("job") || q.includes("internship")) {
          replyText = "### Availability Status\n\n**Yes! Satyam Sakral is actively available for Jobs & Internships** in AI Engineering, RAG Development, and Full-Stack Software Engineering.\n\n- **Email**: [satyamsakral@gmail.com](mailto:satyamsakral@gmail.com)\n- **GitHub**: [github.com/satyamsakral](https://github.com/satyamsakral)\n- **LinkedIn**: [linkedin.com/in/satyam-sakral-5553a4240](https://linkedin.com/in/satyam-sakral-5553a4240/)\n- **Location**: Delhi, India (Open to Remote / Hybrid)";
        } else if (q === 'hey' || q === 'hello' || q === 'hi' || q === 'gey' || q === 'yo' || q === 'greetings') {
          replyText = "Greetings! I am Satyam Sakral's AI Twin. Ask me anything about Satyam's engineering background, projects (**Study AI**, **FaceMask Detection**, **VividChat**), experience at **Ethara AI** & **Doosra College**, skills, or education. How can I assist you today?";
        } else {
          replyText = "Satyam Sakral is an AI Engineer specializing in **Generative AI, RAG Systems, and Full-Stack Development**. Feel free to ask about his projects (**Study AI**, **FaceMask Detector**, **VividChat**), internship experience at **Ethara AI**, or technical skills!";
        }
      }

      setMessages((prev) => [...prev, { role: 'ai', text: replyText }]);
      soundFx.playSuccess();
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: "Greetings! I am Satyam Sakral's AI Twin. You can ask me anything about his projects (**Study AI**, **FaceMask Detector**, **VividChat**), experience at **Ethara AI**, or skills. Feel free to contact him at satyamsakral@gmail.com!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating High-Tech Launch Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-cyber-900/90 border border-cyan-500/60 backdrop-blur-xl text-white flex items-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:border-cyan-400 transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => soundFx.playHover()}
        onClick={() => {
          soundFx.playClick();
          setIsOpen(!isOpen);
        }}
      >
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 text-white flex items-center justify-center font-display font-extrabold text-xs shadow-md">
            <Bot size={18} />
          </div>
        </div>

        <div className="flex flex-col text-left">
          <span className="font-display font-extrabold text-xs tracking-wider uppercase group-hover:text-cyan-300 transition-colors">
            AI Assistant
          </span>
          <span className="text-[9px] font-mono text-cyan-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Gemini Powered
          </span>
        </div>
      </motion.button>

      {/* Cyber AI Assistant Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 sm:bottom-24 right-2.5 sm:right-6 left-2.5 sm:left-auto z-50 w-auto sm:w-[420px] max-h-[82vh] sm:max-h-[580px] flex flex-col glass-panel rounded-3xl border border-cyan-500/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-4 bg-cyber-950/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 text-white flex items-center justify-center">
                  <Cpu size={16} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white uppercase flex items-center gap-2">
                    Satyam's AI Twin
                    <span className="text-[9px] font-mono font-normal text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      v2.5
                    </span>
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">Contextual Knowledge Engine</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setIsOpen(false);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={13} />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium rounded-br-none shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-cyber-900/80 border border-white/10 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <div className="prose prose-invert text-xs leading-relaxed">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={13} />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px]">
                  <Bot size={14} className="animate-spin" />
                  <span>Synthesizing neural response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            <div className="p-2.5 bg-cyber-950/60 border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 text-[9px] font-mono text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-cyber-950/90 border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Satyam's AI Assistant..."
                className="flex-1 px-3 py-2 rounded-xl bg-cyber-900 border border-white/10 focus:border-cyan-400 text-xs text-white placeholder-slate-500 outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                onMouseEnter={() => soundFx.playHover()}
                className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 disabled:opacity-40 transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
