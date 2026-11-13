import React, { createContext, useContext, useState, useEffect } from 'react';
import { CLINIC_CONFIG } from '../config/clinic';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('diyas_clinic_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('diyas_clinic_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    const langDict = CLINIC_CONFIG.translations[language] || CLINIC_CONFIG.translations.en;
    return langDict[key] || CLINIC_CONFIG.translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
