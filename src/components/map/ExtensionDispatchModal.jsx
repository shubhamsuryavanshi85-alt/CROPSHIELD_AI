import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import { useFarmStore } from '../../store/farmStore';
import { showToast } from '../../hooks/useToast';
import { UserCheck, Clock, MapPin, Phone, Car, ShieldAlert, Send } from 'lucide-react';

const formatStr = (val, fallback = '') => {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object') {
    return val.label || val.name || val.disease || val.title || val.diagnosis || fallback;
  }
  return fallback;
};

export default function ExtensionDispatchModal({ isOpen, onClose, alert }) {
  const { workers, dispatchExtensionWorker } = useFarmStore();
  const [selectedWorkerId, setSelectedWorkerId] = useState(workers[0]?.id || '');
  const [dispatchNotes, setDispatchNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!alert) return null;

  // Filter workers in district or available
  const availableWorkers = workers.filter(
    (w) => w.district === alert.district || w.status === 'available'
  );

  const activeWorker = workers.find((w) => w.id === selectedWorkerId) || workers[0];

  // Estimated travel time (average rural speed 35 km/h)
  const estMinutes = Math.round(((activeWorker?.distanceKm || 12) / 35) * 60);

  const handleConfirmDispatch = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    dispatchExtensionWorker(alert.id, selectedWorkerId, dispatchNotes);

    showToast(
      'Extension Worker Dispatched',
      `${activeWorker?.name || 'Officer'} has been assigned to ${formatStr(alert.disease)} in ${formatStr(alert.district)}. Est. travel time: ${estMinutes} mins.`,
      'success',
      6000
    );

    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dispatch Extension Specialist"
      subtitle={`Assign field officer to contain ${formatStr(alert.disease)} (${formatStr(alert.district)})`}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleConfirmDispatch} className="space-y-5">
        {/* Incident Summary Card */}
        <div className="p-3.5 bg-danger-red/5 border-l-4 border-l-danger-red rounded-lg border border-danger-red/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-soil-dark flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-danger-red" />
              {formatStr(alert.disease)} — {formatStr(alert.crop)}
            </span>
            <Badge variant="critical">{formatStr(alert.severity, 'CRITICAL').toUpperCase()}</Badge>
          </div>
          <p className="text-xs text-soil-dark/80">
            {formatStr(alert.locationName)} • {alert.farmsCount} Farms in cluster ({alert.confirmedFarms} Confirmed)
          </p>
        </div>

        {/* Worker Selection List */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-soil-dark block mb-2">
            Available Extension Officers ({availableWorkers.length})
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableWorkers.map((w) => {
              const isSelected = selectedWorkerId === w.id;
              const wEstTime = Math.round((w.distanceKm / 35) * 60);

              return (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorkerId(w.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-field-green bg-field-green/5 ring-2 ring-field-green shadow-sm'
                      : 'border-soil-dark/15 hover:bg-parchment/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-mist flex items-center justify-center text-field-green font-bold text-xs">
                      {w.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-soil-dark">{w.name}</h4>
                      <p className="text-[11px] text-soil-dark/70">{w.title} • {w.organization}</p>
                      <span className="text-[10px] text-growth font-medium">
                        Specialty: {w.specialty}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono-data font-bold text-soil-dark block">
                      {w.distanceKm} km
                    </span>
                    <span className="text-[10px] text-soil-dark/60 font-mono-data flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3 text-harvest-gold" />
                      ~{wEstTime} min
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calculated Travel Time Card */}
        <div className="p-3 bg-parchment rounded-xl border border-soil-dark/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-sky-blue" />
            <span className="text-soil-dark/80">Estimated Transit to Outbreak Epicenter:</span>
          </div>
          <span className="font-mono-data font-bold text-soil-dark text-sm">
            {estMinutes} minutes ({activeWorker?.distanceKm} km)
          </span>
        </div>

        {/* Field Instructions & Equipment Checklist */}
        <div>
          <label className="text-xs font-semibold text-soil-dark block mb-1">
            Dispatch Instructions & Sampling Protocol
          </label>
          <textarea
            rows={2}
            value={dispatchNotes}
            onChange={(e) => setDispatchNotes(e.target.value)}
            placeholder="e.g., Take 10 foliar leaf punch samples from lower canopy; issue community fungicide notice for Panchavati cluster..."
            className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none focus:border-field-green"
          />
        </div>

        {/* Submit Dispatch */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-soil-dark/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-soil-dark bg-parchment hover:bg-parchment-dark rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-bold text-white bg-field-green hover:bg-field-dark rounded-lg flex items-center gap-1.5 shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>Confirm & Dispatch Officer</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
