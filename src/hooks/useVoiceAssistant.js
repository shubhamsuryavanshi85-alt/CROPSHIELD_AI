import { useState, useCallback, useEffect } from 'react';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useSpeechSynthesis } from './useSpeechSynthesis';

export const ASSISTANT_STATES = {
  IDLE: 'IDLE',
  LISTENING: 'LISTENING',
  PROCESSING: 'PROCESSING',
  SPEAKING: 'SPEAKING',
  ERROR: 'ERROR',
};

export function useVoiceAssistant({ language = 'en', onFinalTranscript = null } = {}) {
  const [assistantState, setAssistantState] = useState(ASSISTANT_STATES.IDLE);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    isListening,
    interimTranscript,
    finalTranscript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: isSpeechRecognitionSupported,
    error: recognitionError,
  } = useSpeechRecognition({ defaultLanguage: language });

  const {
    speak,
    stop: stopSpeaking,
    isSpeaking,
    isSupported: isSpeechSynthesisSupported,
  } = useSpeechSynthesis();

  // Handle SpeechRecognition error
  useEffect(() => {
    if (recognitionError) {
      setAssistantState(ASSISTANT_STATES.ERROR);
      setErrorMessage(recognitionError);
    }
  }, [recognitionError]);

  // Sync assistant state when recognition or synthesis states change
  useEffect(() => {
    if (isListening) {
      setAssistantState(ASSISTANT_STATES.LISTENING);
    } else if (isSpeaking) {
      setAssistantState(ASSISTANT_STATES.SPEAKING);
    } else if (assistantState !== ASSISTANT_STATES.PROCESSING && assistantState !== ASSISTANT_STATES.ERROR) {
      setAssistantState(ASSISTANT_STATES.IDLE);
    }
  }, [isListening, isSpeaking, assistantState]);

  // When final transcript completes in listening mode
  useEffect(() => {
    if (finalTranscript && finalTranscript.trim() && !isListening) {
      if (onFinalTranscript) {
        setAssistantState(ASSISTANT_STATES.PROCESSING);
        onFinalTranscript(finalTranscript.trim());
      }
    }
  }, [finalTranscript, isListening, onFinalTranscript]);

  // Barge-In Interrupt: Tapping mic while speaking immediately stops TTS & starts listening
  const toggleVoiceInput = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking();
    }

    if (isListening) {
      stopListening();
      setAssistantState(ASSISTANT_STATES.IDLE);
    } else {
      resetTranscript();
      setAssistantState(ASSISTANT_STATES.LISTENING);
      startListening(language);
    }
  }, [isSpeaking, isListening, stopSpeaking, stopListening, resetTranscript, startListening, language]);

  const speakText = useCallback(
    (text, lang = language, onEnd = null) => {
      stopSpeaking();
      setAssistantState(ASSISTANT_STATES.SPEAKING);
      speak(text, lang, () => {
        setAssistantState(ASSISTANT_STATES.IDLE);
        if (onEnd) onEnd();
      });
    },
    [stopSpeaking, speak, language]
  );

  const resetAssistant = useCallback(() => {
    stopSpeaking();
    stopListening();
    resetTranscript();
    setAssistantState(ASSISTANT_STATES.IDLE);
    setErrorMessage(null);
  }, [stopSpeaking, stopListening, resetTranscript]);

  return {
    assistantState,
    setAssistantState,
    toggleVoiceInput,
    speakText,
    stopSpeaking,
    resetAssistant,
    interimTranscript,
    finalTranscript,
    errorMessage,
    isSpeechRecognitionSupported,
    isSpeechSynthesisSupported,
    isListening,
    isSpeaking,
  };
}
