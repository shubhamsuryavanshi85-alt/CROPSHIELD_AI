import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage, SUPPORTED_LANGUAGES } from '../../i18n/i18n';
import { ShieldCheck, PhoneCall, Building2, FileText, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const { t } = useTranslation();

  return (
    <footer className="bg-soil-dark text-parchment border-t border-soil-light pt-12 pb-20 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              <span className="font-display font-bold text-xl text-parchment">
                CropShield AI
              </span>
            </div>
            <p className="text-xs text-parchment/70 leading-relaxed">
              Field-first early pathogen & pest surveillance system developed to protect rural crop yields across India.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <ShieldCheck className="w-4 h-4 text-growth" />
              <span className="text-[11px] text-growth font-medium">
                ICAR & CIBRC IPM Guidelines Compliant
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-harvest-gold mb-3">
              Field Operations
            </h4>
            <ul className="space-y-2 text-xs text-parchment/80">
              <li>
                <button
                  onClick={() => onNavigate('diagnose')}
                  className="hover:text-harvest-gold transition-colors"
                >
                  📸 Crop AI Diagnosis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('forecast')}
                  className="hover:text-harvest-gold transition-colors"
                >
                  ⛅ 7-Day Disease Risk Forecast
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-harvest-gold transition-colors"
                >
                  📍 Geospatial Outbreak Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('advisory')}
                  className="hover:text-harvest-gold transition-colors"
                >
                  📖 Multilingual IPDM Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-harvest-gold transition-colors"
                >
                  🏛️ District Official Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Extension & Lab Referral Network */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-harvest-gold mb-3">
              Lab Referral & Escalation
            </h4>
            <div className="space-y-2.5 text-xs text-parchment/80">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-parchment/60 shrink-0 mt-0.5" />
                <span>Krishi Vigyan Kendra (KVK) Network Liaison</span>
              </div>
              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-parchment/60 shrink-0 mt-0.5" />
                <span>Kisan Call Center: <strong>1800-180-1551</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-parchment/60 shrink-0 mt-0.5" />
                <span>Central Insecticides Board & Registration Committee (CIBRC)</span>
              </div>
            </div>
          </div>

          {/* Language Switcher & Disclaimer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-harvest-gold mb-3">
              Languages / भाषा
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeAppLanguage(l.code)}
                  className="text-[11px] px-2.5 py-1 rounded bg-soil-light text-parchment hover:bg-field-green transition-colors"
                >
                  {l.native}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-parchment/50 leading-relaxed">
              *Disclaimer: CropShield AI provides decision support based on pathology patterns. Always confirm critical economic interventions with your local block extension officer.
            </p>
          </div>
        </div>

        <div className="border-t border-soil-light pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-parchment/50 gap-3">
          <p>© {new Date().getFullYear()} CropShield AI. Built for the field, not the boardroom.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-parchment cursor-pointer">Data Privacy</span>
            <span className="hover:text-parchment cursor-pointer">Field Protocols</span>
            <span className="hover:text-parchment cursor-pointer">Extension Worker Login</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
