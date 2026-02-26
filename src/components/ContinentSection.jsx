import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CountryCard from './CountryCard';
import { continents } from '../data/countries';

const ContinentSection = ({ continentKey, countries }) => {
  const { language } = useLanguage();
  const continent = continents[continentKey];

  return (
    <section id={continentKey} className="continent-section">
      <div className="container">
        <motion.h2
          className="continent-title"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {continent.emoji} {continent[language]}
        </motion.h2>

        <div className="countries-grid">
          {countries && countries.length > 0 ? (
            countries.map((country, index) => (
              <CountryCard key={country.id} country={country} index={index} />
            ))
          ) : (
            <p style={{ color: '#fff', textAlign: 'center' }}>No countries found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContinentSection;
