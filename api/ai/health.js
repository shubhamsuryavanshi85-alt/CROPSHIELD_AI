import OpenAI from 'openai';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  const aiProviderSetting = (process.env.AI_PROVIDER || 'deepseek').toLowerCase();
  const aiMode = process.env.AI_MODE || 'live';

  const hasDeepSeekKey = Boolean(
    process.env.DEEPSEEK_API_KEY &&
      process.env.DEEPSEEK_API_KEY !== 'YOUR_DEEPSEEK_API_KEY_HERE'
  );
  const hasHfToken = Boolean(
    process.env.HF_TOKEN &&
      process.env.HF_TOKEN !== 'PASTE_YOUR_HUGGING_FACE_TOKEN_HERE'
  );

  let activeProvider = 'huggingface';
  let activeModel = process.env.HF_MODEL || 'openai/gpt-oss-120b';
  let activeBaseUrl = process.env.HF_BASE_URL || 'https://router.huggingface.co/v1';
  let apiKey = process.env.HF_TOKEN;

  if (aiProviderSetting === 'deepseek' || (hasDeepSeekKey && !hasHfToken)) {
    activeProvider = 'deepseek';
    activeModel = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
    activeBaseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1';
    apiKey = process.env.DEEPSEEK_API_KEY;
  }

  const hasActiveKey = Boolean(apiKey && apiKey !== 'YOUR_DEEPSEEK_API_KEY_HERE' && apiKey !== 'PASTE_YOUR_HUGGING_FACE_TOKEN_HERE');

  if (!hasActiveKey) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        provider: activeProvider,
        model: activeModel,
        status: 'offline_fallback',
        message: 'No online API key configured in .env. Offline pathology engine active.',
        hasToken: false,
        aiMode,
      })
    );
  }

  try {
    const openai = new OpenAI({
      baseURL: activeBaseUrl,
      apiKey,
    });

    const testCompletion = await openai.chat.completions.create({
      model: activeModel,
      messages: [{ role: 'user', content: 'Ping' }],
      max_tokens: 5,
    });

    const isConnected = Boolean(testCompletion.choices?.[0]?.message);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        provider: activeProvider,
        model: activeModel,
        baseUrl: activeBaseUrl,
        status: isConnected ? 'connected' : 'degraded',
        hasToken: true,
        aiMode,
      })
    );
  } catch (err) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        provider: activeProvider,
        model: activeModel,
        status: 'degraded',
        error: err.message || 'Failed to reach AI provider router',
        hasToken: true,
        aiMode,
      })
    );
  }
}
