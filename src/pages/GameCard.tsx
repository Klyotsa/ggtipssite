import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { Game } from '../types/common';

interface GameCardProps {
  game: Game;
}

const CardContainer = styled(Link)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  height: 320px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
    
    .overlay {
      background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8));
    }
    
    .game-title {
      transform: translateY(-5px);
    }
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));
  transition: all 0.3s ease;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const GameTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <CardContainer to={game.url}>
      <GameImage src={game.image} alt={game.name} />
      <Overlay className="overlay">
        <GameTitle className="game-title">{game.name}</GameTitle>
      </Overlay>
    </CardContainer>
  );
};

export default GameCard; 