// Hugging Face Client Connector — Frontend side
// Communicates with CropShield server API routes (/api/ai/*).
// Never exposes HF_TOKEN or calls Hugging Face directly from the browser.

export async function postChat({ messages, system, temperature = 0.3, maxTokens = 800 }) {
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
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server API error ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function postAdvisory({ advisoryText, targetLanguage, customPrompt }) {
  const response = await fetch('/api/ai/advisory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      advisoryText,
      targetLanguage,
      customPrompt,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server API error ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getHealthStatus() {
  try {
    const response = await fetch('/api/ai/health');
    if (!response.ok) {
      return { status: 'error', provider: 'huggingface', model: 'openai/gpt-oss-120b' };
    }
    return await response.json();
  } catch (err) {
    return { status: 'offline', provider: 'huggingface', model: 'openai/gpt-oss-120b', error: err.message };
  }
}
