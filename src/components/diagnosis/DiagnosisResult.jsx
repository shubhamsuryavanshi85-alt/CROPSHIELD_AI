import React, { useState } from 'react';
import ConfidenceMeter from '../ui/ConfidenceMeter';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import FollowUpScheduler from './FollowUpScheduler';
import { showToast } from '../../hooks/useToast';
import {
  AlertTriangle,
  CheckCircle2,
  Share2,
  Building2,
  Calendar,
  FlaskConical,
  Volume2,
  VolumeX,
  ExternalLink,
  Info,
  ShieldCheck,
  Send,
  ArrowRight,
} from 'lucide-react';

export default function DiagnosisResult({ result, cropType, location }) {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [extensionOfficerName, setExtensionOfficerName] = useState('Dr. Vivek Sawant (KVK)');
  const [extensionNotes, setExtensionNotes] = useState('');

  if (!result) return null;

  const {
    diagnosis,
    scientific_name,
    confidence = 85,
    severity = 'moderate',
    spread_risk = 'high',
    description,
    immediate_actions = [],
    chemical_options = [],
    organic_options = [],
    refer_to_lab = false,
    refer_reason,
    follow_up_days = 3,
    alternative_diagnoses = [],
    symptoms_detected = [],
  } = result;

  // Severity border styling
  let borderLeftStyle = 'border-l-4 border-l-warning-amber';
  let severityVariant = 'warning';
  if (severity === 'critical' || severity === 'high') {
    borderLeftStyle = 'border-l-4 border-l-danger-red';
    severityVariant = 'critical';
  } else if (severity === 'low') {
    borderLeftStyle = 'border-l-4 border-l-growth';
    severityVariant = 'healthy';
  }

  // WhatsApp share function matching prompt specifications
  const handleShareWhatsApp = () => {
    const actionsSummary = immediate_actions.slice(0, 2).map((a, i) => `${i + 1}. ${a}`).join('\n');
    const text = encodeURIComponent(
      `🌾 CropShield AI Alert\nCrop: ${cropType || 'Field Crop'}\nDiagnosis: ${diagnosis} (${scientific_name || ''})\nSeverity: ${severity.toUpperCase()} | AI Confidence: ${confidence}%\nLocation: ${location || 'Field'}\n\nImmediate Actions:\n${actionsSummary}\n\nRecommended Spray: ${chemical_options[0]?.name || 'Check IPM Advisory'} @ ${chemical_options[0]?.dosage || 'As per label'}\nPre-Harvest Interval (PHI): ${chemical_options[0]?.phi_days || 'N/A'} days\n\nVerified via CropShield AI Field Diagnostic System.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Text to Speech
  const getSpeechLang = (code) => {
    switch (code) {
      case 'hi': return 'hi-IN';
      case 'mr': return 'mr-IN'; // Marathi is often supported as mr-IN
      case 'te': return 'te-IN';
      case 'ta': return 'ta-IN';
      default: return 'en-IN';
    }
  };

  const toggleSpeech = () => {
    if (!window.speechSynthesis) {
      showToast('Speech Error', 'Text-to-speech is not supported on this browser.', 'warning');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const speechText = `${diagnosis}. ${description}. ${immediate_actions[0] || ''}`;
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = getSpeechLang(result.advisory_language_key || 'en');
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleSendToExtension = (e) => {
    e.preventDefault();
    showToast(
      'Sent to Extension Officer',
      `Diagnostic report for ${diagnosis} dispatched to ${extensionOfficerName}.`,
      'success'
    );
    setShowExtensionModal(false);
  };

  const handleSendLabRequest = (e) => {
    e.preventDefault();
    showToast(
      'KVK Lab Referral Registered',
      `Pathology sample pickup request submitted for ${diagnosis}. Ticket #LAB-${Math.floor(1000 + Math.random() * 9000)}`,
      'info'
    );
    setShowLabModal(false);
  };

  return (
    <div className={`paper-card rounded-xl p-5 sm:p-6 shadow-xl ${borderLeftStyle} space-y-6 transition-all`}>
      {/* Header Banner */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Badge variant={severityVariant}>
              <AlertTriangle className="w-3.5 h-3.5" />
              {severity === 'low' ? 'HEALTHY / LOW' : `${severity.toUpperCase()} SEVERITY`}
            </Badge>
            {spread_risk && (
              <Badge variant={spread_risk === 'high' ? 'critical' : 'warning'}>
                Spread Risk: {spread_risk.toUpperCase()}
              </Badge>
            )}
          </div>

          <button
            type="button"
            onClick={toggleSpeech}
            className="p-1.5 rounded-lg bg-soil-dark/5 hover:bg-soil-dark/10 text-soil-dark transition-colors flex items-center gap-1 text-xs"
            title={isSpeaking ? 'Stop voice readout' : 'Read aloud diagnosis'}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-danger-red" /> : <Volume2 className="w-4 h-4 text-field-green" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
          </button>
        </div>

        <h2 className="font-display font-bold text-2xl text-soil-dark leading-snug">
          {diagnosis}
        </h2>
        {scientific_name && (
          <p className="font-serif italic text-sm text-soil-dark/70 mt-0.5">
            {scientific_name}
          </p>
        )}
      </div>

      {/* Confidence Meter */}
      <div className="p-3 bg-parchment/70 rounded-lg border border-soil-dark/10">
        <ConfidenceMeter confidence={confidence} label="Pathology Confidence Score" />
      </div>

      {/* What You're Seeing */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-soil-dark/70 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-sky-blue" />
          What You're Seeing (Pathological Signs)
        </h3>
        <p className="text-xs sm:text-sm text-soil-dark/85 leading-relaxed bg-white p-3 rounded-lg border border-soil-dark/10">
          {description}
        </p>

        {/* Symptoms Detected Highlights */}
        {symptoms_detected && symptoms_detected.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {symptoms_detected.map((sym, idx) => (
              <span key={idx} className="px-2 py-1 bg-soil-dark/5 text-soil-dark text-[10px] rounded-md font-medium border border-soil-dark/10">
                🔍 {sym}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Alternative Possibilities */}
      {alternative_diagnoses && alternative_diagnoses.length > 0 && (
        <div className="space-y-1.5 pt-1">
           <h3 className="text-xs font-bold uppercase tracking-wider text-soil-dark/70 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-warning-amber" />
            Alternative AI Possibilities
          </h3>
          <div className="bg-parchment/30 p-2.5 rounded-lg border border-soil-dark/10 space-y-1">
             {alternative_diagnoses.map((alt, idx) => (
               <div key={idx} className="flex items-center justify-between text-[11px] text-soil-dark/80">
                 <span>{alt.name}</span>
                 <span className="font-mono-data font-semibold">{alt.probability}% match</span>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* Immediate Field Actions */}
      {immediate_actions.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-soil-dark/70 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-growth" />
            Immediate Field Actions
          </h3>
          <ol className="space-y-1.5">
            {immediate_actions.map((act, idx) => (
              <li
                key={idx}
                className="text-xs text-soil-dark flex items-start gap-2.5 p-2 bg-mist/50 rounded-md border border-mist-dark/30"
              >
                <span className="w-5 h-5 rounded-full bg-field-green text-white font-mono-data font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug pt-0.5">{act}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Safe Chemical Use (CIBRC Compliant) */}
      {chemical_options.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-soil-dark/70 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-field-green" />
              Safe Chemical Use (CIBRC Compliant)
            </h3>
            <span className="text-[10px] text-soil-dark/50 font-mono-data">Pre-Harvest Guard</span>
          </div>

          <div className="space-y-2">
            {chemical_options.map((chem, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-lg border border-soil-dark/15 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-soil-dark">{chem.name}</h4>
                  <span className="text-[11px] font-mono-data font-semibold text-field-green bg-field-green/10 px-2 py-0.5 rounded">
                    {chem.dosage}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-soil-dark/75 pt-1 border-t border-soil-dark/5">
                  <div className="flex items-center gap-1 text-danger-red font-medium">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Pre-Harvest Interval (PHI): <strong>{chem.phi_days} days</strong></span>
                  </div>
                  {chem.registered_crops && (
                    <div className="text-soil-dark/60">
                      ✓ Registered: {chem.registered_crops.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Organic & Biological Alternatives */}
      {organic_options.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-soil-dark/70 flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5 text-harvest-gold" />
            Organic & Biological Alternatives
          </h3>
          <ul className="space-y-1 text-xs text-soil-dark/85 bg-parchment/40 p-2.5 rounded-lg border border-soil-dark/10">
            {organic_options.map((org, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-growth font-bold">•</span>
                <span>{org}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lab Referral Warning if Needed */}
      {refer_to_lab && (
        <div className="p-3.5 bg-warning-amber/10 border border-warning-amber/30 rounded-lg flex items-start gap-3">
          <Building2 className="w-5 h-5 text-warning-dark shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-xs font-bold text-soil-dark uppercase tracking-wide">
              KVK / University Lab Referral Recommended
            </h4>
            <p className="text-xs text-soil-dark/80 mt-0.5 leading-snug">
              {refer_reason || 'High epidemic potential. Submit plant tissue sample for micro-assay confirmation.'}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-2 border-t border-soil-dark/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* WhatsApp Share */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Share2 className="w-4 h-4" />
          <span>Share via WhatsApp</span>
        </button>

        {/* Share with Extension Worker */}
        <button
          type="button"
          onClick={() => setShowExtensionModal(true)}
          className="w-full py-2.5 px-3 bg-soil-dark hover:bg-soil text-parchment text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Send className="w-4 h-4 text-harvest-gold" />
          <span>Share with Extension Worker</span>
        </button>

        {/* Set Follow-up Reminder */}
        <button
          type="button"
          onClick={() => setShowReminderModal(true)}
          className="w-full py-2.5 px-3 bg-field-green hover:bg-field-dark text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Calendar className="w-4 h-4 text-harvest-gold" />
          <span>Set Follow-up Reminder ({follow_up_days}d)</span>
        </button>

        {/* Request Lab Confirmation */}
        <button
          type="button"
          onClick={() => setShowLabModal(true)}
          className="w-full py-2.5 px-3 bg-white hover:bg-soil-dark/5 text-soil-dark border border-soil-dark/20 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <FlaskConical className="w-4 h-4 text-sky-blue" />
          <span>Request Lab Confirmation</span>
        </button>
      </div>

      {/* Crop Damage Government Assistance Banner */}
      <div className="p-3.5 bg-danger-red/10 border border-danger-red/30 rounded-xl space-y-2 text-xs text-soil-dark">
        <div className="flex items-center gap-1.5 font-bold text-danger-red">
          <Building2 className="w-4 h-4" />
          <span>Need Crop-Loss Assistance?</span>
        </div>
        <p className="text-[11px] text-soil-dark/80 leading-relaxed">
          If your crop has suffered significant disease or weather damage, check if PMFBY crop insurance or state revenue relief applies.
        </p>
        <button
          type="button"
          onClick={() => { window.location.hash = '#/support'; }}
          className="w-full py-2 bg-danger-red hover:bg-danger-dark text-white rounded-lg font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1"
        >
          <span>Check Farmer Support Assistance</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Follow-up Reminder Modal */}
      <Modal
        isOpen={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        title="Schedule Follow-up Check"
        subtitle={`Recommended: Check back in ${follow_up_days} days to monitor ${diagnosis}`}
      >
        <FollowUpScheduler
          diagnosis={result}
          crop={cropType}
          defaultDays={follow_up_days}
          onClose={() => setShowReminderModal(false)}
        />
      </Modal>

      {/* Extension Worker Dispatch Modal */}
      <Modal
        isOpen={showExtensionModal}
        onClose={() => setShowExtensionModal(false)}
        title="Send Report to Extension Worker"
        subtitle="Forward this diagnostic result directly to your block agriculture specialist"
      >
        <form onSubmit={handleSendToExtension} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-soil-dark block mb-1">
              Select Field Officer
            </label>
            <select
              value={extensionOfficerName}
              onChange={(e) => setExtensionOfficerName(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark"
            >
              <option value="Dr. Vivek Sawant (KVK Nashik)">Dr. Vivek Sawant (KVK Nashik — Plant Pathologist)</option>
              <option value="Smt. Anjali Borse (Dept of Agriculture)">Smt. Anjali Borse (Dept of Agriculture — IPM Specialist)</option>
              <option value="Dr. N. Sudhakar Rao (ANGRAU)">Dr. N. Sudhakar Rao (ANGRAU — Entomology)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-soil-dark block mb-1">
              Field Notes / Parcel Location
            </label>
            <textarea
              rows={3}
              value={extensionNotes}
              onChange={(e) => setExtensionNotes(e.target.value)}
              placeholder="e.g., Plot 3 near canal, ~20 plants showing water-soaked lesions. Please advise if second spray is required."
              className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-field-green text-white text-xs font-bold rounded-lg hover:bg-field-dark transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch to Extension Officer</span>
          </button>
        </form>
      </Modal>

      {/* Lab Request Modal */}
      <Modal
        isOpen={showLabModal}
        onClose={() => setShowLabModal(false)}
        title="Request KVK Diagnostic Lab Confirmation"
        subtitle="Submit a digital voucher for leaf tissue sample analysis"
      >
        <form onSubmit={handleSendLabRequest} className="space-y-4">
          <div className="p-3 bg-sky-blue/10 border border-sky-blue/30 rounded-lg text-xs text-soil-dark space-y-1">
            <p className="font-bold">Krishi Vigyan Kendra Pathology Clinic</p>
            <p className="text-soil-dark/70">A field extension technician will collect a foliar sample within 24–48 hours for PCR / microscopic spore assay.</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-soil-dark block mb-1">Farmer Contact Phone</label>
            <input
              type="tel"
              defaultValue="+91 98220 14890"
              className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-sky-blue text-white text-xs font-bold rounded-lg hover:bg-sky-dark transition-colors flex items-center justify-center gap-2"
          >
            <FlaskConical className="w-4 h-4" />
            <span>Submit Lab Referral Request</span>
          </button>
        </form>
      </Modal>
    </div>
  );
}
