import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ParticleBackground from './ParticleBackground';
import InteractiveStats from './InteractiveStats';
import CountryGame from './CountryGame';

const Landing = () => {
  const { language } = useLanguage();

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

        <CountryGame />
        <InteractiveStats />
   
      </div>
    </section>
  );
};

export default Landing;
