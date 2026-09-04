import { useState, useEffect } from 'react';

const STORAGE_KEY_API_KEY = 'cropshield_anthropic_key';
const STORAGE_KEY_SPEECH = 'cropshield_speech_enabled';

class SettingsManager {
  constructor() {
    this.listeners = new Set();
    this.apiKey = localStorage.getItem(STORAGE_KEY_API_KEY) || '';
    this.speechEnabled = localStorage.getItem(STORAGE_KEY_SPEECH) === 'true';
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }

  setApiKey(key) {
    this.apiKey = key.trim();
    if (this.apiKey) {
      localStorage.setItem(STORAGE_KEY_API_KEY, this.apiKey);
    } else {
      localStorage.removeItem(STORAGE_KEY_API_KEY);
    }
    this.notify();
  }

  setSpeechEnabled(enabled) {
    this.speechEnabled = enabled;
    localStorage.setItem(STORAGE_KEY_SPEECH, String(enabled));
    this.notify();
  }
}

export const settingsStore = new SettingsManager();

export function useSettingsStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    return settingsStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  return {
    apiKey: settingsStore.apiKey,
    speechEnabled: settingsStore.speechEnabled,
    setApiKey: (key) => settingsStore.setApiKey(key),
    setSpeechEnabled: (val) => settingsStore.setSpeechEnabled(val),
  };
}
