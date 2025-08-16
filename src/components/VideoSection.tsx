import { useRef, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import videoFile from '../assets/promo.mp4';
import videoPoster from '../assets/images/video-poster.jpg';

const Title = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  color: white;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Rajdhani', sans-serif;
`;

const ChooseGangSection = styled.section`
  padding: 6rem 0;
  background-color: #1a0f2e;
  text-align: center;
`;

const VideoContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: pointer;
`;

const Video = styled.video`
  width: 100%;
  display: block;
  object-fit: cover;
  border-radius: 16px;
`;

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
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(157, 78, 221, 0.7);
  border: none;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(157, 78, 221, 0.9);
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  svg {
    width: 40px;
    height: 40px;
    fill: white;
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`

const VideoSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isIndicatorVisible, setIsIndicatorVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  let timeoutId: number | null = null;
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const handleVideoClick = () => {
    if (!isMobile && isPlaying) {
      toggleSound();
    } else if (isMobile && !isPlaying) {
      startVideo();
    }
  };

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
  
  const startVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error("Video play failed:", error);
        });
    }
  };

  useEffect(() => {
    const initialTimeout = window.setTimeout(() => {
      setIsIndicatorVisible(false);
    }, 2000);

    if (videoRef.current && !isMobile) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error("Video autoplay failed:", error);
        });
    }

    return () => {
      if (initialTimeout) {
        window.clearTimeout(initialTimeout);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isMobile]);

  return (
    <ChooseGangSection className="section">
      <Title>Why Choose Gang Game Tips</Title>
      <Subtitle>Experience the difference with our professional boosting services</Subtitle>
      <VideoContainer onClick={handleVideoClick}>
        <Video 
          ref={videoRef}
          autoPlay={!isMobile}
          loop
          muted={isMuted}
          playsInline
          poster={videoPoster}
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
        {isMobile && !isPlaying && (
          <PlayButton onClick={startVideo} aria-label="Play video">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z" />
            </svg>
          </PlayButton>
        )}
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
  );
};

export default VideoSection; 