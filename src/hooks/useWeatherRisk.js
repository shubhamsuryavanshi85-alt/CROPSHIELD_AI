import { useState, useEffect, useCallback } from 'react';
import { getWeatherForecast } from '../services/weatherAPI';

// Disease risk scoring mathematical models based on temperature, relative humidity, and rainfall
export const RISK_MODELS = {
  late_blight: {
    name: 'Late Blight (Phytophthora)',
    crop: 'Tomato / Potato',
    calc: ({ humidity, maxTemp, minTemp, rainProb }) => {
      const avgTemp = (maxTemp + minTemp) / 2;
      if (humidity > 80 && avgTemp >= 15 && avgTemp <= 23 && rainProb > 50) return 'high';
      if (humidity > 70 && avgTemp >= 14 && avgTemp <= 26) return 'moderate';
      return 'low';
    },
    etiology: 'Cool foggy weather (15–22°C) coupled with persistent leaf wetness triggers zoosporangia release within 6 hours.',
    action: 'Apply Mancozeb 75% WP @ 2.5 g/L or Copper Oxychloride 3 g/L preventively before rainfall window.'
  },
  purple_blotch: {
    name: 'Purple Blotch (Alternaria porri)',
    crop: 'Onion / Garlic',
    calc: ({ humidity, maxTemp, minTemp }) => {
      const avgTemp = (maxTemp + minTemp) / 2;
      if (humidity > 82 && avgTemp >= 20 && avgTemp <= 30) return 'high';
      if (humidity > 68 && avgTemp >= 18 && avgTemp <= 32) return 'moderate';
      return 'low';
    },
    etiology: 'Relative humidity >80% with warm daytime temperatures creates optimal sporulation window on onion blades.',
    action: 'Spray Difenoconazole 25% EC (Score) @ 1 ml/L with silicon sticker adjuvant.'
  },
  downy_mildew: {
    name: 'Downy Mildew (Plasmopara)',
    crop: 'Grape / Cucurbits',
    calc: ({ humidity, rainProb, maxTemp }) => {
      if (humidity > 85 && (rainProb > 55 || maxTemp < 28)) return 'high';
      if (humidity > 72) return 'moderate';
      return 'low';
    },
    etiology: 'Overnight dew and rainfall events exceeding 10mm induce rapid oospore germination and shoot tip abortion.',
    action: 'Apply Potassium phosphonate @ 3 ml/L or Cymoxanil + Mancozeb @ 2 g/L.'
  },
  thrips: {
    name: 'Thrips Surge (Scirtothrips)',
    crop: 'Chili / Onion / Cotton',
    calc: ({ humidity, maxTemp, rainProb }) => {
      if (humidity < 60 && maxTemp >= 29 && rainProb < 20) return 'high';
      if (humidity < 72 && maxTemp >= 27) return 'moderate';
      return 'low';
    },
    etiology: 'Dry weather following a wet spell accelerates egg hatching and rapid nymph proliferation on tender flushes.',
    action: 'Deploy 25 blue sticky traps per acre; spray Neem Azadirachtin 10,000 ppm @ 2.5 ml/L.'
  },
  powdery_mildew: {
    name: 'Powdery Mildew (Erysiphe)',
    crop: 'Grape / Chili / Pea',
    calc: ({ humidity, maxTemp, minTemp }) => {
      const avgTemp = (maxTemp + minTemp) / 2;
      if (humidity >= 50 && humidity <= 75 && avgTemp >= 22 && avgTemp <= 30) return 'high';
      if (humidity >= 45 && humidity <= 80) return 'moderate';
      return 'low';
    },
    etiology: 'Moderate humidity and warm sunny days without direct rain favor conidial germination and white powdery coating.',
    action: 'Foliar spray of Wettable Sulfur 80% WDG @ 2.5 g/L or Hexaconazole 5% SC @ 1.5 ml/L.'
  },
  bacterial_blight: {
    name: 'Bacterial Blight (Xanthomonas)',
    crop: 'Pomegranate / Cotton',
    calc: ({ rainProb, maxTemp, humidity }) => {
      if (rainProb > 60 && maxTemp >= 26 && humidity > 75) return 'high';
      if (rainProb > 35 && maxTemp >= 24) return 'moderate';
      return 'low';
    },
    etiology: 'Wind-driven rain splatters bacterial exudates through stomata and pruning wounds.',
    action: 'Copper Hydroxide 53.8% DF @ 2 g/L + Streptocycline 0.5 g/L spray on stems and fruits.'
  }
};

export function useWeatherRisk(lat = 20.0059, lon = 73.7797, activeCrop = 'Tomato') {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherForecast(lat, lon);
      
      // Calculate risks for each day
      const enhancedDays = data.days.map((day) => {
        const risks = [];
        
        Object.entries(RISK_MODELS).forEach(([key, model]) => {
          const level = model.calc({
            humidity: day.humidity,
            maxTemp: day.maxTemp,
            minTemp: day.minTemp,
            rainProb: day.rainProb,
          });

          // Prioritize active crop or high risks
          const isRelevantCrop = model.crop.toLowerCase().includes((activeCrop || 'tomato').toLowerCase());

          risks.push({
            id: key,
            name: model.name,
            crop: model.crop,
            level,
            etiology: model.etiology,
            action: model.action,
            isRelevantCrop,
          });
        });

        // Sort: High first, then relevant crop
        risks.sort((a, b) => {
          const score = (r) => (r.level === 'high' ? 30 : r.level === 'moderate' ? 20 : 10) + (r.isRelevantCrop ? 5 : 0);
          return score(b) - score(a);
        });

        const overallRisk = risks.some((r) => r.level === 'high')
          ? 'high'
          : risks.some((r) => r.level === 'moderate')
          ? 'moderate'
          : 'low';

        return {
          ...day,
          overallRisk,
          topRisks: risks.slice(0, 2),
          allRisks: risks,
        };
      });

      setForecast({
        ...data,
        days: enhancedDays,
      });
    } catch (err) {
      setError(err.message || 'Failed to load weather risk');
    } finally {
      setLoading(false);
    }
  }, [lat, lon, activeCrop]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    forecast,
    loading,
    error,
    refetch: fetchData,
  };
}
