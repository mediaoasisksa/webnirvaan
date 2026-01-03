"use client";
import { useState } from "react";

export default function AiChatbot() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      body: JSON.stringify({ message: msg }),
    });
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl rounded-xl p-4">
      <h4 className="font-bold mb-2">🤖 WebNirvaan AI</h4>
      <textarea
        className="w-full border rounded p-2"
        placeholder="Ask anything..."
        onChange={(e) => setMsg(e.target.value)}
      />
      <button
        onClick={send}
        className="mt-2 w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded"
      >
        Ask AI
      </button>
      {reply && <p className="mt-2 text-sm">{reply}</p>}
    </div>
  );
}
