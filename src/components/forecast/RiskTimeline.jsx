import React from 'react';
import { CloudRain, Droplets, Thermometer, AlertTriangle, Wind } from 'lucide-react';

export default function RiskTimeline({ days = [], selectedDayIndex = 0, onSelectDay }) {
  if (!days || days.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-soil-dark">
          7-Day Microclimate Risk Timeline
        </h3>
        <span className="text-[11px] text-soil-dark/60 font-mono-data">
          Pulsing Red = High Sporulation/Infestation Risk
        </span>
      </div>

      {/* Horizontal Scrollable Timeline */}
      <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scroll-smooth">
        {days.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          const isHighRisk = day.overallRisk === 'high';
          const isModRisk = day.overallRisk === 'moderate';

          let riskBg = 'border-growth/40 bg-growth/5';
          let riskText = 'Low Risk';
          let riskColor = 'text-growth-dark';

          if (isHighRisk) {
            riskBg = 'border-danger-red bg-danger-red/5 high-risk-pulse';
            riskText = 'HIGH RISK';
            riskColor = 'text-danger-red';
          } else if (isModRisk) {
            riskBg = 'border-warning-amber bg-warning-amber/5';
            riskText = 'MODERATE';
            riskColor = 'text-warning-dark';
          }

          return (
            <button
              key={day.date}
              type="button"
              onClick={() => onSelectDay(idx)}
              className={`flex-shrink-0 w-44 rounded-xl p-3.5 border-2 text-left transition-all ${riskBg} ${
                isSelected
                  ? 'ring-2 ring-soil-dark shadow-lg bg-white scale-[1.02]'
                  : 'hover:shadow-md bg-white/80'
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-sm text-soil-dark block leading-none">
                    {day.dayName}
                  </span>
                  <span className="text-[10px] text-soil-dark/60 font-mono-data">
                    {day.formattedDate}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    isHighRisk
                      ? 'bg-danger-red text-white'
                      : isModRisk
                      ? 'bg-warning-amber text-white'
                      : 'bg-growth text-white'
                  }`}
                >
                  {riskText}
                </span>
              </div>

              {/* Weather Metrics */}
              <div className="space-y-1.5 text-xs text-soil-dark/80 pt-1 border-t border-soil-dark/10">
                {/* Temp */}
                <div className="flex items-center justify-between">
                  <span className="text-soil-dark/60 flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-danger-red" />
                    Temp
                  </span>
                  <span className="font-mono-data font-semibold">
                    {day.minTemp}° – {day.maxTemp}°C
                  </span>
                </div>

                {/* Rain */}
                <div className="flex items-center justify-between">
                  <span className="text-soil-dark/60 flex items-center gap-1">
                    <CloudRain className="w-3.5 h-3.5 text-sky-blue" />
                    Rain %
                  </span>
                  <span className={`font-mono-data font-semibold ${day.rainProb > 50 ? 'text-sky-dark font-bold' : ''}`}>
                    {day.rainProb}%
                  </span>
                </div>

                {/* Humidity */}
                <div className="flex items-center justify-between">
                  <span className="text-soil-dark/60 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-field-green" />
                    Humidity
                  </span>
                  <span className={`font-mono-data font-semibold ${day.humidity > 80 ? 'text-danger-red font-bold' : ''}`}>
                    {day.humidity}%
                  </span>
                </div>
              </div>

              {/* Top Threats */}
              <div className="mt-2.5 pt-2 border-t border-soil-dark/10">
                <span className="text-[9px] text-soil-dark/50 font-bold uppercase block mb-1">
                  Top Threats:
                </span>
                <div className="space-y-0.5">
                  {day.topRisks.slice(0, 2).map((r) => (
                    <div
                      key={r.id}
                      className="text-[10px] truncate flex items-center gap-1"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          r.level === 'high'
                            ? 'bg-danger-red'
                            : r.level === 'moderate'
                            ? 'bg-warning-amber'
                            : 'bg-growth'
                        }`}
                      />
                      <span className="font-medium text-soil-dark/90 truncate">
                        {r.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
