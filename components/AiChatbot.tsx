"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "webnirvaan_ai_chat";

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "👋 Hi! Want a free website or SEO audit? I can help in seconds.",
};

const SUGGESTIONS = [
  { label: "💰 Get Pricing", prompt: "I want pricing for my website project." },
  { label: "🔍 Run SEO Audit", prompt: "Run an SEO audit for my website." },
  { label: "🛒 Build Ecommerce", prompt: "I want to build an ecommerce website." },
  { label: "👨‍💼 Talk to Expert", prompt: "I want to talk to an expert." },
];

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const isDesktop =
    typeof window !== "undefined" && window.innerWidth >= 768;

  /* ================= LOAD FROM STORAGE ================= */

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  /* ================= SAVE TO STORAGE ================= */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  /* ================= INIT MESSAGE ================= */

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([INITIAL_MESSAGE]);
    }
  }, [isOpen, messages.length]);

  /* ================= AUTO SCROLL ================= */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ================= CLEAR CHAT ================= */

  const clearChat = useCallback(() => {
    if (!confirm("Clear this conversation?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  }, []);

  /* ================= SEND MESSAGE ================= */

  const sendMessage = async (text?: string) => {
    const messageText = text ?? input;
    if (!messageText.trim() || loading) return;

    const userMessage: Message = { role: "user", content: messageText };
    const context = [...messages, userMessage];

    setMessages([...context, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: context }),
      });

      const reader = res.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: accumulated,
          };
          return updated;
        });
      }
    } finally {
      setLoading(false);
      if (isDesktop) setIsMinimized(false);
    }
  };

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

  /* ================= CHAT UI ================= */

  return (
    <div
      className={`
        fixed z-50 bg-white shadow-2xl transition-all duration-300
        inset-0 w-full h-screen rounded-none
        md:inset-auto md:bottom-6 md:right-6 md:w-96 md:h-[520px] md:rounded-2xl
        ${isMinimized && isDesktop ? "md:h-14" : ""}
      `}
    >
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center p-4 border-b shrink-0">
        <span className="font-semibold">🤖 WebNirvaan AI</span>

        <div className="flex gap-3">
          {messages.length > 1 && (
            <button onClick={clearChat} title="Clear chat">
              🗑️
            </button>
          )}

          {isDesktop && (
            <button onClick={() => setIsMinimized(!isMinimized)}>
              {isMinimized ? "▢" : "—"}
            </button>
          )}

          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>
      </div>

      {/* ================= BODY ================= */}
      {!isMinimized && (
        <div className="flex flex-col h-[calc(100%-64px)]">
          {/* ===== Scroll Area (ONLY SCROLLABLE PART) ===== */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 1 && (
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
                  {msg.role === "assistant" &&
                  msg.content === "" &&
                  loading ? (
                    <span className="italic text-gray-400">Typing…</span>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            <div ref={bottomRef} />
          </div>

          {/* ===== INPUT (ALWAYS VISIBLE) ===== */}
          <div className="shrink-0 border-t bg-white p-3 flex gap-2">
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
        </div>
      )}
    </div>
  );
}
