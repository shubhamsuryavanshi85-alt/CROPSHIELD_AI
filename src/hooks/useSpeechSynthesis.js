import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Strips markdown symbols, code blocks, URLs, and formatting markers for speech output.
 */
export function stripMarkdownForTTS(text = '') {
  if (!text) return '';
  return text
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/`([^`]+)`/g, '$1') // remove inline code markers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // link text only
    .replace(/\*\*([^*]+)\*\*/g, '$1') // remove bold
    .replace(/\*([^*]+)\*/g, '$1') // remove italic
    .replace(/#{1,6}\s+/g, '') // remove headers
    .replace(/^[\s*-]+/gm, '') // remove bullet points
    .replace(/https?:\/\/\S+/g, '') // remove URLs
    .replace(/[{}[\]()\\/]/g, ' ') // remove special code braces
    .replace(/\s+/g, ' ')
    .trim();
}

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const activeUtteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    } else {
      setIsSupported(false);
    }
  }, []);

  const getBestVoice = useCallback(
    (langCode) => {
      if (!voices.length) return null;

      const targetLang =
        langCode === 'hi'
          ? 'hi-IN'
          : langCode === 'mr'
          ? 'mr-IN'
          : 'en-IN';

      // 1. Exact match
      let matched = voices.find((v) => v.lang === targetLang || v.lang.replace('_', '-') === targetLang);
      if (matched) return matched;

      // 2. Prefix match (e.g. hi, mr, en)
      const prefix = langCode === 'mr' ? 'mr' : langCode === 'hi' ? 'hi' : 'en';
      matched = voices.find((v) => v.lang.startsWith(prefix));
      if (matched) return matched;

      // 3. Indian English fallback for Hindi/Marathi if voice missing
      matched = voices.find((v) => v.lang.includes('en-IN') || v.lang.includes('en_IN'));
      if (matched) return matched;

      return voices[0] || null;
    },
    [voices]
  );

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      activeUtteranceRef.current = null;
    }
  }, []);

  const speak = useCallback(
    (text, lang = 'en', onEndCallback = null) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      stop(); // Stop any active speech

      const cleanText = stripMarkdownForTTS(text);
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const matchedVoice = getBestVoice(lang);
      if (matchedVoice) {
        utterance.voice = matchedVoice;
        utterance.lang = matchedVoice.lang;
      } else {
        utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
      }

      utterance.rate = 0.95; // Friendly conversational pace for farmers
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        activeUtteranceRef.current = null;
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = (e) => {
        console.warn('[CROPSHIELD][TTS] Speech error:', e);
        setIsSpeaking(false);
        activeUtteranceRef.current = null;
      };

      activeUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [getBestVoice, stop]
  );

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    voices,
  };
}
