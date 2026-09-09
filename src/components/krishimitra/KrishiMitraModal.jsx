import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { askKrishiMitra } from '../../services/krishimitra/krishiMitraService';
import { detectIntent, INTENTS } from '../../services/krishimitra/intentRouter';
import { useFarmStore } from '../../store/farmStore';
import { useVoiceAssistant, ASSISTANT_STATES } from '../../hooks/useVoiceAssistant';
import VoiceOrb from './VoiceOrb';
import {
  X,
  Send,
  Bot,
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Camera,
  CloudSun,
  BookOpen,
  MapPin,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

export default function KrishiMitraModal({ isOpen, onClose, onNavigate }) {
  const { t, i18n } = useTranslation();
  const { activeFarm, diagnoses } = useFarmStore();

  const [chatLang, setChatLang] = useState(i18n.language || 'en');
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const chatEndRef = useRef(null);

  // Core callback when final transcript is received from speech recognition
  const handleVoiceQuery = useCallback(
    (transcriptText) => {
      if (transcriptText) {
        handleSend(transcriptText);
      }
    },
    []
  );

  const {
    assistantState,
    setAssistantState,
    toggleVoiceInput,
    speakText,
    stopSpeaking,
    resetAssistant,
    interimTranscript,
    errorMessage: voiceError,
    isSpeechRecognitionSupported,
    isListening,
    isSpeaking,
  } = useVoiceAssistant({
    language: chatLang,
    onFinalTranscript: handleVoiceQuery,
  });

  // Sync language with app if changed
  useEffect(() => {
    setChatLang(i18n.language || 'en');
  }, [i18n.language]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const isHi = chatLang === 'hi';
      const isMr = chatLang === 'mr';

      const welcomeText = isHi
        ? 'नमस्ते! 🙏 मैं कृषि मित्र हूँ। आप मुझसे बोलकर या लिखकर अपनी फसल, कीटों, मौसम के खतरे या सलाह के बारे में पूछ सकते हैं।'
        : isMr
        ? 'नमस्कार! 🙏 मी कृषी मित्र आहे. आपण माझ्याशी बोलून किंवा लिहून आपल्या पिकांबद्दल किंवा हवामान धोक्याबद्दल विचारू शकता.'
        : "Namaste! 🙏 I'm KrishiMitra. You can speak or type to ask me about crop disease, pests, weather risk, or advisory guidance.";

      setMessages([
        {
          id: 'welcome_01',
          sender: 'assistant',
          text: welcomeText,
          isWelcome: true,
        },
      ]);
    }
  }, [isOpen, chatLang, messages.length]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, interimTranscript, isOpen]);

  // Cleanup speech on modal close
  useEffect(() => {
    if (!isOpen) {
      resetAssistant();
    }
  }, [isOpen, resetAssistant]);

  if (!isOpen) return null;

  const handleSend = async (textToSend) => {
    const q = textToSend || inputQuery;
    if (!q || !q.trim() || loading) return;

    // Check for direct voice navigation commands
    const detected = detectIntent(q.trim());
    if (detected.route) {
      handleNavigate(detected.route);
      return;
    }

    const userMsg = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: q.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);
    setAssistantState(ASSISTANT_STATES.PROCESSING);

    try {
      const latestDiagnosis = diagnoses && diagnoses.length > 0 ? diagnoses[0] : null;
      const farmContext = {
        crop: activeFarm?.crop || 'Tomato',
        location: activeFarm?.district || 'Nashik',
        latestDiagnosis,
      };

      const response = await askKrishiMitra({
        query: q.trim(),
        language: chatLang,
        farmContext,
      });

      setMessages((prev) => [...prev, response]);

      // Read aloud assistant response if voice output enabled
      if (autoSpeak && response.text) {
        speakText(response.text, chatLang);
      } else {
        setAssistantState(ASSISTANT_STATES.IDLE);
      }
    } catch (err) {
      setAssistantState(ASSISTANT_STATES.ERROR);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'assistant',
          text:
            chatLang === 'hi'
              ? 'क्षमा करें, AI सेवा से जुड़ने में समस्या हुई। आप CropShield की ऑफलाईन सुविधाओं का उपयोग कर सकते हैं।'
              : chatLang === 'mr'
              ? 'क्षमस्व, AI सेवेशी कनेक्ट करण्यात समस्या आली. आपण CropShield ऑफलाईन सुविधा वापरू शकता.'
              : "I couldn't connect to the AI service right now. You can still use CropShield's offline features or open Diagnose.",
          primaryAction: {
            label: chatLang === 'hi' ? '📷 फसल जांचें' : chatLang === 'mr' ? '📷 पीक तपासा' : '📷 Check My Crop',
            route: 'diagnose',
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (actionKey) => {
    let queryText = '';
    if (actionKey === 'crop_problem') {
      queryText = chatLang === 'hi' ? 'मेरी फसल की पत्तियां पीली पड़ रही हैं' : chatLang === 'mr' ? 'माझ्या पिकाची पाने पिवळी पडत आहेत' : 'My crop leaves are turning yellow';
    } else if (actionKey === 'pest_help') {
      queryText = chatLang === 'hi' ? 'फसल में कीट लगे हैं क्या करूं' : chatLang === 'mr' ? 'पिकावर कीड पडली आहे काय करू' : 'How to control pests in my crop?';
    } else if (actionKey === 'weather_risk') {
      queryText = chatLang === 'hi' ? 'मौसम का खतरा दिखाएं' : chatLang === 'mr' ? 'हवामान धोका दाखवा' : 'Show weather risk forecast';
    } else if (actionKey === 'check_crop') {
      handleNavigate('diagnose');
      return;
    } else if (actionKey === 'disease_map') {
      handleNavigate('map');
      return;
    } else {
      queryText = chatLang === 'hi' ? 'मुझे खेती की सलाह चाहिए' : chatLang === 'mr' ? 'मला शेती सल्ला हवा आहे' : 'Give me farming advice';
    }

    handleSend(queryText);
  };

  const handleNavigate = (route) => {
    resetAssistant();
    if (onNavigate) {
      onNavigate(route);
      onClose();
    }
  };

  const getActionIcon = (route) => {
    switch (route) {
      case 'diagnose':
        return <Camera className="w-3.5 h-3.5" />;
      case 'forecast':
        return <CloudSun className="w-3.5 h-3.5" />;
      case 'advisory':
        return <BookOpen className="w-3.5 h-3.5" />;
      case 'map':
        return <MapPin className="w-3.5 h-3.5" />;
      case 'dashboard':
        return <LayoutDashboard className="w-3.5 h-3.5" />;
      default:
        return <ArrowRight className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-soil-dark border border-soil-light text-parchment w-full sm:max-w-xl h-[92vh] sm:h-[680px] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 bg-soil border-b border-soil-light flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-field-green border border-growth flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-harvest-gold" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-base text-white">KrishiMitra AI Voice Assistant</h3>
              </div>
              <p className="text-[11px] text-parchment/70 font-sans">
                Multilingual AI Voice Companion for Farmers
              </p>
            </div>
          </div>

          {/* Controls: Audio Toggle, Language Switcher, Close */}
          <div className="flex items-center gap-2">
            {/* Auto Speak Toggle */}
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`p-1.5 rounded-lg border transition-colors ${
                autoSpeak
                  ? 'bg-growth/20 border-growth text-growth-light'
                  : 'bg-soil border-soil-light text-parchment/50'
              }`}
              title={autoSpeak ? 'Voice output enabled' : 'Voice output muted'}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-soil-dark border border-soil-light rounded-lg p-0.5 text-xs font-medium">
              <button
                onClick={() => setChatLang('en')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  chatLang === 'en' ? 'bg-field-green text-white font-bold' : 'text-parchment/60 hover:text-parchment'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setChatLang('hi')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  chatLang === 'hi' ? 'bg-field-green text-white font-bold' : 'text-parchment/60 hover:text-parchment'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setChatLang('mr')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  chatLang === 'mr' ? 'bg-field-green text-white font-bold' : 'text-parchment/60 hover:text-parchment'
                }`}
              >
                मराठी
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-soil-light text-parchment/70 hover:text-parchment transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive Voice Visualizer Banner */}
        <div className="bg-soil/60 border-b border-soil-light px-4 py-2 flex flex-col items-center justify-center">
          <VoiceOrb
            state={assistantState}
            onMicClick={toggleVoiceInput}
          />
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-soil-dark/95">
          {/* Quick Actions Bar */}
          <div className="pb-1">
            <span className="text-[10px] uppercase font-mono-data tracking-wider text-parchment/50 block mb-2">
              Quick Farmer Voice Commands
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickAction('crop_problem')}
                className="px-2.5 py-1.5 rounded-lg bg-soil hover:bg-soil-light border border-soil-light text-xs text-parchment font-medium transition-all"
              >
                🌱 {chatLang === 'hi' ? 'पत्तियां पीली हैं' : chatLang === 'mr' ? 'पाने पिवळी आहेत' : 'Yellow Leaves'}
              </button>
              <button
                onClick={() => handleQuickAction('weather_risk')}
                className="px-2.5 py-1.5 rounded-lg bg-soil hover:bg-soil-light border border-soil-light text-xs text-parchment font-medium transition-all"
              >
                🌦️ {chatLang === 'hi' ? 'मौसम खतरा' : chatLang === 'mr' ? 'हवामान धोका' : 'Weather Risk'}
              </button>
              <button
                onClick={() => handleQuickAction('check_crop')}
                className="px-2.5 py-1.5 rounded-lg bg-field-green/20 hover:bg-field-green/30 border border-growth/40 text-xs text-growth-light font-bold transition-all flex items-center gap-1"
              >
                📷 {chatLang === 'hi' ? 'फोटो जांचें' : chatLang === 'mr' ? 'फोटो तपासा' : 'Check My Crop'}
              </button>
              <button
                onClick={() => handleQuickAction('disease_map')}
                className="px-2.5 py-1.5 rounded-lg bg-sky-blue/20 hover:bg-sky-blue/30 border border-sky-blue/40 text-xs text-sky-light font-medium transition-all"
              >
                🗺️ {chatLang === 'hi' ? 'रोग का नक्शा' : chatLang === 'mr' ? 'रोगाचा नकाशा' : 'Disease Map'}
              </button>
            </div>
          </div>

          {/* Live Interim Transcript Banner */}
          {isListening && (
            <div className="p-3 bg-danger-red/10 border border-danger-red/30 rounded-xl animate-pulse flex items-start gap-2 text-xs text-parchment">
              <Mic className="w-4 h-4 text-danger-red shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-danger-light text-[10px] uppercase font-mono-data">
                  Live Voice Transcript:
                </span>
                <p className="italic text-parchment/90 font-serif">
                  {interimTranscript || (chatLang === 'hi' ? 'बोलिए...' : chatLang === 'mr' ? 'बोला...' : 'Listening to your voice...')}
                </p>
              </div>
            </div>
          )}

          {/* Messages Stream */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    isUser ? 'bg-harvest-gold text-soil-dark font-bold' : 'bg-field-green text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed space-y-2 shadow-md ${
                    isUser
                      ? 'bg-harvest-gold text-soil-dark font-medium rounded-tr-none'
                      : 'bg-soil border border-soil-light text-parchment rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Actions inside Assistant message */}
                  {!isUser && (msg.primaryAction || msg.secondaryAction) && (
                    <div className="pt-2 border-t border-parchment/10 flex flex-wrap gap-2">
                      {msg.primaryAction && (
                        <button
                          onClick={() => handleNavigate(msg.primaryAction.route)}
                          className="py-1.5 px-3 rounded-lg bg-field-green hover:bg-growth text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          {getActionIcon(msg.primaryAction.route)}
                          <span>{msg.primaryAction.label}</span>
                        </button>
                      )}
                      {msg.secondaryAction && (
                        <button
                          onClick={() => handleNavigate(msg.secondaryAction.route)}
                          className="py-1.5 px-3 rounded-lg bg-soil-light hover:bg-soil-light/80 text-parchment text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                          {getActionIcon(msg.secondaryAction.route)}
                          <span>{msg.secondaryAction.label}</span>
                        </button>
                      )}
                    </div>
                  )}

                  {!isUser && (
                    <div className="flex items-center justify-between pt-1 text-[10px] text-parchment/50 font-mono-data">
                      <span>{msg.disclaimer || 'KrishiMitra Voice Response'}</span>
                      <button
                        onClick={() => speakText(msg.text, chatLang)}
                        className="text-harvest-gold hover:underline flex items-center gap-1 font-semibold"
                        title="Replay Voice"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Voice Error Notice */}
          {voiceError && (
            <div className="p-3 bg-danger-red/15 border border-danger-red/40 rounded-xl text-xs text-parchment flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-danger-red shrink-0" />
              <span>{voiceError}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-soil border-t border-soil-light flex items-center gap-2">
          {/* Main Microphone Button */}
          <button
            onClick={toggleVoiceInput}
            className={`p-3 rounded-xl font-bold transition-all shadow-md shrink-0 flex items-center gap-1.5 ${
              isListening
                ? 'bg-danger-red text-white animate-pulse'
                : isSpeaking
                ? 'bg-growth text-white'
                : 'bg-harvest-gold text-soil-dark hover:bg-harvest-light'
            }`}
            title={isSpeaking ? 'Stop speaking & listen' : isListening ? 'Stop listening' : 'Start voice input'}
            aria-label="Microphone input"
          >
            {isListening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              chatLang === 'hi'
                ? 'बोलो या लिखो (उदा: रोग जांचें, सोयाबीन की पत्तियां पीली हैं...)'
                : chatLang === 'mr'
                ? 'बोला किंवा लिहा (उदा: रोग तपासा, सोयाबीनची पाने पिवळी आहेत...)'
                : 'Speak or type (e.g. Check my crop, weather risk...)'
            }
            className="flex-1 bg-soil-dark text-parchment text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-soil-light focus:outline-none focus:border-harvest-gold placeholder:text-parchment/40"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || loading}
            className="p-2.5 bg-field-green hover:bg-growth disabled:opacity-40 text-white rounded-xl font-bold transition-colors shadow-md shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
