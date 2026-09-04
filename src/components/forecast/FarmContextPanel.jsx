import React, { useState } from 'react';
import { useFarmStore } from '../../store/farmStore';
import { MapPin, Sprout, Calendar, Edit3, Check } from 'lucide-react';

export default function FarmContextPanel({ onDistrictChange }) {
  const { activeFarm, farms, setActiveFarm, updateFarmContext } = useFarmStore();
  const [isEditing, setIsEditing] = useState(false);
  const [crop, setCrop] = useState(activeFarm?.crop || 'Tomato');
  const [stage, setStage] = useState(activeFarm?.stage || 'Fruit Formation');
  const [variety, setVariety] = useState(activeFarm?.variety || 'Abhinav Hybrid');

  const handleSave = (e) => {
    e.preventDefault();
    if (activeFarm) {
      updateFarmContext(activeFarm.id, { crop, stage, variety });
    }
    setIsEditing(false);
  };

  if (!activeFarm) return null;

  return (
    <div className="bg-soil-dark text-parchment rounded-xl p-4 sm:p-5 border border-soil-light shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-soil-light/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-field-green flex items-center justify-center text-harvest-gold text-base">
            📍
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base text-parchment">
                {activeFarm.district} District, Maharashtra
              </h3>
              <span className="text-[10px] font-mono-data px-1.5 py-0.5 rounded bg-soil-light text-parchment/80">
                {activeFarm.name}
              </span>
            </div>
            <p className="text-[11px] text-parchment/60">
              Grower: {activeFarm.farmerName} • {activeFarm.acres} Acres
            </p>
          </div>
        </div>

        {/* Farm Switcher & Edit */}
        <div className="flex items-center gap-2">
          <select
            value={activeFarm.id}
            onChange={(e) => {
              setActiveFarm(e.target.value);
              const found = farms.find((f) => f.id === e.target.value);
              if (found && onDistrictChange) {
                onDistrictChange(found);
              }
            }}
            className="text-xs bg-soil-light text-parchment border border-soil-light/80 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            {farms.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.crop} — {f.district})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="p-1.5 bg-soil-light hover:bg-soil-light/80 text-parchment rounded-lg text-xs"
            title="Edit crop details"
          >
            <Edit3 className="w-4 h-4 text-harvest-gold" />
          </button>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          <div>
            <label className="text-[10px] text-parchment/60 block mb-1">Crop</label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full text-xs p-2 bg-soil-light rounded text-parchment border border-soil-light/60"
            />
          </div>
          <div>
            <label className="text-[10px] text-parchment/60 block mb-1">Variety</label>
            <input
              type="text"
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              className="w-full text-xs p-2 bg-soil-light rounded text-parchment border border-soil-light/60"
            />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-parchment/60 block mb-1">Growth Stage</label>
              <input
                type="text"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full text-xs p-2 bg-soil-light rounded text-parchment border border-soil-light/60"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-2 bg-growth text-white text-xs font-bold rounded flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 text-xs">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-growth-light shrink-0" />
            <div>
              <span className="text-parchment/60 text-[10px] block uppercase">Crop & Variety</span>
              <span className="font-semibold text-white">
                {activeFarm.crop} ({activeFarm.variety})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-harvest-gold text-harvest-gold flex items-center justify-center text-[10px] font-bold">
              ●
            </div>
            <div>
              <span className="text-parchment/60 text-[10px] block uppercase">Growth Stage</span>
              <span className="font-semibold text-white">{activeFarm.stage}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-light shrink-0" />
            <div>
              <span className="text-parchment/60 text-[10px] block uppercase">Sowing Date</span>
              <span className="font-mono-data text-parchment/90">{activeFarm.sownDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-harvest-gold shrink-0" />
            <div>
              <span className="text-parchment/60 text-[10px] block uppercase">Expected Harvest</span>
              <span className="font-mono-data text-parchment/90">{activeFarm.harvestDate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
