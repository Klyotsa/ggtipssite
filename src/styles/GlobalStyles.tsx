import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset CSS */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  html, body {
    height: 100%;
    font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #ffffff;
    overflow-x: hidden;
    position: relative;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    position: relative;
    z-index: 1;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/imagebghead.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    z-index: -2;
  }

  body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 15, 46, 0.65);
    z-index: -1;
  }

  /* Smooth Scrolling */
  .section {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem 0;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section + .section {
    margin-top: -2rem;
  }

  /* Intersection Observer Animations */
  [data-animate] {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  [data-animate].animated {
    opacity: 1;
    transform: translateY(0);
  }

  /* Prevent transition on page load */
  .no-transition {
    transition: none !important;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  button, input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  button {
    cursor: pointer;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  /* GSAP Scroll Animation Styles */
  .section {
    position: relative;
    opacity: 1; /* We'll animate this with GSAP */
    transition: opacity 0.5s ease;
  }

  /* Styles applied when section becomes visible */
  .section.visible {
    opacity: 1;
  }

  /* Scroll Smoother Styles */
  html.has-scroll-smooth {
    overflow: hidden;
  }

  html.has-scroll-dragging {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide elements initially for animation */
  [data-animate="fade-in"] {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  [data-animate="slide-in-left"] {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  [data-animate="slide-in-right"] {
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  [data-animate="scale-in"] {
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  /* Animation classes applied by GSAP */
  .animated {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
`;

export default GlobalStyles; 