import React from 'react';
import { Mic, Volume2, Sparkles, AlertCircle, Bot } from 'lucide-react';
import { ASSISTANT_STATES } from '../../hooks/useVoiceAssistant';

export default function VoiceOrb({ state = ASSISTANT_STATES.IDLE, onMicClick }) {
  const getOrbStyle = () => {
    switch (state) {
      case ASSISTANT_STATES.LISTENING:
        return 'bg-gradient-to-tr from-danger-red via-harvest-gold to-growth animate-pulse scale-105 shadow-[0_0_30px_rgba(229,115,115,0.6)]';
      case ASSISTANT_STATES.PROCESSING:
        return 'bg-gradient-to-tr from-sky-blue via-harvest-gold to-field-green animate-spin-slow scale-100 shadow-[0_0_25px_rgba(41,128,185,0.5)]';
      case ASSISTANT_STATES.SPEAKING:
        return 'bg-gradient-to-tr from-growth via-field-green to-harvest-gold animate-bounce-subtle scale-105 shadow-[0_0_30px_rgba(92,158,49,0.7)]';
      case ASSISTANT_STATES.ERROR:
        return 'bg-gradient-to-tr from-danger-dark to-danger-red shadow-[0_0_20px_rgba(180,40,40,0.5)]';
      case ASSISTANT_STATES.IDLE:
      default:
        return 'bg-gradient-to-tr from-field-green via-growth to-harvest-gold opacity-90 hover:opacity-100 hover:scale-105 shadow-[0_0_20px_rgba(92,158,49,0.4)]';
    }
  };

  const getStatusLabel = () => {
    switch (state) {
      case ASSISTANT_STATES.LISTENING:
        return { icon: <Mic className="w-3.5 h-3.5 text-danger-red animate-pulse" />, text: 'Listening...', color: 'text-danger-red' };
      case ASSISTANT_STATES.PROCESSING:
        return { icon: <Sparkles className="w-3.5 h-3.5 text-harvest-gold animate-spin" />, text: 'KrishiMitra is thinking...', color: 'text-harvest-gold' };
      case ASSISTANT_STATES.SPEAKING:
        return { icon: <Volume2 className="w-3.5 h-3.5 text-growth-light animate-bounce" />, text: 'KrishiMitra is speaking...', color: 'text-growth-light' };
      case ASSISTANT_STATES.ERROR:
        return { icon: <AlertCircle className="w-3.5 h-3.5 text-danger-light" />, text: 'Voice service unavailable', color: 'text-danger-light' };
      case ASSISTANT_STATES.IDLE:
      default:
        return { icon: <Bot className="w-3.5 h-3.5 text-parchment/70" />, text: 'Tap mic or type to speak', color: 'text-parchment/70' };
    }
  };

  const status = getStatusLabel();

  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-2">
      {/* Orb Outer Pulse Aura */}
      <div className="relative flex items-center justify-center">
        {state === ASSISTANT_STATES.LISTENING && (
          <div className="absolute w-24 h-24 rounded-full bg-danger-red/20 animate-ping pointer-events-none" />
        )}
        {state === ASSISTANT_STATES.SPEAKING && (
          <div className="absolute w-24 h-24 rounded-full bg-growth/20 animate-pulse pointer-events-none" />
        )}

        {/* Interactive Center Orb */}
        <button
          onClick={onMicClick}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer relative z-10 ${getOrbStyle()}`}
          title={state === ASSISTANT_STATES.SPEAKING ? 'Tap to stop speaking & listen' : 'Tap to start voice input'}
          aria-label="Toggle voice input"
        >
          <div className="w-16 h-16 rounded-full bg-soil-dark/40 backdrop-blur-md flex items-center justify-center border border-white/20">
            {state === ASSISTANT_STATES.SPEAKING ? (
              <Volume2 className="w-8 h-8 text-white animate-pulse" />
            ) : state === ASSISTANT_STATES.LISTENING ? (
              <Mic className="w-8 h-8 text-white animate-bounce" />
            ) : (
              <Mic className="w-7 h-7 text-harvest-gold" />
            )}
          </div>
        </button>
      </div>

      {/* Audio Waveform Graphic Bar Simulation */}
      {state === ASSISTANT_STATES.SPEAKING && (
        <div className="flex items-center gap-1 h-4">
          <span className="w-1 bg-growth animate-pulse h-2 rounded-full" />
          <span className="w-1 bg-harvest-gold animate-bounce h-4 rounded-full" />
          <span className="w-1 bg-growth-light animate-pulse h-3 rounded-full" />
          <span className="w-1 bg-harvest-gold animate-bounce h-4 rounded-full" />
          <span className="w-1 bg-growth animate-pulse h-2 rounded-full" />
        </div>
      )}

      {/* State Text Badge */}
      <div className="flex items-center gap-1.5 text-xs font-medium font-sans">
        {status.icon}
        <span className={status.color}>{status.text}</span>
      </div>
    </div>
  );
}
