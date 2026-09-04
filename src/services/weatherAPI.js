// Open-Meteo weather API integration for CropShield AI

export async function getWeatherForecast(lat = 20.0059, lon = 73.7797) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_max,precipitation_sum,wind_speed_10m_max&timezone=Asia%2FKolkata&forecast_days=7`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Weather fetch error: ${res.statusText}`);
    }
    const data = await res.json();
    return formatForecastData(data);
  } catch (err) {
    console.warn('Live weather fetch failed, returning simulated microclimate data:', err);
    return getFallbackWeatherForecast(lat, lon);
  }
}

function formatForecastData(data) {
  if (!data?.daily?.time) {
    return getFallbackWeatherForecast();
  }

  const { time, temperature_2m_max, temperature_2m_min, precipitation_probability_max, relative_humidity_2m_max, precipitation_sum, wind_speed_10m_max } = data.daily;

  const days = time.map((dateStr, idx) => {
    const dateObj = new Date(dateStr);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const maxTemp = Math.round(temperature_2m_max[idx] ?? 30);
    const minTemp = Math.round(temperature_2m_min[idx] ?? 20);
    const avgTemp = Math.round((maxTemp + minTemp) / 2);
    const rainProb = Math.round(precipitation_probability_max[idx] ?? 25);
    const humidity = Math.round(relative_humidity_2m_max[idx] ?? 75);
    const rainSum = precipitation_sum ? precipitation_sum[idx] : 0;
    const windSpeed = wind_speed_10m_max ? Math.round(wind_speed_10m_max[idx]) : 12;

    return {
      date: dateStr,
      dayName,
      formattedDate,
      maxTemp,
      minTemp,
      avgTemp,
      rainProb,
      humidity,
      rainSum,
      windSpeed,
    };
  });

  return {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
    elevation: data.elevation,
    days,
  };
}

export function getFallbackWeatherForecast(lat = 20.0059, lon = 73.7797) {
  const days = [];
  const today = new Date();

  // Pattern with varying humidity and rain to demonstrate high/moderate/low risks
  const patterns = [
    { maxT: 29, minT: 21, rain: 75, hum: 88, wind: 14 }, // High risk day
    { maxT: 28, minT: 20, rain: 80, hum: 92, wind: 18 }, // High risk day (sporulation)
    { maxT: 31, minT: 22, rain: 45, hum: 78, wind: 10 }, // Moderate
    { maxT: 33, minT: 23, rain: 20, hum: 68, wind: 12 }, // Moderate
    { maxT: 34, minT: 24, rain: 10, hum: 54, wind: 15 }, // Low (Thrip surge warning)
    { maxT: 33, minT: 22, rain: 15, hum: 60, wind: 11 }, // Low
    { maxT: 30, minT: 21, rain: 60, hum: 82, wind: 13 }, // Moderate/High
  ];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const pat = patterns[i % patterns.length];

    days.push({
      date: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      formattedDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      maxTemp: pat.maxT,
      minTemp: pat.minT,
      avgTemp: Math.round((pat.maxT + pat.minT) / 2),
      rainProb: pat.rain,
      humidity: pat.hum,
      rainSum: pat.rain > 50 ? (pat.rain / 10).toFixed(1) : '0.0',
      windSpeed: pat.wind,
    });
  }

  return {
    latitude: lat,
    longitude: lon,
    timezone: 'Asia/Kolkata',
    elevation: 580,
    days,
  };
}
