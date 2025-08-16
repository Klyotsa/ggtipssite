import React, { createContext, useState, useEffect, useContext } from 'react';
import { useGeoLocation } from '../hooks/useGeoLocation';
import type { LocalizationContextType, SupportedLanguage, SupportedCurrency, TranslationKey } from '../types/common';

const translations = {
  english: {
    chooseGames: 'Choose Games',
    language: 'Language',
    currency: 'Currency',
    cart: 'Shopping Cart',
    profile: 'Profile',
    home: 'Home',
    games: 'Games',
    about: 'About',
    contact: 'Contact',
    newUserDiscount: '🎮 20% discount for new users on first purchase',
    referralBonus: '👥 Bring a friend and get 500 bonus points',
    weeklyGamesDiscount: '🎯 15% discount on all games this week',
    premiumDiscount: '🌟 Premium subscription -30% today only',
    joinDiscord: '🎁 Join our Discord server',
    promoCode: 'Promo code',
    join: 'Join',
    buyNow: 'Buy Now'
  },
  español: {
    chooseGames: 'Elegir Juegos',
    language: 'Idioma',
    currency: 'Moneda',
    cart: 'Carrito',
    profile: 'Perfil',
    home: 'Inicio',
    games: 'Juegos',
    about: 'Acerca de',
    contact: 'Contacto',
    newUserDiscount: '🎮 20% de descuento para nuevos usuarios en primera compra',
    referralBonus: '👥 Trae un amigo y obtén 500 puntos de bonificación',
    weeklyGamesDiscount: '🎯 15% de descuento en todos los juegos esta semana',
    premiumDiscount: '🌟 Suscripción Premium -30% solo hoy',
    joinDiscord: '🎁 Únete a nuestro servidor de Discord',
    promoCode: 'Código promo',
    join: 'Unirse',
    buyNow: 'Comprar ahora'
  },
  français: {
    chooseGames: 'Choisir des Jeux',
    language: 'Langue',
    currency: 'Devise',
    cart: 'Panier',
    profile: 'Profil',
    home: 'Accueil',
    games: 'Jeux',
    about: 'À propos',
    contact: 'Contact',
    newUserDiscount: '🎮 20% de réduction pour les nouveaux utilisateurs',
    referralBonus: '👥 Parrainez un ami et obtenez 500 points bonus',
    weeklyGamesDiscount: '🎯 15% de réduction sur tous les jeux cette semaine',
    premiumDiscount: '🌟 Abonnement Premium -30% aujourd\'hui uniquement',
    joinDiscord: '🎁 Rejoignez notre serveur Discord',
    promoCode: 'Code promo',
    join: 'Rejoindre',
    buyNow: 'Acheter maintenant'
  },
  deutsch: {
    chooseGames: 'Spiele Wählen',
    language: 'Sprache',
    currency: 'Währung',
    cart: 'Warenkorb',
    profile: 'Profil',
    home: 'Startseite',
    games: 'Spiele',
    about: 'Über uns',
    contact: 'Kontakt',
    newUserDiscount: '🎮 20% Rabatt für Neukunden beim ersten Kauf',
    referralBonus: '👥 Freund einladen und 500 Bonuspunkte erhalten',
    weeklyGamesDiscount: '🎯 15% Rabatt auf alle Spiele diese Woche',
    premiumDiscount: '🌟 Premium-Abonnement -30% nur heute',
    joinDiscord: '🎁 Tritt unserem Discord-Server bei',
    promoCode: 'Promo-Code',
    join: 'Beitreten',
    buyNow: 'Jetzt kaufen'
  },
  italiano: {
    chooseGames: 'Scegli Giochi',
    language: 'Lingua',
    currency: 'Valuta',
    cart: 'Carrello',
    profile: 'Profilo',
    home: 'Home',
    games: 'Giochi',
    about: 'Chi siamo',
    contact: 'Contatti',
    newUserDiscount: '🎮 Sconto del 20% per i nuovi utenti sul primo acquisto',
    referralBonus: '👥 Porta un amico e ottieni 500 punti bonus',
    weeklyGamesDiscount: '🎯 Sconto del 15% su tutti i giochi questa settimana',
    premiumDiscount: '🌟 Abbonamento Premium -30% solo oggi',
    joinDiscord: '🎁 Unisciti al nostro server Discord',
    promoCode: 'Codice promo',
    join: 'Unisciti',
    buyNow: 'Acquista ora'
  },
  '中文': {
    chooseGames: '选择游戏',
    language: '语言',
    currency: '货币',
    cart: '购物车',
    profile: '个人资料',
    home: '首页',
    games: '游戏',
    about: '关于我们',
    contact: '联系我们',
    newUserDiscount: '🎮 新用户首次购买享20%折扣',
    referralBonus: '👥 邀请好友获得500奖励积分',
    weeklyGamesDiscount: '🎯 本周所有游戏15%折扣',
    premiumDiscount: '🌟 Premium会员今日特惠30%',
    joinDiscord: '🎁 加入我们的Discord服务器',
    promoCode: '优惠码',
    join: '加入',
    buyNow: '立即购买'
  },
  '日本語': {
    chooseGames: 'ゲームを選択',
    language: '言語',
    currency: '通貨',
    cart: 'カート',
    profile: 'プロフィール',
    home: 'ホーム',
    games: 'ゲーム',
    about: '会社概要',
    contact: 'お問い合わせ',
    newUserDiscount: '🎮 新規ユーザー初回購入20%オフ',
    referralBonus: '👥 友達を招待して500ボーナスポイント獲得',
    weeklyGamesDiscount: '🎯 今週すべてのゲーム15%オフ',
    premiumDiscount: '🌟 プレミアム会員30%オフ 本日限り',
    joinDiscord: '🎁 Discordサーバーに参加',
    promoCode: 'プロモコード',
    join: '参加',
    buyNow: '今すぐ購入'
  },
  'português': {
    chooseGames: 'Escolher Jogos',
    language: 'Idioma',
    currency: 'Moeda',
    cart: 'Carrinho',
    profile: 'Perfil',
    home: 'Início',
    games: 'Jogos',
    about: 'Sobre nós',
    contact: 'Contato',
    newUserDiscount: '🎮 20% de desconto para novos usuários na primeira compra',
    referralBonus: '👥 Traga um amigo e ganhe 500 pontos de bônus',
    weeklyGamesDiscount: '🎯 15% de desconto em todos os jogos esta semana',
    premiumDiscount: '🌟 Assinatura Premium -30% apenas hoje',
    joinDiscord: '🎁 Entre no nosso servidor Discord',
    promoCode: 'Código promo',
    join: 'Entrar',
    buyNow: 'Comprar agora'
  },
  'العربية': {
    chooseGames: 'اختر الألعاب',
    language: 'اللغة',
    currency: 'العملة',
    cart: 'عربة التسوق',
    profile: 'الملف الشخصي',
    home: 'الرئيسية',
    games: 'الألعاب',
    about: 'من نحن',
    contact: 'اتصل بنا',
    newUserDiscount: '🎮 خصم 20% للمستخدمين الجدد على أول عملية شراء',
    referralBonus: '👥 اجلب صديقًا واحصل على 500 نقطة مكافأة',
    weeklyGamesDiscount: '🎯 خصم 15% على جميع الألعاب هذا الأسبوع',
    premiumDiscount: '🌟 اشتراك بريميوم -30% اليوم فقط',
    joinDiscord: '🎁 انضم إلى سيرفر Discord',
    promoCode: 'رمز ترويجي',
    join: 'انضم',
    buyNow: 'اشتر الآن'
  },
  'hindi': {
    chooseGames: 'गेम्स चुनें',
    language: 'भाषा',
    currency: 'मुद्रा',
    cart: 'कार्ट',
    profile: 'प्रोफाइल',
    home: 'होम',
    games: 'गेम्स',
    about: 'हमारे बारे में',
    contact: 'संपर्क करें',
    newUserDiscount: '🎮 नए उपयोगकर्ताओं को पहली खरीद पर 20% छूट',
    referralBonus: '👥 मित्र को लाएं और 500 बोनस पॉइंट्स पाएं',
    weeklyGamesDiscount: '🎯 इस सप्ताह सभी गेम्स पर 15% छूट',
    premiumDiscount: '🌟 प्रीमियम सदस्यता -30% केवल आज',
    joinDiscord: '🎁 हमारे Discord सर्वर से जुड़ें',
    promoCode: 'प्रोमो कोड',
    join: 'जुड़ें',
    buyNow: 'अभी खरीदें'
  }
} as const;

const LocalizationContext = createContext<LocalizationContextType>({
  language: 'english',
  currency: 'USD',
  country: 'US',
  setLanguage: () => {},
  setCurrency: () => {},
  t: (key: TranslationKey) => key,
  isLoading: true,
  error: null
});

const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const geoData = useGeoLocation();
  const [language, setLanguage] = useState<SupportedLanguage>('english');
  const [currency, setCurrency] = useState<SupportedCurrency>('USD');
  const [country, setCountry] = useState<string>('US');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!geoData.isLoading) {
      const detectedLanguage = (geoData.language as SupportedLanguage) || 'english';
      setLanguage(detectedLanguage);
      setCurrency((geoData.currency as SupportedCurrency) || 'USD');
      setCountry(geoData.country || 'US');
      setIsLoading(false);
      
      // Save to localStorage and dispatch event for cookie banner
      localStorage.setItem('language', detectedLanguage);
      const event = new CustomEvent('languageChanged', { detail: { language: detectedLanguage } });
      window.dispatchEvent(event);
    }
    if (geoData.error) {
      setError(geoData.error);
      setIsLoading(false);
      console.error('Localization error:', geoData.error);
    }
  }, [geoData]);

  const t = (key: TranslationKey): string => {
    try {
      const currentLang = language.toLowerCase() as SupportedLanguage;
      return translations[currentLang]?.[key] || translations.english[key];
    } catch (err) {
      console.error('Translation error:', err);
      return translations.english[key];
    }
  };

  const setLanguageWithUpdate = (lang: SupportedLanguage) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Dispatch a custom event to notify the cookie consent banner
    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    window.dispatchEvent(event);
  };

  const value = {
    language,
    currency,
    country,
    setLanguage: setLanguageWithUpdate,
    setCurrency,
    t,
    isLoading,
    error
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

export default LocalizationProvider; 