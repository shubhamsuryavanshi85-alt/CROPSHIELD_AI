import React from 'react';
import Modal from '../ui/Modal';
import {
  HelpCircle,
  Users,
  Banknote,
  FileText,
  Clock,
  Phone,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export default function SchemeDetailModal({ isOpen, onClose, scheme }) {
  if (!scheme) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={scheme.schemeName}
      subtitle={`Verified Information (${scheme.level.toUpperCase()} • ${scheme.state})`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 text-soil-dark">
        {/* Short Summary Box */}
        <div className="p-4 bg-parchment rounded-xl border border-soil-dark/15 text-xs space-y-1">
          <span className="font-mono-data text-[10px] text-soil-dark/60 uppercase block">Source: {scheme.sourceName}</span>
          <p className="text-soil-dark/90 leading-relaxed font-sans">{scheme.shortDescription}</p>
        </div>

        {/* 1. What is this scheme */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-soil-dark flex items-center gap-1.5 border-b border-soil-dark/10 pb-1">
            <HelpCircle className="w-4 h-4 text-field-green" />
            <span>🌾 What is this scheme?</span>
          </h4>
          <p className="text-xs text-soil-dark/80 leading-relaxed font-sans">{scheme.shortDescription}</p>
        </div>

        {/* 2. Who may benefit */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-soil-dark flex items-center gap-1.5 border-b border-soil-dark/10 pb-1">
            <Users className="w-4 h-4 text-sky-blue" />
            <span>👨‍🌾 Who may benefit?</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-soil-dark/80">
            {scheme.eligibility.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-field-green font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Benefits & Assistance */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-soil-dark flex items-center gap-1.5 border-b border-soil-dark/10 pb-1">
            <Banknote className="w-4 h-4 text-harvest-gold" />
            <span>💰 What kind of assistance is provided?</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-soil-dark/80">
            {scheme.benefits.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-harvest-gold font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Documents Required */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-soil-dark flex items-center gap-1.5 border-b border-soil-dark/10 pb-1">
            <FileText className="w-4 h-4 text-warning-amber" />
            <span>📋 What documents may be required?</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {scheme.documents.map((doc, idx) => (
              <div key={idx} className="p-2.5 bg-white border border-soil-dark/10 rounded-lg text-soil-dark/90">
                📄 {doc}
              </div>
            ))}
          </div>
        </div>

        {/* 5. How to proceed & 72-Hour Rule */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-soil-dark flex items-center gap-1.5 border-b border-soil-dark/10 pb-1">
            <Clock className="w-4 h-4 text-danger-red" />
            <span>📝 How to proceed? (Claim / Application Workflow)</span>
          </h4>
          <ol className="space-y-2 text-xs text-soil-dark/80">
            {scheme.applicationSteps.map((stepText, idx) => (
              <li key={idx} className="flex items-start gap-2 p-2 bg-parchment/40 rounded-lg">
                <span className="w-5 h-5 rounded-full bg-field-green text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{stepText}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Official CTAs & Helpline */}
        <div className="p-4 bg-soil-dark text-parchment rounded-xl space-y-3 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase font-mono-data text-parchment/60 block">Verified Official Source</span>
              <span className="font-bold text-xs text-harvest-gold">{scheme.sourceName}</span>
            </div>
            {scheme.helpline && (
              <a
                href={`tel:${scheme.helpline}`}
                className="px-3 py-1.5 bg-danger-red hover:bg-danger-dark text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Helpline: {scheme.helpline}</span>
              </a>
            )}
          </div>

          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-field-green hover:bg-growth text-white rounded-lg text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Visit Official {scheme.schemeName.split(' ')[0]} Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="text-[10px] text-parchment/50 font-mono-data flex justify-between pt-1">
            <span>Last Verified: {scheme.lastVerified}</span>
            <span>Official Government Source</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
