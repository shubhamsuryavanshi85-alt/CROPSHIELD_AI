import { useState, useEffect, useRef, useCallback } from 'react';

export function useSpeechRecognition({ defaultLanguage = 'en' } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef(null);

  const getLocaleCode = (langCode) => {
    switch (langCode) {
      case 'hi':
        return 'hi-IN';
      case 'mr':
        return 'mr-IN';
      case 'en':
      default:
        return 'en-IN';
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      const instance = new SpeechRecognition();
      instance.continuous = true;
      instance.interimResults = true;
      instance.lang = getLocaleCode(defaultLanguage);

      instance.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      instance.onresult = (event) => {
        let currentInterim = '';
        let currentFinal = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            currentFinal += transcriptChunk + ' ';
          } else {
            currentInterim += transcriptChunk;
          }
        }

        if (currentFinal) {
          setFinalTranscript((prev) => (prev + ' ' + currentFinal).trim());
          setInterimTranscript('');
        } else {
          setInterimTranscript(currentInterim);
        }
      };

      instance.onerror = (evt) => {
        console.warn('[CROPSHIELD][VOICE] Speech recognition error:', evt.error);
        if (evt.error === 'not-allowed' || evt.error === 'service-not-allowed') {
          setError('Microphone access is blocked. Please allow microphone access in browser settings.');
        } else if (evt.error === 'no-speech') {
          setError("I didn't hear anything. Please try speaking again.");
        } else {
          setError(`Speech recognition error: ${evt.error}`);
        }
        setIsListening(false);
      };

      instance.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = instance;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore unmount abort errors
        }
      }
    };
  }, []);

  const startListening = useCallback(
    (lang = defaultLanguage) => {
      if (!recognitionRef.current) return;
      try {
        setInterimTranscript('');
        setFinalTranscript('');
        setError(null);

        recognitionRef.current.lang = getLocaleCode(lang);
        recognitionRef.current.start();
      } catch (err) {
        console.warn('SpeechRecognition already active or failed to start:', err);
      }
    },
    [defaultLanguage]
  );

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {
      // Ignore stop errors
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setInterimTranscript('');
    setFinalTranscript('');
  }, []);

  return {
    isListening,
    interimTranscript,
    finalTranscript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
    error,
  };
}
