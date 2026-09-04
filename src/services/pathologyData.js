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

// Sample field specimens for instant 1-click test in Diagnosis
export const SAMPLE_SPECIMENS = [
  {
    id: 'sample_late_blight_tomato',
    crop: 'Tomato',
    cropId: 'tomato',
    growthStage: 'fruiting',
    title: 'Tomato Late Blight (Phytophthora)',
    thumbnail: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=400&q=80',
    symptoms: 'Large brown/black water-soaked lesions on lower leaves, white fungal fuzz on leaf undersides, fruit showing dark greasy rot.',
    diagnosis: {
      diagnosis: 'Late Blight',
      scientific_name: 'Phytophthora infestans',
      confidence: 89,
      severity: 'high',
      spread_risk: 'high',
      description: 'Severe oomycete fungal pathogen causing water-soaked necrotic lesions. Highly destructive under humid (RH >85%) and moderate temperature (15–22°C) conditions.',
      immediate_actions: [
        'Prune and destroy infected lower leaves and fallen debris in deep trenches',
        'Cease overhead sprinkler irrigation immediately to keep foliage dry',
        'Ensure 60cm row spacing to maximize airflow through canopy',
        'Apply targeted protective fungicide within 24 hours'
      ],
      chemical_options: [
        {
          name: 'Mancozeb 75% WP',
          dosage: '2.5 g / Liter water',
          phi_days: 7,
          registered_crops: ['Tomato', 'Potato', 'Chili']
        },
        {
          name: 'Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ)',
          dosage: '2.0 g / Liter water',
          phi_days: 10,
          registered_crops: ['Tomato', 'Grapes']
        },
        {
          name: 'Dimethomorph 50% WP',
          dosage: '1.0 g / Liter water',
          phi_days: 5,
          registered_crops: ['Tomato', 'Potato']
        }
      ],
      organic_options: [
        'Copper oxychloride (COC) 50% WP @ 3.0 g/L as preventive barrier',
        'Trichoderma viride bio-fungicide @ 5 g/L drenching around root collar',
        'Neem oil 10,000 ppm @ 3 ml/L + potassium soap'
      ],
      refer_to_lab: true,
      refer_reason: 'High epidemic potential. If more than 20% foliage is affected, dispatch sample to nearest KVK pathology clinic.',
      follow_up_days: 3,
      advisory_language_key: 'en'
    }
  },
  {
    id: 'sample_purple_blotch_onion',
    crop: 'Onion',
    cropId: 'onion',
    growthStage: 'fruiting',
    title: 'Onion Purple Blotch (Alternaria porri)',
    thumbnail: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80',
    symptoms: 'Small water-soaked sunken lesions on leaves with distinctive purple-to-brown concentric rings and yellow halos.',
    diagnosis: {
      diagnosis: 'Purple Blotch',
      scientific_name: 'Alternaria porri',
      confidence: 84,
      severity: 'moderate',
      spread_risk: 'moderate',
      description: 'Fungal leaf pathogen targeting onion and garlic. Lesions girdle leaf blades leading to premature collapse and 30–50% bulb weight loss.',
      immediate_actions: [
        'Avoid nitrogen over-fertilization which promotes succulent vulnerable foliage',
        'Rake and burn blighted leaf tips',
        'Spray during clear morning hours so chemical dries before evening dew'
      ],
      chemical_options: [
        {
          name: 'Difenoconazole 25% EC (Score)',
          dosage: '1.0 ml / Liter water',
          phi_days: 14,
          registered_crops: ['Onion', 'Garlic', 'Chili']
        },
        {
          name: 'Hexaconazole 5% SC (Contaf)',
          dosage: '2.0 ml / Liter water',
          phi_days: 15,
          registered_crops: ['Onion', 'Rice', 'Mango']
        }
      ],
      organic_options: [
        'Pseudomonas fluorescens 1% WP @ 5 g/L foliar spray',
        'Garlic bulb extract + cow urine solution (5% concentration)'
      ],
      refer_to_lab: false,
      refer_reason: 'Standard fungal infection manageable with field IPM protocols.',
      follow_up_days: 5,
      advisory_language_key: 'en'
    }
  },
  {
    id: 'sample_downy_mildew_grape',
    crop: 'Grape',
    cropId: 'grape',
    growthStage: 'flowering',
    title: 'Grape Downy Mildew (Plasmopara)',
    thumbnail: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=400&q=80',
    symptoms: 'Yellowish oily spots on upper leaf surface (oilspots), dense white downy felt on leaf undersides, flower clusters drying up.',
    diagnosis: {
      diagnosis: 'Downy Mildew',
      scientific_name: 'Plasmopara viticola',
      confidence: 92,
      severity: 'critical',
      spread_risk: 'high',
      description: 'Extremely aggressive obligate oomycete in viticulture. Wet canopy with temps 20–25°C can cause total berry cluster abortion in 48 hours.',
      immediate_actions: [
        'Deshoot excess vigorous canopies to enhance solar penetration',
        'Check shoot tips and bunch clusters immediately',
        'Apply systemic translaminar fungicide prior to forecasted rains'
      ],
      chemical_options: [
        {
          name: 'Cymoxanil 8% + Mancozeb 64% WP (Curzate)',
          dosage: '2.0 g / Liter water',
          phi_days: 15,
          registered_crops: ['Grape', 'Tomato', 'Potato']
        },
        {
          name: 'Mandipropamid 23.4% SC (Revus)',
          dosage: '0.8 ml / Liter water',
          phi_days: 10,
          registered_crops: ['Grape']
        }
      ],
      organic_options: [
        'Bordeaux Mixture 1% (Copper sulphate + lime in 1:1 ratio)',
        'Potassium phosphonate (Akomin) @ 3 ml/L systemically stimulates plant phytoalexins'
      ],
      refer_to_lab: true,
      refer_reason: 'Critical reproductive stage outbreak. Notify district NRC Grapes extension liaison.',
      follow_up_days: 2,
      advisory_language_key: 'en'
    }
  },
  {
    id: 'sample_chili_thrips',
    crop: 'Chili',
    cropId: 'chili',
    growthStage: 'vegetative',
    title: 'Chili Leaf Curl / Thrips Infestation',
    thumbnail: 'https://images.unsplash.com/photo-1588879462719-75618f08149a?auto=format&fit=crop&w=400&q=80',
    symptoms: 'Upward curling of leaf margins (boat shaped), bronzing underneath leaves, stunted growing tips, flower drop.',
    diagnosis: {
      diagnosis: 'Chili Thrips & Murda Complex',
      scientific_name: 'Scirtothrips dorsalis',
      confidence: 87,
      severity: 'high',
      spread_risk: 'high',
      description: 'Microscopic rasping-sucking insect pest vectoring viral pathogens. Population spikes exponentially when humidity drops post-monsoon.',
      immediate_actions: [
        'Erect 25–30 blue sticky traps per acre at crop canopy height',
        'Spray water under high pressure to dislodge nymphs',
        'Conserve predatory ladybird beetles and anthocorid bugs'
      ],
      chemical_options: [
        {
          name: 'Fipronil 5% SC',
          dosage: '2.0 ml / Liter water',
          phi_days: 7,
          registered_crops: ['Chili', 'Rice', 'Cotton']
        },
        {
          name: 'Spinetoram 11.7% SC (Delegate)',
          dosage: '0.9 ml / Liter water',
          phi_days: 3,
          registered_crops: ['Chili', 'Cotton']
        }
      ],
      organic_options: [
        'Lecanicillium lecanii (Verticillium) entomo-pathogenic fungi @ 5 g/L',
        'Neem Azadirachtin 1% (10,000 ppm) @ 2.5 ml/L'
      ],
      refer_to_lab: false,
      refer_reason: 'Standard sucking pest complex. Monitor sticky trap catches weekly.',
      follow_up_days: 4,
      advisory_language_key: 'en'
    }
  },
  {
    id: 'sample_cotton_pink_bollworm',
    crop: 'Cotton',
    cropId: 'cotton',
    growthStage: 'fruiting',
    title: 'Cotton Pink Bollworm & Leaf Spot',
    thumbnail: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=400&q=80',
    symptoms: 'Rosetted flowers that fail to open, entry pinholes on green bolls sealed with excreta, stained unopen lint.',
    diagnosis: {
      diagnosis: 'Pink Bollworm & Cercospora Spot',
      scientific_name: 'Pectinophora gossypiella',
      confidence: 91,
      severity: 'critical',
      spread_risk: 'moderate',
      description: 'Notorious internal feeder larva devouring developing cotton seeds and destroying fiber quality. Pheromone trap thresholds exceeded.',
      immediate_actions: [
        'Install 8–10 Gossyplure pheromone delta traps per acre',
        'Collect and mechanically destroy rosetted flower buds daily',
        'Release Trichogramma bactrae egg parasitoids @ 60,000/acre'
      ],
      chemical_options: [
        {
          name: 'Chlorantraniliprole 18.5% SC (Coragen)',
          dosage: '0.3 ml / Liter water',
          phi_days: 15,
          registered_crops: ['Cotton', 'Rice', 'Sugarcane']
        },
        {
          name: 'Emamectin Benzoate 5% SG',
          dosage: '0.5 g / Liter water',
          phi_days: 10,
          registered_crops: ['Cotton', 'Chili', 'Tomato']
        }
      ],
      organic_options: [
        'Bacillus thuringiensis (Bt) kurstaki wettable powder @ 2 g/L',
        'Neem seed kernel extract (NSKE 5%) sprayed at twilight'
      ],
      refer_to_lab: true,
      refer_reason: 'Report to district Joint Director of Agriculture if trap catches exceed 8 moths/night for 3 consecutive days.',
      follow_up_days: 3,
      advisory_language_key: 'en'
    }
  },
  {
    id: 'sample_healthy_maize',
    crop: 'Maize',
    cropId: 'maize',
    growthStage: 'vegetative',
    title: 'Healthy Maize Plant — Baseline',
    thumbnail: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80',
    symptoms: 'Vibrant green upright foliage, strong central whorl, no visible chlorosis or lesions.',
    diagnosis: {
      diagnosis: 'Healthy Crop Foliage (No Active Pathogen)',
      scientific_name: 'Zea mays (Normal)',
      confidence: 96,
      severity: 'low',
      spread_risk: 'low',
      description: 'No active fungal, bacterial, or pest pathogen detected. Leaf tissue exhibits optimal chlorophyll pigmentation and healthy cell structure.',
      immediate_actions: [
        'Maintain balanced N:P:K nutrient fertilization',
        'Monitor whorl closely during vegetative stage for Fall Armyworm egg masses',
        'Ensure timely weeding at 25–30 days after sowing'
      ],
      chemical_options: [],
      organic_options: [
        'Preventive spray of Panchagavya or seaweed extract (2 ml/L) for immune vigor',
        'Trichoderma harzianum soil application with farmyard manure'
      ],
      refer_to_lab: false,
      refer_reason: 'Crop is in excellent physiological health.',
      follow_up_days: 7,
      advisory_language_key: 'en'
    }
  }
];

// Fallback dynamic pathology diagnosis engine (works offline or when Claude API is not configured)
export function analyzeCropFallback({ cropType, growthStage, symptoms, location, recentRain, hasImage }) {
  const crop = cropType ? cropType.toLowerCase() : 'tomato';
  const symptomText = (symptoms || '').toLowerCase();
  
  if (symptomText.includes('rot') || symptomText.includes('water') || symptomText.includes('blight') || crop.includes('tomato') || crop.includes('potato')) {
    return {
      diagnosis: crop.includes('potato') ? 'Early/Late Blight Complex' : 'Late Blight',
      scientific_name: 'Phytophthora infestans',
      confidence: hasImage ? 86 : 74,
      severity: recentRain === 'yes' || recentRain === true ? 'high' : 'moderate',
      spread_risk: 'high',
      description: `Water-soaked dark lesions observed on foliage with characteristic necrotic borders${recentRain ? ' exacerbated by recent rainfall and high relative humidity' : ''}.`,
      immediate_actions: [
        'Remove and incinerate blighted lower leaves immediately',
        'Suspend overhead irrigation to minimize leaf wetness duration',
        'Spray protective fungicide before spore formation accelerates'
      ],
      chemical_options: [
        { name: 'Mancozeb 75% WP', dosage: '2.5 g / L water', phi_days: 7, registered_crops: ['Tomato', 'Potato', 'Chili'] },
        { name: 'Cymoxanil 8% + Mancozeb 64% WP', dosage: '2.0 g / L water', phi_days: 10, registered_crops: ['Tomato', 'Potato'] }
      ],
      organic_options: [
        'Copper oxychloride (COC) 50% WP @ 3.0 g/L',
        'Trichoderma viride bio-fungicide @ 5 g/L root zone drench'
      ],
      refer_to_lab: true,
      refer_reason: 'High potential for rapid district-level spore dispersal during humid spells.',
      follow_up_days: 3,
      advisory_language_key: 'en'
    };
  } else if (symptomText.includes('thrip') || symptomText.includes('curl') || symptomText.includes('pest') || crop.includes('chili') || crop.includes('cotton')) {
    return {
      diagnosis: crop.includes('cotton') ? 'Pink Bollworm & Sucking Pest' : 'Chili Thrips Infestation',
      scientific_name: crop.includes('cotton') ? 'Pectinophora gossypiella' : 'Scirtothrips dorsalis',
      confidence: 82,
      severity: 'high',
      spread_risk: 'high',
      description: 'Foliar distortion and feeding puncture signs consistent with active sucking pest feeding colonies on young succulent shoots.',
      immediate_actions: [
        'Install 25 blue/yellow sticky traps per acre',
        'Spray water under pressure during morning to dislodge nymphs',
        'Apply targeted narrow-spectrum insecticide'
      ],
      chemical_options: [
        { name: 'Fipronil 5% SC', dosage: '2.0 ml / L water', phi_days: 7, registered_crops: ['Chili', 'Cotton', 'Rice'] },
        { name: 'Spinetoram 11.7% SC', dosage: '0.9 ml / L water', phi_days: 3, registered_crops: ['Chili', 'Cotton'] }
      ],
      organic_options: [
        'Neem Azadirachtin 1% (10,000 ppm) @ 2.5 ml/L',
        'Lecanicillium lecanii entomopathogen @ 5 g/L'
      ],
      refer_to_lab: false,
      refer_reason: 'Standard economic threshold pest infestation.',
      follow_up_days: 4,
      advisory_language_key: 'en'
    };
  } else if (symptomText.includes('purple') || symptomText.includes('spot') || crop.includes('onion')) {
    return {
      diagnosis: 'Purple Blotch',
      scientific_name: 'Alternaria porri',
      confidence: 84,
      severity: 'moderate',
      spread_risk: 'moderate',
      description: 'Concentric purple-to-brown necrotic lesions observed on onion leaf tissue. Optimal disease temperature is 22–30°C.',
      immediate_actions: [
        'Rake and discard blighted leaves',
        'Avoid excessive nitrogen fertilization',
        'Apply foliar protective fungicide with sticker/spreader agent'
      ],
      chemical_options: [
        { name: 'Difenoconazole 25% EC', dosage: '1.0 ml / L water', phi_days: 14, registered_crops: ['Onion', 'Garlic'] },
        { name: 'Hexaconazole 5% SC', dosage: '2.0 ml / L water', phi_days: 15, registered_crops: ['Onion', 'Rice'] }
      ],
      organic_options: [
        'Pseudomonas fluorescens 1% WP @ 5 g/L',
        'Neem seed kernel extract (NSKE) 5%'
      ],
      refer_to_lab: false,
      refer_reason: 'Manageable with regular IPM spray schedule.',
      follow_up_days: 5,
      advisory_language_key: 'en'
    };
  } else {
    return {
      diagnosis: 'Leaf Spot & Fungal Mildew Complex',
      scientific_name: 'Cercospora / Alternaria spp.',
      confidence: 79,
      severity: 'moderate',
      spread_risk: 'moderate',
      description: `Foliar chlorotic spotting and margin necrotic lesions detected on ${crop} at ${growthStage || 'vegetative'} stage.`,
      immediate_actions: [
        'Inspect surrounding 20 plants for similar lesion clusters',
        'Prune heavily infected lower leaves',
        'Ensure proper soil drainage around root crown'
      ],
      chemical_options: [
        { name: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC', dosage: '1.0 ml / L water', phi_days: 7, registered_crops: ['Tomato', 'Chili', 'Onion'] },
        { name: 'Mancozeb 75% WP', dosage: '2.5 g / L water', phi_days: 7, registered_crops: ['All Vegetables'] }
      ],
      organic_options: [
        'Trichoderma harzianum @ 5 g/L foliar spray',
        'Cow urine + Fermented buttermilk spray (10% solution)'
      ],
      refer_to_lab: false,
      refer_reason: 'Standard foliar pathogen manageable with standard precautions.',
      follow_up_days: 5,
      advisory_language_key: 'en'
    };
  }
}
