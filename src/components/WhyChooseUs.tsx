import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import videoPoster from '../assets/video-poster.jpg'
import videoFile from '../assets/promo.mp4'
import WCU1Image from '../assets/images/WCU1.jpg'
import WCU2Image from '../assets/images/WCU2.jpg'
import WCU4Image from '../assets/images/WCU4.jpg'
import teamWCUGif from '../assets/images/teamwcu.gif'

const Section = styled.section`
  padding: 6rem 0;
  background-color: #1a0f2e;
  text-align: center;
`

const Title = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  color: white;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 2px;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #ffd700;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FeatureCard = styled.div`
  background: rgba(90, 24, 154, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(157, 78, 221, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transform-origin: center;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    z-index: 0;
    transition: opacity 0.3s ease;
  }

  &:nth-child(1):before {
    background-image: url(${WCU1Image});
  }

  &:nth-child(2):before {
    background-image: url(${WCU2Image});
  }

  &:nth-child(3) {
    background: none;
    padding: 0;
    overflow: hidden;

    &:before {
      display: none;
    }

    &:hover {
      transform: translateY(-8px) scale(1.15);
      z-index: 10;
    }
  }

  &:nth-child(4):before {
    background-image: url(${WCU4Image});
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    z-index: 1;
  }
`

const GifBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(${teamWCUGif}) center/cover;
  z-index: 0;
`

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: white;
  margin-bottom: 0.8rem;
  font-family: 'Orbitron', sans-serif;
  position: relative;
  z-index: 1;
`

const FeatureContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(18, 7, 31, 0.95) 0%, rgba(18, 7, 31, 0.7) 50%, rgba(18, 7, 31, 0.7) 100%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  padding: 2rem 1.5rem;
  transition: all 0.3s ease;

  ${FeatureCard}:nth-child(3) & {
    opacity: 0;
    background: linear-gradient(to top, rgba(18, 7, 31, 0.8) 0%, rgba(18, 7, 31, 0.6) 50%, rgba(18, 7, 31, 0.6) 100%);
  }

  ${FeatureCard}:nth-child(3):hover & {
    opacity: 1;
  }
`

const FeatureDescription = styled.p`
  color: #a1a1a1;
  font-size: 1.1rem;
  line-height: 1.5;
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 0;
`

// Новая секция Why Choose Gang Game Tips
const ChooseGangSection = styled.section`
  padding: 6rem 0;
  background-color: #1a0f2e;
  text-align: center;
`

const VideoContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: pointer;
`

const Video = styled.video`
  width: 100%;
  display: block;
`

const SoundIndicator = styled.div<{ isMuted: boolean; isVisible: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${props => props.isVisible ? 1 : 0};
  
  svg {
    width: 24px;
    height: 24px;
    fill: ${props => props.isMuted ? '#ffffff' : '#ffd700'};
  }
`

const WhyChooseUs = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isIndicatorVisible, setIsIndicatorVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  let timeoutId: number | null = null;
  
  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
      setIsIndicatorVisible(true);
      
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      
      timeoutId = window.setTimeout(() => {
        setIsIndicatorVisible(false);
      }, 2000);
    }
  };
  
  useEffect(() => {
    const initialTimeout = window.setTimeout(() => {
      setIsIndicatorVisible(false);
    }, 2000);
    
    return () => {
      if (initialTimeout) {
        window.clearTimeout(initialTimeout);
      }
    };
  }, []);

  const features = [
    {
      id: 1,
      title: 'Secure Boosting',
      description: 'Your account security is our top priority. We use VPN and all necessary security measures.',
      image: '/WCU1.jpg'
    },
    {
      id: 2,
      title: 'Fast Delivery',
      description: 'Quick and efficient service with real-time progress tracking and updates.',
      image: '/WCU2.jpg'
    },
    {
      id: 4,
      title: '24/7 Support',
      description: 'Our help is available with our round-the-clock customer service team.',
      image: '/WCU4.jpg'
    }
  ]

  return (
    <>
      <Section>
        <Title>Why Choose Us</Title>
        <Subtitle>We provide professional boosting services with a focus on security, speed, and satisfaction</Subtitle>
        <FeaturesGrid>
          {features.map((feature) => (
            <FeatureCard key={feature.id}>
              {feature.id === 3 && <GifBackground />}
              <FeatureContent>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Section>
      
      <ChooseGangSection>
        <Title>Why Choose Gang Game Tips</Title>
        <Subtitle>Experience the difference with our professional boosting services</Subtitle>
        <VideoContainer onClick={toggleSound}>
          <Video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            poster={videoPoster}
          >
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </Video>
          <SoundIndicator isMuted={isMuted} isVisible={isIndicatorVisible}>
            {isMuted ? (
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C22.63 14.91 23 13.5 23 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </SoundIndicator>
        </VideoContainer>
      </ChooseGangSection>
    </>
  )
}

export default WhyChooseUs 