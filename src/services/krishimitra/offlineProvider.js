// KrishiMitra Offline Intelligence Provider
// Generates grounded offline responses with navigation triggers.

import { INTENTS, detectIntent } from './intentRouter';
import { AGRICULTURAL_KNOWLEDGE } from './knowledgeBase';

export function getOfflineResponse({ query, language = 'en', farmContext = null }) {
  const langKey = ['hi', 'mr'].includes(language) ? language : 'en';
  const kb = AGRICULTURAL_KNOWLEDGE[langKey] || AGRICULTURAL_KNOWLEDGE.en;

  const intentResult = detectIntent(query, farmContext);
  const { intent } = intentResult;

  let replyText = '';
  let primaryAction = null;
  let secondaryAction = null;

  switch (intent) {
    case INTENTS.NAVIGATE_DIAGNOSE:
    case INTENTS.CROP_PROBLEM:
      replyText = kb.responses.yellow_leaves.text;
      primaryAction = { label: kb.responses.yellow_leaves.action.label, route: 'diagnose' };
      secondaryAction = { label: langKey === 'hi' ? '🌦️ मौसम जोखिम' : langKey === 'mr' ? '🌦️ हवामान धोका' : '🌦️ Weather Risk', route: 'forecast' };
      break;

    case INTENTS.PEST_QUESTION:
      replyText = kb.responses.pests.text;
      primaryAction = { label: kb.responses.pests.action.label, route: 'advisory' };
      secondaryAction = { label: langKey === 'hi' ? '📷 फोटो से जांचें' : langKey === 'mr' ? '📷 फोटोने तपासा' : '📷 Check Photo', route: 'diagnose' };
      break;

    case INTENTS.NAVIGATE_FORECAST:
    case INTENTS.WEATHER_QUESTION:
    case INTENTS.RISK_QUESTION:
      replyText = kb.responses.weather_risk.text;
      primaryAction = { label: kb.responses.weather_risk.action.label, route: 'forecast' };
      secondaryAction = { label: langKey === 'hi' ? '📋 छिड़काव सलाह' : langKey === 'mr' ? '📋 फवारणी सल्ला' : '📋 Spray Advisory', route: 'advisory' };
      break;

    case INTENTS.NAVIGATE_MAP:
    case INTENTS.EXPERT_HELP:
      replyText = kb.responses.expert_help.text;
      primaryAction = { label: kb.responses.expert_help.action.label, route: 'map' };
      secondaryAction = { label: langKey === 'hi' ? '📷 रोग जांचें' : langKey === 'mr' ? '📷 रोग तपासा' : '📷 Diagnose Disease', route: 'diagnose' };
      break;

    case INTENTS.NAVIGATE_ADVISORY:
    case INTENTS.ADVISORY_QUESTION:
      replyText = langKey === 'hi' 
        ? "सुरक्षित छिड़काव के लिए CIBRC स्वीकृत दवाओं का सही मात्रा में उपयोग करें। हमेशा कटाई पूर्व प्रतीक्षा समय (PHI) और व्यक्तिगत सुरक्षा कीट (PPE) पहनें।"
        : langKey === 'mr'
        ? "सुरक्षित फवारणीसाठी CIBRC मान्यताप्राप्त औषधांचा योग्य प्रमाणात वापर करा. फवारणी करताना संरक्षक मुखवटा वापरा."
        : "Follow CIBRC-registered pesticide dosages and observe Pre-Harvest Interval (PHI) days before harvesting.";
      primaryAction = { label: langKey === 'hi' ? '📋 पूर्ण सलाह देखें' : langKey === 'mr' ? '📋 संपूर्ण सल्ला पहा' : '📋 View Advisory', route: 'advisory' };
      secondaryAction = { label: langKey === 'hi' ? '🌦️ जोखिम पूर्वानुमान' : langKey === 'mr' ? '🌦️ धोका अंदाज' : '🌦️ Risk Forecast', route: 'forecast' };
      break;

    case INTENTS.DIAGNOSIS_EXPLANATION:
      if (farmContext?.latestDiagnosis) {
        const d = farmContext.latestDiagnosis;
        replyText = langKey === 'hi'
          ? `आपकी हालिया जांच में ${d.cropType || 'फसल'} में ${d.diagnosis || 'लक्षण'} (विश्वास score ${d.confidence || 80}%) पाया गया था। यह AI आंकलन प्राथमिक है।`
          : langKey === 'mr'
          ? `तुमच्या अलीकडील निदानात ${d.cropType || 'पिकात'} ${d.diagnosis || 'लक्षणे'} (विश्वास गुण ${d.confidence || 80}%) आढळले होते. हे AI निदान प्राथमिक आहे.`
          : `Your recent AI scan detected symptoms consistent with ${d.diagnosis || 'pathogen'} on ${d.cropType || 'crop'} (${d.confidence || 80}% confidence). This is a preliminary AI suggestion.`;
      } else {
        replyText = kb.responses.general.text;
      }
      primaryAction = { label: langKey === 'hi' ? '📷 नई फोटो जांचें' : langKey === 'mr' ? '📷 नवीन फोटो तपासा' : '📷 New Scan', route: 'diagnose' };
      break;

    default:
      replyText = kb.responses.general.text;
      primaryAction = { label: kb.responses.general.action.label, route: 'diagnose' };
      secondaryAction = { label: langKey === 'hi' ? '🌦️ जोखिम पूर्वानुमान' : langKey === 'mr' ? '🌦️ धोका अंदाज' : '🌦️ View Risk', route: 'forecast' };
      break;
  }

  return {
    text: replyText,
    intent,
    isOffline: true,
    disclaimer: kb.disclaimer,
    primaryAction,
    secondaryAction,
  };
}
