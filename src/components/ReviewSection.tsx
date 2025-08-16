import { styled, keyframes } from 'styled-components';
import { useRef } from 'react';

// Helper component for stars (can be expanded later)
const StarRating = ({ rating, count }: { rating: number; count: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const starColor = '#00b67a'; // Trustpilot green

  return (
    <StarsWrapper>
      <RatingValue>{rating.toFixed(1)}</RatingValue>
      {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} color={starColor}>★</Star>)}
      {/* Add half star logic if needed */}
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} color="#dcdce6">☆</Star>)}
      {count > 0 && <ReviewCount>({count})</ReviewCount>}
    </StarsWrapper>
  );
};

// Keyframes for the gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ReviewSectionContainer = styled.section`
  padding: 4rem 2rem;
  background-color: #1a0f2e;
  max-width: 1140px;
  margin: 4rem auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    margin: 2rem auto;
  }
`;

// New Section Title
const SectionTitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 3rem;
  text-transform: uppercase;
  color: white;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 1.5px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #2b2b42;
  border-radius: 8px;
  border-bottom: 1px solid #4a4a6a;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 1rem;
  }
`;

const HeaderLeft = styled.div`
  text-align: left;
`;

const HeaderTitle = styled.h3`
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }
`;

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  @media (max-width: 768px) {
    // Adjust if needed, seems okay for now
  }
`;

const Star = styled.span<{ color: string }>`
  color: ${props => props.color};
  font-size: 1.5rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const RatingValue = styled.span`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ReviewCount = styled.span`
  color: #a0a0b8;
  font-size: 1rem;
  margin-left: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ReviewButton = styled.a`
  background-image: linear-gradient(90deg, #8e44ad, #3498db, #8e44ad); // Repeat start color at end for smooth loop
  background-size: 200% auto; // Make background wider than button
  color: white;
  padding: 0.9rem 1.8rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: inline-block;
  animation: ${gradientAnimation} 4s linear infinite; // Apply the animation

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    // Optional: Pause animation on hover if desired
    // animation-play-state: paused;
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.4rem;
    font-size: 0.9rem;
    width: 100%; // Кнопка на всю ширину в мобильной версии
    margin-top: 1rem; // Отступ сверху, т.к. она теперь под левой частью
  }
`;

const ReviewsCarouselContainer = styled.div`
  position: relative;
  background-color: #2b2b42;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.5rem 10px;
  }
`;

const ReviewsCarousel = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 0 1rem 0;
  margin: 0 auto;
  scroll-snap-type: x mandatory;
  width: 100%;
  max-width: calc(1140px - 4rem); // Учитываем паддинги контейнера

  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ReviewCard = styled.div`
  background-color: #3a3a59;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: left;
  color: #dcdce6;
  flex-shrink: 0;
  width: calc(25% - 1.125rem); // 4 карточки в ряд с учетом отступов
  scroll-snap-align: start;

  @media (max-width: 768px) {
    width: calc(100% - 20px);
    padding: 1rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
`;

const AuthorImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #5a5a7a; 

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  color: #ffffff;
  font-weight: 600;
`;

const ReviewDate = styled.div`
  font-size: 0.85rem;
  color: #a0a0b8;
`;

const CardStars = styled(StarRating)`
  margin-bottom: 1rem;

  ${RatingValue} { display: none; }
  ${ReviewCount} { display: none; }
  ${Star} { font-size: 1.2rem; }

  @media (max-width: 768px) {
     ${Star} { font-size: 1.1rem; }
  }
`;

const ReviewTitle = styled.h4`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const ReviewText = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
`;

// New Arrow Button Styles
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-image: linear-gradient(90deg, #8e44ad, #3498db);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  line-height: 0;
  padding: 0;
  text-align: center;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: -2px;
  }

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
     width: 30px;
     height: 30px;
     font-size: 1.2rem;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px;

  @media (max-width: 768px) {
    left: 5px;
  }
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;

  @media (max-width: 768px) {
    right: 5px;
  }
`;

// Placeholder review data
const reviews = [
  { id: 1, author: 'Oscar Corea', date: 'today on Trustpilot', rating: 5, title: 'Reliable and fast service', text: 'First and for most, Im happy with their performance time and reliability.' },
  { id: 2, author: 'Radiocontroller', date: 'today on Trustpilot', rating: 5, title: 'Great service', text: 'Once you understand what to do you will have your money, or other items.' },
  { id: 3, author: 'Liam Patterson', date: 'today on Trustpilot', rating: 5, title: 'Dont be prejudice!!', text: 'The fact that I didnt believe it was going to happen after waiting a while.' },
  { id: 4, author: 'Sean Groves', date: 'today on Trustpilot', rating: 5, title: 'Very good service and true', text: 'Very good service and true to their words.' },
  { id: 5, author: 'Emanuel Cruz', date: 'yesterday on Trustpilot', rating: 5, title: 'Everything was wonderful', text: 'Everything was wonderful, very helpful and supportive.' },
];

const ReviewSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ReviewSectionContainer className="section">
      <SectionTitle data-animate="fade-in">
        What Our Clients Are Saying
      </SectionTitle>
      <ReviewsHeader>
        <HeaderLeft>
          <HeaderTitle>Trustpilot Reviews</HeaderTitle>
          {/* Hardcoded rating and count for example */}
          <StarRating rating={5} count={2218} /> 
        </HeaderLeft>
        <ReviewButton href="https://www.trustpilot.com/review/ganggametips.com" target="_blank" rel="noopener">
          Review us on Trustpilot
        </ReviewButton>
      </ReviewsHeader>
      <ReviewsCarouselContainer>
        <LeftArrow onClick={() => scroll('left')}><span>‹</span></LeftArrow>
        <ReviewsCarousel ref={carouselRef}>
          {reviews.map(review => (
            <ReviewCard key={review.id}>
              <CardHeader>
                <AuthorImage /> {/* Placeholder image */}
                <AuthorInfo>
                  <AuthorName>{review.author}</AuthorName>
                  <ReviewDate>{review.date}</ReviewDate>
                </AuthorInfo>
              </CardHeader>
              <CardStars rating={review.rating} count={0} /> {/* Pass 0 count to hide */}
              <ReviewTitle>{review.title}</ReviewTitle>
              <ReviewText>{review.text}</ReviewText>
              {/* Add 'Read more' link if needed */}
            </ReviewCard>
          ))}
        </ReviewsCarousel>
        <RightArrow onClick={() => scroll('right')}><span>›</span></RightArrow>
      </ReviewsCarouselContainer>
    </ReviewSectionContainer>
  );
};

export default ReviewSection; 