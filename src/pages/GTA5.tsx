import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import Sidebar from '../components/SidebarGta5';
import { useNavigate } from 'react-router-dom';

interface MainContentProps {
  $sidebarOpen: boolean;
}

// Обновляем PageContainer для поддержки сайдбара
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #131229;
`;

// Добавляем MainContent для правильного позиционирования контента
const MainContent = styled.main<MainContentProps>`
  flex: 1;
  margin-left: ${props => props.$sidebarOpen ? '280px' : '0'};
  transition: margin-left 0.3s ease;
  padding: 2rem;
  color: white;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
  
  * {
    pointer-events: auto;
  }
`;

const SectionHeader = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
`;

// Модифицируем ServicesGrid для улучшения обработки hover событий
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
  perspective: 1000px;
  
  /* Убедимся, что все дети ServicesGrid получат hover события */
  > * {
    pointer-events: auto;
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionContainer = styled.div`
  margin-bottom: 4rem;
  position: relative;
`;

// Улучшаем AnimatedSection для лучшей обработки hover событий и оптимизации анимаций
const AnimatedSection = styled.div`
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  margin-bottom: 4rem;
  transform: translateY(30px);
  box-shadow: 0 10px 25px rgba(78, 126, 248, 0.1);
  border: 1px solid rgba(78, 126, 248, 0.05);
  border-radius: 16px;
  padding: 20px;
  will-change: transform, opacity;
  
  /* Обеспечиваем, что все потомки получат события */
  * {
    pointer-events: auto;
  }
  
  &.active-left {
    opacity: 1;
    transform: translateY(0) translateX(-20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  &.active-right {
    opacity: 1;
    transform: translateY(0) translateX(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  &.to-left {
    opacity: 0;
    transform: translateY(-20px) translateX(-20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  &.to-right {
    opacity: 0;
    transform: translateY(-20px) translateX(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
`;

const CardFooter = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(19, 18, 41, 0.6);
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(78, 126, 248, 0.1);
  overflow: hidden;
  transform-style: preserve-3d;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1) inset;
  pointer-events: auto;
  
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(circle at center, rgba(78, 126, 248, 0.05), transparent 70%);
    transform: scale(0);
    transform-origin: center;
    transition: transform 0.6s ease;
    z-index: -1;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  position: relative;
  background: linear-gradient(135deg, #fff, #b8c7f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: translateZ(0);
  transition: all 0.3s ease;
  
  span {
    font-size: 1.1rem;
    vertical-align: 5px;
    margin-left: 2px;
    opacity: 0.9;
  }
`;

const OrderButton = styled.button`
  background: linear-gradient(135deg, #77d247, #5fc235);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  z-index: 10;
  
  &:active {
    transform: translateY(1px);
  }
`;

// Исправляем FeatureList для лучшей видимости и hover-эффектов
const FeatureList = styled.ul`
  list-style: none;
  margin: 0.5rem 0 1.5rem;
  padding: 0;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
`;

// Исправляем FeatureItem для лучших hover-эффектов
const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  position: relative;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-10px);
  z-index: 2;
  
  &:after {
    content: "✓";
    color: #4e7ef8;
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(78, 126, 248, 0.1);
    margin-right: 10px;
  }
`;

const CardHeader = styled.div`
  position: relative;
  background: linear-gradient(180deg, #131229, rgba(19, 18, 41, 0.9));
  padding: 1.5rem;
  border-bottom: 1px solid rgba(78, 126, 248, 0.1);
  z-index: 1;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) inset;
  transform-style: preserve-3d;
  pointer-events: auto;
  
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    background: linear-gradient(120deg, #fff, #b8c7f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    margin: 0;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #4e7ef8, #7f5df0);
      border-radius: 3px;
      transform: scaleX(0.6);
      transform-origin: left;
      transition: transform 0.3s ease;
    }
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scale(1.5);
    transition: transform 0.3s ease;
  }
`;

const ServiceCard = styled.div`
  position: relative;
  background: linear-gradient(145deg, #1a0f2e, #16102a);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 1px solid rgba(78, 126, 248, 0.1);
  cursor: pointer;
  height: 100%;
  transform-style: preserve-3d;
  z-index: 2;
  isolation: isolate;
  
  * {
    pointer-events: auto;
  }
  
  transform: perspective(1000px) rotateY(0deg) translateZ(0);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(78, 126, 248, 0.2), 0 0 10px rgba(78, 126, 248, 0.1);
    
    ${CardImage} {
      img {
        transform: scale(1);
      }
    }
    
    ${CardHeader} h3:after {
      transform: scaleX(1);
    }
    
    ${FeatureList} {
      opacity: 1;
      transform: translateY(0);
    }
    
    ${FeatureItem}:nth-child(1) {
      opacity: 1;
      transform: translateX(5px);
      transition-delay: 0.1s;
    }
    
    ${FeatureItem}:nth-child(2) {
      opacity: 1;
      transform: translateX(5px);
      transition-delay: 0.2s;
    }
    
    ${FeatureItem}:nth-child(3) {
      opacity: 1;
      transform: translateX(5px);
      transition-delay: 0.3s;
    }
    
    ${CardFooter}:before {
      transform: scale(2);
    }
    
    ${Price} {
      transform: translateZ(15px) scale(1.05);
    }
    
    ${OrderButton} {
      transform: translateY(-2px) translateZ(20px) scale(1.05);
      letter-spacing: 1px;
      background: linear-gradient(135deg, #5fc235, #77d247);
    }
  }
  
  ${AnimatedSection}:nth-child(2n) & {
    transform: perspective(1000px) rotateY(5deg) translateZ(0);
    
    &:hover {
      transform: translateY(-5px) perspective(1000px) rotateY(5deg);
    }
  }
  
  ${AnimatedSection}:nth-child(2n-1) & {
    transform: perspective(1000px) rotateY(-5deg) translateZ(0);
    
    &:hover {
      transform: translateY(-5px) perspective(1000px) rotateY(-5deg);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(78, 126, 248, 0.05), transparent);
    pointer-events: none;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  background: radial-gradient(ellipse at top right, rgba(127, 93, 240, 0.03), transparent 80%);
  transform-style: preserve-3d;
  pointer-events: auto;
`;

const CustomOrderSection = styled.div`
  background: linear-gradient(to right, #1a0f2e, #311a54);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

const CustomOrderText = styled.div`
  max-width: 60%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const HowItWorksSection = styled.div`
  margin-bottom: 4rem;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }
  
  &:not(:last-child):after {
    content: "";
    position: absolute;
    top: 25px;
    right: -15%;
    width: 30%;
    height: 2px;
    background: linear-gradient(to right, #4e7ef8, transparent);
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #131229;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border: 2px solid #4e7ef8;
  
  @media (max-width: 768px) {
    margin-bottom: 0;
    flex-shrink: 0;
  }
`;

const StepText = styled.p`
  text-align: center;
  font-size: 1rem;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    text-align: left;
  }
`;

const BenefitsSection = styled.div`
  margin-bottom: 4rem;
  position: relative;
  padding: 3rem 2rem;
  border-radius: 16px;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(26, 15, 46, 0.8), rgba(49, 26, 84, 0.8));
    z-index: -2;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: linear-gradient(
      217deg, 
      rgba(78, 126, 248, 0.4), 
      rgba(78, 126, 248, 0) 70%
    ), linear-gradient(
      127deg, 
      rgba(127, 93, 240, 0.4), 
      rgba(127, 93, 240, 0) 70%
    ), linear-gradient(
      336deg, 
      rgba(74, 222, 222, 0.4), 
      rgba(74, 222, 222, 0) 70%
    );
    opacity: 0.8;
    z-index: -1;
    animation: gradientAnimation 15s ease infinite;
  }
  
  @keyframes gradientAnimation {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.2);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
`;

const BenefitsSectionHeader = styled(SectionHeader)`
  position: relative;
  display: inline-block;
  margin-bottom: 3rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #4e7ef8, #7f5df0, #4adede);
    border-radius: 4px;
  }
`;

const BenefitsList = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
  
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`;

const BenefitsListLeft = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 2rem;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 80px;
  
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    margin-bottom: 100px;
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 120px;
  }
`;

const BenefitIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.5s ease;
  cursor: pointer;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, #4e7ef8, #7f5df0);
    z-index: -1;
    animation: pulseAnimation 3s infinite alternate;
    animation-play-state: paused;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7f5df0, #4adede);
    z-index: -2;
    opacity: 0.5;
    filter: blur(8px);
  }
  
  svg {
    width: 35px;
    height: 35px;
    fill: white;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
    transition: transform 0.3s ease;
  }
  
  @keyframes pulseAnimation {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(78, 126, 248, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(78, 126, 248, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(78, 126, 248, 0);
    }
  }
`;

const BenefitTooltip = styled.div`
  position: absolute;
  top: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: rgba(15, 10, 30, 0.95);
  border-radius: 8px;
  padding: 12px 18px;
  min-width: 220px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 10;
  border: 1px solid rgba(78, 126, 248, 0.3);
  backdrop-filter: blur(4px);
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: rgba(15, 10, 30, 0.95);
    border-left: 1px solid rgba(78, 126, 248, 0.3);
    border-top: 1px solid rgba(78, 126, 248, 0.3);
  }
`;

const BenefitText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(120deg, #fff, #b8c7f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const BenefitWithIcon = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  transition: transform 0.3s ease;
  height: 120px;
  z-index: 3;
  
  &:hover {
    transform: translateY(-10px);
    
    ${BenefitIcon} {
      &:before {
        animation-play-state: running;
      }
      
      svg {
        transform: scale(1.2);
      }
    }
    
    ${BenefitTooltip} {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }
  }
  
  @media (max-width: 768px) {
    margin: 0.5rem;
    height: 110px;
  }
`;

// Добавляю стилизованные стрелки для карусели
const CarouselArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(19, 18, 41, 0.7);
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 12px rgba(78, 126, 248, 0.15);
  color: #4e7ef8;
  font-size: 2rem;
  cursor: pointer;
  z-index: 20;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s, opacity 0.2s;
  opacity: 1;

  &:hover:not(:disabled) {
    background: rgba(78, 126, 248, 0.9);
    color: #fff;
    box-shadow: 0 4px 16px rgba(78, 126, 248, 0.25);
  }
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    top: 60%;
  }
`;

// Обновленный компонент Carousel
const Carousel = ({ cards, idx, setIdx, visibleCount }: { cards: JSX.Element[]; idx: number; setIdx: (i: number) => void; visibleCount: number }) => (
  <div style={{ position: 'relative', minHeight: 420 }}>
    <CarouselArrow
      style={{ left: 12 }}
      onClick={() => setIdx(Math.max(0, idx - 1))}
      disabled={idx === 0}
      aria-label="Previous"
    >&#8592;</CarouselArrow>
    <ServicesGrid>
      {cards.slice(idx, idx + visibleCount)}
    </ServicesGrid>
    <CarouselArrow
      style={{ right: 12 }}
      onClick={() => setIdx(Math.min(cards.length - visibleCount, idx + 1))}
      disabled={idx + visibleCount >= cards.length}
      aria-label="Next"
    >&#8594;</CarouselArrow>
  </div>
);

const GTA5Page: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  // Debounce function
  const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const debounced = (...args: Parameters<F>) => {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => func(...args), waitFor);
    };
    return debounced as (...args: Parameters<F>) => ReturnType<F>;
  };

  // Функция для добавления классов с небольшой задержкой (оставляем requestAnimationFrame)
  const applyClasses = (
    element: Element,
    classesToRemove: string[],
    classesToAdd: string[],
    delay = 0
  ) => {
    setTimeout(() => {
      if (element) {
        requestAnimationFrame(() => {
          classesToRemove.forEach(cls => element.classList.remove(cls));
          classesToAdd.forEach(cls => element.classList.add(cls));
        });
      }
    }, delay);
  };

  // Функция инициализации или обновления IntersectionObserver
  const setupObserver = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.75
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const currentIndex = sectionRefs.current.findIndex(
          (ref) => ref === entry.target
        );
        if (currentIndex === -1) return; // Если элемент не найден, пропускаем

        const isOdd = currentIndex % 2 !== 0;
        const fromClass = isOdd ? 'from-right' : 'from-left';
        const activeClass = isOdd ? 'active-right' : 'active-left';
        const toClass = isOdd ? 'to-right' : 'to-left';

        if (entry.intersectionRatio >= 0.75) {
          applyClasses(
            entry.target,
            ['from-left', 'from-right', 'to-left', 'to-right'],
            [activeClass]
          );
        } else if (entry.target.classList.contains(activeClass)) {
          const isScrollingDown = entry.boundingClientRect.top < 0;

          if (isScrollingDown) {
            applyClasses(
              entry.target,
              ['active-left', 'active-right'],
              [toClass]
            );
          } else {
            applyClasses(
              entry.target,
              ['active-left', 'active-right'],
              [fromClass]
            );
          }
        }
      });
    }, observerOptions);

    sectionRefs.current = Array.from(document.querySelectorAll<HTMLDivElement>('.animated-section-marker'));
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        const isOdd = index % 2 !== 0;
        const fromClass = isOdd ? 'from-right' : 'from-left';
        section.classList.remove('active-left', 'active-right', 'to-left', 'to-right');
        section.classList.add(fromClass);
        observerRef.current?.observe(section);

        if (index === 0) {
          setTimeout(() => {
            applyClasses(section, [fromClass], ['active-left']);
          }, 100);
        }
      }
    });
  };

  const debouncedSetupObserver = debounce(setupObserver, 250);

  useEffect(() => {
    setupObserver();
    window.addEventListener('resize', debouncedSetupObserver);
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('resize', debouncedSetupObserver);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Стейты для индексов
  const [hotOffersIdx, setHotOffersIdx] = useState(0);
  const [popularIdx, setPopularIdx] = useState(0);
  const [currencyIdx, setCurrencyIdx] = useState(0);
  const [levelingIdx, setLevelingIdx] = useState(0);
  const [gemsIdx, setGemsIdx] = useState(0);

  // Hot Offers карточки
  const hotOffersCards = [
    <ServiceCard key="cash1">
      <CardHeader>
        <h3>100 MILLION PURE CASH</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/Gta5Cash.png" alt="Gta 5 Cash" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Choose Any Amount</FeatureItem>
          <FeatureItem>Quick Delivery</FeatureItem>
          <FeatureItem>Low Priced & Safe</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>49.99<span>1</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="cash2">
      <CardHeader>
        <h3>200 MILLION CASH/CARS</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/Gta5CashCars.png" alt="Gta 5 Cash/Cars" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Choose Any Amount</FeatureItem>
          <FeatureItem>Quick Delivery</FeatureItem>
          <FeatureItem>Low Priced & Safe</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>49.99<span>1</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="modcars">
      <CardHeader>
        <h3>Modded Cars</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/Gta5ModCars.png" alt="Gta 5 Modded Cars" />
        </CardImage>
        <FeatureList>
          <FeatureItem>All Modded Cars</FeatureItem>
          <FeatureItem>Quick Delivery</FeatureItem>
          <FeatureItem>Low Priced & Safe</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>24.99<span>1</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="bonus1">
      <CardHeader>
        <h3>500 MILLION PURE CASH</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
        <img src="/Gta5Cash.png" alt="Gta 5 Cash" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Massive Amount</FeatureItem>
          <FeatureItem>Instant Delivery</FeatureItem>
          <FeatureItem>Best Value</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>99.99<span>1</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="bonus2">
      <CardHeader>
        <h3>Exclusive Modded Account</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/Gta5ModdedAccount.png" alt="Exclusive Modded Account" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Rare Vehicles</FeatureItem>
          <FeatureItem>Max Level</FeatureItem>
          <FeatureItem>Instant Access</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>149.99<span>1</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="bonus3">
      <CardHeader>
        <h3>VIP Bundle</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/Gta5VIP.png" alt="VIP Bundle" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Cash + Cars + RP</FeatureItem>
          <FeatureItem>Priority Support</FeatureItem>
          <FeatureItem>Exclusive Discounts</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>199.99<span>1</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
  ];

  // Popular This Week карточки
  const popularCards = [
    <ServiceCard key="jewellers">
      <CardHeader>
        <h3>PoE 2 Jeweller's Orbs</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2jewellers.webp" alt="PoE 2 Jeweller's Orbs" />
        </CardImage>
        <FeatureList>
          <FeatureItem>All 3 Types of Orbs</FeatureItem>
          <FeatureItem>Quick Delivery</FeatureItem>
          <FeatureItem>Low Priced & Safe</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>3<span>99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="boost">
      <CardHeader>
        <h3>PoE 2 New Character Boost + Free Ascendancy</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2boost.webp" alt="PoE 2 New Character Boost" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Campaign Boost</FeatureItem>
          <FeatureItem>Up To Level 75</FeatureItem>
          <FeatureItem>Free Trials</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>15<span>99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="campaign">
      <CardHeader>
        <h3>PoE 2 Campaign Boost</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2campaign.webp" alt="PoE 2 Campaign Boost" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Choose Any Act</FeatureItem>
          <FeatureItem>Access Endgame Quickly</FeatureItem>
          <FeatureItem>Cheap & Secure</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>12<span>99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="pop1">
      <CardHeader>
        <h3>PoE 2 Chaos Orbs</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2chaos.webp" alt="PoE 2 Chaos Orbs" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Popular Currency</FeatureItem>
          <FeatureItem>Fast Delivery</FeatureItem>
          <FeatureItem>Best Price</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>2<span>49</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="pop2">
      <CardHeader>
        <h3>PoE 2 Skill Boost</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2skillboost.webp" alt="PoE 2 Skill Boost" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Any Skill</FeatureItem>
          <FeatureItem>Fast Level Up</FeatureItem>
          <FeatureItem>Safe & Secure</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>7<span>99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="pop3">
      <CardHeader>
        <h3>PoE 2 Unique Bundle</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2uniquebundle.webp" alt="PoE 2 Unique Bundle" />
        </CardImage>
        <FeatureList>
          <FeatureItem>All Unique Items</FeatureItem>
          <FeatureItem>Quick Delivery</FeatureItem>
          <FeatureItem>Best Price</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>9<span>99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
  ];

  // Currency карточки
  const currencyCards = [
    <ServiceCard key="divine">
      <CardHeader>
        <h3>PoE 2 Divine Orbs</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2divine.webp" alt="PoE 2 Divine Orbs" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Choose Any Amount</FeatureItem>
          <FeatureItem>Quick Delivery</FeatureItem>
          <FeatureItem>Low Priced & Safe</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>3<span>15</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="regal">
      <CardHeader>
        <h3>PoE 2 Regal Orbs</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2regal.webp" alt="PoE 2 Regal Orbs" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Upgrade Your Gear</FeatureItem>
          <FeatureItem>Quick Delivery</FeatureItem>
          <FeatureItem>Low Priced & Safe</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>1<span>95</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="more">
      <CardHeader>
        <h3>More Currency</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2currency.webp" alt="More Currency" />
        </CardImage>
        <FeatureList>
          <FeatureItem>All PoE 2 Currency</FeatureItem>
          <FeatureItem>Fast Delivery</FeatureItem>
          <FeatureItem>Best Prices</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>от <span>0.99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="cur1">
      <CardHeader>
        <h3>PoE 2 Orb of Fusing</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2fusing.webp" alt="PoE 2 Orb of Fusing" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Socket Linking</FeatureItem>
          <FeatureItem>Fast Delivery</FeatureItem>
          <FeatureItem>Best Price</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>1<span>29</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="cur2">
      <CardHeader>
        <h3>PoE 2 Orb of Alchemy</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2alchemy.webp" alt="PoE 2 Orb of Alchemy" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Item Upgrades</FeatureItem>
          <FeatureItem>Fast Delivery</FeatureItem>
          <FeatureItem>Best Price</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>0<span>99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="cur3">
      <CardHeader>
        <h3>PoE 2 Orb of Scouring</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2scouring.webp" alt="PoE 2 Orb of Scouring" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Remove Mods</FeatureItem>
          <FeatureItem>Fast Delivery</FeatureItem>
          <FeatureItem>Best Price</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>0<span>79</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
  ];

  // Leveling карточки
  const levelingCards = [
    <ServiceCard key="gear">
      <CardHeader>
        <h3>PoE 2 Leveling Gear Packs</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2leveling.webp" alt="PoE 2 Leveling Gear Packs" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Full Leveling Set</FeatureItem>
          <FeatureItem>Smooth Leveling</FeatureItem>
          <FeatureItem>All Classes</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>13<span>99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="starter">
      <CardHeader>
        <h3>PoE 2 League Starter Bundle</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2starter.webp" alt="PoE 2 League Starter Bundle" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Custom Options</FeatureItem>
          <FeatureItem>Endgame Builds</FeatureItem>
          <FeatureItem>Full Campaign</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>191<span>99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="more">
      <CardHeader>
        <h3>More Leveling</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2levelingmore.webp" alt="More Leveling" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Any Leveling Service</FeatureItem>
          <FeatureItem>Fast & Secure</FeatureItem>
          <FeatureItem>Custom Options</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>от <span>2.99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="lev1">
      <CardHeader>
        <h3>PoE 2 Fast Level 1-50</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2fastlevel.webp" alt="PoE 2 Fast Level 1-50" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Any Class</FeatureItem>
          <FeatureItem>Super Fast</FeatureItem>
          <FeatureItem>Safe & Secure</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>19<span>99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="lev2">
      <CardHeader>
        <h3>PoE 2 Endgame Boost</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2endgame.webp" alt="PoE 2 Endgame Boost" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Endgame Ready</FeatureItem>
          <FeatureItem>Fast Completion</FeatureItem>
          <FeatureItem>Best Price</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>29<span>99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="lev3">
      <CardHeader>
        <h3>PoE 2 Custom Leveling</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2customlevel.webp" alt="PoE 2 Custom Leveling" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Any Level</FeatureItem>
          <FeatureItem>Flexible Options</FeatureItem>
          <FeatureItem>Consult with PRO</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>от <span>9.99</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
  ];

  // Gems карточки
  const gemsCards = [
    <ServiceCard key="spirit">
      <CardHeader>
        <h3>PoE 2 Uncut Spirit Gems</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2spiritgems.webp" alt="PoE 2 Uncut Spirit Gems" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Buff Your Skill Gems</FeatureItem>
          <FeatureItem>Upgrade Your Skills</FeatureItem>
          <FeatureItem>Low Priced & Safe</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>2<span>69</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="skill">
      <CardHeader>
        <h3>PoE 2 Uncut Skill Gems</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2skillgems.webp" alt="PoE 2 Uncut Skill Gems" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Create Skill Gems</FeatureItem>
          <FeatureItem>Upgrade Your Skills</FeatureItem>
          <FeatureItem>Low Priced & Safe</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>2<span>69</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="more">
      <CardHeader>
        <h3>More Gems</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2gemsmore.webp" alt="More Gems" />
        </CardImage>
        <FeatureList>
          <FeatureItem>All Skill Gems</FeatureItem>
          <FeatureItem>Fast Delivery</FeatureItem>
          <FeatureItem>Best Prices</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>от <span>0.49</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="gem1">
      <CardHeader>
        <h3>PoE 2 Support Gems</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2supportgems.webp" alt="PoE 2 Support Gems" />
        </CardImage>
        <FeatureList>
          <FeatureItem>All Support Gems</FeatureItem>
          <FeatureItem>Fast Delivery</FeatureItem>
          <FeatureItem>Best Price</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>1<span>19</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="gem2">
      <CardHeader>
        <h3>PoE 2 Quality Gems</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2qualitygems.webp" alt="PoE 2 Quality Gems" />
        </CardImage>
        <FeatureList>
          <FeatureItem>High Quality</FeatureItem>
          <FeatureItem>Fast Delivery</FeatureItem>
          <FeatureItem>Best Price</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>2<span>49</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
    <ServiceCard key="gem3">
      <CardHeader>
        <h3>PoE 2 Corrupted Gems</h3>
      </CardHeader>
      <CardContent>
        <CardImage>
          <img src="/poe2corruptedgems.webp" alt="PoE 2 Corrupted Gems" />
        </CardImage>
        <FeatureList>
          <FeatureItem>Corrupted Variants</FeatureItem>
          <FeatureItem>Fast Delivery</FeatureItem>
          <FeatureItem>Best Price</FeatureItem>
        </FeatureList>
      </CardContent>
      <CardFooter>
        <Price>3<span>49</span>€</Price>
        <OrderButton onClick={() => navigate('/games/gta5/order')}>Order now</OrderButton>
      </CardFooter>
    </ServiceCard>,
  ];

  return (
    <PageContainer>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <MainContent $sidebarOpen={isSidebarOpen}>
        <AnimatedSection ref={(el) => { if(el) sectionRefs.current[0] = el; }} className="animated-section-marker">
          <SectionContainer>
            <SectionHeader>Hot Offers</SectionHeader>
            <Carousel cards={hotOffersCards} idx={hotOffersIdx} setIdx={setHotOffersIdx} visibleCount={3} />
          </SectionContainer>
        </AnimatedSection>

        <AnimatedSection ref={(el) => { if(el) sectionRefs.current[1] = el; }} className="animated-section-marker">
          <SectionContainer>
            <SectionHeader>Popular This Week</SectionHeader>
            <Carousel cards={popularCards} idx={popularIdx} setIdx={setPopularIdx} visibleCount={3} />
          </SectionContainer>
        </AnimatedSection>

        <AnimatedSection ref={(el) => { if(el) sectionRefs.current[2] = el; }} className="animated-section-marker">
          <SectionContainer>
            <SectionHeader>Currency</SectionHeader>
            <Carousel cards={currencyCards} idx={currencyIdx} setIdx={setCurrencyIdx} visibleCount={3} />
          </SectionContainer>
        </AnimatedSection>

        <AnimatedSection ref={(el) => { if(el) sectionRefs.current[3] = el; }} className="animated-section-marker">
          <SectionContainer>
            <SectionHeader>Leveling</SectionHeader>
            <Carousel cards={levelingCards} idx={levelingIdx} setIdx={setLevelingIdx} visibleCount={3} />
          </SectionContainer>
        </AnimatedSection>

        <AnimatedSection ref={(el) => { if(el) sectionRefs.current[4] = el; }} className="animated-section-marker">
          <SectionContainer>
            <SectionHeader>Gems</SectionHeader>
            <Carousel cards={gemsCards} idx={gemsIdx} setIdx={setGemsIdx} visibleCount={3} />
          </SectionContainer>
        </AnimatedSection>

        <AnimatedSection ref={(el) => { if(el) sectionRefs.current[5] = el; }} className="animated-section-marker">
          <CustomOrderSection>
            <CustomOrderText>
              <h3>Didn't find what you need? Create a custom order</h3>
              <p>Contact us and a PRO player will help you out. We'll find the best deal or create a personalized order for you at a lower price.</p>
            </CustomOrderText>
            <OrderButton onClick={() => navigate('/games/gta5/order')}>Create custom order</OrderButton>
          </CustomOrderSection>

          <HowItWorksSection>
            <SectionHeader>How it works</SectionHeader>
            <StepsContainer>
              <Step>
                <StepNumber>1</StepNumber>
                <StepText>Choose a service and discuss details</StepText>
              </Step>
              <Step>
                <StepNumber>2</StepNumber>
                <StepText>Track your order status in real-time</StepText>
              </Step>
              <Step>
                <StepNumber>3</StepNumber>
                <StepText>Get matched with a top PRO player instantly</StepText>
              </Step>
              <Step>
                <StepNumber>4</StepNumber>
                <StepText>Enjoy your rewards!</StepText>
              </Step>
            </StepsContainer>
          </HowItWorksSection>
        </AnimatedSection>

        <AnimatedSection ref={(el) => { if(el) sectionRefs.current[6] = el; }} className="animated-section-marker">
          <BenefitsSection>
            <BenefitsSectionHeader>With GGTips you get</BenefitsSectionHeader>
            <BenefitsList>
              <BenefitsListLeft>
                <BenefitWithIcon>
                  <BenefitIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8m0 3a1 1 0 0 1 1 1v4h2v2h-4V8a1 1 0 0 1 1-1"></path>
                    </svg>
                  </BenefitIcon>
                  <BenefitTooltip>
                    <BenefitText>Connect with our friendly managers and PRO players</BenefitText>
                  </BenefitTooltip>
                </BenefitWithIcon>
                
                <BenefitWithIcon>
                  <BenefitIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H20.2M4,11V4H6V6V11C5.1,11 4.3,11 4,11M20,11C19.7,11 18.9,11 18,11V6V4H20V11Z"></path>
                    </svg>
                  </BenefitIcon>
                  <BenefitTooltip>
                    <BenefitText>Benefit from 24/7 support for all your gaming needs</BenefitText>
                  </BenefitTooltip>
                </BenefitWithIcon>
                
                <BenefitWithIcon>
                  <BenefitIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"></path>
                    </svg>
                  </BenefitIcon>
                  <BenefitTooltip>
                    <BenefitText>Trust in our secure service—your data's safety is our top priority</BenefitText>
                  </BenefitTooltip>
                </BenefitWithIcon>
                
                <BenefitWithIcon>
                  <BenefitIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M15.96 10.29l-2.75 3.54-1.96-2.36L8.5 15h11l-3.54-4.71M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5m18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2m0 16H7V3h14v14"></path>
                    </svg>
                  </BenefitIcon>
                  <BenefitTooltip>
                    <BenefitText>Enjoy peace of mind with our instant money-back guarantee</BenefitText>
                  </BenefitTooltip>
                </BenefitWithIcon>
                
                <BenefitWithIcon>
                  <BenefitIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37M16.82,15.19L12.71,11.08C13.12,10.04 12.89,8.82 12.03,7.97C11.13,7.06 9.78,6.88 8.69,7.38L10.63,9.32L9.28,10.68L7.29,8.73C6.75,9.82 7,11.17 7.88,12.08C8.74,12.94 9.96,13.16 11,12.76L15.11,16.86C15.29,17.05 15.56,17.05 15.74,16.86L16.78,15.83C17,15.65 17,15.33 16.82,15.19Z"></path>
                    </svg>
                  </BenefitIcon>
                  <BenefitTooltip>
                    <BenefitText>Play with one of the best PROs out there</BenefitText>
                  </BenefitTooltip>
                </BenefitWithIcon>
                
                <BenefitWithIcon>
                  <BenefitIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2M12 20A8 8 0 1 1 20 12A8 8 0 0 1 12 20M16.2 16.2L11 13V7H12.5V12.2L17 14.9Z"></path>
                    </svg>
                  </BenefitIcon>
                  <BenefitTooltip>
                    <BenefitText>Take your gaming experience to new heights!</BenefitText>
                  </BenefitTooltip>
                </BenefitWithIcon>
              </BenefitsListLeft>
            </BenefitsList>
          </BenefitsSection>
        </AnimatedSection>
      </MainContent>
    </PageContainer>
  );
};

export default GTA5Page; 