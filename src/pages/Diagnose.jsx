import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import { useGeolocation } from '../hooks/useGeolocation';
import { CROPS, GROWTH_STAGES } from '../services/pathologyData';
import SampleImagePicker from '../components/diagnosis/SampleImagePicker';
import DiagnosisResult from '../components/diagnosis/DiagnosisResult';
import {
  UploadCloud,
  Camera,
  RotateCcw,
  Sparkles,
  MapPin,
  CloudRain,
  Sprout,
  Calendar,
  AlertCircle,
  HelpCircle,
  Check,
} from 'lucide-react';

export default function Diagnose() {
  const { t } = useTranslation();
  const { analyze, analyzing, result, error, resetDiagnosis } = useImageAnalysis();
  const { coords, districts, selectDistrict, requestAutoLocation, loading: geoLoading } = useGeolocation();

  // Form states
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [growthStage, setGrowthStage] = useState('fruiting');
  const [symptoms, setSymptoms] = useState('');
  const [recentRain, setRecentRain] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeSample, setActiveSample] = useState(null);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result);
        setActiveSample(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Sample Selection
  const handleSelectSample = (sample) => {
    setActiveSample(sample);
    setPreviewImage(sample.thumbnail);
    setSelectedCrop(sample.crop);
    setGrowthStage(sample.growthStage);
    setSymptoms(sample.symptoms);
  };

  // Run Diagnosis
  const handleRunAnalysis = async (e) => {
    e.preventDefault();
    await analyze({
      imageBase64: previewImage,
      cropType: selectedCrop,
      growthStage,
      symptoms,
      location: coords.districtName,
      recentRain,
      sampleData: activeSample,
    });
  };

  const handleClearAll = () => {
    setPreviewImage(null);
    setActiveSample(null);
    setSymptoms('');
    resetDiagnosis();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-field-green/10 text-field-green text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Field Pathologist AI
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-soil-dark">
          {t('diagnose.title', 'Crop Disease & Pest Diagnosis')}
        </h1>
        <p className="text-xs sm:text-sm text-soil-dark/70 mt-1 max-w-2xl">
          {t(
            'diagnose.subtitle',
            'Upload or photograph damaged crop parts for real-time pathology analysis and safe IPM guidance.'
          )}
        </p>
      </div>

      {/* 1-Click Sample Test Specimens */}
      <div className="paper-card rounded-xl p-4 border border-soil-dark/10 shadow-sm bg-parchment/40">
        <SampleImagePicker
          onSelectSample={handleSelectSample}
          activeSampleId={activeSample?.id}
        />
      </div>

      {/* Main Two-Panel Layout (Upload Left, Result Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT PANEL — IMAGE INPUT & CONTEXT */}
        <div className="lg:col-span-6 space-y-6">
          <form onSubmit={handleRunAnalysis} className="paper-card rounded-xl p-5 sm:p-6 shadow-md border border-soil-dark/10 space-y-5">
            {/* Image Upload Area */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-soil-dark block mb-2">
                Crop Photo or Field Capture
              </label>

              {previewImage ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-growth bg-soil-dark/5 h-64 group">
                  <img
                    src={previewImage}
                    alt="Specimen preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-soil-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white text-soil-dark rounded-lg text-xs font-semibold shadow hover:bg-parchment transition-colors"
                    >
                      Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="px-3 py-1.5 bg-danger-red text-white rounded-lg text-xs font-semibold shadow hover:bg-danger-dark transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  {activeSample && (
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-field-green text-white text-[10px] font-mono-data font-bold">
                      FIELD SPECIMEN: {activeSample.title}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-soil-dark/25 hover:border-field-green rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-colors bg-white/70 hover:bg-white flex flex-col items-center justify-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-mist flex items-center justify-center text-field-green">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-soil-dark">
                      {t('diagnose.upload_prompt', 'Drop image here or tap to capture from camera')}
                    </p>
                    <p className="text-[11px] text-soil-dark/60 mt-0.5">
                      JPG, PNG, WebP up to 15MB • Focus on damaged leaves, stems or fruit
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-3 py-1.5 bg-field-green text-white rounded-lg text-xs font-semibold shadow-sm hover:bg-field-dark transition-colors"
                    >
                      {t('diagnose.upload_btn', 'Upload Crop Photo')}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        cameraInputRef.current?.click();
                      }}
                      className="px-3 py-1.5 bg-soil-dark text-parchment rounded-lg text-xs font-semibold shadow-sm hover:bg-soil transition-colors flex items-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5 text-harvest-gold" />
                      <span>Camera</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Hidden File Inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Observed Symptoms Text Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-soil-dark">
                  {t('diagnose.symptoms_label', 'Observed Symptoms (Optional)')}
                </label>
                <span className="text-[10px] text-soil-dark/50">Field description</span>
              </div>
              <textarea
                rows={2}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder={t(
                  'diagnose.symptoms_placeholder',
                  'e.g., Yellowing margins, concentric brown rings, white fungal powder beneath leaf...'
                )}
                className="w-full text-xs p-3 bg-white border border-soil-dark/20 rounded-lg focus:outline-none focus:border-field-green text-soil-dark"
              />
            </div>

            {/* Crop Type & Growth Stage Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-soil-dark block mb-1.5">
                  {t('diagnose.crop_type', 'Crop Type')}
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none focus:border-field-green"
                >
                  {CROPS.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.icon} {c.name} ({c.season})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-soil-dark block mb-1.5">
                  {t('diagnose.growth_stage', 'Growth Stage')}
                </label>
                <select
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none focus:border-field-green"
                >
                  {GROWTH_STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location & Rainfall Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-soil-dark flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-field-green" />
                    <span>{t('diagnose.location', 'Location / District')}</span>
                  </label>
                  <button
                    type="button"
                    onClick={requestAutoLocation}
                    className="text-[10px] text-field-green hover:underline font-semibold"
                  >
                    {geoLoading ? 'Detecting...' : 'Auto-GPS'}
                  </button>
                </div>
                <select
                  value={coords.districtName}
                  onChange={(e) => {
                    const match = districts.find((d) => d.name === e.target.value);
                    if (match) selectDistrict(match.id);
                  }}
                  className="w-full text-xs p-2.5 bg-white border border-soil-dark/20 rounded-lg text-soil-dark focus:outline-none focus:border-field-green"
                >
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}, {d.state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-soil-dark flex items-center gap-1 mb-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-sky-blue" />
                  <span>{t('diagnose.rainfall', 'Recent Rainfall within 48h')}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRecentRain(true)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      recentRain
                        ? 'bg-sky-blue text-white border-sky-blue shadow-sm'
                        : 'bg-white text-soil-dark border-soil-dark/20'
                    }`}
                  >
                    Yes (Rain)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecentRain(false)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      !recentRain
                        ? 'bg-soil-dark text-parchment border-soil-dark shadow-sm'
                        : 'bg-white text-soil-dark border-soil-dark/20'
                    }`}
                  >
                    No (Dry)
                  </button>
                </div>
              </div>
            </div>

            {/* Run Analysis CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={analyzing}
                className="w-full py-3 bg-field-green hover:bg-field-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {analyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('diagnose.analyzing', 'Analyzing leaf pathology & spore signatures...')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-harvest-gold" />
                    <span>{t('diagnose.analyze_btn', 'Run AI Pathology Analysis')}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT PANEL — DIAGNOSIS RESULT OR IDLE HELPER */}
        <div className="lg:col-span-6">
          {result ? (
            <DiagnosisResult
              result={result}
              cropType={selectedCrop}
              location={coords.districtName}
            />
          ) : (
            <div className="paper-card rounded-xl p-8 border border-dashed border-soil-dark/20 text-center space-y-4 bg-white/50">
              <div className="w-16 h-16 rounded-2xl bg-mist flex items-center justify-center text-field-green mx-auto">
                <Sprout className="w-8 h-8" />
              </div>
              <div className="max-w-sm mx-auto">
                <h3 className="font-display font-bold text-lg text-soil-dark">
                  Pathology Diagnostic Standby
                </h3>
                <p className="text-xs text-soil-dark/70 mt-1 leading-relaxed">
                  Upload an image or pick one of the sample specimens above, then tap <strong>Run AI Pathology Analysis</strong> to receive immediate disease identification, confidence scoring, CIBRC chemical dosages, and follow-up guidance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 max-w-sm mx-auto text-left text-[11px] text-soil-dark/80">
                <div className="p-2.5 bg-parchment rounded-lg border border-soil-dark/10">
                  <span className="font-bold block text-soil-dark">✓ 8 Indian Crops</span>
                  Tomato, Onion, Chili, Grape, Cotton, Potato, Maize, Rice
                </div>
                <div className="p-2.5 bg-parchment rounded-lg border border-soil-dark/10">
                  <span className="font-bold block text-soil-dark">✓ CIBRC PHI Safety</span>
                  Pre-harvest intervals and authorized chemical dosages
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
