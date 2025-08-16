import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { useLocalization } from '../context/LocalizationContext'
import backgroundImage from '../assets/images/imagebghead.png'

const titleAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-5px) rotate(2deg);
  }
  50% {
    transform: translateY(-10px) rotate(0deg);
  }
  75% {
    transform: translateY(-5px) rotate(-2deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`

const subtitleAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-8px) rotate(-1deg);
  }
  50% {
    transform: translateY(-12px) rotate(0deg);
  }
  75% {
    transform: translateY(-8px) rotate(1deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`

const buttonAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-6px) rotate(1deg) scale(1.02);
  }
  50% {
    transform: translateY(-15px) rotate(0deg) scale(1.05);
  }
  75% {
    transform: translateY(-6px) rotate(-1deg) scale(1.02);
  }
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
`

const waveGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const AnimatedContent = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.2s;
  width: 100%;
`

const HeroContainer = styled.section<{ bgLoaded: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  text-align: center;
  padding: 2rem;
  padding-top: 106px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    z-index: -2;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 15, 46, 0.65);
    z-index: -1;
  }

  @media (min-width: 769px) {
    padding-top: 0;
    justify-content: center;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  perspective: 1000px;
  width: 100%;
  line-height: 1.2;

  @media (min-width: 769px) {
    font-size: 5.2rem;
    margin-bottom: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 3.8rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
    margin-top: 1.5rem;
    margin-bottom: 0.8rem;
  }
`

const Subtitle = styled.div`
  font-size: 2rem;
  margin-bottom: 2.5rem;
  max-width: 800px;
  font-weight: 500;
  animation: ${fadeInUp} 1s ease 0.2s backwards;
  perspective: 1000px;
  width: 100%;
  line-height: 1.4;

  @media (min-width: 769px) {
    font-size: 2.1rem;
    margin-bottom: 2.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 4rem;
    max-width: 90%;
    & > span {
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }
`

const GradientText = styled.div<{ variant: 'title' | 'subtitle' }>`
  background: linear-gradient(
    90deg,
    #4ECDC4 0%,
    #45D5CD 10%,
    #40E0D0 20%,
    #48D1CC 30%,
    #7EB6FF 40%,
    #6B8BE5 50%,
    #9D4EDD 60%,
    #8B6EE5 70%,
    #48D1CC 80%,
    #45D5CD 90%,
    #4ECDC4 100%
  );
  background-size: 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  animation: 
    ${props => props.variant === 'title' ? titleAnimation : subtitleAnimation} 6s ease-in-out infinite,
    ${waveGradient} ${props => props.variant === 'title' ? '12s' : '14s'} linear infinite;
  transform-origin: center center;
  font-size: inherit;
  font-weight: inherit;
  perspective: 1000px;
  transform-style: preserve-3d;
  will-change: transform;
  filter: brightness(1.1);

  @media (max-width: 768px) {
    animation: ${waveGradient} ${props => props.variant === 'title' ? '12s' : '14s'} linear infinite;
    
    ${props => props.variant === 'title' && `
      & > span {
        display: block;
        line-height: 1.1;
      }
    `}
  }
  
  @media (min-width: 769px) {
    ${props => props.variant === 'title' && `
      & > span {
        margin-right: 1rem;
      }
      & > span:last-child {
        margin-right: 0;
      }
    `}
  }
`

const HeroButton = styled(Link)`
  padding: 1.2rem 3rem;
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    #4ECDC4 0%,
    #45D5CD 10%,
    #40E0D0 20%,
    #48D1CC 30%,
    #7EB6FF 40%,
    #6B8BE5 50%,
    #9D4EDD 60%,
    #8B6EE5 70%,
    #48D1CC 80%,
    #45D5CD 90%,
    #4ECDC4 100%
  );
  background-size: 400%;
  color: white;
  transition: 0.3s ease;
  animation: ${waveGradient} 16s linear infinite;
  box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  filter: brightness(1.1);
  text-decoration: none;
  display: inline-block;
  text-align: center;

  @media (min-width: 769px) {
    padding: 1.3rem 3.5rem;
    font-size: 1.5rem;
    animation: 
      ${buttonAnimation} 6s ease-in-out infinite,
      ${waveGradient} 16s linear infinite;
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(126, 182, 255, 0.4);
    filter: brightness(1.2);
  }

  @media (max-width: 768px) {
    padding: 1.1rem 2.8rem;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 0.9rem 2.2rem;
    font-size: 1.1rem;
  }
`;

const Hero = () => {
  const { t } = useLocalization();
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setBgLoaded(true);
    img.onerror = () => console.error('Failed to load background image');
  }, []);

  return (
    <HeroContainer bgLoaded={bgLoaded}>
      <AnimatedContent>
        <ContentWrapper>
          <HeroTitle>
            <GradientText variant="title">
              <span>Gang</span> 
              <span>Game</span> 
              <span>Tips</span>
            </GradientText>
          </HeroTitle>
          <Subtitle>
            <GradientText variant="subtitle">
              <span>Professional Game</span>
              <span> Boosting Services</span>
            </GradientText>
          </Subtitle>
          <HeroButton to="/games">{t('chooseGames')}</HeroButton>
        </ContentWrapper>
      </AnimatedContent>
    </HeroContainer>
  );
};

export default Hero;