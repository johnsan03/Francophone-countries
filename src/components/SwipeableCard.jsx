import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

const SwipeableCard = ({ children, onSwipeLeft, onSwipeRight }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (info.offset.x < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e, info) => {
        handleDragEnd(e, info);
        setIsDragging(false);
        x.set(0);
      }}
      whileDrag={{ scale: 1.05 }}
      className={`swipeable-card ${isDragging ? 'dragging' : ''}`}
    >
      {children}
    </motion.div>
  );
};

export default SwipeableCard;
