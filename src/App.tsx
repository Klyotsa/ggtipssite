import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { styled } from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import LocalizationProvider from './context/LocalizationContext'
import Header from './components/Header'
import PromotionBanner from './components/PromotionBanner'
import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import WhyUsText from './components/WhyUsText'
import ReviewSection from './components/ReviewSection'
import Footer from './components/Footer'
import LiveChat from './components/LiveChat'
import GamesPage from './pages/Games'
import PathOfExile2Page from './pages/PathOfExile2'
import GTA5Page from './pages/GTA5'
import GTA5OrderPage from './pages/GTA5OrderPage'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/Profile/Profile'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  overflow-x: hidden;
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0;
  position: relative;
  z-index: 1;
  margin-top: 121px; /* Отступ для десктопа (81px хедер + 40px баннер) */

  @media (max-width: 768px) {
    margin-top: 106px; /* Отступ для мобильных (71px хедер + 35px баннер) */
    /* Если баннер скрывается, используйте 71px */
  }
`

const HomePage = () => (
  <>
    <Hero />
    <VideoSection />
    <WhyUsText />
    <ReviewSection />
  </>
);

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAuthLoading } = useAuth();
  if (isAuthLoading) return null; // Можно заменить на спиннер
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AuthProvider>
      <AppWrapper>
        <GlobalStyles />
        <Router>
          <LocalizationProvider>
            <AppContainer>
              <Header />
              <PromotionBanner />
              <MainContent>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected routes */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Other existing routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/games" element={<GamesPage />} />
                  <Route path="/games/path-of-exile" element={<PathOfExile2Page />} />
                  <Route path="/games/gta5" element={<GTA5Page />} />
                  <Route path="/games/gta5/order" element={<GTA5OrderPage />} />
                </Routes>
              </MainContent>
              <Footer />
              <LiveChat />
            </AppContainer>
          </LocalizationProvider>
        </Router>
      </AppWrapper>
    </AuthProvider>
  )
}

export default App