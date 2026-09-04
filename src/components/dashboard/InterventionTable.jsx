import React, { useState } from 'react';
import Badge from '../ui/Badge';
import { showToast } from '../../hooks/useToast';
import { Download, Share2, Search, Filter, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const interventions = [
  { id: 'int_01', district: 'Nashik', threat: 'Late Blight (Tomato)', farms: 23, status: 'contained', action: 'Targeted Mancozeb + Ridomil MZ advisory & 4-row barrier spray', date: '2025-09-01' },
  { id: 'int_02', district: 'Pune', threat: 'Aphids & Whitefly', farms: 8, status: 'ongoing', action: 'Installed 25 blue sticky traps/acre + Neem Azadirachtin spray', date: '2025-09-02' },
  { id: 'int_03', district: 'Solapur', threat: 'Stem Borer (Jowar)', farms: 4, status: 'escalated', action: 'KVK pathology team dispatched for pheromone trap survey', date: '2025-08-31' },
  { id: 'int_04', district: 'Nashik', threat: 'Downy Mildew (Grape)', farms: 18, status: 'contained', action: 'Canopy thinning & Potassium phosphonate 3 ml/L foliar spray', date: '2025-08-30' },
  { id: 'int_05', district: 'Guntur', threat: 'Black Thrips (Chili)', farms: 22, status: 'ongoing', action: 'Spinetoram 11.7% SC + barrier sorghum border rows recommended', date: '2025-09-02' },
  { id: 'int_06', district: 'Ahmednagar', threat: 'Pink Bollworm (Cotton)', farms: 12, status: 'escalated', action: 'Gossyplure pheromone trap catch exceeded threshold (>8 moths/trap)', date: '2025-09-01' },
];

export default function InterventionTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = interventions.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        item.district.toLowerCase().includes(q) ||
        item.threat.toLowerCase().includes(q) ||
        item.action.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['District,Threat,Farms,Status,Action Taken,Date']
        .concat(
          filtered.map(
            (r) =>
              `"${r.district}","${r.threat}",${r.farms},"${r.status}","${r.action}","${r.date}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CropShield_Intervention_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export Complete', 'CSV report downloaded to your device.', 'success');
  };

  const handleExportPDF = () => {
    showToast('PDF Generated', 'District Surveillance Summary exported.', 'success');
    window.print();
  };

  const handleShareWhatsAppSummary = () => {
    const text = encodeURIComponent(
      `🏛️ CropShield AI District Agriculture Bulletin\nMonth: September 2025\n\n• Active Containment Zones: 12\n• Early Detection Rate: 89%\n• Avg. Extension Response: 2.3 days\n\nTop Outbreak Statuses:\n` +
        interventions
          .slice(0, 3)
          .map(
            (i) =>
              `• ${i.district} (${i.threat}) — ${i.farms} farms [${i.status.toUpperCase()}]: ${i.action}`
          )
          .join('\n\n') +
        `\n\nGenerated from CropShield Command Center.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="paper-card rounded-2xl p-5 border border-soil-dark/10 shadow-md space-y-4">
      {/* Table Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-soil-dark/10">
        <div>
          <h3 className="font-display font-bold text-base text-soil-dark">
            District Intervention & Outbreak Containment Tracker
          </h3>
          <p className="text-[11px] text-soil-dark/60">
            Field team assignments, chemical containment advisories, and KVK referrals
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-white hover:bg-parchment text-soil-dark border border-soil-dark/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-field-green" />
            <span>CSV Export</span>
          </button>

          <button
            type="button"
            onClick={handleExportPDF}
            className="px-3 py-1.5 bg-white hover:bg-parchment text-soil-dark border border-soil-dark/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-sky-blue" />
            <span>PDF Print</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsAppSummary}
            className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp Summary</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-soil-dark/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by district, crop threat, or action taken..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none focus:border-field-green"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-xs p-2 bg-parchment border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none"
          >
            <option value="all">All Containment Statuses</option>
            <option value="contained">✓ Contained</option>
            <option value="ongoing">🔄 Ongoing</option>
            <option value="escalated">⚠ Escalated to KVK</option>
          </select>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto rounded-xl border border-soil-dark/10">
        <table className="w-full text-left text-xs text-soil-dark border-collapse">
          <thead className="bg-parchment text-[11px] uppercase tracking-wider text-soil-dark/70 font-semibold border-b border-soil-dark/10">
            <tr>
              <th className="py-3 px-3.5">District</th>
              <th className="py-3 px-3.5">Threat / Pathogen</th>
              <th className="py-3 px-2 text-center font-mono-data">Farms</th>
              <th className="py-3 px-3.5">Status</th>
              <th className="py-3 px-3.5">Action Taken & Containment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-soil-dark/5 bg-white">
            {filtered.map((row) => {
              let statusBadge = (
                <Badge variant="healthy">
                  <CheckCircle className="w-3 h-3" /> Contained
                </Badge>
              );
              if (row.status === 'ongoing') {
                statusBadge = (
                  <Badge variant="warning">
                    <Clock className="w-3 h-3" /> Ongoing
                  </Badge>
                );
              } else if (row.status === 'escalated') {
                statusBadge = (
                  <Badge variant="critical">
                    <AlertTriangle className="w-3 h-3" /> Escalated
                  </Badge>
                );
              }

              return (
                <tr key={row.id} className="hover:bg-parchment/30 transition-colors">
                  <td className="py-3 px-3.5 font-bold text-soil-dark">{row.district}</td>
                  <td className="py-3 px-3.5 font-semibold text-soil-dark/90">{row.threat}</td>
                  <td className="py-3 px-2 text-center font-mono-data font-bold">{row.farms}</td>
                  <td className="py-3 px-3.5">{statusBadge}</td>
                  <td className="py-3 px-3.5 text-soil-dark/80 text-[11px] leading-relaxed">
                    {row.action}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
