import React from 'react';
import Badge from '../ui/Badge';
import { ShieldAlert, Send, Eye, CheckCircle2, Filter, Layers } from 'lucide-react';

export default function ActiveAlertsSidebar({
  alerts = [],
  selectedAlert,
  onSelectAlert,
  onOpenDispatch,
  filterStatus,
  setFilterStatus,
  filterCrop,
  setFilterCrop,
  showHeatmap,
  setShowHeatmap,
}) {
  const filteredAlerts = alerts.filter((a) => {
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    if (filterCrop !== 'all' && a.crop !== filterCrop) return false;
    return true;
  });

  return (
    <div className="paper-card rounded-2xl p-5 border border-soil-dark/10 shadow-xl flex flex-col h-[520px] sm:h-[600px]">
      {/* Sidebar Header & Filters */}
      <div className="pb-4 border-b border-soil-dark/10 space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-soil-dark flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-danger-red" />
            Active Field Alerts ({filteredAlerts.length})
          </h3>
          <button
            type="button"
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 border transition-colors ${
              showHeatmap
                ? 'bg-danger-red/10 text-danger-red border-danger-red/30'
                : 'bg-parchment text-soil-dark border-soil-dark/15'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Heatmap {showHeatmap ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full text-xs p-1.5 bg-parchment border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none"
          >
            <option value="all">All Alert Statuses</option>
            <option value="ai_flagged">AI-Flagged (Pending)</option>
            <option value="confirmed">Confirmed Outbreaks</option>
            <option value="dispatched">Worker Dispatched</option>
          </select>

          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="w-full text-xs p-1.5 bg-parchment border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none"
          >
            <option value="all">All Crops</option>
            <option value="Tomato">Tomato</option>
            <option value="Onion">Onion</option>
            <option value="Grape">Grape</option>
            <option value="Chili">Chili</option>
            <option value="Pomegranate">Pomegranate</option>
          </select>
        </div>
      </div>

      {/* Alerts Scrollable List */}
      <div className="flex-1 overflow-y-auto divide-y divide-soil-dark/10 pr-1 mt-2 space-y-2">
        {filteredAlerts.length === 0 ? (
          <div className="text-center p-8 text-soil-dark/60 text-xs">
            No active alerts matching your filters.
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isSelected = selectedAlert?.id === alert.id;
            const isCritical = alert.severity === 'critical';

            let borderStyle = 'border-l-4 border-l-warning-amber';
            if (isCritical) borderStyle = 'border-l-4 border-l-danger-red';
            if (alert.status === 'dispatched') borderStyle = 'border-l-4 border-l-sky-blue';

            return (
              <div
                key={alert.id}
                onClick={() => onSelectAlert(alert)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${borderStyle} ${
                  isSelected
                    ? 'bg-parchment/90 ring-2 ring-soil-dark shadow-md'
                    : 'bg-white hover:bg-parchment/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <span className="text-[10px] font-bold text-soil-dark/60 uppercase">
                      {alert.district} • {alert.crop}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-soil-dark leading-tight">
                      {alert.disease}
                    </h4>
                  </div>
                  <Badge variant={isCritical ? 'critical' : 'warning'}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>

                <p className="text-[11px] text-soil-dark/75 line-clamp-2 mt-1">
                  {alert.description}
                </p>

                <div className="flex items-center justify-between text-[10px] text-soil-dark/60 font-mono-data mt-2 pt-2 border-t border-soil-dark/5">
                  <span>{alert.farmsCount} Farms Affected ({alert.confirmedFarms} Confirmed)</span>
                  <span className="font-semibold text-field-green">
                    {alert.status === 'dispatched' ? '⚡ Team Dispatched' : alert.status === 'confirmed' ? '✓ Confirmed' : '⚠ AI-Flagged'}
                  </span>
                </div>

                {alert.assignedWorker && (
                  <div className="mt-1.5 p-1.5 bg-sky-blue/10 rounded text-[10px] text-sky-dark font-medium truncate">
                    Assigned: {alert.assignedWorker}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAlert(alert);
                    }}
                    className="flex-1 py-1 px-2 bg-soil-dark/5 hover:bg-soil-dark/10 text-soil-dark rounded text-[11px] font-semibold flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Map</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDispatch(alert);
                    }}
                    className={`flex-1 py-1 px-2 text-white rounded text-[11px] font-semibold flex items-center justify-center gap-1 ${
                      alert.status === 'dispatched'
                        ? 'bg-growth hover:bg-growth-dark'
                        : 'bg-field-green hover:bg-field-dark'
                    }`}
                  >
                    <Send className="w-3 h-3" />
                    <span>{alert.status === 'dispatched' ? 'Reassign' : 'Dispatch'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
