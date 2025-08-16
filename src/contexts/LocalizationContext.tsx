import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations';

interface LocalizationContextType {
  language: string;
  currency: string;
  setLanguage: (lang: string) => void;
  setCurrency: (curr: string) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

interface CurrencyFormat {
  [key: string]: {
    symbol: string;
    position: 'before' | 'after';
    space: boolean;
  };
}

const currencyFormats: CurrencyFormat = {
  USD: { symbol: '$', position: 'before', space: false },
  EUR: { symbol: '€', position: 'after', space: true },
  GBP: { symbol: '£', position: 'before', space: false },
  JPY: { symbol: '¥', position: 'before', space: false },
  AUD: { symbol: 'A$', position: 'before', space: false },
  CAD: { symbol: 'C$', position: 'before', space: false },
  CHF: { symbol: 'Fr', position: 'after', space: true },
  CNY: { symbol: '¥', position: 'before', space: false },
  HKD: { symbol: 'HK$', position: 'before', space: false },
  SGD: { symbol: 'S$', position: 'before', space: false },
};

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    // Определение языка браузера
    const detectLanguage = () => {
      const browserLang = navigator.language.split('-')[0];
      return Object.keys(translations).includes(browserLang) ? browserLang : 'en';
    };

    // Определение валюты по региону
    const detectCurrency = () => {
      const regionCurrencyMap: { [key: string]: string } = {
        US: 'USD',
        GB: 'GBP',
        EU: 'EUR',
        JP: 'JPY',
        AU: 'AUD',
        CA: 'CAD',
        CH: 'CHF',
        CN: 'CNY',
        HK: 'HKD',
        SG: 'SGD',
      };

      // Пытаемся получить регион из TimeZone
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const region = timeZone.split('/')[0];
      
      return regionCurrencyMap[region] || 'USD';
    };

    setLanguage(detectLanguage());
    setCurrency(detectCurrency());
  }, []);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  const formatCurrency = (amount: number): string => {
    const format = currencyFormats[currency];
    const formattedAmount = amount.toFixed(2);
    
    if (format.position === 'before') {
      return `${format.symbol}${format.space ? ' ' : ''}${formattedAmount}`;
    }
    return `${formattedAmount}${format.space ? ' ' : ''}${format.symbol}`;
  };

  return (
    <LocalizationContext.Provider value={{ language, currency, setLanguage, setCurrency, t, formatCurrency }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}; 