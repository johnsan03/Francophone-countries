import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { countries } from '../data/countries';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Country coordinates (latitude, longitude)
const countryCoordinates = {
  // Africa
  senegal: { lat: 14.4974, lng: -14.4524 },
  morocco: { lat: 31.7917, lng: -7.0926 },
  // Europe
  switzerland: { lat: 46.8182, lng: 8.2275 },
  belgium: { lat: 50.5039, lng: 4.4699 },
  // North America
  canada: { lat: 56.1304, lng: -106.3468 },
  haiti: { lat: 18.9712, lng: -72.2852 },
  // Asia
  vietnam: { lat: 14.0583, lng: 108.2772 },
  lebanon: { lat: 33.8547, lng: 35.8623 }
};

// Continent center coordinates for initial zoom
const continentCenters = {
  africa: { lat: 8.7832, lng: 34.5085, zoom: 3 },
  europe: { lat: 54.5260, lng: 15.2551, zoom: 4 },
  northAmerica: { lat: 54.5260, lng: -105.2551, zoom: 3 },
  asia: { lat: 34.0479, lng: 100.6197, zoom: 3 }
};

// Component to handle map view changes
function MapView({ center, zoom }) {
  const map = useMap();
  const prevCenterRef = useRef(center);
  const prevZoomRef = useRef(zoom);
  const isInitialMount = useRef(true);
  
  useEffect(() => {
    // Skip on initial mount to avoid unnecessary update
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevCenterRef.current = center;
      prevZoomRef.current = zoom;
      return;
    }
    
    // Only update if center or zoom actually changed
    const centerChanged = 
      Math.abs(center[0] - prevCenterRef.current[0]) > 0.001 || 
      Math.abs(center[1] - prevCenterRef.current[1]) > 0.001;
    const zoomChanged = Math.abs(zoom - prevZoomRef.current) > 0.1;
    
    if (centerChanged || zoomChanged) {
      map.setView(center, zoom, {
        animate: true,
        duration: 2
      });
      prevCenterRef.current = center;
      prevZoomRef.current = zoom;
    }
  }, [map, center, zoom]);

  return null;
}

// Custom marker icon
const createCustomIcon = (color = '#667eea') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 40px;
        height: 50px;
        position: relative;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
      ">
        <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="45" rx="8" ry="4" fill="rgba(0,0,0,0.3)"/>
          <path d="M 20 0 L 30 15 L 20 30 L 10 15 Z" fill="#ffffff" stroke="${color}" stroke-width="2"/>
          <circle cx="20" cy="15" r="6" fill="${color}"/>
          <circle cx="20" cy="15" r="3" fill="#ffffff"/>
        </svg>
      </div>
    `,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50]
  });
};

const WorldMapTransition = ({ 
  isVisible, 
  country, 
  continentKey, 
  onComplete 
}) => {
  const { language } = useLanguage();
  const [stage, setStage] = useState(0); // 0: show world, 1: zoom continent, 2: zoom country
  const [mapCenter, setMapCenter] = useState([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);
  const [mapReady, setMapReady] = useState(false);

  const continentCenter = continentCenters[continentKey] || { lat: 20, lng: 0, zoom: 2 };
  const countryPos = countryCoordinates[country?.id] || { lat: 20, lng: 0 };

  useEffect(() => {
    // Prevent body scroll when map is visible
    if (isVisible) {
      document.body.classList.add('map-transition-active');
      document.documentElement.classList.add('map-transition-active');
      setMapReady(false); // Reset when becoming visible
    } else {
      document.body.classList.remove('map-transition-active');
      document.documentElement.classList.remove('map-transition-active');
      setStage(0);
      setMapCenter([20, 0]);
      setMapZoom(2);
      setMapReady(false);
      return;
    }

    // Stage 0: Show full world map (0.5s)
    const timer1 = setTimeout(() => {
      setStage(1);
      // Zoom to continent
      setMapCenter([continentCenter.lat, continentCenter.lng]);
      setMapZoom(continentCenter.zoom);
    }, 500);
    
    // Stage 1: Zoom to continent (2s)
    const timer2 = setTimeout(() => {
      setStage(2);
      // Zoom to country
      setMapCenter([countryPos.lat, countryPos.lng]);
      setMapZoom(6);
    }, 2500);
    
    // Stage 2: Final zoom to country (2s)
    const timer3 = setTimeout(() => {
      setMapZoom(8);
    }, 4500);
    
    // Complete transition
    const timer4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      document.body.classList.remove('map-transition-active');
      document.documentElement.classList.remove('map-transition-active');
    };
  }, [isVisible, onComplete, continentCenter.lat, continentCenter.lng, continentCenter.zoom, countryPos.lat, countryPos.lng]);

  if (!country) return null;

  const countryName = country.name[language] || country.name.en;

  // Use portal to render at root level for true full-screen
  const mapContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="world-map-container"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Loading State */}
          {!mapReady && (
            <motion.div
              className="map-loading-overlay"
              initial={{ opacity: 1 }}
              animate={{ opacity: mapReady ? 0 : 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="loading-content"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="loading-spinner-large">🗺️</div>
                <h3>{language === 'fr' ? 'Chargement de la carte...' : 'Loading map...'}</h3>
                <p>{language === 'fr' ? 'Préparation de votre voyage' : 'Preparing your journey'}</p>
              </motion.div>
            </motion.div>
          )}
          {/* Animated Background Gradient */}
          <motion.div
            className="map-background-gradient"
            animate={{
              background: [
                'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.3) 0%, transparent 50%)'
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Stage Indicator */}
          <motion.div
            className="map-stage-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {stage === 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="stage-text"
              >
                <span className="stage-icon">🌍</span>
                <p>{language === 'fr' ? 'Vue du monde' : 'World View'}</p>
              </motion.div>
            )}
            {stage === 1 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="stage-text"
              >
                <span className="stage-icon">🗺️</span>
                <p>{language === 'fr' ? 'Zoom sur le continent' : 'Zooming to Continent'}</p>
              </motion.div>
            )}
            {stage >= 2 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="stage-text"
              >
                <span className="stage-icon">📍</span>
                <p>{language === 'fr' ? 'Localisation du pays' : 'Locating Country'}</p>
              </motion.div>
            )}
          </motion.div>

          <div className="world-map-wrapper">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ width: '100%', height: '100%' }}
              zoomControl={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
              dragging={false}
              touchZoom={false}
              boxZoom={false}
              keyboard={false}
              className="leaflet-container-dark"
              whenReady={() => {
                setTimeout(() => setMapReady(true), 800);
              }}
            >
              <MapView center={mapCenter} zoom={mapZoom} />
              
              {/* OpenStreetMap Tile Layer with better visibility */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
                minZoom={2}
                tileSize={256}
                zoomOffset={0}
                crossOrigin={true}
                errorTileUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Crect fill='%231a1a2e' width='256' height='256'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23667eea' font-size='20'%3ELoading...%3C/text%3E%3C/svg%3E"
              />

              {/* Country Marker */}
              {stage >= 2 && (
                <Marker 
                  position={[countryPos.lat, countryPos.lng]}
                  icon={createCustomIcon('#667eea')}
                >
                  <Popup>
                    <strong>{countryName}</strong>
                    <br />
                    {country.flag}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

              {/* Pulsing Circle Effect on Country */}
              {stage >= 2 && (
                <motion.div
                  className="country-pulse-effect"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.8, 0, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

          {/* Country Name Label */}
          <motion.div
            className="country-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: stage >= 2 ? 1 : 0,
              y: stage >= 2 ? 0 : 20
            }}
            transition={{ 
              duration: 0.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <h2>{countryName}</h2>
            <p>{country.flag}</p>
          </motion.div>

          {/* Animated Grid Overlay */}
          <div className="map-grid-overlay"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render to document.body using portal for true full-screen
  return isVisible ? createPortal(mapContent, document.body) : null;
};

export default WorldMapTransition;
