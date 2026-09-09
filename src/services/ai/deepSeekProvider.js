// DeepSeek AI Client Connector — Frontend side
// Delegates chat and advisory requests to server endpoint /api/ai/chat.
// Keeps DEEPSEEK_API_KEY server-side.

export async function postDeepSeekChat({ messages, system, temperature = 0.3, maxTokens = 800, stream = false }) {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
      system,
      temperature,
      max_tokens: maxTokens,
      stream,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `DeepSeek API error ${response.status}`);
  }

  const data = await response.json();
  return data;
}
