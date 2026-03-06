import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-transition after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for exit animation before calling onComplete
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="splash-content">
            <motion.div
              className="splash-logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              🌍
            </motion.div>
            
            <motion.h1
              className="splash-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Bonjour!
            </motion.h1>
            
            <motion.p
              className="splash-message"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Bienvenue sur le site web créé par la classe <b>A1</b> des étudiants de <b>L’Alliance Française</b>. 😊

            </motion.p>

            <motion.div
              className="splash-loader"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, delay: 0.8 }}
            >
              <div className="loader-spinner"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
