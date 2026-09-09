import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CropDamageWizard from '../components/support/CropDamageWizard';
import SchemeSearch from '../components/support/SchemeSearch';
import SchemeDetailModal from '../components/support/SchemeDetailModal';
import { SCHEMES } from '../data/schemeData';
import {
  ShieldAlert,
  Sparkles,
  Phone,
  ExternalLink,
  HelpCircle,
  Building2,
  FileText,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function FarmerSupport({ onNavigate }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('wizard'); // 'wizard' | 'search' | 'pmfby' | 'mp_rbc'
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState(null);

  const pmfbyScheme = SCHEMES.find((s) => s.id === 'pmfby');
  const mpScheme = SCHEMES.find((s) => s.id === 'mp_rbc_6_4');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-field-green/10 text-field-green text-xs font-semibold mb-2">
          <Building2 className="w-3.5 h-3.5" />
          Government Schemes & Crop Insurance Guidance
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-soil-dark">
          🌾 Farmer Support & Crop Loss Assistance
        </h1>
        <p className="text-xs sm:text-sm text-soil-dark/70 mt-1 max-w-2xl">
          Check potential PMFBY crop insurance eligibility, state revenue relief (RBC 6-4 / SDRF), and official government farmer welfare schemes.
        </p>
      </div>

      {/* Primary CTA Hero Banner: MY CROP IS DAMAGED */}
      <section className="relative rounded-2xl overflow-hidden shadow-xl border border-danger-red/30 bg-soil-dark p-6 sm:p-8 text-parchment">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-danger-red text-white text-xs font-bold uppercase tracking-wider animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            🚨 Emergency Crop Damage Assistance
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Has your crop suffered weather, flood, or pest damage?
          </h2>

          <p className="text-xs sm:text-sm text-parchment/90 leading-relaxed font-sans font-light">
            Check which government assistance, state relief grants (RBC 6-4), or PMFBY crop insurance policies may apply to your location and crop.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('wizard')}
              className="px-6 py-3 bg-harvest-gold hover:bg-harvest-light text-soil-dark rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-soil-dark" />
              <span>Check Assistance Options</span>
            </button>

            <a
              href="tel:14447"
              className="px-4 py-3 bg-soil border border-soil-light text-parchment hover:bg-soil-light rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-danger-red" />
              <span>PMFBY Helpline: 14447</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-soil-dark/10">
        <button
          onClick={() => setActiveTab('wizard')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'wizard'
              ? 'bg-field-green text-white shadow-md'
              : 'bg-parchment/50 text-soil-dark hover:bg-parchment'
          }`}
        >
          <span>🚨 Crop Damage Check</span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'search'
              ? 'bg-field-green text-white shadow-md'
              : 'bg-parchment/50 text-soil-dark hover:bg-parchment'
          }`}
        >
          <span>🔎 Search All Schemes</span>
        </button>

        <button
          onClick={() => setSelectedSchemeForModal(pmfbyScheme)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-parchment/50 text-soil-dark hover:bg-parchment transition-all whitespace-nowrap flex items-center gap-1.5"
        >
          <span>🛡️ PMFBY Insurance</span>
        </button>

        <button
          onClick={() => setSelectedSchemeForModal(mpScheme)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-parchment/50 text-soil-dark hover:bg-parchment transition-all whitespace-nowrap flex items-center gap-1.5"
        >
          <span>🏛️ MP RBC 6-4 Relief</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'wizard' && (
        <CropDamageWizard
          onOpenDetail={(sch) => setSelectedSchemeForModal(sch)}
          onNavigate={onNavigate}
        />
      )}

      {activeTab === 'search' && (
        <SchemeSearch
          onOpenDetail={(sch) => setSelectedSchemeForModal(sch)}
        />
      )}

      {/* Feature Cards Grid (PMFBY & MP State Relief Spotlight) */}
      <section className="space-y-4 pt-4">
        <h3 className="font-display font-bold text-lg text-soil-dark">
          Key Assistance & Official Schemes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: PMFBY */}
          {pmfbyScheme && (
            <div className="paper-card rounded-2xl p-6 border border-soil-dark/15 shadow-md flex flex-col justify-between space-y-4 bg-white">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono-data font-bold px-2 py-0.5 rounded bg-growth/15 text-growth uppercase">
                    Central Insurance Scheme
                  </span>
                  <span className="text-xs font-bold text-danger-red flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> 14447
                  </span>
                </div>

                <h4 className="font-display font-bold text-lg text-soil-dark">
                  Pradhan Mantri Fasal Bima Yojana (PMFBY)
                </h4>

                <p className="text-xs text-soil-dark/80 mt-2 leading-relaxed">
                  Comprehensive crop insurance covering non-preventable natural risks, localized hailstorm/inundation, and post-harvest damage.
                </p>

                <div className="p-3 bg-parchment/60 rounded-xl text-xs space-y-1.5 mt-3">
                  <span className="font-bold text-soil-dark block text-[11px] uppercase tracking-wider">
                    ⚡ 72-Hour Crop Loss Reporting Rule:
                  </span>
                  <p className="text-soil-dark/80 text-[11px]">
                    For localized crop loss (hailstorm, flood, landslide), report within 72 hours via official PMFBY helpline 14447 or NCIP App.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-soil-dark/10 flex items-center justify-between">
                <a
                  href="https://pmfby.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-field-green font-bold hover:underline flex items-center gap-1"
                >
                  <span>Official PMFBY Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedSchemeForModal(pmfbyScheme)}
                  className="px-3.5 py-1.5 bg-field-green hover:bg-field-dark text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                >
                  View Full Details
                </button>
              </div>
            </div>
          )}

          {/* Card 2: MP RBC 6-4 */}
          {mpScheme && (
            <div className="paper-card rounded-2xl p-6 border border-soil-dark/15 shadow-md flex flex-col justify-between space-y-4 bg-white">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono-data font-bold px-2 py-0.5 rounded bg-growth/15 text-growth uppercase">
                    Madhya Pradesh State Relief
                  </span>
                  <span className="text-xs font-bold text-soil-dark font-mono-data">
                    RBC 6-4 Scale
                  </span>
                </div>

                <h4 className="font-display font-bold text-lg text-soil-dark">
                  Madhya Pradesh RBC 6-4 Crop Damage Relief
                </h4>

                <p className="text-xs text-soil-dark/80 mt-2 leading-relaxed">
                  Financial assistance under Revenue Book Circular (RBC) 6-4 for farmers facing 33%+ crop damage due to drought, flood, or hailstorm in MP.
                </p>

                <div className="p-3 bg-parchment/60 rounded-xl text-xs space-y-1.5 mt-3">
                  <span className="font-bold text-soil-dark block text-[11px] uppercase tracking-wider">
                    📋 Patwari Panchnama & SAARA Portal:
                  </span>
                  <p className="text-soil-dark/80 text-[11px]">
                    Report loss to local Patwari or Tehsildar. Field loss survey records are logged directly on official SAARA MP Portal.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-soil-dark/10 flex items-center justify-between">
                <a
                  href="https://saara.mp.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-field-green font-bold hover:underline flex items-center gap-1"
                >
                  <span>SAARA MP Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedSchemeForModal(mpScheme)}
                  className="px-3.5 py-1.5 bg-field-green hover:bg-field-dark text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                >
                  View Full Details
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Scheme Detail Modal Popup */}
      <SchemeDetailModal
        isOpen={Boolean(selectedSchemeForModal)}
        onClose={() => setSelectedSchemeForModal(null)}
        scheme={selectedSchemeForModal}
      />
    </div>
  );
}
