import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { generateAdvisoryTranslation } from '../../services/claudeAPI';
import { showToast } from '../../hooks/useToast';
import { Sparkles, Copy, Check, Languages } from 'lucide-react';

export default function AITranslatorModal({ isOpen, onClose, advisory }) {
  const [targetLang, setTargetLang] = useState('Hindi (Rural Conversational)');
  const [customPrompt, setCustomPrompt] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translating, setTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!advisory) return null;

  const handleGenerate = async (e) => {
    e.preventDefault();
    setTranslating(true);
    try {
      const sourceText = `Crop: ${advisory.crop}, Threat: ${advisory.threat}\nPrevention: ${advisory.languages.en.prevention.join('. ')}\nEarly: ${advisory.languages.en.treatment_early.join('. ')}\nAdvanced: ${advisory.languages.en.treatment_advanced.join('. ')}\nSafety: ${advisory.languages.en.cautions.join('. ')}\nCustom instructions: ${customPrompt}`;

      const res = await generateAdvisoryTranslation({
        advisoryText: sourceText,
        targetLanguage: targetLang,
      });

      setTranslatedText(res);
      showToast('AI Advisory Generated', `Custom advisory tailored for ${targetLang}.`, 'success');
    } catch (err) {
      showToast('Translation Error', 'Failed to generate advisory translation.', 'danger');
    } finally {
      setTranslating(false);
    }
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Copied', 'Advisory copied to clipboard.', 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Vernacular Advisory Customizer"
      subtitle={`Generate dialect-tailored IPM audio/bulletin notes for ${advisory.crop}`}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-soil-dark block mb-1">
            Target Language & Dialect Style
          </label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none"
          >
            <option value="Hindi (Rural Conversational)">Hindi (सरल ग्रामीण हिंदी)</option>
            <option value="Marathi (Vidarbha / Nashik Dialect)">Marathi (नासिक / विदर्भ मराठी)</option>
            <option value="Telugu (Rayalaseema / Coastal Andhra)">Telugu (రైతు ముఖ్యాంశాలు - తెలుగు)</option>
            <option value="Tamil (Delta Agriculture)">Tamil (எளிய விவசாய தமிழ்)</option>
            <option value="Kannada (Deccan Farm)">Kannada (ಕನ್ನಡ ಕೃಷಿ ಸಲಹೆ)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-soil-dark block mb-1">
            Custom Notes (e.g. Acreage, Pump Size, Tank Capacity)
          </label>
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g., Calculate for a 16-liter knapsack sprayer tank across 2 acres"
            className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={translating}
          className="w-full py-2.5 bg-field-green hover:bg-field-dark text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
        >
          {translating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating Custom Advisory via AI Engine...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-harvest-gold" />
              <span>Generate Vernacular Bulletin</span>
            </>
          )}
        </button>

        {translatedText && (
          <div className="space-y-2 pt-2 border-t border-soil-dark/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-soil-dark">Generated Bulletin</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-field-green hover:underline flex items-center gap-1 font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-growth" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
            <div className="p-3.5 bg-parchment rounded-xl border border-soil-dark/15 text-xs text-soil-dark whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto font-sans">
              {translatedText}
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}
