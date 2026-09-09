import React from 'react';
import { useTranslation } from 'react-i18next';
import KPIStrip from '../components/dashboard/KPIStrip';
import ReportVolumeChart from '../components/dashboard/ReportVolumeChart';
import DiseaseTrendChart from '../components/dashboard/DiseaseTrendChart';
import ResponseHeatmap from '../components/dashboard/ResponseHeatmap';
import TopThreatsChart from '../components/dashboard/TopThreatsChart';
import InterventionTable from '../components/dashboard/InterventionTable';
import ExpertValidationCenter from '../components/dashboard/ExpertValidationCenter';
import { LayoutDashboard } from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-field-green/10 text-field-green text-xs font-semibold mb-2">
          <LayoutDashboard className="w-3.5 h-3.5" />
          District Agriculture Command Center
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-soil-dark">
          {t('dashboard.title', 'District Agriculture Command Center')}
        </h1>
        <p className="text-xs sm:text-sm text-soil-dark/70 mt-1 max-w-2xl">
          {t(
            'dashboard.subtitle',
            'Real-time surveillance analytics, extension response times, and containment tracking.'
          )}
        </p>
      </div>

      {/* KPI Summary Strip */}
      <KPIStrip />

      {/* Expert Validation Center */}
      <div className="space-y-3">
        <div>
          <h2 className="font-display font-bold text-xl text-soil-dark">Expert Validation Center</h2>
          <p className="text-xs text-soil-dark/70">Review and validate field diagnoses to maintain intelligence accuracy.</p>
        </div>
        <ExpertValidationCenter />
      </div>

      {/* Charts Grid (2x2 on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Report Volume Stacked Bar */}
        <ReportVolumeChart />

        {/* Chart 2: 12-Week Disease vs Rainfall Trend */}
        <DiseaseTrendChart />

        {/* Chart 3: Extension Response Heatmap */}
        <ResponseHeatmap />

        {/* Chart 4: Top 5 Threats Horizontal Bar */}
        <TopThreatsChart />
      </div>

      {/* Intervention & Containment Tracker Table */}
      <InterventionTable />
    </div>
  );
}
