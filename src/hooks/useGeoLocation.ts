import { useState, useEffect } from 'react';
import { SupportedLanguage, SupportedCurrency } from '../types/common';

export interface GeoLocationData {
  country: string;
  currency: SupportedCurrency;
  language: SupportedLanguage;
  isLoading: boolean;
  error?: string | null;
}

const CURRENCY_MAP: Record<string, SupportedCurrency> = {
  US: 'USD',
  GB: 'GBP',
  EU: 'EUR',
  // Add other countries as needed
};

const LANGUAGE_MAP: Record<string, SupportedLanguage> = {
  'en': 'english',
  'es': 'español',
  'fr': 'français',
  'de': 'deutsch',
  'it': 'italiano',
  'zh': '中文',
  'ja': '日本語',
  'pt': 'português',
  'ar': 'العربية',
  'hi': 'hindi'
};

const getDefaultLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  return LANGUAGE_MAP[browserLang] || 'english';
};

export const useGeoLocation = (): GeoLocationData => {
  const [geoData, setGeoData] = useState<GeoLocationData>({
    country: '',
    currency: 'USD',
    language: getDefaultLanguage(),
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        
        const data = await response.json();
        const detectedCurrency = CURRENCY_MAP[data.country_code] || 'USD';
        const countryLanguageMap: Record<string, SupportedLanguage> = {
          US: 'english',
          GB: 'english',
          ES: 'español',
          FR: 'français',
          DE: 'deutsch',
          IT: 'italiano',
          CN: '中文',
          TW: '中文',
          HK: '中文',
          JP: '日本語',
          PT: 'português',
          BR: 'português',
          SA: 'العربية',
          AE: 'العربية',
          IN: 'hindi'
        };
        const detectedLanguage = countryLanguageMap[data.country_code] || 'english';

        setGeoData({
          country: data.country_code,
          currency: detectedCurrency,
          language: detectedLanguage,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Error detecting location:', error);
        setGeoData({
          country: '',
          currency: 'USD',
          language: getDefaultLanguage(),
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to detect location'
        });
      }
    };

    detectLocation();
  }, []);

  return geoData;
}; 