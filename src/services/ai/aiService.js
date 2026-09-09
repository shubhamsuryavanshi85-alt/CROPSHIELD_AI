// Unified Multi-Provider AI Service Facade for CropShield AI
// Routes requests to server API (/api/ai/chat) which automatically selects DeepSeek or Hugging Face
// based on environment configuration, or triggers offline fallbacks seamlessly.

import { postChat, postAdvisory, getHealthStatus } from './huggingFaceProvider';
import {
  getOfflineChatResponse,
  getOfflineAdvisoryTranslation,
  getOfflineDiagnosisExplanation,
} from './mockProvider';
import { buildKrishiMitraPrompt } from './prompts/krishiMitraPrompt';
import { buildDiagnosisExplanationPrompt } from './prompts/diagnosisExplanationPrompt';

class AIServiceFacade {
  constructor() {
    this.activeProvider = 'auto';
  }

  /**
   * Main KrishiMitra online chat & voice reasoning method.
   */
  async chat({ query, messages = [], language = 'en', farmContext = null }) {
    const systemPrompt = buildKrishiMitraPrompt({ language, farmContext });

    const formattedMessages = [...messages];
    if (query) {
      formattedMessages.push({ role: 'user', content: query });
    }

    try {
      const response = await postChat({
        messages: formattedMessages,
        system: systemPrompt,
        temperature: 0.3,
        maxTokens: 800,
      });

      const rawText = response.text || '';
      const cleanJsonStr = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

      try {
        const parsed = JSON.parse(cleanJsonStr);
        return {
          text: parsed.text || rawText,
          intent: parsed.intent || 'general',
          suggestedRoute: parsed.suggestedRoute || null,
          actionLabel: parsed.actionLabel || null,
          requiresExpertReview: Boolean(parsed.requiresExpertReview),
          isOffline: false,
          provider: response.provider || 'online-ai',
          model: response.model || 'auto',
        };
      } catch {
        return {
          text: rawText,
          intent: 'general',
          suggestedRoute: null,
          actionLabel: null,
          isOffline: false,
          provider: response.provider || 'online-ai',
          model: response.model || 'auto',
        };
      }
    } catch (err) {
      console.warn('[CROPSHIELD][AI] Online AI request failed, activating offline fallback:', err.message);
      return getOfflineChatResponse({ query, language, farmContext });
    }
  }

  /**
   * Vernacular advisory bulletin generation.
   */
  async generateAdvisory({ advisoryText, targetLanguage = 'Hindi', customPrompt = '' }) {
    try {
      const response = await postAdvisory({
        advisoryText,
        targetLanguage,
        customPrompt,
      });
      return response.text || getOfflineAdvisoryTranslation({ advisoryText, targetLanguage });
    } catch (err) {
      console.warn('[CROPSHIELD][AI] Advisory generation offline fallback:', err.message);
      return getOfflineAdvisoryTranslation({ advisoryText, targetLanguage });
    }
  }

  /**
   * Explain local CV disease diagnosis prediction.
   */
  async explainDiagnosis({ diagnosisData, language = 'en' }) {
    const prompt = buildDiagnosisExplanationPrompt({ diagnosisData, language });
    try {
      const response = await postChat({
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        maxTokens: 400,
      });
      return response.text || getOfflineDiagnosisExplanation({ diagnosisData, language });
    } catch (err) {
      return getOfflineDiagnosisExplanation({ diagnosisData, language });
    }
  }

  /**
   * Health check diagnostic for multi-provider setup.
   */
  async checkHealth() {
    return getHealthStatus();
  }
}

export const aiService = new AIServiceFacade();
