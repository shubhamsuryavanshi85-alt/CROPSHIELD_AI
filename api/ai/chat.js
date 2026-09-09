import OpenAI from 'openai';

async function getRawBody(req) {
  if (req.body) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  const aiProviderSetting = (process.env.AI_PROVIDER || 'deepseek').toLowerCase();
  const aiMode = process.env.AI_MODE || 'live';

  // Determine active provider configuration
  let apiKey = '';
  let baseURL = '';
  let modelName = '';
  let providerName = 'deepseek';
  let defaultHeaders = {};

  const hasDeepSeekKey = Boolean(
    process.env.DEEPSEEK_API_KEY &&
      process.env.DEEPSEEK_API_KEY !== 'YOUR_DEEPSEEK_API_KEY_HERE'
  );
  const hasHfToken = Boolean(
    process.env.HF_TOKEN &&
      process.env.HF_TOKEN !== 'PASTE_YOUR_HUGGING_FACE_TOKEN_HERE'
  );

  if (aiProviderSetting === 'deepseek' && hasDeepSeekKey) {
    providerName = 'deepseek';
    apiKey = process.env.DEEPSEEK_API_KEY;
    baseURL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1';
    modelName = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
  } else if (hasHfToken) {
    providerName = 'huggingface';
    apiKey = process.env.HF_TOKEN;
    baseURL = process.env.HF_BASE_URL || 'https://router.huggingface.co/v1';
    modelName = process.env.HF_MODEL || 'openai/gpt-oss-120b';
    if (process.env.HF_PROVIDER && process.env.HF_PROVIDER !== 'auto') {
      defaultHeaders['x-hf-provider'] = process.env.HF_PROVIDER;
    }
  } else if (hasDeepSeekKey) {
    providerName = 'deepseek';
    apiKey = process.env.DEEPSEEK_API_KEY;
    baseURL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1';
    modelName = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
  }

  if (aiMode === 'offline' || !apiKey) {
    console.log('[CROPSHIELD][AI] Offline mode or no active provider token. Triggering offline fallback.');
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        error: 'No online AI provider key configured or AI_MODE is set to offline.',
        isOffline: true,
      })
    );
  }

  try {
    const body = await getRawBody(req);
    const { messages = [], system = '', temperature = 0.3, max_tokens = 800, stream = false } = body;

    console.log(`[CROPSHIELD][AI] Provider: ${providerName} | Model: ${modelName} | Stream: ${stream}`);

    const openai = new OpenAI({
      baseURL,
      apiKey,
      defaultHeaders,
    });

    const formattedMessages = [];
    if (system) {
      formattedMessages.push({ role: 'system', content: system });
    }
    if (Array.isArray(messages)) {
      formattedMessages.push(...messages);
    }

    if (stream) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const streamResponse = await openai.chat.completions.create({
        model: modelName,
        messages: formattedMessages,
        temperature,
        max_tokens,
        stream: true,
      });

      for await (const chunk of streamResponse) {
        const content = chunk.choices?.[0]?.delta?.content || '';
        if (content) {
          res.write(`data: ${JSON.stringify({ text: content, provider: providerName, model: modelName })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      return res.end();
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const completion = await openai.chat.completions.create(
      {
        model: modelName,
        messages: formattedMessages,
        temperature,
        max_tokens,
      },
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    const responseContent = completion.choices?.[0]?.message?.content || '';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        text: responseContent,
        model: modelName,
        provider: providerName,
        isOffline: false,
      })
    );
  } catch (err) {
    console.error('[CROPSHIELD][AI] Chat error:', err.message || err);

    let status = 500;
    let userMsg = 'AI reasoning service unavailable.';

    if (err.name === 'AbortError') {
      status = 504;
      userMsg = 'AI request timed out.';
    } else if (err.status === 401) {
      status = 401;
      userMsg = 'Invalid API key credentials.';
    } else if (err.status === 429) {
      status = 429;
      userMsg = 'AI API rate limit exceeded.';
    }

    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        error: userMsg,
        isOffline: true,
      })
    );
  }
}
