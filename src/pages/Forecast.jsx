import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFarmStore } from '../store/farmStore';
import { useWeatherRisk } from '../hooks/useWeatherRisk';
import FarmContextPanel from '../components/forecast/FarmContextPanel';
import RiskTimeline from '../components/forecast/RiskTimeline';
import DayRiskDetail from '../components/forecast/DayRiskDetail';
import { CloudSun, RefreshCw, AlertTriangle, Building2, ArrowRight } from 'lucide-react';

export default function Forecast({ onNavigate }) {
  const { t } = useTranslation();
  const { activeFarm } = useFarmStore();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Weather risk hook
  const { forecast, loading, error, refetch } = useWeatherRisk(
    activeFarm?.lat || 20.0059,
    activeFarm?.lon || 73.7797,
    activeFarm?.crop || 'Tomato'
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-blue/10 text-sky-dark text-xs font-semibold mb-2">
            <CloudSun className="w-3.5 h-3.5 text-sky-blue" />
            Open-Meteo Microclimate Engine
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-soil-dark">
            {t('forecast.title', '7-Day Pest & Disease Risk Forecast')}
          </h1>
          <p className="text-xs sm:text-sm text-soil-dark/70 mt-1 max-w-2xl">
            {t(
              'forecast.subtitle',
              'Hyperlocal microclimate models correlating temperature, humidity, and rainfall to pathogen sporulation windows.'
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={refetch}
          disabled={loading}
          className="self-start sm:self-auto px-3.5 py-2 bg-white hover:bg-parchment text-soil-dark rounded-xl border border-soil-dark/15 text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-field-green ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Weather</span>
        </button>
      </div>

      {/* Farm Context Panel */}
      <FarmContextPanel onDistrictChange={() => refetch()} />

      {/* Loading & Error States */}
      {loading && (
        <div className="paper-card rounded-xl p-12 text-center border border-soil-dark/10">
          <div className="w-8 h-8 border-3 border-field-green border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold text-soil-dark">
            Fetching Open-Meteo satellite & weather station telemetry for {activeFarm?.district}...
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-danger-red/10 border border-danger-red/30 rounded-xl text-xs text-danger-red flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Weather telemetry error: {error}. Simulated models are active.</span>
        </div>
      )}

      {/* Main Forecast Content */}
      {forecast && !loading && (
        <div className="space-y-8">
          {/* 7-Day Timeline */}
          <RiskTimeline
            days={forecast.days}
            selectedDayIndex={selectedDayIndex}
            onSelectDay={(idx) => setSelectedDayIndex(idx)}
          />

          {/* Selected Day Detailed Breakdown */}
          <DayRiskDetail
            dayData={forecast.days[selectedDayIndex]}
            onOpenAdvisory={() => onNavigate('advisory')}
          />
        </div>
      )}

      {/* Prepare for Crop Damage Link Banner */}
      <div className="p-5 bg-parchment/60 rounded-2xl border border-soil-dark/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-soil-dark">
            <Building2 className="w-4 h-4 text-field-green" />
            <span>Prepare for Severe Weather or Crop Loss</span>
          </div>
          <p className="text-xs text-soil-dark/70">
            If weather risk triggers severe crop loss, check PMFBY insurance reporting rules and MP RBC 6-4 state relief.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('support')}
          className="px-4 py-2.5 bg-field-green hover:bg-field-dark text-white rounded-xl font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>Check Farmer Support</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
