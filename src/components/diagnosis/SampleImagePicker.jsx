import React from 'react';
import { SAMPLE_SPECIMENS } from '../../services/pathologyData';
import { Sparkles, CheckCircle } from 'lucide-react';

export default function SampleImagePicker({ onSelectSample, activeSampleId }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-soil-dark flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-harvest-gold" />
          Quick Field Test Specimens (1-Click Test)
        </label>
        <span className="text-[10px] text-soil-dark/60 font-mono-data">6 Specimens</span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {SAMPLE_SPECIMENS.map((specimen) => {
          const isSelected = activeSampleId === specimen.id;
          return (
            <button
              key={specimen.id}
              type="button"
              onClick={() => onSelectSample(specimen)}
              className={`relative rounded-lg overflow-hidden border text-left group transition-all ${
                isSelected
                  ? 'border-growth ring-2 ring-growth shadow-md scale-95'
                  : 'border-soil-dark/15 hover:border-soil-dark/40 opacity-85 hover:opacity-100'
              }`}
            >
              <div className="h-16 w-full overflow-hidden bg-soil-dark/10">
                <img
                  src={specimen.thumbnail}
                  alt={specimen.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-1.5 bg-white">
                <p className="text-[10px] font-bold text-soil-dark truncate">
                  {specimen.crop}
                </p>
                <p className="text-[9px] text-soil-dark/60 truncate">
                  {specimen.diagnosis.diagnosis}
                </p>
              </div>
              {isSelected && (
                <div className="absolute top-1 right-1 bg-growth text-white rounded-full p-0.5">
                  <CheckCircle className="w-3 h-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
