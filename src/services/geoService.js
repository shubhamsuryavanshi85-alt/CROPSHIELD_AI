// Geographic and extension dispatch services for CropShield AI

export const DISTRICT_PRESETS = [
  { id: 'nashik', name: 'Nashik District', state: 'Maharashtra', lat: 20.0059, lon: 73.7797, primaryCrops: ['Onion', 'Grape', 'Tomato'] },
  { id: 'pune', name: 'Pune District', state: 'Maharashtra', lat: 18.5204, lon: 73.8567, primaryCrops: ['Sugarcane', 'Tomato', 'Vegetables'] },
  { id: 'solapur', name: 'Solapur District', state: 'Maharashtra', lat: 17.6599, lon: 75.9064, primaryCrops: ['Pomegranate', 'Onion', 'Jowar'] },
  { id: 'ahmednagar', name: 'Ahmednagar District', state: 'Maharashtra', lat: 19.0948, lon: 74.7480, primaryCrops: ['Cotton', 'Sugarcane', 'Onion'] },
  { id: 'guntur', name: 'Guntur District', state: 'Andhra Pradesh', lat: 16.3067, lon: 80.4365, primaryCrops: ['Chili', 'Cotton', 'Tobacco'] },
  { id: 'mandya', name: 'Mandya District', state: 'Karnataka', lat: 12.5218, lon: 76.8951, primaryCrops: ['Rice / Paddy', 'Sugarcane'] },
  { id: 'thanjavur', name: 'Thanjavur District', state: 'Tamil Nadu', lat: 10.7870, lon: 79.1378, primaryCrops: ['Paddy', 'Banana', 'Pulses'] },
];

export const INITIAL_FARMS = [
  {
    id: 'f001',
    name: 'Godavari Green Acres',
    farmerName: 'Ramesh Kulkarni',
    phone: '+91 98220 14890',
    lat: 20.0159,
    lon: 73.7897,
    district: 'Nashik',
    crop: 'Tomato',
    variety: 'Abhinav Hybrid',
    stage: 'Fruit Formation',
    sownDate: '2025-07-15',
    harvestDate: '2025-10-20',
    acres: 4.5,
    lastReport: '2025-09-01',
    risk: 'critical',
    activeIssue: 'Late Blight (Phytophthora)',
  },
  {
    id: 'f002',
    name: 'Sahyadri Organic Orchard',
    farmerName: 'Sunita Patil',
    phone: '+91 94231 87654',
    lat: 19.9850,
    lon: 73.7420,
    district: 'Nashik',
    crop: 'Grape',
    variety: 'Thompson Seedless',
    stage: 'Flowering',
    sownDate: '2025-06-01',
    harvestDate: '2025-11-30',
    acres: 8.0,
    lastReport: '2025-09-02',
    risk: 'high',
    activeIssue: 'Downy Mildew (Plasmopara)',
  },
  {
    id: 'f003',
    name: 'Niphad Onion Fields',
    farmerName: 'Bhausaheb Shinde',
    phone: '+91 97654 32109',
    lat: 20.0900,
    lon: 74.1100,
    district: 'Nashik',
    crop: 'Onion',
    variety: 'Agrifound Dark Red',
    stage: 'Bulb Formation',
    sownDate: '2025-08-10',
    harvestDate: '2025-11-15',
    acres: 6.0,
    lastReport: '2025-09-02',
    risk: 'warning',
    activeIssue: 'Purple Blotch (Alternaria)',
  },
  {
    id: 'f004',
    name: 'Haveli Agri Cooperative',
    farmerName: 'Anil Deshmukh',
    phone: '+91 98811 23456',
    lat: 18.5300,
    lon: 73.8700,
    district: 'Pune',
    crop: 'Tomato',
    variety: 'Vaishali',
    stage: 'Vegetative',
    sownDate: '2025-08-01',
    harvestDate: '2025-11-10',
    acres: 3.5,
    lastReport: '2025-09-01',
    risk: 'warning',
    activeIssue: 'Aphid & Whitefly Surge',
  },
  {
    id: 'f005',
    name: 'Baramati Cane Farm',
    farmerName: 'Prakash Jagtap',
    phone: '+91 99224 56789',
    lat: 18.1500,
    lon: 74.5700,
    district: 'Pune',
    crop: 'Sugarcane',
    variety: 'Co 86032',
    stage: 'Grand Growth',
    sownDate: '2025-01-15',
    harvestDate: '2025-12-15',
    acres: 12.0,
    lastReport: '2025-08-28',
    risk: 'monitored',
    activeIssue: 'None (Healthy)',
  },
  {
    id: 'f006',
    name: 'Pandharpur Soil Tech',
    farmerName: 'Santosh More',
    phone: '+91 91580 98765',
    lat: 17.6750,
    lon: 75.3200,
    district: 'Solapur',
    crop: 'Pomegranate',
    variety: 'Bhagwa',
    stage: 'Fruiting',
    sownDate: '2025-05-10',
    harvestDate: '2025-10-30',
    acres: 7.0,
    lastReport: '2025-09-02',
    risk: 'critical',
    activeIssue: 'Bacterial Blight (Telya)',
  },
  {
    id: 'f007',
    name: 'Amaravati Chili Belt',
    farmerName: 'Balaji Rao',
    phone: '+91 94401 22334',
    lat: 16.3200,
    lon: 80.4500,
    district: 'Guntur',
    crop: 'Chili',
    variety: 'Teja G4',
    stage: 'Vegetative',
    sownDate: '2025-07-20',
    harvestDate: '2025-12-05',
    acres: 5.0,
    lastReport: '2025-09-01',
    risk: 'critical',
    activeIssue: 'Black Thrips Infestation',
  },
  {
    id: 'f008',
    name: 'Cauvery Delta Farms',
    farmerName: 'Muruganandham S.',
    phone: '+91 98424 11223',
    lat: 10.7900,
    lon: 79.1450,
    district: 'Thanjavur',
    crop: 'Rice / Paddy',
    variety: 'CR 1009 Sub 1',
    stage: 'Tillering',
    sownDate: '2025-08-05',
    harvestDate: '2025-11-25',
    acres: 10.0,
    lastReport: '2025-08-31',
    risk: 'caution',
    activeIssue: 'Blast Spore Elevated Risk',
  },
];

export const INITIAL_ALERTS = [
  {
    id: 'a001',
    farmId: 'f001',
    district: 'Nashik',
    locationName: 'Panchavati / Dindori Road',
    disease: 'Late Blight (Phytophthora)',
    crop: 'Tomato',
    confidence: 89,
    severity: 'critical', // 'critical' | 'warning' | 'caution' | 'monitored'
    status: 'ai_flagged', // 'ai_flagged' | 'confirmed' | 'dispatched' | 'resolved'
    farmsCount: 14,
    confirmedFarms: 5,
    assignedWorker: null,
    date: '2025-09-01',
    description: 'High humidity sporulation event triggered rapid foliar blighting across 14 adjoining parcels.',
  },
  {
    id: 'a002',
    farmId: 'f002',
    district: 'Nashik',
    locationName: 'Girna Basin Vineyards',
    disease: 'Downy Mildew (Plasmopara)',
    crop: 'Grape',
    confidence: 92,
    severity: 'critical',
    status: 'confirmed',
    farmsCount: 18,
    confirmedFarms: 12,
    assignedWorker: 'Dr. Vivek Sawant (KVK Nashik)',
    date: '2025-08-30',
    description: 'Oilspot lesions spreading through flowering bunches; preventive spray advisory dispatched.',
  },
  {
    id: 'a003',
    farmId: 'f003',
    district: 'Nashik',
    locationName: 'Niphad Mandi Cluster',
    disease: 'Purple Blotch (Alternaria porri)',
    crop: 'Onion',
    confidence: 84,
    severity: 'warning',
    status: 'ai_flagged',
    farmsCount: 9,
    confirmedFarms: 2,
    assignedWorker: null,
    date: '2025-09-02',
    description: 'Sunken purple lesions noted on leaf tips; weather window indicates high moisture.',
  },
  {
    id: 'a004',
    farmId: 'f004',
    district: 'Pune',
    locationName: 'Khed / Manchar Vegetable Hub',
    disease: 'Aphid & Whitefly Surge',
    crop: 'Tomato',
    confidence: 81,
    severity: 'warning',
    status: 'ai_flagged',
    farmsCount: 7,
    confirmedFarms: 3,
    assignedWorker: null,
    date: '2025-09-02',
    description: 'Dry spell ending has resulted in rapid sucking pest multiplication.',
  },
  {
    id: 'a005',
    farmId: 'f006',
    district: 'Solapur',
    locationName: 'Sangola Taluka',
    disease: 'Bacterial Blight (Telya)',
    crop: 'Pomegranate',
    confidence: 94,
    severity: 'critical',
    status: 'confirmed',
    farmsCount: 6,
    confirmedFarms: 6,
    assignedWorker: 'Smt. Kavita More (Agronomist)',
    date: '2025-08-29',
    description: 'Nodal cankers and triangular fruit spots requiring immediate copper bactericide + streptocycline.',
  },
  {
    id: 'a006',
    farmId: 'f007',
    district: 'Guntur',
    locationName: 'Tadikonda Mandal',
    disease: 'Black Thrips Infestation',
    crop: 'Chili',
    confidence: 88,
    severity: 'critical',
    status: 'ai_flagged',
    farmsCount: 22,
    confirmedFarms: 8,
    assignedWorker: null,
    date: '2025-09-01',
    description: 'Heavy blossom drop and leaf curl threatening early harvest flush.',
  },
];

export const EXTENSION_WORKERS = [
  {
    id: 'w001',
    name: 'Dr. Vivek Sawant',
    title: 'Senior Plant Pathologist',
    organization: 'KVK Yashwantrao Chavan Nashik',
    phone: '+91 94222 34101',
    district: 'Nashik',
    specialty: 'Viticulture & Vegetable Pathology',
    status: 'available',
    currentLocation: 'Dindori Sub-station',
    distanceKm: 14.2,
    rating: 4.9,
    activeDispatches: 1,
  },
  {
    id: 'w002',
    name: 'Smt. Anjali Borse',
    title: 'Extension Field Officer',
    organization: 'Department of Agriculture, MH',
    phone: '+91 98230 55421',
    district: 'Nashik',
    specialty: 'Integrated Pest Management (IPM)',
    status: 'available',
    currentLocation: 'Panchavati Agro Center',
    distanceKm: 6.8,
    rating: 4.8,
    activeDispatches: 0,
  },
  {
    id: 'w003',
    name: 'Dr. Rahul Shinde',
    title: 'Horticulture Specialist',
    organization: 'MPKV Rahuri Extension Cell',
    phone: '+91 97663 88902',
    district: 'Nashik',
    specialty: 'Foliar Diseases & Chemical Safety',
    status: 'on_field',
    currentLocation: 'Niphad Mandi',
    distanceKm: 22.5,
    rating: 4.7,
    activeDispatches: 2,
  },
  {
    id: 'w004',
    name: 'Dr. N. Sudhakar Rao',
    title: 'Principal Scientist (Entomology)',
    organization: 'ANGRAU Regional Agril Research Station',
    phone: '+91 94405 67890',
    district: 'Guntur',
    specialty: 'Chili & Cotton Pest Complexes',
    status: 'available',
    currentLocation: 'Lam Farm Guntur',
    distanceKm: 8.5,
    rating: 4.9,
    activeDispatches: 1,
  },
  {
    id: 'w005',
    name: 'Smt. Kavita More',
    title: 'Agronomist & Extension Officer',
    organization: 'Solapur District Agri Office',
    phone: '+91 98901 12344',
    district: 'Solapur',
    specialty: 'Orchard Pathology & Soil Health',
    status: 'available',
    currentLocation: 'Sangola Circle',
    distanceKm: 11.0,
    rating: 4.8,
    activeDispatches: 1,
  },
];

export const STATIC_ADVISORIES = [
  {
    id: 'adv001',
    crop: 'Tomato',
    cropId: 'tomato',
    threat: 'Late Blight (Phytophthora infestans)',
    updatedDate: '28 Aug 2025',
    isValidated: true,
    severityRating: 'High / Epidemic',
    optimalWeather: 'RH > 80%, Temp 18–24°C',
    treatmentType: 'chemical', // 'chemical' | 'organic' | 'preventive'
    languages: {
      en: {
        prevention: [
          'Avoid overhead sprinkler irrigation in late evenings to minimize leaf wetness duration',
          'Practice strict crop rotation with non-solanaceous crops (avoid planting after potato)',
          'Adopt disease-tolerant varieties: Arka Rakshak, Arka Samrat, or Abhinav Hybrid'
        ],
        treatment_early: [
          'Apply Copper oxychloride 50% WP @ 3.0 g/L or Mancozeb 75% WP @ 2.5 g/L at first sign',
          'Repeat spray after 7–10 days if humid foggy conditions persist'
        ],
        treatment_advanced: [
          'Apply translaminar systemic: Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2.5 g/L',
          'Alternative: Dimethomorph 50% WP @ 1.0 g/L + sticker adjuvant',
          'Prune and destroy heavily blighted lower foliage into covered pits'
        ],
        cautions: [
          'Strictly adhere to 7-day Pre-Harvest Interval (PHI) before picking fruit',
          'Do not mix copper fungicides with organophosphates or sulfur'
        ],
        refer_threshold: 'Escalate to KVK / District Lab if >25% canopy displays water-soaked lesions'
      },
      hi: {
        prevention: [
          'पत्तियों को गीला रहने से बचाने के लिए शाम को फव्वारा सिंचाई से बचें',
          'टमाटर की फसल को आलू के बाद न लगाएं, फसल चक्र का पालन करें',
          'रोग प्रतिरोधी किस्में लगाएं: अर्का रक्षक, अर्का सम्राट'
        ],
        treatment_early: [
          'शुरुआती लक्षण दिखते ही कॉपर ऑक्सीक्लोराइड 50% WP @ 3.0 ग्राम/लीटर या मैंकोजेब 75% WP @ 2.5 ग्राम/लीटर का छिड़काव करें',
          'यदि बादल और नमी बनी रहे तो 7-10 दिनों बाद दोबारा छिड़काव करें'
        ],
        treatment_advanced: [
          'मेटालेक्सिल 8% + मैंकोजेब 64% WP (रिडोमिल) @ 2.5 ग्राम/लीटर पानी में घोलकर छिड़कें',
          'गंभीर रूप से सड़ी हुई पत्तियों को तोड़कर गहरे गड्ढे में दबा दें'
        ],
        cautions: [
          'दवा छिड़कने के बाद कम से कम 7 दिनों तक फल की तुड़ाई न करें (PHI अवधि)',
          'कॉपर आधारित दवाओं को सल्फर के साथ न मिलाएं'
        ],
        refer_threshold: 'यदि 25% से अधिक फसल प्रभावित हो तो तुरंत नजदीकी कृषि विज्ञान केंद्र से संपर्क करें'
      },
      mr: {
        prevention: [
          'पानांवर ओलावा टिकून राहू नये म्हणून संध्याकाळी तुषार सिंचन टाळा',
          'बटाट्यानंतर लगेच टोमॅटोची लागवड टाळा, योग्य पीक फेरपालट करा',
          'रोगप्रतिकारक वाणांची निवड करा: अर्का रक्षक, अर्का सम्राट'
        ],
        treatment_early: [
          'प्रथम लक्षणे दिसताच कॉपर ऑक्सीक्लोराईड 50% WP @ 3 ग्रॅम/लिटर किंवा मँकोझेब 75% WP @ 2.5 ग्रॅम/लिटर फवारा',
          'दमट व ढगाळ हवामान असल्यास 7 ते 10 दिवसांनी दुसरी फवारणी करा'
        ],
        treatment_advanced: [
          'मेटालॅक्सिल 8% + मँकोझेब 64% WP @ 2.5 ग्रॅम/लिटर पाण्यात मिसळून फवारा',
          'जास्त प्रादुर्भाव झालेली पाने काढून जमिनीत गाडून नष्ट करा'
        ],
        cautions: [
          'फवारणीनंतर किमान 7 दिवस टोमॅटोची तोडणी करू नका (काढणी पूर्व प्रतीक्षा कालावधी)',
          'तांबायुक्त बुरशीनाशके गंधकासोबत मिसळू नयेत'
        ],
        refer_threshold: '25% पेक्षा जास्त झाडांवर करपा दिसल्यास त्वरित केव्हीके (KVK) कडे नमुना पाठवा'
      },
      te: {
        prevention: [
          'ఆకులపై తేమ ఉండకుండా సాయంత్రం వేళల్లో స్ప్రింక్లర్ నీటిపారుదలని నివారించండి',
          'బంగాళాదుంప తర్వాత వెంటనే టమోటా సాగు చేయకుండా పంట మార్పిడి చేయండి',
          'వ్యాధి నిరోధక రకాలను ఎంచుకోండి: అర్కా రక్షక్, అర్కా సమ్రాట్'
        ],
        treatment_early: [
          'మొదటి లక్షణం కనిపించగానే కాపర్ ఆక్సీక్లోరైడ్ 50% WP @ 3 గ్రా/లీ లేదా మాంకోజెబ్ 75% WP @ 2.5 గ్రా/లీ పిచికారీ చేయండి',
          'తేమ వాతావరణం కొనసాగితే 7-10 రోజుల తర్వాత మళ్లీ పిచికారీ చేయండి'
        ],
        treatment_advanced: [
          'మెటాలాక్సిల్ 8% + మాంకోజెబ్ 64% WP @ 2.5 గ్రా/లీ పిచికారీ చేయండి',
          'తీవ్రంగా ప్రభావితమైన ఆకులను తొలగించి గుంతలో పూడ్చివేయండి'
        ],
        cautions: [
          'మందు పిచికారీ చేసిన తర్వాత 7 రోజుల వరకు కాయలు కోయరాదు (PHI)',
          'కాపర్ మందులను గంధకంతో కలపవద్దు'
        ],
        refer_threshold: 'పంటలో 25% పైగా ఆకులు తెగులుకు గురైతే వెంటనే KVK నిపుణులను సంప్రదించండి'
      },
      ta: {
        prevention: [
          'இலைகளில் ஈரம் தங்காமல் இருக்க மாலையில் தெளிப்பு நீர்ப்பாசனத்தைத் தவிர்க்கவும்',
          'உருளைக்கிழங்குக்குப் பிறகு தக்காளி பயிரிடுவதைத் தவிர்க்கவும்',
          'நோய் எதிர்ப்புத் திறன் கொண்ட ரகங்களை பயிரிடவும்: அர்கா ரக்ஷக்'
        ],
        treatment_early: [
          'காப்பர் ஆக்ஸிகுளோரைடு 50% WP @ 3 கி/லி அல்லது மேன்கோசெப் 75% WP @ 2.5 கி/லி தெளிக்கவும்',
          'ஈரப்பதம் நீடித்தால் 7-10 நாட்களுக்குப் பிறகு மீண்டும் தெளிக்கவும்'
        ],
        treatment_advanced: [
          'மெட்டாலாக்சில் 8% + மேன்கோசெப் 64% WP @ 2.5 கி/லி தெளிக்கவும்',
          'அதிகம் பாதிக்கப்பட்ட இலைகளை அகற்றி மண்ணில் புதைக்கவும்'
        ],
        cautions: [
          'மருந்து தெளித்த 7 நாட்களுக்கு அறுவடை செய்யக்கூடாது (PHI)',
          'காப்பர் மருந்துகளை கந்தகத்துடன் கலக்கக்கூடாது'
        ],
        refer_threshold: '25% பயிர் பாதிக்கப்பட்டால் உடனே KVK ஆய்வகத்தைத் தொடர்பு கொள்ளவும்'
      }
    }
  },
  {
    id: 'adv002',
    crop: 'Onion',
    cropId: 'onion',
    threat: 'Purple Blotch (Alternaria porri)',
    updatedDate: '30 Aug 2025',
    isValidated: true,
    severityRating: 'Moderate / High Spread',
    optimalWeather: 'RH 80–90%, Temp 22–28°C',
    treatmentType: 'chemical',
    languages: {
      en: {
        prevention: [
          'Maintain well-drained raised beds to prevent stagnant waterlogging around bulb roots',
          'Apply balanced potash (K) nutrition to strengthen leaf epidermal cell walls',
          'Treat seeds/seedlings with Trichoderma viride @ 5 g/kg prior to transplanting'
        ],
        treatment_early: [
          'Difenoconazole 25% EC (Score) @ 1.0 ml/L or Hexaconazole 5% SC @ 2.0 ml/L',
          'Add a non-ionic wetting agent (silicon sticker) @ 0.5 ml/L for waxy onion foliage adhesion'
        ],
        treatment_advanced: [
          'Tebuconazole 25.9% EC @ 1.5 ml/L + Azoxystrobin 23% SC @ 1.0 ml/L',
          'Rake and incinerate severely blighted leaf tips from the field borders'
        ],
        cautions: [
          'Observe 14-day PHI period before bulb harvesting',
          'Avoid spraying during intense noon sunshine to prevent chemical burn'
        ],
        refer_threshold: 'Report if concentric purple lesions girdle more than 3 leaves per plant'
      },
      hi: {
        prevention: [
          'कंद के पास पानी जमा होने से रोकने के लिए उठी हुई क्यारियों (Raised beds) में रोपाई करें',
          'पत्तियों को मजबूत करने के लिए पोटाश उर्वरक का संतुलित उपयोग करें',
          'रोपाई से पहले ट्राइकोडर्मा विरिडी @ 5 ग्राम/किग्रा से बीजोपचार करें'
        ],
        treatment_early: [
          'डाइफेनोकोनाजोल 25% EC @ 1.0 मिली/लीटर पानी में घोलकर छिड़कें',
          'दवा के बेहतर फैलाव के लिए 0.5 मिली स्टिकर (चिपकने वाला घोल) अवश्य मिलाएं'
        ],
        treatment_advanced: [
          'टेबुकोनाजोल 25.9% EC @ 1.5 मिली/लीटर या एजोक्सीस्ट्रोबिन 23% SC का छिड़काव करें'
        ],
        cautions: [
          'खुदाई से 14 दिन पहले छिड़काव बंद कर दें',
          'तेज धूप में छिड़काव न करें'
        ],
        refer_threshold: 'यदि प्रति पौधे 3 से अधिक पत्तियां सूखने लगें तो कृषि विज्ञान केंद्र से संपर्क करें'
      },
      mr: {
        prevention: [
          'पाण्याचा निचरा होण्यासाठी गादी वाफ्यावर (Raised bed) लागवड करा',
          'पाने मजबूत होण्यासाठी पलाश (Potash) खताचा संतुलित वापर करा',
          'लागवडीपूर्वी ट्रायकोडर्मा विरिडी @ 5 ग्रॅम/किलोची बीजप्रक्रिया करा'
        ],
        treatment_early: [
          'डायफेनोकोनॅझोल 25% EC @ 1.0 मिली/लिटर किंवा हेक्साकोनॅझोल 5% SC @ 2.0 मिली/लिटर फवारा',
          'कांद्याच्या पानांवर औषध टिकण्यासाठी 0.5 मिली सिलिकॉन स्टिकर अवश्य वापरा'
        ],
        treatment_advanced: [
          'टेबुकोनॅझोल 25.9% EC @ 1.5 मिली/लिटर पाण्यात मिसळून फवारा'
        ],
        cautions: [
          'कांदा काढणीपूर्वी 14 दिवस औषध फवारणी थांबवा (PHI)',
          'दुपारच्या कडक उन्हात फवारणी करू नका'
        ],
        refer_threshold: 'एका झाडावर 3 पेक्षा जास्त पानांवर जांभळे डाग दिसल्यास तज्ञांचा सल्ला घ्या'
      },
      te: {
        prevention: [
          'నీరు నిలవకుండా ఉండేందుకు ఎత్తైన మడులపై (Raised beds) ఉల్లి సాగు చేయండి',
          'ఆకులు దృఢంగా ఉండేందుకు పొటాష్ ఎరువులను సమతుల్యంగా వాడండి',
          'నాటడానికి ముందు ట్రైకోడెర్మా విరిడితో విత్తన శుద్ధి చేయండి'
        ],
        treatment_early: [
          'డైఫెనోకోనజోల్ 25% EC @ 1.0 మి.లీ/లీటర్ నీటిలో కలిపి పిచికారీ చేయండి',
          'ఆకులపై మందు అతుక్కోవడానికి 0.5 మి.లీ సిలికాన్ స్టిక్కర్ కలపండి'
        ],
        treatment_advanced: [
          'టెబుకోనజోల్ 25.9% EC @ 1.5 మి.లీ/లీటర్ పిచికారీ చేయండి'
        ],
        cautions: [
          'ఉల్లి తవ్వడానికి 14 రోజుల ముందు మందులు పిచికారీ చేయకూడదు',
          'మధ్యాహ్నపు ఎండలో పిచికారీ చేయవద్దు'
        ],
        refer_threshold: 'ఒక్కో మొక్కకు 3 కంటే ఎక్కువ ఆకులు ఎండిపోతే KVK ని సంప్రదించండి'
      },
      ta: {
        prevention: [
          'தண்ணீர் தேங்குவதைத் தவிர்க்க மேட்டுப்பாத்திகளில் வெங்காயம் நடவு செய்யவும்',
          'இலைகள் வலுப்பெற பொட்டாஷ் உரங்களை சமச்சீராகப் பயன்படுத்தவும்',
          'நடவுக்கு முன் டிரைக்கோடெர்மா விரிடி கொண்டு விதை நேர்த்தி செய்யவும்'
        ],
        treatment_early: [
          'டைபெனோகோனசோல் 25% EC @ 1.0 மி.லி/லிட்டர் தெளிக்கவும்',
          'வெங்காய இலைகளில் மருந்து ஒட்ட 0.5 மி.லி ஒட்டும் திரவம் சேர்க்கவும்'
        ],
        treatment_advanced: [
          'டெபுகோனசோல் 25.9% EC @ 1.5 மி.லி/லிட்டர் தெளிக்கவும்'
        ],
        cautions: [
          'அறுவடைக்கு 14 நாட்களுக்கு முன் தெளிப்பதை நிறுத்தவும்'
        ],
        refer_threshold: 'ஒரு செடியில் 3 இலைகளுக்கு மேல் கருகினால் KVK-ஐ அணுகவும்'
      }
    }
  },
  {
    id: 'adv003',
    crop: 'Chili',
    cropId: 'chili',
    threat: 'Thrips & Murda Leaf Curl Complex',
    updatedDate: '01 Sep 2025',
    isValidated: true,
    severityRating: 'High / Vector Risk',
    optimalWeather: 'Dry spell post-rain, Temp 28–34°C, RH < 65%',
    treatmentType: 'organic',
    languages: {
      en: {
        prevention: [
          'Erect 25–30 blue sticky traps per acre at canopy height to capture adult thrips',
          'Intercrop with maize or sorghum borders (4 barrier rows) to block windborne vector flights',
          'Conserve natural predators: Chrysoperla carnea and anthocorid bugs'
        ],
        treatment_early: [
          'Apply Neem Azadirachtin 10,000 ppm @ 2.5 ml/L + potassium soap',
          'Bio-insecticide: Lecanicillium lecanii @ 5.0 g/L sprayed under leaf surfaces during evening'
        ],
        treatment_advanced: [
          'Fipronil 5% SC @ 2.0 ml/L or Spinetoram 11.7% SC (Delegate) @ 0.9 ml/L',
          'Rotate chemical classes (IRAC Mode of Action) to prevent resistance development'
        ],
        cautions: [
          'Spinetoram has a short PHI of 3 days; ideal for harvesting flushes',
          'Never spray synthetic pyrethroids which cause flare-up of red spider mites'
        ],
        refer_threshold: 'Escalate if upward boat-shaped leaf curl exceeds 20% of nursery or field plants'
      },
      hi: {
        prevention: [
          'वयस्क थ्रिप्स को पकड़ने के लिए प्रति एकड़ 25-30 नीले चिपचिपे ट्रैप लगाएं',
          'खेत की मेड़ों पर मक्का या ज्वार की 4 कतारें लगाएं जिससे कीट हवा के साथ न आएं',
          'मित्र कीटों (क्राइसोपर्ला) का संरक्षण करें'
        ],
        treatment_early: [
          'नीम तेल (10,000 ppm) @ 2.5 मिली/लीटर पानी में मिलाकर छिड़कें',
          'जैविक कीटनाशक लेकानीसिलियम लेकेनाई @ 5.0 ग्राम/लीटर शाम के समय छिड़कें'
        ],
        treatment_advanced: [
          'फिप्रोनिल 5% SC @ 2.0 मिली/लीटर या स्पाइनेटोरम 11.7% SC @ 0.9 मिली/लीटर का छिड़काव करें'
        ],
        cautions: [
          'स्पाइनेटोरम की तुड़ाई प्रतीक्षा अवधि मात्र 3 दिन है',
          'सिंथेटिक पाइरेथ्रॉइड के अत्यधिक छिड़काव से बचें'
        ],
        refer_threshold: 'यदि 20% से अधिक पौधे मुड़ने लगें तो तुरंत विशेषज्ञ से सलाह लें'
      },
      mr: {
        prevention: [
          'थ्रिप्स पकडण्यासाठी एकरी 25 ते 30 निळे चिकट सापळे पिकाच्या उंचीवर लावा',
          'हवेतून येणाऱ्या किडी रोखण्यासाठी बांधावर मका किंवा ज्वारीच्या 4 ओळी लावा',
          'क्रायसोपर्ला सारख्या मित्र किडींचे रक्षण करा'
        ],
        treatment_early: [
          'निमतेल (10,000 ppm) @ 2.5 मिली/लिटर पाण्यात मिसळून फवारा',
          'जैविक बुरशी लेकॅनिसीलियम लेकेनाई @ 5.0 ग्रॅम/लिटर संध्याकाळी पानांच्या खाली फवारा'
        ],
        treatment_advanced: [
          'फिप्रोनिल 5% SC @ 2.0 मिली/लिटर किंवा स्पायनेटोरम 11.7% SC @ 0.9 मिली/लिटर फवारा'
        ],
        cautions: [
          'स्पायनेटोरम फवारणीनंतर 3 दिवसांत मिरची तोडणी करता येते',
          'वारंवार एकाच औषधाची फवारणी करू नका'
        ],
        refer_threshold: '20% पेक्षा जास्त झाडांची पाने बोकड्या (चुरडा-मुरडा) झाल्यास केव्हीकेकडे संपर्क करा'
      },
      te: {
        prevention: [
          'తామర పురుగులను ఆకర్షించడానికి ఎకరాకు 25-30 నీలి రంగు జిగురు బోర్డులు ఏర్పాటు చేయండి',
          'పొలం చుట్టూ 4 వరుసల జొన్న లేదా మొక్కజొన్నను సరిహద్దు పంటగా వేయండి',
          'మిత్ర పురుగులను కాపాడుకోండి'
        ],
        treatment_early: [
          'వేప నూనె (10,000 ppm) @ 2.5 మి.లీ/లీటర్ నీటిలో కలిపి పిచికారీ చేయండి',
          'జీవసంబంధిత లెకానిసిలియం @ 5.0 గ్రా/లీ సాయంత్రం వేళల్లో పిచికారీ చేయండి'
        ],
        treatment_advanced: [
          'ఫిప్రోనిల్ 5% SC @ 2.0 మి.లీ/లీటర్ లేదా స్పైనటోరమ్ 11.7% SC @ 0.9 మి.లీ/లీటర్ పిచికారీ చేయండి'
        ],
        cautions: [
          'స్పైనటోరమ్ కొట్టిన 3 రోజుల తర్వాత కాయలు కోయవచ్చు (PHI: 3 రోజులు)'
        ],
        refer_threshold: '20% పైగా మొక్కలలో ఆకులు ముడుచుకుపోతే నిపుణులను సంప్రదించండి'
      },
      ta: {
        prevention: [
          'இலைப்பேன்களைப் பிடிக்க ஏக்கருக்கு 25-30 நீல நிற ஒட்டும் பொறிகளை அமைக்கவும்',
          'வரப்புகளில் மக்காச்சோளம் அல்லது சோளத்தை அரண் பயிராக நடவும்'
        ],
        treatment_early: [
          'வேப்பெண்ணெய் (10,000 ppm) @ 2.5 மி.லி/லிட்டர் தெளிக்கவும்',
          'லெகானிசிலியம் பூஞ்சை @ 5.0 கி/லி மாலையில் இலைகளின் அடிப்பகுதியில் தெளிக்கவும்'
        ],
        treatment_advanced: [
          'பிப்ரோனில் 5% SC @ 2.0 மி.லி/லிட்டர் அல்லது ஸ்பைனேடோரம் @ 0.9 மி.லி/லிட்டர் தெளிக்கவும்'
        ],
        cautions: [
          'ஸ்பைனேடோரம் தெளித்த 3 நாட்களில் அறுவடை செய்யலாம்'
        ],
        refer_threshold: '20% செடிகள் இலைச்சுருள் நோயால் பாதிக்கப்பட்டால் KVK-ஐ அணுகவும்'
      }
    }
  },
  {
    id: 'adv004',
    crop: 'Grape',
    cropId: 'grape',
    threat: 'Downy Mildew (Plasmopara viticola)',
    updatedDate: '02 Sep 2025',
    isValidated: true,
    severityRating: 'Critical / Rapid Berry Loss',
    optimalWeather: 'RH > 85%, Rain > 10mm, Temp 20–25°C',
    treatmentType: 'preventive',
    languages: {
      en: {
        prevention: [
          'Thin out dense shoot canopy immediately to ensure sunlight reaches fruit bunches',
          'Apply Bordeaux Mixture 1% (10:10:100) or Copper Hydroxide before rain forecasts',
          'Keep orchard floor weed-free to lower microclimate humidity beneath trellises'
        ],
        treatment_early: [
          'Potassium phosphonate (Akomin) @ 3.0 ml/L systemically triggers vine immune response',
          'Cymoxanil 8% + Mancozeb 64% WP (Curzate) @ 2.0 g/L upon observing initial oilspots'
        ],
        treatment_advanced: [
          'Mandipropamid 23.4% SC (Revus) @ 0.8 ml/L or Fluopicolide + Fosetyl-Al @ 2.5 g/L',
          'Prune out aborted inflorescences and burn to halt secondary zoospore cycle'
        ],
        cautions: [
          'Observe 15-day PHI for systemic fungicide combinations before export harvest',
          'Ensure uniform coverage on lower abaxial leaf surfaces'
        ],
        refer_threshold: 'Mandatory notification to NRC Grapes / KVK if inflorescence blight reaches 10%'
      },
      hi: {
        prevention: [
          'अंगूर के गुच्छों तक धूप पहुँचने के लिए अतिरिक्त टहनियों की छंटाई करें',
          'बारिश से पहले 1% बोर्डो मिश्रण का सुरक्षात्मक छिड़काव करें'
        ],
        treatment_early: [
          'पोटेशियम फॉस्फोनेट @ 3.0 मिली/लीटर का छिड़काव करें',
          'साइमोक्सानिल + मैंकोजेब @ 2.0 ग्राम/लीटर शुरुआती तेल जैसे धब्बे दिखने पर छिड़कें'
        ],
        treatment_advanced: [
          'मैंडिप्रोपामाइड 23.4% SC @ 0.8 मिली/लीटर का छिड़काव करें'
        ],
        cautions: [
          'काटने से 15 दिन पहले फफूंदनाशक का छिड़काव बंद करें'
        ],
        refer_threshold: 'यदि 10% से अधिक फूल गुच्छे सूखने लगें तो अंगूर अनुसंधान केंद्र से संपर्क करें'
      },
      mr: {
        prevention: [
          'घडांना भरपूर सूर्यप्रकाश मिळण्यासाठी वेलीची विरळणी व शेंडे छाटणी करा',
          'पावसाचा अंदाज येताच 1% बोर्डो मिश्रणाची प्रतिबंधात्मक फवारणी करा'
        ],
        treatment_early: [
          'पोटॅशियम फॉस्फोनेट @ 3.0 मिली/लिटर वेलीची रोगप्रतिकारक शक्ती वाढवण्यासाठी फवारा',
          'पानांवर तेलासारखे डाग दिसताच सायमॉक्सॅनिल + मँकोझेब @ 2.0 ग्रॅम/लिटर फवारा'
        ],
        treatment_advanced: [
          'मँडिप्रोपामाईड 23.4% SC @ 0.8 मिली/लिटर किंवा फ्लुओपिकोलाईड फवारा'
        ],
        cautions: [
          'द्राक्ष काढणीपूर्वी 15 दिवस सिस्टिमिक बुरशीनाशके फवारू नका (PHI: 15 दिवस)'
        ],
        refer_threshold: '10% पेक्षा जास्त फुलोरा किंवा घड जळाल्यास राष्ट्रीय द्राक्ष संशोधन केंद्रास कळवा'
      },
      te: {
        prevention: [
          'ద్రాక్ష గుత్తులకు గాలి, వెలుతురు తగిలేలా కొమ్మలను సరిగ్గా కత్తిరించండి',
          'వర్షం సూచన ఉన్నప్పుడు 1% బోర్డో మిశ్రమాన్ని పిచికారీ చేయండి'
        ],
        treatment_early: [
          'పొటాషియం ఫాస్ఫోనేట్ @ 3.0 మి.లీ/లీటర్ పిచికారీ చేయండి'
        ],
        treatment_advanced: [
          'మాండిప్రోపమైడ్ 23.4% SC @ 0.8 మి.లీ/లీటర్ పిచికారీ చేయండి'
        ],
        cautions: [
          'కోతకు 15 రోజుల ముందు సిస్టమిక్ మందులను వాడరాదు'
        ],
        refer_threshold: '10% కంటే ఎక్కువ పూత మాడిపోతే KVK నిపుణులను సంప్రదించండి'
      },
      ta: {
        prevention: [
          'திராட்சைக் கொத்துகளுக்கு நல்ல சூரிய ஒளி கிடைக்க இலைகளை கவாத்து செய்யவும்',
          'மழைக்கு முன் 1% போர்டோ கலவை தெளிக்கவும்'
        ],
        treatment_early: [
          'பொட்டாசியம் பாஸ்போனேட் @ 3.0 மி.லி/லி தெளிக்கவும்'
        ],
        treatment_advanced: [
          'மாண்டிபுரோபமைடு @ 0.8 மி.லி/லிட்டர் தெளிக்கவும்'
        ],
        cautions: [
          'அறுவடைக்கு 15 நாட்களுக்கு முன் தெளிப்பதை நிறுத்தவும்'
        ],
        refer_threshold: '10% பூங்கொத்துகள் கருகினால் KVK-ஐ தொடர்பு கொள்ளவும்'
      }
    }
  }
];
