import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface SidebarTitleProps {
  isOpen: boolean;
}

interface SidebarContainerProps {
  isOpen: boolean;
  $footerVisible: boolean;
  $footerOffset: number;
  height: number;
}

interface ToggleButtonProps {
  $isOpen: boolean;
}

const ToggleButton = styled.button<ToggleButtonProps>`
  position: absolute;
  right: -32px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(19, 18, 41, 0.95);
  border: none;
  border: 2px solid rgba(78, 126, 248, 0.3);
  border-radius: 0 8px 8px 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  backdrop-filter: blur(5px);
  z-index: 100;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(78, 126, 248, 0.1), transparent);
    border-radius: 0 6px 6px 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(0deg)' : 'rotate(180deg)'};
  }
  
  &:hover {
    color: #4e7ef8;
    
    &:before {
      opacity: 1;
    }
    
    svg {
      transform: ${props => props.$isOpen ? 'rotate(0deg) scale(1.2)' : 'rotate(180deg) scale(1.2)'};
    }
  }
`;

const SidebarTitle = styled.div<SidebarTitleProps>`
  position: fixed;
  left: 0;
  top: 100px;
  width: 280px;
  height: 180px;
  background: rgba(19, 18, 41, 0.95);
  border-bottom: 1px solid rgba(78, 126, 248, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    width: 260px;
    height: 160px;
    top: 80px;
  }
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(120deg, #ffffff, #b8c7f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-align: center;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SidebarBackground = styled.div<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  background: rgba(19, 18, 41, 0.95);
  z-index: 97;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 260px;
  }
`;

const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 280px;
  bottom: 12px;
  width: 280px;
  z-index: 98;
  pointer-events: none;
  
  @media (max-width: 768px) {
    width: 260px;
    top: 240px;
  }
`;

const SidebarContainer = styled.div<SidebarContainerProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: transparent;
  border-right: 2px solid rgba(78, 126, 248, 0.2);
  padding: 0;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease, height 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  pointer-events: auto;
  height: ${props => props.$footerVisible ? `calc(100% - ${props.$footerOffset}px)` : '100%'};
  will-change: transform, height;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(19, 18, 41, 0.95);
  }

  &::-webkit-scrollbar-thumb {
    background: #4e7ef8;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SidebarNav = styled.nav`
  padding: 1.5rem 0;
`;

const NavSection = styled.div`
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;
`;

const SectionTitle = styled.h3`
  color: #FFD700;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    background: rgba(78, 126, 248, 0.1);
    color: #4e7ef8;
    transform: translateX(5px);
  }

  &.active {
    background: rgba(78, 126, 248, 0.15);
    color: #4e7ef8;
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [footerOffset, setFooterOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const rafId = useRef<number>();
  const lastOffset = useRef(0);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const updateSidebarPosition = () => {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      if (footerRect.top < windowHeight) {
        const visibleFooterHeight = windowHeight - footerRect.top;
        const newOffset = Math.abs(lastOffset.current - visibleFooterHeight) > 1 
          ? visibleFooterHeight 
          : lastOffset.current;
        
        setIsFooterVisible(true);
        setFooterOffset(newOffset);
        lastOffset.current = newOffset;
      } else {
        setIsFooterVisible(false);
        setFooterOffset(0);
        lastOffset.current = 0;
      }
      
      lastScrollY.current = scrollY;
    };

    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(updateSidebarPosition);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const footerRect = entry.boundingClientRect;
          if (entry.isIntersecting || footerRect.top < window.innerHeight) {
            updateSidebarPosition();
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '0px'
      }
    );

    observer.observe(footer);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateSidebarPosition, { passive: true });

    // Инициализация при загрузке
    updateSidebarPosition();

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSidebarPosition);
    };
  }, []);

  return (
    <>
      <SidebarBackground isOpen={isOpen} />
      <SidebarTitle isOpen={isOpen}>
        <Logo>
          <img src="/poe2logo.png" alt="Path of Exile 2 Logo" />
        </Logo>
        <Title>Path of Exile 2</Title>
        <ToggleButton 
          onClick={onToggle}
          $isOpen={isOpen}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </ToggleButton>
      </SidebarTitle>
      <SidebarWrapper isOpen={isOpen}>
        <SidebarContainer 
          ref={containerRef}
          isOpen={isOpen}
          $footerVisible={isFooterVisible}
          $footerOffset={footerOffset}
          height={0}
        >
          <SidebarNav>
            <NavSection>
              <SectionTitle>Currency</SectionTitle>
              <NavList>
                <NavItem>
                  <NavLink to="/games/path-of-exile/currency/divine-orbs">Divine Orbs</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/games/path-of-exile/currency/chaos-orbs">Chaos Orbs</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/games/path-of-exile/currency/exalted-orbs">Exalted Orbs</NavLink>
                </NavItem>
              </NavList>
            </NavSection>

            <NavSection>
              <SectionTitle>Leveling</SectionTitle>
              <NavList>
                <NavItem>
                  <NavLink to="/games/path-of-exile/leveling/campaign">Campaign Boost</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/games/path-of-exile/leveling/acts">Acts 1-10</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/games/path-of-exile/leveling/endgame">Endgame Leveling</NavLink>
                </NavItem>
              </NavList>
            </NavSection>

            <NavSection>
              <SectionTitle>Items</SectionTitle>
              <NavList>
                <NavItem>
                  <NavLink to="/games/path-of-exile/items/uniques">Unique Items</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/games/path-of-exile/items/gems">Skill Gems</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/games/path-of-exile/items/equipment">Equipment</NavLink>
                </NavItem>
              </NavList>
            </NavSection>

            <NavSection>
              <SectionTitle>Services</SectionTitle>
              <NavList>
                <NavItem>
                  <NavLink to="/games/path-of-exile/services/coaching">Coaching</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/games/path-of-exile/services/builds">Build Guides</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/games/path-of-exile/services/custom">Custom Orders</NavLink>
                </NavItem>
              </NavList>
            </NavSection>
          </SidebarNav>
        </SidebarContainer>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar; 