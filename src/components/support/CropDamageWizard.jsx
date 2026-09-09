import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SCHEMES } from '../../data/schemeData';
import { useGeolocation } from '../../hooks/useGeolocation';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  MapPin,
  Sprout,
  CloudRain,
  Ruler,
  HelpCircle,
  ExternalLink,
  Phone,
  Info,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

export default function CropDamageWizard({ onOpenDetail, onNavigate }) {
  const { t, i18n } = useTranslation();
  const { coords, districts } = useGeolocation();

  const [step, setStep] = useState(1);

  // Form states
  const [selectedState, setSelectedState] = useState('Madhya Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState(coords.districtName || 'Ujjain');
  const [selectedCrop, setSelectedCrop] = useState('Soybean');
  const [damageCause, setDamageCause] = useState('flood');
  const [affectedArea, setAffectedArea] = useState('2');
  const [areaUnit, setAreaUnit] = useState('Acres');
  const [insuranceStatus, setInsuranceStatus] = useState('yes');

  const statesList = [
    'Madhya Pradesh',
    'Maharashtra',
    'Andhra Pradesh',
    'Rajasthan',
    'Uttar Pradesh',
    'Gujarat',
    'Other State',
  ];

  const cropsList = [
    'Soybean',
    'Wheat',
    'Rice',
    'Cotton',
    'Onion',
    'Maize',
    'Gram',
    'Tomato',
    'Mustard',
    'Chili',
    'Other Crop',
  ];

  const damageOptions = [
    { id: 'flood', label: '🌧️ Flood / Excess Rainfall', desc: 'Inundation, waterlogging, monsoon overflow' },
    { id: 'drought', label: '☀️ Drought / Dry Spell', desc: 'Deficient rainfall, crop wilting' },
    { id: 'hailstorm', label: '🧊 Hailstorm / Icefall', desc: 'Mechanical leaf & stem destruction' },
    { id: 'cyclone', label: '🌪️ Cyclone / High Wind', desc: 'Stem lodging, crop flattening' },
    { id: 'pest', label: '🐛 Severe Pest Attack', desc: 'Thrips, caterpillars, bollworm infestation' },
    { id: 'disease', label: '🦠 Widespread Disease', desc: 'Downy mildew, blight, wilt outbreak' },
    { id: 'unseasonal_rain', label: '🌦️ Unseasonal Rain', desc: 'Pre-harvest rain, grain discoloration' },
    { id: 'other', label: '🔥 Other Natural Cause', desc: 'Fire, frost, localized calamity' },
  ];

  const matchSchemes = () => {
    return SCHEMES.filter((scheme) => {
      if (!scheme.active) return false;
      const stateMatch =
        scheme.state === 'All' ||
        scheme.state === selectedState ||
        (selectedState === 'Madhya Pradesh' && scheme.id === 'mp_rbc_6_4');
      const cropMatch =
        scheme.crops.includes('All') || scheme.crops.includes(selectedCrop) || selectedCrop === 'Other Crop';
      const damageMatch =
        scheme.damageTypes.includes(damageCause) || damageCause === 'other';

      return stateMatch && cropMatch;
    });
  };

  const matchedResults = matchSchemes();

  const handleNext = () => setStep((s) => Math.min(s + 1, 7));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleReset = () => {
    setStep(1);
    setSelectedState('Madhya Pradesh');
    setSelectedCrop('Soybean');
    setDamageCause('flood');
  };

  return (
    <div className="paper-card rounded-2xl p-6 sm:p-8 border border-soil-dark/15 shadow-xl bg-white/90">
      {/* Wizard Step Indicator Bar */}
      <div className="flex items-center justify-between border-b border-soil-dark/10 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-danger-red/10 text-danger-red font-bold flex items-center justify-center text-xs">
            {step <= 6 ? `0${step}` : '✓'}
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-soil-dark">
              {step <= 6 ? `Crop Damage Assistance Check` : 'Potentially Relevant Assistance'}
            </h3>
            <span className="text-[11px] text-soil-dark/60">
              {step <= 6 ? `Step ${step} of 6` : 'Informational Eligibility Result'}
            </span>
          </div>
        </div>

        {step > 1 && (
          <button
            onClick={handleReset}
            className="text-xs text-soil-dark/60 hover:text-soil-dark flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Wizard</span>
          </button>
        )}
      </div>

      {/* STEP 1: SELECT STATE */}
      {step === 1 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-soil-dark block mb-1">
              Step 1: Select Your State
            </label>
            <p className="text-xs text-soil-dark/70">
              Select the state where your damaged crop field is located.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {statesList.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedState(st)}
                className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all ${
                  selectedState === st
                    ? 'bg-field-green text-white border-field-green shadow-md scale-[1.02]'
                    : 'bg-parchment/40 text-soil-dark border-soil-dark/15 hover:border-field-green'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{st}</span>
                  {selectedState === st && <CheckCircle2 className="w-4 h-4 text-harvest-gold" />}
                </div>
              </button>
            ))}
          </div>

          {selectedState === 'Madhya Pradesh' && (
            <div className="p-3 bg-growth/10 border border-growth/30 rounded-xl text-xs text-soil-dark flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-field-green shrink-0 mt-0.5" />
              <span>
                <strong>Madhya Pradesh Selected:</strong> Includes PMFBY insurance coverage & MP RBC 6-4 Revenue Disaster Relief guidelines.
              </span>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-field-green hover:bg-field-dark text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
            >
              <span>Next: District</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SELECT DISTRICT */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-soil-dark block mb-1">
              Step 2: Select District
            </label>
            <p className="text-xs text-soil-dark/70">
              Crop damage relief is assessed at district and revenue circle levels.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-soil-dark block mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-field-green" />
              <span>District Name</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full text-xs p-3 bg-white border border-soil-dark/20 rounded-xl text-soil-dark focus:outline-none focus:border-field-green font-semibold"
            >
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}, {d.state}
                </option>
              ))}
              <option value="Ujjain">Ujjain, Madhya Pradesh</option>
              <option value="Indore">Indore, Madhya Pradesh</option>
              <option value="Dewas">Dewas, Madhya Pradesh</option>
              <option value="Nashik">Nashik, Maharashtra</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-parchment text-soil-dark border border-soil-dark/20 rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-field-green hover:bg-field-dark text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
            >
              <span>Next: Crop</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SELECT CROP */}
      {step === 3 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-soil-dark block mb-1">
              Step 3: Select Damaged Crop
            </label>
            <p className="text-xs text-soil-dark/70">
              Select the crop type that has suffered damage.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cropsList.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCrop(c)}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                  selectedCrop === c
                    ? 'bg-field-green text-white border-field-green shadow-md scale-[1.02]'
                    : 'bg-parchment/40 text-soil-dark border-soil-dark/15 hover:border-field-green'
                }`}
              >
                <span>{c}</span>
                {selectedCrop === c && <CheckCircle2 className="w-4 h-4 text-harvest-gold" />}
              </button>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-parchment text-soil-dark border border-soil-dark/20 rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-field-green hover:bg-field-dark text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
            >
              <span>Next: Cause</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: DAMAGE CAUSE */}
      {step === 4 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-soil-dark block mb-1">
              Step 4: Primary Cause of Damage
            </label>
            <p className="text-xs text-soil-dark/70">
              Select what caused the damage to your crop canopy or harvest.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {damageOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDamageCause(opt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  damageCause === opt.id
                    ? 'bg-field-green text-white border-field-green shadow-md'
                    : 'bg-parchment/40 text-soil-dark border-soil-dark/15 hover:border-field-green'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{opt.label}</span>
                  {damageCause === opt.id && <CheckCircle2 className="w-4 h-4 text-harvest-gold" />}
                </div>
                <p className={`text-[11px] mt-1 ${damageCause === opt.id ? 'text-white/80' : 'text-soil-dark/70'}`}>
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-parchment text-soil-dark border border-soil-dark/20 rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-field-green hover:bg-field-dark text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
            >
              <span>Next: Area</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: AFFECTED AREA */}
      {step === 5 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-soil-dark block mb-1">
              Step 5: Estimated Affected Area
            </label>
            <p className="text-xs text-soil-dark/70">
              Enter the approximate field area affected by crop loss.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-soil-dark block mb-1.5">
                Area Size
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={affectedArea}
                onChange={(e) => setAffectedArea(e.target.value)}
                className="w-full text-xs p-3 bg-white border border-soil-dark/20 rounded-xl text-soil-dark focus:outline-none focus:border-field-green font-bold text-lg"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-soil-dark block mb-1.5">
                Measurement Unit
              </label>
              <select
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value)}
                className="w-full text-xs p-3 bg-white border border-soil-dark/20 rounded-xl text-soil-dark focus:outline-none focus:border-field-green font-semibold"
              >
                <option value="Acres">Acres (एकड़)</option>
                <option value="Bigha">Bigha (बीघा)</option>
                <option value="Hectares">Hectares (हेक्टेयर)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-parchment text-soil-dark border border-soil-dark/20 rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-field-green hover:bg-field-dark text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
            >
              <span>Next: Insurance</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: INSURANCE STATUS */}
      {step === 6 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-soil-dark block mb-1">
              Step 6: Crop Insurance Status
            </label>
            <p className="text-xs text-soil-dark/70">
              Is your crop insured under PMFBY or another crop insurance policy for this season?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'yes', label: '🛡️ Yes, Crop is Insured', desc: 'Enrolled under PMFBY or bank KCC' },
              { id: 'no', label: '❌ No, Not Insured', desc: 'Not enrolled in crop insurance' },
              { id: 'unknown', label: '❓ Don\'t Know', desc: 'Check KCC or bank deduction' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setInsuranceStatus(opt.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  insuranceStatus === opt.id
                    ? 'bg-field-green text-white border-field-green shadow-md'
                    : 'bg-parchment/40 text-soil-dark border-soil-dark/15 hover:border-field-green'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{opt.label}</span>
                  {insuranceStatus === opt.id && <CheckCircle2 className="w-4 h-4 text-harvest-gold" />}
                </div>
                <p className={`text-[11px] mt-1 ${insuranceStatus === opt.id ? 'text-white/80' : 'text-soil-dark/70'}`}>
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-parchment text-soil-dark border border-soil-dark/20 rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-danger-red hover:bg-danger-dark text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-harvest-gold" />
              <span>View Potential Assistance</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: RESULTS */}
      {step === 7 && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary Box */}
          <div className="p-4 bg-parchment rounded-xl border border-soil-dark/15 text-xs text-soil-dark flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-mono-data text-soil-dark/60 block">Assessed Selection:</span>
              <span className="font-bold text-sm text-soil-dark">
                {selectedState} • {selectedDistrict} • {selectedCrop}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono-data text-soil-dark/60 block">Damage & Area:</span>
              <span className="font-bold text-soil-dark">
                {affectedArea} {areaUnit} ({damageCause.toUpperCase()})
              </span>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {matchedResults.map((scheme) => (
              <div
                key={scheme.id}
                className="paper-card rounded-xl p-5 border border-soil-dark/15 shadow-md space-y-3 bg-white"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-growth/15 text-growth font-mono-data text-[10px] font-bold uppercase mb-1">
                      Potentially Relevant
                    </span>
                    <h4 className="font-display font-bold text-base text-soil-dark">{scheme.schemeName}</h4>
                  </div>
                  <button
                    onClick={() => onOpenDetail(scheme)}
                    className="px-3 py-1.5 bg-field-green text-white text-xs font-semibold rounded-lg hover:bg-field-dark transition-colors shrink-0 shadow-sm"
                  >
                    View Details
                  </button>
                </div>

                <p className="text-xs text-soil-dark/80 leading-relaxed">{scheme.shortDescription}</p>

                <div className="p-3 bg-parchment/60 rounded-lg text-xs space-y-1">
                  <span className="font-bold text-soil-dark block text-[11px] uppercase tracking-wider">Why Relevant:</span>
                  <p className="text-soil-dark/80 text-[11px]">
                    {scheme.id === 'pmfby'
                      ? `Covers crop loss caused by ${damageCause} for insured ${selectedCrop} fields. Localized calamity must be reported within 72 hours.`
                      : scheme.id === 'mp_rbc_6_4'
                      ? `State revenue relief under RBC 6-4 applies for ${selectedState} farmers suffering ${damageCause} crop damage of 33% or higher.`
                      : `Applies for ${selectedCrop} growers facing ${damageCause} in ${selectedState}.`}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-soil-dark/10 text-xs">
                  {scheme.helpline && (
                    <a
                      href={`tel:${scheme.helpline}`}
                      className="text-soil-dark font-semibold hover:text-field-green flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-danger-red" />
                      <span>Helpline: {scheme.helpline}</span>
                    </a>
                  )}

                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-field-green font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Visit Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Important Legal Disclaimer */}
          <div className="p-4 bg-harvest-gold/15 border border-harvest-gold/40 rounded-xl text-xs text-soil-dark space-y-1">
            <h5 className="font-bold uppercase text-[11px] flex items-center gap-1 text-soil-dark">
              <AlertTriangle className="w-3.5 h-3.5 text-harvest-gold" />
              <span>Important Informational Disclaimer</span>
            </h5>
            <p className="text-[11px] leading-relaxed text-soil-dark/80">
              This result is an informational eligibility guide based on rules last verified on 2026-03-01. Final eligibility, claim approval, and compensation amounts are determined exclusively by the concerned government authority/insurer under applicable rules.
            </p>
          </div>

          <div className="pt-2 flex justify-between">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-parchment text-soil-dark border border-soil-dark/20 rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start New Check</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
