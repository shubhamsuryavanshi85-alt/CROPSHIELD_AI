import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const trendData = [
  { week: 'W1', lateBlight: 12, purpleBlotch: 8, rainfall: 45 },
  { week: 'W2', lateBlight: 16, purpleBlotch: 11, rainfall: 82 },
  { week: 'W3', lateBlight: 28, purpleBlotch: 19, rainfall: 110 },
  { week: 'W4', lateBlight: 44, purpleBlotch: 28, rainfall: 95 },
  { week: 'W5', lateBlight: 58, purpleBlotch: 39, rainfall: 130 },
  { week: 'W6', lateBlight: 72, purpleBlotch: 51, rainfall: 145 },
  { week: 'W7', lateBlight: 65, purpleBlotch: 62, rainfall: 70 },
  { week: 'W8', lateBlight: 48, purpleBlotch: 54, rainfall: 35 },
  { week: 'W9', lateBlight: 35, purpleBlotch: 48, rainfall: 20 },
  { week: 'W10', lateBlight: 29, purpleBlotch: 41, rainfall: 50 },
  { week: 'W11', lateBlight: 42, purpleBlotch: 49, rainfall: 88 },
  { week: 'W12', lateBlight: 51, purpleBlotch: 56, rainfall: 95 },
];

export default function DiseaseTrendChart() {
  return (
    <div className="paper-card rounded-2xl p-5 border border-soil-dark/10 shadow-md space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-soil-dark/10">
        <div>
          <h3 className="font-display font-bold text-sm text-soil-dark">
            12-Week Disease Incidence vs. Rainfall Correlation
          </h3>
          <p className="text-[11px] text-soil-dark/60">
            Pathogen spikes follow heavy precipitation events with 3–5 day lag
          </p>
        </div>
        <span className="text-[10px] font-mono-data px-2 py-0.5 rounded bg-sky-blue/10 text-sky-dark font-bold">
          Rainfall Overlay
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5DEC9" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#1C1A14' }} />
            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#1C1A14' }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10, fill: '#3B7FC4' }}
              label={{ value: 'Rain (mm)', angle: -90, position: 'insideRight', fontSize: 10, fill: '#3B7FC4' }}
            />
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
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="lateBlight"
              name="Late Blight Incidents"
              stroke="#B03A2E"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="purpleBlotch"
              name="Purple Blotch Incidents"
              stroke="#C8820A"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
            <Line
              yAxisId="right"
              type="natural"
              dataKey="rainfall"
              name="Rainfall (mm)"
              stroke="#3B7FC4"
              strokeDasharray="4 4"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
