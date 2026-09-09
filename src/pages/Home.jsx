import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StatCounter from '../components/ui/StatCounter';
import KrishiMitraCard from '../components/krishimitra/KrishiMitraCard';
import KrishiMitraModal from '../components/krishimitra/KrishiMitraModal';
import {
  ShieldAlert,
  MapPin,
  LayoutDashboard,
  Camera,
  CloudSun,
  ClipboardCheck,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle,
  Bot,
} from 'lucide-react';

export default function Home({ onNavigate }) {
  const { t } = useTranslation();
  const [showKrishiMitra, setShowKrishiMitra] = useState(false);

  const roleCards = [
    {
      roleId: 'farmer',
      title: t('hero.cta_farmer_title', "I'm a Farmer"),
      desc: t('hero.cta_farmer_desc', 'Upload photos, get instant diagnosis, spray dosage & action plan'),
      icon: '🧑🌾',
      target: 'diagnose',
      accent: 'border-l-4 border-growth hover:border-growth-light',
      bgHover: 'group-hover:bg-growth/5',
      badge: 'Direct Action',
    },
    {
      roleId: 'extension',
      title: t('hero.cta_extension_title', "I'm an Extension Worker"),
      desc: t('hero.cta_extension_desc', 'Monitor multiple farms, validate AI alerts & dispatch field teams'),
      icon: '👷',
      target: 'map',
      accent: 'border-l-4 border-warning-amber hover:border-warning-light',
      bgHover: 'group-hover:bg-warning-amber/5',
      badge: 'Field Surveillance',
    },
    {
      roleId: 'official',
      title: t('hero.cta_official_title', "I'm an Official"),
      desc: t('hero.cta_official_desc', 'Track district outbreak trends, response times & intervention efficacy'),
      icon: '🏛️',
      target: 'dashboard',
      accent: 'border-l-4 border-sky-blue hover:border-sky-light',
      bgHover: 'group-hover:bg-sky-blue/5',
      badge: 'District Analytics',
    },
  ];

  const steps = [
    {
      step: 'A',
      num: '01',
      title: t('how_it_works.step1_title', '1. Photograph Symptoms'),
      desc: t('how_it_works.step1_desc', 'Capture affected leaves, stems, or fruit directly in the field with camera or offline cache.'),
      icon: Camera,
      image: '/field-capture.jpg',
      tag: 'Field Capture',
    },
    {
      step: 'B',
      num: '02',
      title: t('how_it_works.step2_title', '2. AI Pathology & Weather Risk'),
      desc: t('how_it_works.step2_desc', 'Vision models identify pathogen signatures while live meteorology computes 7-day spore risk.'),
      icon: CloudSun,
      image: '/ai-pathology-analysis.jpg',
      tag: 'Pathogen Analysis',
    },
    {
      step: 'C',
      num: '03',
      title: t('how_it_works.step3_title', '3. Act on Tailored Advisory'),
      desc: t('how_it_works.step3_desc', 'Receive safe chemical dosages, Pre-Harvest Intervals (PHI), organic cures, and KVK lab escalation.'),
      icon: ClipboardCheck,
      image: '/tailored-advisory.jpg',
      tag: 'CIBRC Protocol',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* 1. HERO SECTION WITH THERMAL SCAN-LINE EFFECT */}
      <section className="relative rounded-2xl overflow-hidden shadow-2xl border border-soil-dark/20 bg-soil-dark min-h-[540px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-parchment">
        {/* Field Background with Subtle Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil-dark via-soil-dark/80 to-soil-dark/40" />

        {/* Thermal Scan-Line (CSS Animation) */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-growth to-transparent opacity-90 shadow-[0_0_15px_3px_rgba(92,158,49,0.8)] pointer-events-none animate-scan-sweep z-10" />

        {/* Top Tag */}
        <div className="relative z-20 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-field-green/80 text-parchment text-xs font-semibold tracking-wide border border-growth/50 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-harvest-gold" />
            Field-Tested Agricultural Intelligence
          </span>
        </div>

        {/* Hero Headlines (Playfair Display) */}
        <div className="relative z-20 max-w-3xl my-6 space-y-4">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            {t('hero.headline', 'Every day without early detection costs yield.')}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-parchment/90 font-sans leading-relaxed max-w-2xl font-light">
            {t(
              'hero.subheadline',
              'CropShield AI spots disease and pest risk before damage spreads — from your phone, in your language.'
            )}
          </p>
        </div>

        {/* 3 Role-Based Dispatch CTAs */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-4">
          {roleCards.map((card) => (
            <button
              key={card.roleId}
              onClick={() => onNavigate(card.target)}
              className={`group bg-soil/90 backdrop-blur-md rounded-xl p-4 sm:p-5 text-left border border-soil-light shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${card.accent} ${card.bgHover}`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-2xl sm:text-3xl">{card.icon}</span>
                <span className="text-[10px] uppercase font-mono-data px-2 py-0.5 rounded bg-soil-dark/60 text-parchment/80 border border-soil-light">
                  {card.badge}
                </span>
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-harvest-gold transition-colors flex items-center justify-between">
                <span>{card.title}</span>
                <ArrowRight className="w-4 h-4 text-parchment/40 group-hover:text-harvest-gold group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-parchment/75 mt-1 leading-snug line-clamp-2">
                {card.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* KRISHIMITRA FARMER AI ASSISTANT BANNER */}
      <KrishiMitraCard onOpenChat={() => setShowKrishiMitra(true)} />

      {/* CROP DAMAGED? GOVERNMENT ASSISTANCE QUICK ACTION */}
      <section className="paper-card rounded-2xl p-5 border border-danger-red/30 shadow-md bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-danger-red/10 border border-danger-red/30 flex items-center justify-center shrink-0">
            <span className="text-xl">🚨</span>
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-soil-dark flex items-center gap-2">
              <span>Crop Damaged by Weather, Pest, or Flood?</span>
            </h3>
            <p className="text-xs text-soil-dark/70 mt-0.5">
              Check potential PMFBY crop insurance eligibility, MP RBC 6-4 disaster relief, and official government assistance options.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('support')}
          className="px-5 py-2.5 bg-danger-red hover:bg-danger-dark text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
        >
          <span>Check Assistance Now</span>
          <ArrowRight className="w-4 h-4 text-harvest-gold" />
        </button>
      </section>

      {/* 2. PROBLEM STRIP WITH ANIMATED SCROLL COUNTERS */}
      <section className="bg-soil-dark rounded-2xl p-6 sm:p-8 text-parchment shadow-xl border border-soil-light">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-harvest-gold mb-1">
            The Cost of Delay in the Field
          </h2>
          <p className="text-sm text-parchment/80">
            Why early detection and precision diagnosis change farm economics
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-soil-light">
          {/* Stat 1: ~40% */}
          <div className="pt-4 sm:pt-0 sm:px-4 text-center sm:text-left space-y-1">
            <div className="text-3xl sm:text-4xl text-harvest-gold">
              <StatCounter endValue="40" prefix="~" suffix="%" />
            </div>
            <p className="text-xs text-parchment/70 leading-snug">
              {t('stats.loss_label', 'Average crop yield loss from late pest/disease detection (FAO)')}
            </p>
          </div>

          {/* Stat 2: 72 hrs */}
          <div className="pt-4 sm:pt-0 sm:px-4 text-center sm:text-left space-y-1">
            <div className="text-3xl sm:text-4xl text-sky-light">
              <StatCounter endValue="72" suffix=" hrs" />
            </div>
            <p className="text-xs text-parchment/70 leading-snug">
              {t('stats.delay_label', 'Typical delay between first symptoms and expert advisory')}
            </p>
          </div>

          {/* Stat 3: 3x */}
          <div className="pt-4 sm:pt-0 sm:px-4 text-center sm:text-left space-y-1">
            <div className="text-3xl sm:text-4xl text-danger-light">
              <StatCounter endValue="3" suffix="x" />
            </div>
            <p className="text-xs text-parchment/70 leading-snug">
              {t('stats.overuse_label', 'Pesticide overuse when diagnosis or stage is incorrect')}
            </p>
          </div>

          {/* Stat 4: 1:800 */}
          <div className="pt-4 sm:pt-0 sm:px-4 text-center sm:text-left space-y-1">
            <div className="text-3xl sm:text-4xl text-growth-light">
              <StatCounter endValue="1:800" />
            </div>
            <p className="text-xs text-parchment/70 leading-snug">
              {t('stats.ratio_label', 'Extension worker to farmer ratio across Indian farming districts')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3-STEP CONNECTED DETECTION FLOW) */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-field-green/10 text-field-green text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5 text-field-green" />
            Closed-Loop Decision System
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-soil-dark">
            {t('how_it_works.title', 'Field-Tested 3-Step Detection Loop')}
          </h2>
          <p className="text-xs sm:text-sm text-soil-dark/70 mt-1">
            {t(
              'how_it_works.subtitle',
              'Built for low-bandwidth rural conditions with rapid expert escalation.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="paper-card rounded-xl p-5 border border-soil-dark/10 shadow-md flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  {/* Step Image */}
                  <div className="relative rounded-lg overflow-hidden h-40 mb-4 border border-soil-dark/10">
                    <img
                      src={st.image}
                      alt={st.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-soil-dark/80 text-parchment text-[10px] font-mono-data font-bold">
                      STEP {st.num}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-field-green text-white text-[10px] font-medium">
                      {st.tag}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-mist flex items-center justify-center text-field-green font-bold text-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-base text-soil-dark">
                      {st.title}
                    </h3>
                  </div>

                  <p className="text-xs text-soil-dark/75 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-soil-dark/10 flex items-center justify-between text-[11px] text-soil-dark/60">
                  <span className="flex items-center gap-1 text-growth font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Offline Ready
                  </span>
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FIELD NOTES / GROWER DISPATCHES */}
      <section className="space-y-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-soil-dark">
            {t('field_notes.title', 'Field Dispatches from Growers')}
          </h2>
          <p className="text-xs sm:text-sm text-soil-dark/70">
            Real outcomes from early detection and targeted IPM spraying
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Note 1 */}
          <div className="field-note-card rounded-xl p-6 relative">
            <div className="absolute top-3 right-4 font-mono-data text-[10px] text-soil-dark/40">
              DISPATCH #2084-MH
            </div>
            <p className="font-serif italic text-sm sm:text-base text-soil-dark/90 leading-relaxed mb-4">
              "{t('field_notes.note1', 'Got the alert two days before my neighbor even noticed downy mildew. Sprayed only the affected 4 rows instead of the entire 6-acre plot, saving ₹14,000 in fungicide.')}"
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-[#E5DEC9]">
              <span className="text-lg">🍇</span>
              <div>
                <h4 className="text-xs font-bold text-soil-dark">
                  {t('field_notes.author1', 'Ramesh Kulkarni — Nashik, Maharashtra (Grapes & Onion)')}
                </h4>
                <span className="text-[10px] text-soil-dark/60 font-mono-data">
                  Saved ₹14,000 in chemical input costs
                </span>
              </div>
            </div>
          </div>

          {/* Note 2 */}
          <div className="field-note-card rounded-xl p-6 relative">
            <div className="absolute top-3 right-4 font-mono-data text-[10px] text-soil-dark/40">
              DISPATCH #1972-AP
            </div>
            <p className="font-serif italic text-sm sm:text-base text-soil-dark/90 leading-relaxed mb-4">
              "{t('field_notes.note2', 'The weather forecast warned of a thrip surge after Sunday\'s humidity drop. Blue sticky traps caught them early before bulb formation was hit.')}"
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-[#E5DEC9]">
              <span className="text-lg">🌶️</span>
              <div>
                <h4 className="text-xs font-bold text-soil-dark">
                  {t('field_notes.author2', 'Balaji Rao — Guntur, Andhra Pradesh (Chili & Cotton)')}
                </h4>
                <span className="text-[10px] text-soil-dark/60 font-mono-data">
                  Protected 5-acre chili canopy from murda leaf curl
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KRISHIMITRA FLOATING QUICK LAUNCHER BUTTON */}
      <button
        onClick={() => setShowKrishiMitra(true)}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30 px-4 py-3 bg-field-green hover:bg-growth text-white rounded-full shadow-2xl border-2 border-harvest-gold flex items-center gap-2 font-bold text-xs transition-all hover:scale-105 active:scale-95 group"
        aria-label="Open KrishiMitra Assistant"
      >
        <div className="w-7 h-7 rounded-full bg-soil-dark text-harvest-gold flex items-center justify-center font-bold">
          🌾
        </div>
        <span className="hidden sm:inline">Ask KrishiMitra</span>
        <span className="sm:hidden font-mono-data text-[11px]">KrishiMitra</span>
      </button>

      {/* KRISHIMITRA CONVERSATIONAL ASSISTANT MODAL */}
      <KrishiMitraModal
        isOpen={showKrishiMitra}
        onClose={() => setShowKrishiMitra(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
}
