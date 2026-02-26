import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { countries } from '../data/countries';

const InteractiveGrid = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);

  // Flatten all countries from all continents
  const allCountries = [
    ...countries.africa,
    ...countries.europe,
    ...countries.northAmerica,
    ...countries.asia
  ];

  // Create 16 squares - first 8 are countries, rest are interactive placeholders
  const squares = Array.from({ length: 16 }, (_, index) => {
    if (index < allCountries.length) {
      const country = allCountries[index];
      // Find which continent this country belongs to
      let continentKey = 'africa';
      if (countries.europe.find(c => c.id === country.id)) continentKey = 'europe';
      else if (countries.northAmerica.find(c => c.id === country.id)) continentKey = 'northAmerica';
      else if (countries.asia.find(c => c.id === country.id)) continentKey = 'asia';
      
      return {
        id: index,
        type: 'country',
        country: country,
        continentKey: continentKey,
        flag: country.flag,
        name: country.name[language]
      };
    } else {
      return {
        id: index,
        type: 'placeholder',
        message: language === 'fr' 
          ? `Découvrez plus de pays francophones ! Il y a ${88 - allCountries.length} autres pays à explorer.`
          : `Discover more Francophone countries! There are ${88 - allCountries.length} more countries to explore.`
      };
    }
  });

  const handleSquareClick = (square) => {
    if (square.type === 'country') {
      setSelectedSquare(square.id);
      // Navigate with animation delay
      setTimeout(() => {
        navigate(`/continent/${square.continentKey}`, { 
          state: { scrollToCountry: square.country.id } 
        });
      }, 500);
    } else {
      setSelectedSquare(square.id);
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const squareVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="interactive-grid-section">
      <div className="container">
        <motion.h2
          className="grid-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {language === 'fr' 
            ? '🌍 Explorez les Pays Francophones' 
            : '🌍 Explore Francophone Countries'}
        </motion.h2>
        <motion.p
          className="grid-subtitle"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {language === 'fr'
            ? 'Sélectionnez un pays pour découvrir sa culture, sa cuisine et ses villes emblématiques'
            : 'Select a country to discover its culture, cuisine, and iconic cities'}
        </motion.p>

        <motion.div
          className="interactive-grid"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {squares.map((square) => (
            <motion.div
              key={square.id}
              className={`grid-square ${square.type} ${selectedSquare === square.id ? 'selected' : ''} ${hoveredSquare === square.id ? 'hovered' : ''}`}
              variants={squareVariants}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSquareClick(square)}
              onMouseEnter={() => setHoveredSquare(square.id)}
              onMouseLeave={() => setHoveredSquare(null)}
            >
              <div className="square-content">
                {square.type === 'country' ? (
                  <>
                    <div className="square-flag">{square.flag}</div>
                    <div className="square-name">{square.name}</div>
                    <motion.div
                      className="square-glow"
                      animate={{
                        opacity: selectedSquare === square.id ? [0.5, 1, 0.5] : 0,
                        scale: selectedSquare === square.id ? [1, 1.2, 1] : 1
                      }}
                      transition={{
                        duration: 2,
                        repeat: selectedSquare === square.id ? Infinity : 0
                      }}
                    />
                  </>
                ) : (
                  <div className="square-placeholder">
                    <span className="placeholder-icon">✨</span>
                    <span className="placeholder-text">
                      {language === 'fr' ? 'Plus à venir' : 'More coming'}
                    </span>
                  </div>
                )}
              </div>
              
              <AnimatePresence>
                {selectedSquare === square.id && square.type === 'placeholder' && (
                  <motion.div
                    className="square-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {square.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {selectedSquare !== null && squares[selectedSquare]?.type === 'country' && (
          <motion.div
            className="selection-feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>
              {language === 'fr'
                ? `Navigation vers ${squares[selectedSquare].name}...`
                : `Navigating to ${squares[selectedSquare].name}...`}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default InteractiveGrid;
