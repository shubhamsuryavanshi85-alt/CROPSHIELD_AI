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

  const hfToken = process.env.HF_TOKEN;
  const hfModel = process.env.HF_MODEL || 'openai/gpt-oss-120b';
  const hfBaseUrl = process.env.HF_BASE_URL || 'https://router.huggingface.co/v1';
  const hfProvider = process.env.HF_PROVIDER || 'auto';

  if (!hfToken || hfToken === 'PASTE_YOUR_HUGGING_FACE_TOKEN_HERE') {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'No Hugging Face token provided', isOffline: true }));
  }

  try {
    const body = await getRawBody(req);
    const { advisoryText, targetLanguage = 'Hindi', customPrompt = '' } = body;

    const systemPrompt = `You are an expert agricultural extension specialist fluent in ${targetLanguage}.
Your job is to adapt the following CropShield integrated pest management (IPM) advisory into clear, natural, farmer-friendly ${targetLanguage}.

SAFETY & ACCURACY RULES:
1. Preserve all exact chemical trade names, pre-harvest interval (PHI) days, and authorized dosage numbers.
2. DO NOT invent or alter pesticide active ingredient amounts or safety cautions.
3. Use simple conversational ${targetLanguage} suitable for an Indian grower with basic literacy.
4. Keep technical chemical terms recognizable in Latin script or vernacular phonetics.
5. If custom field details (e.g. pump size, acreage) are provided, include practical application math without changing approved concentration per liter.`;

    const userPrompt = `Crop Advisory Content:\n${advisoryText}\n\nAdditional Field Notes:\n${customPrompt}`;

    const defaultHeaders = {};
    if (hfProvider && hfProvider !== 'auto') {
      defaultHeaders['x-hf-provider'] = hfProvider;
    }

    const openai = new OpenAI({
      baseURL: hfBaseUrl,
      apiKey: hfToken,
      defaultHeaders,
    });

    const completion = await openai.chat.completions.create({
      model: hfModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 1000,
    });

    const translatedText = completion.choices?.[0]?.message?.content || '';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ text: translatedText, isOffline: false }));
  } catch (err) {
    console.error('[CROPSHIELD][AI] Advisory error:', err.message || err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Advisory generation failed', isOffline: true }));
  }
}
