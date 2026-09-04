import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import Badge from '../ui/Badge';
import { ShieldAlert, Send, Eye } from 'lucide-react';

// Create custom colored DivIcons
const createSeverityIcon = (severity, status) => {
  let color = '#5C9E31'; // green
  let pulse = '';

  if (severity === 'critical') {
    color = '#B03A2E'; // red
    pulse = 'animate-ping';
  } else if (severity === 'warning') {
    color = '#C8820A'; // amber
  } else if (severity === 'caution') {
    color = '#D4A017'; // gold
  }

  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 24px; height: 24px; border-radius: 50%; background-color: ${color}; opacity: 0.3;" class="${pulse}"></div>
        <div style="width: 18px; height: 18px; border-radius: 50%; background-color: ${color}; border: 2px solid #FFFFFF; box-shadow: 0 2px 5px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">
          ${severity === 'critical' ? '!' : '●'}
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

// Component to handle pan to selected alert
function MapPanController({ selectedCenter }) {
  const map = useMap();
  useEffect(() => {
    if (selectedCenter) {
      map.flyTo([selectedCenter.lat, selectedCenter.lon], 12, { duration: 1.2 });
    }
  }, [selectedCenter, map]);
  return null;
}

export default function HotspotMap({
  farms = [],
  alerts = [],
  selectedAlert,
  onSelectAlert,
  onOpenDispatch,
  showHeatmap = true,
}) {
  const defaultCenter = [19.5, 74.5]; // Maharashtra central belt

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] rounded-2xl overflow-hidden border border-soil-dark/15 shadow-xl">
      <MapContainer
        center={defaultCenter}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Pan controller */}
        {selectedAlert && (
          <MapPanController
            selectedCenter={{
              lat: farms.find((f) => f.id === selectedAlert.farmId)?.lat || 20.0059,
              lon: farms.find((f) => f.id === selectedAlert.farmId)?.lon || 73.7797,
            }}
          />
        )}

        {/* Heatmap / Density Circles */}
        {showHeatmap &&
          farms
            .filter((f) => f.risk === 'critical' || f.risk === 'high')
            .map((farm) => (
              <Circle
                key={'circle_' + farm.id}
                center={[farm.lat, farm.lon]}
                radius={12000}
                pathOptions={{
                  fillColor: '#B03A2E',
                  fillOpacity: 0.18,
                  color: '#CF4B3D',
                  weight: 1,
                }}
              />
            ))}

        {/* Farm Markers */}
        {farms.map((farm) => {
          const matchingAlert = alerts.find((a) => a.farmId === farm.id);
          const icon = createSeverityIcon(farm.risk, matchingAlert?.status);

          return (
            <Marker
              key={farm.id}
              position={[farm.lat, farm.lon]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  if (matchingAlert) onSelectAlert(matchingAlert);
                },
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 space-y-2 min-w-[200px] text-soil-dark">
                  <div className="flex items-center justify-between pb-1 border-b border-soil-dark/10">
                    <span className="font-bold text-xs">{farm.name}</span>
                    <Badge
                      variant={
                        farm.risk === 'critical'
                          ? 'critical'
                          : farm.risk === 'high'
                          ? 'warning'
                          : 'healthy'
                      }
                    >
                      {farm.risk.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="text-xs space-y-1">
                    <p>
                      <strong>Crop:</strong> {farm.crop} ({farm.stage})
                    </p>
                    <p>
                      <strong>District:</strong> {farm.district}
                    </p>
                    <p className="text-danger-red font-semibold">
                      <strong>Issue:</strong> {farm.activeIssue}
                    </p>
                    <p className="text-[11px] text-soil-dark/60 font-mono-data">
                      Last Check: {farm.lastReport}
                    </p>
                  </div>

                  {matchingAlert && (
                    <div className="pt-2 border-t border-soil-dark/10 flex gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectAlert(matchingAlert)}
                        className="flex-1 py-1.5 px-2 bg-soil-dark text-parchment text-[11px] font-bold rounded hover:bg-soil transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Alert</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenDispatch(matchingAlert)}
                        className="flex-1 py-1.5 px-2 bg-field-green text-white text-[11px] font-bold rounded hover:bg-field-dark transition-colors flex items-center justify-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Dispatch</span>
                      </button>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-soil-dark/15 text-xs text-soil-dark space-y-1.5 pointer-events-auto">
        <span className="text-[10px] font-bold uppercase tracking-wider text-soil-dark/60 block mb-1">
          Severity Legend
        </span>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-danger-red shrink-0" />
          <span>Critical Outbreak (Spreading)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-warning-amber shrink-0" />
          <span>Warning (AI-Flagged)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-harvest-gold shrink-0" />
          <span>Caution (Weather Elevated)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-growth shrink-0" />
          <span>Monitored (Clear)</span>
        </div>
      </div>
    </div>
  );
}
