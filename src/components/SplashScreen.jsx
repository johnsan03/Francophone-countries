import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classMembers from '../data/classMembers';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shownMembers, setShownMembers] = useState([]);
  const [activePopups, setActivePopups] = useState([]);
  const cleanupRef = useRef({ timeouts: [], intervals: [] });

  const members = useMemo(() => {
    const list = Array.isArray(classMembers) ? classMembers : [];
    return list.map((n) => String(n ?? '').trim()).filter(Boolean);
  }, []);

  const membersKey = useMemo(() => members.join('|'), [members]);

  const createPopup = (idx, name) => {
    const rand = (min, max) => Math.random() * (max - min) + min;
    
    // Define exclusion zone for center content (where heading and credits are)
    // Center content is roughly: 20-80% horizontal, 15-85% vertical
    const centerLeft = 20;
    const centerRight = 80;
    const centerTop = 15;
    const centerBottom = 85;
    
    // Generate position, avoiding center content area
    let x, y;
    let attempts = 0;
    do {
      // Prefer outer edges: left/right sides or top/bottom corners
      const side = Math.random();
      if (side < 0.4) {
        // Left side
        x = rand(5, centerLeft - 5);
        y = rand(10, 90);
      } else if (side < 0.8) {
        // Right side
        x = rand(centerRight + 5, 95);
        y = rand(10, 90);
      } else if (side < 0.9) {
        // Top area (outside center)
        x = rand(5, 95);
        y = rand(5, centerTop - 5);
      } else {
        // Bottom area (outside center)
        x = rand(5, 95);
        y = rand(centerBottom + 5, 95);
      }
      attempts++;
    } while (
      attempts < 20 && 
      (x >= centerLeft && x <= centerRight && y >= centerTop && y <= centerBottom)
    );
    
    const rot = rand(-10, 10);
    const scale = rand(0.9, 1.05); // Slightly smaller to be less intrusive
    return {
      id: `${idx}-${Date.now()}-${Math.round(Math.random() * 100000)}`,
      name,
      x,
      y,
      rot,
      scale,
    };
  };

  useEffect(() => {
    const cleanup = cleanupRef.current;
    cleanup.timeouts.forEach(clearTimeout);
    cleanup.intervals.forEach(clearInterval);
    cleanup.timeouts = [];
    cleanup.intervals = [];

    setShownMembers([]);
    setActivePopups([]);

    // Timing (auto-adjusts based on name count)
    const INTRO_DELAY_MS = 1200;
    const POPUP_INTERVAL_MS = 850; // readable pace
    const POPUP_LIFETIME_MS = 2600;
    const READ_AFTER_LAST_MS = 2800;
    const EXIT_ANIM_MS = 600;

    const totalMs = Math.max(
      9000,
      INTRO_DELAY_MS + members.length * POPUP_INTERVAL_MS + READ_AFTER_LAST_MS
    );

    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i >= members.length) {
          clearInterval(interval);
          return;
        }

        const name = members[i];
        const popup = createPopup(i, name);

        setShownMembers((prev) => [...prev, name]);
        // Limit to 6 popups at once to avoid clutter
        setActivePopups((prev) => [...prev, popup].slice(-6));

        const removeTimeout = setTimeout(() => {
          setActivePopups((prev) => prev.filter((p) => p.id !== popup.id));
        }, POPUP_LIFETIME_MS);
        cleanup.timeouts.push(removeTimeout);

        i += 1;
      }, POPUP_INTERVAL_MS);

      cleanup.intervals.push(interval);
    }, INTRO_DELAY_MS);
    cleanup.timeouts.push(startTimeout);

    const finishTimeout = setTimeout(() => {
      setIsVisible(false);
      const doneTimeout = setTimeout(() => {
        onComplete?.();
      }, EXIT_ANIM_MS);
      cleanup.timeouts.push(doneTimeout);
    }, totalMs);
    cleanup.timeouts.push(finishTimeout);

    return () => {
      cleanup.timeouts.forEach(clearTimeout);
      cleanup.intervals.forEach(clearInterval);
      cleanup.timeouts = [];
      cleanup.intervals = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete, membersKey]);

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
          <div className="splash-popups-layer" aria-hidden="true">
            <AnimatePresence>
              {activePopups.map((p) => (
                <motion.div
                  key={p.id}
                  className="splash-name-popup"
                  initial={{ opacity: 0, scale: 0.85, y: 12 }}
                  animate={{ opacity: 1, scale: p.scale, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    left: `${p.x}vw`,
                    top: `${p.y}vh`,
                    transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
                  }}
                >
                  {p.name}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

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
              className="splash-credits"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <div className="splash-credits-title">
                Ce site a été réalisé par :
              </div>

              <div className="splash-credits-subtitle">
                Classe <b>A1.2 Intensive</b> — <b>L’Alliance Française</b>
              </div>

              <div className="splash-names-list" aria-label="Noms des membres de la classe">
                {members.map((name) => {
                  const isShown = shownMembers.includes(name);
                  return (
                    <span
                      key={name}
                      className={`splash-name-chip ${isShown ? 'is-shown' : ''}`}
                    >
                      {name}
                    </span>
                  );
                })}
              </div>
            </motion.div>

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
