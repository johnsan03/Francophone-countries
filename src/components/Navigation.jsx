import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { continents } from '../data/countries';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { key: 'africa', path: '/continent/africa' },
    { key: 'europe', path: '/continent/europe' },
    { key: 'northAmerica', path: '/continent/northAmerica' },
    { key: 'asia', path: '/continent/asia' }
  ];

  const isHome = location.pathname === '/';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="globe-icon">🌍</span>
            <span>{language === 'fr' ? 'Pays Francophones' : 'Francophone Countries'}</span>
          </motion.div>
        </Link>
        
        {!isHome && (
          <>
            {isMobile ? (
              <motion.button
                className="mobile-menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <span className={menuOpen ? 'open' : ''}>☰</span>
              </motion.button>
            ) : null}
            
            <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
              {navItems.map((item, index) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}
                  >
                    {continents[item.key][language]}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </>
        )}

        <motion.button
          className="lang-toggle"
          onClick={toggleLanguage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle language"
        >
          <span className={language === 'fr' ? 'lang-active' : 'lang-inactive'}>FR</span>
          <span className="lang-separator">|</span>
          <span className={language === 'en' ? 'lang-active' : 'lang-inactive'}>EN</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navigation;
