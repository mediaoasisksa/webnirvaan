"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "webnirvaan-ai-chat";
const MINIMIZED_KEY = "webnirvaan-ai-minimized";
const WHATSAPP_LINK =
  "https://wa.me/917827448032?text=Hi%20WebNirvaan%20👋%0AI%20just%20chatted%20with%20your%20AI%20assistant.";

const SUGGESTIONS = [
  { label: "💰 Get Pricing", prompt: "I want pricing for my website project." },
  { label: "🔍 Run SEO Audit", prompt: "Please run an SEO audit for my website." },
  { label: "🛒 Build Ecommerce", prompt: "I want to build an ecommerce website." },
  { label: "👨‍💼 Talk to Expert", prompt: "I want to talk to an expert." },
];

export default function AiChatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const pageContext =
    typeof window !== "undefined" ? window.location.pathname : "/";

  /* ================= LOAD STATE ================= */

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setMessages(JSON.parse(saved));

    const minimized = localStorage.getItem(MINIMIZED_KEY);
    if (minimized === "true") setIsMinimized(true);
  }, []);

  /* ================= SAVE STATE ================= */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(MINIMIZED_KEY, String(isMinimized));
    if (!isMinimized) setUnread(0);
  }, [isMinimized]);

  /* ================= PROACTIVE TRIGGERS ================= */

  useEffect(() => {
    if (sessionStorage.getItem("ai_prompted")) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("ai_prompted", "true");
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const percent =
        window.scrollY /
        (document.body.scrollHeight - window.innerHeight);

      if (percent > 0.5) {
        setIsOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "👋 Hi! Want a free website or SEO audit? I can do it in 30 seconds.",
        },
      ]);
    }
  }, [isOpen]);

  /* ================= CLEAR CHAT ================= */

  const clearChat = useCallback(() => {
    if (!confirm("Clear this conversation?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
    setInput("");
  }, []);

  /* ================= SEND MESSAGE (FIXED STREAMING) ================= */

  const sendMessage = async (text?: string) => {
    const messageText = text ?? input;
    if (!messageText.trim() || loading) return;

    const userMessage: Message = { role: "user", content: messageText };
    const contextMessages = [...messages, userMessage];

    setMessages([...contextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: contextMessages, page: pageContext }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      if (!reader) return;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // ✅ Append ONLY the new chunk (no duplication)
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated.length - 1;
          updated[last] = {
            ...updated[last],
            content: updated[last].content + chunk,
          };
          return updated;
        });
      }

      // Auto-expand on AI reply
      if (isMinimized) setIsMinimized(false);
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].content =
          "Sorry, something went wrong. Please try again.";
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= UNREAD BADGE ================= */

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last && last.role === "assistant" && isMinimized && !loading) {
      setUnread((u) => u + 1);
    }
  }, [messages, isMinimized, loading]);

  /* ================= CLOSED STATE ================= */

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50
        bg-gradient-to-r from-purple-600 to-blue-500
        text-white px-4 py-3 rounded-full shadow-lg"
      >
        🤖 Chat with AI
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-white shadow-2xl rounded-2xl
      w-96 transition-all duration-300
      ${isMinimized ? "h-14" : "h-[520px]"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b relative">
        <span className="font-semibold">🤖 WebNirvaan AI</span>

        {isMinimized && unread > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white
          text-xs w-6 h-6 flex items-center justify-center rounded-full">
            {unread}
          </span>
        )}

        <div className="flex gap-3">
          {messages.length > 0 && (
            <button onClick={clearChat} title="Clear chat">🗑️</button>
          )}
          <button onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? "▢" : "—"}
          </button>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">How can I help you today?</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => sendMessage(s.prompt)}
                      className="px-3 py-2 text-sm rounded-full border
                      bg-gradient-to-r from-purple-50 to-blue-50"
                    >
                      {s.label}
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
                  className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                      : "bg-white shadow"
                  }`}
                >
                  {msg.role === "assistant" && msg.content === "" && loading ? (
                    <span className="italic text-gray-400">Typing…</span>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  )}

                  {msg.role === "assistant" &&
                    i === messages.length - 1 &&
                    !loading && (
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        className="inline-block mt-3 text-xs px-3 py-1.5
                        rounded-full bg-green-50 border border-green-200
                        text-green-700"
                      >
                        Continue on WhatsApp →
                      </a>
                    )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message…"
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-white
              bg-gradient-to-r from-purple-600 to-blue-500"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
