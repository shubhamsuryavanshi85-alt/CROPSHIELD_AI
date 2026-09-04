import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const reportData = [
  { week: 'W1 Aug', tomato: 28, onion: 18, grape: 14, chili: 12, other: 8 },
  { week: 'W2 Aug', tomato: 35, onion: 24, grape: 19, chili: 16, other: 10 },
  { week: 'W3 Aug', tomato: 42, onion: 31, grape: 27, chili: 22, other: 15 },
  { week: 'W4 Aug', tomato: 56, onion: 44, grape: 38, chili: 29, other: 18 },
  { week: 'W1 Sep', tomato: 68, onion: 52, grape: 45, chili: 34, other: 22 },
  { week: 'W2 Sep (Current)', tomato: 74, onion: 58, grape: 49, chili: 39, other: 25 },
];

export default function ReportVolumeChart() {
  return (
    <div className="paper-card rounded-2xl p-5 border border-soil-dark/10 shadow-md space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-soil-dark/10">
        <div>
          <h3 className="font-display font-bold text-sm text-soil-dark">
            Weekly Report Volume by Crop Type
          </h3>
          <p className="text-[11px] text-soil-dark/60">
            Foliar symptom uploads and field detections across monitoring clusters
          </p>
        </div>
        <span className="text-[10px] font-mono-data px-2 py-0.5 rounded bg-mist text-field-green font-bold">
          Weekly Stack
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={reportData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5DEC9" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#1C1A14' }} />
            <YAxis tick={{ fontSize: 10, fill: '#1C1A14' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1C1A14',
                color: '#F5F0E8',
                borderRadius: '8px',
                fontSize: '11px',
                border: 'none',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="tomato" name="Tomato (Blight/Spot)" fill="#B03A2E" stackId="a" />
            <Bar dataKey="onion" name="Onion (Purple Blotch)" fill="#C8820A" stackId="a" />
            <Bar dataKey="grape" name="Grape (Downy Mildew)" fill="#5C9E31" stackId="a" />
            <Bar dataKey="chili" name="Chili (Thrips/Curl)" fill="#D4A017" stackId="a" />
            <Bar dataKey="other" name="Other Crops" fill="#3B7FC4" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
