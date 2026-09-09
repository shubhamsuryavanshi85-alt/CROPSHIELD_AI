import React, { useState } from 'react';
import { useFarmStore } from '../../store/farmStore';
import Badge from '../ui/Badge';
import {
  CheckCircle2,
  XCircle,
  FlaskConical,
  MapPin,
  MessageSquare,
  Clock,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

const formatText = (val) => {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object') {
    return val.label || val.name || val.diagnosis || val.title || val.disease || '';
  }
  return '';
};

export default function ExpertValidationCenter() {
  const { diagnoses, validateDiagnosis } = useFarmStore();
  const [selectedCase, setSelectedCase] = useState(null);
  const [expertNotes, setExpertNotes] = useState('');

  const safeDiagnoses = Array.isArray(diagnoses) ? diagnoses : [];
  const pendingCases = safeDiagnoses.filter((d) => d && d.status === 'pending_validation');

  const handleValidate = (decision) => {
    if (!selectedCase) return;
    validateDiagnosis(selectedCase.id, decision, expertNotes);
    setSelectedCase(null);
    setExpertNotes('');
  };

  if (pendingCases.length === 0) {
    return (
      <div className="paper-card rounded-xl p-6 border border-soil-dark/10 bg-white/50 text-center">
        <ShieldCheck className="w-10 h-10 text-field-green mx-auto mb-3 opacity-50" />
        <h3 className="font-display font-bold text-lg text-soil-dark">All Caught Up</h3>
        <p className="text-xs text-soil-dark/70">No pending AI diagnoses require expert validation at this time.</p>
      </div>
    );
  }

  return (
    <div className="paper-card rounded-xl border border-soil-dark/10 shadow-sm overflow-hidden flex flex-col md:flex-row h-[500px]">
      {/* Left Column: Queue */}
      <div className="w-full md:w-1/3 border-r border-soil-dark/10 bg-mist/20 flex flex-col">
        <div className="p-4 border-b border-soil-dark/10 bg-white">
          <h2 className="font-bold text-sm text-soil-dark flex items-center gap-2">
            <Clock className="w-4 h-4 text-warning-amber" />
            Validation Queue ({pendingCases.length})
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {pendingCases.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(c)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedCase?.id === c.id
                  ? 'bg-white border-field-green shadow-sm ring-1 ring-field-green'
                  : 'bg-white border-soil-dark/10 hover:border-soil-dark/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-soil-dark truncate">{formatText(c.diagnosis)}</span>
                <Badge variant={c.severity === 'high' || c.severity === 'critical' ? 'critical' : 'warning'}>
                  {c.confidence}%
                </Badge>
              </div>
              <div className="text-[10px] text-soil-dark/70 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {formatText(c.location) || 'Unknown'} • {formatText(c.cropType)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Case Details & Action */}
      <div className="w-full md:w-2/3 bg-white flex flex-col">
        {selectedCase ? (
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            <div>
              <div className="text-[10px] font-mono-data text-soil-dark/50 mb-1">Observation ID: {selectedCase.id}</div>
              <h3 className="font-display font-bold text-xl text-soil-dark">{formatText(selectedCase.diagnosis)}</h3>
              <p className="text-xs text-soil-dark/70">
                Crop: <span className="font-semibold text-soil-dark">{formatText(selectedCase.cropType)}</span> | 
                Location: <span className="font-semibold text-soil-dark">{formatText(selectedCase.location)}</span>
              </p>
            </div>

            <div className="p-3 bg-parchment/40 rounded-lg border border-soil-dark/10 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-soil-dark/70">AI Prediction Details</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Confidence: <span className="font-bold text-field-green">{selectedCase.confidence}%</span></div>
                <div>Severity: <span className="font-bold text-danger-red capitalize">{selectedCase.severity}</span></div>
              </div>
              {selectedCase.description && (
                <p className="text-xs text-soil-dark/80 mt-2">{selectedCase.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-soil-dark/70 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Expert Notes
              </label>
              <textarea
                rows="3"
                value={expertNotes}
                onChange={(e) => setExpertNotes(e.target.value)}
                placeholder="Add validation remarks, corrections, or field advice..."
                className="w-full text-xs p-3 bg-mist/30 border border-soil-dark/20 rounded-lg focus:outline-none focus:border-field-green"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-soil-dark/70">Expert Decision</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => handleValidate('confirmed')}
                  className="py-2 px-3 bg-growth/10 hover:bg-growth/20 text-growth border border-growth/30 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" /> Confirmed
                </button>
                <button
                  onClick={() => handleValidate('rejected')}
                  className="py-2 px-3 bg-danger-red/10 hover:bg-danger-red/20 text-danger-red border border-danger-red/30 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <XCircle className="w-4 h-4" /> Rejected
                </button>
                <button
                  onClick={() => handleValidate('needs_lab_test')}
                  className="py-2 px-3 bg-sky-blue/10 hover:bg-sky-blue/20 text-sky-blue border border-sky-blue/30 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FlaskConical className="w-4 h-4" /> Request Lab
                </button>
                <button
                  onClick={() => handleValidate('needs_field_visit')}
                  className="py-2 px-3 bg-warning-amber/10 hover:bg-warning-amber/20 text-warning-dark border border-warning-amber/30 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-4 h-4" /> Field Visit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-soil-dark/40 text-sm">
            Select a case from the queue to validate.
          </div>
        )}
      </div>
    </div>
  );
}
