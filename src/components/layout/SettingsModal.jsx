import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { useSettingsStore } from '../../store/settingsStore';
import { aiService } from '../../services/ai/aiService';
import { showToast } from '../../hooks/useToast';
import { Cpu, Volume2, Database, ShieldCheck, RefreshCw } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const { speechEnabled, setSpeechEnabled } = useSettingsStore();
  const [healthInfo, setHealthInfo] = useState(null);
  const [checkingHealth, setCheckingHealth] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkHealthStatus();
    }
  }, [isOpen]);

  const checkHealthStatus = async () => {
    setCheckingHealth(true);
    try {
      const res = await aiService.checkHealth();
      setHealthInfo(res);
    } catch {
      setHealthInfo({ status: 'offline', provider: 'deepseek', model: 'deepseek-chat' });
    } finally {
      setCheckingHealth(false);
    }
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
      subtitle="Multi-provider AI reasoning (DeepSeek / Hugging Face) & voice assistant controls"
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* Multi-Provider AI Engine Status */}
        <div className="bg-parchment/70 p-4 rounded-xl border border-soil-dark/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-field-green" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-soil-dark">
                KrishiMitra Conversational AI Engine
              </h4>
            </div>

            <button
              onClick={checkHealthStatus}
              disabled={checkingHealth}
              className="text-[11px] font-semibold text-field-green hover:underline flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${checkingHealth ? 'animate-spin' : ''}`} />
              <span>Verify Status</span>
            </button>
          </div>

          <p className="text-xs text-soil-dark/70 leading-relaxed">
            CropShield AI routes conversational queries through server-side DeepSeek API / Hugging Face router. API secrets remain strictly protected on the backend server.
          </p>

          <div className="p-3 bg-white rounded-lg border border-soil-dark/15 text-xs space-y-1 font-mono-data">
            <div className="flex justify-between">
              <span className="text-soil-dark/60">Active Provider:</span>
              <span className="font-bold text-soil-dark">{healthInfo?.provider || 'deepseek'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-soil-dark/60">Active Model:</span>
              <span className="font-bold text-soil-dark">{healthInfo?.model || 'deepseek-chat'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-soil-dark/60">Connection Status:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                  healthInfo?.status === 'connected'
                    ? 'bg-growth/20 text-growth'
                    : 'bg-harvest-gold/20 text-soil-dark'
                }`}
              >
                {healthInfo?.status === 'connected' ? 'CONNECTED (ONLINE)' : 'OFFLINE FALLBACK ACTIVE'}
              </span>
            </div>
          </div>
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
