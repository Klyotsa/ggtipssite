import { useState, useRef, useEffect } from 'react'
import { styled, keyframes } from 'styled-components'
import { KeyboardArrowDown } from '@styled-icons/material'
import { UserCircle } from '@styled-icons/boxicons-regular'
import { useLocalization } from '../context/LocalizationContext'
import { Link } from 'react-router-dom'
import { Game, TranslationKey } from '../types/common'
import type { SupportedLanguage, SupportedCurrency } from '../types/common'
import ModalAuth from './ModalAuth.tsx'
import { useAuth } from '../context/AuthContext'

// Import images
import logoImage from '../assets/images/logo_brand.png'
import gtaImage from '../assets/images/GTA5head.jpg'
import poe2Image from '../assets/images/POE2head.jpg'
import fortniteImage from '../assets/images/Fortnitehead.jpg'
import codImage from '../assets/images/CODBO6head.jpg'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: rgba(26, 15, 46, 0.75);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.8s ease-out forwards;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`

const Logo = styled.img`
  height: 65px;
  width: auto;
  transition: transform 0.3s ease;
  margin: 0;
  padding-top: 0;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 55px;
  }
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-top: 2px;
`

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 992px) {
    gap: 1.5rem;
  }
`

const MainNav = styled.nav`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  justify-content: center;
  margin: 0 2rem;

  @media (max-width: 992px) {
    display: none;
  }
`

const ChooseGamesContainer = styled.div`
  position: relative;
  display: inline-block;
`

const ChooseGamesLink = styled.div<{ isOpen: boolean }>`
  color: #9d4edd;
  border: 2px solid #9d4edd;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;

  &:hover {
    background-color: #9d4edd;
    color: white;
  }

  svg {
    width: 12px;
    height: 12px;
    transition: transform 0.3s;
    transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0) scale(0.95);
  min-width: 250px;
  background: rgba(26, 15, 46, 0.95);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  padding: 10px;
  color: #fff;
  font-family: 'Arial', sans-serif;
  
  ${props => props.isOpen && `
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0) scale(1);
  `}

  div {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: rgba(157, 78, 221, 0.2);
    }
    input[type="checkbox"] {
      margin-right: 10px;
    }
  }

  button {
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    background-color: #9d4edd;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background-color: #7b3cbf;
    }
  }
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(157, 78, 221, 0.2);
  }
`

const GameIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
`

const GameName = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 992px) {
    gap: 1rem;
  }
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: color 0.3s;

  &:hover {
    color: #9d4edd;
  }

  span,
  span.flag {
    font-size: 1.5rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.6rem;

    span,
    span.flag {
      font-size: 2.1rem;
    }

    svg {
      width: 27px;
      height: 27px;
    }
  }

  @media (max-width: 480px) {
     padding: 0.4rem;
     gap: 0.5rem;

     span,
     span.flag {
      font-size: 1.9rem;
    }
     svg {
      width: 24px;
      height: 24px;
    }
  }
`

const StyledIconLink = styled(Link)`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: color 0.3s;
  text-decoration: none;

  &:hover {
    color: #9d4edd;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    svg {
      width: 32px;
      height: 32px;
    }
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    svg {
      width: 29px;
      height: 29px;
    }
  }
`

const LanguageOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(157, 78, 221, 0.2);
  }

  span.flag {
    font-size: 1.5rem;
  }
`

const AvatarNav = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background: #2a1840;
  border: 2px solid #9d4edd;
`

const currencies: { code: SupportedCurrency; symbol: string }[] = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' }
]

const languages: { code: SupportedLanguage; name: string; flag: string }[] = [
  { code: 'english', name: 'English', flag: '🇬🇧' },
  { code: 'español', name: 'Español', flag: '🇪🇸' },
  { code: 'français', name: 'Français', flag: '🇫🇷' },
  { code: 'deutsch', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'italiano', name: 'Italiano', flag: '🇮🇹' },
  { code: '中文', name: '中文', flag: '🇨🇳' },
  { code: '日本語', name: '日本語', flag: '🇯🇵' },
  { code: 'português', name: 'Português', flag: '🇵🇹' },
  { code: 'العربية', name: 'العربية', flag: '🇸🇦' },
  { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' }
];

const Header = () => {
  const { language, currency, setLanguage, setCurrency, t, isLoading } = useLocalization();
  const [isGamesMenuOpen, setIsGamesMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const gamesMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const currencyMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (isGamesMenuOpen && gamesMenuRef.current && !gamesMenuRef.current.contains(target)) {
        setIsGamesMenuOpen(false);
      }
      
      if (isLanguageOpen && languageMenuRef.current && !languageMenuRef.current.contains(target)) {
        setIsLanguageOpen(false);
      }
      
      if (isCurrencyOpen && currencyMenuRef.current && !currencyMenuRef.current.contains(target)) {
        setIsCurrencyOpen(false);
      }
    };

    if (isGamesMenuOpen || isLanguageOpen || isCurrencyOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isGamesMenuOpen, isLanguageOpen, isCurrencyOpen]);

  useEffect(() => {
    // This effect ensures the component re-renders when language changes
    // No actual logic needed here, just dependency on language
  }, [language]);

  const games: Game[] = [
    { id: 1, name: 'GTA V', image: gtaImage, url: '/games/gta5' },
    { id: 2, name: 'Path of Exile 2', image: poe2Image, url: '/games/path-of-exile' },
    { id: 3, name: 'Fortnite', image: fortniteImage, url: '/games/fortnite' },
    { id: 4, name: 'Call of Duty', image: codImage, url: '/games/cod' },
  ];

  const getCurrentLanguageFlag = () => {
    const currentLang = languages.find(lang => lang.code === language);
    return currentLang?.flag || '🇬🇧';
  };

  if (isLoading) {
    return (
      <HeaderContainer>
        <HeaderContent>
          <LeftNav>
            <LogoLink to="/">
              <Logo 
                src={logoError ? '/fallback-logo.png' : logoImage} 
                alt="GGTips Logo" 
                onError={() => setLogoError(true)}
              />
            </LogoLink>
          </LeftNav>
        </HeaderContent>
      </HeaderContainer>
    );
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftNav>
          <LogoLink to="/">
            <Logo 
              src={logoError ? '/fallback-logo.png' : logoImage} 
              alt="GGTips Logo" 
              onError={() => setLogoError(true)}
            />
          </LogoLink>
          <MainNav>
            <ChooseGamesContainer ref={gamesMenuRef}>
              <ChooseGamesLink 
                isOpen={isGamesMenuOpen} 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsGamesMenuOpen(!isGamesMenuOpen);
                }}
              >
                {t('chooseGames' as TranslationKey)}
                <KeyboardArrowDown size={20} />
              </ChooseGamesLink>
              <DropdownMenu isOpen={isGamesMenuOpen}>
                {games.map(game => (
                  <StyledLink key={game.id} to={game.url}>
                    <GameIcon src={game.image} alt={game.name} />
                    <GameName>{game.name}</GameName>
                  </StyledLink>
                ))}
              </DropdownMenu>
            </ChooseGamesContainer>
          </MainNav>
        </LeftNav>

        <ButtonGroup>
          <ChooseGamesContainer ref={languageMenuRef}>
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                setIsLanguageOpen(!isLanguageOpen);
              }}
            >
              <span className="flag">{getCurrentLanguageFlag()}</span>
              <KeyboardArrowDown />
            </IconButton>
            <DropdownMenu isOpen={isLanguageOpen}>
              {languages.map((lang) => (
                <LanguageOption
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsLanguageOpen(false);
                  }}
                >
                  <span className="flag">{lang.flag}</span>
                  {lang.name}
                </LanguageOption>
              ))}
            </DropdownMenu>
          </ChooseGamesContainer>

          <ChooseGamesContainer ref={currencyMenuRef}>
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                setIsCurrencyOpen(!isCurrencyOpen);
              }}
            >
              <span>{currencies.find(c => c.code === currency)?.symbol}</span>
              <KeyboardArrowDown />
            </IconButton>
            <DropdownMenu isOpen={isCurrencyOpen}>
              {currencies.map((curr) => (
                <LanguageOption
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code);
                    setIsCurrencyOpen(false);
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{curr.symbol}</span>
                  <span>{curr.code}</span>
                </LanguageOption>
              ))}
            </DropdownMenu>
          </ChooseGamesContainer>

          <StyledIconLink 
            to={isAuthenticated ? "/profile" : "#"} 
            onClick={(e) => {
              if (!isAuthenticated) {
                e.preventDefault();
                setAuthModalOpen(true);
              }
            }}
          >
            {isAuthenticated && (user?.avatar_base64 || user?.avatar) ? (
              <AvatarNav src={(user.avatar_base64 || user.avatar) as string} alt="Profile Avatar" />
            ) : (
            <UserCircle />
            )}
          </StyledIconLink>
        </ButtonGroup>
        {isAuthModalOpen && !isAuthenticated && (
          <ModalAuth onClose={() => setAuthModalOpen(false)} />
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 