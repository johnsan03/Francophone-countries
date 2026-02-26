import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { continents } from '../data/countries';
import ParticleBackground from './ParticleBackground';
import InteractiveStats from './InteractiveStats';

const Landing = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const continentKeys = ['africa', 'europe', 'northAmerica', 'asia'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="landing">
      <ParticleBackground />
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="animated-grid"></div>
      </div>

      <div className="landing-content">
        <motion.div
          className="landing-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="landing-title"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {language === 'fr'
              ? 'Découvrez les Pays Francophones'
              : 'Discover Francophone Countries'}
          </motion.h1>

          <motion.p
            className="landing-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {language === 'fr'
              ? 'Un voyage à travers les continents où le français unit les cultures'
              : 'A journey across continents where French unites cultures'}
          </motion.p>

          <motion.div
            className="landing-map"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🗺️
          </motion.div>
        </motion.div>

        <motion.div
          className="continents-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {continentKeys.map((key, index) => {
            const continent = continents[key];
            return (
              <motion.div
                key={key}
                className="continent-card"
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.15
                    }
                  }
                }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -15,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/continent/${key}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="continent-card-glow"></div>
                <motion.div 
                  className="continent-emoji"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  {continent.emoji}
                </motion.div>
                <h2 className="continent-card-title">{continent[language]}</h2>
                <motion.div
                  className="explore-btn"
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 8px 30px rgba(102, 126, 234, 0.6)"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {language === 'fr' ? 'Explorer' : 'Explore'} →
                  </motion.span>
                </motion.div>
                <div className="continent-card-shine"></div>
              </motion.div>
            );
          })}
        </motion.div>

        <InteractiveStats />
      </div>
    </section>
  );
};

export default Landing;
