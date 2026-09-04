import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { useSettingsStore } from '../../store/settingsStore';
import { showToast } from '../../hooks/useToast';
import { Key, Volume2, Database, ShieldCheck, CheckCircle, RefreshCw } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const { apiKey, setApiKey, speechEnabled, setSpeechEnabled } = useSettingsStore();
  const [inputKey, setInputKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const handleSaveKey = (e) => {
    e.preventDefault();
    setApiKey(inputKey);
    setSaved(true);
    showToast('Settings Saved', 'API configuration updated successfully.', 'success');
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all field alerts and custom diagnostic records to defaults?')) {
      localStorage.removeItem('cropshield_farms_v1');
      localStorage.removeItem('cropshield_alerts_v1');
      localStorage.removeItem('cropshield_reminders_v1');
      localStorage.removeItem('cropshield_diagnoses_history');
      showToast('Data Reset', 'Field records restored to initial presets.', 'info');
      window.location.reload();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Application & Intelligence Settings"
      subtitle="Configure Anthropic Claude API, audio preferences, and field database"
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* Claude API Key Configuration */}
        <div className="bg-parchment/70 p-4 rounded-xl border border-soil-dark/10 space-y-3">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-field-green" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-soil-dark">
              Anthropic Claude Vision API Key
            </h4>
          </div>

          <p className="text-xs text-soil-dark/70 leading-relaxed">
            CropShield AI uses Claude 3.5 Sonnet for vision pathology and vernacular translations. 
            An intelligent offline agricultural pathology engine is active as an automatic fallback when no API key is provided.
          </p>

          <form onSubmit={handleSaveKey} className="space-y-2.5">
            <div className="relative">
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="sk-ant-api03-..."
                className="w-full text-xs font-mono-data px-3 py-2 bg-white border border-soil-dark/20 rounded-lg focus:outline-none focus:border-field-green text-soil-dark"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-growth font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {apiKey ? 'Claude Vision API Active' : 'Offline Pathology Engine Active'}
              </span>

              <button
                type="submit"
                className="px-3.5 py-1.5 bg-field-green text-white text-xs font-semibold rounded-lg hover:bg-field-dark transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {saved ? <CheckCircle className="w-3.5 h-3.5" /> : null}
                <span>{saved ? 'Saved' : 'Save Key'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Audio / Voice Guidance Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-parchment/40 rounded-xl border border-soil-dark/10">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-sky-blue" />
            <div>
              <h5 className="text-xs font-bold text-soil-dark">Farmer Voice Assistance</h5>
              <p className="text-[11px] text-soil-dark/70">
                Read aloud diagnosis and spray advisories in selected regional language
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={speechEnabled}
              onChange={(e) => setSpeechEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-soil-dark/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-soil-dark/10 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-growth"></div>
          </label>
        </div>

        {/* Local Storage & Cache Reset */}
        <div className="flex items-center justify-between p-3.5 bg-parchment/40 rounded-xl border border-soil-dark/10">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-warning-amber" />
            <div>
              <h5 className="text-xs font-bold text-soil-dark">Field Database Cache</h5>
              <p className="text-[11px] text-soil-dark/70">
                Restore sample farms, mock outbreak alerts, and reset follow-ups
              </p>
            </div>
          </div>
          <button
            onClick={handleResetData}
            className="px-3 py-1.5 bg-white hover:bg-soil-dark/5 text-soil-dark text-xs font-medium border border-soil-dark/20 rounded-lg transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
