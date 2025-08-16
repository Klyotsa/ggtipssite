import React from 'react';
import { styled } from 'styled-components';
import GameCard from './GameCard';
import { Game } from '../types/common';
import CODBO6Image from '../assets/images/CODBO6head.jpg';
import GTA5Image from '../assets/images/GTA5head.jpg';
import POE2Image from '../assets/images/POE2head.jpg';
import FortniteImage from '../assets/images/Fortnitehead.jpg';

const GamesPageContainer = styled.div`
  padding: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: white;
  text-align: center;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

// Данные о играх
const games: Game[] = [
  {
    id: 1,
    name: "Call of Duty: Black Ops 6",
    image: CODBO6Image,
    url: "/games/call-of-duty"
  },
  {
    id: 2,
    name: "Grand Theft Auto V",
    image: GTA5Image,
    url: "/games/gta5"
  },
  {
    id: 3,
    name: "Path of Exile 2",
    image: POE2Image,
    url: "/games/path-of-exile"
  },
  {
    id: 4,
    name: "Fortnite",
    image: FortniteImage,
    url: "/games/fortnite"
  }
];

const GamesPage: React.FC = () => {
  return (
    <GamesPageContainer>
      <PageTitle>Choose Your Game</PageTitle>
      <GamesGrid>
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </GamesGrid>
    </GamesPageContainer>
  );
};

export default GamesPage; 