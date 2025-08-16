import { styled } from 'styled-components';

const Section = styled.section`
  padding: 7rem 2rem;
  background-color: #1a0f2e;
  color: #f0f0f0;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 1.4rem;
  line-height: 1.9;
  margin-bottom: 3rem;
  
  &.list-description {
    text-align: left;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 2rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 4rem 0;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 3rem 3.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 2rem 0;
  }
`;

const ListItem = styled.li`
  font-size: 1.25rem;
  line-height: 1.9;
  padding-left: 3rem;
  position: relative;

  &::before {
    content: attr(data-emoji);
    position: absolute;
    left: 0;
    top: 0.1em;
    font-size: 1.5rem;
  }

  &:last-child {
    grid-column: 1 / -1;
    justify-self: center;
    max-width: 450px;
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
    padding-left: 2.5rem;

    &::before {
      font-size: 1.3rem;
    }

    &:last-child {
       max-width: 100%;
    }
  }
`;

const StrongText = styled.strong`
  color: #9d4edd;
  font-weight: 700;
  font-size: 1.3em;
  display: block;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const CallToAction = styled.p`
  font-size: 1.7rem;
  line-height: 1.9;
  margin-top: 4rem;
  font-weight: 700;
  color: #ffd700;
  text-align: center;
  text-shadow: 0 0 12px rgba(255, 215, 0, 0.6);

  @media (max-width: 768px) {
    font-size: 1.3rem;
    line-height: 1.7;
    margin-top: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
  color: white;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 1.5px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const WhyUsText = () => {
  return (
    <Section>
      <Container>
        <SectionTitle>About Us</SectionTitle>
        <Paragraph>
          In a world where every second can change the game, <strong style={{ color: '#ffd700' }}>Gang Game Tips</strong> is your trusted ally. We don't just offer services — we take your gaming experience to the <strong style={{ color: '#9d4edd' }}>next level</strong>. Why do thousands of players choose us? 
        </Paragraph>
        <List>
          <ListItem data-emoji="🔒">
            <StrongText>Security First:</StrongText> We use only safe, proven methods — no bans, no risks. Your account is always protected.
          </ListItem>
          <ListItem data-emoji="⚡">
            <StrongText>Lightning-Fast Delivery:</StrongText> Boosting, currency, power-leveling — all done quickly and efficiently. No delays. No excuses.
          </ListItem>
          <ListItem data-emoji="🎮">
            <StrongText>Experienced Professional Boosters:</StrongText> Only real gamers who know the mechanics inside out. We do what others can't.
          </ListItem>
          <ListItem data-emoji="💬">
            <StrongText>24/7 Customer Support:</StrongText> Questions? Need help? Our support team is always online and ready to assist.
          </ListItem>
          <ListItem data-emoji="💵">
            <StrongText>Transparent Pricing & Quality Guarantee:</StrongText> No hidden fees. Just honest service and real results.
          </ListItem>
        </List>
        <Paragraph>
          With <strong style={{ color: '#ffd700' }}>Gang Game Tips</strong>, you're not just getting a boost — you're gaining <strong style={{ color: '#9d4edd' }}>confidence</strong>, an <strong style={{ color: '#9d4edd' }}>edge</strong>, and pure gaming <strong style={{ color: '#9d4edd' }}>satisfaction</strong>.
        </Paragraph>
        <CallToAction>
          👉 Join thousands of happy players. Level up your game today!
        </CallToAction>
      </Container>
    </Section>
  );
};

export default WhyUsText; 