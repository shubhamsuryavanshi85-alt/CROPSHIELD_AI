// Comprehensive agricultural pathology dataset and sample field specimens for CropShield AI

export const CROPS = [
  { id: 'tomato', name: 'Tomato', icon: '🍅', season: 'Kharif / Rabi' },
  { id: 'onion', name: 'Onion', icon: '🧅', season: 'Kharif / Late Kharif / Rabi' },
  { id: 'chili', name: 'Chili', icon: '🌶️', season: 'Kharif / Summer' },
  { id: 'grape', name: 'Grape', icon: '🍇', season: 'Rabi' },
  { id: 'cotton', name: 'Cotton', icon: '☁️', season: 'Kharif' },
  { id: 'potato', name: 'Potato', icon: '🥔', season: 'Rabi' },
  { id: 'maize', name: 'Maize', icon: '🌽', season: 'Kharif / Rabi' },
  { id: 'rice', name: 'Rice / Paddy', icon: '🌾', season: 'Kharif' },
];

export const GROWTH_STAGES = [
  { id: 'seedling', name: 'Seedling / Nursery' },
  { id: 'vegetative', name: 'Vegetative Growth' },
  { id: 'flowering', name: 'Flowering / Bloom' },
  { id: 'fruiting', name: 'Fruit / Bulb / Boll Formation' },
  { id: 'maturity', name: 'Maturity / Pre-Harvest' },
];

// Helper to extract localized string
const t = (obj, lang) => obj[lang] || obj['en'];

const LOCALIZED_DISEASES = {
  late_blight: {
    diagnosis: { en: 'Late Blight', hi: 'पछेती झुलसा रोग', mr: 'करपा रोग', te: 'లేట్ బ్లైట్', ta: 'இலை கருகல் நோய்' },
    description: {
      en: 'Severe oomycete fungal pathogen causing water-soaked necrotic lesions. Highly destructive under humid conditions.',
      hi: 'गंभीर फफूंद रोग जिसके कारण पत्तियों पर पानी से भीगे हुए गहरे धब्बे दिखाई देते हैं। नमी वाले मौसम में अत्यधिक विनाशकारी।',
      mr: 'पानांवर पाण्यासारखे ओलसर गडद डाग दिसतात. दमट हवामानात अत्यंत विनाशकारी.',
      te: 'ఆకులపై నీటితో తడిసినట్లు కనిపించే ముదురు మచ్చలు కనిపిస్తాయి. తేమతో కూడిన వాతావరణంలో అత్యంత ప్రమాదకరం.',
      ta: 'இலைகளில் நீர் படிந்தது போன்ற கருமையான புள்ளிகள் காணப்படும். ஈரப்பதமான காலநிலையில் மிகவும் அழிவுகரமானது.'
    },
    immediate_actions: {
      en: [
        'Prune and destroy infected lower leaves',
        'Cease overhead sprinkler irrigation immediately',
        'Apply targeted protective fungicide within 24 hours'
      ],
      hi: [
        'संक्रमित निचली पत्तियों को काटें और नष्ट करें',
        'ऊपर से सिंचाई (स्प्रिंकलर) तुरंत बंद करें',
        '24 घंटे के भीतर कवकनाशी (फंगीसाइड) का छिड़काव करें'
      ],
      mr: [
        'रोगग्रस्त खालची पाने काढून नष्ट करा',
        'स्प्रिंकलर सिंचन त्वरित थांबवा',
        '२४ तासांच्या आत बुरशीनाशकाची फवारणी करा'
      ],
      te: [
        'వ్యాధి సోకిన కింది ఆకులను కత్తిరించి నాశనం చేయండి',
        'ఓవర్‌హెడ్ స్ప్రింక్లర్ నీటిపారుదల వెంటనే ఆపండి',
        '24 గంటలలోపు శిలీంద్ర సంహారిణిని పిచికారీ చేయండి'
      ],
      ta: [
        'பாதிக்கப்பட்ட கீழ் இலைகளை வெட்டி அழிக்கவும்',
        'தெளிப்பான் நீர்ப்பாசனத்தை உடனடியாக நிறுத்தவும்',
        '24 மணி நேரத்திற்குள் பூஞ்சான்கொல்லியை தெளிக்கவும்'
      ]
    },
    symptoms_detected: {
      en: ['Water-soaked lesions', 'White fungal fuzz'],
      hi: ['पानी से भीगे हुए धब्बे', 'सफेद फफूंद'],
      mr: ['पाण्यासारखे ओलसर डाग', 'पांढरी बुरशी'],
      te: ['నీటితో తడిసిన మచ్చలు', 'తెల్లటి శిలీంద్రం'],
      ta: ['நீர் படிந்த புள்ளிகள்', 'வெள்ளை பூஞ்சை']
    },
    alt_diagnoses: {
      en: [{ name: 'Early Blight', probability: 8 }, { name: 'Septoria Leaf Spot', probability: 3 }],
      hi: [{ name: 'अगेती झुलसा', probability: 8 }, { name: 'सेप्टोरिया लीफ स्पॉट', probability: 3 }],
      mr: [{ name: 'लवकर येणारा करपा', probability: 8 }, { name: 'सेप्टोरिया लीफ स्पॉट', probability: 3 }],
      te: [{ name: 'ఎర్లీ బ్లైట్', probability: 8 }, { name: 'సెప్టోరియా లీఫ్ స్పాట్', probability: 3 }],
      ta: [{ name: 'முன் கருகல் நோய்', probability: 8 }, { name: 'செப்டோரியா இலைப்புள்ளி', probability: 3 }]
    }
  },
  purple_blotch: {
    diagnosis: { en: 'Purple Blotch', hi: 'पर्पल ब्लॉच (बैंगनी धब्बा)', mr: 'जांभळा करपा', te: 'పర్పుల్ బ్లోచ్', ta: 'ஊதா புள்ளி நோய்' },
    description: {
      en: 'Concentric purple-to-brown necrotic lesions observed on onion leaf tissue. Leads to premature collapse.',
      hi: 'प्याज की पत्तियों पर बैंगनी-भूरे रंग के धब्बे। इससे पत्तियां समय से पहले गिर जाती हैं।',
      mr: 'कांद्याच्या पानांवर जांभळ्या-तपकिरी रंगाचे डाग. यामुळे पाने अकाली कोलमडतात.',
      te: 'ఉల్లి ఆకులపై ఊదా-గోధుమ రంగు మచ్చలు. దీని వల్ల ఆకులు ముందుగానే రాలిపోతాయి.',
      ta: 'வெங்காய இலைகளில் ஊதா-பழுப்பு நிற புள்ளிகள். இது இலைகள் முன்கூட்டியே வீழ்ச்சியடைய வழிவகுக்கிறது.'
    },
    immediate_actions: {
      en: [
        'Rake and discard blighted leaves',
        'Avoid excessive nitrogen fertilization',
        'Apply foliar protective fungicide'
      ],
      hi: [
        'खराब पत्तियों को हटाकर नष्ट करें',
        'अत्यधिक नाइट्रोजन उर्वरक के उपयोग से बचें',
        'कवकनाशी का छिड़काव करें'
      ],
      mr: [
        'खराब झालेली पाने गोळा करून नष्ट करा',
        'जास्त नायट्रोजन खताचा वापर टाळा',
        'बुरशीनाशकाची फवारणी करा'
      ],
      te: [
        'పాడైన ఆకులను తీసివేసి నాశనం చేయండి',
        'అధిక నత్రజని ఎరువుల వాడకాన్ని నివారించండి',
        'శిలీంద్ర సంహారిణిని పిచికారీ చేయండి'
      ],
      ta: [
        'பாதிக்கப்பட்ட இலைகளை அகற்றி அழிக்கவும்',
        'அதிக நைட்ரஜன் உரம் பயன்படுத்துவதை தவிர்க்கவும்',
        'பூஞ்சான்கொல்லியை தெளிக்கவும்'
      ]
    },
    symptoms_detected: {
      en: ['Sunken lesions', 'Purple concentric rings', 'Yellow halos'],
      hi: ['धंसे हुए धब्बे', 'बैंगनी छल्ले', 'पीले घेरे'],
      mr: ['खोलगट डाग', 'जांभळे वर्तुळे', 'पिवळी वलये'],
      te: ['లోతైన మచ్చలు', 'ఊదా రంగు వలయాలు', 'పసుపు వలయాలు'],
      ta: ['ஆழ்ந்த புள்ளிகள்', 'ஊதா நிற வளையங்கள்', 'மஞ்சள் வளையங்கள்']
    },
    alt_diagnoses: {
      en: [{ name: 'Stemphylium Leaf Blight', probability: 12 }, { name: 'Botrytis Leaf Blight', probability: 4 }],
      hi: [{ name: 'स्टेम्फिलियम लीफ ब्लाइट', probability: 12 }, { name: 'बोट्राइटिस लीफ ब्लाइट', probability: 4 }],
      mr: [{ name: 'स्टेम्फिलियम लीफ ब्लाइट', probability: 12 }, { name: 'बोट्राइटिस लीफ ब्लाइट', probability: 4 }],
      te: [{ name: 'స్టెంఫిలియం లీఫ్ బ్లైట్', probability: 12 }, { name: 'బోట్రిటిస్ లీఫ్ బ్లైట్', probability: 4 }],
      ta: [{ name: 'ஸ்டெம்பிலியம் இலை கருகல்', probability: 12 }, { name: 'போட்ரிடிஸ் இலை கருகல்', probability: 4 }]
    }
  },
  downy_mildew: {
    diagnosis: { en: 'Downy Mildew', hi: 'डाउनी मिल्ड्यू (मृदुरोमिल फफूंदी)', mr: 'केवडा', te: 'డౌనీ మిల్డ్యూ', ta: 'அடிச்சாம்பல் நோய்' },
    description: {
      en: 'Extremely aggressive obligate oomycete. Wet canopy can cause total berry cluster abortion.',
      hi: 'अत्यंत आक्रामक फफूंद रोग। गीली पत्तियों के कारण फलों के गुच्छे पूरी तरह नष्ट हो सकते हैं।',
      mr: 'अत्यंत आक्रमक बुरशीजन्य रोग. ओल्या पानांमुळे फळांचे घोस पूर्णपणे नष्ट होऊ शकतात.',
      te: 'అత్యంత ప్రమాదకరమైన శిలీంద్ర వ్యాధి. తడి ఆకుల వల్ల పండ్ల గుత్తులు పూర్తిగా నశించిపోతాయి.',
      ta: 'மிகவும் ஆக்கிரோஷமான பூஞ்சை நோய். ஈரமான இலைகளால் பழக் கொத்துகள் முழுமையாக அழிந்துவிடும்.'
    },
    immediate_actions: {
      en: [
        'Deshoot excess vigorous canopies to enhance solar penetration',
        'Apply systemic translaminar fungicide prior to forecasted rains'
      ],
      hi: [
        'धूप और हवा के लिए अतिरिक्त पत्तियों/शाखाओं की छंटाई करें',
        'बारिश से पहले सिस्टमिक कवकनाशी का छिड़काव करें'
      ],
      mr: [
        'सूर्यप्रकाश मिळण्यासाठी अतिरिक्त फांद्या छाटा',
        'पावसापूर्वी सिस्टेमिक बुरशीनाशकाची फवारणी करा'
      ],
      te: [
        'సూర్యరశ్మి కోసం అదనపు ఆకులను/కొమ్మలను కత్తిరించండి',
        'వర్షానికి ముందు సిస్టమిక్ ఫంగిసైడ్ పిచికారీ చేయండి'
      ],
      ta: [
        'சூரிய ஒளிக்காக கூடுதல் இலைகளை/கிளைகளை வெட்டவும்',
        'மழைக்கு முன் பூஞ்சான்கொல்லியை தெளிக்கவும்'
      ]
    },
    symptoms_detected: {
      en: ['Yellowish oily spots', 'White downy felt'],
      hi: ['पीले तैलीय धब्बे', 'सफेद रोएंदार फफूंद'],
      mr: ['पिवळसर तेलकट डाग', 'पांढरी बुरशी'],
      te: ['పసుపు నూనె మచ్చలు', 'తెల్లటి శిలీంద్రం'],
      ta: ['மஞ்சள் எண்ணெய் புள்ளிகள்', 'வெள்ளை பூஞ்சை']
    },
    alt_diagnoses: {
      en: [{ name: 'Powdery Mildew', probability: 5 }],
      hi: [{ name: 'पाउडरी मिल्ड्यू', probability: 5 }],
      mr: [{ name: 'भुरी', probability: 5 }],
      te: [{ name: 'పౌడరీ మిల్డ్యూ', probability: 5 }],
      ta: [{ name: 'சாம்பல் நோய்', probability: 5 }]
    }
  },
  chili_thrips: {
    diagnosis: { en: 'Chili Thrips Infestation', hi: 'थ्रिप्स (चुरडा-मुरडा) का प्रकोप', mr: 'थ्रिप्स (चुरडा-मुरडा)', te: 'తామర పురుగుల దాడి', ta: 'இலைப்பேன் தாக்குதல்' },
    description: {
      en: 'Microscopic rasping-sucking insect pest vectoring viral pathogens. Causes leaf curling and stunted growth.',
      hi: 'रस चूसने वाले सूक्ष्म कीट जो पत्ती सिकुड़ने और विकास रुकने का कारण बनते हैं।',
      mr: 'रस शोषणारी सूक्ष्म कीड ज्यामुळे पाने आकसतात आणि वाढ खुंटते.',
      te: 'రసం పీల్చే సూక్ష్మ కీటకాలు. దీని వల్ల ఆకులు ముడుచుకుపోయి పెరుగుదల ఆగిపోతుంది.',
      ta: 'சாறு உறிஞ்சும் நுண்ணிய பூச்சிகள். இதனால் இலைகள் சுருங்கி வளர்ச்சி தடைபடும்.'
    },
    immediate_actions: {
      en: [
        'Install 25 blue sticky traps per acre',
        'Spray water under high pressure to dislodge nymphs',
        'Apply targeted narrow-spectrum insecticide'
      ],
      hi: [
        'प्रति एकड़ 25 नीले चिपचिपे जाल (ट्रैप) लगाएं',
        'कीटों को हटाने के लिए तेज दबाव से पानी का छिड़काव करें',
        'उचित कीटनाशक का प्रयोग करें'
      ],
      mr: [
        'एका एकरात २५ निळे चिकट सापळे लावा',
        'किडींना काढण्यासाठी दाबाने पाण्याची फवारणी करा',
        'योग्य कीटकनाशकाचा वापर करा'
      ],
      te: [
        'ఎకరానికి 25 నీలిరంగు జిగురు వలలను ఏర్పాటు చేయండి',
        'కీటకాలను తొలగించడానికి అధిక పీడనంతో నీటిని పిచికారీ చేయండి',
        'సరైన కీటక సంహారిణిని వాడండి'
      ],
      ta: [
        'ஏக்கருக்கு 25 நீல ஒட்டும் பொறிகளை அமைக்கவும்',
        'பூச்சிகளை அகற்ற அதிக அழுத்தத்துடன் தண்ணீரை தெளிக்கவும்',
        'பொருத்தமான பூச்சிக்கொல்லியை பயன்படுத்தவும்'
      ]
    },
    symptoms_detected: {
      en: ['Upward leaf curling', 'Bronzing on undersides'],
      hi: ['पत्तियों का ऊपर की ओर मुड़ना', 'निचले हिस्से का कांस्य रंग'],
      mr: ['पाने वरच्या बाजूला वळणे', 'खालच्या बाजूचा कांस्य रंग'],
      te: ['ఆకులు పైకి ముడుచుకోవడం', 'కింది భాగం కాంస్య రంగు'],
      ta: ['இலைகள் மேல்நோக்கி சுருங்குதல்', 'கீழ்ப்பகுதி வெண்கல நிறம்']
    },
    alt_diagnoses: {
      en: [{ name: 'Spider Mites', probability: 10 }, { name: 'Leaf Curl Virus', probability: 3 }],
      hi: [{ name: 'स्पाइडर माइट्स (मकड़ी)', probability: 10 }, { name: 'लीफ कर्ल वायरस', probability: 3 }],
      mr: [{ name: 'लाल कोळी', probability: 10 }, { name: 'लीफ कर्ल व्हायरस', probability: 3 }],
      te: [{ name: 'ఎర్ర నల్లి', probability: 10 }, { name: 'ఆకు ముడత వైరస్', probability: 3 }],
      ta: [{ name: 'சிலந்தி பேன்', probability: 10 }, { name: 'இலை சுருட்டு வைரஸ்', probability: 3 }]
    }
  },
  pink_bollworm: {
    diagnosis: { en: 'Pink Bollworm', hi: 'गुलाबी सुंडी (पिंक बॉलवर्म)', mr: 'शेंदरी बोंडअळी', te: 'గులాబీ రంగు కాయ తొలిచే పురుగు', ta: 'இளஞ்சிவப்பு காய்ப்புழு' },
    description: {
      en: 'Internal feeder larva devouring developing cotton seeds and destroying fiber quality.',
      hi: 'कपास के बीज और फाइबर की गुणवत्ता को नष्ट करने वाली सुंडी।',
      mr: 'कापसाच्या बिया आणि धाग्याची गुणवत्ता नष्ट करणारी अळी.',
      te: 'పత్తి గింజలు మరియు ఫైబర్ నాణ్యताను నాశనం చేసే పురుగు.',
      ta: 'பருத்தி விதைகள் மற்றும் நார் தரத்தை அழிக்கும் புழு.'
    },
    immediate_actions: {
      en: [
        'Install 8–10 Gossyplure pheromone traps per acre',
        'Collect and mechanically destroy rosetted flowers'
      ],
      hi: [
        'प्रति एकड़ 8-10 फेरोमोन ट्रैप लगाएं',
        'संक्रमित फूलों को इकट्ठा करके नष्ट करें'
      ],
      mr: [
        'प्रति एकर ८-१० कामगंध सापळे लावा',
        'रोगग्रस्त फुले गोळा करून नष्ट करा'
      ],
      te: [
        'ఎకరానికి 8-10 ఫెరోమోన్ ట్రాప్‌లను ఏర్పాటు చేయండి',
        'సోకిన పూలను సేకరించి నాశనం చేయండి'
      ],
      ta: [
        'ஏக்கருக்கு 8-10 பெரோமோன் பொறிகளை அமைக்கவும்',
        'பாதிக்கப்பட்ட பூக்களை சேகரித்து அழிக்கவும்'
      ]
    },
    symptoms_detected: {
      en: ['Rosetted flowers', 'Entry pinholes'],
      hi: ['बंद/खराब फूल', 'छेद वाले टिंडे'],
      mr: ['बंद/खराब फुले', 'छिद्र असलेली बोंडे'],
      te: ['మూసుకుపోయిన పూలు', 'రంధ్రాలు ఉన్న కాయలు'],
      ta: ['மூடிய பூக்கள்', 'துளைகள் உள்ள காய்கள்']
    },
    alt_diagnoses: {
      en: [{ name: 'American Bollworm', probability: 7 }],
      hi: [{ name: 'अमेरिकन सुंडी', probability: 7 }],
      mr: [{ name: 'अमेरिकन बोंडअळी', probability: 7 }],
      te: [{ name: 'అమెరికన్ కాయ తొలిచే పురుగు', probability: 7 }],
      ta: [{ name: 'அமெரிக்க காய்ப்புழு', probability: 7 }]
    }
  },
  healthy: {
    diagnosis: { en: 'Healthy Crop (No Pathogen)', hi: 'स्वस्थ फसल (कोई रोग नहीं)', mr: 'निरोगी पीक (कोणताही रोग नाही)', te: 'ఆరోగ్యకరమైన పంట (వ్యాధి లేదు)', ta: 'ஆரோக்கியமான பயிர் (நோய் இல்லை)' },
    description: {
      en: 'No active fungal, bacterial, or pest pathogen detected. Leaf tissue exhibits optimal health.',
      hi: 'कोई सक्रिय फफूंद, जीवाणु या कीट रोग नहीं पाया गया। पौधे स्वस्थ हैं।',
      mr: 'कोणताही सक्रिय बुरशीजन्य, जिवाणूजन्य किंवा कीटक रोग आढळला नाही. झाडे निरोगी आहेत.',
      te: 'ఎటువంటి క్రియాశీల శిలీంద్ర, బ్యాక్టీరియా లేదా కీటక వ్యాధి కనుగొనబడలేదు. మొక్కలు ఆరోగ్యంగా ఉన్నాయి.',
      ta: 'எந்தவொரு செயலில் உள்ள பூஞ்சை, பாக்டீரியா அல்லது பூச்சி நோயும் கண்டறியப்படவில்லை. செடிகள் ஆரோக்கியமாக உள்ளன.'
    },
    immediate_actions: {
      en: ['Maintain balanced nutrition', 'Monitor regularly'],
      hi: ['संतुलित पोषण बनाए रखें', 'नियमित निगरानी करें'],
      mr: ['संतुलित पोषण राखा', 'नियमित निरीक्षण करा'],
      te: ['సమతుల్య పోషణను నిర్వహించండి', 'క్రమం తప్పకుండా పర్యవేక్షించండి'],
      ta: ['சீரான ஊட்டச்சத்தை பராமரிக்கவும்', 'தவறாமல் கண்காணிக்கவும்']
    },
    symptoms_detected: { en: [], hi: [], mr: [], te: [], ta: [] },
    alt_diagnoses: { en: [], hi: [], mr: [], te: [], ta: [] }
  },
  general_spot: {
    diagnosis: { en: 'Leaf Spot & Fungal Mildew Complex', hi: 'लीफ स्पॉट और फंगल कॉम्प्लेक्स', mr: 'लीफ स्पॉट आणि फंगल कॉम्प्लेक्स', te: 'ఆకు మచ్చ మరియు ఫంగల్ కాంప్లెక్స్', ta: 'இலைப்புள்ளி மற்றும் பூஞ்சை நோய்' },
    description: {
      en: 'Foliar chlorotic spotting and margin necrotic lesions detected.',
      hi: 'पत्तियों पर पीले धब्बे और किनारों पर परिगलन (सूखना) देखा गया है।',
      mr: 'पानांवर पिवळे डाग आणि कडा सुकल्याचे आढळले आहे.',
      te: 'ఆకులపై పసుపు మచ్చలు మరియు అంచులు ఎండిపోవడం కనిపించాయి.',
      ta: 'இலைகளில் மஞ்சள் புள்ளிகள் மற்றும் ஓரங்கள் காய்ந்து காணப்படுகின்றன.'
    },
    immediate_actions: {
      en: ['Prune heavily infected lower leaves', 'Ensure proper soil drainage'],
      hi: ['संक्रमित निचली पत्तियों की छंटाई करें', 'मिट्टी में जल निकासी सुनिश्चित करें'],
      mr: ['रोगग्रस्त खालची पाने छाटा', 'जमिनीत पाण्याचा निचरा होईल याची खात्री करा'],
      te: ['వ్యాధి సోకిన కింది ఆకులను కత్తిరించండి', 'నేలలో నీరు నిల్వకుండా చూసుకోండి'],
      ta: ['பாதிக்கப்பட்ட கீழ் இலைகளை வெட்டவும்', 'மண்ணில் நீர் தேங்காமல் பார்த்துக் கொள்ளவும்']
    },
    symptoms_detected: {
      en: ['Chlorotic spotting', 'Margin necrotic lesions'],
      hi: ['पीले धब्बे', 'किनारों का सूखना'],
      mr: ['पिवळे डाग', 'कडा सुकणे'],
      te: ['పసుపు మచ్చలు', 'అంచులు ఎండిపోవడం'],
      ta: ['மஞ்சள் புள்ளிகள்', 'ஓரங்கள் காய்வது']
    },
    alt_diagnoses: {
      en: [{ name: 'Bacterial Spot', probability: 15 }, { name: 'Nutrient Deficiency', probability: 6 }],
      hi: [{ name: 'बैक्टीरियल स्पॉट', probability: 15 }, { name: 'पोषक तत्वों की कमी', probability: 6 }],
      mr: [{ name: 'बॅक्टेरियल स्पॉट', probability: 15 }, { name: 'अन्नद्रव्यांची कमतरता', probability: 6 }],
      te: [{ name: 'బ్యాక్టీరియల్ స్పాట్', probability: 15 }, { name: 'పోషకాల లోపం', probability: 6 }],
      ta: [{ name: 'பாக்டீரியா புள்ளி', probability: 15 }, { name: 'ஊட்டச்சத்து குறைபாடு', probability: 6 }]
    }
  }
};

const COMMON_CHEMICALS = {
  mancozeb: { name: 'Mancozeb 75% WP', dosage: '2.5 g / L water', phi_days: 7, registered_crops: ['Tomato', 'Potato', 'Chili', 'All Vegetables'] },
  ridomil: { name: 'Metalaxyl 8% + Mancozeb 64% WP', dosage: '2.0 g / L water', phi_days: 10, registered_crops: ['Tomato', 'Grapes'] },
  score: { name: 'Difenoconazole 25% EC', dosage: '1.0 ml / L water', phi_days: 14, registered_crops: ['Onion', 'Garlic'] },
  fipronil: { name: 'Fipronil 5% SC', dosage: '2.0 ml / L water', phi_days: 7, registered_crops: ['Chili', 'Cotton', 'Rice'] },
  coragen: { name: 'Chlorantraniliprole 18.5% SC', dosage: '0.3 ml / L water', phi_days: 15, registered_crops: ['Cotton', 'Rice'] }
};

const COMMON_ORGANICS = {
  coc: 'Copper oxychloride (COC) 50% WP @ 3.0 g/L',
  trichoderma: 'Trichoderma viride bio-fungicide @ 5 g/L',
  neem: 'Neem Azadirachtin 1% (10,000 ppm) @ 2.5 ml/L',
  pseudomonas: 'Pseudomonas fluorescens 1% WP @ 5 g/L',
  bt: 'Bacillus thuringiensis (Bt) kurstaki @ 2 g/L'
};

// Function to generate localized sample object
const buildSample = (id, baseSample, diseaseKey, lang = 'en') => {
  const d = LOCALIZED_DISEASES[diseaseKey];
  return {
    ...baseSample.diagnosis,
    diagnosis: t(d.diagnosis, lang),
    description: t(d.description, lang),
    immediate_actions: t(d.immediate_actions, lang),
    symptoms_detected: t(d.symptoms_detected, lang),
    alternative_diagnoses: t(d.alt_diagnoses, lang),
    advisory_language_key: lang
  };
};

export const SAMPLE_SPECIMENS = [
  {
    id: 'sample_late_blight_tomato',
    crop: 'Tomato',
    cropId: 'tomato',
    growthStage: 'fruiting',
    title: 'Tomato Late Blight (Phytophthora)',
    thumbnail: '/tomato-late-blight.jpg',
    symptoms: 'Large brown/black water-soaked lesions on lower leaves, white fungal fuzz on leaf undersides, fruit showing dark greasy rot.',
    diseaseKey: 'late_blight',
    diagnosis: {
      scientific_name: 'Phytophthora infestans',
      confidence: 89,
      severity: 'high',
      spread_risk: 'high',
      chemical_options: [COMMON_CHEMICALS.mancozeb, COMMON_CHEMICALS.ridomil],
      organic_options: [COMMON_ORGANICS.coc, COMMON_ORGANICS.trichoderma],
      refer_to_lab: true,
      refer_reason: 'High epidemic potential.',
      follow_up_days: 3
    }
  },
  {
    id: 'sample_purple_blotch_onion',
    crop: 'Onion',
    cropId: 'onion',
    growthStage: 'fruiting',
    title: 'Onion Purple Blotch (Alternaria porri)',
    thumbnail: '/onion-purple-blotch.jpg',
    symptoms: 'Small water-soaked sunken lesions on leaves with distinctive purple-to-brown concentric rings and yellow halos.',
    diseaseKey: 'purple_blotch',
    diagnosis: {
      scientific_name: 'Alternaria porri',
      confidence: 84,
      severity: 'moderate',
      spread_risk: 'moderate',
      chemical_options: [COMMON_CHEMICALS.score],
      organic_options: [COMMON_ORGANICS.pseudomonas],
      refer_to_lab: false,
      refer_reason: 'Standard fungal infection manageable with field IPM protocols.',
      follow_up_days: 5
    }
  },
  {
    id: 'sample_downy_mildew_grape',
    crop: 'Grape',
    cropId: 'grape',
    growthStage: 'flowering',
    title: 'Grape Downy Mildew (Plasmopara)',
    thumbnail: '/grape-downy-mildew.jpg',
    symptoms: 'Yellowish oily spots on upper leaf surface (oilspots), dense white downy felt on leaf undersides.',
    diseaseKey: 'downy_mildew',
    diagnosis: {
      scientific_name: 'Plasmopara viticola',
      confidence: 92,
      severity: 'critical',
      spread_risk: 'high',
      chemical_options: [COMMON_CHEMICALS.ridomil],
      organic_options: [COMMON_ORGANICS.coc],
      refer_to_lab: true,
      refer_reason: 'Critical reproductive stage outbreak.',
      follow_up_days: 2
    }
  },
  {
    id: 'sample_chili_thrips',
    crop: 'Chili',
    cropId: 'chili',
    growthStage: 'vegetative',
    title: 'Chili Leaf Curl / Thrips Infestation',
    thumbnail: '/chilli-thrips-mites.jpg',
    symptoms: 'Upward curling of leaf margins (boat shaped), bronzing underneath leaves, stunted growing tips.',
    diseaseKey: 'chili_thrips',
    diagnosis: {
      scientific_name: 'Scirtothrips dorsalis',
      confidence: 87,
      severity: 'high',
      spread_risk: 'high',
      chemical_options: [COMMON_CHEMICALS.fipronil],
      organic_options: [COMMON_ORGANICS.neem],
      refer_to_lab: false,
      refer_reason: 'Standard sucking pest complex.',
      follow_up_days: 4
    }
  },
  {
    id: 'sample_cotton_pink_bollworm',
    crop: 'Cotton',
    cropId: 'cotton',
    growthStage: 'fruiting',
    title: 'Cotton Pink Bollworm & Leaf Spot',
    thumbnail: '/cotton-bollworm.jpg',
    symptoms: 'Rosetted flowers that fail to open, entry pinholes on green bolls sealed with excreta.',
    diseaseKey: 'pink_bollworm',
    diagnosis: {
      scientific_name: 'Pectinophora gossypiella',
      confidence: 91,
      severity: 'critical',
      spread_risk: 'moderate',
      chemical_options: [COMMON_CHEMICALS.coragen],
      organic_options: [COMMON_ORGANICS.bt, COMMON_ORGANICS.neem],
      refer_to_lab: true,
      refer_reason: 'Report to district Joint Director of Agriculture.',
      follow_up_days: 3
    }
  },
  {
    id: 'sample_healthy_maize',
    crop: 'Maize',
    cropId: 'maize',
    growthStage: 'vegetative',
    title: 'Healthy Maize Plant — Baseline',
    thumbnail: '/maize-healthy.jpg',
    symptoms: 'Vibrant green upright foliage, strong central whorl, no visible chlorosis or lesions.',
    diseaseKey: 'healthy',
    diagnosis: {
      scientific_name: 'Zea mays (Normal)',
      confidence: 96,
      severity: 'low',
      spread_risk: 'low',
      chemical_options: [],
      organic_options: [COMMON_ORGANICS.trichoderma],
      refer_to_lab: false,
      refer_reason: 'Crop is in excellent physiological health.',
      follow_up_days: 7
    }
  }
];

// Fallback dynamic pathology diagnosis engine
export function analyzeCropFallback({ cropType, growthStage, symptoms, location, recentRain, hasImage, language = 'en', sampleId }) {
  // If sampleId is provided, construct the localized sample response directly
  if (sampleId) {
    const baseSample = SAMPLE_SPECIMENS.find(s => s.id === sampleId);
    if (baseSample) {
      return buildSample(sampleId, baseSample, baseSample.diseaseKey, language);
    }
  }

  const crop = cropType ? cropType.toLowerCase() : 'tomato';
  const symptomText = (symptoms || '').toLowerCase();
  
  let key = 'general_spot';
  let baseData = {
    scientific_name: 'Cercospora / Alternaria spp.',
    confidence: 79,
    severity: 'moderate',
    spread_risk: 'moderate',
    chemical_options: [COMMON_CHEMICALS.mancozeb],
    organic_options: [COMMON_ORGANICS.trichoderma],
    refer_to_lab: false,
    refer_reason: 'Standard foliar pathogen manageable with standard precautions.',
    follow_up_days: 5
  };

  if (symptomText.includes('rot') || symptomText.includes('water') || symptomText.includes('blight') || crop.includes('tomato') || crop.includes('potato')) {
    key = 'late_blight';
    baseData = {
      scientific_name: 'Phytophthora infestans',
      confidence: hasImage ? 86 : 74,
      severity: recentRain === 'yes' || recentRain === true ? 'high' : 'moderate',
      spread_risk: 'high',
      chemical_options: [COMMON_CHEMICALS.mancozeb, COMMON_CHEMICALS.ridomil],
      organic_options: [COMMON_ORGANICS.coc, COMMON_ORGANICS.trichoderma],
      refer_to_lab: true,
      refer_reason: 'High potential for rapid district-level spore dispersal during humid spells.',
      follow_up_days: 3
    };
  } else if (symptomText.includes('thrip') || symptomText.includes('curl') || symptomText.includes('pest') || crop.includes('chili') || crop.includes('cotton')) {
    key = 'chili_thrips';
    baseData = {
      scientific_name: crop.includes('cotton') ? 'Pectinophora gossypiella' : 'Scirtothrips dorsalis',
      confidence: 82,
      severity: 'high',
      spread_risk: 'high',
      chemical_options: [COMMON_CHEMICALS.fipronil],
      organic_options: [COMMON_ORGANICS.neem],
      refer_to_lab: false,
      refer_reason: 'Standard economic threshold pest infestation.',
      follow_up_days: 4
    };
  } else if (symptomText.includes('purple') || symptomText.includes('spot') || crop.includes('onion')) {
    key = 'purple_blotch';
    baseData = {
      scientific_name: 'Alternaria porri',
      confidence: 84,
      severity: 'moderate',
      spread_risk: 'moderate',
      chemical_options: [COMMON_CHEMICALS.score],
      organic_options: [COMMON_ORGANICS.pseudomonas],
      refer_to_lab: false,
      refer_reason: 'Manageable with regular IPM spray schedule.',
      follow_up_days: 5
    };
  }

  const d = LOCALIZED_DISEASES[key];
  
  return {
    ...baseData,
    diagnosis: t(d.diagnosis, language),
    description: t(d.description, language),
    immediate_actions: t(d.immediate_actions, language),
    symptoms_detected: t(d.symptoms_detected, language),
    alternative_diagnoses: t(d.alt_diagnoses, language),
    advisory_language_key: language
  };
}
