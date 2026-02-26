import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <p>
          {language === 'fr'
            ? 'Découvrez la beauté et la diversité des pays francophones à travers le monde'
            : 'Discover the beauty and diversity of Francophone countries around the world'}
        </p>
        <p className="footer-credits">
          {language === 'fr'
            ? 'Créé avec ❤️ pour célébrer la francophonie'
            : 'Created with ❤️ to celebrate Francophonie'}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
