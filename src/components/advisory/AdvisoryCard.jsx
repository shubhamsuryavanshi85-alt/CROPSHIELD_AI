import React, { useState } from 'react';
import Badge from '../ui/Badge';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, AlertTriangle, PhoneCall, Sparkles, Share2, Volume2 } from 'lucide-react';

export default function AdvisoryCard({ advisory, currentGlobalLang = 'en', onOpenTranslate }) {
  const [activeLang, setActiveLang] = useState(
    advisory.languages[currentGlobalLang] ? currentGlobalLang : 'en'
  );

  const langContent = advisory.languages[activeLang] || advisory.languages.en;

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🌾 CropShield Advisory: ${advisory.crop} — ${advisory.threat}\nUpdated: ${advisory.updatedDate}\n\n• Prevention: ${langContent.prevention[0]}\n• Early Treatment: ${langContent.treatment_early[0]}\n• Safety Caution: ${langContent.cautions[0]}\n\nVerified by ICAR & CropShield IPDM.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="paper-card rounded-2xl p-5 sm:p-6 border border-soil-dark/15 shadow-lg space-y-5 hover:shadow-xl transition-all">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-soil-dark/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">
              {advisory.crop.includes('Tomato') ? '🍅' : advisory.crop.includes('Onion') ? '🧅' : advisory.crop.includes('Chili') ? '🌶️' : advisory.crop.includes('Grape') ? '🍇' : '🌾'}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-soil-dark">
              {advisory.crop}
            </span>
            <span className="text-soil-dark/40">•</span>
            <span className="text-xs font-semibold text-field-green">
              {advisory.severityRating}
            </span>
          </div>

          <h3 className="font-display font-bold text-lg text-soil-dark leading-snug">
            {advisory.threat}
          </h3>

          <div className="flex items-center gap-2 text-[11px] text-soil-dark/60 mt-0.5">
            <span>Updated: {advisory.updatedDate}</span>
            <span>•</span>
            <span className="text-growth font-semibold flex items-center gap-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Validated ✓
            </span>
          </div>
        </div>

        {/* Per-Card Multilingual Switcher */}
        <div className="flex items-center gap-1 bg-parchment p-1 rounded-lg border border-soil-dark/10 self-start sm:self-auto">
          {['en', 'hi', 'mr', 'te', 'ta'].map((code) => {
            const labels = { en: 'EN', hi: 'हिंदी', mr: 'मराठी', te: 'తెలుగు', ta: 'தமிழ்' };
            const isSelected = activeLang === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => setActiveLang(code)}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                  isSelected
                    ? 'bg-field-green text-white shadow-sm'
                    : 'text-soil-dark/70 hover:text-soil-dark'
                }`}
              >
                {labels[code]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prevention Section */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-field-green flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          PREVENTION & CULTURAL PRACTICES
        </h4>
        <ul className="space-y-1 text-xs text-soil-dark/85 bg-mist/40 p-3 rounded-lg border border-mist-dark/30">
          {langContent.prevention.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-growth font-bold">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Early Stage Treatment */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-warning-dark flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-warning-amber" />
          EARLY STAGE TREATMENT
        </h4>
        <ul className="space-y-1 text-xs text-soil-dark/85 bg-warning-amber/5 p-3 rounded-lg border border-warning-amber/20">
          {langContent.treatment_early.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-warning-amber font-bold">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Advanced Stage Treatment */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-danger-red flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-danger-red" />
          ADVANCED STAGE (CONTAINMENT)
        </h4>
        <ul className="space-y-1 text-xs text-soil-dark/85 bg-danger-red/5 p-3 rounded-lg border border-danger-red/20">
          {langContent.treatment_advanced.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-danger-red font-bold">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Safety & Referral Footer */}
      <div className="space-y-2 pt-2 border-t border-soil-dark/10 text-xs">
        {/* Cautions */}
        <div className="p-2.5 bg-danger-red/10 border border-danger-red/30 rounded-lg text-danger-red flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="font-semibold leading-snug">
            {langContent.cautions.join(' • ')}
          </div>
        </div>

        {/* KVK Referral Threshold */}
        <div className="p-2.5 bg-sky-blue/10 border border-sky-blue/30 rounded-lg text-sky-dark flex items-start gap-2">
          <PhoneCall className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="leading-snug">
            <strong>Lab Referral:</strong> {langContent.refer_threshold}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => onOpenTranslate(advisory)}
          className="text-xs text-field-green hover:underline font-semibold flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5 text-harvest-gold" />
          <span>AI Vernacular Customizer</span>
        </button>

        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
