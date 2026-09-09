import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const threatsData = [
  { threat: 'Late Blight (Phytophthora)', farms: 142, crop: 'Tomato/Potato', color: '#B03A2E' },
  { threat: 'Purple Blotch (Alternaria)', farms: 98, crop: 'Onion/Garlic', color: '#C8820A' },
  { threat: 'Downy Mildew (Plasmopara)', farms: 76, crop: 'Grape/Vine', color: '#5C9E31' },
  { threat: 'Chili Thrips / Leaf Curl', farms: 64, crop: 'Chili/Cotton', color: '#D4A017' },
  { threat: 'Bacterial Blight (Telya)', farms: 39, crop: 'Pomegranate', color: '#3B7FC4' },
];

export default function TopThreatsChart() {
  return (
    <div className="paper-card rounded-2xl p-5 border border-soil-dark/10 shadow-md space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-soil-dark/10">
        <div>
          <h3 className="font-display font-bold text-sm text-soil-dark">
            Top 5 Pathogen & Pest Threats This Season
          </h3>
          <p className="text-[11px] text-soil-dark/60">
            Ranked by total confirmed and AI-flagged farm parcels
          </p>
        </div>
        <span className="text-[10px] font-mono-data px-2 py-0.5 rounded bg-harvest-gold/15 text-harvest-dark font-bold">
          419 Total Parcels
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={threatsData}
            margin={{ top: 10, right: 20, left: 30, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5DEC9" />
            <XAxis type="number" tick={{ fontSize: 10, fill: '#1C1A14' }} />
            <YAxis
              type="category"
              dataKey="threat"
              tick={{ fontSize: 10, fill: '#1C1A14' }}
              width={140}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1C1A14',
                color: '#F5F0E8',
                borderRadius: '8px',
                fontSize: '11px',
                border: 'none',
              }}
              formatter={(value, name, item) => [
                `${value} Farms affected`,
                item?.payload?.crop || 'Crop',
              ]}
            />
            <Bar dataKey="farms" radius={[0, 4, 4, 0]}>
              {threatsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
