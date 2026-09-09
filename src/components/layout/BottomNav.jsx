import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, ShieldAlert, MapPin, CloudSun, BookOpen, Building2, LayoutDashboard } from 'lucide-react';

export default function BottomNav({ activePage, onNavigate }) {
  const { t } = useTranslation();

  const tabs = [
    { id: 'home', label: t('nav.home', 'Home'), icon: Sprout },
    { id: 'diagnose', label: t('nav.diagnose', 'Diagnose'), icon: ShieldAlert, highlight: true },
    { id: 'support', label: t('nav.support', 'Support'), icon: Building2 },
    { id: 'forecast', label: t('nav.forecast', 'Forecast'), icon: CloudSun },
    { id: 'map', label: t('nav.map', 'Map'), icon: MapPin },
    { id: 'advisory', label: t('nav.advisory', 'Advisory'), icon: BookOpen },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-soil-dark text-parchment border-t border-soil-light/80 shadow-2xl px-2 py-1.5 backdrop-blur-md"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;

          if (tab.highlight) {
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className="flex flex-col items-center justify-center -mt-5 group focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                    isActive
                      ? 'bg-harvest-gold text-soil-dark ring-4 ring-soil-dark'
                      : 'bg-field-green text-parchment border-2 border-growth'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-[10px] font-semibold mt-1 transition-colors ${
                    isActive ? 'text-harvest-gold' : 'text-parchment/80'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? 'text-harvest-gold font-bold' : 'text-parchment/60 hover:text-parchment'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-harvest-gold' : ''}`} />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
