import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function ConfidenceMeter({ confidence = 85, showTooltip = true, label = 'Confidence' }) {
  const [isHovered, setIsHovered] = useState(false);
  const score = Math.max(0, Math.min(100, Math.round(confidence)));

  let barColor = 'bg-growth';
  let textColor = 'text-growth-dark';
  let badgeText = 'High Confidence';

  if (score < 50) {
    barColor = 'bg-danger-red';
    textColor = 'text-danger-red';
    badgeText = 'Low Confidence';
  } else if (score <= 75) {
    barColor = 'bg-warning-amber';
    textColor = 'text-warning-dark';
    badgeText = 'Moderate Confidence';
  }

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 font-medium text-soil-dark/80">
          <span>{label}</span>
          {showTooltip && (
            <div className="relative inline-flex">
              <button
                type="button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsHovered(!isHovered)}
                className="text-soil-dark/40 hover:text-soil-dark p-0.5"
                aria-label="Confidence explanation"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
              {isHovered && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 w-60 p-2.5 bg-soil-dark text-parchment text-[11px] rounded shadow-xl z-30 leading-snug">
                  Based on visual pattern matching + reported field symptoms. Always confirm with an extension worker for critical economic threshold decisions.
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[11px] font-semibold ${textColor}`}>{badgeText}</span>
          <span className="font-mono-data font-bold text-xs text-soil-dark">
            {score}%
          </span>
        </div>
      </div>

      {/* Progress track */}
      <div className="h-2 w-full bg-soil-dark/10 rounded-full overflow-hidden flex">
        <div
          className={`h-full transition-all duration-700 ease-out rounded-full ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
