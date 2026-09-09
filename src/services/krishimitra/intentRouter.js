// KrishiMitra Intent Router
// Classifies user input into actionable agricultural intents across EN, HI, MR, and Hinglish.

export const INTENTS = {
  NAVIGATE_DIAGNOSE: 'navigate_diagnose',
  NAVIGATE_FORECAST: 'navigate_forecast',
  NAVIGATE_ADVISORY: 'navigate_advisory',
  NAVIGATE_MAP: 'navigate_map',
  NAVIGATE_SUPPORT: 'navigate_support',
  NAVIGATE_DASHBOARD: 'navigate_dashboard',
  CROP_PROBLEM: 'crop_problem',
  PEST_QUESTION: 'pest_question',
  DISEASE_QUESTION: 'disease_question',
  WEATHER_QUESTION: 'weather_question',
  RISK_QUESTION: 'risk_question',
  ADVISORY_QUESTION: 'advisory_question',
  DIAGNOSIS_EXPLANATION: 'diagnosis_explanation',
  IRRIGATION: 'irrigation',
  NUTRIENT_QUESTION: 'nutrient_question',
  EXPERT_HELP: 'expert_help',
  GENERAL_FARMING: 'general_farming',
};

export function detectIntent(query = '', context = {}) {
  const q = query.toLowerCase().trim();

  // Navigation / Direct action triggers
  if (
    q.includes('scheme') ||
    q.includes('insurance') ||
    q.includes('bima') ||
    q.includes('pmfby') ||
    q.includes('compensation') ||
    q.includes('damage assistance') ||
    q.includes('सरकारी मदद') ||
    q.includes('बीमा') ||
    q.includes('योजना') ||
    q.includes('नुकसान') ||
    q.includes('rbc 6-4') ||
    q.includes('support')
  ) {
    return { intent: INTENTS.NAVIGATE_SUPPORT, confidence: 0.95, route: 'support' };
  }
  if (
    q.includes('photo') ||
    q.includes('upload') ||
    q.includes('check my crop') ||
    q.includes('diagnose') ||
    q.includes('फोटो') ||
    q.includes('तपासा') ||
    q.includes('तस्वीर') ||
    q.includes('जांच') ||
    q.includes('scan') ||
    q.includes('image')
  ) {
    return { intent: INTENTS.NAVIGATE_DIAGNOSE, confidence: 0.95, route: 'diagnose' };
  }

  if (
    q.includes('forecast') ||
    q.includes('weather risk') ||
    q.includes('rain risk') ||
    q.includes('मौसम का खतरा') ||
    q.includes('हवामान धोका') ||
    q.includes('बारिश का खतरा') ||
    q.includes('पाऊस')
  ) {
    return { intent: INTENTS.NAVIGATE_FORECAST, confidence: 0.9, route: 'forecast' };
  }

  if (
    q.includes('advisory') ||
    q.includes('dosage') ||
    q.includes('spray plan') ||
    q.includes('दवा की खुराक') ||
    q.includes('औषध मात्रा') ||
    q.includes('सलाह') ||
    q.includes('सल्ला')
  ) {
    return { intent: INTENTS.NAVIGATE_ADVISORY, confidence: 0.88, route: 'advisory' };
  }

  if (
    q.includes('map') ||
    q.includes('outbreak near me') ||
    q.includes('cases near') ||
    q.includes('गांव के पास') ||
    q.includes('गावाजवळ') ||
    q.includes('हॉटस्पॉट') ||
    q.includes('नक्शा') ||
    q.includes('नकाशा')
  ) {
    return { intent: INTENTS.NAVIGATE_MAP, confidence: 0.88, route: 'map' };
  }

  if (
    q.includes('dashboard') ||
    q.includes('analytics') ||
    q.includes('scheme') ||
    q.includes('yojana') ||
    q.includes('सरकारी') ||
    q.includes('डैशबोर्ड')
  ) {
    return { intent: INTENTS.NAVIGATE_DASHBOARD, confidence: 0.88, route: 'dashboard' };
  }

  // Symptom / Disease keywords
  if (
    q.includes('yellow') ||
    q.includes('पीली') ||
    q.includes('पिवळी') ||
    q.includes('spot') ||
    q.includes('दाग') ||
    q.includes('डाग') ||
    q.includes('blight') ||
    q.includes('rot') ||
    q.includes('wilt') ||
    q.includes('सड़न') ||
    q.includes('कुजणे') ||
    q.includes('rust') ||
    q.includes('mildew')
  ) {
    return { intent: INTENTS.CROP_PROBLEM, confidence: 0.92 };
  }

  // Pest keywords
  if (
    q.includes('pest') ||
    q.includes('keede') ||
    q.includes('कीड़े') ||
    q.includes('कीटक') ||
    q.includes('thrip') ||
    q.includes('worm') ||
    q.includes('caterpillar') ||
    q.includes('fly') ||
    q.includes('sucking') ||
    q.includes('इल्ली') ||
    q.includes('मावा') ||
    q.includes('तुडतुडे')
  ) {
    return { intent: INTENTS.PEST_QUESTION, confidence: 0.91 };
  }

  // Nutrient / Fertilizer keywords
  if (
    q.includes('fertilizer') ||
    q.includes('khad') ||
    q.includes('खाद') ||
    q.includes('खत') ||
    q.includes('nitrogen') ||
    q.includes('urea') ||
    q.includes('npk') ||
    q.includes('micronutrient') ||
    q.includes('पोषक तत्व')
  ) {
    return { intent: INTENTS.NUTRIENT_QUESTION, confidence: 0.85 };
  }

  // Irrigation keywords
  if (
    q.includes('water') ||
    q.includes('irrigation') ||
    q.includes('पानी') ||
    q.includes('पाणी') ||
    q.includes('drip') ||
    q.includes('moisture') ||
    q.includes('सिंचाई') ||
    q.includes('सिंचन')
  ) {
    return { intent: INTENTS.IRRIGATION, confidence: 0.85 };
  }

  // Weather general
  if (
    q.includes('weather') ||
    q.includes('rain') ||
    q.includes('humidity') ||
    q.includes('temperature') ||
    q.includes('मौसम') ||
    q.includes('हवामान') ||
    q.includes('बारिश')
  ) {
    return { intent: INTENTS.WEATHER_QUESTION, confidence: 0.85 };
  }

  // Expert escalation
  if (
    q.includes('expert') ||
    q.includes('officer') ||
    q.includes('kvk') ||
    q.includes('doctor') ||
    q.includes('विशेषज्ञ') ||
    q.includes('अधिकारी') ||
    q.includes('प्रयोगशाळा') ||
    q.includes('lab')
  ) {
    return { intent: INTENTS.EXPERT_HELP, confidence: 0.88 };
  }

  // Diagnosis explanation
  if (
    q.includes('diagnosis') ||
    q.includes('what does my result mean') ||
    q.includes('परिणाम का मतलब') ||
    q.includes('निकाल अर्थ')
  ) {
    return { intent: INTENTS.DIAGNOSIS_EXPLANATION, confidence: 0.86 };
  }

  // Default to general farming
  return { intent: INTENTS.GENERAL_FARMING, confidence: 0.7 };
}
