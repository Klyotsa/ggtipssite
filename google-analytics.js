// Google Analytics 4 (GA4) Configuration
// Замените GA_MEASUREMENT_ID на ваш реальный ID измерения

const GA_MEASUREMENT_ID = 'G-4J6E8K4883'; // Ваш ID

// Инициализация Google Analytics
function initializeGoogleAnalytics() {
    // Проверяем, что GA не загружен
    if (window.gtag) {
        console.log('Google Analytics already loaded');
        return;
    }

    // Создаем script элемент для загрузки GA
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Инициализируем gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Настройка GA4
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true,
        anonymize_ip: true, // Анонимизация IP для GDPR
        cookie_flags: 'SameSite=None;Secure' // Безопасные куки для HTTPS
    });

    // Отслеживание событий
    setupEventTracking();
    
    console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
}

// Настройка отслеживания событий
function setupEventTracking() {
    // Отслеживание кликов по кнопкам
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Отслеживание навигации
        if (target.matches('a[href*="admin"]')) {
            gtag('event', 'admin_panel_access', {
                event_category: 'Navigation',
                event_label: target.href
            });
        }
        
        // Отслеживание игр
        if (target.matches('a[href*="gta5"]')) {
            gtag('event', 'game_access', {
                event_category: 'Games',
                event_label: 'GTA5',
                game_name: 'GTA5'
            });
        }
        
        if (target.matches('a[href*="poe2"]')) {
            gtag('event', 'game_access', {
                event_category: 'Games',
                event_label: 'Path of Exile 2',
                game_name: 'POE2'
            });
        }
        
        // Отслеживание регистрации и входа
        if (target.matches('button[type="submit"]')) {
            const form = target.closest('form');
            if (form) {
                if (form.action.includes('register')) {
                    gtag('event', 'registration_start', {
                        event_category: 'User Engagement',
                        event_label: 'Registration Form'
                    });
                } else if (form.action.includes('login')) {
                    gtag('event', 'login_start', {
                        event_category: 'User Engagement',
                        event_label: 'Login Form'
                    });
                }
            }
        }
    });

    // Отслеживание скролла
    let scrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent >= 25 && scrollDepth < 25) {
            gtag('event', 'scroll_depth', {
                event_category: 'Engagement',
                event_label: '25%',
                value: 25
            });
            scrollDepth = 25;
        } else if (scrollPercent >= 50 && scrollDepth < 50) {
            gtag('event', 'scroll_depth', {
                event_category: 'Engagement',
                event_label: '50%',
                value: 50
            });
            scrollDepth = 50;
        } else if (scrollPercent >= 75 && scrollDepth < 75) {
            gtag('event', 'scroll_depth', {
                event_category: 'Engagement',
                event_label: '75%',
                value: 75
            });
            scrollDepth = 75;
        } else if (scrollPercent >= 90 && scrollDepth < 90) {
            gtag('event', 'scroll_depth', {
                event_category: 'Engagement',
                event_label: '90%',
                value: 90
            });
            scrollDepth = 90;
        }
    });

    // Отслеживание времени на странице
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        gtag('event', 'time_on_page', {
            event_category: 'Engagement',
            event_label: 'Page Exit',
            value: timeOnPage
        });
    });

    // Отслеживание видео
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('play', function() {
            gtag('event', 'video_play', {
                event_category: 'Media',
                event_label: video.src || 'Unknown Video',
                video_title: video.title || 'Unknown'
            });
        });
        
        video.addEventListener('pause', function() {
            gtag('event', 'video_pause', {
                event_category: 'Media',
                event_label: video.src || 'Unknown Video',
                video_title: video.title || 'Unknown'
            });
        });
        
        video.addEventListener('ended', function() {
            gtag('event', 'video_complete', {
                event_category: 'Media',
                event_label: video.src || 'Unknown Video',
                video_title: video.title || 'Unknown'
            });
        });
    });
}

// Функция для отправки пользовательских событий
function trackCustomEvent(eventName, category, label, value = null) {
    if (window.gtag) {
        gtag('event', eventName, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
}

// Функция для отслеживания конверсий
function trackConversion(conversionType, value = null) {
    if (window.gtag) {
        gtag('event', 'conversion', {
            event_category: 'Conversion',
            event_label: conversionType,
            value: value,
            currency: 'USD'
        });
    }
}

// Функция для отслеживания ошибок
function trackError(errorMessage, errorCode = null) {
    if (window.gtag) {
        gtag('event', 'exception', {
            description: errorMessage,
            fatal: false,
            error_code: errorCode
        });
    }
}

// Инициализация при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGoogleAnalytics);
} else {
    initializeGoogleAnalytics();
}

// Экспорт функций для использования в других скриптах
window.GATracking = {
    trackCustomEvent,
    trackConversion,
    trackError,
    initializeGoogleAnalytics
};
