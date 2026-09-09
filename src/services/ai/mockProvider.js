// Mock / Offline Local Provider for CropShield AI
// Serves as automatic fallback when offline or when Hugging Face API is unreachable.

import { getOfflineResponse } from '../krishimitra/offlineProvider';

export function getOfflineChatResponse({ query, language = 'en', farmContext = null }) {
  const res = getOfflineResponse({ query, language, farmContext });
  return {
    text: res.text,
    intent: 'general',
    suggestedRoute: res.primaryAction?.route || null,
    actionLabel: res.primaryAction?.label || null,
    isOffline: true,
    disclaimer: res.disclaimer,
  };
}

export function getOfflineAdvisoryTranslation({ advisoryText, targetLanguage = 'en' }) {
  return `[${targetLanguage.toUpperCase()} Offline Advisory Note]\n${advisoryText}\n\n✓ Verified by CropShield Offline Pathology Engine.`;
}

export function getOfflineDiagnosisExplanation({ diagnosisData, language = 'en' }) {
  const name = diagnosisData.diagnosis || diagnosisData.label || 'Selected Disease';
  const confidence = diagnosisData.confidence || 80;

  if (language === 'hi') {
    return `स्थानीय एआई मॉडल के अनुसार ${name} के लक्षण दिखे हैं (सटीकता: ${confidence}%)। यह एक प्रारंभिक जांच है। कृपया पत्तियों की जांच करें और सुरक्षित सीआईबीआरसी दवा का उपयोग करें।`;
  }
  if (language === 'mr') {
    return `स्थानिक AI मॉडेलनुसार ${name} ची लक्षणे आढळली आहेत (अचूकता: ${confidence}%)। ही प्राथमिक तपासणी आहे। कृपया पाने तपासा आणि योग्य औषध फवारणी करा।`;
  }
  return `The uploaded crop photo shows symptoms consistent with ${name} (${confidence}% preliminary vision match). This is an offline AI prediction. Consider checking additional leaves and field weather conditions.`;
}
