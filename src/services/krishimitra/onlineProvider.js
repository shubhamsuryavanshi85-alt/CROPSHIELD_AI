// KrishiMitra Online Intelligence Provider
// Connects to Hugging Face (openai/gpt-oss-120b) via server API through aiService.

import { aiService } from '../ai/aiService';

export async function getOnlineResponse({ query, language = 'en', farmContext = null }) {
  const result = await aiService.chat({
    query,
    language,
    farmContext,
  });

  return {
    text: result.text,
    suggestedRoute: result.suggestedRoute,
    actionLabel: result.actionLabel,
    isOffline: result.isOffline,
  };
}
