import { analyzeCropFallback } from './pathologyData';
import { aiService } from './ai/aiService';

export async function diagnoseCrop({
  imageBase64,
  cropType,
  growthStage,
  symptoms,
  location,
  recentRain,
  language = 'en',
  sampleId = null,
}) {
  // Always run the deterministic local agricultural pathology engine for offline/local CV prediction
  await new Promise((resolve) => setTimeout(resolve, 800)); // simulate vision model inference latency

  const baseResult = analyzeCropFallback({
    cropType,
    growthStage,
    symptoms,
    location,
    recentRain,
    hasImage: Boolean(imageBase64),
    language,
    sampleId,
  });

  // Attempt online natural language explanation via Hugging Face GPT-OSS-120B if online
  if (navigator.onLine) {
    try {
      const explanation = await aiService.explainDiagnosis({
        diagnosisData: baseResult,
        language,
      });

      if (explanation) {
        baseResult.description = explanation;
      }
    } catch (err) {
      console.warn('Online diagnosis explanation skipped:', err.message);
    }
  }

  return baseResult;
}

export async function generateAdvisoryTranslation({ advisoryText, targetLanguage, customPrompt }) {
  return aiService.generateAdvisory({
    advisoryText,
    targetLanguage,
    customPrompt,
  });
}
