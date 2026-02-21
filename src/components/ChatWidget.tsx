import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import { sendChatMessage } from "../ai/chatApi";

type UiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const EXAMPLE_QUESTIONS = [
  "What tech stack do you work with?",
  "What projects are you most proud of?",
  "What kind of roles are you looking for?",
];

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<UiMessage[]>(() => [
    {
      id: uid(),
      role: "assistant",
      content:
        "Hi! Ask me anything about Joel’s resume or portfolio. I’ll answer based on the site/resume content.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  async function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setLoading(true);
    setInput("");

    const userMsg: UiMessage = { id: uid(), role: "user", content: trimmed };
    setMessages((prev: UiMessage[]) => [...prev, userMsg]);

    try {
      const res = await sendChatMessage(trimmed);
      const assistantMsg: UiMessage = { id: uid(), role: "assistant", content: res.answer };
      setMessages((prev: UiMessage[]) => [...prev, assistantMsg]);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-purple-400 hover:bg-purple-500 text-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center transition"
          aria-label="Open chat"
        >
          <FaCommentDots size={22} />
        </button>
      ) : (
        <div className="w-[92vw] max-w-[380px] h-[70vh] max-h-[520px] bg-[#121325] text-white shadow-2xl rounded-2xl overflow-hidden border border-white/10">
          <div className="flex items-center justify-between px-4 py-3 bg-[#18192a] border-b border-white/10">
            <div>
              <div className="font-semibold leading-tight">Ask about Joel</div>
              <div className="text-[11px] text-white/60 leading-tight">
                AI assistant trained on my resume &amp; portfolio
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white transition"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          <div ref={listRef} className="px-4 py-3 space-y-3 overflow-y-auto h-[calc(100%-132px)]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-purple-500/80 px-4 py-2 text-sm whitespace-pre-wrap break-words leading-relaxed"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2 text-sm whitespace-pre-wrap break-words leading-relaxed"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading ? (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2 text-sm">
                  <span className="inline-flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="text-xs text-red-300 bg-red-500/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </div>
            ) : null}

            {messages.length <= 2 ? (
              <div className="pt-1">
                <div className="text-xs text-white/60 mb-2">Try:</div>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition"
                      disabled={loading}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="px-4 py-3 bg-[#18192a] border-t border-white/10">
            <form
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-[#23243a] text-white placeholder:text-white/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="bg-purple-400 hover:bg-purple-500 disabled:opacity-60 text-white rounded-full px-4 py-2 text-sm font-semibold transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
