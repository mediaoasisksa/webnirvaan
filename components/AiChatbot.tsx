"use client";

import { useState, useRef, useEffect } from "react";
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
    prompt: "I want an estimate for building a website for my business.",
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
    prompt: "I want to talk to an expert about my project requirements.",
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

  /* ================= LOAD FROM SESSION ================= */
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMessages(JSON.parse(saved));
    }
    setHydrated(true);
  }, []);

  /* ================= SAVE TO SESSION ================= */
  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, hydrated]);

  /* ================= CLEAR CHAT ================= */
  const clearChat = () => {
    if (!confirm("Clear this chat conversation?")) return;
    sessionStorage.removeItem(STORAGE_KEY);
    setMessages([]);
    setInput("");
  };

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async (text?: string) => {
    const messageText = text ?? input;
    if (!messageText.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: messageText,
    };

    const contextMessages = [...messages, userMessage];

    setMessages(contextMessages);
    setInput("");
    setLoading(true);

    // placeholder assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: contextMessages,
      }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      setLoading(false);
      return;
    }

    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      const chunk = decoder.decode(value || new Uint8Array(), {
        stream: true,
      });

      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        updated[lastIndex] = {
          ...updated[lastIndex],
          content: updated[lastIndex].content + chunk,
        };
        return updated;
      });
    }

    setLoading(false);
  };

  /* ================= CLOSED STATE ================= */
  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
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
      className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-xl
      flex flex-col transition-all duration-300
      ${isMinimized ? "h-14 w-72" : "h-[520px] w-96"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b font-semibold">
        <span>🤖 WebNirvaan AI</span>

        <div className="flex gap-3 text-gray-500 items-center">
          {/* Clear */}
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              title="Clear chat"
              className="hover:text-red-500"
            >
              🗑️
            </button>
          )}

          {/* Minimize */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label="Minimize"
          >
            {isMinimized ? "▢" : "—"}
          </button>

          {/* Close */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="hover:text-red-500"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Chat Body */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  How can I help you today?
                </p>

                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => sendMessage(item.prompt)}
                      className="px-3 py-2 text-sm rounded-full border
                      bg-gradient-to-r from-purple-50 to-blue-50
                      hover:from-purple-100 hover:to-blue-100 transition"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                      : "bg-white text-gray-800 shadow"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content || (loading ? "Typing…" : "")}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
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
              className="flex-1 border rounded-lg px-3 py-2 text-sm
              focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-white font-semibold
              bg-gradient-to-r from-purple-600 to-blue-500
              disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
