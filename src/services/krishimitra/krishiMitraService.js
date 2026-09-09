// KrishiMitra Core Service Facade
// Coordinates Intent Routing, Hugging Face GPT-OSS-120B Online Provider, and Offline Fallback Engine.

import { getOfflineResponse } from './offlineProvider';
import { getOnlineResponse } from './onlineProvider';

export async function askKrishiMitra({ query, language = 'en', farmContext = null }) {
  if (!query || !query.trim()) {
    return getOfflineResponse({ query: '', language, farmContext });
  }

  // Attempt online model query when browser is online
  if (navigator.onLine) {
    try {
      const onlineResult = await getOnlineResponse({ query, language, farmContext });
      
      if (onlineResult && !onlineResult.isOffline && onlineResult.text) {
        return {
          id: 'msg_' + Date.now(),
          sender: 'assistant',
          text: onlineResult.text,
          isOffline: false,
          primaryAction: onlineResult.suggestedRoute
            ? {
                label:
                  onlineResult.actionLabel ||
                  (language === 'hi' ? 'कार्रवाई करें' : language === 'mr' ? 'कृती करा' : 'Take Action'),
                route: onlineResult.suggestedRoute,
              }
            : null,
        };
      }
    } catch (err) {
      console.warn('KrishiMitra online query failed, seamlessly falling back to local agricultural engine:', err);
    }
  }

  // Offline / Fallback Path
  const offlineResult = getOfflineResponse({ query, language, farmContext });
  return {
    id: 'msg_' + Date.now(),
    sender: 'assistant',
    text: offlineResult.text,
    isOffline: true,
    disclaimer: offlineResult.disclaimer,
    primaryAction: offlineResult.primaryAction,
    secondaryAction: offlineResult.secondaryAction,
  };
}
