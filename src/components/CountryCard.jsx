import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const CountryCard = ({ country, index }) => {
  const { language } = useLanguage();

  if (!country) return null;

  return (
    <motion.div
      className="country-card"
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "0px" }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -15,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      layout
    >
      <div className="country-card-glow"></div>
      
      <motion.div
        className="country-flag"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {country.flag}
      </motion.div>

      <h3 className="country-name">{country.name[language]}</h3>
      
      <p className="country-intro">{country.intro[language]}</p>

      <div className="country-details">
        <motion.div
          className="detail-item"
          whileHover={{ scale: 1.02, x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h4>{language === 'fr' ? 'Pourquoi le français ?' : 'Why French?'}</h4>
          <p>{country.whyFrench[language]}</p>
        </motion.div>

        <motion.div
          className="detail-item"
          whileHover={{ scale: 1.02, x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h4>{language === 'fr' ? 'Ville à visiter' : 'City to Visit'}</h4>
          <p className="city-name">{country.city.name[language]}</p>
          <p>{country.city.description[language]}</p>
          {country.city.image ? (
            <motion.img
              src={country.city.image}
              alt={country.city.name[language]}
              className="city-image"
              whileHover={{ scale: 1.05 }}
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder city-image">🏙️</div>
          )}
        </motion.div>

        <motion.div
          className="detail-item"
          whileHover={{ scale: 1.02, x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h4>{language === 'fr' ? 'Cuisine célèbre' : 'Famous Cuisine'}</h4>
          <p className="dish-name">{country.cuisine.name[language]}</p>
          <p>{country.cuisine.description[language]}</p>
          {country.cuisine.image ? (
            <motion.img
              src={country.cuisine.image}
              alt={country.cuisine.name[language]}
              className="food-image"
              whileHover={{ scale: 1.05 }}
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder food-image">🍽️</div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CountryCard;
