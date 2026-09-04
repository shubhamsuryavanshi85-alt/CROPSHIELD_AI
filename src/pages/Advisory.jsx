import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { STATIC_ADVISORIES } from '../services/geoService';
import AdvisoryCard from '../components/advisory/AdvisoryCard';
import AITranslatorModal from '../components/advisory/AITranslatorModal';
import { BookOpen, Search, Filter, Sparkles, SlidersHorizontal, ShieldCheck } from 'lucide-react';

export default function Advisory() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('weather'); // 'weather' | 'recent' | 'name'
  const [customizingAdvisory, setCustomizingAdvisory] = useState(null);

  // Filter and sort logic
  const filteredAdvisories = STATIC_ADVISORIES.filter((adv) => {
    // Crop filter
    if (selectedCrop !== 'all' && adv.cropId !== selectedCrop) return false;

    // Treatment type filter
    if (selectedType !== 'all' && adv.treatmentType !== selectedType) return false;

    // Search term
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchCrop = adv.crop.toLowerCase().includes(q);
      const matchThreat = adv.threat.toLowerCase().includes(q);
      const matchCautions = adv.languages.en.cautions.some((c) => c.toLowerCase().includes(q));
      const matchChemical =
        adv.languages.en.treatment_early.some((tr) => tr.toLowerCase().includes(q)) ||
        adv.languages.en.treatment_advanced.some((tr) => tr.toLowerCase().includes(q));
      if (!matchCrop && !matchThreat && !matchCautions && !matchChemical) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-field-green/10 text-field-green text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          ICAR & State University Certified
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-soil-dark">
          {t('advisory.title', 'Integrated Pest & Disease Management (IPDM) Library')}
        </h1>
        <p className="text-xs sm:text-sm text-soil-dark/70 mt-1 max-w-2xl">
          {t(
            'advisory.subtitle',
            'Field-tested management protocols verified by agricultural universities and ICAR guidelines.'
          )}
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="paper-card rounded-2xl p-4 sm:p-5 border border-soil-dark/10 shadow-md space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-soil-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t(
              'advisory.search_placeholder',
              'Search by crop, disease, chemical or symptom (e.g., Late Blight, Mancozeb, Thrips)...'
            )}
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-white border border-soil-dark/20 rounded-xl text-soil-dark focus:outline-none focus:border-field-green shadow-inner"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Filter Crop */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-soil-dark/60 block mb-1">
              Filter Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full text-xs p-2 bg-parchment border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none"
            >
              <option value="all">All Crops (Tomato, Onion, Grape, Chili...)</option>
              <option value="tomato">🍅 Tomato</option>
              <option value="onion">🧅 Onion</option>
              <option value="chili">🌶️ Chili</option>
              <option value="grape">🍇 Grape</option>
            </select>
          </div>

          {/* Filter Treatment Type */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-soil-dark/60 block mb-1">
              Treatment Category
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs p-2 bg-parchment border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none"
            >
              <option value="all">All Treatment Formulations</option>
              <option value="chemical">Chemical Fungicide / Insecticide</option>
              <option value="organic">Organic & Biologicals</option>
              <option value="preventive">Cultural & Preventive Barrier</option>
            </select>
          </div>

          {/* Sort Criteria */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-soil-dark/60 block mb-1">
              Sort Order
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs p-2 bg-parchment border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none"
            >
              <option value="weather">Current Microclimate Risk Relevance</option>
              <option value="recent">Recently Validated Protocols</option>
              <option value="name">Crop Name (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advisory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAdvisories.length === 0 ? (
          <div className="col-span-2 text-center p-12 paper-card rounded-2xl border border-soil-dark/10">
            <p className="text-sm font-semibold text-soil-dark">
              No IPDM advisory records matched your query "{searchTerm}".
            </p>
            <p className="text-xs text-soil-dark/60 mt-1">
              Try clearing filters or search by a broader crop name.
            </p>
          </div>
        ) : (
          filteredAdvisories.map((adv) => (
            <AdvisoryCard
              key={adv.id}
              advisory={adv}
              currentGlobalLang={i18n.language}
              onOpenTranslate={(item) => setCustomizingAdvisory(item)}
            />
          ))
        )}
      </div>

      {/* AI Vernacular Customizer Modal */}
      <AITranslatorModal
        isOpen={Boolean(customizingAdvisory)}
        onClose={() => setCustomizingAdvisory(null)}
        advisory={customizingAdvisory}
      />
    </div>
  );
}
