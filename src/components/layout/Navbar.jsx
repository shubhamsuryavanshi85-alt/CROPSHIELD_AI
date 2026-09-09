import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage, SUPPORTED_LANGUAGES } from '../../i18n/i18n';
import { useFarmStore } from '../../store/farmStore';
import {
  Sprout,
  ShieldAlert,
  CloudSun,
  MapPin,
  BookOpen,
  Building2,
  LayoutDashboard,
  Globe,
  Settings,
  Bell,
  CheckCircle2,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

const formatStr = (val, fallback = '') => {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object') {
    return val.label || val.name || val.disease || val.title || val.diagnosis || fallback;
  }
  return fallback;
};

export default function Navbar({ activePage, onNavigate, onOpenSettings }) {
  const { t, i18n } = useTranslation();
  const { reminders, toggleReminder } = useFarmStore();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showReminderMenu, setShowReminderMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const langRef = useRef(null);
  const reminderRef = useRef(null);

  const pendingReminders = reminders.filter((r) => !r.completed);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
      if (reminderRef.current && !reminderRef.current.contains(event.target)) {
        setShowReminderMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowLangMenu(false);
        setShowReminderMenu(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home', 'Home'), icon: Sprout },
    { id: 'diagnose', label: t('nav.diagnose', 'Diagnose'), icon: ShieldAlert },
    { id: 'forecast', label: t('nav.forecast', 'Forecast'), icon: CloudSun },
    { id: 'map', label: t('nav.map', 'Disease Map'), icon: MapPin },
    { id: 'advisory', label: t('nav.advisory', 'Advisories'), icon: BookOpen },
    { id: 'support', label: t('nav.support', 'Farmer Support'), icon: Building2, isSupport: true },
    { id: 'dashboard', label: t('nav.dashboard', 'Dashboard'), icon: LayoutDashboard },
  ];

  const handleLanguageSelect = (code) => {
    changeAppLanguage(code);
    setShowLangMenu(false);
  };

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-soil-dark text-parchment border-b border-soil-light/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* ================= 1. BRAND LOGO BLOCK ================= */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-growth/60 rounded-xl p-1 -ml-1 transition-all shrink-0"
            title="CropShield AI — Early eyes on every field."
          >
            {/* Logo Icon */}
            <div className="w-[42px] h-[42px] rounded-xl bg-field-green border border-growth/40 flex items-center justify-center shadow-inner group-hover:border-harvest-gold transition-colors shrink-0">
              <span className="text-2xl leading-none">🌾</span>
            </div>

            {/* Brand Text Block */}
            <div className="flex flex-col justify-center">
              <span className="font-display font-bold text-[19px] sm:text-xl text-parchment tracking-tight whitespace-nowrap group-hover:text-harvest-gold transition-colors leading-none">
                CropShield AI
              </span>
              <p className="text-[11px] text-parchment/65 font-sans tracking-wide leading-tight mt-1 whitespace-nowrap">
                {t('tagline', 'Early eyes on every field.')}
              </p>
            </div>
          </button>

          {/* ================= 2. DESKTOP PRIMARY NAVIGATION ================= */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              if (item.isSupport) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-field-green text-harvest-gold border border-harvest-gold/60 shadow-sm'
                        : 'bg-field-green/40 text-parchment hover:bg-field-green/70 border border-growth/30'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-harvest-gold' : 'text-growth-light'}`} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-field-green text-parchment font-semibold border border-growth/40 shadow-sm'
                      : 'text-parchment/75 hover:text-parchment hover:bg-soil-light/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-harvest-gold' : 'text-parchment/60'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ================= 3. UTILITY ACTIONS ================= */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Visual Divider on Desktop */}
            <div className="h-6 w-px bg-soil-light/70 mx-1 hidden lg:block" />

            {/* Notifications / Reminders Bell */}
            <div className="relative" ref={reminderRef}>
              <button
                onClick={() => {
                  setShowReminderMenu(!showReminderMenu);
                  setShowLangMenu(false);
                }}
                className={`relative p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-growth/60 ${
                  showReminderMenu
                    ? 'bg-soil-light text-parchment'
                    : 'text-parchment/80 hover:text-parchment hover:bg-soil-light/80'
                }`}
                aria-label="Active Reminders"
                aria-expanded={showReminderMenu}
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
                              <span className="font-bold text-soil-dark">{formatStr(rem.crop)}</span>
                              <span className="text-danger-red font-semibold text-[11px]">
                                • {formatStr(rem.disease)}
                              </span>
                            </div>
                            <p className="text-[11px] text-soil-dark/80 mt-0.5">{formatStr(rem.action)}</p>
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
            <div className="relative" ref={langRef}>
              <button
                onClick={() => {
                  setShowLangMenu(!showLangMenu);
                  setShowReminderMenu(false);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-soil-light/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-growth/60 ${
                  showLangMenu
                    ? 'bg-soil-light text-parchment border-growth/40'
                    : 'bg-soil-light/80 text-parchment hover:bg-soil-light'
                }`}
                aria-label="Select Language"
                aria-expanded={showLangMenu}
              >
                <Globe className="w-4 h-4 text-harvest-gold" />
                <span className="hidden sm:inline font-sans">{currentLangObj.native}</span>
                <span className="sm:hidden uppercase font-mono-data">{currentLangObj.code}</span>
                <ChevronDown className={`w-3 h-3 text-parchment/60 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-soil-dark/15 text-soil-dark p-1.5 z-50 animate-slide-up">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-soil-dark/50 uppercase tracking-wider border-b border-soil-dark/10 mb-1">
                    Select Language / भाषा चुनें
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                        i18n.language === lang.code
                          ? 'bg-field-green text-white font-semibold shadow-sm'
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
              className="p-2 text-parchment/80 hover:text-parchment hover:bg-soil-light/80 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-growth/60"
              aria-label="Application Settings"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Mobile Navigation Toggle (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-parchment hover:bg-soil-light/80 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-growth/60"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-harvest-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= 4. RESPONSIVE MOBILE MENU DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-soil-dark border-b border-soil-light/80 text-parchment px-4 pt-2 pb-5 shadow-2xl animate-slide-up max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="space-y-1 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors min-h-[46px] ${
                    isActive
                      ? 'bg-field-green text-harvest-gold font-semibold border border-harvest-gold/40 shadow-sm'
                      : 'text-parchment/80 hover:text-parchment hover:bg-soil-light/70'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-harvest-gold' : 'text-growth-light'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-soil-light/60 flex items-center justify-between text-xs text-parchment/70">
            <span>CropShield AI</span>
            <span className="text-growth-light">Smart India Hackathon 2026</span>
          </div>
        </div>
      )}
    </header>
  );
}
