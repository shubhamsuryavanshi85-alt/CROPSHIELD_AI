// KrishiMitra Verified Agricultural Knowledge Base
// Contains grounded farming intelligence in English, Hindi, and Marathi.

export const AGRICULTURAL_KNOWLEDGE = {
  en: {
    welcome: "Namaste! 🙏 I'm KrishiMitra, your CropShield AI farming assistant. How can I help you protect your crop today?",
    disclaimer: "⚠️ AI guidance is advisory. For critical field decisions, confirm with a local KVK extension specialist.",
    quick_actions: {
      crop_problem: "🌱 Crop Problem",
      pest_help: "🐛 Pest Help",
      weather_risk: "🌦️ Weather Risk",
      check_crop: "📷 Check My Crop",
      farming_advice: "💡 Farming Advice",
      explain_risk: "📊 Explain My Risk",
    },
    responses: {
      yellow_leaves: {
        text: "Yellowing leaves can indicate nutrient deficiency (Nitrogen/Iron), waterlogging, or early fungal infection (e.g., Early Blight or Rust). Check if yellowing is on lower leaves (nutrient/water) or accompanied by brown spots (fungal). For precision diagnosis, scan a clear leaf photo.",
        action: { label: "📷 Check My Crop", route: "diagnose" }
      },
      pests: {
        text: "For sucking pests like thrips, whiteflies, or aphids, install yellow/blue sticky traps (15–20 traps/acre). If infestation is severe, spray Neem oil 10,000 PPM (3ml/L) or CIBRC-registered formulation. Always observe Pre-Harvest Interval (PHI).",
        action: { label: "📋 View Full Advisory", route: "advisory" }
      },
      weather_risk: {
        text: "High relative humidity (>85%) combined with warm temperature accelerates spore germination for fungal blights. High wind can also spread thrips across neighboring plots. Keep an eye on 7-day risk forecasts.",
        action: { label: "🌦️ View Crop Risk", route: "forecast" }
      },
      expert_help: {
        text: "If symptoms are spreading rapidly (>20% plot area) or AI confidence is low, escalate to a Krishi Vigyan Kendra (KVK) officer for field sampling and lab analysis.",
        action: { label: "🏛️ View Outbreak Map", route: "map" }
      },
      general: {
        text: "I can assist you with disease diagnosis, pest control, weather-based risk warnings, and safe chemical/organic spray advisories. How can I guide your field today?",
        action: { label: "📷 Check My Crop", route: "diagnose" }
      }
    }
  },
  hi: {
    welcome: "नमस्ते! 🙏 मैं कृषि मित्र हूँ, आपका फसल सुरक्षा AI सहायक। आज मैं आपकी फसल सुरक्षा में कैसे मदद कर सकता हूँ?",
    disclaimer: "⚠️ AI सलाह प्राथमिक मार्गदर्शन है। गंभीर मामलों में KVK कृषि विशेषज्ञ से पुष्टि करें।",
    quick_actions: {
      crop_problem: "🌱 फसल की समस्या",
      pest_help: "🐛 कीट नियंत्रण",
      weather_risk: "🌦️ मौसम का खतरा",
      check_crop: "📷 फसल जांचें",
      farming_advice: "💡 कृषि सलाह",
      explain_risk: "📊 जोखिम समझें",
    },
    responses: {
      yellow_leaves: {
        text: "पत्तियों में पीलापन पोषक तत्वों (नाइट्रोजन/लोहा) की कमी, अधिक पानी या शुरुआती फफूंद संक्रमण (झुलसा रोग) के कारण हो सकता है। यह देखें कि पीलापन निचली पत्तियों पर है या भूरे धब्बे भी हैं। सटीक पहचान के लिए प्रभावित पत्ती की फोटो अपलोड करें।",
        action: { label: "📷 फसल जांचें", route: "diagnose" }
      },
      pests: {
        text: "चूसक कीटों (थ्रिप्स, सफेद मक्खी) के लिए 15-20 पीले/नीले चिपचिपे ट्रैप प्रति एकड़ लगाएं। अधिक प्रकोप होने पर नीम तेल 10,000 PPM (3ml/लीटर) या अनुशंसित कीटनाशक का छिड़काव करें। तुड़ाई पूर्व प्रतीक्षा अवधि (PHI) का ध्यान रखें।",
        action: { label: "📋 पूर्ण सलाह देखें", route: "advisory" }
      },
      weather_risk: {
        text: "अत्यधिक नमी (>85%) और उच्च तापमान से फफूंद बीजाणुओं का फैलाव तेजी से होता है। 7-दिवसीय मौसम जोखिम पूर्वानुमान देखकर अग्रिम सुरक्षात्मक छिड़काव करें।",
        action: { label: "🌦️ जोखिम पूर्वानुमान देखें", route: "forecast" }
      },
      expert_help: {
        text: "यदि बीमारी तेजी से फैल रही है या फसल में 20% से अधिक नुकसान है, तो तुरंत कृषि अधिकारी या KVK विशेषज्ञ से संपर्क करें।",
        action: { label: "🏛️ प्रकोप नक्शा देखें", route: "map" }
      },
      general: {
        text: "मैं आपको रोग पहचान, कीट नियंत्रण, मौसम आधारित जोखिम चेतावनी और सुरक्षित छिड़काव सलाह में सहायता कर सकता हूँ। आज आप क्या जानना चाहते हैं?",
        action: { label: "📷 फसल जांचें", route: "diagnose" }
      }
    }
  },
  mr: {
    welcome: "नमस्कार! 🙏 मी कृषी मित्र आहे, तुमचा पीक संरक्षण AI सहाय्यक. आज मी तुमच्या पिकाचे रक्षण करण्यात कशी मदत करू शकतो?",
    disclaimer: "⚠️ AI सल्ला प्राथमिक मार्गदर्शक आहे. गंभीर परिस्थितीत KVK कृषी तज्ञांशी संपर्क साधा.",
    quick_actions: {
      crop_problem: "🌱 पिकाची समस्या",
      pest_help: "🐛 कीटक नियंत्रण",
      weather_risk: "🌦️ हवामान धोका",
      check_crop: "📷 पीक तपासा",
      farming_advice: "💡 शेती सल्ला",
      explain_risk: "📊 धोका समजून घ्या",
    },
    responses: {
      yellow_leaves: {
        text: "पाना पिवळी पडणे हे अन्नद्रव्यांची कमतरता (नायट्रोजन/लोह), जास्त पाणी साचणे किंवा बुरशीजन्य रोगामुळे (तांबेरा/करपा) असू शकते अचूक निदानासाठी बाधित पानाचा फोटो अपलोड करा.",
        action: { label: "📷 पीक तपासा", route: "diagnose" }
      },
      pests: {
        text: "रसशोषक कीटकांसाठी (थ्रिप्स, पांढरी माशी) प्रति एकरी १५-२० पिवळे/निळे चिकट सापळे लावा. जास्त प्रादुर्भाव असल्यास निंबोळी तेल १०००० PPM (३ मिली/लीटर) किंवा शिफारशीत कीटकनाशकाची फवारणी करा.",
        action: { label: "📋 संपूर्ण सल्ला पहा", route: "advisory" }
      },
      weather_risk: {
        text: "जास्त आर्द्रता (>८५%) आणि सततचे ढगाळ हवामान यामुळे बुरशीजन्य रोगांचा प्रसार वेगाने होतो. ७ दिवसांचा हवामान धोका अंदाज तपासून फवारणीचे नियोजन करा.",
        action: { label: "🌦️ धोका अंदाज पहा", route: "forecast" }
      },
      expert_help: {
        text: "रोग वेगाने पसरत असल्यास किंवा पिकाचे जास्त नुकसान होत असल्यास जवळच्या कृषी विज्ञान केंद्रातील (KVK) तज्ञांशी त्वरित संपर्क साधा.",
        action: { label: "🏛️ उद्रेक नकाशा पहा", route: "map" }
      },
      general: {
        text: "मी तुम्हाला पीक निदान, कीड नियंत्रण, हवामान धोका इशारे आणि सुरक्षित फवारणी सल्ल्यामध्ये मदत करू शकतो. तुम्हाला काय माहिती हवी आहे?",
        action: { label: "📷 पीक तपासा", route: "diagnose" }
      }
    }
  }
};
