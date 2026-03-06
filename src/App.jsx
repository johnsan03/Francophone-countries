import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Landing from './components/Landing';
import ContinentPage from './pages/ContinentPage';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import './styles/App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Check if splash has been shown before (using sessionStorage)
  useEffect(() => {
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          {showSplash ? (
            <SplashScreen onComplete={handleSplashComplete} />
          ) : (
            <>
              <Navigation />
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/continent/:continentKey" element={<ContinentPage />} />
                </Routes>
              </div>
              <Footer />
            </>
          )}
          <SpeedInsights />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
