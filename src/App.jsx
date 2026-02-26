import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Landing from './components/Landing';
import ContinentPage from './pages/ContinentPage';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Navigation />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/continent/:continentKey" element={<ContinentPage />} />
            </Routes>
          </div>
          <Footer />
          <SpeedInsights />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
