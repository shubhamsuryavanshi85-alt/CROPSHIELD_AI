import React, { useState } from 'react';
import { useFarmStore } from '../../store/farmStore';
import { showToast } from '../../hooks/useToast';
import { Calendar, Bell, Check, Clock } from 'lucide-react';

export default function FollowUpScheduler({ diagnosis, crop, defaultDays = 3, onClose }) {
  const { addReminder, activeFarm } = useFarmStore();
  const [days, setDays] = useState(defaultDays);
  const [customNote, setCustomNote] = useState('');
  const [scheduled, setScheduled] = useState(false);

  const calculateDueDate = (d) => {
    const target = new Date();
    target.setDate(target.getDate() + Number(d));
    return target.toISOString().split('T')[0];
  };

  const [dueDate, setDueDate] = useState(calculateDueDate(defaultDays));

  const handleDaysChange = (d) => {
    setDays(d);
    setDueDate(calculateDueDate(d));
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    const newRem = addReminder({
      farmName: activeFarm?.name || 'My Crop Field',
      crop: crop || 'Crop',
      disease: diagnosis?.diagnosis || 'Follow-up Check',
      dueDate: dueDate,
      action: customNote || `Inspect foliage for ${diagnosis?.diagnosis || 'disease'} spore suppression and check spray coverage.`,
    });

    setScheduled(true);
    showToast(
      'Follow-up Scheduled',
      `Reminder set for ${dueDate} (${days} days from now).`,
      'warning',
      5000
    );

    setTimeout(() => {
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-soil-dark/10">
        <Calendar className="w-5 h-5 text-warning-amber" />
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-soil-dark">
            Schedule Field Follow-up Inspection
          </h4>
          <p className="text-[11px] text-soil-dark/70">
            Set an automated inspection reminder to evaluate chemical/organic spray efficacy.
          </p>
        </div>
      </div>

      <form onSubmit={handleSchedule} className="space-y-3.5">
        {/* Preset Days */}
        <div>
          <label className="text-xs font-semibold text-soil-dark block mb-1.5">
            Follow-up Interval
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[2, 3, 5, 7].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => handleDaysChange(d)}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  days === d
                    ? 'bg-field-green text-white border-field-green shadow-sm'
                    : 'bg-white text-soil-dark border-soil-dark/20 hover:border-soil-dark/50'
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        {/* Due Date Indicator */}
        <div className="flex items-center justify-between p-2.5 bg-parchment/60 rounded-lg border border-soil-dark/10 text-xs">
          <span className="text-soil-dark/70 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-field-green" />
            Inspection Target Date:
          </span>
          <span className="font-mono-data font-bold text-soil-dark">
            {dueDate}
          </span>
        </div>

        {/* Custom Action Note */}
        <div>
          <label className="text-xs font-semibold text-soil-dark block mb-1">
            Action Instructions (Optional)
          </label>
          <textarea
            rows={2}
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder={`Check 5 plants per row for new lesions; reapply spray if rainfall occurred...`}
            className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg focus:outline-none focus:border-field-green text-soil-dark"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={scheduled}
          className={`w-full py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-md ${
            scheduled
              ? 'bg-growth text-white'
              : 'bg-harvest-gold text-soil-dark hover:bg-harvest-light'
          }`}
        >
          {scheduled ? (
            <>
              <Check className="w-4 h-4" />
              <span>Reminder Saved to Farm Calendar!</span>
            </>
          ) : (
            <>
              <Bell className="w-4 h-4" />
              <span>Set Follow-up Reminder</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
