import React from 'react';
import StatCounter from '../ui/StatCounter';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, TrendingUp, Clock, AlertOctagon } from 'lucide-react';

export default function KPIStrip() {
  const { t } = useTranslation();

  const kpis = [
    {
      id: 'reports',
      label: t('dashboard.kpi_reports', 'Reports this month'),
      value: 347,
      sub: '+18% vs previous cycle',
      icon: ShieldAlert,
      color: 'text-field-green',
      bg: 'bg-mist',
      border: 'border-l-4 border-l-growth',
    },
    {
      id: 'early_rate',
      label: t('dashboard.kpi_early', 'Early detection rate'),
      value: 89,
      suffix: '%',
      sub: 'Stage 1 & 2 symptom captures',
      icon: TrendingUp,
      color: 'text-growth-dark',
      bg: 'bg-growth/10',
      border: 'border-l-4 border-l-field-green',
    },
    {
      id: 'response_time',
      label: t('dashboard.kpi_response', 'Avg. extension response time'),
      value: '2.3',
      suffix: ' days',
      sub: 'Down from 72h baseline',
      icon: Clock,
      color: 'text-sky-dark',
      bg: 'bg-sky-blue/10',
      border: 'border-l-4 border-l-sky-blue',
    },
    {
      id: 'outbreaks',
      label: t('dashboard.kpi_outbreaks', 'Active outbreaks (contained)'),
      value: 12,
      sub: '9 containment zones stabilized',
      icon: AlertOctagon,
      color: 'text-danger-red',
      bg: 'bg-danger-red/10',
      border: 'border-l-4 border-l-danger-red',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className={`paper-card rounded-2xl p-4 sm:p-5 border border-soil-dark/10 shadow-md ${kpi.border} space-y-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-soil-dark/70 truncate">
                {kpi.label}
              </span>
              <div className={`w-7 h-7 rounded-lg ${kpi.bg} flex items-center justify-center ${kpi.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className={`text-2xl sm:text-3xl font-bold font-mono-data ${kpi.color}`}>
              <StatCounter endValue={kpi.value} suffix={kpi.suffix || ''} />
            </div>

            <p className="text-[10px] text-soil-dark/60 font-mono-data truncate">
              {kpi.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}
