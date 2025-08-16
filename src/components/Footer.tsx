// import React from 'react'
import { styled } from 'styled-components'

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.5);
  padding: 4rem 2rem 2rem;
  color: white;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  position: relative;
`

const FooterSection = styled.div`
  text-align: left;
`

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const FooterListItem = styled.li`
  margin-bottom: 0.75rem;
`

const FooterLink = styled.a`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #9d4edd;
  }
`

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #ccc;
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Gang Game Tips</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="#about">About Us</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#review">Review</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#blog">Blog</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Support</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="#faq">FAQ</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#contact">Contact Us</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="mailto:support@ganggametips.com">
                support@ganggametips.com
              </FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} Gang Game Tips. All rights reserved.
      </Copyright>
    </FooterContainer>
  )
}

export default Footer 