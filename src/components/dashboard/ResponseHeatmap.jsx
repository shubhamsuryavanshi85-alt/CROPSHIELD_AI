import React from 'react';

const districtMetrics = [
  { district: 'Nashik', w1: 1.8, w2: 1.4, w3: 1.2, w4: 2.1, w5: 1.5, avg: '1.6 d' },
  { district: 'Pune', w1: 2.4, w2: 2.1, w3: 1.9, w4: 2.8, w5: 2.0, avg: '2.2 d' },
  { district: 'Solapur', w1: 3.1, w2: 2.7, w3: 2.5, w4: 3.4, w5: 2.9, avg: '2.9 d' },
  { district: 'Ahmednagar', w1: 2.8, w2: 2.3, w3: 2.0, w4: 2.5, w5: 2.1, avg: '2.3 d' },
  { district: 'Guntur', w1: 2.2, w2: 1.9, w3: 1.6, w4: 2.0, w5: 1.7, avg: '1.9 d' },
];

const getCellColor = (days) => {
  if (days <= 1.5) return 'bg-growth text-white';
  if (days <= 2.2) return 'bg-growth/70 text-white';
  if (days <= 2.7) return 'bg-warning-amber text-soil-dark font-bold';
  return 'bg-danger-red text-white font-bold';
};

export default function ResponseHeatmap() {
  return (
    <div className="paper-card rounded-2xl p-5 border border-soil-dark/10 shadow-md space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-soil-dark/10">
        <div>
          <h3 className="font-display font-bold text-sm text-soil-dark">
            District Extension Response Time Heatmap
          </h3>
          <p className="text-[11px] text-soil-dark/60">
            Average days from AI symptom flag to field specialist validation
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono-data">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-growth rounded-sm" /> &lt;1.5d
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-warning-amber rounded-sm" /> 2–2.5d
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-danger-red rounded-sm" /> &gt;2.8d
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-soil-dark border-collapse">
          <thead>
            <tr className="border-b border-soil-dark/10 text-[11px] text-soil-dark/60">
              <th className="text-left py-2 px-3 font-semibold">District</th>
              <th className="text-center py-2 px-2 font-mono-data">W1</th>
              <th className="text-center py-2 px-2 font-mono-data">W2</th>
              <th className="text-center py-2 px-2 font-mono-data">W3</th>
              <th className="text-center py-2 px-2 font-mono-data">W4</th>
              <th className="text-center py-2 px-2 font-mono-data">W5</th>
              <th className="text-right py-2 px-3 font-mono-data">Monthly Avg</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-soil-dark/5 font-mono-data">
            {districtMetrics.map((row) => (
              <tr key={row.district} className="hover:bg-parchment/40">
                <td className="py-2.5 px-3 font-sans font-semibold text-soil-dark">
                  {row.district}
                </td>
                <td className="p-1 text-center">
                  <span className={`inline-block w-9 py-1 rounded text-[11px] ${getCellColor(row.w1)}`}>
                    {row.w1}d
                  </span>
                </td>
                <td className="p-1 text-center">
                  <span className={`inline-block w-9 py-1 rounded text-[11px] ${getCellColor(row.w2)}`}>
                    {row.w2}d
                  </span>
                </td>
                <td className="p-1 text-center">
                  <span className={`inline-block w-9 py-1 rounded text-[11px] ${getCellColor(row.w3)}`}>
                    {row.w3}d
                  </span>
                </td>
                <td className="p-1 text-center">
                  <span className={`inline-block w-9 py-1 rounded text-[11px] ${getCellColor(row.w4)}`}>
                    {row.w4}d
                  </span>
                </td>
                <td className="p-1 text-center">
                  <span className={`inline-block w-9 py-1 rounded text-[11px] ${getCellColor(row.w5)}`}>
                    {row.w5}d
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-soil-dark">
                  {row.avg}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
