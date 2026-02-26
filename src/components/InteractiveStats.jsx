import { useLanguage } from '../context/LanguageContext';
import InteractiveCounter from './InteractiveCounter';

const InteractiveStats = () => {
  const { language } = useLanguage();

  return (
    <section className="interactive-stats">
      <div className="container">
        <h2 className="stats-title">
          {language === 'fr' 
            ? 'La Francophonie en Chiffres' 
            : 'Francophonie in Numbers'}
        </h2>
        <div className="stats-grid">
          <InteractiveCounter 
            end={88} 
            label={language === 'fr' ? 'Pays Francophones' : 'Francophone Countries'}
            icon="🌍"
          />
          <InteractiveCounter 
            end={321} 
            label={language === 'fr' ? 'Millions de Locuteurs' : 'Million Speakers'}
            icon="🗣️"
          />
          <InteractiveCounter 
            end={5} 
            label={language === 'fr' ? 'Continents' : 'Continents'}
            icon="🌎"
          />
          <InteractiveCounter 
            end={29} 
            label={language === 'fr' ? 'Langue Officielle' : 'Official Language'}
            icon="📜"
          />
        </div>
      </div>
    </section>
  );
};

export default InteractiveStats;
