import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CountryCard from '../components/CountryCard';
import { countries, continents } from '../data/countries';
import ParticleBackground from '../components/ParticleBackground';
import { useEffect, useRef } from 'react';

const ContinentPage = () => {
  const { continentKey } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const countryRef = useRef(null);

  const continent = continents[continentKey];
  const continentCountries = countries[continentKey] || [];

  // Scroll to specific country if coming from grid
  useEffect(() => {
    if (location.state?.scrollToCountry) {
      setTimeout(() => {
        const countryElement = document.getElementById(location.state.scrollToCountry);
        if (countryElement) {
          countryElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Highlight the country card
          const card = countryElement.querySelector('.country-card');
          if (card) {
            card.classList.add('highlighted');
            setTimeout(() => {
              card.classList.remove('highlighted');
            }, 2000);
          }
        }
      }, 800);
    }
  }, [location.state]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  if (!continent) {
    return (
      <div className="error-page">
        <h2>{language === 'fr' ? 'Continent non trouvé' : 'Continent not found'}</h2>
        <button onClick={() => navigate('/')}>
          {language === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="continent-page"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <ParticleBackground />
      <motion.div
        className="continent-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          className="back-button"
          onClick={() => navigate('/')}
          whileHover={{ 
            scale: 1.05, 
            x: -10,
            boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            animate={{ x: [0, -5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ← {language === 'fr' ? 'Retour' : 'Back'}
          </motion.span>
        </motion.button>

        <motion.h1
          className="continent-page-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="continent-emoji-large">{continent.emoji}</span>
          {continent[language]}
        </motion.h1>

        <motion.p
          className="continent-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {language === 'fr'
            ? `Découvrez les pays francophones de ${continent[language]} et leur riche culture.`
            : `Discover the Francophone countries of ${continent[language]} and their rich culture.`}
        </motion.p>
      </motion.div>

      <div className="container">
        <motion.div
          className="countries-grid-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {continentCountries.length > 0 ? (
            continentCountries.map((country, index) => (
              <motion.div
                key={country.id}
                id={country.id}
                ref={location.state?.scrollToCountry === country.id ? countryRef : null}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.7 + index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <CountryCard country={country} index={index} />
              </motion.div>
            ))
          ) : (
            <motion.p 
              className="no-countries"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {language === 'fr' ? 'Aucun pays trouvé' : 'No countries found'}
            </motion.p>
          )}
        </motion.div>
      </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContinentPage;
