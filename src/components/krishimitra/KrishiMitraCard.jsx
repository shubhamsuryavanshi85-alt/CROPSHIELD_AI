import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquareText, Sparkles, ArrowRight, Bot, ShieldCheck } from 'lucide-react';

export default function KrishiMitraCard({ onOpenChat }) {
  const { t } = useTranslation();

  return (
    <section className="relative rounded-2xl overflow-hidden shadow-xl border border-growth/30 bg-gradient-to-br from-soil-dark via-soil to-soil-dark p-6 sm:p-8 text-parchment transition-all hover:border-harvest-gold/50">
      {/* Decorative background aura */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-growth/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-harvest-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-field-green/20 text-growth-light text-xs font-semibold border border-growth/40">
            <Sparkles className="w-3.5 h-3.5 text-harvest-gold animate-pulse" />
            <span>{t('krishimitra.badge', 'KrishiMitra — Your AI Farming Assistant')}</span>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
            {t('krishimitra.card_title', 'Have questions about your crop, disease risk, or spray dosage?')}
          </h2>

          <p className="text-xs sm:text-sm text-parchment/80 font-sans leading-relaxed">
            {t(
              'krishimitra.card_subtitle',
              'Ask KrishiMitra in English, Hindi, or Marathi. Get instant guidance, symptom explanations, and direct access to CropShield diagnosis & risk tools.'
            )}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-parchment/60 font-mono-data">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-growth" /> 100% Grounded Advisory
            </span>
            <span>•</span>
            <span>English | हिंदी | मराठी</span>
            <span>•</span>
            <span>Offline Supported</span>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <button
            onClick={onOpenChat}
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-field-green hover:bg-growth text-white font-bold text-sm shadow-lg hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2.5 group border border-growth/50 active:scale-95"
          >
            <Bot className="w-5 h-5 text-harvest-gold group-hover:rotate-12 transition-transform" />
            <span>{t('krishimitra.ask_button', 'Ask KrishiMitra')}</span>
            <ArrowRight className="w-4 h-4 text-parchment/70 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
