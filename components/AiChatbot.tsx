"use client";

import { useState, useRef, useEffect, useCallback, startTransition } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "webnirvaan-ai-chat";

const SUGGESTIONS = [
  {
    label: "💰 Get Pricing",
    prompt: "I want pricing for building a website for my business.",
  },
  {
    label: "🔍 Run SEO Audit",
    prompt: "Can you run a quick SEO audit for my website?",
  },
  {
    label: "🛒 Build Ecommerce",
    prompt: "I want to build an ecommerce website. What do you recommend?",
  },
  {
    label: "👨‍💼 Talk to Expert",
    prompt: "I want to talk to an expert about my project.",
  },
];

export default function AiChatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const clearingRef = useRef(false);
  const proactiveTriggeredRef = useRef(false);
  const scrollDepthRef = useRef(0);
  const timeOnPageRef = useRef(0);

  const pageContext =
    typeof window !== "undefined" ? window.location.pathname : "/";

  /* ---------- LOAD FROM LOCAL STORAGE ---------- */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setMessages(JSON.parse(saved));
    setHydrated(true);
  }, []);


  /* ---------- SAVE TO LOCAL STORAGE (DEBOUNCED) ---------- */
  useEffect(() => {
    if (!hydrated) return;
    
    // Debounce localStorage save
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (e) {
        console.error("Failed to save to localStorage", e);
      }
    }, 300);

    // Scroll to bottom (non-blocking)
    requestAnimationFrame(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });

    return () => clearTimeout(timeoutId);
  }, [messages, hydrated]);

  /* ---------- CLEAR CHAT ---------- */
  const clearChat = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    // Prevent multiple simultaneous clear operations
    if (clearingRef.current) return;
    clearingRef.current = true;
    
    // Use requestAnimationFrame to defer confirm and keep UI responsive
    requestAnimationFrame(() => {
      const shouldClear = window.confirm("Clear this conversation?");
      clearingRef.current = false;
      
      if (!shouldClear) return;
      
      // Use scheduler API if available, otherwise requestIdleCallback
      const scheduleWork = (callback: () => void) => {
        if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
          (window as any).scheduler.postTask(callback, { priority: 'background' });
        } else if ('requestIdleCallback' in window) {
          requestIdleCallback(callback, { timeout: 100 });
        } else {
          setTimeout(callback, 0);
        }
      };
      
      scheduleWork(() => {
        startTransition(() => {
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch (err) {
            console.error("Failed to clear localStorage", err);
          }
          // Batch all state updates
          setMessages([]);
          setInput("");
        });
      });
    });
  }, []);

  /* ---------- SEND MESSAGE ---------- */
  const sendMessage = useCallback(async (text?: string) => {
    const messageText = text ?? input;
    if (!messageText.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: messageText,
    };

    const contextMessages = [...messages, userMessage];

    // Batch state updates
    startTransition(() => {
      setMessages([...contextMessages, { role: "assistant", content: "" }]);
      setInput("");
    });
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: contextMessages,
          page: pageContext,
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        setLoading(false);
        return;
      }

      let done = false;
      let buffer = "";
      let lastUpdate = Date.now();
      const UPDATE_INTERVAL = 50; // Throttle updates to every 50ms

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          buffer += decoder.decode(value, { stream: true });
        }

        // Throttle state updates to prevent blocking
        const now = Date.now();
        if (done || now - lastUpdate >= UPDATE_INTERVAL) {
          const contentToAdd = buffer;
          buffer = "";
          lastUpdate = now;

          startTransition(() => {
            setMessages((prev) => {
              const updated = [...prev];
              const lastIndex = updated.length - 1;
              if (lastIndex >= 0) {
                updated[lastIndex] = {
                  ...updated[lastIndex],
                  content: updated[lastIndex].content + contentToAdd,
                };
              }
              return updated;
            });
          });
        }
      }

      // Flush remaining buffer
      if (buffer) {
        startTransition(() => {
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (lastIndex >= 0) {
              updated[lastIndex] = {
                ...updated[lastIndex],
                content: updated[lastIndex].content + buffer,
              };
            }
            return updated;
          });
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (lastIndex >= 0 && updated[lastIndex].content === "") {
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: "Sorry, an error occurred. Please try again.",
          };
        }
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading, pageContext]);

  /* ---------- PROACTIVE AI TRIGGERS ---------- */
  useEffect(() => {
    if (!hydrated || messages.length > 0 || proactiveTriggeredRef.current || loading) return;

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      scrollDepthRef.current = Math.max(scrollDepthRef.current, scrollPercent);
    };

    // Track time on page
    const timeInterval = setInterval(() => {
      timeOnPageRef.current += 1;
    }, 1000);

    window.addEventListener('scroll', handleScroll);

    // Trigger 1: User scrolls past 60% of page
    const scrollCheck = setInterval(() => {
      if (scrollDepthRef.current > 60 && !proactiveTriggeredRef.current && !loading) {
        proactiveTriggeredRef.current = true;
        if (!isMinimized && isOpen) {
          setTimeout(() => {
            sendMessage("I'm interested in learning more about your services. Can you help me?");
          }, 2000);
        }
      }
    }, 1000);

    // Trigger 2: User spends 30+ seconds on page
    const timeCheck = setInterval(() => {
      if (timeOnPageRef.current > 30 && !proactiveTriggeredRef.current && !loading) {
        proactiveTriggeredRef.current = true;
        if (!isMinimized && isOpen) {
          setTimeout(() => {
            sendMessage("Hi! I noticed you've been browsing. Would you like to discuss your project needs?");
          }, 2000);
        }
      }
    }, 1000);

    // Trigger 3: User reaches pricing section
    const pricingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !proactiveTriggeredRef.current && !loading) {
            proactiveTriggeredRef.current = true;
            if (!isMinimized && isOpen) {
              setTimeout(() => {
                sendMessage("I see you're checking out our pricing. Would you like a custom quote for your project?");
              }, 2000);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const pricingSection = document.getElementById('pricing');
    if (pricingSection) pricingObserver.observe(pricingSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
      clearInterval(scrollCheck);
      clearInterval(timeCheck);
      if (pricingSection) pricingObserver.unobserve(pricingSection);
    };
  }, [hydrated, messages.length, isMinimized, isOpen, loading, sendMessage]);

  /* ---------- CLOSED STATE ---------- */
  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50
        bg-gradient-to-r from-purple-600 to-blue-500
        text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl
        transition-all duration-200 text-sm sm:text-base
        flex items-center gap-2"
      >
        <span className="text-lg sm:text-xl">🤖</span>
        <span className="hidden sm:inline">Chat with AI</span>
        <span className="sm:hidden">AI</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-white shadow-2xl
      flex flex-col transition-all duration-300
      ${
        isMinimized
          ? "bottom-4 right-4 sm:bottom-6 sm:right-6 h-14 w-64 sm:w-72 rounded-2xl"
          : "inset-2 sm:inset-4 sm:bottom-6 sm:right-6 sm:inset-auto sm:h-[520px] sm:w-96 sm:rounded-2xl rounded-xl"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50 sm:bg-white">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl">🤖</span>
          <span className="font-semibold text-sm sm:text-base text-gray-900">WebNirvaan AI</span>
        </div>
        <div className="flex gap-2 sm:gap-3 items-center text-gray-500">
          {messages.length > 0 && !isMinimized && (
            <button 
              onClick={(e) => clearChat(e)} 
              title="Clear chat"
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
            >
              <span className="text-base sm:text-lg">🗑️</span>
            </button>
          )}
          {!isMinimized && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                startTransition(() => setIsMinimized(!isMinimized));
              }}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
              title="Minimize"
              type="button"
            >
              <span className="text-lg">—</span>
            </button>
          )}
          {isMinimized && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                startTransition(() => setIsMinimized(false));
              }}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Expand"
              type="button"
            >
              <span className="text-lg">▢</span>
            </button>
          )}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              startTransition(() => setIsOpen(false));
            }} 
            className="p-1.5 sm:p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
            title="Close"
            type="button"
          >
            <span className="text-lg sm:text-xl">✕</span>
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="space-y-4 sm:space-y-5 pt-2">
                <div className="text-center sm:text-left">
                  <p className="text-base sm:text-lg font-medium text-gray-700 mb-1">
                    How can I help you today?
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Choose an option below or type your message
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      onClick={(e) => {
                        e.preventDefault();
                        sendMessage(s.prompt);
                      }}
                      className="px-3 py-2.5 sm:py-2 text-xs sm:text-sm rounded-xl border border-gray-200
                      bg-gradient-to-r from-purple-50 to-blue-50
                      hover:from-purple-100 hover:to-blue-100 hover:shadow-md
                      active:scale-95 transition-all duration-200
                      font-medium text-gray-700
                      flex items-center justify-center gap-1.5"
                    >
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <>
                      {msg.content ? (
                        <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-1 prose-code:rounded">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : loading ? (
                        <div className="flex items-center gap-1.5 py-1">
                          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        </div>
                      ) : null}

                      {/* Quick actions after AI reply */}
                      {i === messages.length - 1 && !loading && msg.content && (
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              sendMessage("I want pricing for my project");
                            }}
                            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200
                            bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all
                            font-medium text-gray-700"
                          >
                            💰 Get Pricing
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              sendMessage("Run an SEO audit for my website");
                            }}
                            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200
                            bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all
                            font-medium text-gray-700"
                          >
                            🔍 SEO Audit
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="break-words">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-white flex gap-2 sm:gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Type your message…"
              className="flex-1 border border-gray-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-sm
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none
              placeholder:text-gray-400"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              disabled={loading || !input.trim()}
              className="px-4 sm:px-5 py-2.5 sm:py-2 rounded-xl text-white font-semibold text-sm
              bg-gradient-to-r from-purple-600 to-blue-500
              hover:from-purple-700 hover:to-blue-600
              disabled:opacity-50 disabled:cursor-not-allowed
              active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg
              flex items-center justify-center min-w-[70px] sm:min-w-[80px]"
            >
              {loading ? (
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </span>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
