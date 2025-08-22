"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  return (
    <div className="flex flex-col w-full max-w-md py-10 mx-auto">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-xl ${
              m.role === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {m.parts.map((p, i) =>
              p.type === "text" ? (
                <span key={`${m.id}-${i}`}>{p.text}</span>
              ) : null
            )}
          </div>
        ))}
        {status === "submitted" && (
          <div className="text-sm text-gray-400">Waiting for AI response…</div>
        )}

        {status === "streaming" && (
          <div className="text-sm text-gray-400">AI is typing…</div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput("");
        }}
        className="flex"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          disabled={status === "streaming" || status === "submitted"}
          className="bg-blue-600 text-white px-4 rounded-r-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}
