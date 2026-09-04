import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFarmStore } from '../store/farmStore';
import HotspotMap from '../components/map/HotspotMap';
import ActiveAlertsSidebar from '../components/map/ActiveAlertsSidebar';
import ExtensionDispatchModal from '../components/map/ExtensionDispatchModal';
import { MapPin, Sparkles, Filter, Layers, AlertTriangle } from 'lucide-react';

export default function MapPage() {
  const { t } = useTranslation();
  const { farms, alerts } = useFarmStore();

  const [selectedAlert, setSelectedAlert] = useState(alerts[0] || null);
  const [dispatchModalAlert, setDispatchModalAlert] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCrop, setFilterCrop] = useState('all');
  const [showHeatmap, setShowHeatmap] = useState(true);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-danger-red/10 text-danger-red text-xs font-semibold mb-2">
          <MapPin className="w-3.5 h-3.5" />
          District Geospatial Surveillance
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-soil-dark">
          {t('map.title', 'Geospatial Outbreak Hotspots')}
        </h1>
        <p className="text-xs sm:text-sm text-soil-dark/70 mt-1 max-w-2xl">
          {t(
            'map.subtitle',
            'District-level cluster surveillance, AI-flagged alerts, and field extension dispatch.'
          )}
        </p>
      </div>

      {/* Main Map & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Leaflet Map (Left/Center 8 Columns) */}
        <div className="lg:col-span-8">
          <HotspotMap
            farms={farms}
            alerts={alerts}
            selectedAlert={selectedAlert}
            onSelectAlert={(a) => setSelectedAlert(a)}
            onOpenDispatch={(a) => setDispatchModalAlert(a)}
            showHeatmap={showHeatmap}
          />
        </div>

        {/* Active Alerts Sidebar (Right 4 Columns) */}
        <div className="lg:col-span-4">
          <ActiveAlertsSidebar
            alerts={alerts}
            selectedAlert={selectedAlert}
            onSelectAlert={(a) => setSelectedAlert(a)}
            onOpenDispatch={(a) => setDispatchModalAlert(a)}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterCrop={filterCrop}
            setFilterCrop={setFilterCrop}
            showHeatmap={showHeatmap}
            setShowHeatmap={setShowHeatmap}
          />
        </div>
      </div>

      {/* Extension Dispatch Modal */}
      <ExtensionDispatchModal
        isOpen={Boolean(dispatchModalAlert)}
        onClose={() => setDispatchModalAlert(null)}
        alert={dispatchModalAlert}
      />
    </div>
  );
}
