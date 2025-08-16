import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Главная функция инициализации анимаций
const initMainPageAnimations = () => {
  // Очищаем все существующие ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Проверяем, мобильное устройство или нет
  const isMobile = window.innerWidth < 768;
  
  // Анимация для Hero секции
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    // Анимации заголовков и кнопок
    const heroTitle = heroSection.querySelector('.hero-title');
    const heroSubtitle = heroSection.querySelector('.hero-subtitle');
    const heroButton = heroSection.querySelector('.hero-button');
    
    gsap.fromTo(
      heroTitle,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out',
        delay: 0.2
      }
    );
    
    gsap.fromTo(
      heroSubtitle,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power2.out',
        delay: 0.5
      }
    );
    
    gsap.fromTo(
      heroButton,
      { opacity: 0, y: 20, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8, 
        ease: 'back.out(1.7)',
        delay: 0.8 
      }
    );
  }
  
  // Получаем все секции с классом section-animation
  const sections = document.querySelectorAll('.section-animation');
  
  // Добавляем анимации для каждой секции
  sections.forEach((section, index) => {
    // Базовая анимация для мобильных устройств
    if (isMobile) {
      // Более простая анимация для мобильных устройств
      gsap.fromTo(
        section,
        { 
          opacity: 0,
          y: 50
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    } else {
      // Продвинутые анимации для десктопа
      // Разные анимации для четных и нечетных секций
      if (index % 2 === 0) {
        // 3D эффект для четных секций
        gsap.fromTo(
          section,
          { 
            opacity: 0,
            rotationY: -10,
            x: -100,
            transformPerspective: 1000
          },
          { 
            opacity: 1,
            rotationY: 0,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'center center',
              toggleActions: 'play none none reverse'
            }
          }
        );
      } else {
        // 3D эффект для нечетных секций
        gsap.fromTo(
          section,
          { 
            opacity: 0,
            rotationY: 10,
            x: 100,
            transformPerspective: 1000
          },
          { 
            opacity: 1,
            rotationY: 0,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'center center',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }
    
    // Анимация элементов внутри секций
    // Заголовки
    const titles = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
    gsap.fromTo(
      titles,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Параграфы
    const paragraphs = section.querySelectorAll('p');
    gsap.fromTo(
      paragraphs,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        stagger: 0.15,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Кнопки
    const buttons = section.querySelectorAll('button, .button, a.btn');
    gsap.fromTo(
      buttons,
      { opacity: 0, y: 15, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6, 
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Изображения
    const images = section.querySelectorAll('img, video, iframe');
    gsap.fromTo(
      images,
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Элементы списка
    const listItems = section.querySelectorAll('li');
    gsap.fromTo(
      listItems,
      { opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 },
      { 
        opacity: 1, 
        x: 0, 
        y: 0,
        duration: 0.5, 
        stagger: 0.1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Секция видео (особая анимация)
  const videoSection = document.querySelector('.video-section');
  if (videoSection) {
    const videoContainer = videoSection.querySelector('.video-container');
    
    if (videoContainer) {
      gsap.fromTo(
        videoContainer, 
        { 
          opacity: 0,
          scale: 0.9
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: videoSection,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }
  
  // Секция WhyUs (особая анимация)
  const whyUsSection = document.querySelector('.why-us-section');
  if (whyUsSection) {
    const whyUsItems = whyUsSection.querySelectorAll('.why-us-item');
    
    if (whyUsItems.length) {
      gsap.fromTo(
        whyUsItems, 
        { 
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: whyUsSection,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }
  
  // Секция отзывов (особая анимация)
  const reviewSection = document.querySelector('.review-section');
  if (reviewSection) {
    const reviewCards = reviewSection.querySelectorAll('.review-card');
    
    if (reviewCards.length) {
      gsap.fromTo(
        reviewCards, 
        { 
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: isMobile ? 0.2 : 0.3,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: reviewSection,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }
};

// Функция для обновления анимаций (при изменении размера окна)
export const refreshAnimations = () => {
  // Очищаем все существующие ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Запускаем анимации заново
  setTimeout(initMainPageAnimations, 200);
};

export default initMainPageAnimations; 