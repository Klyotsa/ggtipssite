import React, { useState, useRef, useEffect } from 'react'
import { styled } from 'styled-components'
import chatBackgroundImage from '../assets/images/image3.png'
import { Discord } from '@styled-icons/boxicons-logos'

const ChatButtonsContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    right: 15px;
  }
`

const ChatIconContainer = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(157, 78, 221, 0.4);
  }
`

const DiscordIconContainer = styled.a`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 18px rgba(157, 78, 221, 0.4);
  }
  
  svg {
    width: 32px;
    height: 32px;
    color: white;
  }
`

const ChatIcon = styled.div`
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  svg {
    width: 30px;
    height: 30px;
    fill: currentColor;
  }
`

const ChatWindow = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px;
  height: 450px;
  background: linear-gradient(to bottom, rgba(26, 15, 46, 0.7), rgba(18, 7, 31, 0.7)), url(${chatBackgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 99;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.3s ease;
`

const ChatHeader = styled.div`
  background: linear-gradient(to right, #9d4edd, #7b2cbf);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`

const ChatCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`

const ChatMessages = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(157, 78, 221, 0.5);
    border-radius: 3px;
  }
`

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: ${props => props.isUser ? '15px 15px 0 15px' : '15px 15px 15px 0'};
  background: ${props => props.isUser ? 'linear-gradient(135deg, #9d4edd, #7b2cbf)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  font-size: 0.95rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`

const ChatInput = styled.div`
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 10px;
`

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(157, 78, 221, 0.5);
  }
`

const SendButton = styled.button`
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! How can we help you today?', isUser: false }
  ]);
  
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Скролл к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Закрытие чата при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        chatWindowRef.current && 
        !chatWindowRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.chat-icon-container')
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    
    // Simulate support response
    setTimeout(() => {
      const responseMessage: Message = {
        id: messages.length + 2,
        text: 'Thank you for contacting us! Our operator will get in touch with you shortly.',
        isUser: false
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <>
      <ChatButtonsContainer>
        <DiscordIconContainer 
          href="https://discord.gg/ggtips" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Join our Discord"
        >
          <Discord />
        </DiscordIconContainer>
        <ChatIconContainer className="chat-icon-container" onClick={toggleChat}>
          <ChatIcon>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" />
              <path d="M7 9H17V11H7V9Z" />
              <path d="M7 12H14V14H7V12Z" />
              <path d="M7 6H17V8H7V6Z" />
            </svg>
          </ChatIcon>
        </ChatIconContainer>
      </ChatButtonsContainer>
      
      <ChatWindow ref={chatWindowRef} isOpen={isOpen}>
        <ChatHeader>
          <ChatTitle>Live Chat</ChatTitle>
          <ChatCloseButton onClick={() => setIsOpen(false)}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </ChatCloseButton>
        </ChatHeader>
        
        <ChatMessages>
          {messages.map(message => (
            <MessageBubble key={message.id} isUser={message.isUser}>
              {message.text}
            </MessageBubble>
          ))}
          <div ref={messagesEndRef} />
        </ChatMessages>
        
        <ChatInput>
          <MessageInput
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <SendButton onClick={handleSendMessage}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </SendButton>
        </ChatInput>
      </ChatWindow>
    </>
  );
};

export default LiveChat; 