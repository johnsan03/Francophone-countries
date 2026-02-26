import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { countries } from '../data/countries';

const CountryGame = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [visitedCountries, setVisitedCountries] = useState(() => {
    const saved = localStorage.getItem('francophone-game-visited');
    return saved ? JSON.parse(saved) : [];
  });
  const [revealedSquares, setRevealedSquares] = useState(() => {
    const saved = localStorage.getItem('francophone-game-revealed');
    return saved ? JSON.parse(saved) : [];
  });
  const [showMessage, setShowMessage] = useState(null);

  // Save to localStorage whenever visited countries change
  useEffect(() => {
    localStorage.setItem('francophone-game-visited', JSON.stringify(visitedCountries));
  }, [visitedCountries]);

  useEffect(() => {
    localStorage.setItem('francophone-game-revealed', JSON.stringify(revealedSquares));
  }, [revealedSquares]);

  // Flatten all countries from all continents
  const allCountries = [
    ...countries.africa,
    ...countries.europe,
    ...countries.northAmerica,
    ...countries.asia
  ];

  // User messages for placeholder squares
  const userMessages = language === 'fr' ? [
    "Vous êtes curieux ! Explorez les pays pour en savoir plus sur la francophonie.",
    "Chaque pays a une histoire unique. Continuez à explorer !",
    "La francophonie unit les cultures à travers le monde. Découvrez-en plus !",
    "Vous êtes un explorateur ! Choisissez un pays pour commencer votre voyage.",
    "Il y a 88 pays francophones dans le monde. Combien en connaissez-vous ?",
    "Chaque sélection vous rapproche de la découverte de nouvelles cultures.",
    "La langue française crée des ponts entre les continents. Explorez-les !",
    "Vous êtes sur le point de découvrir quelque chose d'extraordinaire !"
  ] : [
    "You're curious! Explore countries to learn more about Francophonie.",
    "Each country has a unique story. Keep exploring!",
    "Francophonie unites cultures around the world. Discover more!",
    "You're an explorer! Choose a country to start your journey.",
    "There are 88 Francophone countries in the world. How many do you know?",
    "Each selection brings you closer to discovering new cultures.",
    "The French language creates bridges between continents. Explore them!",
    "You're about to discover something extraordinary!"
  ];

  // Create fixed squares array (no randomization)
  const squares = useMemo(() => {
    // Create country squares in fixed order
    const countrySquares = allCountries.map((country) => {
      // Find which continent this country belongs to
      let continentKey = 'africa';
      if (countries.europe.find(c => c.id === country.id)) continentKey = 'europe';
      else if (countries.northAmerica.find(c => c.id === country.id)) continentKey = 'northAmerica';
      else if (countries.asia.find(c => c.id === country.id)) continentKey = 'asia';
      
      const isVisited = visitedCountries.includes(country.id);
      
      return {
        type: 'country',
        country: country,
        continentKey: continentKey,
        flag: country.flag,
        name: country.name[language],
        visited: isVisited
      };
    });

    // Create placeholder squares in fixed order
    const placeholderSquares = userMessages.map((message, index) => ({
      type: 'placeholder',
      message: message,
      icon: ['🎯', '🌟', '🗺️', '✨', '🌍', '🎨', '🚀', '💫'][index]
    }));

    // Fixed pattern: alternate between countries and placeholders
    // First row: 2 countries, 2 placeholders
    // Second row: 2 countries, 2 placeholders
    // Third row: 2 countries, 2 placeholders
    // Fourth row: 2 countries, 2 placeholders
    const fixedOrder = [
      countrySquares[0],   // Senegal
      countrySquares[1],   // Morocco
      placeholderSquares[0],
      placeholderSquares[1],
      countrySquares[2],   // Switzerland
      countrySquares[3],   // Belgium
      placeholderSquares[2],
      placeholderSquares[3],
      countrySquares[4],   // Canada
      countrySquares[5],   // Haiti
      placeholderSquares[4],
      placeholderSquares[5],
      countrySquares[6],   // Vietnam
      countrySquares[7],   // Lebanon
      placeholderSquares[6],
      placeholderSquares[7]
    ];
    
    // Create final squares array with IDs
    return fixedOrder.map((square, index) => ({
      ...square,
      id: index
    }));
  }, [visitedCountries, language]); // Only re-create when visited status or language changes

  const handleSquareClick = (square) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    // Reveal the square if not already revealed
    if (!revealedSquares.includes(square.id)) {
      setRevealedSquares([...revealedSquares, square.id]);
    }

    // Wait a bit for reveal animation, then handle the action
    setTimeout(() => {
      if (square.type === 'country') {
        if (!square.visited) {
          setVisitedCountries([...visitedCountries, square.country.id]);
        }
        
        setSelectedSquare(square.id);
        setShowMessage(null);
        
        // Navigate with animation delay
        setTimeout(() => {
          navigate(`/continent/${square.continentKey}`, { 
            state: { 
              scrollToCountry: square.country.id,
              fromGame: true 
            } 
          });
        }, 400);
      } else {
        setSelectedSquare(square.id);
        setShowMessage(square.id);
        setTimeout(() => {
          setShowMessage(null);
          setSelectedSquare(null);
        }, 3000);
      }
    }, 300);
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
    hidden: { opacity: 0, scale: 0.8, rotate: -180 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="country-game-section">
      <div className="game-background">
        <div className="game-gradient-orb orb-1"></div>
        <div className="game-gradient-orb orb-2"></div>
      </div>

      <div className="container">
        <motion.div
          className="game-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="game-title">
            {language === 'fr' 
              ? '🎮 Jeu des Pays Francophones' 
              : '🎮 Francophone Countries Game'}
          </h1>
          <p className="game-instructions">
            {language === 'fr'
              ? 'Sélectionnez un pays pour découvrir sa culture, sa cuisine et ses villes emblématiques'
              : 'Select a country to discover its culture, cuisine, and iconic cities'}
          </p>
          
          {gameStarted && (
            <motion.div
              className="game-stats"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="stat-item">
                <span className="stat-label">{language === 'fr' ? 'Visités' : 'Visited'}</span>
                <span className="stat-value">{visitedCountries.length}/8</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="interactive-grid"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {squares.map((square) => {
            const isRevealed = revealedSquares.includes(square.id);
            
            return (
              <motion.div
                key={square.id}
                className={`grid-square ${square.type} ${selectedSquare === square.id ? 'selected' : ''} ${hoveredSquare === square.id ? 'hovered' : ''} ${square.visited ? 'visited' : ''} ${isRevealed ? 'revealed' : 'hidden'}`}
                variants={squareVariants}
                whileHover={isRevealed ? { scale: 1.08, zIndex: 10, rotate: 5 } : { scale: 1.05, zIndex: 10 }}
                whileTap={{ scale: 0.92, rotate: isRevealed ? -5 : 0 }}
                onClick={() => handleSquareClick(square)}
                onMouseEnter={() => setHoveredSquare(square.id)}
                onMouseLeave={() => setHoveredSquare(null)}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="square-inner"
                  animate={{
                    rotateY: isRevealed ? 0 : 180
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Back of card (hidden) */}
                  <div className="square-back">
                    <motion.div
                      className="card-back-pattern"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      {language === 'fr' ? '?' : '?'}
                    </motion.div>
                    <div className="card-back-text">
                      {language === 'fr' ? 'Cliquez pour révéler' : 'Click to reveal'}
                    </div>
                  </div>

                  {/* Front of card (revealed) */}
                  <div className="square-front">
                    <div className="square-content">
                      {square.type === 'country' ? (
                        <>
                          {square.visited && (
                            <div className="visited-badge">✓</div>
                          )}
                          <motion.div 
                            className="square-flag"
                            animate={selectedSquare === square.id ? {
                              scale: [1, 1.3, 1],
                              rotate: [0, 360, 0]
                            } : {}}
                            transition={{ duration: 0.6 }}
                          >
                            {square.flag}
                          </motion.div>
                          <div className="square-name">{square.name}</div>
                          <motion.div
                            className="square-glow"
                            animate={{
                              opacity: selectedSquare === square.id ? [0.5, 1, 0.5] : 0,
                              scale: selectedSquare === square.id ? [1, 1.3, 1] : 1
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: selectedSquare === square.id ? Infinity : 0
                            }}
                          />
                        </>
                      ) : (
                        <div className="square-placeholder">
                          <motion.span 
                            className="placeholder-icon"
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {square.icon}
                          </motion.span>
                          <span className="placeholder-text">
                            {language === 'fr' ? 'Cliquez' : 'Click'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Prominent Message Display Area */}
        <AnimatePresence>
          {showMessage !== null && squares[showMessage]?.type === 'placeholder' && (
            <>
              <motion.div
                className="message-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setShowMessage(null);
                  setSelectedSquare(null);
                }}
              />
              <motion.div
                className="game-message-display"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <motion.div
                  className="message-icon"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {squares[showMessage].icon}
                </motion.div>
                <p className="message-text">{squares[showMessage].message}</p>
                <motion.button
                  className="message-close-btn"
                  onClick={() => {
                    setShowMessage(null);
                    setSelectedSquare(null);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedSquare !== null && squares[selectedSquare]?.type === 'country' && (
            <motion.div
              className="selection-feedback"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ fontSize: '2rem', marginBottom: '0.5rem' }}
              >
                ✈️
              </motion.div>
              <p>
                {language === 'fr'
                  ? `Navigation vers ${squares[selectedSquare].name}...`
                  : `Flying to ${squares[selectedSquare].name}...`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {visitedCountries.length === 8 && (
          <motion.div
            className="game-completion"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2>🎉 {language === 'fr' ? 'Félicitations !' : 'Congratulations!'}</h2>
            <p>
              {language === 'fr'
                ? 'Vous avez exploré tous les pays !'
                : "You've explored all countries!"}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CountryGame;
