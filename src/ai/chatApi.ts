export type ChatMessageRole = "user" | "assistant";

export type ChatResponse = {
  answer: string;
  sources?: string[];
};

const DEFAULT_BASE_URL = "http://localhost:8000";

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const baseUrl = (process.env.REACT_APP_AI_BACKEND_URL || DEFAULT_BASE_URL).replace(/\/$/, "");

  const res = await fetch(`${baseUrl}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    let detail = "Request failed";
    try {
      const data = await res.json();
      detail = data?.detail || detail;
    } catch {
      // ignore
    }
    throw new Error(detail);
  }

  return (await res.json()) as ChatResponse;
}
