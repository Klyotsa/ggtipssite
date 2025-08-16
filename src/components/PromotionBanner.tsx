import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Discord } from '@styled-icons/boxicons-logos/Discord';
import { useLocalization } from '../context/LocalizationContext';
import type { TranslationKey } from '../types/common';

const scrollAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 40px;
  background: linear-gradient(90deg, rgb(171, 102, 255) 0%, rgb(64, 224, 208) 100%);
  overflow: hidden;
  position: fixed;
  top: 81px; /* Высота десктоп хедера (65 + 16) */
  left: 0;
  z-index: 999;
  backdrop-filter: blur(8px);
  will-change: transform;
  box-shadow: 0 2px 10px rgba(171, 102, 255, 0.2);

  @media (max-width: 768px) {
    top: 71px; /* Высота мобильного хедера (55 + 16) */
    height: 35px; // Опционально: можно сделать баннер чуть ниже на мобильных
  }
`;

const ScrollContent = styled.div<{ isPaused: boolean }>`
  display: inline-flex;
  white-space: nowrap;
  animation: ${scrollAnimation} 30s linear infinite;
  animation-play-state: ${props => props.isPaused ? 'paused' : 'running'};
  height: 100%;
  align-items: center;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  gap: 40px;
  padding-right: 40px; /* Добавляем отступ справа для плавного перехода */
`;

const PromotionItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  height: 100%;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  transition: all 0.3s;
  background: transparent;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const PromoCode = styled.span`
  color: rgb(171, 102, 255);
  background: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const DiscordButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #5865F2;
  background: white;
  padding: 2px 10px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
  border: 2px solid #5865F2;

  &:hover {
    background-color: #5865F2;
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const promotions = [
  {
    id: 1,
    textKey: 'newUserDiscount' as TranslationKey,
    code: "WELCOME20"
  },
  {
    id: 2,
    textKey: 'referralBonus' as TranslationKey,
    code: "FRIEND500"
  },
  {
    id: 3,
    textKey: 'weeklyGamesDiscount' as TranslationKey,
    code: "GAMES15"
  },
  {
    id: 4,
    textKey: 'premiumDiscount' as TranslationKey,
    code: "PREMIUM30"
  },
  {
    id: 5,
    textKey: 'joinDiscord' as TranslationKey,
    isDiscord: true
  }
];

const PromotionBanner: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLocalization();

  const promotionContent = React.useMemo(() => promotions.map(promo => (
    <PromotionItem key={promo.id}>
      {t(promo.textKey)}
      {promo.code && (
        <>
          <PromoCode>{promo.code}</PromoCode>
        </>
      )}
      {promo.isDiscord && (
        <DiscordButton href="https://discord.gg/ggtips" target="_blank" rel="noopener noreferrer">
          <Discord />
          {t('join')}
        </DiscordButton>
      )}
    </PromotionItem>
  )), [t]);

  return (
    <BannerContainer 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ScrollContent isPaused={isPaused}>
        {promotionContent}
        {promotionContent}
        {promotionContent}
        {promotionContent} {/* Добавляем больше копий для плавного перехода */}
      </ScrollContent>
    </BannerContainer>
  );
};

export default PromotionBanner; 