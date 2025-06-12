import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAnimatedText } from '../../hooks/useAnimatedText';
import { useBlinkEffect } from '../../hooks/useBlinkEffect';
import { useIsMobile } from '../../hooks/useIsMobile';
import styles from './Home.module.css';
import AnimatedQuote from '../../components/AnimatedQuote/AnimatedQuote';

function Home() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isPulsing, setIsPulsing] = useState(false);

  const phrases = useMemo(() => [
    "All our dreams can come true, if we have the courage to pursue them.",
    "Love",
    "Passion",
    "Happiness",
    "Explore!"
  ], []);

  const { animatedChars, currentPhraseIndex, phraseList } = useAnimatedText(
    phrases,
    40,
    3000
  );

  useBlinkEffect({
    triggerPhrase: "Explore!",
    phraseList,
    currentPhraseIndex,
    setHighlight: setIsPulsing,
    blinks: 3,
    duration: 600
  });

  const handleClick = () => navigate('/events');

  return (
    <div className={styles.home}>
      {isMobile ? (
        <img
          src="/image-background.jpg"
          loading="lazy"
          alt="Mobile background"
          className={styles.video}
        />
      ) : (
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/image-background.jpg"
        >
          <source src="/video-background.webm" type="video/webm" />
        </video>
      )}

      <AnimatedQuote animatedChars={animatedChars} />

      <div className={styles.overlay}>
        <button
          className={`${styles.ctaButton} ${isPulsing ? styles.pulse : ''}`}
          onClick={handleClick}
        >
          Explore
        </button>
      </div>
    </div>
  );
}

export default Home;