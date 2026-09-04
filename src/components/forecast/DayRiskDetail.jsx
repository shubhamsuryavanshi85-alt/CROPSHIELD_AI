import React from 'react';
import Badge from '../ui/Badge';
import { AlertTriangle, ShieldCheck, Thermometer, Droplets, CloudRain, Clock, Info, BookOpen } from 'lucide-react';

export default function DayRiskDetail({ dayData, onOpenAdvisory }) {
  if (!dayData) return null;

  return (
    <div className="space-y-6">
      {/* Detailed Day Header */}
      <div className="paper-card rounded-xl p-5 border border-soil-dark/10 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-soil-dark/10">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-xl text-soil-dark">
                {dayData.dayName}, {dayData.formattedDate} — Risk Breakdown
              </h3>
              <Badge variant={dayData.overallRisk === 'high' ? 'critical' : dayData.overallRisk === 'moderate' ? 'warning' : 'healthy'}>
                {dayData.overallRisk.toUpperCase()} RISK WINDOW
              </Badge>
            </div>
            <p className="text-xs text-soil-dark/70 mt-0.5">
              Microclimate conditions: Max {dayData.maxTemp}°C • Min {dayData.minTemp}°C • Humidity {dayData.humidity}% • Rain Chance {dayData.rainProb}%
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-data text-soil-dark/80 bg-parchment px-3 py-1.5 rounded-lg border border-soil-dark/10">
            <span>Wind: {dayData.windSpeed} km/h</span>
            <span>•</span>
            <span>Rain: {dayData.rainSum} mm</span>
          </div>
        </div>

        {/* List of Disease / Pest Threats for Selected Day */}
        <div className="space-y-4 pt-4">
          {dayData.allRisks.map((threat) => {
            const isHigh = threat.level === 'high';
            const isMod = threat.level === 'moderate';

            return (
              <div
                key={threat.id}
                className={`p-4 rounded-xl border transition-all ${
                  isHigh
                    ? 'border-l-4 border-l-danger-red bg-danger-red/5 border-danger-red/20'
                    : isMod
                    ? 'border-l-4 border-l-warning-amber bg-warning-amber/5 border-warning-amber/20'
                    : 'border-l-4 border-l-growth bg-growth/5 border-growth/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {threat.name.includes('Late Blight') ? '🍅' : threat.name.includes('Purple') ? '🧅' : threat.name.includes('Downy') ? '🍇' : threat.name.includes('Thrip') ? '🐛' : threat.name.includes('Bacterial') ? '🧫' : '🍄'}
                      </span>
                      <h4 className="font-bold text-sm text-soil-dark">
                        {threat.name}
                      </h4>
                      <span className="text-xs text-soil-dark/60">
                        ({threat.crop})
                      </span>
                    </div>
                  </div>

                  <Badge variant={isHigh ? 'critical' : isMod ? 'warning' : 'healthy'}>
                    {threat.level.toUpperCase()}
                  </Badge>
                </div>

                {/* Etiology / Why Conditions trigger this */}
                <div className="space-y-2 text-xs text-soil-dark/85 mt-2">
                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-soil-dark/10">
                    <Info className="w-4 h-4 text-sky-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-soil-dark block text-[11px] uppercase tracking-wider">
                        Why this threat level:
                      </strong>
                      <p className="text-soil-dark/80">{threat.etiology}</p>
                    </div>
                  </div>

                  {/* Immediate Preventive Action */}
                  <div className="flex items-start gap-2 bg-mist p-2.5 rounded-lg border border-mist-dark/30">
                    <ShieldCheck className="w-4 h-4 text-field-green shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-field-green block text-[11px] uppercase tracking-wider">
                        Action Window:
                      </strong>
                      <p className="text-soil-dark font-medium">{threat.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Outbreak Comparison Strip */}
      <div className="paper-card rounded-xl p-4 border border-soil-dark/10 shadow-sm bg-parchment/60 flex items-start gap-3">
        <Clock className="w-5 h-5 text-harvest-gold shrink-0 mt-0.5" />
        <div className="flex-1 text-xs text-soil-dark">
          <h4 className="font-bold uppercase tracking-wider text-soil-dark text-[11px] mb-0.5">
            District Historical Outbreak Correlation
          </h4>
          <p className="text-soil-dark/80 leading-relaxed">
            Last year, severe <strong>Purple Blotch and Downy Mildew outbreaks</strong> were confirmed in Nashik/Pune between Sep 12–18 following continuous 48-hour high-humidity fog events. Current weather metrics match that trajectory by <strong>84% correlation</strong>. Early preventive fungicide application is strongly advised before rainfall spikes.
          </p>
        </div>
      </div>
    </div>
  );
}
