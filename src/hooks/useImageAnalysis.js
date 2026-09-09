import { useState, useCallback } from 'react';
import { diagnoseCrop } from '../services/claudeAPI';
import { useFarmStore } from '../store/farmStore';
import { showToast } from './useToast';

export function useImageAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { addDiagnosisRecord } = useFarmStore();

  const analyze = useCallback(
    async ({
      imageBase64,
      cropType,
      growthStage,
      symptoms,
      location,
      recentRain,
      apiKey,
      sampleData = null,
      language = 'en',
    }) => {
      setAnalyzing(true);
      setError(null);

      try {
        let diagnosisData;

        diagnosisData = await diagnoseCrop({
          imageBase64,
          cropType,
          growthStage,
          symptoms,
          location,
          recentRain,
          apiKey,
          language,
          sampleId: sampleData?.id,
        });

        setResult(diagnosisData);

        // Save record to store
        addDiagnosisRecord({
          ...diagnosisData,
          cropType: cropType || sampleData?.crop || 'Tomato',
          growthStage: growthStage || sampleData?.growthStage || 'Vegetative',
          location: location || 'Nashik',
          hasImage: Boolean(imageBase64 || sampleData),
        });

        // Trigger appropriate toast
        if (diagnosisData.severity === 'critical' || diagnosisData.severity === 'high') {
          showToast(
            `High Severity Alert: ${diagnosisData.diagnosis}`,
            'Immediate containment actions recommended. Check safe chemical spray dosage.',
            'danger',
            6000
          );
        } else {
          showToast(
            `Diagnosis Complete: ${diagnosisData.diagnosis}`,
            `AI Confidence score: ${diagnosisData.confidence}%`,
            'success',
            4500
          );
        }

        return diagnosisData;
      } catch (err) {
        const msg = err.message || 'Diagnosis failed. Please check network or try again.';
        setError(msg);
        showToast('Analysis Error', msg, 'danger', 5000);
        throw err;
      } finally {
        setAnalyzing(false);
      }
    },
    [addDiagnosisRecord]
  );

  const resetDiagnosis = () => {
    setResult(null);
    setError(null);
  };

  return {
    analyze,
    analyzing,
    result,
    error,
    resetDiagnosis,
    setResult,
  };
}
