import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../../css/home.css';

const HeroSlider = ({ banners = [] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000); // 6s duration per slide
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const currentBanner = banners[current];

  return (
    <div className="hero-slider">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="hero-slide active"
          style={{ backgroundImage: `url(${currentBanner.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-slide-overlay" />
          <div className="container" style={{ width: '100%' }}>
            <div className="hero-slide-content">
              <motion.h1
                className="hero-slide-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {currentBanner.title}
              </motion.h1>
              <motion.p
                className="hero-slide-subtitle"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {currentBanner.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link to={currentBanner.link || '/shop'} className="btn btn-primary">
                  Shop Now
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav dots */}
      {banners.length > 1 && (
        <div className="hero-slider-nav">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`hero-slider-dot ${index === current ? 'active' : ''}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
