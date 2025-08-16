import React, { useState } from 'react';
import styled from 'styled-components';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import { FaDiscord, FaGoogle, FaTelegramPlane } from 'react-icons/fa';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(20, 20, 30, 0.75);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
`;

const ModalBox = styled.div`
  background: rgba(26, 15, 46, 0.98);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  padding: 2.5rem 2rem 1.5rem 2rem;
  min-width: 350px;
  max-width: 95vw;
  width: 400px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: auto;
  @media (max-width: 600px) {
    min-width: 98vw;
    width: 99vw;
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    max-height: 96vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.7rem;
  cursor: pointer;
  z-index: 10;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover { opacity: 1; }
`;

const SwitchLink = styled.div`
  text-align: center;
  margin: 1.2rem 0 0 0;
  color: #bbb;
  font-size: 1rem;
  a {
    color: #9d4edd;
    cursor: pointer;
    text-decoration: underline;
    margin-left: 0.3em;
    &:hover { color: #7b2cbf; }
  }
`;

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  margin: 1.2rem 0 0 0;
  @media (max-width: 600px) {
    margin: 0.7rem 0 0 0;
    gap: 0.5rem;
  }
`;

const SocialButton = styled.button<{ color: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.1rem 0;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: ${({ color }) => color};
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  &:hover {
    filter: brightness(1.08);
    box-shadow: 0 4px 16px rgba(157, 78, 221, 0.13);
  }
`;

interface ModalAuthProps {
  onClose: () => void;
}

const ModalAuth: React.FC<ModalAuthProps> = ({ onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Social login handlers (stub)
  const handleSocial = (provider: string) => {
    // TODO: Replace with real OAuth logic
    window.open(`#oauth-${provider}`);
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalBox>
        <CloseButton onClick={onClose} title="Close">×</CloseButton>
        {mode === 'login' ? (
          <>
            <Login />
            <SwitchLink>
              Don't have an account?
              <a onClick={() => setMode('register')}>Register</a>
            </SwitchLink>
          </>
        ) : (
          <>
            <Register />
            <SwitchLink>
              Already have an account?
              <a onClick={() => setMode('login')}>Sign In</a>
            </SwitchLink>
          </>
        )}
        <SocialSection>
          <SocialButton color="#5865F2" onClick={() => handleSocial('discord')}>
            <FaDiscord size={22} /> Continue with Discord
          </SocialButton>
          <SocialButton color="#EA4335" onClick={() => handleSocial('google')}>
            <FaGoogle size={22} /> Continue with Google
          </SocialButton>
          <SocialButton color="#229ED9" onClick={() => handleSocial('telegram')}>
            <FaTelegramPlane size={22} /> Continue with Telegram
          </SocialButton>
        </SocialSection>
      </ModalBox>
    </Overlay>
  );
};

export default ModalAuth; 