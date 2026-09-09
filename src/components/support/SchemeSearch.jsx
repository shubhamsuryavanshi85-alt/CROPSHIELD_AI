import React, { useState } from 'react';
import { SCHEMES } from '../../data/schemeData';
import { Search, Filter, ExternalLink, Phone, ArrowRight } from 'lucide-react';

export default function SchemeSearch({ onOpenDetail }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState('All');

  const categories = [
    { id: 'All', label: 'All Categories' },
    { id: 'crop_insurance', label: '🛡️ Crop Insurance (PMFBY)' },
    { id: 'crop_damage_relief', label: '🏛️ State Crop Loss Relief (RBC 6-4)' },
    { id: 'disaster_relief', label: '🌧️ Disaster Relief (SDRF)' },
    { id: 'farmer_support', label: '💰 Income & Credit Support (PM-KISAN/KCC)' },
  ];

  const filteredSchemes = SCHEMES.filter((sch) => {
    if (!sch.active) return false;

    const matchesSearch =
      sch.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = selectedState === 'All' || sch.state === 'All' || sch.state === selectedState;

    const matchesCategory = selectedCategory === 'All' || sch.category === selectedCategory;

    const matchesCrop = selectedCrop === 'All' || sch.crops.includes('All') || sch.crops.includes(selectedCrop);

    return matchesSearch && matchesState && matchesCategory && matchesCrop;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="paper-card rounded-xl p-5 border border-soil-dark/15 space-y-4 bg-white/90">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-field-green" />
          <h3 className="font-display font-bold text-sm text-soil-dark uppercase tracking-wider">
            🔎 Find Government Schemes & Assistance
          </h3>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search schemes by name, risk type (e.g. PMFBY, flood, soybean, RBC 6-4)..."
          className="w-full text-xs p-3 bg-parchment/30 border border-soil-dark/20 rounded-xl text-soil-dark focus:outline-none focus:border-field-green"
        />

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="text-[11px] font-bold text-soil-dark/70 block mb-1">Filter State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none"
            >
              <option value="All">All States</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Rajasthan">Rajasthan</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-soil-dark/70 block mb-1">Filter Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-soil-dark/70 block mb-1">Filter Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none"
            >
              <option value="All">All Crops</option>
              <option value="Soybean">Soybean</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Cotton">Cotton</option>
              <option value="Gram">Gram</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.length === 0 ? (
          <div className="col-span-2 p-8 text-center paper-card rounded-xl border border-dashed border-soil-dark/20 text-soil-dark/70 space-y-2">
            <p className="text-xs font-semibold">No matching assistance schemes found for your search criteria.</p>
            <p className="text-[11px]">Try clearing filters or changing crop/state selections.</p>
          </div>
        ) : (
          filteredSchemes.map((sch) => (
            <div
              key={sch.id}
              className="paper-card rounded-xl p-5 border border-soil-dark/15 shadow-md flex flex-col justify-between space-y-3 bg-white hover:shadow-lg transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono-data font-bold px-2 py-0.5 rounded bg-growth/15 text-growth uppercase">
                    {sch.level} • {sch.state}
                  </span>
                  {sch.helpline && (
                    <span className="text-[10px] font-mono-data text-danger-red font-bold flex items-center gap-0.5">
                      <Phone className="w-3 h-3" /> {sch.helpline}
                    </span>
                  )}
                </div>

                <h4 className="font-display font-bold text-base text-soil-dark">{sch.schemeName}</h4>
                <p className="text-xs text-soil-dark/80 mt-1 leading-relaxed line-clamp-3">{sch.shortDescription}</p>
              </div>

              <div className="pt-3 border-t border-soil-dark/10 flex items-center justify-between">
                <a
                  href={sch.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-field-green font-bold hover:underline flex items-center gap-1"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => onOpenDetail(sch)}
                  className="px-3.5 py-1.5 bg-soil-dark hover:bg-soil text-parchment rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-harvest-gold" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
