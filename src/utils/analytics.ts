// src/utils/analytics.ts - Google Analytics интеграция для React

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Конфигурация Google Analytics
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Замените на ваш ID

// Инициализация GA
export const initGA = () => {
  if (typeof window !== 'undefined' && !window.gtag) {
    // Загружаем Google Analytics скрипт
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Инициализируем gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    // Настройка GA4
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true,
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
  }
};

// Отслеживание просмотра страницы
export const pageview = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || document.title
    });
  }
};

// Отслеживание событий
export const event = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Отслеживание пользовательских событий
export const trackCustomEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Отслеживание конверсий
export const trackConversion = (conversionType: string, value?: number, currency: string = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      event_category: 'Conversion',
      event_label: conversionType,
      value: value,
      currency: currency
    });
  }
};

// Отслеживание ошибок
export const trackError = (errorMessage: string, errorCode?: string, fatal: boolean = false) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: errorMessage,
      fatal: fatal,
      error_code: errorCode
    });
  }
};

// Отслеживание игр
export const trackGameAccess = (gameName: string, gameType: string = 'game_access') => {
  event(gameType, 'Games', gameName);
};

// Отслеживание регистрации
export const trackRegistration = (step: string = 'start') => {
  event(`registration_${step}`, 'User Engagement', 'Registration Form');
};

// Отслеживание входа
export const trackLogin = (step: string = 'start') => {
  event(`login_${step}`, 'User Engagement', 'Login Form');
};

// Отслеживание покупок
export const trackPurchase = (productName: string, value: number, currency: string = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: `T_${Date.now()}`,
      value: value,
      currency: currency,
      items: [{
        item_name: productName,
        item_category: 'Game Service',
        price: value,
        quantity: 1
      }]
    });
  }
};

// Отслеживание времени на странице
export const trackTimeOnPage = (pageName: string, timeSpent: number) => {
  event('time_on_page', 'Engagement', pageName, Math.round(timeSpent / 1000));
};

// Отслеживание скролла
export const trackScrollDepth = (depth: number) => {
  event('scroll_depth', 'Engagement', `${depth}%`, depth);
};

// Отслеживание видео
export const trackVideoEvent = (videoTitle: string, eventType: 'play' | 'pause' | 'complete') => {
  event(`video_${eventType}`, 'Media', videoTitle);
};

// Хук для отслеживания времени на странице
export const usePageTracking = (pageName: string) => {
  React.useEffect(() => {
    const startTime = Date.now();
    
    // Отслеживаем вход на страницу
    pageview(window.location.pathname, pageName);
    
    return () => {
      // Отслеживаем время на странице при выходе
      const timeSpent = Date.now() - startTime;
      trackTimeOnPage(pageName, timeSpent);
    };
  }, [pageName]);
};

// Хук для отслеживания скролла
export const useScrollTracking = () => {
  React.useEffect(() => {
    let scrollDepth = 0;
    
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent >= 25 && scrollDepth < 25) {
        trackScrollDepth(25);
        scrollDepth = 25;
      } else if (scrollPercent >= 50 && scrollDepth < 50) {
        trackScrollDepth(50);
        scrollDepth = 50;
      } else if (scrollPercent >= 75 && scrollDepth < 75) {
        trackScrollDepth(75);
        scrollDepth = 75;
      } else if (scrollPercent >= 90 && scrollDepth < 90) {
        trackScrollDepth(90);
        scrollDepth = 90;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

// Экспорт всех функций
export default {
  initGA,
  pageview,
  event,
  trackCustomEvent,
  trackConversion,
  trackError,
  trackGameAccess,
  trackRegistration,
  trackLogin,
  trackPurchase,
  trackTimeOnPage,
  trackScrollDepth,
  trackVideoEvent,
  usePageTracking,
  useScrollTracking
};
