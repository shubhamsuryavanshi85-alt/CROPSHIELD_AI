import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage, SUPPORTED_LANGUAGES } from '../../i18n/i18n';
import { useFarmStore } from '../../store/farmStore';
import {
  ShieldAlert,
  Sprout,
  CloudSun,
  MapPin,
  BookOpen,
  LayoutDashboard,
  Globe,
  Settings,
  Bell,
  CheckCircle2,
} from 'lucide-react';

export default function Navbar({ activePage, onNavigate, onOpenSettings }) {
  const { t, i18n } = useTranslation();
  const { reminders, toggleReminder } = useFarmStore();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showReminderMenu, setShowReminderMenu] = useState(false);

  const pendingReminders = reminders.filter((r) => !r.completed);

  const navItems = [
    { id: 'home', label: t('nav.home', 'Home'), icon: Sprout },
    { id: 'diagnose', label: t('nav.diagnose', 'Diagnose Crop'), icon: ShieldAlert },
    { id: 'forecast', label: t('nav.forecast', 'Risk Forecast'), icon: CloudSun },
    { id: 'map', label: t('nav.map', 'Disease Map'), icon: MapPin },
    { id: 'advisory', label: t('nav.advisory', 'Advisories'), icon: BookOpen },
    { id: 'dashboard', label: t('nav.dashboard', 'Official Dashboard'), icon: LayoutDashboard },
  ];

  const handleLanguageSelect = (code) => {
    changeAppLanguage(code);
    setShowLangMenu(false);
  };

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-soil-dark text-parchment border-b border-soil-light shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-field-green border border-growth/40 flex items-center justify-center shadow-inner group-hover:border-harvest-gold transition-colors">
              <span className="text-xl">🌾</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg text-parchment tracking-tight group-hover:text-harvest-gold transition-colors">
                  CropShield AI
                </span>
                <span className="text-[10px] font-mono-data px-1.5 py-0.2 bg-growth/20 text-growth-light rounded border border-growth/30 uppercase tracking-wider">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] text-parchment/60 font-sans tracking-wide">
                {t('tagline', 'Early eyes on every field.')}
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-field-green text-parchment border-b-2 border-harvest-gold shadow-sm'
                      : 'text-parchment/80 hover:text-parchment hover:bg-soil-light'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-harvest-gold' : 'text-parchment/70'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Utility Tools: Language, Reminders, Settings */}
          <div className="flex items-center gap-2">
            {/* Reminders Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowReminderMenu(!showReminderMenu);
                  setShowLangMenu(false);
                }}
                className="relative p-2 text-parchment/80 hover:text-parchment hover:bg-soil-light rounded-lg transition-colors"
                aria-label="Active Reminders"
              >
                <Bell className="w-5 h-5" />
                {pendingReminders.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-warning-amber text-soil-dark text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {pendingReminders.length}
                  </span>
                )}
              </button>

              {/* Reminders Dropdown */}
              {showReminderMenu && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-soil-dark/15 text-soil-dark p-3 z-50 animate-slide-up">
                  <div className="flex items-center justify-between pb-2 border-b border-soil-dark/10">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-soil-dark flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-warning-amber" />
                      Follow-up Reminders ({pendingReminders.length})
                    </h4>
                    <span className="text-[10px] text-soil-dark/60 font-mono-data">Field Alerts</span>
                  </div>

                  <div className="max-h-56 overflow-y-auto divide-y divide-soil-dark/5 mt-1">
                    {reminders.length === 0 ? (
                      <p className="text-xs text-soil-dark/60 p-3 text-center">
                        No active follow-up reminders.
                      </p>
                    ) : (
                      reminders.map((rem) => (
                        <div
                          key={rem.id}
                          className={`p-2.5 text-xs flex items-start justify-between gap-2 hover:bg-parchment/50 rounded transition-colors ${
                            rem.completed ? 'opacity-50 line-through' : ''
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-soil-dark">{rem.crop}</span>
                              <span className="text-danger-red font-semibold text-[11px]">
                                • {rem.disease}
                              </span>
                            </div>
                            <p className="text-[11px] text-soil-dark/80 mt-0.5">{rem.action}</p>
                            <span className="text-[10px] text-soil-dark/60 font-mono-data mt-1 block">
                              Due: {rem.dueDate}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleReminder(rem.id)}
                            className="text-soil-dark/40 hover:text-growth p-1 shrink-0"
                            title={rem.completed ? 'Mark incomplete' : 'Mark done'}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 ${rem.completed ? 'text-growth' : ''}`}
                            />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangMenu(!showLangMenu);
                  setShowReminderMenu(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-parchment bg-soil-light hover:bg-soil-light/80 rounded-lg border border-soil-light/50 transition-colors"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-harvest-gold" />
                <span className="hidden sm:inline">{currentLangObj.native}</span>
                <span className="sm:hidden uppercase">{currentLangObj.code}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-soil-dark/15 text-soil-dark p-1.5 z-50 animate-slide-up">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-soil-dark/50 uppercase tracking-wider border-b border-soil-dark/10">
                    Select Language
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                        i18n.language === lang.code
                          ? 'bg-field-green text-white font-semibold'
                          : 'text-soil-dark hover:bg-parchment'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] opacity-70 uppercase font-mono-data">
                        {lang.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Settings Trigger */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-parchment/80 hover:text-parchment hover:bg-soil-light rounded-lg transition-colors"
              aria-label="Application Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
