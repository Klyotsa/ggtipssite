export type SupportedLanguage = 
  | 'english'
  | 'español'
  | 'français'
  | 'deutsch'
  | 'italiano'
  | '中文'
  | '日本語'
  | 'português'
  | 'العربية'
  | 'hindi';

export type SupportedCurrency = 'USD' | 'EUR' | 'GBP';

export type TranslationKey = 
  | 'chooseGames'
  | 'language'
  | 'currency'
  | 'cart'
  | 'profile'
  | 'newUserDiscount'
  | 'referralBonus'
  | 'weeklyGamesDiscount'
  | 'premiumDiscount'
  | 'joinDiscord'
  | 'promoCode'
  | 'join'
  | 'buyNow'
  | 'home'
  | 'games'
  | 'about'
  | 'contact';

export interface Game {
  id: number;
  name: string;
  image: string;
  url: string;
}

export interface LocalizationContextType {
  language: SupportedLanguage;
  currency: SupportedCurrency;
  country: string;
  setLanguage: (lang: SupportedLanguage) => void;
  setCurrency: (currency: SupportedCurrency) => void;
  t: (key: TranslationKey) => string;
  isLoading: boolean;
  error: string | null;
} 